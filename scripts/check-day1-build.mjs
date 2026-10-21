import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {day1PlanningRelease as release} from '../src/day1PlanningRelease.js';
const root=new URL('../dist/',import.meta.url);
const sitemap=await fs.readFile(new URL('sitemap.xml',root),'utf8');
for(const route of ['resources/budget-vs-actual-template','blogs/rolling-forecast']){
 const html=await fs.readFile(new URL(`${route}/index.html`,root),'utf8');
 const url=`https://mybreakeven.com/${route}/`;
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one H1`);
 assert.ok(html.includes(`<link rel="canonical" href="${url}"`),`${route}: canonical`);
 assert.equal(html.includes('Unpublished draft for review'),!release.published,`${route}: draft banner`);
 for(const bot of ['robots','googlebot']){
  const value=html.match(new RegExp(`<meta name="${bot}" content="([^"]+)"`))?.[1];
  assert.ok(value,`${route}: ${bot} present`);
  assert.equal(value.startsWith('noindex'),!release.published,`${route}: ${bot} release status`);
 }
 assert.equal(sitemap.includes(`<loc>${url}</loc>`),release.published,`${route}: sitemap release status`);
 assert.ok(html.includes(release.date),`${route}: release date`);
}
for(const name of ['budget-vs-actual-template.xlsx','rolling-forecast-template.xlsx']){
 const bytes=await fs.readFile(new URL(`downloads/${name}`,root));
 assert.equal(bytes.subarray(0,2).toString(),'PK',`${name}: real workbook`);
}
console.log(`Day 1 build checks passed (${release.published?'publication':'unpublished draft'}).`);
