import React from 'react';
import {it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts,beforeBatch2BlogPosts,blogPostMap} from './content/blogs/index.js';
import {batch2ReviewedSlugs,restoreExistingBatch2} from './content/blogs/existingBatch2November24.js';
import {calculateUnitContribution,calculateContributionQuantity} from './unitContribution.js';
import {articleFaq} from './articleFaq.js';
import LongformArticle from './LongformArticle.jsx';
it('updates exactly four existing owners, keeping all others and preserving assets, engines, publication and previous anchors',()=>{
 expect(blogPosts).toHaveLength(242);
 for(const [i,p]of blogPosts.entries()){
  const old=beforeBatch2BlogPosts[i];
  if(!batch2ReviewedSlugs.has(p.slug)){expect(p).toBe(old);continue;}
  expect(restoreExistingBatch2(p)).toBe(old);
  for(const k of ['slug','title','published','image','alt','calculatorSlug','tag','cluster'])expect(p[k]).toEqual(old[k]);
  expect(p.modified).toBe('2026-11-24');
  const h=renderToStaticMarkup(<LongformArticle article={p}/>),ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  expect((h.match(/<h1\b/g)||[]).length).toBe(1);expect(new Set(ids).size).toBe(ids.length);
  for(const m of (old.html+(old.answerHtml||'')).matchAll(/\bid="([^"]+)"/g))expect(ids,p.slug).toContain(m[1]);
  for(const m of h.matchAll(/href="#([^"]+)"/g))expect(ids,p.slug+' '+m[1]).toContain(m[1]);
  for(const m of old.html.matchAll(/<table\b[\s\S]*?<\/table>/g))expect(p.html+p.answerHtml).toContain(m[0]);
  expect(h.indexOf('id="quick-answer"')).toBeLessThan(h.indexOf('article-featured'));
 }
});
it('reconciles photography new purchase cash without changing the monthly operating target',()=>{
 expect(1800+1200+700+600+250+1400+300+300).toBe(6550);expect(1800+1200+700+1400).toBe(5100);expect(6550-5100).toBe(1450);expect(895*2).toBe(1790);expect(6550+1790).toBe(8340);expect(1450+1790).toBe(3240);
 expect(Math.ceil((645+250+3000+1000)/(650-65))).toBe(9);
 const p=blogPostMap['how-much-does-it-cost-to-start-a-photography-business'];
 const q='Does break-even include my photography gear?';expect(p.faq.find(f=>f.q===q).a).toBe(articleFaq(p).items.find(f=>f.q===q).a);
});
it('reconciles detailing setup subtotals, debt-inclusive targets and whole completed jobs',()=>{
 expect(1650+900+700+550+700).toBe(4500);expect(4500+8500).toBe(13000);expect(6000+2700+3500+1700+800+1200).toBe(15900);expect(22000+7000+2500+1500+2000+1000).toBe(36000);
 expect([Math.ceil(4000/153),Math.ceil(7290/225),Math.ceil(12550/270)]).toEqual([27,33,47]);expect(26400+2000).toBe(28400);
 expect(blogPostMap['mobile-detailing-business-startup-cost'].answerHtml).toContain('not accounting operating break-even');
});
it('uses the same denominator consistently for break-even units, sales and target-profit sales',()=>{
 const c=50-30,ratio=c/50;expect(12000/c).toBe(600);expect(12000/ratio).toBe(30000);expect(14000/c).toBe(700);
 const p=blogPostMap['break-even-formula-units-dollars'];expect(p.answerHtml).toContain('0.40');expect(p.html).toContain('This page is the formula reference');
});
it('checks summary unit, ratio and quantity against the unchanged contribution engine',()=>{
 const x={price:'50',variableCost:'25',feePct:'3',fixedFee:'0.30'};
 expect(calculateUnitContribution(x)).toMatchObject({valid:true,contribution:23.2,totalVariableCost:26.8,ratio:46.4});expect(calculateContributionQuantity(x,'100')).toMatchObject({sales:5000,variableCost:2680,contribution:2320});
 expect(blogPostMap['calculate-contribution-margin'].answerHtml).toContain('$2,320');
});
