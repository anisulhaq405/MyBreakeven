import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import BudgetVsActualResource from './BudgetVsActualResource.jsx';
import LongformArticle from './LongformArticle.jsx';
import {blogPostMap} from './content/blogs/index.js';
import {bvaFile,rollingFile,varianceReportAddition} from './content/day1PlanningContent.js';
import {authorityPages} from './authorityResources.js';
import {day1PlanningRelease} from './day1PlanningRelease.js';
import fs from 'node:fs';
describe('New plan Day 1 release package',()=>{
 it('keeps both new owners explicitly in draft until promotion',()=>{
  const p=blogPostMap['rolling-forecast'];
  expect(p.editorialStatus).toBe(day1PlanningRelease.published?'published':'draft');
  expect(authorityPages['resources/budget-vs-actual-template'][3]).toBe(!day1PlanningRelease.published);
  for(const h of [renderToStaticMarkup(<LongformArticle article={p}/>),renderToStaticMarkup(<BudgetVsActualResource/>)]){
   expect((h.match(/<h1\b/g)||[]).length).toBe(1);
   expect(h.includes('Unpublished draft for review')).toBe(!day1PlanningRelease.published);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const[,id]of h.matchAll(/href="#([^"]+)"/g))expect(ids).toContain(id);
  }
 });
 it('preserves the flexible-budget calculator and adds a single distinct static-report path',()=>{
  const p=blogPostMap['flexible-budget-variance-analysis'];
  expect(p.html.split(varianceReportAddition).length-1).toBe(1);
  const h=renderToStaticMarkup(<LongformArticle article={p}/>);
  expect(h).toContain('id="flexible-budget-calculator"');
  expect(h).toContain('href="/resources/budget-vs-actual-template/"');
  expect(h).toContain('href="/blogs/rolling-forecast/"');
  expect(p.html).toContain('not a new example of the calculator');
 });
 it('delivers real XLSX downloads rather than missing links or CSV substitutes',()=>{
  for(const file of [bvaFile,rollingFile]){const bytes=fs.readFileSync(new URL('../public'+file,import.meta.url));expect(bytes.subarray(0,2).toString()).toBe('PK');expect(bytes.length).toBeGreaterThan(5000);}
 });
});
