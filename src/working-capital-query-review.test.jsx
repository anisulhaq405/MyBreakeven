import React from 'react';
import{describe,it,expect}from'vitest';
import{readFileSync}from'node:fs';
import{renderToStaticMarkup}from'react-dom/server';
import{blogPostMap}from'./content/blogs/index.js';
import{applyWorkingCapitalQueryReview}from'./content/blogs/workingCapitalQueryReview.js';
import{articleFaq}from'./articleFaq.js';
import LongformArticle from './LongformArticle.jsx';
const p=blogPostMap['how-to-calculate-working-capital'];
describe('GSC working-capital owner improvement',()=>{
 it('keeps the owner, original publication, original XLSX and prior anchors while exposing all query answers',()=>{
  expect(p.tag).toBe('Break-Even Concepts');expect(p.published).toBe('2026-10-13');expect(p.modified).toBe('2026-10-26');expect(p.html).toContain('/downloads/working-capital-worksheet.xlsx');expect(p.html).toContain('$24,000');
  const html=renderToStaticMarkup(<LongformArticle article={p}/>),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);for(const[id]of p.sectionLinks)expect(ids).toContain(id);for(const id of ['operating-definition','quick-answer','worked-balance-sheet','dated-cash-test','use-the-working-capital-workbook','working-capital-download'])expect(ids).toContain(id);
  expect((html.match(/<h1[ >]/g)||[]).length).toBe(1);expect(articleFaq(p).items.length).toBe(13);expect(`${p.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeLessThanOrEqual(160);
 });
 it('reconciles the CSV account scopes and average-days results independently',()=>{
  const csv=readFileSync('public/downloads/working-capital-definition-and-days-examples.csv','utf8');expect(csv).toContain('Values only; no formulas');
  expect(8000+22000+30000+2000-(18000+6000+4000+10000)).toBe(24000);expect(22000+30000-18000).toBe(34000);expect(22000+30000+2000-18000-6000).toBe(30000);expect(24000-8000+10000+4000).toBe(30000);expect((20000+24000)/2/440000*365).toBe(18.25);expect(((26000+30000)/2/440000*365).toFixed(2)).toBe('23.23');expect(csv).toContain('18.25');expect(csv).toContain('23.23');
 });
 it('provides contextual inbound paths from both actual cash reporting owners',()=>{for(const slug of ['operating-cash-flow','cash-flow-statement'])expect(blogPostMap[slug].html).toContain('/blogs/how-to-calculate-working-capital/');expect(p.html).toContain('/blogs/operating-cash-flow/');expect(p.html).toContain('/blogs/cash-flow-statement/');});
 it('is idempotent and does not alter unrelated article owners',()=>{expect(applyWorkingCapitalQueryReview(p)).toEqual(p);const x={slug:'other',html:'<p>Original</p>'};expect(applyWorkingCapitalQueryReview(x)).toBe(x);});
});
