import{readFileSync,existsSync}from'node:fs';
import assert from'node:assert/strict';
const route='calculators/ecommerce-break-even-calculator',h=readFileSync(`dist/${route}/index.html`,'utf8');
assert.equal((h.match(/<h1\b/g)||[]).length,1);
assert(h.includes(`rel="canonical" href="https://mybreakeven.com/${route}/"`));
assert(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(h));
for(const t of ['Detailed costs &amp; returns','Download this scenario (CSV)','30.45','November 12, 2026','industry-quick-estimate','ecommerce-product-examples'])assert(h.includes(t),t);
const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,'unique IDs');
const schemas=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
const faq=schemas.find(x=>x['@type']==='FAQPage');assert.equal(faq.mainEntity.length,15);
for(const q of faq.mainEntity)assert(h.includes(q.name.replaceAll('&','&amp;')),q.name);
assert.equal(schemas.find(x=>x['@type']==='WebPage').dateModified,'2026-11-12');
for(const m of h.matchAll(/href="(\/[^"#?]*)[^"]*"/g)){const p=m[1];if(p==='/'||p==='/#')continue;assert(existsSync('dist'+p)||existsSync('dist'+p+'/index.html'),p)}
assert(readFileSync('dist/sitemap.xml','utf8').includes(`<loc>https://mybreakeven.com/${route}/</loc><lastmod>2026-11-12</lastmod>`));
console.log('Ecommerce detailed release: canonical, indexability, formulas, 15 FAQs, unique IDs, links and review date passed.');
