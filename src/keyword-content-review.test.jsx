import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import Decimal from 'decimal.js';
import BlogArticle from './BlogArticle.jsx';
import {blogPostMap} from './content/blogs/index.js';
import {keywordContentReviewData} from './content/blogs/keywordContentReviewData.js';
import {freeTools} from './freeTools.js';

describe('Targeted keyword content review',()=>{
  it('renders every reviewed article with early answers and valid unique local anchors',()=>{
    for(const r of keywordContentReviewData){
      const p=blogPostMap[r.slug],h=renderToStaticMarkup(<BlogArticle slug={r.slug} initialArticle={p}/>);
      const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
      expect(p.modified).toBe('2026-10-22'); expect(p.published<='2026-10-21').toBe(true);
      expect(new Set(ids).size,r.slug).toBe(ids.length); expect(ids).toContain(r.id);
      for(const [,id]of h.matchAll(/href="#([^"]+)"/g))expect(ids,r.slug+'#'+id).toContain(id);
      expect(h.indexOf(p.answerHtml.slice(0,30)),r.slug).toBeLessThan(h.indexOf('article-featured'));
    }
  });
  it('independently reconciles the forecast AR cash bridge and distinguishes its closing convention',()=>{
    const ar=90000/30*20,collections=50000+90000-ar;
    expect(ar).toBe(60000);expect(collections).toBe(80000);
    expect(90000/30*25-ar).toBe(15000);
    const h=blogPostMap['how-to-calculate-days-sales-outstanding'].html;
    expect(h).toContain('$80,000');expect(h).toContain('closing-balance convention');expect(h).toContain('historical average-AR');
  });
  it('reconciles bundle contribution and cost percentage without confusing their denominators',()=>{
    const contribution=new Decimal(120).minus(28).minus(32).minus(5).minus(new Decimal(120).times(.03));
    expect(contribution.toNumber()).toBe(51.4);expect(contribution.div(120).times(100).toFixed(2)).toBe('42.83');
    expect(12000+30000-2000+1000-11000).toBe(30000);expect(30000/75000*100).toBe(40);
    expect(blogPostMap['contribution-margin-vs-gross-margin'].html).toContain('$51.40');
  });
  it('keeps owner income and payroll benchmarks separate from cleaning revenue',()=>{
    expect(8000/20000*100).toBe(40);expect(8000/16000*100).toBe(50);
    expect(20000-8000-3000-4000-3000).toBe(2000);
    expect(blogPostMap['is-a-cleaning-business-profitable'].html).toContain('Neither 40% nor 50% here is a survey benchmark');
  });
  it('shows why product gross margin can understate the required break-even ROAS',()=>{
    const margin=(100-40-15-5-3)/100;
    expect(margin).toBe(.37);expect(1/margin).toBeCloseTo(2.7027027);
    expect(2000*margin-1000).toBe(-260);
    const section=freeTools['break-even-roas-calculator'].sections.find(s=>s.id==='be-roas-cost-boundary');
    expect(section.paragraphs.join(' ')).toContain('−$260');
  });
});
