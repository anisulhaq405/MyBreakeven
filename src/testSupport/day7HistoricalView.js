import{combinedDay2Posts}from'../content/blogs/combinedDay2.js';
// Historical release contracts predate the explicitly authorized Day 7 publication.
// Strip ONLY its exact reviewed suffixes and nine new owners, leaving every other
// current field intact. The current registry, 212 untouched records, 3 new suffixes,
// and 9 new owners are independently guarded by twelve-day-day7-release.test.jsx.
import{blogPosts as currentPosts}from'../content/blogs/index.js';
import{combinedDay1Posts}from'../content/blogs/combinedDay1.js';
import{twelveDayDay7Posts}from'../content/blogs/twelveDayDay7.js';
import{day7ExistingSections}from'../content/blogs/twelveDayDay7Review.js';
import{readFileSync}from'node:fs';
const before=new Map(JSON.parse(readFileSync('docs/day7-release/baseline.json','utf8')).map(p=>[p.slug,p]));
const added=new Set([...twelveDayDay7Posts,...combinedDay1Posts,...combinedDay2Posts].map(p=>p.slug));
const strip=post=>{const u=day7ExistingSections[post.slug];if(!u)return post;const id='day7-20261117-'+post.slug,block=`<h2 id="${id}">${u.heading}</h2>${u.copy}`;
 if(post.modified!=='2026-11-17'||post.html.split(block).length!==2)throw Error('Cannot reconstruct historical Day 7 boundary: '+post.slug);
 return{...post,html:post.html.replace(block,''),modified:before.get(post.slug).modified,...(post.sectionLinks?{sectionLinks:post.sectionLinks.filter(([x])=>x!==id)}:{})};};
export const blogPosts=currentPosts.filter(p=>!added.has(p.slug)).map(strip);
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export * from '../content/blogs/index.js';
