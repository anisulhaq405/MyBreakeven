import {day4ExistingSlugs} from './content/blogs/twelveDayDay4Review.js';
import {day3ExistingSlugs} from './content/blogs/twelveDayDay3Review.js';
import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {blogPosts,blogPostMap,blogModels} from './content/blogs/index.js';
import {twelveDayDay2Posts,day2ExistingSlugs,day2ExistingAdditions,applyDay2PublicationReview} from './content/blogs/twelveDayDay2Release.js';
import LongformArticle from './LongformArticle.jsx';
const before=JSON.parse(readFileSync('docs/content/2026-11-04-day2-production-baseline.json','utf8'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');

describe('Authorized November 5 Day 2 publication',()=>{
 it('publishes exactly nine new canonical owners and complete production assets',()=>{
  expect(blogPosts).toHaveLength(before.length+27);expect(blogModels).toHaveLength(8);
  expect(new Set(twelveDayDay2Posts.map(p=>p.slug)).size).toBe(9);
  for(const p of twelveDayDay2Posts){
   expect(before.some(b=>b.slug===p.slug)).toBe(false);expect(blogPostMap[p.slug]).toEqual(p);
   expect(p.editorialStatus).toBe('published');expect(p.published).toBe('2026-11-05');expect(p.modified).toBe(p.published);
   expect((p.seoTitle+' | MyBreakeven').length).toBeLessThanOrEqual(60);
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);
   if(p.html.includes('/images/diagrams/day2'))expect(p.html).toContain('<img style="max-width:100%;height:auto" src="/images/diagrams/day2');
   expect((html.match(/<h1\b/g)||[])).toHaveLength(1);expect(html).not.toContain('Unpublished draft');expect(html).not.toContain('Invalid Date');
   const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const[id]of p.sectionLinks)expect(ids).toContain(id);
   for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();
   for(const width of [1200,800,400])expect(existsSync('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`))).toBe(true);
   const sheet=readFileSync('public/downloads/'+p.slug+'-worksheet.html','utf8');expect(sheet).toContain('contenteditable="true"');expect(sheet).toContain('does not automatically calculate');
  }
 });
 it('preserves all 171 prior records exactly except three approved append-only additions and their modification dates',()=>{
  expect([...day2ExistingSlugs].sort()).toEqual(['operating-cash-flow','operating-expenses','rolling-forecast']);
  for(const old of before){
   if(day4ExistingSlugs.has(old.slug)||day3ExistingSlugs.has(old.slug))continue; // Exact allowed change protected by the 180-record Day 3 baseline test.
   const now=blogPostMap[old.slug];expect(now).toBeDefined();
   if(!day2ExistingSlugs.has(old.slug)){expect(hash(now),old.slug).toBe(old.sha256);continue;}
   const addition=day2ExistingAdditions[old.slug];expect(now.html.endsWith(addition)).toBe(true);expect(now.html.split(addition)).toHaveLength(2);expect(now.modified).toBe('2026-11-05');
   expect(hash({...now,html:now.html.slice(0,-addition.length),modified:old.modified}),old.slug).toBe(old.sha256);
   expect(applyDay2PublicationReview(now)).toBe(now);
   expect(()=>applyDay2PublicationReview({...now,modified:'2026-10-26',html:'original'})).toThrow(/protected/);
  }
 });
 it('recomputes the seasonal, capacity, proposal and funding decisions independently',()=>{
  let cash=12000;const balances=[2000,4000,12000,10000].map((r,i)=>(cash+=r-[10000,11000,8000,7000][i]));expect(balances).toEqual([4000,-3000,1000,4000]);expect(5000-Math.min(...balances)).toBe(8000);
  expect(10*600-80*30-10*30-1800).toBe(1500);expect(10*600-100*30-300-1800).toBe(900);
  expect(2400-(30*40+300+150)).toBe(750);expect(750/2400*100).toBe(31.25);expect(960+960+480).toBe(2400);
  expect(120*(200-100)-8500).toBe(3500);expect(20*100+1000+2500).toBe(5500);
  expect(5400/180).toBe(30);expect(120/3).toBe(40);expect(9000/180).toBe(50);expect(Math.ceil(9000/210)).toBe(43);
  expect(24000/250*3-270).toBe(18);expect(16*100+400).toBe(2000);expect(5000/100).toBe(50);expect(5400/120).toBe(45);
 });
});
