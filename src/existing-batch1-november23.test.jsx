import React from 'react';
import {it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts,beforeBatch1BlogPosts,blogPostMap} from './content/blogs/index.js';
import {batch1ReviewedSlugs,restoreExistingBatch1} from './content/blogs/existingBatch1November23.js';
import LongformArticle from './LongformArticle.jsx';
import {calculateHighLow} from './highLow.js';
it('changes only four existing owners, preserving publication, assets, calculators and prior anchors',()=>{
 expect(blogPosts).toHaveLength(242);
 for(const [i,p]of blogPosts.entries()){
  const old=beforeBatch1BlogPosts[i];
  if(!batch1ReviewedSlugs.has(p.slug)){expect(p).toBe(old);continue;}
  expect(restoreExistingBatch1(p)).toBe(old);
  for(const key of ['slug','published','image','alt','calculatorSlug','faq','tag','cluster'])expect(p[key]).toEqual(old[key]);
  expect(p.modified).toBe('2026-11-23');
  const h=renderToStaticMarkup(<LongformArticle article={p}/>),ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  expect((h.match(/<h1\b/g)||[]).length).toBe(1);expect(new Set(ids).size).toBe(ids.length);
  for(const m of h.matchAll(/href="#([^"]+)"/g))expect(ids,p.slug+' '+m[1]).toContain(m[1]);
  for(const m of old.html.matchAll(/\bid="([^"]+)"/g))expect(ids).toContain(m[1]);
  expect(h.indexOf('id="quick-answer"')).toBeLessThan(h.indexOf('article-featured'));
 }
});
it('reconciles operating covers, owner-income covers and whole-night rounding',()=>{
 const c=38-15.2;expect(Math.ceil(24000/c)).toBe(1053);expect(Math.ceil(30000/c)).toBe(1316);expect(Math.ceil(24000/c/26)).toBe(41);expect(Math.ceil(30000/c/26)).toBe(51);expect(51*26*c).toBeCloseTo(30232.8);expect(1316*c).toBeCloseTo(30004.8);
 expect(blogPostMap['restaurant-covers-per-night-break-even'].answerHtml).toContain('not one table bill');
});
it('reconciles contribution, pre-owner remainder and owner-paid planning margin',()=>{
 const revenue=10*500,cost=10*(150+500*.03),contribution=revenue-cost;
 expect(contribution/revenue).toBe(.67);expect((contribution-700)/revenue).toBe(.53);expect((contribution-700-1800)/revenue).toBe(.17);
 expect(blogPostMap['photography-business-profit-margin'].html).toContain('<td>53%</td>');
});
it('keeps the downloadable budget separate from variable-labor example',()=>{
 const p=blogPostMap['cleaning-business-monthly-expenses'];expect(p.answerHtml).toContain('/downloads/mybreakeven-cleaning-monthly-budget.xlsx');expect(p.html).toContain('workbook uses committed monthly payroll');expect(40*(180-72)-1320).toBe(3000);
});
it('matches all six high-low residuals with the unchanged calculator engine',()=>{
 const a=[80,120,160,200,240,280],cost=[1640,1800,1980,2120,3000,2440];
 const residuals=a.map((x,i)=>cost[i]-calculateHighLow({lowActivity:'80',lowCost:'1640',highActivity:'280',highCost:'2440',target:String(x)}).total);
 expect(residuals).toEqual([0,0,20,0,720,0]);expect(blogPostMap['high-low-method'].html).toContain('+$720');
});
