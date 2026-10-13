import { describe, expect, it } from 'vitest';
import { calculateUnitContribution } from './unitContribution.js';
import { calculate } from './engine.js';
import { blogPostMap, blogPosts } from './content/blogs/index.js';
const example = { price: '50', variableCost: '25', feePct: '3', fixedFee: '0.30' };

describe('per-unit contribution decisions', () => {
  it('reconciles both fee types with independently checked amounts', () => {
    expect(calculateUnitContribution(example)).toMatchObject({ valid: true, percentageFee: 1.5, totalVariableCost: 26.8, contribution: 23.2, ratio: 46.4, state: 'positive' });
  });
  it('retains a usable zero-contribution result', () => {
    expect(calculateUnitContribution({ ...example, price: 25, feePct: 0, fixedFee: 0 })).toMatchObject({ valid: true, contribution: 0, ratio: 0, state: 'zero' });
  });
  it('shows negative contribution without a fictional break-even result', () => {
    const result = calculateUnitContribution({ ...example, price: 20, feePct: 0, fixedFee: 0 });
    expect(result).toMatchObject({ valid: true, contribution: -5, ratio: -25, state: 'negative' });
    expect(result).not.toHaveProperty('breakEvenUnits');
  });
  it('keeps decimal inputs unrounded', () => {
    expect(calculateUnitContribution({ price: '.30', variableCost: '.10', feePct: 0, fixedFee: '.10' }).contribution).toBe(.1);
  });
  it.each([0, '', null, -1, 'NaN', 'Infinity', '1e100', '1e-1000'])('rejects undefined or unsupported price %s', price => {
    expect(calculateUnitContribution({ ...example, price }).valid).toBe(false);
  });
  it('rejects missing costs and fees outside the supported range', () => {
    for (const extra of [{ variableCost: '' }, { fixedFee: -1 }, { feePct: 101 }, { fixedFee: 'Infinity' }]) expect(calculateUnitContribution({ ...example, ...extra }).valid).toBe(false);
  });
  it('matches the full planner when the transaction fee is entered once', () => {
    const full = calculate({ price: 50, materialCost: 25, laborCost: 0, otherVariableCost: .3, acquisitionCost: 0, paymentFeePct: 3, fixedCosts: 1000, ownerPay: 0, targetProfit: 0, workers: 1, hoursPerWorker: 40, hoursPerJob: 1, utilizationPct: 100, conversionPct: 25 });
    expect(full.contribution).toBe(calculateUnitContribution(example).contribution);
    expect(full.marginPct).toBe(46.4);
  });
});
describe('one existing contribution topic owner', () => {
  it('retains publication history and the detailed mixed-product examples', () => {
    const post = blogPostMap['calculate-contribution-margin'];
    expect(post.published).toBe('2026-09-23');
    expect(post.html).toContain('45.91%');
    expect(post.html).toContain('contribution-cost-boundaries');
    expect(post.html).toContain('$23.20');
    expect(blogPosts.filter(p => p.slug === post.slug)).toHaveLength(1);
    expect(post.metaDescription.length).toBeLessThanOrEqual(160);
  });
});
