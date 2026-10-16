import { industries } from "./industries";
import { calculate } from "./engine";

export const transferKey = "mybreakeven:calculator-transfer:v1";
const maxAge = 5 * 60 * 1000;

// Only an explicit continue action creates this short-lived, same-tab handoff.
// Financial inputs never enter a URL or a network request.
export function stageCalculatorPlan(industryKey, input, storage, now = Date.now(), currency = "USD") {
  if (typeof currency !== "string" || !/^[A-Z]{3}$/.test(currency)) return false;
  if (!Object.hasOwn(industries, industryKey) || !calculate(input).valid) return false;
  try {
    storage.setItem(transferKey, JSON.stringify({ industryKey, input, currency, createdAt: now }));
    return true;
  } catch { return false; }
}

export function initialCalculatorPlan(browser, now = Date.now()) {
  const params = new URLSearchParams(browser?.location.search || "");
  const requested = params.get("industry");
  const industryKey = Object.hasOwn(industries, requested) ? requested : "cleaning";
  const fallback = { industryKey, input: { ...industries[industryKey].values }, currency: "USD", transferred: false, transferUnavailable: params.get("from") === "industry" };
  if (params.get("from") !== "industry") return fallback;
  try {
    const storage = browser.sessionStorage;
    const raw = storage.getItem(transferKey);
    storage.removeItem(transferKey);
    const plan = JSON.parse(raw);
    if (!plan || plan.industryKey !== industryKey || !Number.isFinite(plan.createdAt) ||
        now < plan.createdAt || now - plan.createdAt > maxAge || !calculate(plan.input).valid) return fallback;
    const currency = plan.currency ?? "USD";
    if (typeof currency !== "string" || !/^[A-Z]{3}$/.test(currency)) return fallback;
    new Intl.NumberFormat("en-US", { style: "currency", currency });
    return { industryKey, input: plan.input, currency, transferred: true };
  } catch { return fallback; }
}

const standardCurrencies = ['USD','EUR','GBP','CAD','AUD','NZD','AED','SAR','PKR','INR','BDT','SGD','MYR','ZAR','JPY','CHF','SEK','NOK','DKK'];
// A food tool can carry a currency beyond the homepage's compact default list.
export function calculatorCurrencyCodes(...carried) {
  return [...new Set([...standardCurrencies,...carried.filter(code=>typeof code==='string'&&/^[A-Z]{3}$/.test(code))])];
}
