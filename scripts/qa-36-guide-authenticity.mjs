import fs from 'node:fs/promises';import assert from 'node:assert/strict';import path from 'node:path';
import{blogPostMap}from'../src/content/blogs/index.js';import{authenticityReviewSlugs}from'../src/content/blogs/authenticityReview20261108.js';
const before=JSON.parse(await fs.readFile('docs/36-guide-authenticity-review/reviewed-before.json','utf8'));
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');const report=[];
for(const old of before){
 const p=blogPostMap[old.slug],file=`dist/blogs/${p.slug}/index.html`,h=await fs.readFile(file,'utf8');
 assert(authenticityReviewSlugs.has(p.slug));assert.equal(p.published,old.published);assert.equal(p.image,old.image);
 const canonical=`https://mybreakeven.com/blogs/${p.slug}/`;assert(h.includes(`rel="canonical" href="${canonical}"`));assert(sitemap.includes(canonical));assert(h.includes('name="robots" content="index,follow'));
 assert.equal((h.match(/<h1\b/g)||[]).length,1);assert(h.indexOf('id="verified-answer"')<h.indexOf('class="article-featured"'));assert(h.includes('id="evidence-and-application"'));assert(h.includes('Source review: November 8, 2026'));
 const nodes=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j];});const article=nodes.find(n=>n['@type']==='BlogPosting'),faq=nodes.find(n=>n['@type']==='FAQPage');assert.equal(article.dateModified,'2026-11-08');assert.equal(article.datePublished,old.published);assert.equal(faq.mainEntity.length,6);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);for(const[id]of old.sectionLinks)assert(ids.includes(id));
 for(const[,href]of (p.answerHtml+p.html).matchAll(/href="(\/[^"#?]+)"/g)){const target=href.endsWith('.html')?path.join('dist',href):path.join('dist',href,'index.html');assert((await fs.stat(target)).isFile(),target);}
 const sheet=await fs.readFile(`dist/downloads/${p.slug}-worksheet-reviewed-20261108.html`,'utf8');assert(sheet.includes('November 8, 2026'));assert(sheet.includes('contenteditable="true"'));assert(!sheet.includes('Observed pilot list'));assert(!h.includes('SEC-hosted taxonomy reference'));
 report.push({slug:p.slug,originalPublished:p.published,modified:p.modified,canonical,indexable:true,sourceReviewVisible:true,faqCount:6,allPreviousAnchors:true,reviewedWorksheet:true});
}
assert.equal(report.length,36);await fs.mkdir('qa-artifacts',{recursive:true});await fs.writeFile('qa-artifacts/36-guide-authenticity-build.json',JSON.stringify({passed:true,guides:report},null,2));console.log(JSON.stringify({passed:true,guides:report.length,reviewedWorksheets:36,visibleFaqs:216}));
