import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const root=process.argv[2];
if(!root)throw new Error('Provide the repository absolute path as the first argument. Run with the Codex primary runtime.');
const out=`${root}/public/downloads`;
const qa=process.argv[3] || '/tmp/mybreakeven-plan-qa';
await fs.mkdir(qa,{recursive:true});
await fs.mkdir(out,{recursive:true});
const specs={
 landscaping:[['Planned completed visits',m=>m>=2&&m<=9?100:0],['Price per visit',80],['Direct cost per visit incl. labor',30],['Monthly fixed commitments',3000],['Additional owner pay',0],['Delivery workers',1],['Hours per worker per month',160],['Productive share',.8],['Worker-hours per visit',1.5],['Same-month collection share',.75],['Opening cash (January only)',m=>m===0?10000:0],['Opening receivables (January only)',0],['Equipment cash purchases',0],['Debt principal cash payments',0],['Tax cash payments',0],['Other cash payments',0],['Minimum cash reserve',2000]],
 agency:[['Opening clients (January only)',m=>m===0?8:0],['Clients lost at month start',m=>m===0?1:0],['New clients at month start',m=>m===0?2:0],['Monthly fee per active client',2000],['Direct cost per active client',900],['Monthly fixed commitments',6000],['Additional owner pay',0],['Delivery contributors',2],['Hours per contributor per month',160],['Productive share',.65],['Worker-hours per client-month',20],['Same-month collection share',.5],['Opening cash (January only)',m=>m===0?8000:0],['Opening receivables (January only)',0],['Equipment cash purchases',0],['Debt principal cash payments',0],['Tax cash payments',0],['Other cash payments',0],['Minimum cash reserve',2000]],
 ecommerce:[['Shipped orders (one unit each)',500],['Checkout receipt per shipped order',50],['Product cost per unit',20],['Fulfillment and shipping per order',6],['Fee on full checkout amount',.035],['Acquisition cost per order',8],['Refund and handling allowance / order',2],['Monthly fixed commitments',5000],['Additional owner pay',0],['Units purchased and received',m=>m===0?600:500],['Opening stock units (January only)',m=>m===0?1000:0],['Same-month settlement share',.9],['Opening cash (January only)',m=>m===0?20000:0],['Opening unsettled sales (January only)',0],['Equipment cash purchases',0],['Debt principal cash payments',0],['Tax cash payments',0],['Other cash payments',0],['Minimum cash reserve',5000],['Worker-hours per shipped order',.1],['Fulfillment workers',1],['Hours per worker per month',160],['Productive share',.8]],
};
const labels={4:'Annual sales',5:'Annual result before excluded items',6:'Lowest month-end cash',7:'Months above hours capacity',10:'Completed visits / active clients / shipped orders',11:'Sales before modeled refunds (USD)',12:'Order/client/visit-driven costs (USD)',13:'Contribution (USD)',14:'Fixed commitments (USD)',15:'Additional owner pay (USD)',16:'Result before unentered items (USD)',18:'Whole-unit hours capacity',19:'Worker-hours required',20:'Productive worker-hours available',21:'Hours capacity status',23:'Opening cash (USD)',24:'Customer receipts (USD)',25:'Direct cash excluding stock purchases (USD)',26:'Stock purchases paid (USD)',27:'Fixed commitments paid (USD)',28:'Additional owner pay paid (USD)',29:'Equipment, principal, tax and other cash',30:'Net cash change (USD)',31:'Closing cash (USD)',32:'Closing receivables / unsettled sales',33:'Cash reserve status',35:'Opening inventory units',36:'Units received',37:'Closing inventory units',38:'Inventory status'};
for(const [key,drivers] of Object.entries(specs)){
 const w=Workbook.create();const p=w.worksheets.add('Plan'),i=w.worksheets.add('Inputs');
 for(const s of [p,i]){s.showGridLines=false;s.getRange('B2:N42').format.font={name:'Arial',size:10,color:'#152b3e'};s.getRange('B2:N42').format.rowHeight=23;s.getRange('B2:B42').format.columnWidth=48;s.getRange('C2:N42').format.columnWidth=15;s.freezePanes.freezeRows(9);s.freezePanes.freezeColumns(2);}
 p.tabColor='#173b56';i.tabColor='#91aabd';
 p.getRange('B2').values=[[`${key[0].toUpperCase()+key.slice(1)} business plan (USD)`]];i.getRange('B2').values=[['Editable monthly assumptions (USD)']];
 for(const s of [p,i]){s.getRange('B2').format.font={name:'Arial',size:14,bold:true};s.getRange('B3').values=[['Fictional 2027 example. Replace blue inputs; preserve black formulas.']];s.getRange('B3:N3').merge();s.getRange('B3').format.font={italic:true,size:10,color:'#516778'};if(s===p)s.getRange('B9:N9').format={fill:'#173b56',font:{name:'Arial',size:10,bold:true,color:'#ffffff'},rowHeight:28};}
 // Month headers on Inputs row 7 and Plan row 9; values are Excel date serials.
 i.getRange('B7').values=[['Input']];i.getRange('B7:N7').format={fill:'#173b56',font:{bold:true,color:'#ffffff'},rowHeight:28};
 for(let m=0;m<12;m++){const c=String.fromCharCode(67+m);const date=(Date.UTC(2027,m,1)-Date.UTC(1899,11,30))/86400000;i.getRange(`${c}7`).values=[[date]];p.getRange(`${c}9`).formulas=[[`='Inputs'!${c}7`]];i.getRange(`${c}7`).setNumberFormat('mmm-yy');p.getRange(`${c}9`).setNumberFormat('mmm-yy');
  for(let n=0;n<drivers.length;n++){const v=drivers[n][1];i.getRange(`${c}${n+8}`).values=[[typeof v==='function'?v(m):v]];}
 }
 drivers.forEach(([label],n)=>i.getRange(`B${n+8}`).values=[[label]]);
 i.getRange(`C8:N${drivers.length+7}`).format.font={color:'#0000ff',name:'Arial',size:10};i.getRange(`C8:N${drivers.length+7}`).format.fill='#fff8dc';i.getRange(`C8:N${drivers.length+7}`).setNumberFormat('#,##0.00;(#,##0.00);"–"');
 i.getRange(`C8:N${drivers.length+7}`).dataValidation={rule:{type:'decimal',operator:'greaterThanOrEqual',formula1:0}};
 const pct=key==='landscaping'?[15,17]:key==='agency'?[17,19]:[12,19,30];for(const row of pct){i.getRange(`C${row}:N${row}`).setNumberFormat('0.0%');i.getRange(`C${row}:N${row}`).dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};}
 for(const [r,label]of Object.entries(labels))p.getRange(`B${r}`).values=[[label]];
 p.getRange('C10:N38').setNumberFormat('#,##0.00;(#,##0.00);"–"');for(const row of [10,18,35,36,37])p.getRange(`C${row}:N${row}`).setNumberFormat('#,##0;(#,##0);"–"');
 i.getRange('B4:N6').format.rowHeight=6;
 p.getRange('B10').values=[[key==='landscaping'?'Completed maintenance visits':key==='agency'?'Active full-month clients':'Shipped orders (one unit each)']];
 p.getRange('B12').values=[[key==='landscaping'?'Direct visit costs (USD)':key==='agency'?'Direct client costs (USD)':'Order-driven costs (USD)']];
 for(const r of [21,33,38]){p.getRange(`C${r}:N${r}`).format.wrapText=true;p.getRange(`B${r}:N${r}`).format.rowHeight=34;}
 const input=(c,r)=>`'Inputs'!${c}${r}`;
 for(let m=0;m<12;m++){
  const c=String.fromCharCode(67+m),b=String.fromCharCode(66+m),v=r=>input(c,r),prev=r=>`${b}${r}`;
  const range=`${c}8:${c}${drivers.length+7}`;
  let checks=`MIN(${range})>=0`;
  for(const row of pct)checks+=`,${c}${row}<=1`;
  if(key==='agency')checks+=`,${c}9<=${m?"'Plan'!"+b+'10':c+'8'},${c}9=INT(${c}9),${c}10=INT(${c}10)`;else checks+=`,${c}8=INT(${c}8)`;
  if(key==='ecommerce')checks+=`,${c}17=INT(${c}17),${c}18=INT(${c}18)`;
  const time=key==='landscaping'?16:key==='agency'?18:27;checks+=`,${c}${time}>0`;
  i.getRange(`${c}40`).formulas=[[`=IF(COUNT(${range})<>${drivers.length},0,IF(AND(${checks}),1,0))`]];
  const ready=`AND(${v(40)}=1${m?`,ISNUMBER(${prev(31)}),ISNUMBER(${prev(32)})`:''})`;
  const f=(r,expr)=>p.getRange(`${c}${r}`).formulas=[[`=IF(${ready},${expr},"n.a.")`]];
  let units,price,direct,fixed,owner,available,hours,collect,opening,ar,other,reserve;
  if(key==='landscaping'){units=v(8);price=v(9);direct=v(10);fixed=v(11);owner=v(12);available=`${v(13)}*${v(14)}*${v(15)}`;hours=v(16);collect=v(17);opening=v(18);ar=v(19);other=`SUM('Inputs'!${c}20:${c}23)`;reserve=v(24);}
  if(key==='agency'){units=m?`${prev(10)}-${v(9)}+${v(10)}`:`${v(8)}-${v(9)}+${v(10)}`;price=v(11);direct=v(12);fixed=v(13);owner=v(14);available=`${v(15)}*${v(16)}*${v(17)}`;hours=v(18);collect=v(19);opening=v(20);ar=v(21);other=`SUM('Inputs'!${c}22:${c}25)`;reserve=v(26);}
  if(key==='ecommerce'){units=v(8);price=v(9);direct=`${v(10)}+${v(11)}+${v(9)}*${v(12)}+${v(13)}+${v(14)}`;fixed=v(15);owner=v(16);available=`${v(28)}*${v(29)}*${v(30)}`;hours=v(27);collect=v(19);opening=v(20);ar=v(21);other=`SUM('Inputs'!${c}22:${c}25)`;reserve=v(26);}
  f(10,units);f(11,`${c}10*${price}`);f(12,`${c}10*(${direct})`);f(13,`${c}11-${c}12`);f(14,fixed);f(15,owner);f(16,`${c}13-${c}14-${c}15`);
  f(20,available);f(19,`${c}10*${hours}`);f(18,`ROUNDDOWN(${c}20/${hours},0)`);
  f(21,`IF(${c}10<0,"Invalid client cohort",IF(${c}10<>INT(${c}10),"Whole units required",IF(${c}10>${c}18,"Above capacity","Fits stated hours")))`);
  f(23,m?prev(31):opening);f(24,`${c}11*${collect}+${m?prev(32):ar}`);
  f(25,key==='ecommerce'?`${c}12-${c}10*${v(10)}`:`${c}12`);f(26,key==='ecommerce'?`${v(17)}*${v(10)}`:'0');f(27,`${c}14`);f(28,`${c}15`);f(29,other);f(30,`${c}24-SUM(${c}25:${c}29)`);f(31,`${c}23+${c}30`);f(32,`${c}11*(1-${collect})`);f(33,`IF(${c}31<${reserve},"Below reserve","At or above reserve")`);
  if(key==='ecommerce'){f(35,m?prev(37):v(18));f(36,v(17));f(37,`${c}35+${c}36-${c}10`);f(38,`IF(${c}37<0,"Stock shortfall","Stock covers shipments")`);}else{for(const r of [35,36,37,38])p.getRange(`${c}${r}`).values=[['n.a.']];}
 }
 p.getRange('C4').formulas=[['=IF(COUNT(C11:N11)=12,SUM(C11:N11),"n.a.")']];p.getRange('C5').formulas=[['=IF(COUNT(C16:N16)=12,SUM(C16:N16),"n.a.")']];p.getRange('C6').formulas=[['=IF(COUNT(C31:N31)=12,MIN(C31:N31),"n.a.")']];p.getRange('C7').formulas=[['=IF(COUNT(C10:N10)=12,COUNTIFS(C21:N21,"Above capacity"),"n.a.")']];p.getRange('C4:C6').setNumberFormat('$#,##0.00;($#,##0.00);"–"');
 for(const r of [13,16,31]){p.getRange(`B${r}:N${r}`).format.fill='#edf2f7';p.getRange(`B${r}:N${r}`).format.font={bold:true,color:'#152b3e'};}
 p.getRange('C21:N21').conditionalFormats.add('containsText',{text:'Above capacity',format:{fill:'#fde8e7',font:{color:'#9c2020',bold:true}}});p.getRange('C33:N33').conditionalFormats.add('containsText',{text:'Below reserve',format:{fill:'#fde8e7',font:{color:'#9c2020',bold:true}}});
 i.getRange('B36').values=[['Example assumptions: MyBreakeven, October 24, 2026.']];i.getRange('B37').values=[['Opening balances apply only in January. Later months roll forward.']];i.getRange('B38').values=[['Receipts not collected this month arrive next month; no bad debt.']];i.getRange('B39').values=[['Cash payments occur in the modeled month; no intra-month cash test.']];i.getRange('B40').values=[['Inputs complete and nonnegative (1=yes, 0=revise)']];for(const r of [36,37,38,39])i.getRange(`B${r}:N${r}`).merge();
 p.getRange('B41:N41').merge();p.getRange('B41').values=[['Result excludes unentered tax, finance, depreciation and owner costs. Cash rows include only entered payments.']];p.getRange('B42:N42').merge();p.getRange('B42').values=[[key==='ecommerce'?'Refund allowance is also paid in month; opening stock is already funded. One unit/order; returns are non-resalable.':key==='agency'?'Month-start client changes; later opening clients roll from prior active clients. Direct pay is not repeated in fixed costs.':'Direct visit cost includes variable labor. Owner compensation and fixed payroll must be entered once when applicable.']];
 // Behavioral checks: a blank input must not appear as zero, and changes must propagate.
 w.recalculate();const initial=p.getRange('C11:C16').values;const expected=key==='landscaping'?[0,0,0,3000,0,-3000]:key==='agency'?[18000,8100,9900,6000,0,3900]:[25000,18875,6125,5000,0,1125];expected.forEach((x,n)=>assert.equal(initial[n][0],x));
 const testRow=key==='landscaping'?8:key==='agency'?11:9;const before=i.getRange(`C${testRow}`).values[0][0];i.getRange(`C${testRow}`).values=[[null]];w.recalculate();assert.equal(p.getRange('C11').values[0][0],'n.a.');i.getRange(`C${testRow}`).values=[[before+10]];w.recalculate();assert.notEqual(p.getRange('C11').values[0][0],expected[0]);i.getRange(`C${testRow}`).values=[[before]];w.recalculate();
 const errors=await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!|#NULL!',options:{useRegex:true,maxResults:20},summary:'Formula errors'});await fs.writeFile(`${qa}/${key}-formula-scan.json`,errors.ndjson);
 console.log(key,JSON.stringify({summary:p.getRange('C4:C7').values,january:p.getRange('C23:C33').values}));
 for(const s of [p,i]){const preview=await w.render({sheetName:s.name,range:s.name==='Plan'?'B2:F21':'B2:F30',scale:1.5,format:'png'});await fs.writeFile(`${qa}/${key}-${s.name}.png`,new Uint8Array(await preview.arrayBuffer()));}
 const cashPreview=await w.render({sheetName:'Plan',range:'B23:F42',scale:1.5,format:'png'});await fs.writeFile(`${qa}/${key}-cash.png`,new Uint8Array(await cashPreview.arrayBuffer()));
 const x=await SpreadsheetFile.exportXlsx(w);await x.save(`${out}/${key}-business-plan-financials.xlsx`);
}
