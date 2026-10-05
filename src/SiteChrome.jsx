import React, { useEffect, useState } from "react";
import { ArrowUpRight, LockKeyhole, Mail, Menu, X } from "lucide-react";
import { authStorageKey, needsAccountClient } from "./authSession";

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
    let started = false;
    const connect = () => {
      if (started || !needsAccountClient(window.location)) return;
      started = true;
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
    };
    connect();
    const onStorage = event => {
      if (event.key === authStorageKey || event.key === null) connect();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
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

const socialProfiles = [
  ["Pinterest", "https://www.pinterest.com/MyBreakEven1/", "pinterest"],
  ["Facebook", "https://www.facebook.com/mybreakevenapp", "facebook"],
  ["Instagram", "https://www.instagram.com/mybreakevenapp/", "instagram"],
];

export function SiteFooter() {
  return (
    <footer className="compact-footer">
      <div className="compact-footer-main">
        <div className="compact-footer-brand">
          <Logo light />
          <p>Break-even, profit and capacity planning for small businesses.</p>
          <a className="compact-support" href="mailto:support@mybreakeven.com"><Mail /> support@mybreakeven.com</a>
        </div>
        <nav className="compact-footer-nav" aria-label="Product links">
          {primaryNavigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="compact-footer-connect">
          <a className="compact-footer-cta" href="/#calculator">Try the free calculator <ArrowUpRight /></a>
          <nav className="compact-social" aria-label="MyBreakeven social media">
            {socialProfiles.map(([name, href, icon]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" title={name} aria-label={`${name} (opens in a new tab)`}>
                <img src={`/social/${icon}.svg`} width="22" height="22" alt="" loading="lazy" />
              </a>
            ))}
          </nav>
          <span className="compact-checkout"><LockKeyhole /> Secure checkout via Polar</span>
        </div>
      </div>
      <div className="compact-footer-bottom">
        <span>© 2026 MyBreakeven</span>
        <nav aria-label="Legal links">
          <a href="/privacy-policy/">Privacy</a>
          <a href="/terms-of-service/">Terms</a>
          <a href="/refund-policy/">Refunds</a>
          <a href="/cookie-policy/">Cookies</a>
        </nav>
        <small>Planning estimates—not tax, legal, accounting or lending advice.</small>
      </div>
    </footer>
  );
}
