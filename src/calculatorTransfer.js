import { industries } from "./industries";
import { calculate } from "./engine";

export const transferKey = "mybreakeven:calculator-transfer:v1";
const maxAge = 5 * 60 * 1000;

// Only an explicit continue action creates this short-lived, same-tab handoff.
// Financial inputs never enter a URL or a network request.
export function stageCalculatorPlan(industryKey, input, storage, now = Date.now()) {
  if (!Object.hasOwn(industries, industryKey) || !calculate(input).valid) return false;
  try {
    storage.setItem(transferKey, JSON.stringify({ industryKey, input, createdAt: now }));
    return true;
  } catch { return false; }
}

export function initialCalculatorPlan(browser, now = Date.now()) {
  const params = new URLSearchParams(browser?.location.search || "");
  const requested = params.get("industry");
  const industryKey = Object.hasOwn(industries, requested) ? requested : "cleaning";
  const fallback = { industryKey, input: { ...industries[industryKey].values }, transferred: false, transferUnavailable: params.get("from") === "industry" };
  if (params.get("from") !== "industry") return fallback;
  try {
    const storage = browser.sessionStorage;
    const raw = storage.getItem(transferKey);
    storage.removeItem(transferKey);
    const plan = JSON.parse(raw);
    if (!plan || plan.industryKey !== industryKey || !Number.isFinite(plan.createdAt) ||
        now < plan.createdAt || now - plan.createdAt > maxAge || !calculate(plan.input).valid) return fallback;
    return { industryKey, input: plan.input, transferred: true };
  } catch { return fallback; }
}
