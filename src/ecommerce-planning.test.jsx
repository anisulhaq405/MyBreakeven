import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { calculate } from './engine';
import { ecommerceExamples } from './ecommerceExamples';
import { EcommerceResultGuide } from './EcommercePlanning';
import IndustryPage from './IndustryPage';
import { industries } from './industries';
import { initialCalculatorPlan, stageCalculatorPlan } from './calculatorTransfer';
import { createCalculatorResultTracker, trackProductEvent } from './productAnalytics';

describe('Product-specific ecommerce planning', () => {
  it('uses complete example inputs without changing the protected default model', () => {
    const before = { ...industries.ecommerce.values };
    for (const example of ecommerceExamples) {
      expect(Object.keys(example.values).sort()).toEqual(Object.keys(before).sort());
      const result = calculate(example.values);
      expect(result.valid).toBe(true);
      expect(result.scenarios).toHaveLength(3);
      expect(example.values.ownerPay).toBeGreaterThan(0);
    }
    expect(calculate(ecommerceExamples[0].values).contribution).toBe(40.96);
    expect(calculate(ecommerceExamples[1].values).wholeJobs).toBeGreaterThan(calculate(ecommerceExamples[1].values).wholeCapacity);
    expect(industries.ecommerce.values).toEqual(before);
  });
  it('serves the examples, complete assumptions, live interpretation and truthful Free/Pro route in static HTML', () => {
    const html = renderToStaticMarkup(<IndustryPage slug="ecommerce-break-even-calculator" />);
    for (const example of ecommerceExamples) expect(html).toContain(example.title.replaceAll('&', '&amp;'));
    expect(html).toContain('See all example assumptions');
    expect(html).toContain('What your order target means');
    expect(html).toContain('Contribution remaining');
    expect(html).toContain('10% lower price');
    expect(html).toContain('10% higher price');
    expect(html).toContain('$9.99/month');
    expect(html).toContain('up to 3 saved scenarios');
    expect(html).toContain('up to 100 saved scenarios');
    expect(html).toContain('href="/pricing/"');
    expect(html).toContain('Opening pricing does not save your current inputs');
    expect(html).not.toMatch(/NaN|undefined|Infinity/);
    expect(renderToStaticMarkup(<IndustryPage slug="restaurant-break-even-calculator" />)).not.toContain('Start with a product like yours');
  });
  it('hides result interpretation for invalid inputs and exposes a shortfall and nonviable price case', () => {
    const input = ecommerceExamples[1].values;
    expect(renderToStaticMarkup(<EcommerceResultGuide input={input} result={calculate({ ...input, price: '' })} />)).toBe('');
    const html = renderToStaticMarkup(<EcommerceResultGuide input={input} result={calculate(input)} />);
    expect(html).toContain('The order target exceeds your productive hours');
    const nearFloor = { ...input, price: 16 };
    expect(renderToStaticMarkup(<EcommerceResultGuide input={nearFloor} result={calculate(nearFloor)} />)).toContain('No supported positive-contribution target');
  });
  it('carries the loaded product scenario to the existing full calculator without putting financial values in the URL', () => {
    const map = new Map();
    const storage = { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) };
    const input = { ...ecommerceExamples[0].values, price: '72' };
    expect(stageCalculatorPlan('ecommerce', input, storage, 1000)).toBe(true);
    const restored = initialCalculatorPlan({ location: { search: '?industry=ecommerce&from=industry' }, sessionStorage: storage }, 2000);
    expect(restored.input).toEqual(input);
    expect(restored.transferred).toBe(true);
    expect(map.size).toBe(0);
  });
});

describe('Ecommerce funnel events', () => {
  it('deduplicates accepted edited-result events and retries after missing consent', () => {
    const track = vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
    const record = createCalculatorResultTracker(track);
    expect(record('ecommerce')).toBe(false);
    expect(record('ecommerce')).toBe(true);
    expect(record('ecommerce')).toBe(false);
    expect(track.mock.calls).toEqual([['calculator_result_ready', 'ecommerce'], ['calculator_result_ready', 'ecommerce']]);
  });
  it('retains consent and strips arbitrary financial or identity payloads for every new event', () => {
    const browser = { localStorage: { getItem: vi.fn().mockReturnValue('rejected') }, gtag: vi.fn() };
    for (const name of ['calculator_result_ready', 'calculator_example_load', 'pro_pricing_click']) {
      expect(trackProductEvent(name, 'ecommerce', browser)).toBe(false);
      browser.localStorage.getItem.mockReturnValue('accepted');
      expect(trackProductEvent(name, { price: 72, email: 'private@example.com' }, browser)).toBe(true);
      expect(browser.gtag).toHaveBeenLastCalledWith('event', name, {});
      browser.localStorage.getItem.mockReturnValue('rejected');
    }
  });
});
