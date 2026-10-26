import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const covers=[
 ['financial-ratios-calculator','Financial ratios','One statement. Clearly defined measures.',['LIQUIDITY','PROFITABILITY','LEVERAGE'],'#315c83','bars'],
 ['equivalent-ratio-calculator','Equivalent ratios','Scale every component together',['ORIGINAL','SAME FACTOR','EQUIVALENT'],'#6a5392','timeline'],
 ['refinance-calculator','Mortgage refinance','Compare cash and debt at the same date',['CURRENT LOAN','FEES + TIME','NEW LOAN'],'#236b65','growth'],
 ['fire-calculator','Financial independence','Build toward your full FIRE target',['INVESTED ASSETS','KEEP SAVING','FIRE TARGET'],'#37568b','growth'],
 ['coast-fire-calculator','Coast FIRE','Test growth with zero further deposits',['INVESTED TODAY','TIME TO GROW','RETIREMENT TARGET'],'#256b62','timeline'],
 ['ebitda-calculator','EBITDA','Trace the earnings bridge',['NET INCOME','INTEREST + TAX','D + A'],'#5538a4','bridge'],
 ['ebitda-vs-net-income-vs-cash-flow','Profit and cash','Three measures. Different questions.',['EARNINGS','RECONCILIATION','CASH'],'#236375','bars'],
 ['adjusted-ebitda-add-backs','Adjusted EBITDA','Make every adjustment visible',['BASE','EVIDENCE','ADJUSTED'],'#5e467d','bridge'],
 ['future-value-calculator','Future value','See contributions and growth separately',['START','CONTRIBUTE','PROJECT'],'#16665f','growth'],
 ['present-value-vs-future-value','Present and future','Compare money on the same date',['TODAY','TIME + RATE','LATER'],'#295d91','timeline'],
 ['ordinary-annuity-vs-annuity-due','Payment timing','Beginning or end changes the result',['BEGINNING','PERIOD','END'],'#795221','timeline']
];
const out=new URL('../public/images/finance-day1/',import.meta.url);await mkdir(out,{recursive:true});
for(const[slug,title,subtitle,labels,color,kind]of covers){
 const dest=slug.endsWith('calculator')?out:new URL('../public/images/blog/',import.meta.url);
 const name=slug.endsWith('calculator')?slug:'finance-day1-'+slug;
 const shapes=kind==='growth'?`<path d="M125 530 C350 520 440 485 570 440 S830 310 1080 235" fill="none" stroke="${color}" stroke-width="11"/><path d="M125 540 L1080 540 M125 540 L125 290" stroke="#bdc9d2" stroke-width="3"/>`:
 kind==='timeline'?`<path d="M165 415 H1035" stroke="${color}" stroke-width="8"/>${[180,600,1020].map(x=>`<circle cx="${x}" cy="415" r="20" fill="${color}"/><path d="M${x} 385 V330" stroke="${color}" stroke-width="4"/>`).join('')}`:
 [0,1,2].map((i)=>`<rect x="${130+i*325}" y="${kind==='bars'?380-i*45:365}" width="280" height="${kind==='bars'?160+i*45:170}" rx="20" fill="${i===1?'#e0d9ee':color}" opacity="${i===1?1:.88}"/>`).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#f5f7fb"/><circle cx="1120" cy="30" r="260" fill="${color}" opacity=".07"/><text x="80" y="90" font-family="sans-serif" font-size="23" font-weight="700" fill="${color}">MYBREAKEVEN • FORMULA EXPLAINED</text><text x="80" y="165" font-family="sans-serif" font-size="48" font-weight="700" fill="#182b42">${title}</text><text x="80" y="215" font-family="sans-serif" font-size="27" fill="#4f6073">${subtitle}</text>${shapes}${labels.map((s,i)=>`<text x="${270+i*325}" y="590" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="${color}">${s}</text>`).join('')}</svg>`;
 await writeFile(new URL(name+'.webp',dest),await sharp(Buffer.from(svg)).webp({quality:88}).toBuffer());
 await writeFile(new URL(name+'-800.webp',dest),await sharp(Buffer.from(svg)).resize(800,450).webp({quality:85}).toBuffer());
}
