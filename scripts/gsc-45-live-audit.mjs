import {readFileSync,writeFileSync} from 'node:fs';
const doc=readFileSync('docs/seo/2026-10-26-gsc-discovered-45-recovery.md','utf8');
const section=doc.split('## Exact 45 URLs')[1]?.split('## Action policy')[0]||'';
const urls=[...section.matchAll(/^- (https:\/\/mybreakeven\.com\/[^\s]+)$/gm)].map(m=>m[1]);
if(urls.length!==45 || new Set(urls).size!==45)throw Error('Expected exactly 45 unique GSC URLs: got '+urls.length);
const sitemap=await fetch('https://mybreakeven.com/sitemap.xml',{signal:AbortSignal.timeout(25000)}).then(r=>r.text());
const out=[];const concurrency=5;
for(let i=0;i<urls.length;i+=concurrency){
 const batch=urls.slice(i,i+concurrency);
 const results=await Promise.all(batch.map(async url=>{
  try{
   const r=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'MyBreakEven-Index-Recovery-Owner-QA/1.0'}});
   const html=await r.text();
   const canonical=html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]||'';
   const robots=html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i)?.[1]||'';
   const isSitemapped=sitemap.includes('<loc>'+url+'</loc>');
   const check={url,http:r.status,finalUrl:r.url,canonical,robots,sitemap:isSitemapped,pass:r.ok&&r.url===url&&canonical===url&&!/noindex/i.test(robots)&&isSitemapped};
   console.log((check.pass?'PASS ':'FAIL ')+url+' HTTP '+r.status+' final '+r.url+' canonical '+canonical+' robots '+robots);
   return check;
  }catch(e){return {url,pass:false,error:String(e)};}
 }));
 out.push(...results);
}
const report={date:new Date().toISOString(),source:'2026-10-26 45-URL exact GSC recovery register',checked:out.length,passed:out.filter(x=>x.pass).length,failed:out.filter(x=>!x.pass).length,results:out};
writeFileSync('gsc-45-live-technical-report.json',JSON.stringify(report,null,2));
console.log('GSC exact cohort: '+report.passed+'/'+report.checked+' passed');
if(report.failed)process.exitCode=1;
