import {twelveDayExistingSlugs} from './twelveDayRelease.js';
import {dailyNovember03Review as november03Batch} from './content/blogs/dailyNovember03Review';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {createHash} from 'node:crypto';
import {blogPosts as currentBlogPosts} from './content/blogs';
const blogPosts=currentBlogPosts.filter(p=>Object.hasOwn(baseline,p.slug));
import {dailyNovember02Review as edits,applyDailyNovember02Review} from './content/blogs/dailyNovember02Review';
import baseline from './testFixtures/dailyNovember02Protected.json';
import {articleFaq} from './articleFaq';
import LongformArticle from './LongformArticle';
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const digest=p=>createHash('sha256').update(JSON.stringify(stable(p))).digest('hex');
describe('November 2 existing ten-article improvements',()=>{
 it('preserves all other articles, all images and publication dates',()=>{
  expect(Object.keys(edits)).toHaveLength(10);expect(blogPosts).toHaveLength(Object.keys(baseline).length);
  for(const p of blogPosts){expect(p.image,p.slug).toBe(baseline[p.slug].image);if(!twelveDayExistingSlugs.has(p.slug)&&!edits[p.slug]&&!november03Batch[p.slug])expect(digest(p),p.slug).toBe(baseline[p.slug].hash);else if(edits[p.slug]) {expect(baseline[p.slug].modified<= '2026-10-25',p.slug).toBe(true);expect(p.modified).toBe('2026-11-02');}}
  const protectedPost={slug:Object.keys(edits)[0],modified:'2026-10-26'};expect(applyDailyNovember02Review(protectedPost)).toBe(protectedPost);
 });
 it('renders the decision aids, valid links and extracted FAQs without duplicate IDs',()=>{
  const slugs=new Set(blogPosts.map(p=>p.slug));
  for(const p of blogPosts.filter(p=>edits[p.slug])){
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);
   expect((html.match(/<h1\b/g)||[])).toHaveLength(1);
   const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);expect(ids.length,p.slug).toBe(new Set(ids).size);expect(ids).toContain('practical-pricing-review');
   expect(`${p.seoTitle} | MyBreakeven`.length,p.slug).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeLessThanOrEqual(160);expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);
   expect(edits[p.slug].body).not.toMatch(/\b(?:undefined|NaN|Infinity)\b/);
   for(const [,slug]of edits[p.slug].body.matchAll(/href="\/blogs\/([^/]+)\//g))expect(slugs.has(slug),slug).toBe(true);
   for(const [q,a]of edits[p.slug].faq)expect(articleFaq(p).items,p.slug).toContainEqual({q,a});
  }
 });
 it('independently reconciles the new financial examples and constraints',()=>{
  expect(30-12-30*.13).toBe(14.1);expect(24-12-24*.13).toBeCloseTo(8.88);expect(Math.ceil(141/8.88)).toBe(16);
  expect(20*(110*.97-42)-20*(90*.97-42)).toBeCloseTo(388);expect(Math.ceil(388/45.3)).toBe(9);
  expect(33.3/(1-.03-.4-.2)).toBeCloseTo(90);expect(90-36-3-15-18).toBe(18);
  expect(200*.97-80-(150*.97-70)).toBe(38.5);
  expect((50*.12+4+8+.5*24)/50).toBe(.6);expect((50*.12+4+8+24)/50).toBe(.84);
  expect(1.5+.5+3+1).toBe(6);expect(400.5/6).toBe(66.75);
  expect(13*433-2500-2000).toBe(1129);expect(Math.floor(20/2)).toBe(10);expect(10*433-4500).toBe(-170);
  expect(550-200).toBe(350);expect(866*.97-600).toBeCloseTo(240.02);
 });
});
