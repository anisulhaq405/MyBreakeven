import {describe,it,expect} from 'vitest';
import {blogPostMap,blogPosts} from './content/blogs/index.js';
import {applyCoreBreakEvenIntentReview} from './content/blogs/coreBreakEvenIntentReview.js';
describe('Core break-even search intent protection',()=>{
 it('keeps existing URLs and article inventory unchanged',()=>{
  expect(blogPosts).toHaveLength(161);
  expect(blogPostMap['break-even-formula-units-dollars']).toBeDefined();
  expect(blogPostMap['calculate-break-even-point']).toBeDefined();
 });
 it('provides distinct intent-specific guides without duplicating content',()=>{
  const formula=blogPostMap['break-even-formula-units-dollars'];
  const steps=blogPostMap['calculate-break-even-point'];
  expect(formula.html).toContain('break-even-formula-quick-reference');
  expect(steps.html).toContain('break-even-point-step-by-step');
  expect(formula.html).toContain('fixed costs ÷');
  expect(steps.html).toContain('300 sales');
  expect(formula.html).toContain('/blogs/calculate-break-even-point/');
  expect(steps.html).toContain('/blogs/break-even-formula-units-dollars/');
  expect(formula.html).not.toContain('id="break-even-point-step-by-step"');
 });
 it('is idempotent and leaves other articles unchanged',()=>{
  const formula=blogPostMap['break-even-formula-units-dollars'];
  expect(applyCoreBreakEvenIntentReview(formula)).toBe(formula);
  const other=blogPostMap['fixed-vs-variable-costs'];
  expect(applyCoreBreakEvenIntentReview(other)).toBe(other);
 });
});