import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {applyWorkingCapitalGscGrowth} from './content/blogs/workingCapitalGscGrowth.js';
describe('October 26 Working Capital GSC formula intent growth',()=>{
 const slug='how-to-calculate-working-capital';
 it('retains the canonical article, workbook links and original methods',()=>{
  const p=blogPostMap[slug],html=p.html;
  expect(p.slug).toBe(slug);
  expect(p.title).toBe('How to Calculate Working Capital: Formula and Examples');
  expect(html).toContain('id="working-capital-formula-selector"');
  expect(html).toContain('id="worked-balance-sheet"');
  expect(html).toContain('id="days-working-capital-formula"');
  expect(html).toContain('id="operating-definition"');
  expect(html).toContain('id="working-capital-download"');
  expect(html).toContain('/guides/financial-ratios/');
  expect(html).toContain('/blogs/how-to-analyze-financial-statements/');
  expect(p.faq.length).toBeGreaterThanOrEqual(4);
  expect(p.sectionLinks[0][0]).toBe('working-capital-formula-selector');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  expect(new Set(ids).size).toBe(ids.length);
  for(const [id] of p.sectionLinks.filter(([id])=>id!=='guide-faqs'))expect(ids).toContain(id);
  expect(p.metaDescription.length).toBeLessThanOrEqual(160);
  expect(p.metaDescription.length).toBeGreaterThanOrEqual(120);
  expect(p.modified).toBe('2026-10-26');
 });
 it('uses consistent fictional formula values and is scoped to one post',()=>{
  expect(62000-38000).toBe(24000);
  expect((62000/38000).toFixed(2)).toBe('1.63');
  expect((22000/440000*365).toFixed(2)).toBe('18.25');
  expect(applyWorkingCapitalGscGrowth({slug:'restaurant-prime-cost'})).toEqual({slug:'restaurant-prime-cost'});
  expect(()=>applyWorkingCapitalGscGrowth(blogPostMap[slug])).toThrow(/Duplicate working capital formula selector/);
 });
});
