import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const origin='http://127.0.0.1:4173';
const output='/tmp/mybreakeven-day3-browser';
const routes=[
'/calculators/equivalent-ratio-calculator/',
'/blogs/find-missing-value-equivalent-ratios/',
'/blogs/equivalent-ratio-tables-word-problems/',
'/calculators/refinance-calculator/',
'/blogs/mortgage-refinance-break-even/',
'/blogs/refinance-closing-costs-financed-fees/',
'/blogs/refinance-shorter-vs-longer-term/'
];
const sections={
'find-missing-value-equivalent-ratios':'four-step-ratio-answer-check',
'equivalent-ratio-tables-word-problems':'ratio-word-problem-practice',
'mortgage-refinance-break-even':'refinance-two-method-decision',
'refinance-closing-costs-financed-fees':'loan-estimate-field-map',
'refinance-shorter-vs-longer-term':'term-decision-shortlist'
};
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],failures=[];
try {
 for(const route of routes){
  const slug=route.split('/').filter(Boolean).at(-1);
  const report={route,viewports:[],axe:[],pdf:null,csv:null};
  for(const width of [390,768,1280]){
   const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true});
   page.setDefaultTimeout(10000);
   try {
    const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:16000});
    await page.locator('h1').first().waitFor({timeout:12000});
    const feature=page.locator('img[src*="/images/"]').first();
    if(await feature.count())await feature.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const metrics=await page.evaluate(()=>{
      const image=[...document.images].find(i=>i.src.includes('/images/'));
      return{viewport:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,
       image:image?{loaded:image.complete&&image.naturalWidth>0,alt:image.alt,url:image.currentSrc}:null};
    });
    const item={requested:width,status:response?.status(),...metrics};
    item.pass=item.status===200&&item.viewport===width&&item.scroll<=width+3&&item.h1===1&&item.image?.loaded===true;
    report.viewports.push(item);
    if(!item.pass)failures.push(slug+' viewport '+JSON.stringify(item));
    if(width===390||width===768)await page.screenshot({path:path.join(output,slug+'-'+width+'.png'),fullPage:false});
    if(width===1280){
      if(sections[slug]){
        const count=await page.locator('#'+sections[slug]).count();
        report.section=count;
        if(count!==1)failures.push(slug+' new content section count '+count);
      }
      await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
      report.axe=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return r.violations.map(x=>({id:x.id,impact:x.impact,count:x.nodes.length,targets:x.nodes.slice(0,3).map(n=>n.target)}));});
      if(report.axe.length)failures.push(slug+' axe '+JSON.stringify(report.axe));
      await page.emulateMedia({media:'print'});
      report.printConsentVisible=await page.locator('.analytics-consent').evaluateAll(ns=>ns.some(n=>getComputedStyle(n).display!=='none'));
      if(report.printConsentVisible)failures.push(slug+' consent popup visible when printing');
      const bytes=await page.pdf({format:'A4',printBackground:true});
      await fs.writeFile(path.join(output,slug+'.pdf'),bytes);
      report.pdf={bytes:bytes.length,valid:bytes.subarray(0,5).toString()==='%PDF-'};
      if(!report.pdf.valid||bytes.length<3000)failures.push(slug+' PDF invalid');
      await page.emulateMedia({media:'screen'});
      if(slug==='equivalent-ratio-calculator'){
        await page.locator('.ff-select select').first().selectOption('solve');
        await page.getByLabel('Second ratio term 1').fill('x');
        const result=await page.locator('#calculator-results').innerText();
        report.solveValid=result.includes('8');
        if(!report.solveValid)failures.push('C07 solve mode did not show 8 for 2:3 = x:12');
      }
      if(slug==='refinance-calculator'){
        try {
         const [download]=await Promise.all([page.waitForEvent('download',{timeout:15000}),page.getByRole('button',{name:/Download both amortization schedules CSV/i}).click()]);
         const file=path.join(output,'refinance-amortization.csv');
         await download.saveAs(file);
         const csv=await fs.readFile(file,'utf8');
         report.csv={bytes:Buffer.byteLength(csv),bom:csv.startsWith('\uFEFF'),rows:csv.trim().split(/\r?\n/).length,hasMonth:csv.includes('Month'),hasBalance:csv.includes('balance')||csv.includes('Balance')};
         if(report.csv.rows<300||!report.csv.hasMonth||!report.csv.hasBalance)failures.push('C08 incomplete CSV '+JSON.stringify(report.csv));
        }catch(e){report.csv={error:e.message};failures.push('C08 CSV error '+e.message);}
      }
    }
   } catch(e){failures.push(slug+' width '+width+' '+e.message);}
   finally{await page.close();}
  }
  console.log(slug,JSON.stringify({viewports:report.viewports.map(x=>({w:x.requested,ok:x.pass,scroll:x.scroll})),axe:report.axe,printConsent:report.printConsentVisible,csv:report.csv,pdf:report.pdf,solveValid:report.solveValid}));
  results.push(report);
 }
}finally{await browser.close();}
await fs.writeFile(path.join(output,'report.json'),JSON.stringify({results,failures},null,2));
if(failures.length){console.error('Day 3 browser QA failures',JSON.stringify(failures,null,2));process.exitCode=1;}
