import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPostMap} from './content/blogs/index.js';
import BlogArticle from './BlogArticle.jsx';
import {restaurantClusters} from './restaurantCluster.js';
describe('restaurant cash forecast guide',()=>{
 const p=blogPostMap['restaurant-cash-flow-forecast'];
 it('reconciles every week in the published 13-week table',()=>{
  const tbody=p.html.match(/<tbody>([\s\S]*?)<\/tbody>/)[1];
  const rows=[...tbody.matchAll(/<tr>(.*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<(?:td|th)[^>]*>(.*?)<\/(?:td|th)>/g)].map(c=>Number(c[1].replace(/[$,]/g,''))));
  expect(rows).toHaveLength(13);let previous=18000;
  for(const [week,opening,receipts,suppliers,payroll,other,closing,headroom]of rows){expect(opening).toBe(previous);expect(closing).toBe(opening+receipts-suppliers-payroll-other);expect(headroom).toBe(closing-8000);previous=closing;}
  expect(Math.min(...rows.map(r=>r[6]))).toBe(3500);expect(previous).toBe(46500);
  const delayed=rows.map(r=>r[6]-(r[0]===4?6000:0));expect(Math.min(...delayed)).toBe(-2500);
  const deferred=rows.map(r=>r[6]+(r[0]>=4&&r[0]<7?8500:0));expect(Math.min(...deferred)).toBe(12000);
 });
 it('is discoverable in the existing restaurant cluster and renders its sources and assumptions',()=>{
  expect(restaurantClusters.some(g=>g.slugs.includes(p.slug))).toBe(true);
  const h=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={p}/>);
  expect(h).toContain('restaurant-cash-flow-forecast.webp');expect(h).toContain('hypothetical');
  for(const id of ['cash-flow-formula','sales-to-cash','worked-forecast','stress-tests','weekly-review'])expect(h).toContain('id="'+id+'"');
  expect(h).toContain('openstax.org');expect(h).toContain('sba.gov');expect(h).toContain('squareup.com');
  expect(p.published).toBe('2026-10-18');
 });
});
