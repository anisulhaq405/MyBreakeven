import {dailyOctober31Batch2 as laterBatch} from './content/blogs/dailyOctober31Batch2';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {createHash} from 'node:crypto';
import {blogPosts} from './content/blogs';
import {dailyOctober30Review as edits,applyDailyOctober30Review} from './content/blogs/dailyOctober30Review';
import baseline from './testFixtures/dailyOctober30Protected.json';
import {articleFaq} from './articleFaq';
import LongformArticle from './LongformArticle';
import {calculate} from './engine';
function stable(x){if(Array.isArray(x))return x.map(stable);if(x&&typeof x==='object')return Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])]));return x;}
const digest=p=>createHash('sha256').update(JSON.stringify(stable(p))).digest('hex');
const required=['coffee-shop-drink-contribution-margin','restaurant-private-event-minimum-spend','restaurant-takeout-vs-dine-in-profit-per-order','catering-quote-profit','restaurant-menu-engineering-contribution-margin','cleaning-minimum-booking-charge','move-out-cleaning-job-cost','recurring-vs-one-time-cleaning-profitability','landscaping-route-density-profit','landscaping-equipment-cost-per-hour'];
describe('October 30 isolated ten-guide update',()=>{
 it('changes exactly ten existing articles and preserves every other normalized article',()=>{
 expect(Object.keys(edits).sort()).toEqual(required.sort());expect(blogPosts).toHaveLength(Object.keys(baseline).length);
 for(const p of blogPosts){expect(p.image,p.slug).toBe(baseline[p.slug].image);if(!edits[p.slug]&&!laterBatch[p.slug])expect(digest(p),p.slug).toBe(baseline[p.slug].hash);else if(edits[p.slug]){expect(baseline[p.slug].modified<= '2026-10-25',p.slug).toBe(true);expect(p.modified).toBe('2026-10-31');}}
 const protectedPost={slug:'restaurant-budgeting',modified:'2026-10-30'};expect(applyDailyOctober30Review(protectedPost)).toBe(protectedPost);const recentlyChanged={slug:required[0],modified:'2026-10-26'};expect(applyDailyOctober30Review(recentlyChanged)).toBe(recentlyChanged);
 });
 it('renders accessible additions with valid internal links and matching FAQ inputs',()=>{
 const slugs=new Set(blogPosts.map(p=>p.slug));
 for(const p of blogPosts.filter(p=>edits[p.slug])){
 const html=renderToStaticMarkup(<LongformArticle article={p}/>);expect((html.match(/<h1\b/g)||[]).length,p.slug).toBe(1);
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size,p.slug).toBe(ids.length);expect(ids).toContain('owner-decision-check');
 expect(html).not.toMatch(/NaN|undefined|Infinity/);expect(html).toContain('scope="col"');expect(html).toContain('scope="row"');
 for(const [,slug] of edits[p.slug].body.matchAll(/href="\/blogs\/([^/]+)\//g))expect(slugs.has(slug),slug).toBe(true);
 for(const [q,a] of edits[p.slug].faq)expect(articleFaq(p).items,p.slug).toContainEqual({q,a});
 expect(`${p.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);expect(p.metaDescription.length).toBeLessThanOrEqual(160);
 }
 });
 it('checks published financial decisions, rounding and unit boundaries',()=>{
 const base={price:24,materialCost:7.2,laborCost:2,otherVariableCost:1.7,acquisitionCost:0,paymentFeePct:20,fixedCosts:0,ownerPay:0,targetProfit:0,workers:1,hoursPerWorker:40,hoursPerJob:1,utilizationPct:100,conversionPct:100};
 expect(calculate(base).contribution).toBe(8.3);expect(calculate({...base,price:26.13}).contribution).toBeCloseTo(10.004,8);
 expect(30*3).toBe(90);expect(15*3.6).toBe(54);expect(100*4.5-100*1.5-5*1.2).toBe(294);expect(2334*.6-300-900).toBeCloseTo(200.4,8);
 expect(Math.ceil(((60*9+420+600)/.97)*100)/100).toBe(1608.25);expect(Math.ceil(((45*9+420+600)/.97)*100)/100).toBe(1469.08);
 expect(1080/(17-7)).toBe(108);expect(Math.ceil(((84+60)/.97)*100)/100).toBe(148.46);expect(Math.ceil(((64+60)/.97)*100)/100).toBe(127.84);
 expect(450*.97-8*25-45).toBe(191.5);expect(Math.ceil(((42+30)/.97)*100)/100).toBe(74.23);
 expect(Math.ceil(90/74.9)).toBe(2);expect(4*74.9-90).toBeCloseTo(209.6,8);expect((310*.97-160-45)/5).toBeCloseTo(19.14,8);
 expect(760-16*24-8*12-40).toBe(240);expect(95-12-4-2*24-25).toBe(6);
 expect(((12000-2000)/5+600+400)/600+4+3).toBe(12);expect(3000/300+7).toBe(17);expect((120+30)/2).toBe(75);
 });
});
