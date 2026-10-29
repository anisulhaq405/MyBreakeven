import {describe,it,expect} from 'vitest';
import {freeTools} from './freeTools.js';
describe('Business equivalent ratio guide ownership',()=>{
 const tool=freeTools['equivalent-ratio-calculator'];
 it('replaces obsolete classroom examples with business scenarios',()=>{
  const text=JSON.stringify(tool.sections);
  for(const term of ['cost efficiency','debt-to-equity','labor','revenue mix','percentage points'])expect(text.toLowerCase()).toContain(term);
  for(const obsolete of ['notebooks:pens','flour:sugar','Original exact-arithmetic examples'])expect(text).not.toContain(obsolete);
 });
 it('keeps business metadata and sufficient FAQs',()=>{
  expect(tool.title).toContain('Business');
  expect(tool.description.length).toBeLessThanOrEqual(160);
  expect(tool.faq.length).toBeGreaterThanOrEqual(7);
  expect(tool.sections).toHaveLength(5);
 });
});