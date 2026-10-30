import {writeFileSync} from 'node:fs';
const origin='https://mybreakeven.com';
const paths=['/robots.txt','/sitemap.xml','/blogs/target-profit-sales-formula/','/blogs/contribution-margin-vs-profit-margin/','/blogs/margin-of-safety-business/','/blogs/operating-leverage-small-business/','/blogs/restaurant-budgeting/','/blogs/restaurant-food-cost-percentage/','/blogs/restaurant-prime-cost','/blogs/restaurant-prime-cost/'];
const rows=[]; let sitemap='';
for(const path of paths){
 try {
  const r=await fetch(origin+path,{redirect:'follow',signal:AbortSignal.timeout(20000),headers:{'User-Agent':'MyBreakEven-Technical-Owner-Audit/1.0'}});
  const body=await r.text();const isHtml=path.startsWith('/blogs/');
  const canonical=isHtml?body.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1]??null:null;
  const index=isHtml?/name="robots" content="index,follow/i.test(body):null;
  const row={path,http:r.status,redirected:r.redirected,finalUrl:r.url,contentType:r.headers.get('content-type'),canonical,index,bytes:body.length,pass:r.ok};
  if(path==='/sitemap.xml'){sitemap=body;row.pass&&=body.includes('<urlset')&&body.includes('https://mybreakeven.com/blogs/restaurant-budgeting/');}
  if(path==='/robots.txt')row.pass&&=/Sitemap:\s*https:\/\/mybreakeven.com\/sitemap.xml/i.test(body)&&/User-agent:\s*\*/i.test(body);
  if(isHtml && path!=='/blogs/restaurant-prime-cost'){row.pass&&=canonical===origin+path&&index===true;}
  if(path==='/blogs/restaurant-prime-cost'){row.pass&&=r.url===origin+'/blogs/restaurant-prime-cost/';}
  if(path==='/blogs/restaurant-prime-cost/'){row.pass&&=canonical===origin+path;}
  rows.push(row);console.log((row.pass?'PASS ':'FAIL ')+JSON.stringify(row));
 }catch(e){rows.push({path,pass:false,error:String(e)});console.error('FAIL '+path+' '+e);}
}
for(const r of rows.filter(r=>r.path.startsWith('/blogs/')&&!r.path.includes('restaurant-prime-cost'))){if(!sitemap.includes('<loc>'+origin+r.path+'</loc>')){r.pass=false;r.sitemapMissing=true;}}
const result={checkedAt:new Date().toISOString(),rows,passed:rows.filter(x=>x.pass).length,failed:rows.filter(x=>!x.pass).length};
writeFileSync('technical-live-http-report.json',JSON.stringify(result,null,2));
console.log('Passed '+result.passed+'/'+rows.length);
if(result.failed)process.exitCode=1;
