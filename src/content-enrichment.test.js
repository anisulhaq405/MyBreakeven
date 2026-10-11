import { describe, it, expect } from 'vitest';
import { calculate } from './engine.js';
import { walkthroughInputs, calculatorWalkthrough } from './content/blogs/october12Enrichment.js';

describe('captured calculator walkthroughs',()=>{
 it('preserves the cleaning screenshot target and distinguishes capacity from demand',()=>{
  const i=walkthroughInputs.cleaning,r=calculate(i);
  expect(r.contribution).toBe(76.78);
  expect(r.wholeJobs).toBe(114);expect(r.wholeCapacity).toBe(97);expect(r.practicalLeads).toBe(380);
  expect(113*r.contribution).toBeLessThan(8700);expect(114*r.contribution).toBeGreaterThanOrEqual(8700);
  const html=calculatorWalkthrough('cleaning');expect(html).toContain('17-job gap');expect(html).not.toMatch(/NaN|undefined/);
 });
 it('retains ecommerce precision before whole-order rounding',()=>{
  const i=walkthroughInputs.ecommerce,r=calculate(i);
  expect(r.contribution).toBe(25.248);expect(r.wholeJobs).toBe(587);expect(r.practicalRevenue).toBe(50482);
  expect(r.wholeCapacity).toBe(1267);expect(r.practicalLeads).toBe(20965);
  expect(586*r.contribution).toBeLessThan(14800);expect(587*r.contribution).toBeGreaterThanOrEqual(14800);
  const html=calculatorWalkthrough('ecommerce');expect(html).toContain('$25.248');expect(html).not.toMatch(/NaN|undefined/);
 });
});
