import React from 'react';
import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {twelveDayDay6Posts as posts} from './content/blogs/twelveDayDay6.js';
import {articleFaq} from './articleFaq.js';
import BlogArticle from './BlogArticle.jsx';
const before=JSON.parse(readFileSync('docs/day6-release/baseline.json'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('Day 6 nine new topic owners',()=>{
 it('adds exactly N046–N054 while preserving all 206 previous article records',()=>{
  expect(posts.map(p=>p.id)).toEqual(Array.from({length:9},(_,i)=>`N0${46+i}`));
  expect(blogPosts.length).toBe(before.length+9);expect(before).toHaveLength(206);
  for(const b of before)if(!['restaurant-budgeting','fixed-vs-variable-costs'].includes(b.slug))expect(hash(blogPostMap[b.slug]),b.slug).toBe(b.sha256);
  expect(blogPostMap['other-comprehensive-income']).toBeUndefined();
 });
 it('publishes complete distinct metadata, navigable content, synchronized FAQs and real assets',()=>{
  for(const p of posts){
   expect(p.published).toBe('2026-11-11');expect(p.modified).toBe(p.published);
   expect(p.editorialStatus).toBe('published');expect((p.seoTitle+' | MyBreakeven').length,p.slug).toBeLessThanOrEqual(60);
   expect(p.description.length,p.slug).toBeGreaterThanOrEqual(120);expect(p.description.length,p.slug).toBeLessThanOrEqual(160);
   expect(p.scopeBoundary.length).toBeGreaterThan(70);expect(articleFaq(p).items).toHaveLength(6);
   const h=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={p}/>);
   expect((h.match(/<h1\b/g)||[])).toHaveLength(1);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size,p.slug).toBe(ids.length);
   for(const[id]of p.sectionLinks)expect(ids,p.slug).toContain(id);
   for(const[,id]of h.matchAll(/href="#([^"?]+)"/g))expect(ids,p.slug+'#'+id).toContain(id);
   for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();
   expect(p.html).toContain('<caption>');expect(p.html).toContain('scope="col"');expect(p.html).toContain('fictional');
   expect(p.html).toContain('href="https://');expect(p.html).not.toMatch(/TODO|lorem ipsum|rank #1/i);
   for(const size of [1200,800,400])expect(existsSync('public'+p.image.replace('.webp',size===1200?'.webp':`-${size}.webp`))).toBe(true);
   const w=readFileSync(`public/downloads/${p.slug}-worksheet.html`,'utf8');expect(w).toContain('contenteditable="true"');expect(w).toContain('does not automatically calculate');
  }
 });
 it('reconciles product-cost release and inventory independently',()=>{
  const pool=6000+4000+5000,per=pool/500;expect(per).toBe(30);expect(400*per+100*per).toBe(pool);expect(400*60-400*per-3000).toBe(9000);
 });
 it('checks pricing volume thresholds and nearby whole bookings',()=>{
  const c=p=>p*.97-70-.30;expect(c(230)).toBeCloseTo(152.8,8);expect(54*c(230)-6000).toBeCloseTo(2251.2,8);
  const base=60*c(200)-6000;expect(base).toBeCloseTo(1422,8);expect(48*c(230)-6000).toBeLessThan(base);expect(49*c(230)-6000).toBeGreaterThanOrEqual(base);
  expect(60*c(175.57)).toBeGreaterThanOrEqual(6000);expect(60*c(175.56)).toBeLessThan(6000);
 });
 it('distinguishes launch cohort recovery from incremental cannibalization',()=>{
  const launch=30*.97-18-.3,repeat=45*.97-18-.3,gap=1500-100*launch;
  expect(gap).toBeCloseTo(420,8);expect(16*repeat).toBeLessThan(gap);expect(17*repeat).toBeGreaterThanOrEqual(gap);
  const increment=80*launch-20*(repeat-launch)-1500;expect(increment).toBeCloseTo(-927,8);expect(Math.ceil(-increment/repeat)).toBe(37);
 });
 it('verifies fee-aware markup at adjacent cents and fixed cost deducted once',()=>{
  const kept=p=>p*.97-.3-55;expect(kept(74.02)).toBeLessThan(16.5);expect(kept(74.03)).toBeGreaterThanOrEqual(16.5);
  const c=74.03*.97-.3-45;expect(500*c-5000).toBeCloseTo(8254.55,8);expect(188*c).toBeLessThan(5000);expect(189*c).toBeGreaterThanOrEqual(5000);
 });
 it('checks full-horizon NPV and the funding constraint',()=>{
  const npv=(out,cf,r)=>-out+[1,2,3].reduce((s,y)=>s+cf/(1+r)**y,0);
  expect(npv(24000,10000,.08)).toBeCloseTo(1770.97,2);expect(npv(18000,7200,.08)).toBeCloseTo(555.10,2);
  expect(npv(18000,7200,.12)).toBeCloseTo(-706.81,2);expect(npv(24000,8000,.08)).toBeCloseTo(-3383.22,2);expect(24000).toBeGreaterThan(20000);
 });
 it('keeps cumulative payback, interpolation and discounted timing distinct',()=>{
  const flows=[9000,12000,15000,8000];expect(2+(30000-21000)/15000).toBe(2.6);
  const pv=flows.map((cf,i)=>cf/1.1**(i+1));expect(pv.slice(0,3).reduce((a,b)=>a+b,0)).toBeLessThan(30000);expect(pv.reduce((a,b)=>a+b,0)).toBeCloseTo(34833,2);
  expect(30000/(flows.reduce((a,b)=>a+b,0)/4)).not.toBeCloseTo(2.6,1);
 });
 it('reconciles WACC weights, tax sensitivity and equity model inputs',()=>{
  expect(.6*.12+.4*.07*.75).toBeCloseTo(.093,10);expect(.6*.12+.4*.07).toBeCloseTo(.10,10);
  expect(.6*.14+.4*.07*.75).toBeCloseTo(.105,10);expect(.04+1.2*.05).toBeCloseTo(.10,10);
  expect(2*1.03/30+.03).toBeCloseTo(.0986666667,10);
 });
 it('reconciles stock quantity, uniform cost and available-to-promise',()=>{
  expect(120+80-140+5-3).toBe(62);expect(1440+960-1680+60-36).toBe(744);
  expect((62-60)*12).toBe(24);expect(60-15).toBe(45);expect(50*12).toBe(600);
 });
});
