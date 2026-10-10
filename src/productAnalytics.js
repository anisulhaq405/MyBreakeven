import { industries } from "./industries";
const events = new Set(["calculator_use", "signup_request_accepted", "calculator_continue", "pro_pricing_view", "pro_checkout_click", "scenario_saved", "resource_download", "walkthrough_step", "walkthrough_calculator_click"]);

export function trackProductEvent(name, industryKey, browser = typeof window === "undefined" ? null : window) {
  if (!browser || !events.has(name)) return false;
  try {
    if (browser.localStorage.getItem("mybreakeven_analytics_consent") !== "accepted" || typeof browser.gtag !== "function") return false;
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
