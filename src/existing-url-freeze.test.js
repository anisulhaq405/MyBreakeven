import {describe,it,expect} from 'vitest';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {applyCleaningProfitabilityGscRecovery} from './content/blogs/cleaningProfitabilityGscRecovery.js';

describe('Existing URLs only: GSC recovery and 15-day content freeze',()=>{
 it('holds baseline article count and preserves primary search ownership',()=>{
  expect(blogPosts).toHaveLength(161);
  for(const slug of ['is-a-cleaning-business-profitable','restaurant-budgeting','how-to-calculate-working-capital','margin-of-safety-business']){
   expect(blogPostMap[slug]).toBeDefined();
  }
 });
 it('adds a direct profitability answer once, without replacing worked economics',()=>{
  const post=blogPostMap['is-a-cleaning-business-profitable'];
  expect(post.html).toContain('id="cleaning-profitability-direct-answer"');
  expect(post.html).toContain('$160');
  expect(post.html).toContain('$63.20');
  expect(post.html).toContain('95');
  expect(post.html).toContain('/calculators/cleaning-business-break-even-calculator/');
  expect(post.modified).toBe('2026-10-26');
  expect([...post.html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]).filter(x=>x==='cleaning-profitability-direct-answer')).toHaveLength(1);
  expect(()=>applyCleaningProfitabilityGscRecovery(post)).toThrow(/already inserted/);
 });
});
