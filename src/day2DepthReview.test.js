import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {calculateMakeOrBuy} from './day2PlanningEngine.js';
import {readFileSync} from 'node:fs';
describe('Day 2 decision thresholds and supporting schedules',()=>{
 const base={quantity:1000,makeVariable:14,avoidableFixed:3000,buyUnit:18,buyExtra:500,opportunity:2000,commonFixed:4000};
 it('supplier ceilings and opportunity thresholds produce ties, with direction either side',()=>{
  expect(calculateMakeOrBuy({...base,buyUnit:18.5}).choice).toBe('tie');
  expect(calculateMakeOrBuy({...base,opportunity:0,buyUnit:16.5}).choice).toBe('tie');
  expect(calculateMakeOrBuy({...base,opportunity:1500}).choice).toBe('tie');
  expect(calculateMakeOrBuy({...base,opportunity:1000}).difference).toBe(-500);
  expect(calculateMakeOrBuy({...base,opportunity:2000}).difference).toBe(500);
 });
 it('new downloads are linked once and all new section ids remain unique in composed articles',()=>{
  for(const slug of ['flexible-budget-variance-analysis','make-or-buy-decision']) {
   const html=blogPostMap[slug].html;
   const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
   expect(new Set(ids).size).toBe(ids.length);
   const links=[...html.matchAll(/href="(\/downloads\/(?:flexible-budget|make-or-buy)-review-[^"]+)"/g)].map(m=>m[1]);
   expect(links.length).toBe(1);
   expect(readFileSync('public'+links[0],'utf8')).toContain('=IF(AND(COUNT(');
  }
 });
});
