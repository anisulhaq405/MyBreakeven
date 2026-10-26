import {chromium} from 'playwright';
import {promises as fs} from 'node:fs';
import assert from 'node:assert/strict';

const origin=process.env.DAY1_QA_ORIGIN||'http://127.0.0.1:4173';
const directory='/tmp/mybreakeven-day1-browser';
const routes=['/calculators/ebitda-calculator/','/calculators/future-value-calculator/',...['ebitda-vs-net-income-vs-cash-flow','adjusted-ebitda-add-backs','present-value-vs-future-value','ordinary-annuity-vs-annuity-due'].map(s=>'/blogs/'+s+'/')];
await fs.mkdir(directory,{recursive:true});
const browser=await chromium.launch({headless:true});
const reports=[],failures=[];
try{
 for(const route of routes){
  const slug=route.split('/').filter(Boolean).at(-1),report={route,viewports:[]};
  for(const width of [390,768,1280]){
   const page=await browser.newPage({viewport:{width,height:900},acceptDownloads:true});page.setDefaultTimeout(15000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   try{
    const response=await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
    await page.locator('h1').waitFor();
    const feature=page.locator('img[src*="topic-20261026"]').first();await feature.scrollIntoViewIfNeeded();await feature.evaluate(i=>i.decode());
    const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,image:[...document.images].filter(i=>i.src.includes('topic-20261026')).some(i=>i.complete&&i.naturalWidth>0),canonical:document.querySelector('link[rel="canonical"]')?.href}));
    assert.equal(metrics.width,width);assert.ok(metrics.scroll<=width+3,JSON.stringify(metrics));assert.equal(metrics.h1,1);assert.ok(metrics.image);assert.equal(metrics.canonical,'https://mybreakeven.com'+route);
    if(route.startsWith('/calculators/')){
     const summary=page.locator('.fd-summary');
     if(slug==='ebitda-calculator'){
      assert.match(await summary.innerText(),/130,000/);
      await page.locator('#fd-net').fill('90000');assert.match(await summary.innerText(),/140,000/);
      await page.locator('#fd-net').press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'fd-interest');
      await page.locator('#fd-net').fill('');assert.equal(await page.locator('#fd-net').getAttribute('aria-invalid'),'true');assert.match(await summary.innerText(),/Correct/);
      await page.getByRole('button',{name:'Reset example',exact:true}).click();assert.match(await summary.innerText(),/130,000/);
      await page.getByText('Adjusted EBITDA — separate signed items (0)',{exact:true}).click();
      await page.getByRole('button',{name:'Add signed adjustment',exact:true}).click();assert.equal(await page.locator('#fd-adjust-name-0').getAttribute('aria-invalid'),'true');
      await page.locator('#fd-adjust-name-0').fill('Legal expense');await page.locator('#fd-adjust-value-0').fill('12000');assert.match(await page.locator('#finance-results').innerText(),/142,000/);
      await page.getByRole('button',{name:'Add signed adjustment',exact:true}).click();await page.locator('#fd-adjust-name-1').fill(' legal expense ');assert.equal(await page.locator('#fd-adjust-name-1').getAttribute('aria-invalid'),'true');
      await page.getByRole('button',{name:'Reset example',exact:true}).click();await page.locator('#fd-tax').fill('-2000');assert.match(await summary.innerText(),/108,000/);
      await page.getByRole('button',{name:'Reset example',exact:true}).click();
     }else{
      for(const [key,value]of Object.entries({principal:'10000',payment:'0',months:'24',rate:'5'}))await page.locator('#fd-'+key).fill(value);
      assert.match(await summary.innerText(),/11,025/);
      await page.locator('#fd-rate').fill('');assert.equal(await page.locator('#fd-rate').getAttribute('aria-invalid'),'true');assert.match(await summary.innerText(),/Correct/);
      await page.getByRole('button',{name:'Reset example',exact:true}).click();
      await page.getByText('Advanced rate and inflation settings',{exact:true}).click();
      for(const [key,value]of Object.entries({principal:'0',payment:'100',months:'2',rate:'12',inflation:'0'}))await page.locator('#fd-'+key).fill(value);
      await page.locator('#fd-basis').selectOption('nominal');await page.locator('#fd-compound').selectOption('12');assert.match(await summary.innerText(),/201\.00/);
      await page.locator('#fd-timing').selectOption('begin');assert.match(await summary.innerText(),/203\.01/);
      if(width===1280){const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download schedule CSV',exact:true}).click()]);const dest=directory+'/'+download.suggestedFilename();await download.saveAs(dest);const csv=await fs.readFile(dest,'utf8');assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes('"Ending balance","203.01"'));assert.ok(csv.includes('"Timing","begin"'));report.csv={fixture:'two beginning monthly deposits at 1% monthly',endingBalance:203.01,bytes:Buffer.byteLength(csv)};}
      await page.getByRole('button',{name:'Reset example',exact:true}).click();assert.equal(await page.locator('#fd-rate').inputValue(),'6');
     }
     assert.ok(await page.locator('.fd-summary').getAttribute('aria-live')==='polite');
     await page.emulateMedia({media:'print'});
     assert.equal(await page.locator('.analytics-consent').evaluateAll(ns=>ns.some(n=>getComputedStyle(n).display!=='none')),false);
     if(width===1280){const pdf=await page.pdf({format:'A4',printBackground:true});assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.length>3000);await fs.writeFile(directory+'/'+slug+'.pdf',pdf);report.pdf={bytes:pdf.length};}
     await page.emulateMedia({media:'screen'});
    }
    assert.deepEqual(errors,[]);report.viewports.push({...metrics,pass:true});
    await feature.scrollIntoViewIfNeeded();if(width===390)await page.screenshot({path:directory+'/'+slug+'-390.png'});
   }catch(e){failures.push(slug+' '+width+': '+e.stack);report.viewports.push({width,pass:false,error:e.message});}
   finally{await page.close();}
  }
  reports.push(report);console.log(slug,JSON.stringify(report));
 }
}finally{await browser.close();}
await fs.writeFile(directory+'/report.json',JSON.stringify({origin,reports,failures},null,2));
assert.deepEqual(failures,[]);
