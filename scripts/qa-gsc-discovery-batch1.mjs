import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const pairs=[['fixed-vs-variable-costs','activity-based-costing'],['how-to-calculate-cost-of-goods-sold','current-assets'],['operating-expenses','accrued-expenses'],['target-profit-sales-formula','pricing-strategies'],['how-to-price-products-for-ecommerce','cost-plus-pricing'],['margin-vs-markup','penetration-pricing']];
const seeds=['blogs/cost-drivers-small-business','blogs/job-order-costing','blogs/landscaping-crew-utilization','blogs/mulch-installation-job-cost','blogs/restaurant-sales-forecast','calculators/cash-flow-forecast-template','calculators/cash-runway-calculator','calculators/discount-break-even-calculator','calculators/hourly-rate-calculator','calculators/menu-pricing-calculator'];
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
assert.equal(await fs.readFile('dist/downloads/.htaccess','utf8'),await fs.readFile('public/downloads/.htaccess','utf8'));
assert((await fs.readFile('dist/robots.txt','utf8')).includes('Allow: /'));
for(const [source,target]of pairs){
 const h=await fs.readFile(`dist/blogs/${source}/index.html`,'utf8');
 assert(h.includes(`id="discovery-next-${source}"`),source);
 assert(h.includes(`href="/blogs/${target}/"`),source+' → '+target);
 assert(sitemap.includes(`https://mybreakeven.com/blogs/${target}/`));
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,source);
 assert.equal((h.match(/<h1\b/g)||[]).length,1,source);
}
for(const path of seeds){
 const h=await fs.readFile(`dist/${path}/index.html`,'utf8'),canonical=`https://mybreakeven.com/${path}/`;
 assert(h.includes(`rel="canonical" href="${canonical}"`),path);assert(sitemap.includes(canonical),path);
 assert(!/name="(?:robots|googlebot)" content="[^"]*noindex/.test(h),path);
 assert.equal((h.match(/<h1\b/g)||[]).length,1,path);
}
for(const path of ['login','dashboard','search']){const h=await fs.readFile(`dist/${path}/index.html`,'utf8');assert(/name="robots" content="[^"]*noindex/.test(h),path);assert(!sitemap.includes(`https://mybreakeven.com/${path}/`));}
const retained=await fs.readFile('dist/blogs/how-to-analyze-financial-statements/index.html','utf8');assert(retained.includes('href="/blogs/retained-earnings/"'));assert(!retained.includes('id="discovery-next-how-to-analyze-financial-statements"'));
console.log('Crawl/discovery batch1 passed: six contextual paths, retained seventh path, ten canonical owners, scoped download policy and protected utility exclusions.');
