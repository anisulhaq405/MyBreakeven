import { describe, it, expect, vi } from 'vitest';
import { loadAnalytics } from './AnalyticsConsent';
import { subscribeProductPageView } from './productAnalytics';
import { saveAnalyticsChoice } from './analyticsChoice';

function environment() {
  const browser = new EventTarget();
  browser.Event = Event;
  browser.localStorage = { getItem: () => null, setItem: vi.fn() };
  const scripts = [];
  const doc = { querySelector: () => scripts[0], createElement: () => ({ dataset: {} }), head: { appendChild: s => scripts.push(s) } };
  return { browser, doc, scripts };
}
describe('First-consent analytics initialization', () => {
  it('records a pending pricing view after initialization, once, and removes listeners', () => {
    const { browser, doc, scripts } = environment();
    const stop = subscribeProductPageView('pro_pricing_view', browser);
    saveAnalyticsChoice('accepted', browser);
    expect(browser.gtag).toBeUndefined();
    loadAnalytics(browser, doc);
    loadAnalytics(browser, doc);
    saveAnalyticsChoice('accepted', browser);
    expect(scripts).toHaveLength(1);
    const events = browser.dataLayer.map(args => Array.from(args)).filter(args => args[0] === 'event');
    expect(events).toEqual([['event', 'pro_pricing_view', {}]]);
    stop();
    const spy = vi.spyOn(browser, 'gtag');
    saveAnalyticsChoice('accepted', browser);
    expect(spy).not.toHaveBeenCalled();
  });
  it('does not record a page view when consent is rejected', () => {
    const { browser } = environment();
    browser.gtag = vi.fn();
    const stop = subscribeProductPageView('pro_pricing_view', browser);
    saveAnalyticsChoice('rejected', browser);
    expect(browser.gtag).not.toHaveBeenCalled();
    stop();
  });
});
