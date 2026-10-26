// Deterministic editorial SVG covers. Exact example values remain in accessible HTML tables.
import {writeFile,mkdir} from 'node:fs/promises';
const out=new URL('../public/images/finance-guides/',import.meta.url);await mkdir(out,{recursive:true});
const covers=[
 ['financial-ratios','Financial ratios','One statement. Defined measures.','#315c83',['LIQUIDITY','PROFITABILITY','LEVERAGE','EFFICIENCY'],'grid'],
 ['fire-vs-coast-fire-vs-barista-fire','Different FIRE milestones','Separate assets, time and earned income.','#34665d',['FULL FIRE','COAST','PART-TIME INCOME'],'paths'],
 ['fire-withdrawal-rate-retirement-risks','The order of returns matters','A smooth average hides the withdrawal path.','#815846',['LOSS FIRST','WITHDRAWALS','GAIN FIRST'],'risk'],
 ['how-to-analyze-financial-statements','Read the whole statement','Connect profit, dated balances and cash.','#365c83',['INCOME','TWO BALANCE SHEETS','CASH BRIDGE'],'statements'],
 ['find-missing-value-equivalent-ratios','Find the missing term','Label the positions. Check the cross products.','#6b5292',['a : b','a × d = b × c','c : d'],'cross'],
 ['equivalent-ratio-tables-word-problems','Scale every part together','Different ratio families stay different.','#316c68',['5 : 2','WHOLE = 7 PARTS','2 : 1'],'parts'],
 ['mortgage-refinance-break-even','Which break-even question?','Compare cash and debt at the same date.','#315c83',['CASH PAYMENTS','SHARED SALE DATE','DEBT REMAINING'],'date'],
 ['refinance-closing-costs-financed-fees','Follow each closing charge','One fee belongs in one place.','#825b31',['UPFRONT','FINANCED','CREDITS'],'ledger'],
 ['refinance-shorter-vs-longer-term','A lower payment is one answer','Term length also changes the debt path.','#3b6674',['SHORTER TERM','SAME HORIZON','LONGER TERM'],'terms']
];
const text=(x,y,s,size=22,color='#263a50',extra='')=>`<text x="${x}" y="${y}" font-family="sans-serif" font-size="${size}" fill="${color}" ${extra}>${s}</text>`;
for(const[slug,title,sub,color,labels,kind]of covers){
 let art='';
 if(kind==='grid')art=labels.map((s,i)=>{const x=90+(i%2)*520,y=300+Math.floor(i/2)*130;return `<rect x="${x}" y="${y}" width="485" height="110" rx="15" fill="white" stroke="${color}"/>`+text(x+25,y+48,s,23,color)+`<path d="M${x+25} ${y+80}h310" stroke="${color}" stroke-width="6" opacity=".3"/>`;}).join('');
 if(kind==='paths')art=[0,1,2].map(i=>`<path d="M120 ${330+i*95}H1080" stroke="#c6d1dd" stroke-width="3"/><path d="M120 ${330+i*95}H${[960,680,450][i]}" stroke="${color}" stroke-width="9"/><circle cx="${[960,680,450][i]}" cy="${330+i*95}" r="12" fill="${color}"/>`).join('');
 if(kind==='terms')art=[450,750,1080].map((end,i)=>text(120,300+i*95,['180 MONTHS','300 MONTHS','360 MONTHS'][i],18,color)+`<path d="M120 ${330+i*95}H${end}" stroke="${color}" stroke-width="9"/><circle cx="${end}" cy="${330+i*95}" r="12" fill="${color}"/>`).join('')+`<path d="M320 275V550" stroke="#a56739" stroke-width="4" stroke-dasharray="7 7"/>`;
 if(kind==='risk')art=`<path d="M130 330 L520 510 L1000 395" fill="none" stroke="${color}" stroke-width="9"/><path d="M130 430 L520 295 L1000 365" fill="none" stroke="#386c80" stroke-width="9"/><path d="M130 550H1050" stroke="#bdcbd6" stroke-width="3"/>`;
 if(kind==='statements'||kind==='ledger')art=[0,1,2].map(i=>`<rect x="${100+i*350}" y="300" width="285" height="240" rx="14" fill="white" stroke="${color}" stroke-width="3"/>`+[0,1,2,3].map(j=>`<path d="M${125+i*350} ${345+j*45}h${j%2?175:230}" stroke="${color}" stroke-width="8" opacity="${.3+j*.14}"/>`).join('')).join('');
 if(kind==='cross')art=text(210,365,'a : b',65,color)+text(800,365,'c : d',65,color)+`<path d="M370 385L850 510 M850 385L370 510" stroke="${color}" stroke-width="6"/>`+text(510,370,'=',52,color);
 if(kind==='parts')art=[5,2,2,1].map((n,row)=>Array.from({length:n},(_,i)=>`<rect x="${125+(row>1?600:0)+i*65}" y="${310+(row%2)*100}" width="52" height="60" rx="6" fill="${row%2?'#9ab8c4':color}"/>`).join('')).join('');
 if(kind==='date')art=`<path d="M150 340H1050 M150 485H1050" stroke="${color}" stroke-width="8"/><path d="M770 270V535" stroke="#a56739" stroke-width="5" stroke-dasharray="9 8"/><circle cx="770" cy="340" r="14" fill="#a56739"/><circle cx="770" cy="485" r="14" fill="#a56739"/>`;
 const bottom=kind==='parts'?text(310,580,'5 : 2 / 7 TOTAL PARTS',22,color,'text-anchor="middle"')+text(875,580,'2 : 1 / 3 TOTAL PARTS',22,color,'text-anchor="middle"'):kind==='grid'?'':labels.map((s,i)=>text(260+i*340,610,s,18,color,'text-anchor="middle" font-weight="700"')).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#f4f7fa"/><circle cx="1140" cy="60" r="225" fill="${color}" opacity=".06"/>${text(80,80,'MYBREAKEVEN / EXPLAINED',23,color,'font-weight="700"')}${text(80,155,title,44,'#182b42','font-weight="700"')}${text(80,215,sub,27,'#4a6075')}${art}${bottom}</svg>`;
 await writeFile(slug==='financial-ratios'?new URL(slug+'.svg',out):new URL('../public/images/blog/finance-complete-'+slug+'.svg',import.meta.url),svg);
}
