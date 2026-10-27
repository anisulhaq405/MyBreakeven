import {october25GscDates}from'./testFixtures/october25GscDates.js';
import { describe, expect, it } from 'vitest';
import Decimal from 'decimal.js';
import { calculateFoodPeriod, calculateRecipe, calculateMenuPrice } from './foodCostEngine.js';
import { recipeExample, foodPeriodExample, menuExample } from './foodCalculatorDefaults.js';
import { calculate } from './engine.js';
import { calculateUnitContribution } from './unitContribution.js';
import { demoPlans } from './authorityResources.js';
import { blogPostMap } from './content/blogs/index.js';
import { fourSectionEnrichment } from './content/blogs/fourSectionEnrichment.js';

describe('four section worked decisions', () => {
  it('distinguishes food-usage dollars from percentage points', () => {
    const result = calculateFoodPeriod(foodPeriodExample);
    expect(result).toMatchObject({ valid: true, used: 20000, variance: 1800, variancePoints: 3 });
    expect(result.foodPct).toBeCloseTo(100/3, 10);
  });
  it('preserves the recipe selling unit when moving costs to menu pricing', () => {
    const recipe = calculateRecipe(recipeExample);
    const menu = calculateMenuPrice({ ...menuExample, ingredient: .4, labor: 1.5, packaging: .25, other: 0, price: 4, fee: 3 });
    expect(menu.contribution).toBe(1.73);
    expect(recipe.contribution).toBe(menu.contribution);
  });
  it('includes a cleaning callback and credit once in the completed-job average', () => {
    const total = new Decimal(78.8).times(9).plus(new Decimal(78.8).minus(37).minus(20));
    expect(total.toNumber()).toBe(731);
    expect(total.div(10).toNumber()).toBe(73.1);
    expect(new Decimal(4000).div(total.div(10)).ceil().toNumber()).toBe(55);
    expect(new Decimal(4000).div(78.8).ceil().toNumber()).toBe(51);
  });
  it('rounds the bid upward so the extra fee still leaves the specified margin', () => {
    const price = new Decimal(4860).div(.77).times(100).ceil().div(100);
    expect(price.toNumber()).toBe(6311.69);
    expect(price.times(.97).minus(4860).div(price).toNumber()).toBeGreaterThanOrEqual(.2);
    expect(price.minus(.01).times(.97).minus(4860).div(price.minus(.01)).toNumber()).toBeLessThan(.2);
    expect(new Decimal(6075).times(.97).minus(4860).div(6075).toNumber()).toBe(.17);
  });
  it('keeps advertising out of the pre-ad margin and includes it once in the store plan', () => {
    const beforeAds = calculateUnitContribution({ price: 50, variableCost: 28, feePct: 3, fixedFee: 0 });
    expect(beforeAds).toMatchObject({ contribution: 20.5, ratio: 41 });
    const store = calculate({ ...demoPlans.cleaning, price: 50, materialCost: 20, laborCost: 0, otherVariableCost: 8, acquisitionCost: 8, paymentFeePct: 3, fixedCosts: 2500, ownerPay: 0 });
    expect(store.contribution).toBe(12.5);
    expect(store.wholeJobs).toBe(200);
  });
  it('does not interpret the agency client target as deliverable capacity', () => {
    expect(calculate(demoPlans.agency)).toMatchObject({ contribution: 1140, wholeJobs: 5, wholeCapacity: 4 });
    expect(4 * 1140 - 5000).toBe(-440);
  });
});

it('keeps existing publication history and old scenarios for the eight enriched guides', () => {
  for (const slug of Object.keys(fourSectionEnrichment)) {
    const post = blogPostMap[slug];
    expect(post.published < '2026-10-14').toBe(true);
    expect(post.modified).toBe(post.slug==='restaurant-food-cost-percentage'?'2026-10-27':october25GscDates.has(post.slug)?'2026-10-25':(['agency-client-profitability','restaurant-menu-pricing-formula','restaurant-food-cost-percentage'].includes(slug)?'2026-10-22':['cleaning-business-monthly-expenses','agency-profit-margin'].includes(slug) ? '2026-10-17' : '2026-10-14'));
    const ids = [...post.html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  }
  expect(blogPostMap['commercial-cleaning-contract-bid'].html).toContain('$6,075');
  expect(blogPostMap['agency-client-profitability'].html).toContain('$6,000');
});
