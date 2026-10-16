import { useEffect, useMemo } from 'react';
import { ANALYTICS_CONSENT_EVENT, ANALYTICS_READY_EVENT } from './analyticsChoice';
import { createCalculatorResultTracker, subscribeProductPageView } from './productAnalytics';

export function useEditedResultTracking(industryKey, input, valid, edited, recordUse, resultOverride) {
  const recordResult = useMemo(() => createCalculatorResultTracker(), [industryKey]);
  useEffect(() => {
    if (!edited || !valid) return;
    let timer;
    const record = () => {
      clearTimeout(timer);
      recordUse?.(industryKey);
      timer = setTimeout(() => { recordUse?.(industryKey); (resultOverride || recordResult)(industryKey); }, 700);
    };
    record();
    const signals = [ANALYTICS_CONSENT_EVENT, ANALYTICS_READY_EVENT];
    signals.forEach(event => window.addEventListener(event, record));
    return () => { clearTimeout(timer); signals.forEach(event => window.removeEventListener(event, record)); };
  }, [industryKey, input, valid, edited, recordUse, recordResult, resultOverride]);
}

// A page view is a rendered page, not a link click; retry after later consent.
export function useProductPageView(name) {
  useEffect(() => {
    if (!name) return;
    return subscribeProductPageView(name);
  }, [name]);
}
