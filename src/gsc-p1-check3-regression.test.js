import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
const p1=[
 ['target-profit-sales-formula','target profit'],
 ['contribution-margin-vs-profit-margin','contribution margin'],
 ['margin-of-safety-business','margin of safety']
];
describe('GSC P1 content ownership and non-regression',()=>{
 it.each(p1)('keeps existing URL and substantive dedicated content for %s',(slug,topic)=>{
  const post=blogPostMap[slug];
  expect(post).toBeDefined();
  const text=JSON.stringify(post).toLowerCase();
  expect(text).toContain(topic);
  expect(text.length).toBeGreaterThan(2500);
 });
 it('preserves three separate intent owners without collisions',()=>{
  expect(new Set(p1.map(([slug])=>slug)).size).toBe(3);
  expect(blogPostMap['contribution-margin-vs-gross-margin']).toBeDefined();
  expect(blogPostMap['calculate-contribution-margin']).toBeDefined();
 });
});
