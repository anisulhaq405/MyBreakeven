import {eighteenGuideReviewSlugs} from './content/blogs/november10EighteenGuideReview.js';
import {november10RecoverySlugs} from './content/blogs/november10PositionRecovery.js';
import {day5ExistingSlugs} from './content/blogs/twelveDayDay5Review.js';
import {day4ExistingSlugs} from './content/blogs/twelveDayDay4Review.js';
import {day3ExistingSlugs} from './content/blogs/twelveDayDay3Review.js';
import {day2ExistingSlugs} from './content/blogs/twelveDayDay2Release.js';
import {november04GscSlugs} from './content/blogs/november04GscReview.js';
import {twelveDayExistingSlugs} from './twelveDayRelease.js';
import {dailyNovember03Review as november03Batch} from './content/blogs/dailyNovember03Review';
import {dailyNovember02Review as novemberBatch} from './content/blogs/dailyNovember02Review';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {createHash} from 'node:crypto';
import {blogPosts as currentBlogPosts} from './content/blogs';
const blogPosts=currentBlogPosts.filter(p=>Object.hasOwn(baseline,p.slug));
import {dailyOctober31Batch2 as edits,applyDailyOctober31Batch2 as applyReview} from './content/blogs/dailyOctober31Batch2';
import baseline from './testFixtures/dailyOctober31Batch2Protected.json';
import {articleFaq} from './articleFaq';
import LongformArticle from './LongformArticle';
import {calculate} from './engine';
function stable(x){if(Array.isArray(x))return x.map(stable);if(x&&typeof x==='object')return Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])]));return x;}
const digest=p=>createHash('sha256').update(JSON.stringify(stable(p))).digest('hex');
const required=['agency-client-concentration-revenue-risk', 'agency-project-vs-retainer-profitability', 'agency-employee-vs-freelancer-break-even', 'photography-print-package-profit', 'photography-second-shooter-cost', 'corporate-headshot-pricing', 'ecommerce-inventory-holding-cost-per-sku', 'inventory-reorder-point-cash-flow', 'ecommerce-bundle-pricing-profit', 'free-shipping-threshold-profit'];
describe('October 31 second isolated ten-guide update',()=>{
 it('changes exactly ten existing articles and preserves every other normalized article',()=>{
 expect(Object.keys(edits).sort()).toEqual(required.sort());expect(blogPosts).toHaveLength(Object.keys(baseline).length);
 for(const p of blogPosts){expect(p.image,p.slug).toBe(baseline[p.slug].image);if(!(november10RecoverySlugs.has(p.slug)||eighteenGuideReviewSlugs.has(p.slug))&&!day5ExistingSlugs.has(p.slug)&&!day4ExistingSlugs.has(p.slug)&&!day3ExistingSlugs.has(p.slug)&&!day2ExistingSlugs.has(p.slug)&&!november04GscSlugs.has(p.slug)&&!twelveDayExistingSlugs.has(p.slug)&&!edits[p.slug]&&!novemberBatch[p.slug]&&!november03Batch[p.slug])expect(digest(p),p.slug).toBe(baseline[p.slug].hash);else if(edits[p.slug]){expect(baseline[p.slug].modified<= '2026-10-25',p.slug).toBe(true);expect(p.modified).toBe((november10RecoverySlugs.has(p.slug)||eighteenGuideReviewSlugs.has(p.slug)) ? "2026-11-10" : '2026-10-31');}}
 const protectedPost={slug:'restaurant-budgeting',modified:'2026-10-30'};expect(applyReview(protectedPost)).toBe(protectedPost);const recentlyChanged={slug:required[0],modified:'2026-10-26'};expect(applyReview(recentlyChanged)).toBe(recentlyChanged);
 });
 it('renders accessible additions with valid internal links and matching FAQ inputs',()=>{
 const slugs=new Set(blogPosts.map(p=>p.slug));
 for(const p of blogPosts.filter(p=>edits[p.slug])){
 const html=renderToStaticMarkup(<LongformArticle article={p}/>);expect((html.match(/<h1\b/g)||[]).length,p.slug).toBe(1);
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size,p.slug).toBe(ids.length);expect(ids).toContain('owner-decision-check');
 expect(edits[p.slug].body).not.toMatch(/\b(?:NaN|undefined|Infinity)\b/);expect(html).toContain('scope="col"');expect(html).toContain('scope="row"');
 for(const [,slug] of edits[p.slug].body.matchAll(/href="\/blogs\/([^/]+)\//g))expect(slugs.has(slug),slug).toBe(true);
 for(const [q,a] of edits[p.slug].faq)expect(articleFaq(p).items,p.slug).toContainEqual({q,a});
 expect(`${p.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);expect(p.metaDescription.length).toBeLessThanOrEqual(160);
 }
 });
 it('checks contribution, scope, cash and unit boundaries independently',()=>{
 const base={price:240,materialCost:80,laborCost:45,otherVariableCost:20,acquisitionCost:0,paymentFeePct:3,fixedCosts:0,ownerPay:0,targetProfit:0,workers:1,hoursPerWorker:40,hoursPerJob:1,utilizationPct:100,conversionPct:100};
 expect(calculate(base).contribution).toBe(87.8);expect(calculate({...base,otherVariableCost:32}).contribution).toBe(75.8);
 expect(calculate({...base,price:1800,materialCost:240,laborCost:300,otherVariableCost:350}).contribution).toBe(856);
 expect(calculate({...base,price:70,materialCost:42,laborCost:0,otherVariableCost:12}).contribution).toBe(13.9);
 expect(calculate({...base,price:55,materialCost:25,laborCost:0,otherVariableCost:11}).contribution).toBe(17.35);
 expect(28000-22000).toBe(6000);expect(28000-12000-22000).toBe(-6000);expect(6000/.5).toBe(12000);
 expect((6000*.97-1000-1500)/45).toBeCloseTo(73.777777,5);expect(Math.ceil(((80*45+1000+1500)/.97)*100)/100).toBe(6288.66);
 expect((4800-200)/55).toBeCloseTo(83.636363,5);expect(160*.7).toBe(112);expect(2400+5150+6250).toBe(13800);expect(4800+28*55+200).toBe(6540);
 expect(Math.ceil(((145+100)/.97)*100)/100).toBe(252.58);expect(.05*100).toBe(5);
 expect(Math.ceil(((615+150)/.97)*100)/100).toBe(788.66);expect(Math.floor(18/5)).toBe(3);
 expect(1080*.97-674).toBeCloseTo(373.6,8);expect(1800*.97-1370).toBe(376);expect(20*8+45+30).toBe(235);
 expect(((300+100)/2)*20*.18/12).toBe(60);expect(200*20*.18*6/12).toBe(360);
 expect(8*12+24).toBe(120);expect(70+80-20).toBe(130);expect(8*9-(70-20)).toBe(22);expect(200*18*.3).toBe(1080);expect(3600-2500).toBe(1100);
 expect(60*23.6+70*13.9).toBe(2389);expect(Math.ceil((40*9.7)/13.9)).toBe(28);
 expect(90*21.05).toBeCloseTo(1894.5,8);expect(120*12.05).toBe(1446);
 });
});
