import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {Workbook, SpreadsheetFile} from '@oai/artifact-tool';

// Run a copy in an OS temp directory linked to CODEX_PRIMARY_RUNTIME_NODE_MODULES.
const output=process.argv[2];
if(!output)throw new Error('Supply the absolute download output directory');
await fs.mkdir(output,{recursive:true});
const money='#,##0;(#,##0);"—"';
const blue='#1D4ED8',ink='#183348',green='#16704A';
function cell(s,a,v){s.getRange(a).values=[[v]];}
function formula(s,a,v){s.getRange(a).formulas=[[v]];}
function base(s,last){s.showGridLines=false;s.getRange(`A1:J${last}`).format.font={name:'Arial',size:11,color:ink};s.getRange(`A1:J${last}`).format.rowHeight=24;s.getRange('A:A').format.columnWidth=24;s.getRange('B:G').format.columnWidth=18;s.getRange('H:J').format.columnWidth=22;s.tabColor=ink;}
function heading(s,r,a,b){s.getRange(`${a}${r}:${b}${r}`).format.fill=ink;s.getRange(`${a}${r}:${b}${r}`).format.font={bold:true,color:'#FFFFFF'};s.getRange(`${a}${r}:${b}${r}`).format.rowHeight=34;s.getRange(`${a}${r}:${b}${r}`).format.wrapText=true;}
function input(s,a){s.getRange(a).format.fill='#FFF3CF';s.getRange(a).format.font={color:blue};}
function note(s,r,t){cell(s,`A${r}`,t);s.getRange(`A${r}`).format.font={size:10,color:'#53687A'};}
const proofs=[];
const bva=Workbook.create();
for(const filled of [false,true]){
 const s=bva.worksheets.add(filled?'Filled example':'Blank report');base(s,44);
 cell(s,'A2',filled?'Budget vs actual: example':'Budget vs actual: your report');s.getRange('A2').format.font={size:15,bold:true};
 note(s,3,'USD example. Replace the currency label for one currency; this workbook does not convert FX.');
 cell(s,'A5','Selected month (1–12)');cell(s,'B5',1);input(s,'B5');
 s.getRange('B5').dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:12}};
 cell(s,'D5','Calendar year');cell(s,'E5',2026);input(s,'E5');
 cell(s,'A7','Selected month');
 s.getRange('A8:F8').values=[['Line','Budget','Actual','Actual − budget','Variance %','Direction']];heading(s,8,'A','F');
 cell(s,'A13','Year to selected month');
 s.getRange('A14:F14').values=[['Line','Budget YTD','Actual YTD','Actual − budget','Variance %','Direction']];heading(s,14,'A','F');
 for(const [r,label]of [[9,'Net revenue'],[10,'Included expenses'],[11,'Operating result'],[15,'Net revenue'],[16,'Included expenses'],[17,'Operating result']])cell(s,`A${r}`,label);
 s.getRange('A21:J21').values=[['Month','Budget revenue','Budget expenses','Actual revenue','Actual expenses','Budget result','Actual result','Budget entries / 2','Actual entries / 2','Reason / next action']];heading(s,21,'A','J');
 for(let r=22;r<=33;r++)formula(s,`A${r}`,`=DATE($E$5,${r-21},1)`);s.getRange('A22:A33').setNumberFormat('mmm');
 for(let r=22;r<=33;r++){
  if(filled){cell(s,`B${r}`,30000);cell(s,`C${r}`,20000);if(r<=24){cell(s,`D${r}`,r===22?28000:r===23?32000:30000);cell(s,`E${r}`,r===22?21000:r===23?20000:20500);}}
  formula(s,`H${r}`,`=COUNT(B${r}:C${r})`);formula(s,`I${r}`,`=COUNT(D${r}:E${r})`);
  formula(s,`F${r}`,`=IF(H${r}=2,B${r}-C${r},"Unreported")`);formula(s,`G${r}`,`=IF(I${r}=2,D${r}-E${r},"Unreported")`);
 }
 input(s,'B22:E33');input(s,'J22:J33');s.getRange('B22:G33').setNumberFormat(money);
 const valid='AND(ISNUMBER($B$5),$B$5=INT($B$5),$B$5>=1,$B$5<=12)';
 for(const [r,col,ready]of [[9,'B','H'],[10,'C','H'],[9,'D','I'],[10,'E','I']]){
  const out=col==='B'||col==='C'?'B':'C';
  formula(s,`${out}${r}`,`=IF(${valid},IF(INDEX($${ready}$22:$${ready}$33,$B$5)=2,INDEX($${col}$22:$${col}$33,$B$5),"Unreported"),"Invalid month")`);
 }
 for(const [r,col,ready]of [[15,'B','H'],[16,'C','H'],[15,'D','I'],[16,'E','I']]){
  const out=col==='B'||col==='C'?'B':'C';
  formula(s,`${out}${r}`,`=IF(${valid},IF(SUMIF($A$22:$A$33,"<="&DATE($E$5,$B$5,1),$${ready}$22:$${ready}$33)=2*$B$5,SUMIF($A$22:$A$33,"<="&DATE($E$5,$B$5,1),$${col}$22:$${col}$33),"Unreported"),"Invalid month")`);
 }
 for(const[r,above]of [[11,9],[17,15]])for(const col of ['B','C'])formula(s,`${col}${r}`,`=IF(COUNT(${col}${above}:${col}${above+1})=2,${col}${above}-${col}${above+1},"Unreported")`);
 for(const r of [9,10,11,15,16,17]){
  formula(s,`D${r}`,`=IF(COUNT(B${r}:C${r})=2,C${r}-B${r},"Unreported")`);
  formula(s,`E${r}`,`=IF(COUNT(B${r}:C${r})=2,IF(B${r}=0,"n.a.",D${r}/ABS(B${r})),"Unreported")`);
  formula(s,`F${r}`,`=IF(ISNUMBER(D${r}),IF(D${r}=0,"On budget",IF(D${r}${[10,16].includes(r)?'<':'>'}0,"Favorable","Unfavorable")),"Unreported")`);
  s.getRange(`B${r}:D${r}`).setNumberFormat(money);s.getRange(`E${r}`).setNumberFormat('0.0%;(0.0%);"—"');
 }
 note(s,35,'Yellow cells are editable. Blue numbers are inputs. Other cells contain formulas.');
 note(s,36,'Freeze the original budget. Enter net revenue and expense totals on the same accounting basis.');
 note(s,37,'Enter both actual fields for every closed month, including explicit zeros. Leave future actuals blank.');
 note(s,38,'YTD is unavailable when any selected month is incomplete. A blank is not a zero.');
 note(s,39,'Returns reduce revenue; supplier credits reduce expenses. Do not classify either twice.');
 note(s,40,'Operating result excludes tax, interest and other items outside your included expense boundary.');
 note(s,41,'Positive expense variance is unfavorable. Zero budget has no percentage. Negative budgets use ABS(budget).');
 note(s,42,'Change the year label only for this Jan–Dec report; monthly row labels are calendar months.');
 note(s,43,'Source: original fictional MyBreakeven example. Method: openstax.org/books/principles-managerial-accounting/pages/7-5-explain-how-budgets-are-used-to-evaluate-goals');
 s.freezePanes.freezeRows(21);
}
bva.recalculate();
const ex=bva.worksheets.getItem('Filled example'), blank=bva.worksheets.getItem('Blank report');
assert.equal(ex.getRange('C11').values[0][0],7000);assert.equal(ex.getRange('D11').values[0][0],-3000);
assert.equal(blank.getRange('C11').values[0][0],'Unreported');
cell(ex,'B5',3);assert.equal(ex.getRange('C17').values[0][0],28500);assert.equal(ex.getRange('D17').values[0][0],-1500);
cell(ex,'B5',4);assert.equal(ex.getRange('C17').values[0][0],'Unreported');
cell(ex,'B5',1);cell(ex,'B22',0);assert.equal(ex.getRange('E9').values[0][0],'n.a.');cell(ex,'B22',30000);
cell(ex,'D22',0);assert.equal(ex.getRange('C9').values[0][0],0);cell(ex,'D22',28000);
cell(ex,'B5',13);assert.equal(ex.getRange('B9').values[0][0],'Invalid month');cell(ex,'B5',1);
bva.recalculate();
proofs.push({workbook:'Budget vs Actual',checks:['Jan profit 7000 / variance -3000','March YTD profit 28500 / variance -1500','April incomplete','blank vs zero','zero budget','invalid month'],inspection:(await bva.inspect({kind:'table',range:"'Filled example'!A8:F17",include:'values,formulas',tableMaxRows:10,tableMaxCols:6,maxChars:6000})).ndjson});
await(await SpreadsheetFile.exportXlsx(bva)).save(path.join(output,'budget-vs-actual-template.xlsx'));
for(const name of ['Blank report','Filled example']){const img=await bva.render({sheetName:name,range:'A2:F17',scale:1.5,format:'png'});await fs.writeFile(path.join(output,`${name==='Blank report'?'budget-vs-actual-blank':'budget-vs-actual-example'}-preview.png`),new Uint8Array(await img.arrayBuffer()));}

const rolling=Workbook.create(),s=rolling.worksheets.add('Rolling forecast');base(s,52);
cell(s,'A2','Rolling 12-month operating forecast');s.getRange('A2').format.font={size:15,bold:true};
note(s,3,'Fictional service-business example in USD. Monthly operating forecast; no cash or balance-sheet model.');
cell(s,'A5','Last closed month');cell(s,'B5',new Date(Date.UTC(2026,2,1)));s.getRange('B5').setNumberFormat('mmm-yy');input(s,'B5');
cell(s,'D5','Update as-of');cell(s,'E5',new Date(Date.UTC(2026,3,5)));s.getRange('E5').setNumberFormat('mm/dd/yy');input(s,'E5');
cell(s,'A7','Forward 12-month revenue');formula(s,'B7','=IF(COUNT(F14:F25)=12,SUM(F14:F25),"Incomplete")');
cell(s,'D7','Forward operating result');formula(s,'E7','=IF(COUNT(J14:J25)=12,SUM(J14:J25),"Incomplete")');s.getRange('B7').setNumberFormat(money);s.getRange('E7').setNumberFormat(money);
note(s,9,'Future inputs stay attached to dated rows below. Move the cutoff only after actuals are closed.');
s.getRange('A13:J13').values=[['Forecast month','Jobs','Price / job','Variable / job','Fixed expenses','Revenue','Variable expense','Contribution','Fixed expense','Operating result']];heading(s,13,'A','J');
// Absolute-date schedule: a new month must be added explicitly when the horizon reaches its end.
s.getRange('A30:H30').values=[['Absolute month','Jobs assumption','Price / job','Variable / job','Fixed expenses','Actual revenue','Actual expenses','Update reason']];heading(s,30,'A','H');
for(let i=0;i<18;i++){
 const r=31+i;cell(s,`A${r}`,new Date(Date.UTC(2026,i,1)));cell(s,`B${r}`,100);cell(s,`C${r}`,200);cell(s,`D${r}`,80);cell(s,`E${r}`,9000);
 if(i<3){cell(s,`F${r}`,i===2?18000:20000);cell(s,`G${r}`,i===2?17000:17000);}
}
for(let r=31;r<=48;r++)formula(s,`I${r}`,`=COUNT(B${r}:E${r})`);cell(s,'I30','Driver entries / 4');
cell(s,'H33','March: 90 completed jobs. Revised April forecast: 90 jobs, 205 price, 85 variable cost.');cell(s,'B34',90);cell(s,'C34',205);cell(s,'D34',85);
input(s,'B31:H48');s.getRange('A31:A48').setNumberFormat('mmm-yy');s.getRange('C31:G48').setNumberFormat(money);
for(let r=14;r<=25;r++){
 formula(s,`A${r}`,`=DATE(YEAR($B$5),MONTH($B$5)+${r-13},1)`);s.getRange(`A${r}`).setNumberFormat('mmm-yy');
 for(const[c,source]of [['B','B'],['C','C'],['D','D'],['E','E']])formula(s,`${c}${r}`,`=IF(COUNTIF($A$31:$A$48,A${r})=1,IF(INDEX($I$31:$I$48,MATCH(A${r},$A$31:$A$48,0))=4,INDEX($${source}$31:$${source}$48,MATCH(A${r},$A$31:$A$48,0)),"Missing inputs"),"Missing / duplicate month")`);
 formula(s,`F${r}`,`=IF(COUNT(B${r}:E${r})=4,B${r}*C${r},"Incomplete")`);
 formula(s,`G${r}`,`=IF(COUNT(B${r}:E${r})=4,B${r}*D${r},"Incomplete")`);
 formula(s,`H${r}`,`=IF(COUNT(F${r}:G${r})=2,F${r}-G${r},"Incomplete")`);
 formula(s,`I${r}`,`=IF(ISNUMBER(E${r}),E${r},"Incomplete")`);
 formula(s,`J${r}`,`=IF(COUNT(H${r}:I${r})=2,H${r}-I${r},"Incomplete")`);
}
s.getRange('C14:J25').setNumberFormat(money);s.getRange('B14:B25').setNumberFormat('0');s.getRange('B14:E25').format.font={color:green};
note(s,27,'Actuals remain in columns F:G of the dated input schedule. They never feed forecast assumptions automatically.');
note(s,28,'Archive a copy before each refresh. Preserve original budget and previous forecast separately.');
note(s,50,'Extend the dated input schedule AND formula ranges before forecasting beyond Jun-27. Missing dates show incomplete.');
note(s,51,'Source: original fictional MyBreakeven example. Method: accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/budgeting2.html');
note(s,52,'Enter period-specific drivers; no automatic growth, seasonal assumptions, native cash forecast or capacity check is implied.');
rolling.recalculate();assert.equal(s.getRange('F14').values[0][0],18450);assert.equal(s.getRange('J14').values[0][0],1800);assert.equal(s.getRange('E7').values[0][0],34800);
const oldActual=s.getRange('F33:G33').values;
cell(s,'B5',new Date(Date.UTC(2026,3,1)));assert.equal(s.getRange('F14').values[0][0],20000);assert.equal(s.getRange('J14').values[0][0],3000);assert.deepEqual(s.getRange('F33:G33').values,oldActual);
cell(s,'C35',210);assert.equal(s.getRange('F14').values[0][0],21000);cell(s,'C35',200);
s.getRange('B35').clear({applyTo:'contents'});assert.equal(s.getRange('E7').values[0][0],'Incomplete');cell(s,'B35',100);
cell(s,'B5',new Date(Date.UTC(2026,6,1)));assert.equal(s.getRange('E7').values[0][0],'Incomplete');cell(s,'B5',new Date(Date.UTC(2026,2,1)));
rolling.recalculate();
proofs.push({workbook:'Rolling forecast',checks:['April revenue 18450 / result 1800','forward result 34800','cutoff shifts dated rows, preserves actuals','driver edit recalculates','missing driver / out-of-range horizon incomplete'],inspection:(await rolling.inspect({kind:'table',range:'\'Rolling forecast\'!A13:J16',include:'values,formulas',tableMaxRows:4,tableMaxCols:10,maxChars:5000})).ndjson});
await(await SpreadsheetFile.exportXlsx(rolling)).save(path.join(output,'rolling-forecast-template.xlsx'));
const img=await rolling.render({sheetName:'Rolling forecast',range:'A2:J17',scale:1.2,format:'png'});await fs.writeFile(path.join(output,'rolling-forecast-preview.png'),new Uint8Array(await img.arrayBuffer()));
for(const[w,name]of [[bva,'BvA'],[rolling,'Rolling']])proofs.push({name,errorScan:(await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},maxChars:2000})).ndjson});
await fs.writeFile(path.join(output,'day1-workbook-verification.json'),JSON.stringify(proofs,null,2));
console.log('Exported two formula workbooks; boundary and recalculation assertions passed.');
