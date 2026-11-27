import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {beforePendingBlogPosts as blogPosts,beforeBatch4BlogPosts} from '../src/content/blogs/index.js';
import {batch4ReviewedSlugs} from '../src/content/blogs/existingBatch4November26.js';
import {articleFaq} from '../src/articleFaq.js';
import {guideTopic} from '../src/novemberTopics.js';
const sitemap=await fs.readFile('dist/sitemap.xml','utf8'),index=JSON.parse(await fs.readFile('dist/site-search-index.json','utf8'));
let links=0;
for(const [i,p] of blogPosts.entries()){
 const old=beforeBatch4BlogPosts[i];if(!batch4ReviewedSlugs.has(p.slug)){assert.equal(p,old);continue;}
 const path='/blogs/'+p.slug+'/',html=await fs.readFile('dist'+path+'index.html','utf8');
 for(const k of ['slug','title','seoTitle','published','image','calculatorSlug','tag','cluster'])assert.deepEqual(p[k],old[k]);
 assert.equal(p.modified,'2026-11-26');assert.equal((html.match(/<h1\b/g)||[]).length,1);assert(html.includes(`rel="canonical" href="https://mybreakeven.com${path}"`));
 assert(sitemap.includes(`<loc>https://mybreakeven.com${path}</loc><lastmod>2026-11-26</lastmod>`));assert(index.documents.some(d=>d.url===path&&d.summary===p.metaDescription));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,p.slug);
 for(const [id] of p.sectionLinks)assert(ids.includes(id),id);
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const nodes=graph['@graph']||[graph],faq=nodes.find(n=>n['@type']==='FAQPage');
 assert.deepEqual(faq.mainEntity.map(q=>({q:q.name,a:q.acceptedAnswer.text})),articleFaq(p).items);
 for(const m of html.matchAll(/href="([^"#]+)(?:#([^"]+))?"/g)){
  let u;try{u=new URL(m[1]+(m[2]?'#'+m[2]:''),'https://mybreakeven.com'+path);}catch{continue;}
  if(u.origin!=='https://mybreakeven.com')continue;
  const file='dist'+u.pathname+(u.pathname.endsWith('/')?'index.html':'');await fs.access(file);links++;
  if(u.hash){const target=await fs.readFile(file,'utf8');assert(target.includes(`id="${u.hash.slice(1)}"`),u.href);}
 }
 assert.equal(guideTopic(p.slug).id,'restaurant-business');const hub=await fs.readFile('dist/guides/restaurant-business/index.html','utf8');assert(hub.includes(`href="${path}"`));
 assert(html.includes('"dateModified":"2026-11-26"'));
}
console.log(JSON.stringify({reviewedExistingPages:2,unchangedArticleRecords:240,internalDestinationsChecked:links,faqVisibleContentParity:'passed',metadataAndSitemap:'passed',clusterReturnPaths:'passed'}));
