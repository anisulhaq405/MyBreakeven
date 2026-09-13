import React, { useState } from "react";
import { BarChart3, CreditCard, Menu, ShieldCheck, X } from "lucide-react";

export const primaryNavigation = [
  ["Calculator", "/#calculator"],
  ["Pricing", "/pricing/"],
  ["Blogs", "/blogs/"],
  ["About Us", "/about-us/"],
  ["Contact Us", "/contact-us/"],
];

export function Logo({ light = false }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="/" aria-label="MyBreakeven home">
      <span className="brandmark" aria-hidden="true"><BarChart3 /></span>
      <span>My<span>Breakeven</span></span>
    </a>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header>
      <Logo />
      <nav className={mobileOpen ? "open" : ""} aria-label="Main navigation">
        {primaryNavigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <button
        className="menu"
        type="button"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>Formula-backed break-even and feasibility planning for small and medium businesses.</p>
          <span className="footer-trust"><ShieldCheck /> Private by default · Transparent formulas</span>
        </div>
        <nav className="footer-links" aria-label="Product links">
          <strong>Product</strong>
          {primaryNavigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <nav className="footer-links" aria-label="Legal links">
          <strong>Legal</strong>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-of-service/">Terms of Service</a>
          <a href="/refund-policy/">Refund Policy</a>
          <a href="/cookie-policy/">Cookie Policy</a>
        </nav>
        <div className="footer-payments">
          <strong>Supported by Polar checkout</strong>
          <p>Payment integration is coming later.</p>
          <div aria-label="Polar checkout supported payment methods">
            <span><CreditCard /> Cards</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>Apple Pay</span>
            <span>Google Pay</span>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 MyBreakeven</span>
        <small>Planning estimates based on your assumptions—not tax, legal, accounting or lending advice.</small>
      </div>
    </footer>
  );
}
