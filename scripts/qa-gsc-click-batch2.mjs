import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {clickAnswerVersions} from '../src/clickAnswerPresentation.js';
const baseline=JSON.parse(await fs.readFile('docs/gsc-batch2-20261127/experiment.json','utf8'));
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const p of baseline.pages){
 const h=await fs.readFile(`dist/blogs/${p.slug}/index.html`,'utf8');
 assert(h.includes(`<title>${escape(p.seoTitle)} | MyBreakeven</title>`),p.slug+' title');
 assert(h.includes(`name="description" content="${escape(p.metaDescription)}"`),p.slug+' description');
 assert(h.includes(`rel="canonical" href="${p.url}"`),p.slug+' canonical');assert(sitemap.includes(p.url));
 assert(!/name="(?:robots|googlebot)" content="[^"]*noindex/.test(h));
 assert.equal((h.match(/<h1\b/g)||[]).length,1,p.slug);
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,p.slug);
 if(clickAnswerVersions[p.slug]){assert(h.includes(clickAnswerVersions[p.slug]),p.slug+' worked answer');assert(h.indexOf(clickAnswerVersions[p.slug])<h.indexOf('article-featured'));}
 assert(h.includes(p.published),p.slug+' original publication');
}
console.log('Batch2: four existing answer presentations, two unchanged controls, six preserved metadata/canonical owners. No CTR outcome claimed.');
