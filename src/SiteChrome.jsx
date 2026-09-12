import React, { useState } from "react";
import { ArrowRight, BarChart3, Menu, X } from "lucide-react";

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
        <a href="/#calculator">Calculator</a>
        <a href="/pricing/">Pricing</a>
        <a href="/blogs/">Blogs</a>
        <a href="/about-us/">About Us</a>
        <a href="/contact-us/">Contact Us</a>
        <a className="navCta" href="/#calculator">Start free <ArrowRight /></a>
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
      <div className="footer-brand">
        <Logo light />
        <p>Industry-specific break-even and feasibility planning for small and medium businesses.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="/#calculator">Calculator</a>
        <a href="/blogs/">Guides</a>
        <a href="/about-us/">About</a>
        <a href="/contact-us/">Contact</a>
      </nav>
      <div className="footer-legal">
        <span>© 2026 MyBreakeven</span>
        <small>Planning estimates based on your assumptions—not tax, legal, accounting or lending advice.</small>
      </div>
    </footer>
  );
}
