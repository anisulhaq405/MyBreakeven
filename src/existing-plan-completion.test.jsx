import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {existsSync} from 'node:fs';
import BlogArticle from './BlogArticle.jsx';
import {blogPostMap} from './content/blogs/index.js';
import {existingPlanNarratives} from './existingPlanNarratives.js';
describe('Existing plan resource completion',()=>{
 it('renders real editable downloads and completed examples without broken section navigation',()=>{
  for(const p of Object.values(existingPlanNarratives)){
   const post=blogPostMap[p.slug],html=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={post}/>);
   const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
   expect(new Set(ids).size,p.slug).toBe(ids.length);
   for(const [,id] of html.matchAll(/href="#([^"]+)"/g))expect(ids).toContain(id);
   for(const file of [p.document,p.workbook]){expect(existsSync('public/downloads/'+file)).toBe(true);expect(html).toContain('/downloads/'+file+'?v=20261024');}
   expect(html).toContain(p.name);expect(post.modified).toBe('2026-10-24');
  }
 });
 it('connects the launch checklist only to available cash and ecommerce tools',()=>{
  const html=blogPostMap['how-much-does-it-cost-to-start-an-ecommerce-store'].html;
  expect(html).toContain('id="ecommerce-launch-checklist"');
  expect(html).toContain('/calculators/cash-flow-forecast-template/');
  expect(html).toContain('/calculators/net-cash-flow-calculator/');
  expect(html).toContain('/resources/ecommerce-business-plan-template/');
 });
});
