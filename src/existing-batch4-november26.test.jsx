import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {beforePendingBlogPosts as blogPosts,beforeBatch4BlogPosts,beforePendingBlogPostMap as blogPostMap} from './content/blogs/index.js';
import {batch4ReviewedSlugs} from './content/blogs/existingBatch4November26.js';
import {calculateRecipe,calculateFoodPeriod,calculateMenuPrice} from './foodCostEngine.js';
import {recipeExample,foodPeriodExample} from './foodCalculatorDefaults.js';
import {calculateDetailedFoodPeriod,foodPeriodDefaults} from './foodPeriodDetailedEngine.js';
import {articleFaq} from './articleFaq.js';
import {guideTopic} from './novemberTopics.js';
import {restaurantClusters} from './restaurantCluster.js';
import LongformArticle from './LongformArticle.jsx';
describe('restaurant relevance and technical verification batch 4',()=>{
 it('changes only two existing owners and keeps their identity, examples and cluster paths',()=>{
  for(const [i,p] of blogPosts.entries()){
   const old=beforeBatch4BlogPosts[i];if(!batch4ReviewedSlugs.has(p.slug)){expect(p).toBe(old);continue;}
   for(const k of ['slug','title','seoTitle','published','image','alt','tag','cluster','calculatorSlug'])expect(p[k]).toEqual(old[k]);
   expect(p.modified).toBe('2026-11-26');expect(p.metaDescription.length).toBeLessThanOrEqual(160);expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);
   expect(guideTopic(p.slug).id).toBe('restaurant-business');expect(restaurantClusters.flatMap(g=>g.slugs)).toContain(p.slug);
   const h=renderToStaticMarkup(<LongformArticle article={p}/>),ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
   expect((h.match(/<h1\b/g)||[]).length).toBe(1);expect(new Set(ids).size).toBe(ids.length);
   for(const [id] of p.sectionLinks)expect(ids).toContain(id);
   for(const [,id] of old.html.matchAll(/\bid="([^"]+)"/g))expect(ids).toContain(id);
   for(const f of articleFaq(p).items){expect(h).toContain(f.q);expect(h).toContain(f.a.replaceAll('&','&amp;'));}
  }
 });
 it('reproduces the complete adjusted inventory example using the actual calculator',()=>{
  const input={...foodPeriodDefaults,credits:500,transferIn:300,transferOut:200,staff:400,comps:200};const r=calculateDetailedFoodPeriod(input);
  expect(r.valid).toBe(true);expect(r.used).toBe(19600);expect(r.adjusted).toBe(19000);expect(r.foodPct).toBeCloseTo(31.6666666667);expect(r.variance).toBe(800);expect(r.remainingGap).toBe(200);
  expect(calculateDetailedFoodPeriod({...input,waste:0}).adjusted).toBe(r.adjusted);
 });
 it('reconciles paid worker-hours and the incremental dinner shift decision',()=>{
  expect(3*4*22).toBe(264);expect(4*4*22).toBe(352);expect(264/900*100).toBeCloseTo(29.3333333);expect(352/1500*100).toBeCloseTo(23.4666667);expect(20*30-20*10-4*22).toBe(312);
  expect(blogPostMap['restaurant-labor-cost-percentage'].html).toContain('employee withholdings already within gross wages');
 });
 it('returns validation errors instead of crashing or publishing non-finite results',()=>{
  for(const fn of [calculateRecipe,calculateFoodPeriod,calculateMenuPrice])for(const input of [null,undefined,[],false,''])expect(fn(input).valid).toBe(false);
  expect(calculateRecipe({...recipeExample,price:'1e-1000'}).valid).toBe(false);
  expect(calculateRecipe({...recipeExample,ingredients:[null]}).valid).toBe(false);
  expect(calculateFoodPeriod({...foodPeriodExample,sales:'1e-1000'}).valid).toBe(false);
  for(const sales of [0,-1,''])expect(calculateDetailedFoodPeriod({...foodPeriodDefaults,sales}).valid).toBe(false);
  expect(calculateDetailedFoodPeriod({...foodPeriodDefaults,sales:10000}).foodPct).toBe(200);
 });
});
