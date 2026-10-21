import { expect, it } from 'vitest';
import Decimal from 'decimal.js';
import { calculateDecisionTool } from './decisionToolEngine.js';
import { decisionTools } from './decisionTools.js';
import { calculateUnitContribution } from './unitContribution.js';
import { calculate } from './engine.js';
import { demoPlans } from './authorityResources.js';
import { blogPostMap } from './content/blogs/index.js';
import { remainingSectionEnrichment } from './content/blogs/remainingSectionEnrichment.js';
const defaults = mode => Object.values(decisionTools).find(t => t.mode === mode).defaults;

it('caps additional salon visits by attendance and available slots', () => {
  const r = calculateDecisionTool(defaults('rebooking'), 'rebooking');
  expect(r.main).toBe(1315);
  expect(r.metrics.slice(0,3).map(row => row[1])).toEqual([40,32,25]);
  expect(calculateDecisionTool({...defaults('rebooking'),capacity:0},'rebooking').main).toBe(0);
});
it('charges the two additional photography editing hours once', () => {
  const base = calculateUnitContribution({price:650,variableCost:340,feePct:3,fixedFee:0});
  const extra = calculateUnitContribution({price:650,variableCost:400,feePct:3,fixedFee:0});
  expect(base.contribution).toBe(290.5);expect(extra.contribution).toBe(230.5);
  expect(base.contribution-extra.contribution).toBe(60);expect(extra.contribution/10).toBe(23.05);
});
it('uses full occupied time rather than ticket revenue to compare detailing jobs', () => {
  const r = calculateDecisionTool(defaults('travelProfit'),'travelProfit');
  expect(r.metrics[2][1]).toBe(159.4);expect(r.metrics[3][1]).toBe(138.6);
  expect(r.metrics[0][1]).toBeCloseTo(49.046153846,8);
  expect(r.metrics[1][1]).toBeCloseTo(53.651612903,8);
  expect(-r.main).toBeCloseTo(4.605459057,8);
});
it('distinguishes annual whole jobs, rounded monthly targets and seasonal capacity', () => {
  const r = calculate({...demoPlans.cleaning,price:120,materialCost:60,laborCost:0,otherVariableCost:0,acquisitionCost:0,paymentFeePct:3,fixedCosts:3000,ownerPay:0,hoursPerJob:2.08});
  expect(r.contribution).toBe(56.4);expect(r.wholeJobs).toBe(54);expect(r.wholeCapacity).toBe(50);
  expect(new Decimal(24000).div(56.4).ceil().toNumber()).toBe(426);
  expect(new Decimal(400).times(56.4).minus(24000).toNumber()).toBe(-1440);
});
it('preserves publication history and unique anchors in all eight enriched guides', () => {
  for(const slug of Object.keys(remainingSectionEnrichment)){
    const p=blogPostMap[slug];expect(p.published<'2026-10-14').toBe(true);expect(p.modified).toBe(slug==='landscaping-job-costing-estimate-vs-actual'?'2026-10-22':'2026-10-14');
    const ids=[...p.html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
  }
});
