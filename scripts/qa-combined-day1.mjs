import fs from'node:fs/promises';
import assert from'node:assert/strict';
import sharp from'sharp';
import{createHash}from'node:crypto';
import{combinedDay1Posts as posts}from'../src/content/blogs/combinedDay1.js';
import{blogPostMap}from'../src/content/blogs/index.js';
import{freeTools}from'../src/freeTools.js';
const before=JSON.parse(await fs.readFile('docs/combined-day1/baseline.json','utf8')),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
for(const x of before.blogs)assert.equal(hash(blogPostMap[x.slug]),x.hash,x.slug);
for(const x of before.tools)assert.equal(hash(freeTools[x.slug]),x.hash,x.slug);
const sitemap=await fs.readFile('dist/sitemap.xml','utf8'),report=[];
for(const [slug,p,kind]of [...posts.map(p=>[p.slug,p,'blogs']),...['cd-calculator','apy-calculator'].map(s=>[s,freeTools[s],'calculators'])]){
 const url=`https://mybreakeven.com/${kind}/${slug}/`,h=await fs.readFile(`dist/${kind}/${slug}/index.html`,'utf8');
 assert(h.includes(`rel="canonical" href="${url}"`),slug);assert(sitemap.includes(url),slug);assert.equal((h.match(/<h1\b/g)||[]).length,1,slug);assert(!h.includes('NaN'),slug);assert(h.includes(p.image));
 const nodes=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j]});const faq=nodes.find(n=>n['@type']==='FAQPage');assert.equal(faq.mainEntity.length,6,slug);
 for(const width of[1200,800,400]){const file='dist'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`),m=await sharp(file).metadata();assert.equal(m.width,width);assert.equal(m.height,width*9/16);assert((await fs.stat(file)).size<250000);}
 if(kind==='blogs'){const record=await fs.readFile(`dist/downloads/${slug}-worksheet.html`,'utf8');assert(record.includes('textarea'));assert(record.includes('noindex,follow'));assert(record.includes('does not calculate'));}
 report.push({slug,url,passed:true});
}
for(const [route,needle]of [['blogs/marginal-cost','marginal-cost-calculator'],['blogs/average-cost-per-unit','average-cost-calculator'],['blogs/margin-vs-markup','Choose the percentage you actually need'],['calculators/business-roi-calculator','simple-roi'],['calculators/future-value-calculator','Start with a simple compound-growth question'],['calculators/operating-profit-margin-calculator','Connect revenue, gross profit and operating income']])assert((await fs.readFile(`dist/${route}/index.html`,'utf8')).includes(needle),route);
assert(!sitemap.includes('/blogs/other-comprehensive-income/'));
await fs.mkdir('qa-artifacts',{recursive:true});await fs.writeFile('qa-artifacts/combined-day1-build.json',JSON.stringify({passed:true,newOwners:report,unchangedArticleRecords:before.blogs.length,unchangedToolRecords:before.tools.length},null,2));
console.log('Combined Day1: 8 owners, 48FAQs, 24covervariants, 6records and 6existing improvements verified; all old records preserved.');
