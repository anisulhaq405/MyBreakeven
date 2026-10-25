import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const root=path.resolve(process.argv[2]),qa=path.resolve(process.argv[3]);
const {planCase:p,annualPlanRows,yearMilestones}=await import(pathToFileURL(root+'/src/detailedPlanData.js'));
await fs.mkdir(qa,{recursive:true});
const w=Workbook.create(),s=w.worksheets.add('Annual plan'),m=w.worksheets.add('Milestones');
for(const sheet of [s,m]){sheet.showGridLines=false;sheet.getRange('B2:I60').format.font={name:'Arial',size:10,color:'#000000'};sheet.getRange('B2:I60').format.rowHeight=24;sheet.getRange('B2:I60').format.verticalAlignment='center';sheet.freezePanes.freezeRows(5);}
s.tabColor='#17314f';s.getRange('B2').values=[['Five year business planning worksheet']];s.getRange('B2').format.font={size:16,bold:true};s.getRange('B3').values=[['Fictional USD case. Blue values are editable. Annual cash does not test payment dates.']];s.getRange('B3').format.font={size:10,italic:true,color:'#526779'};s.getRange('B2:B59').format.columnWidth=44;s.getRange('C5:G53').format.columnWidth=23;
s.getRange('C5:G5').values=[p.years];s.getRange('C5:G5').setNumberFormat('0');s.getRange('B5').values=[['Calendar year assumptions']];
for(const range of ['B5:G5','B31:G31','B42:G42'])s.getRange(range).format={fill:'#17314f',font:{bold:true,color:'#ffffff'},rowHeight:28};
for(const [r,label]of Object.entries({7:'Revenue',8:'Contribution',9:'Result after owner cash allowance',10:'Closing cash',11:'Whole packages to fund commitments',12:'Capacity status',13:'Annual cash status',15:'Cash immediately before 2027',16:'Receivables immediately before 2027',18:'Completed packages',19:'Price per package',20:'Direct cash cost per package',21:'Fixed operating cash commitments',22:'Owner cash allowance',23:'Available productive team hours',24:'Productive hours per package',25:'Sales collected in the same year',26:'Capital purchases paid',27:'Other cash payments',28:'Additional funding received',29:'Chosen minimum year end cash',31:'Operating calculations',32:'Contribution per package',33:'Revenue',34:'Direct cash costs',35:'Contribution',36:'Result before owner allowance',37:'Result after owner allowance',38:'Whole package capacity',39:'Whole packages to fund commitments',40:'Capacity status',41:'Volume compared with commitments',42:'Annual cash calculations',43:'Opening cash',44:'Opening receivables collected this year',45:'Cash receipts',46:'Direct fixed and owner cash payments',47:'Capital purchases',48:'Other cash payments',49:'Additional funding received',50:'Net cash change',51:'Closing cash',52:'Closing uncollected sales',53:'Annual cash status'}))s.getRange(`B${r}`).values=[[label]];
s.getRange('C15:C16').values=[[p.openingCash],[p.openingReceivables]];
const keys=['jobs','price','direct','fixed','owner','hours','hoursPerJob','collection','capex','otherCash','funding','floor'];keys.forEach((k,n)=>s.getRange(`C${18+n}:G${18+n}`).values=[p[k]]);
for(const range of ['C15:C16','C18:G29']){s.getRange(range).format.fill='#fff4c7';s.getRange(range).format.font={color:'#0000ff'};s.getRange(range).dataValidation={rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}};}
s.getRange('C25:G25').dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};
s.getRange('C18:G18').dataValidation={rule:{type:'whole',operator:'greaterThanOrEqual',formula1:0}};
s.getRange('C24:G24').dataValidation={rule:{type:'decimal',operator:'greaterThan',formula1:0}};
s.getRange('C7:G53').setNumberFormat('#,##0.00;(#,##0.00);"–"');for(const r of [7,8,9,10,15,16,19,20,21,22,26,27,28,29,33,34,35,36,37,43,44,45,46,47,48,49,50,51,52])s.getRange(`C${r}:G${r}`).setNumberFormat('$#,##0;($#,##0);"–"');for(const r of [11,18,23,24,38,39])s.getRange(`C${r}:G${r}`).setNumberFormat('#,##0');s.getRange('C25:G25').setNumberFormat('0.0%');s.getRange('B25:G25').format.font={italic:true};s.getRange('C25:G25').format.font={color:'#0000ff',italic:true};
const numberCells=(cells)=>cells.map(c=>`ISNUMBER(${c})`).join(',');
for(let n=0;n<5;n++){
 const c=String.fromCharCode(67+n),prev=String.fromCharCode(66+n),f=(r,condition,formula)=>s.getRange(`${c}${r}`).formulas=[[`=IF(${condition},${formula},"n.a.")`]],and=(...cells)=>`AND(${numberCells(cells)})`;
 f(32,`AND(COUNT(${c}19:${c}20)=2,MIN(${c}19:${c}20)>=0)`,`${c}19-${c}20`);
 f(33,`AND(COUNT(${c}18:${c}19)=2,MIN(${c}18:${c}19)>=0,${c}18=INT(${c}18))`,`${c}18*${c}19`);
 f(34,`AND(ISNUMBER(${c}18),ISNUMBER(${c}20),${c}18>=0,${c}20>=0,${c}18=INT(${c}18))`,`${c}18*${c}20`);
 f(35,and(`${c}33`,`${c}34`),`${c}33-${c}34`);f(36,`AND(${numberCells([`${c}35`,`${c}21`])},${c}21>=0)`,`${c}35-${c}21`);f(37,`AND(${numberCells([`${c}36`,`${c}22`])},${c}22>=0)`,`${c}36-${c}22`);
 f(38,`AND(COUNT(${c}23:${c}24)=2,${c}23>=0)`,`IF(${c}24>0,ROUNDDOWN(${c}23/${c}24,0),"Not possible")`);
 f(39,`AND(COUNT(${c}21:${c}22)=2,MIN(${c}21:${c}22)>=0,ISNUMBER(${c}32))`,`IF(${c}32>0,ROUNDUP(SUM(${c}21:${c}22)/${c}32,0),"Not possible")`);
 f(40,`AND(${numberCells([`${c}18`,`${c}38`])},${c}18>=0,${c}18=INT(${c}18))`,`IF(${c}18>${c}38,"Above capacity","Fits entered hours")`);
 f(41,and(`${c}18`,`${c}39`),`IF(${c}18<${c}39,"Below commitment target","Meets commitment target")`);
 f(43,`ISNUMBER(${n?prev+'51':'$C$15'})`,n?prev+'51':'$C$15');f(44,`ISNUMBER(${n?prev+'52':'$C$16'})`,n?prev+'52':'$C$16');
 f(45,`AND(${numberCells([`${c}33`,`${c}25`,`${c}44`])},${c}25>=0,${c}25<=1,${c}44>=0)`,`${c}33*${c}25+${c}44`);
 f(46,`AND(${numberCells([`${c}34`,`${c}21`,`${c}22`])},${c}21>=0,${c}22>=0)`,`SUM(${c}34,${c}21:${c}22)`);
 for(const [r,source]of [[47,26],[48,27],[49,28]])f(r,`AND(ISNUMBER(${c}${source}),${c}${source}>=0)`,`${c}${source}`);
 f(50,`COUNT(${c}45:${c}49)=5`,`${c}45+${c}49-SUM(${c}46:${c}48)`);f(51,and(`${c}43`,`${c}50`),`${c}43+${c}50`);f(52,`AND(${numberCells([`${c}33`,`${c}25`])},${c}25>=0,${c}25<=1)`,`${c}33*(1-${c}25)`);f(53,`AND(${numberCells([`${c}51`,`${c}29`])},${c}29>=0)`,`IF(${c}51<${c}29,"Below chosen floor","At or above floor")`);
 for(const [r,source]of [[7,33],[8,35],[9,37],[10,51],[11,39],[12,40],[13,53]])s.getRange(`${c}${r}`).formulas=[[`=${c}${source}`]];
}
for(const r of [7,9,10,35,37,51]){s.getRange(`B${r}:G${r}`).format.fill='#edf2f7';s.getRange(`B${r}:G${r}`).format.font={bold:true};}
for(const r of [12,13,40,41,53]){s.getRange(`C${r}:G${r}`).format.wrapText=true;s.getRange(`B${r}:G${r}`).format.rowHeight=36;}
for(const r of [13,53])s.getRange(`C${r}:G${r}`).conditionalFormats.add('containsText',{text:'Below chosen floor',format:{fill:'#fde8e7',font:{color:'#9c2020',bold:true}}});s.getRange('C40:G40').conditionalFormats.add('containsText',{text:'Above capacity',format:{fill:'#fde8e7',font:{color:'#9c2020',bold:true}}});
const notes=['Original fictional MyBreakeven assumptions dated October 25 2026. No automatic growth or demand.','Owner allowance is separate from operating result. Tax and debt payments belong in other cash when applicable.','All current direct and fixed costs are paid in the year. Uncollected sales arrive the following year.','No bad debt or collection delay beyond one year is modeled. Annual cash can conceal interim shortages.','No balance sheet tax depreciation or debt schedule is supplied. Use dated forecasts and required statements.'];notes.forEach((t,n)=>{s.getRange(`B${55+n}`).values=[[t]];s.getRange(`B${55+n}`).format.font={size:10,italic:true,color:'#526779'};});
m.getRange('B2').values=[['Five year milestones']];m.getRange('B2').format.font={size:16,bold:true};m.getRange('B3').values=[['Replace example targets. Assign an owner and next review before approving a year.']];
const widths=[12,26,25,31,31,17,18,26];widths.forEach((v,n)=>m.getRange(`${String.fromCharCode(66+n)}2:${String.fromCharCode(66+n)}12`).format.columnWidth=v);
m.getRange('B5:I5').values=[['Year','Objective','Target','Evidence needed','Action if the test fails','Owner','Next review','Review status']];m.getRange('B5:I5').format={fill:'#17314f',font:{bold:true,color:'#fff'},wrapText:true,rowHeight:36};
yearMilestones.forEach((row,n)=>{const r=n+6;m.getRange(`B${r}:F${r}`).values=[[...row]];m.getRange(`B${r}`).formulas=[[`='Annual plan'!${String.fromCharCode(67+n)}5`]];m.getRange(`B${r}`).format.font={color:'#008000'};m.getRange(`C${r}:H${r}`).format.font={color:'#0000ff'};m.getRange(`B${r}:I${r}`).format.wrapText=true;m.getRange(`B${r}:I${r}`).format.rowHeight=60;m.getRange(`G${r}:H${r}`).format.fill='#fff4c7';m.getRange(`H${r}`).setNumberFormat('mm/dd/yy');m.getRange(`I${r}`).formulas=[[`=IF(OR(G${r}="",NOT(ISNUMBER(H${r})),H${r}<=0),"Assign owner and review","Review evidence")`]];});
w.recalculate();const expected=annualPlanRows();expected.forEach((r,n)=>{const c=String.fromCharCode(67+n);assert.ok(Math.abs(s.getRange(`${c}51`).values[0][0]-r.closingCash)<1e-6);assert.equal(s.getRange(`${c}37`).values[0][0],r.result);assert.equal(s.getRange(`${c}39`).values[0][0],r.required);});
s.getRange('C18').values=[[90]];w.recalculate();assert.equal(s.getRange('C37').values[0][0],-4500);assert.equal(s.getRange('C51').values[0][0],3000);assert.equal(s.getRange('C53').values[0][0],'Below chosen floor');s.getRange('C18').values=[[120]];
s.getRange('G19').values=[[null]];w.recalculate();assert.equal(s.getRange('G7').values[0][0],'n.a.');s.getRange('G19').values=[[p.price[4]]];s.getRange('C25').values=[[0]];w.recalculate();assert.equal(s.getRange('C45').values[0][0],0);assert.equal(s.getRange('D44').values[0][0],60000);s.getRange('C25').values=[[.9]];
s.getRange('C20').values=[[500]];w.recalculate();assert.equal(s.getRange('C39').values[0][0],'Not possible');s.getRange('C20').values=[[150]];
m.getRange('G6').values=[['Owner']];w.recalculate();assert.equal(m.getRange('I6').values[0][0],'Assign owner and review');m.getRange('G6').values=[[null]];w.recalculate();
const errors=await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30}});await fs.writeFile(qa+'/five-year-errors.json',errors.ndjson);
for(const [sheetName,range,file]of [['Annual plan','B2:G29','annual-inputs'],['Annual plan','B31:G59','annual-build'],['Milestones','B2:I10','milestones']]){const b=await w.render({sheetName,range,scale:1.3,format:'png'});await fs.writeFile(`${qa}/${file}.png`,new Uint8Array(await b.arrayBuffer()));}
await(await SpreadsheetFile.exportXlsx(w)).save(root+'/public/downloads/five-year-business-plan-worksheet.xlsx');console.log(JSON.stringify({results:s.getRange('C7:G13').values}));
