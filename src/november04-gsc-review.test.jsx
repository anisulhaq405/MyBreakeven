import {november10RecoverySlugs} from './content/blogs/november10PositionRecovery.js';
import {day5ExistingSlugs} from './content/blogs/twelveDayDay5Review.js';
import {authenticityReviewSlugs} from './content/blogs/authenticityReview20261108.js';
import {day4ExistingSlugs} from './content/blogs/twelveDayDay4Review.js';
import {day3ExistingSlugs} from './content/blogs/twelveDayDay3Review.js';
import {day2ExistingSlugs,twelveDayDay2Posts} from './content/blogs/twelveDayDay2Release.js';
import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {november04GscSlugs,applyNovember04GscReview} from './content/blogs/november04GscReview.js';
import {articleFaq} from './articleFaq.js';
import LongformArticle from './LongformArticle.jsx';
const baseline=JSON.parse(readFileSync('src/testFixtures/november04GscBefore.json','utf8'));
describe('November 4 explicitly authorized two-page GSC improvement',()=>{
 it('changes only the two requested articles, preserving all publication dates and images',()=>{
  expect(blogPosts).toHaveLength(baseline.length+twelveDayDay2Posts.length+26);
  for(const old of baseline){const now=blogPostMap[old.slug];expect(now.published,old.slug).toBe(old.published);expect(now.image,old.slug).toBe(old.image);if(november10RecoverySlugs.has(old.slug)||day5ExistingSlugs.has(old.slug)||authenticityReviewSlugs.has(old.slug)||day4ExistingSlugs.has(old.slug)||day3ExistingSlugs.has(old.slug)||day2ExistingSlugs.has(old.slug))continue; if(!november04GscSlugs.has(old.slug))expect(createHash('sha256').update(JSON.stringify(now)).digest('hex'),old.slug).toBe(old.sha256);else{expect(now.modified).toBe(november10RecoverySlugs.has(now.slug) ? "2026-11-10" : '2026-11-04');expect(applyNovember04GscReview(now)).toBe(now);}}
 });
 it('preserves working-capital definitions, downloads and original anchor targets',()=>{
  const p=blogPostMap['how-to-calculate-working-capital'];
  expect(p.html.startsWith('<section aria-labelledby="working-capital-formula-selector">')).toBe(true);
  expect(p.html).toContain('id="quick-answer"');expect(p.html).toContain('$13,600');expect(p.html).toContain('not an automatic accounting entry');expect(p.html).toContain('/downloads/working-capital-worksheet.xlsx');expect(p.html).toContain('/blogs/accounts-receivable-vs-accounts-payable/');
  expect(p.html.match(/Which working capital formula do you need/g)).toBeNull();
  expect(62000-4400-6000-38000).toBe(13600);expect(62000-38000).toBe(24000);
 });
 it('reconciles cost formulas and the cost-indifference point, without corrupting FAQ answers',()=>{
  const p=blogPostMap['fixed-vs-variable-costs'];expect(p.html).toContain('id="total-fixed-variable-formulas"');expect(p.html).toContain('cost-indifference point');expect(p.html).toContain('<img style="max-width:100%;height:auto" src="/images/blog/day4-cost-curves.svg"');
  expect(9680-81*80).toBe(3200);expect(9680/80).toBe(121);const units=(4800-1200)/(50-20);expect(units).toBe(120);expect(4800+20*units).toBe(1200+50*units);
  expect(articleFaq(p).inline).toBe(false);expect(articleFaq(p).items).toHaveLength(7);expect(articleFaq(p).items.find(f=>f.q.startsWith('Are payment')).a).not.toContain('For another angle');
 });
 it('renders unique anchors, real internal destinations, concise metadata and matching FAQs',()=>{
  for(const slug of november04GscSlugs){const p=blogPostMap[slug],html=renderToStaticMarkup(<LongformArticle article={p}/>);expect((html.match(/<h1\b/g)||[])).toHaveLength(1);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);for(const[id]of p.sectionLinks)expect(ids,id).toContain(id);for(const[,s]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[s],s).toBeDefined();expect((p.seoTitle+' | MyBreakeven').length).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeLessThanOrEqual(160);}
 });
});
