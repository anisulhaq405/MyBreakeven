import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import HomeSEO from './HomeSEO.jsx';
import {blogPostMap,blogPosts} from './content/blogs/index.js';
import {freeTools} from './freeTools.js';

const targets=[
 ['/blogs/break-even-formula-units-dollars/','break-even-formula-units-dollars'],
 ['/blogs/calculate-break-even-point/','calculate-break-even-point'],
 ['/blogs/fixed-vs-variable-costs/','fixed-vs-variable-costs'],
 ['/calculators/cash-flow-forecast-template/','cash-flow-forecast-template'],
 ['/calculators/food-cost-calculator/','food-cost-calculator']
];
describe('Five existing GSC discovered URL homepage contextual pathways',()=>{
 it('renders crawlable anchor links to five unique published URLs',()=>{
  const html=renderToStaticMarkup(<HomeSEO/>);
  for(const [href] of targets)expect(html,href).toContain('href="'+href+'"');
  expect(new Set(targets.map(x=>x[0])).size).toBe(5);
 });
 it('preserves inventory and verifies every link resolves to existing source owner',()=>{
  expect(blogPosts).toHaveLength(161);
  for(const [href,slug] of targets){
   if(href.startsWith('/blogs/'))expect(blogPostMap[slug],href).toBeDefined();
   else expect(freeTools[slug],href).toBeDefined();
  }
 });
});
