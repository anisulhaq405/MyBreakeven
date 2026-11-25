import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts} from './content/blogs/index.js';
import {homeBlogData} from './homeBlogData.js';
import {calculatorDirectory} from './calculatorDirectory.js';
import {calculatorCardCopy} from './calculatorCardCopy.js';
import {prepareSearchDocuments,searchSite} from './siteSearch.js';
import PhotographyCluster from './PhotographyCluster.jsx';
import HomeBlogShowcase from './HomeBlogShowcase.jsx';
describe('existing-page discovery batch 3',()=>{
 it('keeps homepage cards aligned with the final published guide records',()=>{
  for(const card of [homeBlogData.featured,...homeBlogData.supporting]){
   const post=blogPosts.find(p=>p.slug===card.slug);
   expect(card.title).toBe(post.title);expect(card.description).toBe(post.description);
  }
  const h=renderToStaticMarkup(<HomeBlogShowcase/>);
  expect(h).toContain('/blogs/#topic-break-even');expect(h).not.toContain('/blogs/?q=');
 });
 it('keeps directory choices concise without scenario figures or changes to tool records',()=>{
  for(const [slug,t] of calculatorDirectory){const [summary,action]=calculatorCardCopy(slug,t);expect(summary.length,slug).toBeLessThan(190);expect(action.length).toBeLessThan(40);expect(summary).not.toMatch(/Job A|Job B|Enter your own figures to see/);}
 });
 it('connects the photography journey to existing guides and the calculator in order',()=>{
  const h=renderToStaticMarkup(<PhotographyCluster/>);
  const slugs=['how-much-does-it-cost-to-start-a-photography-business','photography-cost-per-session-editing','photography-business-profit-margin'];
  for(const slug of slugs){expect(blogPosts.some(p=>p.slug===slug)).toBe(true);expect(h).toContain('/blogs/'+slug+'/');}
  expect(h).toContain('Set the monthly booking target');
 });
 it('matches acronym and expanded queries symmetrically without broadening unrelated words',()=>{
  const docs=prepareSearchDocuments([
   {url:'/roas/',kind:'Calculator',title:'ROAS calculator',text:'Advertising contribution'},
   {url:'/cogs/',kind:'Guide',title:'Cost of goods sold',text:'Inventory accounting'},
   {url:'/bep/',kind:'Guide',title:'Break-even point',text:'Contribution'},
   {url:'/other/',kind:'Guide',title:'Payroll records',text:'Wages'},
  ]);
  for(const [q,url] of [['return on ad spend','/roas/'],['COGS','/cogs/'],['BEP','/bep/']])expect(searchSite(docs,q)[0].url).toBe(url);
  expect(searchSite(docs,'roas payroll')).toEqual([]);
 });
});
