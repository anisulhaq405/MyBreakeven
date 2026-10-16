export const ANALYTICS_CONSENT_KEY = 'mybreakeven_analytics_consent';
export const ANALYTICS_CONSENT_EVENT = 'mybreakeven:analytics-consent';
const choices = new WeakMap();
const validChoice = choice => choice === 'accepted' || choice === 'rejected';

export function readAnalyticsChoice(browser = typeof window === 'undefined' ? null : window) {
  if (!browser) return null;
  if (choices.has(browser)) return choices.get(browser);
  try {
    const choice = browser.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return validChoice(choice) ? choice : null;
  } catch { return null; }
}

export function saveAnalyticsChoice(choice, browser = typeof window === 'undefined' ? null : window) {
  if (!browser || !validChoice(choice)) return false;
  // A choice still works for this page when storage is unavailable.
  choices.set(browser, choice);
  let persisted = false;
  try { browser.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice); persisted = true; } catch { /* Ask again after a reload. */ }
  if (browser.dispatchEvent && browser.Event) browser.dispatchEvent(new browser.Event(ANALYTICS_CONSENT_EVENT));
  return persisted;
}

export const ANALYTICS_READY_EVENT = 'mybreakeven:analytics-ready';
