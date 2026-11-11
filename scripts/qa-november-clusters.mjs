import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {blogPosts} from '../src/content/blogs/index.js';
import {businessTopics,guideTopic,novemberGuides,topicConnections} from '../src/novemberTopics.js';
const hub=await fs.readFile('dist/blogs/index.html','utf8');
const incoming=new Map(blogPosts.map(p=>[p.slug,new Set()]));
const outgoing=new Map(),newEdges=[],removedEdges=[];
const previousRoot=process.argv[2];
for(const p of blogPosts){
 const h=await fs.readFile(`dist/blogs/${p.slug}/index.html`,'utf8');
 const links=new Set([...h.matchAll(/href="(?:https:\/\/mybreakeven\.com)?\/blogs\/([^/"?#]+)\//g)].map(m=>m[1]).filter(s=>s!==p.slug));
 outgoing.set(p.slug,links);for(const s of links)incoming.get(s)?.add(p.slug);
 if(previousRoot){const old=await fs.readFile(`${previousRoot}/blogs/${p.slug}/index.html`,'utf8');const oldLinks=new Set([...old.matchAll(/href="(?:https:\/\/mybreakeven\.com)?\/blogs\/([^/"?#]+)\//g)].map(m=>m[1]));for(const s of links)if(!oldLinks.has(s))newEdges.push([p.slug,s]);for(const s of oldLinks)if(s!==p.slug&&!links.has(s))removedEdges.push([p.slug,s]);}
}
for(const t of businessTopics){assert(hub.includes(`id="topic-${t.id}"`));for(const s of t.slugs)assert(hub.includes(`href="/blogs/${s}/"`));}
const rows=[];
for(const preview of novemberGuides){
 const h=await fs.readFile(`dist/blogs/${preview.slug}/index.html`,'utf8'),t=guideTopic(preview.slug),p=blogPosts.find(p=>p.slug===preview.slug),c=topicConnections(p);
 assert(h.includes(`href="${t.href}"`),preview.slug+' hub');
 assert(h.includes('aria-label="Connected topic guides"'),preview.slug+' contextual navigation');
 for(const target of c.posts)assert(h.includes(`href="/blogs/${target.slug}/"`));
 assert(h.includes(`rel="canonical" href="https://mybreakeven.com/blogs/${p.slug}/"`));
 assert.equal((h.match(/<h1\b/g)||[]).length,1);
 if(p.published.startsWith('2026-11-'))assert(incoming.get(p.slug).size>=2,p.slug+' needs at least two incoming article paths');
 rows.push({slug:p.slug,published:p.published,topic:t.title,hub:t.href,articleIncoming:incoming.get(p.slug).size,relatedNavigation:c.posts.length});
 if(t.href.startsWith('/blogs/#'))assert(hub.includes(`id="${t.href.split('#')[1]}"`));else{const sector=await fs.readFile(`dist${t.href}index.html`,'utf8');assert(sector.includes(`href="/blogs/${p.slug}/"`),p.slug+' missing from sector hub');}
}
const report={passed:true,newNovemberGuides:rows.filter(r=>r.published.startsWith('2026-11-')).length,previousNovemberUpdates:rows.filter(r=>!r.published.startsWith('2026-11-')).length,businessTopics:businessTopics.length,industryHubs:8,totalArticleEdges:[...outgoing.values()].reduce((s,x)=>s+x.size,0),additionalUniqueArticleEdges:previousRoot?newEdges.length:null,removedUniqueArticleEdges:previousRoot?removedEdges.length:null,netAdditionalArticleEdges:previousRoot?newEdges.length-removedEdges.length:null,minimumIncomingNewNovember:Math.min(...rows.filter(r=>r.published.startsWith('2026-11-')).map(r=>r.articleIncoming)),rows,newEdges};
await fs.mkdir('qa-artifacts',{recursive:true});await fs.writeFile('qa-artifacts/november-clusters.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,rows:undefined,newEdges:undefined},null,2));
