import { readAnalyticsChoice, saveAnalyticsChoice, ANALYTICS_CONSENT_EVENT, ANALYTICS_READY_EVENT } from './analyticsChoice';
import React, { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-CEYVEE1ZV2";

export function loadAnalytics(browser = window, doc = document) {
  if (doc.querySelector(`script[data-ga4="${MEASUREMENT_ID}"]`)) return;

  browser.dataLayer = browser.dataLayer || [];
  browser.gtag = function gtag() {
    browser.dataLayer.push(arguments);
  };
  browser.gtag("js", new Date());
  browser.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = doc.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.ga4 = MEASUREMENT_ID;
  doc.head.appendChild(script);
  browser.dispatchEvent(new browser.Event(ANALYTICS_READY_EVENT));
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => readAnalyticsChoice());

  useEffect(() => {
    if (choice === "accepted") loadAnalytics();
  }, [choice]);

  useEffect(() => {
    const update = () => setChoice(readAnalyticsChoice());
    window.addEventListener(ANALYTICS_CONSENT_EVENT, update);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, update);
  }, []);

  const decide = (nextChoice) => {
    saveAnalyticsChoice(nextChoice);
    setChoice(nextChoice);
  };

  if (choice) return null;

  return (
    <div className="analytics-consent" aria-label="Analytics cookie choices" role="dialog" aria-live="polite">
      <div>
        <strong>Your privacy choices</strong>
        <p>We use optional Google Analytics to understand visits and improve MyBreakeven. It loads only if you accept.</p>
        <a href="/cookie-policy/">Cookie Policy</a>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="consent-reject" onClick={() => decide("rejected")}>Reject analytics</button>
        <button type="button" className="consent-accept" onClick={() => decide("accepted")}>Accept analytics</button>
      </div>
    </div>
  );
}
