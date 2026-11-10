import React from 'react';
import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {eighteenGuideReview,eighteenGuideReviewSlugs,applyNovember10EighteenGuideReview} from './content/blogs/november10EighteenGuideReview.js';
import BlogArticle from './BlogArticle.jsx';
import {calculatorDirectory} from './calculatorDirectory.js';
const before=JSON.parse(readFileSync('src/testFixtures/november10EighteenBefore.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
describe('18 explicitly authorized November 10 guide updates',()=>{
 it('changes exactly 18 articles, leaving all 188 other records byte-for-byte equal',()=>{
  expect(blogPosts.length).toBe(206);expect(before.length).toBe(206);expect(eighteenGuideReviewSlugs.size).toBe(18);
  for(const b of before){const p=blogPostMap[b.slug];expect(p.published,b.slug).toBe(b.published);expect(p.image,b.slug).toBe(b.image);
   if(!eighteenGuideReviewSlugs.has(b.slug)){expect(hash(p),b.slug).toBe(b.sha256);continue;}
   expect(p.modified).toBe('2026-11-10');expect(hash(p)).not.toBe(b.sha256);
   const id=`review-20261110-${b.slug}`;const start=p.html.indexOf(`<section aria-labelledby="${id}">`);const end=p.html.indexOf('</section>',start)+10;
   expect(start).toBeGreaterThanOrEqual(0);const originalHtml=(p.html.slice(0,start)+p.html.slice(end)).replace(new RegExp(`<h3 id="${id}-faq">[\\s\\S]*?</h3><p>[\\s\\S]*?</p>`),'');
   expect(hash(originalHtml),b.slug+' original article').toBe(b.htmlHash);
   const restored={...p,html:originalHtml,modified:b.modified,faq:b.faq};if(b.sectionLinks)restored.sectionLinks=b.sectionLinks;
   expect(hash(restored),b.slug+' original fields').toBe(b.sha256);
   expect(p.faq).toHaveLength(b.faq.length+1);
  }
 });
 it('renders accessible tables, unique anchors, one H1 and existing internal destinations',()=>{
  const calculators=new Set(calculatorDirectory.map(([s])=>s));
  for(const slug of eighteenGuideReviewSlugs){const p=blogPostMap[slug];const html=renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={p}/>);expect((html.match(/<h1\b/g)||[]).length).toBe(1);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size,slug).toBe(ids.length);
   expect(html,slug+' new visible FAQ').toContain(eighteenGuideReview[slug].q);
   expect(eighteenGuideReview[slug].copy).toContain('<caption>');expect(eighteenGuideReview[slug].copy).toContain('scope="col"');
   for(const [,href] of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){if(href.startsWith('/blogs/')&&href!='/blogs/')expect(blogPostMap[href.split('/')[2]],href).toBeDefined();if(href.startsWith('/calculators/')&&href!='/calculators/')expect(calculators.has(href.split('/')[2]),href).toBe(true);if(href.startsWith('/downloads/'))expect(existsSync('public'+href),href).toBe(true);}
   for(const [id] of p.sectionLinks||[])expect(ids,slug+' '+id).toContain(id);
  }
 });
 it('does not apply the override outside the named scope',()=>{const p={slug:'unrelated',modified:'2026-11-09'};expect(applyNovember10EighteenGuideReview(p)).toBe(p);expect(()=>applyNovember10EighteenGuideReview({slug:'snow-removal-pricing'})).toThrow('Missing');});
 it('independently reconciles the new calculation and decision examples',()=>{
  expect(27000/2080).toBeCloseTo(12.980769,6);expect(2080*12.9).toBe(26832);
  expect(1e6/1.05**20).toBeCloseTo(376889,0);expect(1e6/1.03**20).toBeCloseTo(553676,0);
  expect((1e6-40000)*.8).toBe(768000);expect(38000/768000*100).toBeCloseTo(4.9479,4);expect(768000*.04).toBe(30720);
  expect(27000/20000).toBe(1.35);expect((120000-78000)/120000).toBe(.35);
  expect(900*250/1500).toBe(150);expect(17.5/7).toBe(2.5);expect((2+8)/(3+2)).toBe(2);
  expect(70000-25000).toBe(45000);expect(45000/80000).toBe(.5625);expect(130000-5000).toBe(125000);
  expect(11500/1.03**3).toBeCloseTo(10524.13,2);expect(11500/1.05**3).toBeCloseTo(9934.13,2);expect((1.15**(1/3)-1)*100).toBeCloseTo(4.768955,6);
  const pv=[1,2,3].reduce((s,t)=>s+100/1.1**t,0);expect(pv).toBeCloseTo(248.685199,6);expect(pv*1.1).toBeCloseTo(273.553719,6);expect(pv*1.1**3).toBeCloseTo(331,8);
  expect(8000+28000-33000).toBe(3000);expect(10000+10500-11400).toBe(9100);expect(23-13).toBe(10);expect(300/4).toBe(75);
  expect(Math.floor((3000*.97-500)/65)).toBe(37);expect(Math.floor((3000*.97-500-600)/65)).toBe(27);expect(65/.77).toBeCloseTo(84.42,2);
  expect((4940+3000)/.97).toBeCloseTo(8185.57,2);expect(2000.01-2400).toBeCloseTo(-399.99,6);
  expect((300+20*30)/.72).toBe(1250);expect(200/.77).toBeCloseTo(259.74,2);expect(12*52*80/12).toBe(4160);expect(46080/624).toBeCloseTo(73.85,2);
 });
});
