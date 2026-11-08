import {applyAuthenticityReview} from '../src/content/blogs/authenticityReview20261108.js';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import sharp from 'sharp';
import {blogPostMap} from '../src/content/blogs/index.js';
import {twelveDayDay3Posts} from '../src/content/blogs/twelveDayDay3.js';
import {day3ExistingAdditions} from '../src/content/blogs/twelveDayDay3Review.js';
const report=[];
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
for(const original of twelveDayDay3Posts){
 const p=applyAuthenticityReview(original);
 const canonical=`https://mybreakeven.com/blogs/${p.slug}/`;
 const html=await fs.readFile(`dist/blogs/${p.slug}/index.html`,'utf8');
 assert(html.includes(`rel="canonical" href="${canonical}"`),p.slug+' canonical');
 assert(/<meta name="robots" content="index,follow/.test(html),p.slug+' robots');
 assert(!html.includes('Unpublished draft for review'));assert(!html.includes('Invalid Date'));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert(sitemap.includes(canonical));
 const blocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const nodes=blocks.flatMap(b=>b['@graph']||[b]);
 const article=nodes.find(n=>n['@type']==='BlogPosting');assert(article,p.slug+' schema');
 assert.equal(article.datePublished,'2026-11-06');assert.equal(article.dateModified,p.modified);assert.equal(article.headline,p.title);
 const faq=nodes.find(n=>n['@type']==='FAQPage');assert.equal(faq.mainEntity.length,p.faq.length);
 for(const q of faq.mainEntity)assert(html.includes(q.name.replaceAll('&','&amp;')),p.slug+' visible FAQ');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
 for(const[id]of p.sectionLinks)assert(ids.includes(id));
 for(const[,href]of p.html.matchAll(/href="(\/[^"#?]+)"/g)){
  const target=href.endsWith('.html')?path.join('dist',href):path.join('dist',href,'index.html');
  assert((await fs.stat(target)).isFile(),target);
 }
 for(const width of [1200,800,400]){
  const file='dist'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`);
  const meta=await sharp(file).metadata();assert.equal(meta.width,width);assert.equal(meta.height,Math.round(width*9/16));assert((await fs.stat(file)).size<250000);
 }
 const worksheet=await fs.readFile(`dist/downloads/${p.slug}-worksheet.html`,'utf8');assert(worksheet.includes('contenteditable="true"'));
 assert(twelveDayDay3Posts.some(other=>other.slug!==p.slug&&other.html.includes(`/blogs/${p.slug}/`)),p.slug+' contextual inbound');
 report.push({slug:p.slug,canonical,sitemap:true,indexable:true,metadataAndSchema:true,linksAndAnchors:true,responsiveImages:true,worksheet:true,contextualInbound:true});
}
for(const[slug,addition]of Object.entries(day3ExistingAdditions)){
 const html=await fs.readFile(`dist/blogs/${slug}/index.html`,'utf8');assert(html.includes(addition));assert.equal(blogPostMap[slug].modified,'2026-11-06');
}
await fs.writeFile('docs/seo/2026-11-06-day3-release-qa.json',JSON.stringify({newPages:report,existingAdditions:Object.keys(day3ExistingAdditions),passed:true},null,2));
console.log(JSON.stringify({newPages:report.length,existingAdditions:4,passed:true}));
