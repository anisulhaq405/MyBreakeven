const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
 const {twelveDayDay1Posts:posts}=await import('../src/content/blogs/twelveDayDay1.js');
 const published=process.env.DAY1_QA_MODE==='published';
 const base=process.env.DAY1_QA_BASE||'http://127.0.0.1:4173';
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const result=[];await fs.mkdir('../analysis/day1-browser',{recursive:true});
 for(const viewport of [{width:390,height:844},{width:1365,height:1000}]){
  const context=await browser.newContext({viewport});
  for(const p of posts){
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+(published?'/blogs/':'/review/day1/')+p.slug+'/',{waitUntil:'networkidle'});
   const checks=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,title:document.title,robots:document.querySelector('meta[name="robots"]')?.content,overflow:document.documentElement.scrollWidth>innerWidth+1,image:[...document.querySelectorAll('article img')].every(i=>i.complete&&i.naturalWidth>0),imageAlt:[...document.querySelectorAll('article img')].every(i=>!!i.alt),schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{JSON.parse(s.textContent);return true}),brokenAnchors:[...document.querySelectorAll('article a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
   const bad=checks.h1!==1||(published?checks.robots?.includes('noindex'):!checks.robots?.startsWith('noindex'))||checks.overflow||!checks.image||!checks.imageAlt||checks.brokenAnchors.length||errors.length;
   result.push({slug:p.slug,width:viewport.width,pass:!bad,...checks,errors});
   await page.screenshot({path:'../analysis/day1-browser/'+p.slug+'-'+viewport.width+'.png',fullPage:true});await page.close();
  }
  await context.close();
 }
 await browser.close();await fs.writeFile('../analysis/day1-browser-qa.json',JSON.stringify(result,null,2));
 console.log(JSON.stringify({views:result.length,pass:result.filter(r=>r.pass).length,failed:result.filter(r=>!r.pass)}));
 if(result.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
