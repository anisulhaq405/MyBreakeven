import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const origin = 'http://127.0.0.1:4173';
const directory = '/tmp/mybreakeven-day2-browser';
const routes = [
  '/calculators/fire-calculator/',
  '/calculators/coast-fire-calculator/',
  '/calculators/financial-ratios-calculator/',
  '/guides/financial-ratios/',
  '/blogs/fire-vs-coast-fire-vs-barista-fire/',
  '/blogs/fire-withdrawal-rate-retirement-risks/',
  '/blogs/how-to-analyze-financial-statements/',
];
await fs.mkdir(directory, {recursive:true});
const browser=await chromium.launch({headless:true});
const results=[], failures=[];
try {
  for(const route of routes){
    const slug=route.split('/').filter(Boolean).at(-1);
    const report={route,viewports:[],csv:null,pdf:null};
    for(const width of [390,768,1280]){
      const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true}); page.setDefaultTimeout(12000);
      try {
        const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:8000});
        await page.locator('h1').first().waitFor({timeout:15000});
        await page.waitForTimeout(700);
        const metrics=await page.evaluate(async()=>{
          await Promise.race([Promise.all([...document.images].filter(i=>i.src.includes('20261026')).map(i=>i.decode().catch(()=>null))),new Promise(resolve=>setTimeout(resolve,2500))]);
          const image=[...document.images].find(i=>i.src.includes('20261026'));
          return {viewport:window.innerWidth,scroll:document.documentElement.scrollWidth,
            h1:document.querySelectorAll('h1').length,
            image:image?{url:image.src,loaded:image.complete&&image.naturalWidth>0,alt:image.alt}:null};
        });
        const check={requested:width,status:response?.status(),...metrics};
        check.pass=check.status===200&&check.viewport===width&&check.scroll<=width+3&&check.h1===1&&check.image?.loaded===true;
        report.viewports.push(check);
        if(width!==1280)await page.screenshot({path:path.join(directory,slug+'-'+width+'.png'),fullPage:false});
        if(!check.pass)failures.push(slug+' responsive '+JSON.stringify(check));
        if(width===1280&&route.startsWith('/calculators/')){
          try{
            const button=page.getByRole('button',{name:/download.*csv/i}).first();
            const [download]=await Promise.all([page.waitForEvent('download',{timeout:12000}),button.click()]);
            const filename=download.suggestedFilename();
            const filenamePath=path.join(directory,slug+'-'+filename);
            await download.saveAs(filenamePath);
            const body=await fs.readFile(filenamePath,'utf8');
            const lines=body.replace(/^\uFEFF/,'').trim().split(/\r?\n/);
            report.csv={filename,bytes:Buffer.byteLength(body),rows:lines.length,bom:body.startsWith('\uFEFF'),first:lines[0],last:lines.at(-1)};
            if(!report.csv.bom||lines.length<20)failures.push(slug+' CSV '+JSON.stringify(report.csv));
          }catch(e){report.csv={error:e.message};failures.push(slug+' CSV '+e.message);}
          try{
            const pdf=await page.pdf({format:'A4',printBackground:true});
            await fs.writeFile(path.join(directory,slug+'.pdf'),pdf);
            report.pdf={bytes:pdf.length,valid:pdf.subarray(0,5).toString()==='%PDF-'};
            if(!report.pdf.valid||pdf.length<3000)failures.push(slug+' PDF '+JSON.stringify(report.pdf));
          }catch(e){report.pdf={error:e.message};failures.push(slug+' PDF '+e.message);}
        }
      }catch(e){failures.push(slug+' width '+width+' '+e.message);}
      finally{await page.close();}
    }
    results.push(report);
    console.log(slug,JSON.stringify({viewports:report.viewports.map(x=>({width:x.requested,scroll:x.scroll,pass:x.pass})),csv:report.csv?.rows,pdf:report.pdf?.bytes}));
  }
}finally{await browser.close();}
await fs.writeFile(path.join(directory,'report.json'),JSON.stringify({routes:results,failures},null,2));
if(failures.length){console.error('Day 2 QA failures:',JSON.stringify(failures,null,2));process.exitCode=1;}
