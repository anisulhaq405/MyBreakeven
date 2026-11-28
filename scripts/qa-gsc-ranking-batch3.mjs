import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {growthUpdates} from '../src/organicGrowthUpdates.js';
const review=JSON.parse(await fs.readFile('docs/gsc-batch3-20261127/review.json','utf8'));
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
for(const p of review.pages){
 const h=await fs.readFile('dist/'+p.path+'/index.html','utf8');
 const growth=growthUpdates[p.slug];
 const title=growth?.title ? growth.title+' | MyBreakeven' : p.title;
 assert(h.includes('<title>'+title+'</title>'),p.slug+' expected title');
 assert(h.includes('name="description" content="'+(growth?.description || p.description)+'"'),p.slug+' expected description');
 assert(h.includes('rel="canonical" href="'+p.canonical+'"'),p.slug+' canonical');
 assert(sitemap.includes(p.canonical));assert(!/name="(?:robots|googlebot)" content="[^"]*noindex/.test(h),p.slug);
 assert.equal((h.match(/<h1\b/g)||[]).length,1,p.slug);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,p.slug);
 if(p.newTarget){
  assert(h.includes('id="discovery-next-'+p.slug+'"'),p.slug+' new context');
  assert(h.includes('href="/blogs/'+p.newTarget+'/"'),p.slug+' destination');
  await fs.access('dist/blogs/'+p.newTarget+'/index.html');
 }
}
const budget=await fs.readFile('dist/blogs/restaurant-budgeting/index.html','utf8');
assert(budget.indexOf('/downloads/restaurant-monthly-budget-template.xlsx')<budget.indexOf('article-featured'));
const contribution=await fs.readFile('dist/blogs/calculate-contribution-margin/index.html','utf8');
assert(contribution.includes('id="contribution-calculator"'));assert(contribution.includes('id="contribution-total-heading"'));
const fixed=await fs.readFile('dist/blogs/fixed-vs-variable-costs/index.html','utf8');assert(fixed.includes('href="/blogs/activity-based-costing/"'));
console.log('Batch3 ranking paths: eight owners reviewed; four contextual handoffs; expected metadata, calculators, workbook access and Batch1 paths.');
