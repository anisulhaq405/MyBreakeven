import {november11Day6Slugs} from './content/blogs/november11Day6Existing.js';
import {eighteenGuideReviewSlugs} from './content/blogs/november10EighteenGuideReview.js';
import {november10RecoverySlugs} from './content/blogs/november10PositionRecovery.js';
import {day5ExistingSlugs} from './content/blogs/twelveDayDay5Review.js';
import {day4ExistingSlugs} from './content/blogs/twelveDayDay4Review.js';
import {day3ExistingSlugs} from './content/blogs/twelveDayDay3Review.js';
import {day2ExistingSlugs} from './content/blogs/twelveDayDay2Release.js';
import {november04GscSlugs} from './content/blogs/november04GscReview.js';
import {describe,it,expect} from 'vitest';
import '../scripts/build-12day-day1-images.mjs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {twelveDayDay1Posts as drafts} from './content/blogs/twelveDayDay1.js';
import {blogPosts} from './content/blogs/index.js';
import LongformArticle from './LongformArticle.jsx';

describe('Day 1 editorial delivery',()=>{
 it('keeps the nine researched drafts separate and delivers usable local assets',()=>{
  expect(new Set(drafts.map(p=>p.slug)).size).toBe(9);
  for(const p of drafts){
   expect(p.editorialStatus).toBe('published');
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);
   expect((html.match(/<h1\b/g)||[]).length).toBe(1);
   expect(html).not.toContain('Unpublished draft for review');
   for(const [id]of p.sectionLinks)expect(html).toContain('id="'+id+'"');
   for(const width of [1200,800,400])expect(existsSync('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`))).toBe(true);
   const sheet=readFileSync('public/downloads/'+p.slug+'-worksheet.html','utf8');
   expect(sheet).toContain('contenteditable="true"');expect(sheet).toContain('does not calculate automatically');
  }
 });
 it('reconciles the original business examples independently',()=>{
  const accountProfit=12000-5600-60*40-1800;expect(accountProfit).toBe(2200);
  const spend=3000+5400+1800+1200;expect(12000-spend).toBe(600);expect((12000-spend)/spend*100).toBeCloseTo(5.2631579,6);
  expect(40*180+12*300).toBe(10800);expect(40*2+12*4).toBe(160*.8);
  expect(Math.ceil((9600+5000)/(120-72))).toBe(305);expect(305*48-9600).toBe(5040);expect((12000+4800)/48).toBe(350);
  expect((1200+1800+30*40+20*60)/2).toBe(2700);expect(48000+4800+3600+1200+1000+2700).toBe(61300);
  expect(18000+2000-22500+2000+1500+4000).toBe(5000);
  expect(3000-300-1000).toBe(1700);
  expect((30000+20000)/(25000+37500)).toBe(.8);expect(100000/.8).toBe(125000);
  const pv=[1,2,3].reduce((n,t)=>n+9000/1.1**t,0);expect(pv).toBeCloseTo(22381.667918858,8);expect(pv/20000).toBeCloseTo(1.119083395943,10);
 });
 it('preserves all other existing articles and appends only the approved cash-flow supplement',()=>{
  const baseline=JSON.parse(readFileSync('docs/content/2026-11-03-baseline-blog-hashes.json','utf8'));
  const current=new Map(blogPosts.map(p=>[p.slug,p]));
  for(const before of baseline){if(before.slug==='restaurant-budgeting')continue; // Covered by the November 13 full-registry guard.
if(november11Day6Slugs.has(before.slug))continue; // Covered by the strict November 11 full-registry preservation test.

   if((november10RecoverySlugs.has(before.slug)||eighteenGuideReviewSlugs.has(before.slug))||day5ExistingSlugs.has(before.slug)||day4ExistingSlugs.has(before.slug)||day3ExistingSlugs.has(before.slug)||day2ExistingSlugs.has(before.slug)||november04GscSlugs.has(before.slug))continue; // Independently protected by the November 4 two-page review test.
   if(before.slug==='cash-flow-statement'){const old=JSON.parse(readFileSync('docs/content/2026-11-04-cash-flow-before-release.json','utf8'));const now=current.get(before.slug);expect(now.html.startsWith(old.html)).toBe(true);expect(now.html).toContain('cash-close-cutoff-control');expect(now.modified).toBe((november10RecoverySlugs.has(now.slug)||eighteenGuideReviewSlugs.has(now.slug)) ? "2026-11-10" : '2026-11-04');expect({...now,html:old.html,modified:old.modified}).toEqual(old);}else expect(createHash('sha256').update(JSON.stringify(current.get(before.slug))).digest('hex')).toBe(before.sha256);
  }
 });
});
