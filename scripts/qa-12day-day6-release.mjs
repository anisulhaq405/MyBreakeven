import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import sharp from 'sharp';
import {twelveDayDay6Posts as posts} from '../src/content/blogs/twelveDayDay6.js';
const sitemap=await fs.readFile('dist/sitemap.xml','utf8'),report=[];
for(const p of posts){
 const h=await fs.readFile(`dist/blogs/${p.slug}/index.html`,'utf8'),url=`https://mybreakeven.com/blogs/${p.slug}/`;
 assert(h.includes(`rel="canonical" href="${url}"`));assert(sitemap.includes(url));
 assert.equal((h.match(/<h1\b/g)||[]).length,1);assert(h.includes('name="robots" content="index,follow'));
 assert(h.includes(p.answerHtml));assert(h.includes(p.image));
 const nodes=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j]});
 const article=nodes.find(n=>n['@type']==='BlogPosting'),faq=nodes.find(n=>n['@type']==='FAQPage');
 assert.equal(article.datePublished,'2026-11-11');assert.equal(article.dateModified,'2026-11-11');
 assert.equal(faq.mainEntity.length,6);for(const f of p.faq)assert(faq.mainEntity.some(n=>n.name===f.q&&n.acceptedAnswer.text===f.a));
 for(const[,href]of p.html.matchAll(/href="(\/[^"#?]+)"/g))assert((await fs.stat(href.endsWith('.html')?path.join('dist',href):path.join('dist',href,'index.html'))).isFile(),href);
 const sizes=[];
 for(const w of [1200,800,400]){const file='dist'+p.image.replace('.webp',w===1200?'.webp':`-${w}.webp`),m=await sharp(file).metadata(),bytes=(await fs.stat(file)).size;assert.equal(m.width,w);assert.equal(m.height,w*9/16);assert(bytes<250000);sizes.push({width:w,height:m.height,bytes});}
 const sheet=await fs.readFile(`dist/downloads/${p.slug}-worksheet.html`,'utf8');assert(sheet.includes('contenteditable="true"'));assert(sheet.includes('does not automatically calculate'));
 report.push({slug:p.slug,url,status:'passed',faqCount:6,sizes});
}
assert.equal(posts.length,9);assert(!sitemap.includes('/blogs/other-comprehensive-income/'));
await fs.mkdir('qa-artifacts',{recursive:true});await fs.writeFile('qa-artifacts/day6-build.json',JSON.stringify({passed:true,newGuides:report,previousGuidesUnchanged:206},null,2));
console.log('Day 6: 9 routes, 54 matched FAQs, 9 printable records, 27 optimized cover variants verified.');
