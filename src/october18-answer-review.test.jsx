import {october25GscDates}from'./testFixtures/october25GscDates.js';
import React from 'react';
import {describe,it,expect}from'vitest';
import{renderToStaticMarkup}from'react-dom/server';
import BlogArticle from './BlogArticle.jsx';
import{blogPostMap}from'./content/blogs/index.js';
const slugs=['restaurant-labor-cost-percentage','restaurant-food-cost-percentage','operating-leverage-small-business','contribution-margin-vs-profit-margin'];
describe('Four existing guide answers',()=>{
 it('renders all answers and method handoffs before the cover with one displaced quick answer removed',()=>{
  for(const slug of slugs){const p=blogPostMap[slug],html=renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={p}/>);expect(p.modified).toBe(october25GscDates.has(p.slug)?'2026-10-25':(slug==='contribution-margin-vs-profit-margin'?'2026-10-23':'2026-10-22'));expect(html.indexOf(p.answerHtml)).toBeLessThan(html.indexOf('article-featured'));expect(p.html).not.toContain('Quick answer:');expect(p.answerHtml).not.toContain('Quick answer:');const anchors=[...p.answerHtml.matchAll(/href="#([^"]+)"/g)].map(x=>x[1]);expect(anchors.length).toBeGreaterThan(0);for(const id of anchors)expect(p.html).toContain(`id="${id}"`);}
 });
 it('keeps payroll and food denominators distinct with independently reconciled examples',()=>{
  const labor=blogPostMap[slugs[0]].answerHtml,food=blogPostMap[slugs[1]].answerHtml;expect((16000+2000)/60000*100).toBe(30);expect(labor).toContain('30% labor cost');expect(labor).toContain('not total expenses');expect(labor).toContain('must be positive');expect((8000+18000-6000)/60000*100).toBeCloseTo(33.3333333);expect(food).toContain('33.33% actual food cost');expect(food).toContain('food-plus-beverage');expect(food).toContain('theoretical ingredient cost');
 });
 it('retains the original worked tables once and makes operating-profit sensitivity limits explicit',()=>{
  const p=blogPostMap[slugs[2]],combined=p.answerHtml+p.html;expect((combined.match(/<th>One-month line<\/th>/g)||[]).length).toBe(1);expect(p.answerHtml).toContain('<th>One-month line</th>');expect(14400/2400).toBe(6);expect((132*120-12000-2400)/2400*100).toBe(60);expect(p.answerHtml).toContain('undefined');expect(p.answerHtml).toContain('At a loss');expect(p.answerHtml).toContain('unchanged price');expect(p.html).toContain('id="calculate-it-from-a-real-cost-structure"');
 });
 it('distinguishes contribution, operating and net profit without duplicating the income table',()=>{
  const p=blogPostMap[slugs[3]],combined=p.answerHtml+p.html;expect((combined.match(/<th>Simplified monthly statement<\/th>/g)||[]).length).toBe(1);expect(p.answerHtml).toContain('<th>Simplified monthly statement</th>');expect((20000-12000)/20000*100).toBe(40);expect((20000-12000-5000)/20000*100).toBe(15);expect((20000-12000-5000-400-600)/20000*100).toBe(10);for(const value of ['40%','15%','10%'])expect(p.answerHtml).toContain(value);expect(p.answerHtml).toContain('not three names for the same available cash');
 });
});
