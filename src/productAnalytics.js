import { readAnalyticsChoice, ANALYTICS_CONSENT_EVENT, ANALYTICS_READY_EVENT } from './analyticsChoice';
import { industries } from "./industries";
const events = new Set(["calculator_use", "calculator_result_ready", "calculator_example_load", "signup_request_accepted", "calculator_continue", "pro_pricing_click", "pro_pricing_view", "pro_checkout_click", "scenario_saved", "resource_download", "walkthrough_step", "walkthrough_calculator_click"]);

export function trackProductEvent(name, industryKey, browser = typeof window === "undefined" ? null : window) {
  if (!browser || !events.has(name)) return false;
  try {
    if (readAnalyticsChoice(browser) !== "accepted" || typeof browser.gtag !== "function") return false;
    const parameters = Object.hasOwn(industries, industryKey) ? { industry: industryKey } : {};
    browser.gtag("event", name, parameters);
    return true;
  } catch { return false; }
}

// One accepted interaction event per mounted calculator; retry if consent arrives later.
export function createCalculatorUseTracker(track = trackProductEvent) {
  let recorded = false;
  return industryKey => {
    if (recorded) return false;
    recorded = track("calculator_use", industryKey);
    return recorded;
  };
}

// A valid, edited result after the user pauses; sample loads alone do not count.
// Never include financial inputs, product labels or personal details in analytics.
export function createCalculatorResultTracker(track = trackProductEvent) {
  let recorded = false;
  return industryKey => {
    if (recorded) return false;
    recorded = track("calculator_result_ready", industryKey);
    return recorded;
  };
}

// Subscribe before checking: consent and tag initialization can occur in different roots.
export function subscribeProductPageView(name, browser = window) {
  let recorded = false;
  const record = () => { if (!recorded) recorded = trackProductEvent(name, undefined, browser); };
  const signals = [ANALYTICS_CONSENT_EVENT, ANALYTICS_READY_EVENT];
  signals.forEach(event => browser.addEventListener(event, record));
  record();
  return () => signals.forEach(event => browser.removeEventListener(event, record));
}
