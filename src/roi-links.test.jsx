import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPostMap} from './content/blogs/index.js';
import {connectRoiGuide,roiGuideConnections} from './content/blogs/roiConnections.js';
import {freeTools} from './freeTools.js';
import {industryPages} from './industryCalculatorContent.js';
import AuthorityPage from './AuthorityPages.jsx';
const href='/calculators/business-roi-calculator/';
describe('Contextual ROI discovery and distinct planning intents',()=>{
 it('adds one crawlable, idempotent connection to each real relevant guide',()=>{
  for(const slug of Object.keys(roiGuideConnections)){
   const post=blogPostMap[slug];expect(post,slug).toBeTruthy();
   expect(post.html.split(`href="${href}"`).length-1,slug).toBe(1);
   expect(post.html).toContain('id="project-roi-next-step"');
   expect(connectRoiGuide(post)).toEqual(post);
   expect(post.modified).toBe(['cash-flow-break-even-vs-profit-break-even','cash-flow-forecast-vs-break-even'].includes(slug)?'2026-10-25':slug==='how-to-calculate-working-capital'?'2026-10-25':['agency-billable-utilization-rate','how-to-calculate-working-capital'].includes(slug)?'2026-10-22':'2026-10-18');
  }
  expect(connectRoiGuide({slug:'unrelated',html:'<p>Original</p>'})).toEqual({slug:'unrelated',html:'<p>Original</p>'});
 });
 it('links three appropriate tools without duplicate destinations or a new industry',()=>{
  for(const slug of ['employee-cost-calculator','cash-flow-forecast-template','cash-runway-calculator']){
   const urls=freeTools[slug].related.map(([,url])=>url);
   expect(urls.filter(url=>url===href)).toHaveLength(1);
   expect(new Set(urls).size).toBe(urls.length);
  }
  expect(Object.keys(industryPages)).toHaveLength(8);
  const roi=freeTools['business-roi-calculator'];expect(roi.relatedIntro).toContain('do not transfer your inputs');
  expect(roi.related.some(([,url])=>url==='/calculators/cash-runway-calculator/')).toBe(true);
 });
 it('makes ROI discoverable from resources and explains its actual denominator in methodology',()=>{
  expect(renderToStaticMarkup(<AuthorityPage path="/resources"/>)).toContain(`href="${href}"`);
  const html=renderToStaticMarkup(<AuthorityPage path="/calculation-methodology"/>);
  expect(html).toContain(`href="${href}#formula"`);
  expect(html).toContain('Total costs include setup plus');
  expect(html).toContain('Do not count the same hours twice');
 });
});
