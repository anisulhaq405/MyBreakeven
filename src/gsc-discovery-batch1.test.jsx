import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {freeTools} from './freeTools.js';
import {guideTopic} from './novemberTopics.js';
import DiscoveryNextStep,{discoveryNextSteps,discoveryNextStep} from './DiscoveryNextStep.jsx';
import LongformArticle from './LongformArticle.jsx';
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('scoped download indexing and existing-page discovery',()=>{
 it('preserves every normalized article and tool, including dates, assets, formulas and original examples',()=>{
  const before=JSON.parse(readFileSync('docs/gsc-batch1-20261127/baseline.json','utf8'));
  expect(blogPosts).toHaveLength(Object.keys(before.articles).length);
  for(const p of blogPosts)expect(hash(p),p.slug).toBe(before.articles[p.slug]);
  for(const [slug,digest] of Object.entries(before.tools)) expect(hash(freeTools[slug]),slug).toBe(digest);
  expect(Object.keys(freeTools).filter(slug=>!Object.hasOwn(before.tools,slug)).sort()).toEqual(['business-depreciation-calculator','ebay-fee-calculator','etsy-fee-calculator','paypal-fee-calculator']);
 });
 it('renders existing, uniquely owned contextual destinations in normal server HTML',()=>{
  expect(Object.keys(discoveryNextSteps)).toHaveLength(6);
  for(const [source,step]of Object.entries(discoveryNextSteps)){
   const p=blogPostMap[source],target=blogPostMap[step.target];expect(p).toBeTruthy();expect(target).toBeTruthy();expect(guideTopic(source)).toBeTruthy();expect(guideTopic(step.target)).toBeTruthy();
   const h=renderToStaticMarkup(<LongformArticle article={p}/>),section=renderToStaticMarkup(<DiscoveryNextStep article={p}/>);
   expect(h).toContain(section);expect(section).toContain(`href="/blogs/${step.target}/"`);expect(section).toContain(step.label);
   expect(discoveryNextStep(p)).toBe(step);expect((h.match(/<h1\b/g)||[])).toHaveLength(1);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
  }
 });
 it('does not add another path when the original body already has the destination',()=>{
  const p=blogPostMap['fixed-vs-variable-costs'];
  for(const href of ['/blogs/activity-based-costing/','https://mybreakeven.com/blogs/activity-based-costing/'])expect(renderToStaticMarkup(<DiscoveryNextStep article={{...p,html:p.html+`<a href="${href}">Existing path</a>`}}/>)).toBe('');
  expect(renderToStaticMarkup(<DiscoveryNextStep article={blogPostMap['how-to-analyze-financial-statements']}/>)).toBe('');
 });
 it('limits the response-header policy to download exports, leaving HTML, PDF, images and media untouched',()=>{
  const rule=readFileSync('public/downloads/.htaccess','utf8');
  expect(rule).toContain('Header always set X-Robots-Tag "noindex"');
  const pattern=rule.match(/<FilesMatch "\(\?i\)([^"]+)"/)[1],match=new RegExp(pattern,'i');
  for(const name of ['report.xlsx','plan.docx','scenarios.csv','PLAN.XLSX'])expect(match.test(name)).toBe(true);
  for(const name of ['worksheet.html','guide.pdf','cover.webp','video.mp4','export.csv.html'])expect(match.test(name)).toBe(false);
  expect(readFileSync('public/robots.txt','utf8')).not.toContain('Disallow: /downloads');
  expect(readFileSync('public/.htaccess','utf8')).not.toContain('X-Robots-Tag');
 });
});
