import React, { useEffect, useState } from "react";
import { ArrowUpRight, CreditCard, LockKeyhole, Mail, Menu, ShieldCheck, X } from "lucide-react";

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
      <img className="brandmark" src="/logo.svg?v=20260922" alt="" width="42" height="42" />
      <span>My<span>Breakeven</span></span>
    </a>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    let subscription;
    import("./authClient").then(({ supabase }) => {
      if (!active || !supabase) return;
      supabase.auth.getSession().then(({ data }) => {
        if (active) setSignedIn(Boolean(data.session));
      });
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (active) setSignedIn(Boolean(session));
      });
      subscription = data.subscription;
    });
    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", mobileOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  return (
    <header>
      <Logo />
      <nav className={mobileOpen ? "open" : ""} aria-label="Main navigation">
        {primaryNavigation.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="account-link" href={signedIn ? "/dashboard/" : "/login/"}>{signedIn ? "Dashboard" : "Sign In"}</a>
        <button
          className="menu"
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-cta">
        <div>
          <span>FREE · PRIVATE · NO SIGN-UP REQUIRED</span>
          <h2>Turn your assumptions into a number you can use.</h2>
        </div>
        <a href="/#calculator">Open the calculator <ArrowUpRight /></a>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>Formula-backed break-even, demand and capacity planning for owner-operated businesses.</p>
          <div className="footer-trust-row">
            <span className="footer-trust"><ShieldCheck /> Transparent formulas</span>
            <span className="footer-trust"><LockKeyhole /> Private by default</span>
          </div>
          <a className="footer-support" href="mailto:support@mybreakeven.com"><Mail /> support@mybreakeven.com</a>
        </div>
        <nav className="footer-links" aria-label="Product links">
          <strong>Explore</strong>
          {primaryNavigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <nav className="footer-links" aria-label="Legal links">
          <strong>Policies</strong>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-of-service/">Terms of Service</a>
          <a href="/refund-policy/">Refund Policy</a>
          <a href="/cookie-policy/">Cookie Policy</a>
        </nav>
        <div className="footer-payments">
          <div className="footer-checkout-head">
            <span><CreditCard /></span>
            <div><strong>Secure checkout</strong><small>Subscriptions managed by Polar</small></div>
          </div>
          <p>Encrypted payment processing. MyBreakeven does not store your card details.</p>
          <div className="payment-wordmarks" aria-label="Polar checkout supported payment methods">
            <span>VISA</span>
            <span>mastercard</span>
            <span>AMEX</span>
            <span>Apple Pay</span>
            <span>G Pay</span>
          </div>
          <span className="checkout-note"><LockKeyhole /> Secure subscription billing</span>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 MyBreakeven. All rights reserved.</span>
        <small>Planning estimates based on your assumptions—not tax, legal, accounting or lending advice.</small>
      </div>
    </footer>
  );
}
