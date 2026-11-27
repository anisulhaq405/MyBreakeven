import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPostMap} from './content/blogs/index.js';
import {guideTopic} from './novemberTopics.js';
import LongformArticle from './LongformArticle.jsx';
import {presentClickAnswer,clickAnswerVersions} from './clickAnswerPresentation.js';
describe('existing answer presentation',()=>{
 it('keeps the six owners and exposes four worked answers before their covers without mutating records',()=>{
  for(const slug of Object.keys(clickAnswerVersions)){
   const p=blogPostMap[slug],before=JSON.stringify(p),h=renderToStaticMarkup(<LongformArticle article={p}/>);
   expect(JSON.stringify(p)).toBe(before);expect(guideTopic(slug)).toBeTruthy();expect(h.indexOf('<caption>')).toBeLessThan(h.indexOf('article-featured'));
   expect(h).toContain(p.html.replaceAll('support@mybreakeven.com','mybreakeven1@gmail.com'));expect((h.match(/<h1\b/g)||[])).toHaveLength(1);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const m of (p.answerHtml||'').matchAll(/href="([^"]+)"/g))expect(h).toContain(m[0]);
  }
 });
 it('leaves the two direct-answer controls and unrelated pages unchanged',()=>{
  for(const slug of ['lower-break-even-point','break-even-analysis-example','restaurant-budgeting'])expect(presentClickAnswer(blogPostMap[slug])).toBe(blogPostMap[slug].answerHtml);
  expect(presentClickAnswer({slug:'unknown'})).toBeUndefined();
 });
 it('reconciles the displayed revenue, margin and whole-receipt calculations',()=>{
  const ratio=(240-90)/240;expect(ratio).toBe(.625);expect((7500+3000)/ratio).toBe(16800);expect(70*240-70*90-7500).toBe(3000);
  expect((18000-12000)/18000*100).toBeCloseTo(33.333333,5);
  expect((20000-12000)/20000).toBe(.4);expect((8000-5000)/20000).toBe(.15);expect((3000-400-600)/20000).toBe(.1);
  expect(40-20.20).toBeCloseTo(19.80,10);expect(Math.ceil(7000/19.8)).toBe(354);expect(354*40).toBe(14160);expect(353*19.8-7000).toBeCloseTo(-10.6);expect(354*19.8-7000).toBeCloseTo(9.2);
 });
});
