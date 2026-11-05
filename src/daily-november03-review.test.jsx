import {day3ExistingSlugs} from './content/blogs/twelveDayDay3Review.js';
import {day2ExistingSlugs} from './content/blogs/twelveDayDay2Release.js';
import {november04GscSlugs} from './content/blogs/november04GscReview.js';
import {twelveDayExistingSlugs} from './twelveDayRelease.js';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {createHash} from 'node:crypto';
import {blogPosts as currentBlogPosts} from './content/blogs';
const blogPosts=currentBlogPosts.filter(p=>Object.hasOwn(baseline,p.slug));
import {dailyNovember03Review as edits,applyDailyNovember03Review} from './content/blogs/dailyNovember03Review';
import baseline from './testFixtures/dailyNovember03Protected.json';
import {articleFaq} from './articleFaq';
import LongformArticle from './LongformArticle';
const stable=x=>Array.isArray(x)?x.map(stable):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])])):x;
const digest=p=>createHash('sha256').update(JSON.stringify(stable(p))).digest('hex');
const required=['cleaning-contract-payroll-cash-gap','cleaning-estimate-vs-actual-job-cost','cleaning-client-acquisition-payback','cleaning-business-client-churn-cost','commercial-cleaning-contract-price-increase','landscaping-subcontractor-cost','mulch-installation-job-cost','landscaping-crew-utilization','photography-mini-session-profit','mobile-detailing-travel-fee'];
describe('November 3 isolated ten-article update',()=>{
 it('updates only the ten eligible articles and preserves all publication dates and images',()=>{
  expect(Object.keys(edits).sort()).toEqual(required.sort());expect(blogPosts).toHaveLength(Object.keys(baseline).length);
  for(const p of blogPosts){expect(p.image,p.slug).toBe(baseline[p.slug].image);expect(p.published,p.slug).toBe(baseline[p.slug].published);if(!day3ExistingSlugs.has(p.slug)&&!day2ExistingSlugs.has(p.slug)&&!november04GscSlugs.has(p.slug)&&!twelveDayExistingSlugs.has(p.slug)&&!edits[p.slug])expect(digest(p),p.slug).toBe(baseline[p.slug].hash);else if(edits[p.slug]){expect(baseline[p.slug].modified<='2026-10-25').toBe(true);expect(p.modified).toBe('2026-11-03');expect(digest(p)).not.toBe(baseline[p.slug].hash);}}
  const recent={slug:required[0],modified:'2026-10-26'};expect(applyDailyNovember03Review(recent)).toBe(recent);
 });
 it('renders distinct accessible worksheets, valid links and matching FAQ extraction',()=>{
  const slugs=new Set(blogPosts.map(p=>p.slug));
  for(const p of blogPosts.filter(p=>edits[p.slug])){
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);expect((html.match(/<h1\b/g)||[])).toHaveLength(1);
   const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);expect(ids.length,p.slug).toBe(new Set(ids).size);expect(ids).toContain('operating-decision-check');
   expect(`${p.seoTitle} | MyBreakeven`.length,p.slug).toBeLessThanOrEqual(60);expect(p.metaDescription.length,p.slug).toBeLessThanOrEqual(160);expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);
   expect(edits[p.slug].body).not.toMatch(/\b(?:NaN|Infinity)\b|>undefined</);
   for(const [,slug]of edits[p.slug].body.matchAll(/href="\/blogs\/([^/]+)\//g))expect(slugs.has(slug),slug).toBe(true);
   for(const [q,a]of edits[p.slug].faq)expect(articleFaq(p).items,p.slug).toContainEqual({q,a});
  }
 });
 it('independently reconciles cash, contribution, probabilities and constrained hours',()=>{
  let cash=3000-800-1000;const balances=[cash];cash+=4800*.98;for(let i=0;i<3;i++){cash-=1000;balances.push(cash);}expect(Math.min(...balances)).toBe(1200);expect(4800*.02).toBe(96);
  expect(2*22+6+4).toBe(54);expect(127-54).toBe(73);expect(127/6).toBeCloseTo(21.1667,3);expect(73/8).toBe(9.125);
  expect(8*50.8-600).toBeCloseTo(-193.6);expect(15*50.8-600).toBe(162);
  expect(413.6*3*.2-120).toBeCloseTo(128.16);expect(120/(413.6*3)*100).toBeCloseTo(9.67,2);
  expect(1800*.97-1460).toBe(286);expect(8*(1924*.97-1460)-10*286).toBeCloseTo(390.24);expect(7*(1924*.97-1460)-2860).toBeCloseTo(-16.04);
  expect(750-700-240-700).toBe(-890);expect(890+750*.03).toBe(912.5);expect(2500*.97-1640).toBe(785);
  const yards=900*3/324*1.1;expect(Math.ceil(yards*27/2)).toBe(124);expect(124*3.2+60).toBeCloseTo(456.8);expect((474-456.8)-1.5*28).toBeCloseTo(-24.8);
  expect(6*6+3*8+12).toBe(72);expect((78-10)/120*100).toBeCloseTo(56.6667,3);
  expect(Math.floor(4/.75)).toBe(5);expect(5*177.5-630).toBe(257.5);expect(8*.75-4).toBe(2);
  const baseHourly=(220*.97-130)/4;const remotePrice=Math.ceil(((152+baseHourly*4.5)/.97)*100)/100;expect(remotePrice).toBe(253.43);expect((remotePrice*.97-152)/4.5).toBeGreaterThanOrEqual(baseHourly);expect(Math.ceil(22/.97*100)/100).toBe(22.69);
 });
});
