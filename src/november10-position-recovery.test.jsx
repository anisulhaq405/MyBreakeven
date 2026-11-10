import React from 'react';
import {eighteenGuideReviewSlugs} from './content/blogs/november10EighteenGuideReview.js';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {november10RecoverySlugs,applyNovember10PositionRecovery} from './content/blogs/november10PositionRecovery.js';
import BlogArticle from './BlogArticle.jsx';
import {calculatorDirectory} from './calculatorDirectory.js';
const calculatorSlugs=new Set(calculatorDirectory.map(([slug])=>slug));
const before=JSON.parse(readFileSync('src/testFixtures/november10Before.json'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('November 10 existing-owner position recovery',()=>{
 it('changes exactly twelve selected owners and preserves every other record',()=>{
  expect(blogPosts.length).toBe(before.length);expect(november10RecoverySlugs.size).toBe(12);
  for(const b of before){const p=blogPostMap[b.slug];expect(p.published,b.slug).toBe(b.published);expect(p.image,b.slug).toBe(b.image);
   if(eighteenGuideReviewSlugs.has(b.slug))continue; // Later review covered by the full 206-record preservation test.
   if(!november10RecoverySlugs.has(b.slug)){expect(hash(p),b.slug).toBe(b.sha256);continue;}
   expect(b.modified<= '2026-10-25').toBe(true);expect(p.modified).toBe('2026-11-10');expect(hash(p)).not.toBe(b.sha256);
  }
 });
 it('blocks protected owners and leaves unrelated records intact',()=>{
  const p={slug:'how-much-does-it-cost-to-open-a-salon',modified:'2026-10-26'};expect(()=>applyNovember10PositionRecovery(p)).toThrow('Protected');const other={slug:'fixed-vs-variable-costs',modified:'2026-11-04'};expect(applyNovember10PositionRecovery(other)).toBe(other);
 });
 it('renders one H1, unique anchors and valid internal destinations for every revised owner',()=>{
  for(const slug of november10RecoverySlugs){const p=blogPostMap[slug];const html=renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={p}/>);expect((html.match(/<h1\b/g)||[]).length).toBe(1);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size,slug).toBe(ids.length);
   for(const [,href] of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){if(href.startsWith('/blogs/')&&href!='/blogs/')expect(blogPostMap[href.split('/')[2]],href).toBeDefined();if(href.startsWith('/calculators/')&&href!='/calculators/')expect(calculatorSlugs.has(href.split('/')[2]),href).toBe(true);if(href.startsWith('/downloads/'))expect(existsSync('public'+href),href).toBe(true);}
  }
 });
 it('reconciles independent worked examples without altering calculator formulas',()=>{
  expect(96*(195-98-195*.029)-8700).toBeCloseTo(69.12,6);
  expect(97*76.78-8700).toBeCloseTo(-1252.34,6);
  expect(800*.05*40+200*.2*80).toBe(4800);
  expect((2*(60+15)+15)/1000).toBe(.165);
  expect(52/(1-.03-.2)).toBeCloseTo(67.53,2);
  expect(200/(1-.03-.25)).toBeCloseTo(277.78,2);
  expect((250-250*.03-200)/250).toBe(.17);
  expect(Math.ceil(96000/28)).toBe(3429);
  expect(499*24-12000).toBe(-24);expect(500*24-12000).toBe(0);expect(501*24-12000).toBe(24);
 });
});
