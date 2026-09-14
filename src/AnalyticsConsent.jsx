import React, { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-CEYVEE1ZV2";
const CONSENT_KEY = "mybreakeven_analytics_consent";

function loadAnalytics() {
  if (document.querySelector(`script[data-ga4="${MEASUREMENT_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.ga4 = MEASUREMENT_ID;
  document.head.appendChild(script);
}

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState(() => localStorage.getItem(CONSENT_KEY));

  useEffect(() => {
    if (choice === "accepted") loadAnalytics();
  }, [choice]);

  const decide = (nextChoice) => {
    localStorage.setItem(CONSENT_KEY, nextChoice);
    setChoice(nextChoice);
  };

  if (choice) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics cookie choices" role="dialog" aria-live="polite">
      <div>
        <strong>Your privacy choices</strong>
        <p>We use optional Google Analytics to understand visits and improve MyBreakeven. It loads only if you accept.</p>
        <a href="/cookie-policy/">Cookie Policy</a>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="consent-reject" onClick={() => decide("rejected")}>Reject analytics</button>
        <button type="button" className="consent-accept" onClick={() => decide("accepted")}>Accept analytics</button>
      </div>
    </aside>
  );
}
