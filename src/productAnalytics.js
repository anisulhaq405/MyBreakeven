import { industries } from "./industries";
const events = new Set(["calculator_continue", "pro_pricing_view", "pro_checkout_click", "scenario_saved"]);

export function trackProductEvent(name, industryKey, browser = typeof window === "undefined" ? null : window) {
  if (!browser || !events.has(name)) return false;
  try {
    if (browser.localStorage.getItem("mybreakeven_analytics_consent") !== "accepted" || typeof browser.gtag !== "function") return false;
    const parameters = Object.hasOwn(industries, industryKey) ? { industry: industryKey } : {};
    browser.gtag("event", name, parameters);
    return true;
  } catch { return false; }
}
