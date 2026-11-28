import {describe, expect, it} from 'vitest';
import {calculateMarketplace, digitalMarketplaceDefaults, marketplaceDefaults} from './marketplaceFeeEngine.js';

const etsy = (changes = {}) => calculateMarketplace('etsy', {...marketplaceDefaults.etsy, ...changes});
const ebay = (changes = {}) => calculateMarketplace('ebay', {...marketplaceDefaults.ebay, ...changes});

describe('US marketplace planning model', () => {
  it('reconciles both published examples and their minimum target prices', () => {
    expect(etsy()).toMatchObject({fees:11.58, profit:12.42, breakEven:23.51, targetPrice:50.08});
    expect(etsy({offsite:0}).profit).toBe(19.17);
    expect(ebay()).toMatchObject({fees:20.55, profit:24.45, breakEven:69.95, targetPrice:100.68});
    expect(ebay({promoted:0}).profit).toBe(29.03);
    expect(etsy({price:50.06}).profit).toBeLessThan(20);
    expect(ebay({price:100.66}).profit).toBeLessThan(25);
  });

  it('caps attributed Etsy ads and excludes sales tax from their fee base', () => {
    expect(etsy({price:1000}).adsImpact).toBe(100);
    expect(etsy({tax:0}).adsImpact).toBe(etsy().adsImpact);
    expect(etsy({tax:0}).lines[2][1]).toBeLessThan(etsy().lines[2][1]);
  });

  it('applies the eBay tier only to the portion above $7,500', () => {
    expect(ebay({price:8000, tax:0, shipping:0}).lines[0][1]).toBe(1031.75);
    expect(ebay({price:8000, tax:0, shipping:0, category:'custom', customRate:10}).lines[0][1]).toBe(800);
  });

  it('finds the low-fee solution even when higher prices lose the goal immediately above the boundary', () => {
    const base = {shipping:0, tax:0, itemCost:0, postage:0, supplies:0, allowance:0, promoted:0, goal:8.33};
    expect(ebay({...base, price:10})).toMatchObject({targetPrice:9.99, profit:8.34});
    expect(ebay({...base, price:10.01}).profit).toBeLessThan(8.33);
    expect(ebay({...base, price:9.50, tax:6}).lines[1][1]).toBe(0.4);
  });

  it('handles empty fields and zero revenue explicitly', () => {
    expect(etsy({price:''}).error).toBeTruthy();
    expect(ebay({price:0, shipping:0}).margin).toBeNull();
  });
});

describe('digital products', () => {
  it('ignores physical fulfillment and keeps Etsy digital fees', () => {
    const digital = {...digitalMarketplaceDefaults.etsy, shipping:45, postage:25, supplies:10};
    expect(calculateMarketplace('etsy', digital)).toMatchObject({
      revenue:12, feeBase:12.96, costs:2.5, fees:1.62, profit:7.88, breakEven:3.27, targetPrice:12.14,
    });
  });

  it('requires eBay digital fees instead of applying the physical schedule', () => {
    const digital = digitalMarketplaceDefaults.ebay;
    expect(calculateMarketplace('ebay', digital).error).toMatch(/verified/);
    const fees = {...digital, price:9, tax:0, customRate:0, digitalOrderFee:0, shipping:50, postage:20};
    expect(calculateMarketplace('ebay', fees)).toMatchObject({
      revenue:9, fees:0, costs:3.5, profit:5.5, breakEven:3.5,
    });
    expect(calculateMarketplace('ebay', {...digital,customRate:5,digitalOrderFee:0.2})).toMatchObject({
      fees:1, profit:10.51, targetPrice:12.36,
    });
  });
});
