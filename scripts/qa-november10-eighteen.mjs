import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {blogPostMap} from '../src/content/blogs/index.js';
import {eighteenGuideReview,eighteenGuideReviewSlugs} from '../src/content/blogs/november10EighteenGuideReview.js';
const rows=[];
for(const slug of eighteenGuideReviewSlugs){
 const p=blogPostMap[slug],html=readFileSync(`dist/blogs/${slug}/index.html`,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,slug);
 assert(html.includes(`id="review-20261110-${slug}"`),slug+' review section');
 assert(html.includes(`https://mybreakeven.com/blogs/${slug}/`),slug+' canonical');
 const data=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const graph=data.flatMap(x=>x['@graph']||[x]);const article=graph.find(x=>['Article','BlogPosting'].includes(x['@type']));
 assert(article,slug+' article schema');assert.equal(article.datePublished.slice(0,10),p.published);assert.equal(article.dateModified.slice(0,10),'2026-11-10');
 const faq=graph.find(x=>x['@type']==='FAQPage');assert(faq,slug+' FAQ schema');assert(faq.mainEntity.some(x=>x.name===eighteenGuideReview[slug].q),slug+' new FAQ schema');
 assert(html.includes(eighteenGuideReview[slug].q),slug+' visible FAQ');
 rows.push({slug,published:p.published,modified:p.modified,newWords:eighteenGuideReview[slug].copy.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length,newInternalLinks:[...eighteenGuideReview[slug].copy.matchAll(/href="\/blogs\//g)].length});
}
console.log(JSON.stringify({passed:true,pages:rows.length,addedWords:rows.reduce((s,x)=>s+x.newWords,0),contextualInternalLinks:rows.reduce((s,x)=>s+x.newInternalLinks,0),rows},null,2));
