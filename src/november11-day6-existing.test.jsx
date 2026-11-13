import React from 'react';
import{describe,it,expect}from'vitest';
import{readFileSync,existsSync}from'node:fs';
import{createHash}from'node:crypto';
import{renderToStaticMarkup}from'react-dom/server';
import{blogPosts,blogPostMap}from'./content/blogs/index.js';
import{november11Day6Updates,november11Day6Slugs,applyNovember11Day6Review}from'./content/blogs/november11Day6Existing.js';
import{articleFaq}from'./articleFaq.js';
import BlogArticle from'./BlogArticle.jsx';
import ContributionMarginWidget from'./ContributionMarginWidget.jsx';
import{calculateContributionQuantity as total,calculateUnitContribution as unit}from'./unitContribution.js';
const before=JSON.parse(readFileSync('src/testFixtures/november11Day6Before.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)??'null').digest('hex');
describe('Day 6 explicitly authorized existing owners',()=>{
 it('changes exactly four existing records and preserves all other 202 records',()=>{
  expect(blogPosts).toHaveLength(before.length+9);expect(november11Day6Slugs.size).toBe(4);
  for(const b of before){if(b.slug==='restaurant-budgeting')continue; // Covered by November 13 arithmetic, intent and 214-record preservation checks.
const p=blogPostMap[b.slug];expect(p.published).toBe(b.published);expect(p.image).toBe(b.image);
   if(!november11Day6Slugs.has(b.slug)){expect(hash(p),b.slug).toBe(b.sha256);continue;}
   expect(p.modified).toBe('2026-11-11');expect(hash(p)).not.toBe(b.sha256);
   const id=`day6-20261111-${b.slug}`,start=p.html.indexOf(`<section aria-labelledby="${id}">`),end=p.html.indexOf('</section>',start)+10;
   expect(start).toBeGreaterThanOrEqual(0);
   const html=(p.html.slice(0,start)+p.html.slice(end)).replace(new RegExp(`<h3 id="${id}-faq">[\\s\\S]*?</h3><p>[\\s\\S]*?</p>`),'');
   expect(hash(html),b.slug+' original body').toBe(b.htmlHash);
   const restored={...p,html,faq:b.faq,modified:b.modified};if(b.sectionLinks)restored.sectionLinks=b.sectionLinks;
   expect(hash(restored),b.slug+' original fields').toBe(b.sha256);
   expect(p.faq.length).toBe(b.faq.length+1);
  }
 });
 it('keeps visible FAQs in sync and removes closing notes from FAQ answers',()=>{
  for(const slug of november11Day6Slugs){const p=blogPostMap[slug],u=november11Day6Updates[slug];
   expect(articleFaq(p).items.some(f=>f.q===u.q&&f.a===u.a)).toBe(true);
   for(const f of p.faq)expect(f.a).not.toContain('Closing takeaways');
  }
 });
 it('renders one H1, valid anchors, existing destinations and accessible tables',()=>{
  for(const slug of november11Day6Slugs){const p=blogPostMap[slug],h=renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={p}/>);
   expect((h.match(/<h1\b/g)||[])).toHaveLength(1);const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size,slug).toBe(ids.length);
   expect(h).toContain(november11Day6Updates[slug].q);expect(november11Day6Updates[slug].copy).toContain('<caption>');expect(november11Day6Updates[slug].copy).toContain('scope="col"');
   for(const[,id]of h.matchAll(/href="#([^"?]+)"/g))expect(ids,slug+'#'+id).toContain(id);
   for(const[,href]of h.matchAll(/href="(\/[^"?]+)"/g)){if(href.startsWith('/blogs/')&&href.split('#')[0]!='/blogs/')expect(blogPostMap[href.split('/')[2]],href).toBeDefined();if(href.startsWith('/downloads/'))expect(existsSync('public'+href),href).toBe(true);}
   for(const[id]of p.sectionLinks||[])expect(ids).toContain(id);
  }
 });
 it('is idempotent and cannot alter an unrelated protected owner',()=>{
  for(const slug of november11Day6Slugs)expect(applyNovember11Day6Review(blogPostMap[slug])).toBe(blogPostMap[slug]);
  const other={slug:'cash-flow-statement',modified:'2026-11-10'};expect(applyNovember11Day6Review(other)).toBe(other);
 });
 it('independently verifies neighboring units, capacity and the fee-aware price floor',()=>{
  const c=125-65-125*.028-.30;expect(c).toBeCloseTo(56.2,10);expect(Math.ceil(4000/c)).toBe(72);
  expect(71*c-4000).toBeCloseTo(-9.8,9);expect(72*c-4000).toBeCloseTo(46.4,9);expect(70*c-4000).toBeCloseTo(-66,9);
  expect(70*(125.98*.972-65-.30)).toBeGreaterThanOrEqual(4000);expect(70*(125.97*.972-65-.30)).toBeLessThan(4000);
  const lower=120*.972-65-.30;expect(Math.ceil(4000/lower)).toBe(78);expect(70*lower-4000).toBeCloseTo(-406.2,9);
 });
 it('verifies inverse formulas at the nearest cent and allowable cost limit',()=>{
  expect((7000/200+45+.25)/.97).toBeCloseTo(82.7319587629,10);
  expect(200*(82.74*.97-45-.25)-6000).toBeCloseTo(1001.56,9);expect(200*(82.73*.97-45-.25)-6000).toBeCloseTo(999.62,9);
  expect(80*.97-.25-7000/200).toBeCloseTo(42.35,10);expect(200*(80*.97-42.35-.25)-6000).toBeCloseTo(1000,9);
 });
 it('keeps incremental and all-units pricing schedules distinct',()=>{
  const a=q=>600+8*Math.min(q,100)+6*Math.max(q-100,0),b=q=>600+(q<=100?8*q:6*q);
  expect([80,100,101,150].map(a)).toEqual([1240,1400,1406,1700]);expect([80,100,101,150].map(b)).toEqual([1240,1400,1206,1500]);expect(b(101)-b(100)).toBe(-194);
 });
});
const inputs={price:'50',variableCost:'25',feePct:'3',fixedFee:'.30'};
describe('Contribution quantity reconciliation',()=>{
 it('preserves per-unit results and reconciles matching total revenue and variable costs',()=>{
  const r=total(inputs,'100');expect(r).toMatchObject({valid:true,sales:5000,variableCost:2680,contribution:2320,observedRatio:46.4});expect(r.sales-r.variableCost).toBe(r.contribution);expect(unit(inputs).contribution).toBe(23.2);
 });
 it('shows zero totals without reporting an observed zero-revenue margin',()=>expect(total(inputs,'0')).toMatchObject({valid:true,sales:0,variableCost:0,contribution:0,observedRatio:null}));
 it('preserves negative contribution and reconciles the order-level flat fee once',()=>{
  expect(total({...inputs,variableCost:60},'100').contribution).toBe(-1180);
  const item={price:25,variableCost:12,feePct:3,fixedFee:.15};expect(total(item,2).contribution).toBe(24.2);
  expect(unit({price:50,variableCost:24,feePct:3,fixedFee:.3}).contribution).toBe(24.2);
 });
 for(const q of ['',null,undefined,' ',1.2,-1,Infinity,1000001,true])it(`rejects invalid sold quantity ${String(q)}`,()=>expect(total(inputs,q).valid).toBe(false));
 it('renders accessible quantity control and explanatory period totals',()=>{
  const h=renderToStaticMarkup(<ContributionMarginWidget/>);expect(h).toContain('Matching sold quantity');expect(h).toContain('2,320.00');expect(h).toContain('aria-labelledby="contribution-quantity-label"');expect(h).toContain('same scope');
 });
});
