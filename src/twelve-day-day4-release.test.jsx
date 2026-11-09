import {day5ExistingSlugs} from './content/blogs/twelveDayDay5Review.js';
import {applyAuthenticityReview,authenticityReviewSlugs} from './content/blogs/authenticityReview20261108.js';
import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {twelveDayDay4Posts as posts} from './content/blogs/twelveDayDay4.js';
import {day4ExistingAdditions,day4ExistingSlugs,applyDay4Review} from './content/blogs/twelveDayDay4Review.js';
import LongformArticle from './LongformArticle.jsx';
const before=JSON.parse(readFileSync('docs/day4-release/baseline.json','utf8'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('November 7 Day 4 publication',()=>{
 it('publishes nine distinct original tasks with complete article assets and real internal links',()=>{
  expect(blogPosts).toHaveLength(before.length+17);
  for(const p of posts){
   expect(before.some(b=>b.slug===p.slug)).toBe(false);
   expect(blogPostMap[p.slug]).toEqual(applyAuthenticityReview(p));expect(p.editorialStatus).toBe('published');
   expect(p.published).toBe('2026-11-07');expect(p.modified).toBe(p.published);
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);
   expect((html.match(/<h1\b/g)||[])).toHaveLength(1);expect(html).not.toContain('Unpublished draft');expect(html).not.toContain('Invalid Date');
   const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const[id]of p.sectionLinks)expect(ids).toContain(id);
   for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();
   expect(blogPosts.some(other=>other.slug!==p.slug&&other.html?.includes('/blogs/'+p.slug+'/')),p.slug+' contextual inbound').toBe(true);
   for(const width of [1200,800,400])expect(existsSync('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`))).toBe(true);
   const sheet=readFileSync('public/downloads/'+p.slug+'-worksheet.html','utf8');expect(sheet).toContain('contenteditable="true"');expect(sheet).toContain('does not automatically calculate');
  }
 });
 it('preserves all 189 prior records except the exact four authorized suffixes and dates',()=>{
  expect(day4ExistingSlugs.size).toBe(4);
  for(const old of before){
   const now=blogPostMap[old.slug];expect(now).toBeDefined();
   if(day5ExistingSlugs.has(old.slug)||authenticityReviewSlugs.has(old.slug))continue; // Fully reviewed under the November 8 198-record baseline test.
   if(!day4ExistingSlugs.has(old.slug)){expect(hash(now),old.slug).toBe(old.sha256);continue;}
   const addition=day4ExistingAdditions[old.slug];expect(now.html.endsWith(addition)).toBe(true);expect(now.html.split(addition)).toHaveLength(2);expect(now.modified).toBe('2026-11-07');
   expect(hash({...now,html:now.html.slice(0,-addition.length),modified:old.modified}),old.slug).toBe(old.sha256);
   expect(applyDay4Review(now)).toBe(now);expect(()=>applyDay4Review({...now,modified:'2026-10-26',html:'original'})).toThrow(/protected/);
  }
 });
 it('reconciles original accrual, ledger, depreciation and credit-loss cases independently',()=>{
 expect(5000-1800-100).toBe(3100);expect(3100-5000-1100+1800+2400).toBe(1200);expect(11200+5000+1100).toBe(4200+13100);
 expect(8000+6200-4450-50).toBe(9850+250-400);expect(3000+6000-5200-3600).toBe(200);
 expect(13100+1500+600).toBe(2400+10000+4400-1600);
 expect(5000-1800+1600-250).toBe(4550);expect(4550+600+1800+250).toBe(7200);
 const cost=14000,residual=2000;let carrying=cost;const ddb=[];for(let i=0;i<5;i++){const charge=Math.min(carrying*.4,carrying-residual);ddb.push(charge);carrying-=charge;}expect(ddb).toEqual([5600,3360,2016,1024,0]);expect(carrying).toBe(residual);
 const months=[9,12,12,12,12,3];expect(months.reduce((a,b)=>a+b)).toBe(60);let accum=0;expect(months.map(m=>{accum+=m*(cost-residual)/60;return cost-accum;})).toEqual([12200,9800,7400,5000,2600,2000]);
 expect(50000+10000-12000-(18000+6000-8400)).toBe(32400);expect(4000-(12000-8400)).toBe(400);
 const target=50000*.01+20000*.04+10000*.15;expect(target).toBe(2800);expect(target-(1200-700+200)).toBe(2100);expect(target-(-300)).toBe(3100);
 expect(60000+40000-19300-700+200-200).toBe(80000);expect(58800+40000-19500-2100).toBe(77200);
 let gross=25000,allow=1500;allow+=900;const provided=gross-allow;gross-=1200;allow-=1200;expect(gross-allow).toBe(provided);gross+=300;allow+=300;expect(gross-allow).toBe(provided);gross-=300;expect([gross,allow,gross-allow]).toEqual([23800,1500,22300]);
 });
});
