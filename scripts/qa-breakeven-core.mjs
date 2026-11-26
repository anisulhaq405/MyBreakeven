import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import{beforeBatch4BlogPosts as blogPosts,beforeBreakevenCoreBlogPosts}from'../src/content/blogs/index.js';
import{homeFaq}from'../src/homeFaq.js';
const home=await fs.readFile('dist/index.html','utf8'),guide=await fs.readFile('dist/blogs/calculate-break-even-point/index.html','utf8');
assert.equal(blogPosts.length,242);
for(const[i,p]of blogPosts.entries())if(p.slug!=='calculate-break-even-point')assert.equal(p,beforeBreakevenCoreBlogPosts[i]);
assert(home.includes('<h1>Break-even point calculator</h1>'));
assert(home.indexOf('id="breakeven-meaning"')<home.indexOf('Free business planning tools'));
assert(home.includes('Breakeven is the sales level'));
assert(home.includes('Revenue and total cost meet at 200 units'));
assert(guide.indexOf('id="quick-answer"')<guide.indexOf('article-featured'));
assert(guide.includes('"dateModified":"2026-11-24"'));
const schema=JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.deepEqual(schema['@graph'].find(x=>x['@type']==='FAQPage').mainEntity.map(q=>[q.name,q.acceptedAnswer.text]),homeFaq);
assert.equal(schema['@graph'].find(x=>x['@type']==='WebPage').dateModified,'2026-11-24');
assert.equal(schema['@graph'].find(x=>x['@type']==='WebSite').potentialAction.target,'https://mybreakeven.com/search/?q={search_term_string}');
let destinations=0;
for(const[name,h,url]of[['home',home,'https://mybreakeven.com/'],['guide',guide,'https://mybreakeven.com/blogs/calculate-break-even-point/']]){
 assert(h.includes(`rel="canonical" href="${url}"`));assert.equal((h.match(/<h1\b/g)||[]).length,1);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,name);
 for(const m of h.matchAll(/href="\/(?:blogs|calculators|resources|guides)\/[^"?#]*/g)){
  const path=m[0].slice(6);await fs.access('dist'+path+(path.endsWith('/')?'index.html':''));destinations++;
 }
}
const sm=await fs.readFile('dist/sitemap.xml','utf8');assert(sm.includes('<loc>https://mybreakeven.com/</loc><lastmod>2026-11-24</lastmod>'));assert(sm.includes('<loc>https://mybreakeven.com/blogs/calculate-break-even-point/</loc><lastmod>2026-11-24</lastmod>'));
console.log(JSON.stringify({homepage:'passed',guide:'passed',unchangedArticles:241,localDestinations:destinations,faqSchema:'passed',sitemap:'passed',meaningFormulaAndChart:'passed'}));
