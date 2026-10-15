import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { calculate } from './engine';
import { industries } from './industries';
import { restaurantExamples } from './restaurantExamples';
import { RestaurantResultGuide } from './RestaurantPlanning';
import IndustryPage from './IndustryPage';
import { initialCalculatorPlan, stageCalculatorPlan } from './calculatorTransfer';

describe('Restaurant planning boundaries', () => {
  it('funds the monthly requirement in whole orders using complete transferable inputs', () => {
    for (const example of restaurantExamples) {
      expect(Object.keys(example.values).sort()).toEqual(Object.keys(industries.restaurant.values).sort());
      const r = calculate(example.values);
      expect(r.valid).toBe(true);
      expect(r.wholeJobs * r.contribution).toBeGreaterThanOrEqual(r.fixedNeed);
      expect((r.wholeJobs - 1) * r.contribution).toBeLessThan(r.fixedNeed);
      const map = new Map();
      const storage = {getItem: k => map.get(k), setItem: (k,v) => map.set(k,v), removeItem: k => map.delete(k)};
      expect(stageCalculatorPlan('restaurant', example.values, storage, 1000)).toBe(true);
      const restored = initialCalculatorPlan({location:{search:'?industry=restaurant&from=industry'}, sessionStorage:storage}, 2000);
      expect(restored.input).toEqual(example.values);
      expect(map.size).toBe(0);
    }
  });
  it('applies delivery percentage fees once and exposes the productive-hours shortfall', () => {
    const r = calculate(restaurantExamples[2].values);
    expect(r.costs.fees).toBe(8.96);
    expect(r.contribution).toBe(8.54);
    expect(r.fixedNeed).toBe(24000);
    expect(r.wholeJobs).toBe(2811);
    const constrained = calculate({...restaurantExamples[2].values, hoursPerJob: 0.35});
    expect(constrained.wholeJobs).toBeGreaterThan(constrained.wholeCapacity);
    expect(calculate(restaurantExamples[0].values).wholeJobs).toBeLessThanOrEqual(calculate(restaurantExamples[0].values).wholeCapacity);
  });
  it('shows daily pace and cost/capacity limits but hides invalid financial results', () => {
    const input = {...restaurantExamples[2].values, hoursPerJob: 0.35};
    const html = renderToStaticMarkup(<RestaurantResultGuide input={input} result={calculate(input)} />);
    expect(html).toContain('109 orders per open day');
    expect(html).toContain('exceeds worker-hour capacity');
    expect(html).toContain('not carried to the full calculator');
    expect(html).toContain('10% lower price');
    expect(renderToStaticMarkup(<RestaurantResultGuide input={input} result={calculate({...input, price:''})} />)).toBe('');
    const nearFloor = {...input, price:21};
    expect(renderToStaticMarkup(<RestaurantResultGuide input={nearFloor} result={calculate(nearFloor)} />)).toContain('No positive-contribution target');
  });
  it('renders discoverable examples and truthful account options without changing defaults', () => {
    const before = {...industries.restaurant.values};
    const html = renderToStaticMarkup(<IndustryPage slug="restaurant-break-even-calculator" />);
    expect(industries.restaurant.values).toEqual(before);
    for (const label of ['Dine-in', 'Direct takeaway', 'Delivery app', 'Previewing keeps your current inputs', 'up to 3 saved scenarios', 'up to 100 saved scenarios', '$9.99/month', 'Opening pricing does not save']) expect(html).toContain(label);
    expect(html).toContain('id="restaurant-channel-examples"');
    expect(html).toContain('href="/pro-user-guide/#save"');
    expect(html).not.toMatch(/NaN|undefined|Infinity/);
    expect(renderToStaticMarkup(<IndustryPage slug="cleaning-business-break-even-calculator" />)).not.toContain('restaurant-channel-examples');
  });
});
