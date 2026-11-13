import{readFileSync,existsSync}from'node:fs';import assert from'node:assert/strict';
const route='blogs/fixed-vs-variable-costs',h=readFileSync(`dist/${route}/index.html`,'utf8');
assert.equal((h.match(/<h1\b/g)||[]).length,1);assert(h.includes(`rel="canonical" href="https://mybreakeven.com/${route}/"`));assert(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(h));
for(const t of ['Fixed Costs vs Variable Costs (With Examples)','November 13, 2026','fixed-variable-layout','fixed-variable-step-profit','63 whole visits','$10.60','data-label="Fixed cost"','day4-cost-curves.svg','day6-20261111-fixed-vs-variable-costs'])assert(h.includes(t),t);
assert.equal((h.match(/class="fixed-variable-step-card/g)||[]).length,5);
const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size,'unique IDs');for(const m of h.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),m[1]);
const es=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});const faq=es.find(x=>x['@type']==='FAQPage');assert.equal(faq.mainEntity.length,10);for(const q of faq.mainEntity)assert(h.includes(q.name.replaceAll('&','&amp;')),q.name);assert(es.some(x=>x.dateModified==='2026-11-13'));
for(const m of h.matchAll(/href="(\/[^"#?]*)[^"]*"/g)){const p=m[1];if(p==='/')continue;assert(existsSync('dist'+p)||existsSync('dist'+p+'/index.html'),p)}
assert(readFileSync('dist/sitemap.xml','utf8').includes(`<loc>https://mybreakeven.com/${route}/</loc><lastmod>2026-11-13</lastmod>`));console.log('Fixed/variable release: exact step example, 10 matched FAQs, source references, anchors, canonical, dates and links passed.');
