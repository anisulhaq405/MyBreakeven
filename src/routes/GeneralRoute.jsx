import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import { Pricing, About, Contact, legalPages, LegalPage } from '../StaticPageContent.jsx';
import { useProductPageView } from '../useProductTracking';
import '../pricing-decisions.css';
import '../about-contact.css';
export default function GeneralRoute({ path }) {
  useProductPageView(path === '/pricing' ? 'pro_pricing_view' : null);
  const content = path === '/pricing' ? <Pricing /> : path === '/about-us' ? <About /> : path === '/contact-us' ? <Contact /> : legalPages[path] ? <LegalPage page={legalPages[path]} /> : null;
  return content ? <SecondaryLayout>{content}</SecondaryLayout> : null;
}
