import {october25GscDates}from'./testFixtures/october25GscDates.js';
import SecondaryPage from './Pages';
import { POLAR_CHECKOUT_URL } from './billing';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { readAnalyticsChoice, saveAnalyticsChoice } from './analyticsChoice';
import { trackProductEvent, createCalculatorResultTracker } from './productAnalytics';
import { calculatorDirectory, matchesCalculatorSearch } from './calculatorDirectory';
import { FreeToolsHub } from './FreeTools';
import { industryPages } from './industryCalculatorContent';
import { freeTools } from './freeTools';
import { blogPostMap } from './content/blogs/index';
import LongformArticle from './LongformArticle';

describe('Storage-independent explicit analytics choice', () => {
  it('defaults to no consent for denied storage and invalid saved values', () => {
    expect(readAnalyticsChoice({get localStorage(){throw Error('SecurityError')}})).toBe(null);
    expect(readAnalyticsChoice({localStorage:{getItem:()=> 'unexpected'}})).toBe(null);
  });
  it('honors accept and reject in this page even when saving is denied', () => {
    const browser={get localStorage(){throw Error('SecurityError')},gtag:vi.fn(),Event:class {constructor(type){this.type=type}},dispatchEvent:vi.fn()};
    expect(trackProductEvent('calculator_use','cleaning',browser)).toBe(false);
    expect(saveAnalyticsChoice('accepted',browser)).toBe(false);
    expect(trackProductEvent('calculator_use','cleaning',browser)).toBe(true);
    expect(browser.gtag).toHaveBeenCalledWith('event','calculator_use',{industry:'cleaning'});
    saveAnalyticsChoice('rejected',browser);
    expect(readAnalyticsChoice(browser)).toBe('rejected');
    expect(trackProductEvent('calculator_result_ready','cleaning',browser)).toBe(false);
    expect(browser.gtag).toHaveBeenCalledTimes(1);
  });
  it('persists a valid choice without accepting arbitrary stored values', () => {
    const storage={getItem:vi.fn(()=>null),setItem:vi.fn()};const browser={localStorage:storage};
    expect(saveAnalyticsChoice('accepted',browser)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith('mybreakeven_analytics_consent','accepted');
    expect(saveAnalyticsChoice('anything',browser)).toBe(false);
  });
});

describe('Complete existing calculator directory', () => {
  it('includes each existing industry and decision tool exactly once', () => {
    const expected=[...Object.keys(industryPages),...Object.keys(freeTools)].sort();
    expect(calculatorDirectory.map(([slug])=>slug).sort()).toEqual(expected);
    expect(new Set(expected).size).toBe(37);
    const html=renderToStaticMarkup(<FreeToolsHub/>);
    for(const slug of expected) expect(html).toContain(`href="/calculators/${slug}/"`);
    expect(html).toContain('37 calculators');
    const restaurant = calculatorDirectory.find(([slug]) => slug === 'restaurant-break-even-calculator')[1];
    for (const query of ['break even', 'break-even', 'breakeven', 'Restaurant']) expect(matchesCalculatorSearch(restaurant, query)).toBe(true);
    expect(matchesCalculatorSearch(restaurant, 'unknown product')).toBe(false);
  });
});

describe('Edited-result measurement across industries', () => {
  it('deduplicates valid accepted results for all industry labels', () => {
    for(const {key} of Object.values(industryPages)){
      const track=vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
      const record=createCalculatorResultTracker(track);
      expect(record(key)).toBe(false);expect(record(key)).toBe(true);expect(record(key)).toBe(false);
      expect(track).toHaveBeenLastCalledWith('calculator_result_ready',key);
    }
  });
});

describe('Search-intent guide changes', () => {
  it('puts checked answers before the cover and preserves URL/publication and body examples', () => {
    for(const slug of ['break-even-analysis-example','target-profit-sales-formula']){
      const post=blogPostMap[slug], html=renderToStaticMarkup(<LongformArticle article={post}/>);
      expect(post.modified).toBe(october25GscDates.has(post.slug)?'2026-10-25':(slug==='break-even-analysis-example'?'2026-10-21':'2026-10-16'));expect(post.published).not.toBe(post.modified);
      expect(html.indexOf('id="quick-answer"')).toBeLessThan(html.indexOf('class="article-featured"'));
      for(const [id] of post.sectionLinks)expect(html).toContain(`id="${id}"`);
      expect((html.match(/<h1/g)||[]).length).toBe(1);
    }
    expect(blogPostMap['break-even-analysis-example'].html).toContain('Three worked business examples');
    expect(blogPostMap['target-profit-sales-formula'].html).toContain('target operating income');
    expect(blogPostMap['target-profit-sales-formula'].answerHtml).toContain('70 whole jobs');
  });
});

describe('Pricing outcomes with unchanged billing', () => {
  it('keeps the existing checkout and clear Free/Pro account limits', () => {
    const html = renderToStaticMarkup(<SecondaryPage path="/pricing" />).replace(/<!--.*?-->/g, '');
    expect(html).toContain(`href="${POLAR_CHECKOUT_URL}"`);
    for (const text of ['All 37 calculator pages', '8 industry models and 29 decision tools', '$9.99', 'up to 100 saved scenarios', 'up to 3 saved scenarios', 'Compare 3 plans', 'Opening pricing or checkout does not save', 'Monthly Break-Even Monitor']) expect(html.toLowerCase()).toContain(text.toLowerCase());
    expect(html).toContain('href="/refund-policy/"');
    expect(html).toContain('See every included Pro tool');
  });
});
