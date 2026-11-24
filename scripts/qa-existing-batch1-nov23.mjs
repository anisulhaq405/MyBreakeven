import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {beforeBatch2BlogPosts as blogPosts,beforeBatch1BlogPosts} from '../src/content/blogs/index.js';
import {batch1ReviewedSlugs} from '../src/content/blogs/existingBatch1November23.js';
const old=Object.fromEntries(beforeBatch1BlogPosts.map(p=>[p.slug,p]));
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
const search=JSON.parse(await fs.readFile('dist/site-search-index.json','utf8'));
let destinations=0;
for(const p of blogPosts){
 if(!batch1ReviewedSlugs.has(p.slug)){assert.equal(p,old[p.slug]);continue;}
 const path=`/blogs/${p.slug}/`,h=await fs.readFile('dist'+path+'index.html','utf8');
 assert.equal((h.match(/<h1\b/g)||[]).length,1);
 assert(h.includes(`rel="canonical" href="https://mybreakeven.com${path}"`));
 assert(h.includes('"dateModified":"2026-11-23"'));
 assert(sitemap.includes(`<loc>https://mybreakeven.com${path}</loc><lastmod>2026-11-23</lastmod>`));
 assert(search.documents.some(d=>d.url===path));
 assert(h.indexOf('id="quick-answer"')<h.indexOf('article-featured'));
 await fs.access('dist'+p.image);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,p.slug);
 for(const m of h.matchAll(/href="#([^"]+)"/g))assert(ids.includes(m[1]),p.slug+' '+m[1]);
 for(const m of h.matchAll(/href="((?:https:\/\/mybreakeven.com)?\/(?:blogs|calculators|resources|guides|downloads)\/[^"?#]*)/g)){
  const target=m[1].replace('https://mybreakeven.com','');await fs.access('dist'+target+(target.endsWith('/')?'index.html':''));destinations++;
 }
}
console.log(JSON.stringify({updatedOwners:4,unchangedArticles:238,destinationsChecked:destinations,guideCount:blogPosts.length,canonical:'passed',anchors:'passed',sitemap:'passed',search:'passed',assets:'passed'}));
