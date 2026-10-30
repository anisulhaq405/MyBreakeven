import {october25GscDates}from'./testFixtures/october25GscDates.js';
import React from 'react';
import {describe, it, expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import BlogArticle from './BlogArticle.jsx';
import {blogPostMap} from './content/blogs/index.js';

const slugs = ['how-much-does-it-cost-to-open-a-restaurant','how-much-does-it-cost-to-start-an-ecommerce-store','mobile-detailing-business-startup-cost','how-much-does-it-cost-to-start-a-photography-business','restaurant-budgeting'];
describe('October 22 existing-page recovery', () => {
  it('keeps the paid-in-full van out of monthly debt service and reconciles the cash goal', () => {
    const p = blogPostMap[slugs[2]];
    const monthly = [250,140,300,260].reduce((a,b)=>a+b,0);
    const target = monthly + 3500 + 1000;
    const jobs = Math.ceil(target/(240-36));
    expect(monthly).toBe(950); expect(target).toBe(5450); expect(jobs).toBe(27);
    expect(jobs*240).toBe(6480); expect(jobs*36).toBe(972);
    expect(jobs*(240-36)-target).toBe(58);
    expect(p.html).toContain('$5,450 ÷ $204');
    expect(p.html).not.toContain('vehicle finance $550');
    expect(p.html).not.toContain('Operating costs total $1,500');
    expect(p.html).toContain('Principal is a cash commitment, not an operating expense');
  });
  it('reconciles already-owned photography equipment without erasing the cash cushion', () => {
    const alreadyOwned = 1800+1200+700+1400;
    expect(6550-alreadyOwned).toBe(1450);
    expect(6550-alreadyOwned+1790).toBe(3240);
    expect(blogPostMap[slugs[3]].html).toContain('$3,240');
  });
  it('renders each answer before its image, keeps unique IDs and resolves local section links', () => {
    for (const slug of slugs) {
      const p = blogPostMap[slug], html = renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={p}/>);
      const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
      expect(new Set(ids).size, slug).toBe(ids.length);
      for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) expect(ids, slug+'#'+id).toContain(id);
      expect(html.indexOf(p.answerHtml.slice(0,30)),slug).toBeLessThan(html.indexOf('article-featured'));
      expect(p.modified).toBe(slug==='restaurant-budgeting'?'2026-10-30':(october25GscDates.has(p.slug)?'2026-10-25':(slug==='how-much-does-it-cost-to-start-an-ecommerce-store'?'2026-10-25':'2026-10-22')));
      expect(p.draft).not.toBe(true);
    }
  });
});
