import React from 'react';
import {describe,it,expect}from'vitest';
import{renderToStaticMarkup}from'react-dom/server';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
import{blogPosts,blogPostMap}from'./content/blogs/index.js';
import{authenticityReviewRecords}from'./content/blogs/authenticityReviewData20261108.js';
import{applyAuthenticityReview,authenticityReviewSlugs}from'./content/blogs/authenticityReview20261108.js';
import LongformArticle from './LongformArticle.jsx';
const baseline=JSON.parse(readFileSync('docs/36-guide-authenticity-review/baseline.json'));
const original=JSON.parse(readFileSync('docs/36-guide-authenticity-review/reviewed-before.json'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('November 8 complete 36-guide authenticity review',()=>{
 it('updates exactly the authorized 36 records while preserving every other guide',()=>{
  expect(blogPosts.length).toBe(baseline.length);expect(original).toHaveLength(36);expect(authenticityReviewSlugs.size).toBe(36);
  for(const b of baseline){const p=blogPostMap[b.slug];if(!authenticityReviewSlugs.has(b.slug)){expect(hash(p),b.slug).toBe(b.sha256);continue;}const old=original.find(x=>x.slug===b.slug);expect(hash(old),b.slug).toBe(b.sha256);expect(p).toEqual(applyAuthenticityReview(old));expect(hash(p)).not.toBe(b.sha256);expect(p.modified).toBe('2026-11-08');for(const k of ['slug','published','image','title','seoTitle','description','metaDescription'])expect(p[k],b.slug+' '+k).toBe(old[k]);expect(applyAuthenticityReview(p)).toBe(p);}
 });
 it('keeps every anchor and internal destination, six visible FAQs and explicit source/example boundaries',()=>{
  for(const old of original){const p=blogPostMap[old.slug],h=renderToStaticMarkup(<LongformArticle article={p}/>);expect((h.match(/<h1\b/g)||[])).toHaveLength(1);expect(p.faq).toHaveLength(6);expect(p.html).toContain('Source review: November 8, 2026');expect(p.html).toContain('fictional');expect(p.html).not.toMatch(/tiny observed pilot|Observed pilot list|SEC-hosted taxonomy reference|An AR ledger cannot equal/);expect(h.indexOf('id="verified-answer"')).toBeLessThan(h.indexOf('class="article-featured"'));const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size,old.slug).toBe(ids.length);for(const[id]of old.sectionLinks)expect(ids).toContain(id);for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();const r=authenticityReviewRecords.find(x=>x.slug===p.slug);expect(r.paragraphs.join(' ').replace(/<[^>]*>/g,' ').split(/\s+/).length).toBeGreaterThan(160);expect(r.paragraphs.join('')).toMatch(/href="https:\/\//);const file=`public/downloads/${p.slug}-worksheet-reviewed-20261108.html`;expect(existsSync(file)).toBe(true);const sheet=readFileSync(file,'utf8');expect(sheet).toContain('contenteditable="true"');expect(sheet).toContain('November 8, 2026');expect(sheet).toContain(r.heading);}
 });
 it('uses exactly the reviewed JSON records in the generated publication manifest',()=>{
  const docs=[1,2,3,4].flatMap(d=>JSON.parse(readFileSync(`docs/36-guide-authenticity-review/day${d}-patches.json`)));expect(authenticityReviewRecords).toEqual(docs);
 });
 it('independently checks new avoidable-cost, attribution, capacity, safety-margin and funding examples',()=>{
  expect(2200-(2000-1200)).toBe(1400);expect(4500/3000).toBe(1.5);expect(10000*.3+20000*.6).toBe(15000);expect(40*2+12*4).toBe(128);expect(30000-24000).toBe(6000);expect(6000/30000).toBe(.2);expect(12000/48).toBe(250);expect((300-250)/300).toBeCloseTo(1/6);const cash=[18000];for(const movement of [-12000,-8000,8000])cash.push(cash.at(-1)+movement);expect(Math.min(...cash)).toBe(-2000);expect(cash.at(-1)).toBe(6000);expect(5000-Math.min(...cash)).toBe(7000);
 });
 it('independently checks inventory returns, TCPI and indivisible capital allocation',()=>{
  expect(1800-180).toBe(1620);expect(2700-1620).toBe(1080);expect(2700-1000).toBe(1700);expect((100000-50000)/(100000-62500)).toBeCloseTo(4/3);expect(50000/(125000-62500)).toBe(.8);expect(50000/(120500-62500)).toBeCloseTo(.862068966);const alternatives=[{cost:20000,pv:26000},{cost:15000,pv:19200},{cost:15000,pv:19200}];const feasible=[];for(let mask=0;mask<8;mask++){let cost=0,npv=0;alternatives.forEach((p,i)=>{if(mask&(1<<i)){cost+=p.cost;npv+=p.pv-p.cost;}});if(cost<=30000)feasible.push({mask,npv});}expect(feasible.reduce((a,b)=>a.npv>b.npv?a:b)).toEqual({mask:6,npv:8400});
 });
 it('keeps campaign expense, classification and recovery boundaries explicit',()=>{
  expect(24000-12000-8500).toBe(3500);expect(3500-1000).toBe(2500);expect(2000+2500+1000).toBe(5500);expect(2100/50*20).toBe(840);expect(blogPostMap['business-growth-strategies'].html).toContain('payment date alone does not establish the expense period');expect(blogPostMap['current-assets'].html).not.toContain('/Archives/edgar/');expect(blogPostMap['current-liabilities'].html).not.toContain('/Archives/edgar/');expect(blogPostMap['allowance-doubtful-accounts'].html).toContain('December 15, 2025');expect(blogPostMap['how-to-start-online-business'].html).toContain('Services are outside this merchandise rule');
 });
});
