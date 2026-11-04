const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
 const output=path.resolve('qa-artifacts/november04-gsc');await fs.mkdir(output,{recursive:true});
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const results=[];
 try{
  for(const width of [390,1365]){
   const context=await browser.newContext({viewport:{width,height:900}});
   for(const slug of ['how-to-calculate-working-capital','fixed-vs-variable-costs']){
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto('http://127.0.0.1:4173/blogs/'+slug+'/',{waitUntil:'networkidle'});
    for(const img of await page.locator('article img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
    await page.evaluate(()=>scrollTo(0,0));
    const checks=await page.evaluate(()=>{
     const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
     return {h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content,overflow:document.documentElement.scrollWidth>innerWidth+1,overflowElements:[...document.querySelectorAll('article *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&!e.closest('.article-table-scroll')).slice(0,8).map(e=>e.tagName+':'+e.className),images:[...document.querySelectorAll('article img')].every(e=>e.complete&&e.naturalWidth>0&&e.alt),duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),brokenAnchors:[...document.querySelectorAll('article a[href^="#"]')].filter(e=>!document.getElementById(e.hash.slice(1))).map(e=>e.hash),schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),downloads:[...new Set([...document.querySelectorAll('article a[href^="/downloads/"]')].map(e=>e.getAttribute('href')))]};
    });
    const downloads=[];for(const href of checks.downloads){const r=await context.request.get('http://127.0.0.1:4173'+href);downloads.push({href,status:r.status()});}
    const pass=response.status()===200&&checks.h1===1&&checks.canonical==='https://mybreakeven.com/blogs/'+slug+'/'&&!checks.robots?.includes('noindex')&&!checks.overflow&&checks.images&&!checks.duplicateIds.length&&!checks.brokenAnchors.length&&!errors.length&&downloads.every(r=>r.status===200);
    results.push({slug,width,pass,...checks,errors,downloadChecks:downloads});
    await page.screenshot({path:path.join(output,slug+'-'+width+'.png'),fullPage:true});await page.close();
   }
   await context.close();
  }
 }finally{await browser.close();await fs.writeFile(path.join(output,'report.json'),JSON.stringify(results,null,2));}
 console.log(JSON.stringify({views:results.length,pass:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass)}));
 if(results.length!==4||results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
