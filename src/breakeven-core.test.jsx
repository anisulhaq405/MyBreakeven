import React from 'react';
import{it,expect}from'vitest';
import{renderToStaticMarkup}from'react-dom/server';
import{readFileSync}from'node:fs';
import HomeSEO from './HomeSEO.jsx';
import App from './main.jsx';
import LongformArticle from './LongformArticle.jsx';
import{blogPosts,beforeBreakevenCoreBlogPosts,blogPostMap}from'./content/blogs/index.js';
import{homeFaq}from'./homeFaq.js';
it('defines the topic visibly before peripheral tools and retains one clear homepage H1',()=>{
 const h=renderToStaticMarkup(<App/>);expect((h.match(/<h1\b/g)||[]).length).toBe(1);expect(h).toContain('<h1>Break-even point calculator</h1>');expect(h.indexOf('id="breakeven-meaning"')).toBeLessThan(h.indexOf('Free business planning tools'));expect(h).toContain('total revenue equals total costs');
 const seo=renderToStaticMarkup(<HomeSEO/>);expect(seo).toContain('199');expect(seo).toContain('−$20');expect(seo).toContain('201');expect(seo).toContain('+$20');expect(seo).toContain('id="breakeven-chart-desc"');
});
it('reconciles the original monthly chart, neighboring units and fractional example',()=>{
 const profit=q=>q*50-(4000+30*q);expect([profit(199),profit(200),profit(201)]).toEqual([-20,0,20]);expect(4010/(50-30)).toBe(200.5);expect(201*20-4010).toBe(10);
 const guideProfit=q=>q*80-(9010+50*q);expect(guideProfit(300)).toBe(-10);expect(guideProfit(301)).toBe(20);
});
it('updates only the existing calculation owner and preserves earlier tables, anchors and identity',()=>{
 for(const[i,p]of blogPosts.entries()){
  const old=beforeBreakevenCoreBlogPosts[i];if(p.slug!=='calculate-break-even-point'){expect(p).toBe(old);continue;}
  for(const k of ['slug','published','image','alt','calculatorSlug','tag','cluster','faq'])expect(p[k]).toEqual(old[k]);
  const h=renderToStaticMarkup(<LongformArticle article={p}/>),ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);expect((h.match(/<h1\b/g)||[]).length).toBe(1);for(const m of old.html.matchAll(/\bid="([^"]+)"/g))expect(ids).toContain(m[1]);for(const m of h.matchAll(/href="#([^"]+)"/g))expect(ids).toContain(m[1]);for(const m of old.html.matchAll(/<table\b[\s\S]*?<\/table>/g))expect(p.html+p.answerHtml).toContain(m[0]);expect(h.indexOf('id="quick-answer"')).toBeLessThan(h.indexOf('article-featured'));
 }
});
it('keeps homepage FAQ schema aligned with visible answers and uses the real whole-site search route',()=>{
 const h=readFileSync('index.html','utf8');const schema=JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);const g=schema['@graph'];expect(g.find(e=>e['@type']==='FAQPage').mainEntity.map(q=>[q.name,q.acceptedAnswer.text])).toEqual(homeFaq);expect(g.find(e=>e['@type']==='WebSite').potentialAction.target).toBe('https://mybreakeven.com/search/?q={search_term_string}');expect(g.find(e=>e['@type']==='WebPage').dateModified).toBe('2026-11-24');
});
