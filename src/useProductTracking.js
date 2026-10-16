import { useEffect, useMemo } from 'react';
import { ANALYTICS_CONSENT_EVENT } from './analyticsChoice';
import { createCalculatorResultTracker, subscribeProductPageView } from './productAnalytics';

export function useEditedResultTracking(industryKey, input, valid, edited, recordUse) {
  const recordResult = useMemo(() => createCalculatorResultTracker(), [industryKey]);
  useEffect(() => {
    if (!edited || !valid) return;
    let timer;
    const record = () => {
      clearTimeout(timer);
      recordUse?.(industryKey);
      timer = setTimeout(() => { recordUse?.(industryKey); recordResult(industryKey); }, 700);
    };
    record();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, record);
    return () => { clearTimeout(timer); window.removeEventListener(ANALYTICS_CONSENT_EVENT, record); };
  }, [industryKey, input, valid, edited, recordUse, recordResult]);
}

// A page view is a rendered page, not a link click; retry after later consent.
export function useProductPageView(name) {
  useEffect(() => {
    if (!name) return;
    return subscribeProductPageView(name);
  }, [name]);
}
