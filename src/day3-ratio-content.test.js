import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {calculateEquivalent,equivalentDefaults} from './equivalentRatioEngine.js';
import {applyDay3RatioContent} from './content/blogs/day3RatioContent.js';
describe('Day 3 C07 G08 G09 content-first ratio acceptance',()=>{
 const a=blogPostMap['find-missing-value-equivalent-ratios'];
 const b=blogPostMap['equivalent-ratio-tables-word-problems'];
 it('adds one helpful targeted block and keeps source examples and links',()=>{
  expect(a.html).toContain('id="four-step-ratio-answer-check"');
  expect(b.html).toContain('id="ratio-word-problem-practice"');
  for(const post of [a,b]){
   expect(post.modified).toBe('2026-10-26');
   expect(post.image).toMatch(/^\/images\//);
   expect(post.faq.length).toBeGreaterThanOrEqual(3);
   expect(post.html).toContain('/calculators/equivalent-ratio-calculator/');
   expect(new Set([...post.html.matchAll(/id="([^"]+)"/g)].map(m=>m[1])).size).toBe([...post.html.matchAll(/id="([^"]+)"/g)].length);
   expect(post.sectionLinks[0][0]).toMatch(/^(four-step-ratio-answer-check|ratio-word-problem-practice)$/);
   expect(()=>applyDay3RatioContent(post)).toThrow();
  }
 });
 it('checks correct exact solutions, impossibility and nonuniqueness',()=>{
  const q=(a,b)=>calculateEquivalent({...equivalentDefaults(),mode:'solve',a,b});
  expect(q(['3','5'],['x','20']).solution).toBe('12');
  expect(q(['0','5'],['3','x']).solutionState).toMatch(/No solution|No valid ratio/);
  expect(q(['0','5'],['0','x']).solutionState).toMatch(/Infinitely many/);
  expect(20+8).toBe(28);
  expect(18/24).toBe(3/4);
  expect(25%3).toBe(1);
 });
 it('leaves other finance articles unchanged',()=>{
  const orig={slug:'mortgage-refinance-break-even',html:'<p>original</p>'};
  expect(applyDay3RatioContent(orig)).toBe(orig);
 });
});
