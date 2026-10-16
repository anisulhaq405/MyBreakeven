import React from 'react';
import { industryIntentForGuide } from './searchIntent.js';

export default function GuideCalculatorLink({ slug }) {
  const entry = industryIntentForGuide(slug);
  if (!entry) return null;
  const [industry, , calculator] = entry;
  const label = industry === 'detailing' ? 'mobile detailing' : industry;
  return <aside className="cluster-related-reading" aria-label="Guide and calculator options">
    <p>This guide explains the method and worked assumptions. To enter your own costs and check the monthly target, <a href={`/calculators/${calculator}/`}>use the free {label} break-even calculator</a>. No account is needed to calculate; opening it does not copy the guide’s example inputs.</p>
  </aside>;
}
