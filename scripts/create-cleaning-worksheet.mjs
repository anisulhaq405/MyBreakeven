import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const outputDir=process.argv[2];
if(!outputDir)throw new Error('Supply an output directory');
await fs.mkdir(outputDir,{recursive:true});
const wb=Workbook.create();
const labels=['Revenue','Total paid crew-hours','Loaded cost per crew-hour','Supplies','Travel cost','Other direct costs','Payment fee rate'];
for(const name of ['Job','Example']){
 const s=wb.worksheets.add(name);s.showGridLines=false;
 s.getRange('A1:D34').format.font={name:'Arial',size:11,color:'#18352D'};
 s.getRange('A1:D34').format.rowHeight=25;
 s.getRange('A1:A34').format.columnWidth=47;
 s.getRange('B1:D34').format.columnWidth=20;
 s.getRange('A2').values=[['Cleaning job cost']];s.getRange('A2').format.font={size:16,bold:true};
 s.getRange('A3').values=[[name==='Example'?'Illustrative USD example, not a customer result':'Enter every input, including zero when a cost does not apply']];
 s.getRange('A3:D3').format.rowHeight=31;s.getRange('A3').format.font={size:10,italic:true};
 s.getRange('A4:D4').values=[['Result','Estimate','Actual','Actual minus estimate']];
 s.getRange('A4:D4').format={fill:'#18352D',font:{bold:true,color:'#FFFFFF'},rowHeight:30};
 s.getRange('A5').values=[['Contribution before monthly overhead']];
 s.getRange('B5:D5').formulas=[['=B26','=C26','=IF(AND(ISNUMBER(B5),ISNUMBER(C5)),C5-B5,"Complete both columns")']];
 s.getRange('B5:D5').setNumberFormat('#,##0.00;(#,##0.00);0.00');
 s.getRange('A7').values=[['A lower contribution difference means less left for overhead.']];
 s.getRange('A8:B9').values=[['Job reference',name==='Example'?'Illustrative job':null],['Currency label',name==='Example'?'USD':null]];
 s.getRange('A11:C11').values=[['Input (same currency in both columns)','Estimate','Actual']];
 s.getRange('A11:C11').format={fill:'#EAF2EE',font:{bold:true},rowHeight:30};
 s.getRange('A12:A18').values=labels.map(x=>[x]);
 s.getRange('B12:C18').format={fill:'#FFF5D8',font:{color:'#1560A8'},numberFormat:'0.00'};
 s.getRange('B8:B9').format={fill:'#FFF5D8',font:{color:'#1560A8'}};
 s.getRange('B18:C18').setNumberFormat('0.0%');
 s.getRange('B12:C17').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1000000000}};
 s.getRange('B18:C18').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};
 if(name==='Example')s.getRange('B12:C18').values=[[240,240],[4,5],[25,25],[12,15],[10,14],[0,0],[.03,.03]];
 s.getRange('A20').values=[['Blank inputs are missing, not zero. Fee rate: enter 3%.']];
 s.getRange('A21:C21').values=[['Calculation','Estimate','Actual']];
 s.getRange('A21:C21').format={fill:'#EAF2EE',font:{bold:true},rowHeight:30};
 for(const c of ['B','C']){
  s.getRange(c+'22').formulas=[[`=IF(COUNT(${c}12:${c}18)=7,${c}13*${c}14,"Enter all inputs")`]];
  s.getRange(c+'23').formulas=[[`=IF(COUNT(${c}12:${c}18)=7,${c}12*${c}18,"Enter all inputs")`]];
  s.getRange(c+'24').formulas=[[`=IF(COUNT(${c}12:${c}18)=7,SUM(${c}22:${c}23,${c}15:${c}17),"Enter all inputs")`]];
  s.getRange(c+'26').formulas=[[`=IF(COUNT(${c}12:${c}18)=7,${c}12-${c}24,"Enter all inputs")`]];
  s.getRange(c+'27').formulas=[[`=IF(COUNT(${c}12:${c}18)=7,IF(${c}12=0,"n.a.",${c}26/${c}12),"Enter all inputs")`]];
 }
 s.getRange('A22:A27').values=[['Labor cost'],['Payment fees'],['Total entered direct costs'],[null],['Contribution before monthly overhead'],['Contribution / revenue']];
 s.getRange('B22:C26').setNumberFormat('#,##0.00;(#,##0.00);0.00');s.getRange('B27:C27').setNumberFormat('0.0%');
 s.getRange('A29').values=[['Crew-hours = all workers multiplied by paid time.']];
 s.getRange('A30').values=[['Use loaded labor cost; include owner delivery time consistently.']];
 s.getRange('A31').values=[['Contribution still funds overhead, owner pay and profit goals.']];
 s.getRange('A32').values=[['Currency is a label; no exchange-rate conversion.']];
 s.getRange('A33').values=[['Guide: https://mybreakeven.com/resources/cleaning-job-cost-worksheet/']];
 s.getRange('A34').values=[['Example source: MyBreakeven illustrative assumptions, October 14, 2026.']];
 s.getRange('A29:D34').format.font={size:10,color:'#53675F'};
 s.getRange('A29:D34').format.rowHeight=23;
 s.getRange('D5').conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{fill:'#FDE8E8',font:{color:'#9B2020'}}});
}
const adjustments = {"Job": {"A36": {"value": "Additional actual job entries"}, "A37": {"value": "Callback paid crew-hours"}, "C37": {"value": 0.0}, "A38": {"value": "Callback loaded cost per crew-hour"}, "C38": {"value": 0.0}, "A39": {"value": "Callback supplies"}, "C39": {"value": 0.0}, "A40": {"value": "Callback travel"}, "C40": {"value": 0.0}, "A41": {"value": "Callback other direct costs"}, "C41": {"value": 0.0}, "A42": {"value": "Customer credit / revenue reduction"}, "C42": {"value": 0.0}, "A43": {"value": "Actual payment fees (optional override)"}, "A44": {"value": "Extra work revenue"}, "C44": {"value": 0.0}, "A45": {"value": "Extra work variable costs"}, "C45": {"value": 0.0}, "A47": {"value": "Final job result"}, "A48": {"value": "Callback cost"}, "C48": {"formula": "=IF(COUNT(C37:C42,C44:C45)=8,C37*C38+SUM(C39:C41),\"Enter every adjustment\")"}, "A49": {"value": "Final retained revenue"}, "C49": {"formula": "=IF(AND(ISNUMBER(C26),ISNUMBER(C48)),C12-C42+C44,\"Complete actual and adjustments\")"}, "A50": {"value": "Total variable costs incl. adjustments"}, "C50": {"formula": "=IF(AND(ISNUMBER(C24),ISNUMBER(C48)),C24+C48+C45,\"Complete actual and adjustments\")"}, "A51": {"value": "Final contribution before overhead"}, "C51": {"formula": "=IF(AND(ISNUMBER(C49),ISNUMBER(C50)),C49-C50,\"Complete actual and adjustments\")"}, "A52": {"value": "Contribution / retained revenue"}, "C52": {"formula": "=IF(AND(ISNUMBER(C51),ISNUMBER(C49)),IF(C49=0,\"n.a.\",C51/C49),\"Complete actual and adjustments\")"}, "A53": {"value": "Final actual minus estimate"}, "C53": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C51-B26,\"Complete both columns\")"}, "A57": {"value": "Contribution change by driver"}, "A58": {"value": "First-visit revenue"}, "C58": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C12-B12,\"Complete both columns\")"}, "A59": {"value": "First-visit labour"}, "C59": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B22-C22,\"Complete both columns\")"}, "A60": {"value": "First-visit supplies"}, "C60": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B15-C15,\"Complete both columns\")"}, "A61": {"value": "First-visit travel"}, "C61": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B16-C16,\"Complete both columns\")"}, "A62": {"value": "First-visit other direct costs"}, "C62": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B17-C17,\"Complete both columns\")"}, "A63": {"value": "Payment fees"}, "C63": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B23-C23,\"Complete both columns\")"}, "A64": {"value": "Callback"}, "C64": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),-C48,\"Complete both columns\")"}, "A65": {"value": "Customer credit"}, "C65": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),-C42,\"Complete both columns\")"}, "A66": {"value": "Extra work net contribution"}, "C66": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C44-C45,\"Complete both columns\")"}, "A67": {"value": "Total contribution change"}, "C67": {"formula": "=IF(COUNT(C58:C66)=9,SUM(C58:C66),\"Complete both columns\")"}, "A68": {"value": "Enter callback and extra costs only when absent from first-visit actuals. Credit reduces revenue once."}, "A69": {"value": "Leave fee override blank to use charged first-visit revenue \u00d7 rate. Enter actual net fees if refunds alter them."}, "A70": {"value": "All figures use one currency. Contribution excludes fixed overhead. Example is fictional."}}, "Example": {"A36": {"value": "Additional actual job entries"}, "A37": {"value": "Callback paid crew-hours"}, "C37": {"value": 1.0}, "A38": {"value": "Callback loaded cost per crew-hour"}, "C38": {"value": 25.0}, "A39": {"value": "Callback supplies"}, "C39": {"value": 4.0}, "A40": {"value": "Callback travel"}, "C40": {"value": 8.0}, "A41": {"value": "Callback other direct costs"}, "C41": {"value": 0.0}, "A42": {"value": "Customer credit / revenue reduction"}, "C42": {"value": 20.0}, "A43": {"value": "Actual payment fees (optional override)"}, "C43": {"value": 7.2}, "A44": {"value": "Extra work revenue"}, "C44": {"value": 0.0}, "A45": {"value": "Extra work variable costs"}, "C45": {"value": 0.0}, "A47": {"value": "Final job result"}, "A48": {"value": "Callback cost"}, "C48": {"formula": "=IF(COUNT(C37:C42,C44:C45)=8,C37*C38+SUM(C39:C41),\"Enter every adjustment\")"}, "A49": {"value": "Final retained revenue"}, "C49": {"formula": "=IF(AND(ISNUMBER(C26),ISNUMBER(C48)),C12-C42+C44,\"Complete actual and adjustments\")"}, "A50": {"value": "Total variable costs incl. adjustments"}, "C50": {"formula": "=IF(AND(ISNUMBER(C24),ISNUMBER(C48)),C24+C48+C45,\"Complete actual and adjustments\")"}, "A51": {"value": "Final contribution before overhead"}, "C51": {"formula": "=IF(AND(ISNUMBER(C49),ISNUMBER(C50)),C49-C50,\"Complete actual and adjustments\")"}, "A52": {"value": "Contribution / retained revenue"}, "C52": {"formula": "=IF(AND(ISNUMBER(C51),ISNUMBER(C49)),IF(C49=0,\"n.a.\",C51/C49),\"Complete actual and adjustments\")"}, "A53": {"value": "Final actual minus estimate"}, "C53": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C51-B26,\"Complete both columns\")"}, "A57": {"value": "Contribution change by driver"}, "A58": {"value": "First-visit revenue"}, "C58": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C12-B12,\"Complete both columns\")"}, "A59": {"value": "First-visit labour"}, "C59": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B22-C22,\"Complete both columns\")"}, "A60": {"value": "First-visit supplies"}, "C60": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B15-C15,\"Complete both columns\")"}, "A61": {"value": "First-visit travel"}, "C61": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B16-C16,\"Complete both columns\")"}, "A62": {"value": "First-visit other direct costs"}, "C62": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B17-C17,\"Complete both columns\")"}, "A63": {"value": "Payment fees"}, "C63": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),B23-C23,\"Complete both columns\")"}, "A64": {"value": "Callback"}, "C64": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),-C48,\"Complete both columns\")"}, "A65": {"value": "Customer credit"}, "C65": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),-C42,\"Complete both columns\")"}, "A66": {"value": "Extra work net contribution"}, "C66": {"formula": "=IF(AND(ISNUMBER(B26),ISNUMBER(C51)),C44-C45,\"Complete both columns\")"}, "A67": {"value": "Total contribution change"}, "C67": {"formula": "=IF(COUNT(C58:C66)=9,SUM(C58:C66),\"Complete both columns\")"}, "A68": {"value": "Enter callback and extra costs only when absent from first-visit actuals. Credit reduces revenue once."}, "A69": {"value": "Leave fee override blank to use charged first-visit revenue \u00d7 rate. Enter actual net fees if refunds alter them."}, "A70": {"value": "All figures use one currency. Contribution excludes fixed overhead. Example is fictional."}}};
for(const name of ['Job','Example']){
 const s=wb.worksheets.getItem(name);
 s.getRange('A3').values=[[name==='Example'?'Fictional USD job including callback and credit':'Enter first-visit actuals; add adjustments below']];
 s.getRange('A5:D5').format.wrapText=true;s.getRange('A5:D5').format.rowHeight=48;
 s.getRange('C5').formulas=[['=C51']];
 s.getRange('A7').values=[['Actual result includes adjustments below; costs entered once.']];
 s.getRange('C23').formulas=[['=IF(COUNT(C12:C18)=7,IF(ISNUMBER(C43),C43,C12*C18),"Enter all inputs")']];
 s.getRange('A36:D70').format.font={name:'Arial',size:11,color:'#18352D'};s.getRange('A36:D70').format.rowHeight=25;
 for(const [cell,entry] of Object.entries(adjustments[name])){
  if(entry.formula)s.getRange(cell).formulas=[[entry.formula]];
  else s.getRange(cell).values=[[entry.value]];
 }
 for(const row of [36,47,57])s.getRange(`A${row}:C${row}`).format={fill:'#EAF2EE',font:{bold:true},rowHeight:30};
 s.getRange('C37:C45').format={fill:'#FFF5D8',font:{color:'#1560A8'},numberFormat:'0.00'};
 s.getRange('C37:C45').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1000000000}};
 s.getRange('C48:C53').setNumberFormat('#,##0.00;(#,##0.00);0.00');s.getRange('C52').setNumberFormat('0.0%');
 s.getRange('C58:C67').setNumberFormat('#,##0.00;(#,##0.00);0.00');s.getRange('C51:C53').format.font={bold:true};
 s.getRange('A68:A70').format={font:{size:10,color:'#53675F'},wrapText:true,rowHeight:48};
 s.getRange('A69').values=[['Blank fee override uses first-visit revenue × rate. Include extra-work fees once in override or extra costs.']];
}

wb.recalculate();
const example=wb.worksheets.getItem('Example');
const initial=example.getRange('B26:C26').values[0];
if(Math.abs(initial[0]-110.8)>1e-8||Math.abs(initial[1]-78.8)>1e-8)throw new Error('Example mismatch');
example.getRange('C13').values=[[6]];wb.recalculate();
if(Math.abs(example.getRange('C26').values[0][0]-53.8)>1e-8)throw new Error('Changed hours did not recalculate');
example.getRange('C13').values=[[5]];
example.getRange('C12').values=[[0]];wb.recalculate();
if(example.getRange('C27').values[0][0]!=='n.a.')throw new Error('Zero revenue rate is not unavailable');
example.getRange('C12').values=[[240]];
example.getRange('C17').clear({applyTo:'contents'});wb.recalculate();
if(example.getRange('C26').values[0][0]!=='Enter all inputs')throw new Error('Missing cost treated as zero');
example.getRange('C17').values=[[0]];wb.recalculate();
if(Math.abs(example.getRange('C51').values[0][0]-21.8)>1e-8||Math.abs(example.getRange('C67').values[0][0]+89)>1e-8)throw Error('Final result mismatch');
const errs=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:20},maxChars:1000});
console.log(errs.ndjson);
for(const sheetName of ['Job','Example']){
 const p=await wb.render({sheetName,range:'A1:D70',scale:1,format:'png'});
 await fs.writeFile(path.join(outputDir,sheetName+'.png'),new Uint8Array(await p.arrayBuffer()));
}
const x=await SpreadsheetFile.exportXlsx(wb);await x.save(path.join(outputDir,'mybreakeven-cleaning-job-cost.xlsx'));
console.log(JSON.stringify({example:example.getRange('B26:C26').values,blank:wb.worksheets.getItem('Job').getRange('B26').values,export:'mybreakeven-cleaning-job-cost.xlsx'}));
