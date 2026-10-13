// Run a copy from a scratch directory linked to CODEX_PRIMARY_RUNTIME_NODE_MODULES.
import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const output=process.argv[2];if(!output)throw Error('Supply the XLSX output path');
const wb=Workbook.create(),forecast=wb.worksheets.add('Forecast'),events=wb.worksheets.add('Cash events');
for(const sheet of [forecast,events]){sheet.showGridLines=false;sheet.getRange(sheet===forecast?'A1:K31':'A1:G106').format.font={name:'Arial',size:10,color:'#172E3E'};sheet.getRange('A1:K31').format.rowHeight=23;sheet.getRange('A:A').format.columnWidth=29;sheet.getRange('B:K').format.columnWidth=17;}
const write=(s,cell,values)=>s.getRange(cell).write(values);
const date=s=>new Date(s+'T00:00:00Z');
const excelDate=s=>Math.round((date(s)-date('1899-12-30'))/86400000);
write(forecast,'A2',[['13-week cash flow forecast']]);forecast.getRange('A2').format.font={name:'Arial',size:16,bold:true};
write(forecast,'A4',[['Start date',excelDate('2026-10-19')],['Opening cash',12000],['Minimum reserve',5000],['Currency label','USD']]);
forecast.getRange('B4').setNumberFormat('yyyy-mm-dd');forecast.getRange('B5:B6').setNumberFormat('#,##0.00;(#,##0.00);"-"');
forecast.getRange('B4:B7').format.fill='#FFF3D1';forecast.getRange('B4:B7').format.font.color='#1760B0';
write(forecast,'D4',[['Edit amber cells and Cash events rows 7–106.']]);write(forecast,'D5',[['Use bank dates and positive receipt/payment amounts.']]);write(forecast,'D6',[['Fictional example. Currency labels do not convert values.']]);write(forecast,'D7',[['Base schedule only. Browser delay controls are not included.']]);
for(const row of [4,5,6,7])forecast.getRange(`D${row}:K${row}`).merge();
write(forecast,'A9',[['Closing cash'],['Lowest opening / weekly closing'],['Reserve funding shortfall']]);
forecast.getRange('B9:B11').formulas=[['=J26'],['=MIN(B5,D14:D26,J14:J26)'],['=MAX(0,B6-B10)']];forecast.getRange('B9:B11').setNumberFormat('#,##0.00;(#,##0.00);"-"');forecast.getRange('A9:B11').format.font.bold=true;
write(forecast,'D9',[['Excluded event count']]);write(forecast,'D10',[['Input rows needing correction']]);write(forecast,'D11',[['Only complete, valid rows are included below.']]);forecast.getRange('D11:K11').merge();
forecast.getRange('F9').formulas=[['=COUNTIFS(\'Cash events\'!$G$7:$G$106,"Before start")+COUNTIFS(\'Cash events\'!$G$7:$G$106,"After horizon")']];forecast.getRange('F10').formulas=[['=COUNTIFS(\'Cash events\'!$G$7:$G$106,"Fix row")']];
write(forecast,'A13',[['Week','Start','End','Opening','Operating in','Operating out','Financing in','Financing out','Net cash','Closing','Reserve headroom']]);
const formulas=Array.from({length:13},(_,i)=>{const row=14+i;const sum=(type,cat)=>`=SUMIFS('Cash events'!$E$7:$E$106,'Cash events'!$B$7:$B$106,">="&B${row},'Cash events'!$B$7:$B$106,"<"&B${row}+7,'Cash events'!$C$7:$C$106,"${type}",'Cash events'!$D$7:$D$106,"${cat}",'Cash events'!$G$7:$G$106,"Included")`;return [`=${i+1}`,i===0?'=IF(ISNUMBER($B$4),$B$4,NA())':`=B${row-1}+7`,`=B${row}+6`,i===0?'=IF(ISNUMBER($B$5),$B$5,NA())':`=J${row-1}`,sum('receipt','operating'),sum('payment','operating'),sum('receipt','financing'),sum('payment','financing'),`=E${row}+G${row}-F${row}-H${row}`,`=D${row}+I${row}`,`=J${row}-$B$6`];});forecast.getRange('A14:K26').formulas=formulas;
forecast.getRange('B14:C26').setNumberFormat('dd-mmm-yy');forecast.getRange('D14:K26').setNumberFormat('#,##0;(#,##0);"-"');forecast.getRange('J14:K26').format.font.bold=true;
write(forecast,'A28',[['Review daily payment order when a week is tight: closing balances can hide a temporary overdraft.']]);forecast.getRange('A28:K28').merge();
write(forecast,'A29',[['Roll forward: reconcile opening cash, update unpaid event dates, remove completed events and add upcoming payments.']]);forecast.getRange('A29:K29').merge();
write(forecast,'A30',[['Changing the start date excludes old events; their dates do not automatically roll forward. Maximum 100 event rows.']]);forecast.getRange('A30:K30').merge();
write(events,'A2',[['Dated cash events']]);events.getRange('A2').format.font={name:'Arial',size:16,bold:true};
write(events,'A3',[['Fictional sample. Replace events. Use receipt/payment and operating/financing dropdowns.']]);events.getRange('A3:G3').merge();
write(events,'A4',[['Method: opening cash + cash receipts − cash payments = closing cash.']]);events.getRange('A4:G4').merge();
write(events,'A5',[['Source: https://business.gov.au/finance/cash-flow/set-up-a-cash-flow-statement']]);events.getRange('A5:G5').merge();
write(events,'A6',[['Event name','Cash date','Direction','Category','Amount','Week number','Input status']]);
const sample=[['Customer collection','2026-10-20','receipt','operating',9000],['Payroll','2026-10-23','payment','operating',8000],['Supplier invoice','2026-10-27','payment','operating',7000],['Customer collection','2026-11-02','receipt','operating',11000],['Loan repayment','2026-11-06','payment','financing',2000]];
events.getRange('A7:E11').values=sample.map(([name,d,...rest])=>[name,excelDate(d),...rest]);events.getRange('A7:E106').format.fill='#FFF9E8';events.getRange('A7:E106').format.font.color='#1760B0';events.getRange('B:B').format.columnWidth=20;events.getRange('B7:B106').setNumberFormat('yyyy-mm-dd');events.getRange('E7:E106').setNumberFormat('#,##0.00;(#,##0.00);"-"');
events.getRange('C7:C106').dataValidation={rule:{type:'list',values:['receipt','payment']}};events.getRange('D7:D106').dataValidation={rule:{type:'list',values:['operating','financing']}};
events.getRange('E7:E106').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1e12}};
events.getRange('F7:G106').formulas=Array.from({length:100},(_,i)=>{const r=i+7;return [`=IF(G${r}="Included",INT((B${r}-'Forecast'!$B$4)/7)+1,"")`,`=IF(COUNTA(A${r}:E${r})=0,"",IF(OR(NOT(ISNUMBER(B${r})),NOT(ISNUMBER(E${r})),E${r}<0,AND(C${r}<>"receipt",C${r}<>"payment"),AND(D${r}<>"operating",D${r}<>"financing")),"Fix row",IF(B${r}<'Forecast'!$B$4,"Before start",IF(B${r}>='Forecast'!$B$4+91,"After horizon","Included"))))`];});events.getRange('F7:G106').format.font.color='#237549';
for(const [s,range] of [[forecast,'A13:K13'],[events,'A6:G6']]){s.getRange(range).format={fill:'#1E3D50',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},rowHeight:34,wrapText:true};}
forecast.getRange('K14:K26').conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{fill:'#FFE5E5',font:{color:'#9D2020'}}});forecast.getRange('F10').conditionalFormats.add('cellIs',{operator:'greaterThan',formula:0,format:{fill:'#FFE5E5',font:{color:'#9D2020',bold:true}}});events.getRange('G7:G106').conditionalFormats.add('containsText',{text:'Fix row',format:{fill:'#FFE5E5',font:{color:'#9D2020',bold:true}}});events.freezePanes.freezeRows(6);
wb.recalculate();
const assert=(condition,message)=>{if(!condition)throw Error(message);};
assert(forecast.getRange('B9').values[0][0]===15000,'Base closing cash must equal 15,000');assert(forecast.getRange('B11').values[0][0]===0,'Base reserve shortfall must be zero');
// Test input-driven formulas, horizon boundaries and incomplete rows; restore all edits.
events.getRange('B7').values=[[excelDate('2026-11-03')]];wb.recalculate();assert(forecast.getRange('B11').values[0][0]===8000,'Delayed first receipt must create 8,000 reserve shortfall');events.getRange('B7').values=[[excelDate('2026-10-20')]];
events.getRange('A12:E12').values=[['Boundary test',excelDate('2027-01-18'),'receipt','operating',100]];wb.recalculate();assert(forecast.getRange('F9').values[0][0]===1,'Day91 excluded');events.getRange('B12').values=[[excelDate('2027-01-17')]];wb.recalculate();assert(forecast.getRange('J26').values[0][0]===15100,'Day90 included');events.getRange('E12').clear({applyTo:'contents'});wb.recalculate();assert(forecast.getRange('F10').values[0][0]===1,'Incomplete event must be flagged');events.getRange('A12:E12').clear({applyTo:'contents'});
wb.recalculate();console.log((await wb.inspect({kind:'table',range:'Forecast!A9:F11',include:'values,formulas',tableMaxRows:3,tableMaxCols:6,maxChars:2000})).ndjson);console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:20},summary:'Formula errors'})).ndjson);
for(const [sheetName,range] of [['Forecast','A1:K30'],['Cash events','A1:G14']]){const preview=await wb.render({sheetName,range,scale:1.5});await fs.writeFile(output.replace('.xlsx','-'+sheetName.replace(' ','-')+'.png'),new Uint8Array(await preview.arrayBuffer()));}
await (await SpreadsheetFile.exportXlsx(wb)).save(output);console.log('Saved '+output);
