import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {malaysiaRestaurantReviewPosts} from './content/blogs/malaysiaRestaurantReview';
import {calculate} from './engine';
import LongformArticle from './LongformArticle';
import {articleFaq} from './articleFaq';
const [post]=malaysiaRestaurantReviewPosts;
const base={price:30,materialCost:10.5,laborCost:2.5,otherVariableCost:1.4,acquisitionCost:0,paymentFeePct:2,fixedCosts:18000,ownerPay:3000,targetProfit:6000,workers:4,hoursPerWorker:40,hoursPerJob:.25,utilizationPct:75,conversionPct:100};
describe('Malaysia restaurant owner review',()=>{
 it('reproduces published scenarios using the production financial engine',()=>{
 const cases=[['Base',{},15,1800,70],['Food',{materialCost:12.6},12.9,2094,81],['Discount',{price:27},12.06,2239,87],['Delivery',{paymentFeePct:25,otherVariableCost:3.4},6.1,4427,171],['Mix',{paymentFeePct:8.9,otherVariableCost:2},12.33,2190,85]];
 for(const [name,changes,contribution,orders,daily] of cases){const r=calculate({...base,...changes});expect(r.valid,name).toBe(true);expect(r.contribution,name).toBeCloseTo(contribution,8);expect(r.wholeJobs,name).toBe(orders);expect(Math.ceil(r.wholeJobs/26),name).toBe(daily);expect(r.wholeJobs*r.contribution,name).toBeGreaterThanOrEqual(27000);expect((r.wholeJobs-1)*r.contribution,name).toBeLessThan(27000);}
 expect(calculate(base).wholeCapacity).toBe(2080);
 expect(calculate({...base,ownerPay:0,targetProfit:0}).wholeJobs).toBe(1200);
 expect(calculate({...base,targetProfit:0}).wholeJobs).toBe(1400);
 expect(calculate({...base,price:15,paymentFeePct:4}).valid).toBe(false);
 });
 it('keeps navigation, accessible tables, downloads and evidence boundaries intact',()=>{
 const html=renderToStaticMarkup(<LongformArticle article={post}/>);
 expect((html.match(/<h1\b/g)||[]).length).toBe(1);
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
 for(const [,id] of html.matchAll(/href="#([^"]+)"/g))expect(ids).toContain(id);
 for(const [,href] of post.html.matchAll(/href="(\/downloads\/[^"?]+)"/g))expect(existsSync('public'+href)).toBe(true);
 for(const label of ['Hypothetical editorial example','No raw timing logs','not a participant','not proof of an account fix','OWNER REVIEW &amp; CASE STUDY'])expect(html).toContain(label);
 expect(html).not.toMatch(/NaN|undefined|Infinity/);
 expect(articleFaq(post).items).toEqual(post.faq);
 expect(post.image).toContain('restaurant-break-even-malaysia-review.webp');
 expect(html).toContain('width="1536" height="1024"');
 const csv=readFileSync('public/downloads/malaysia-restaurant-review-scenarios.csv','utf8');expect(csv).toContain('MYR');expect(csv.trim().split('\n')).toHaveLength(6);
 });
});
