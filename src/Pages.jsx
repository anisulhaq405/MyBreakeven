import FounderCaseStudy from './FounderCaseStudy.jsx';
import { Pricing, About, Contact, legalPages, LegalPage } from './StaticPageContent.jsx';
import './pricing-decisions.css';
import { useProductPageView } from './useProductTracking';
import { staticPageMeta } from './staticPageMeta.js';
import AuthorityPage from './AuthorityPages.jsx';
import { authorityPages } from './authorityResources.js';
import ClusterDirectory from './ClusterDirectory.jsx';
import AgencyCluster, { AgencyClusterLink } from './AgencyCluster.jsx';
import EcommerceCluster, { EcommerceClusterLink } from './EcommerceCluster.jsx';
import PhotographyCluster, { PhotographyClusterLink } from './PhotographyCluster.jsx';
import RestaurantCluster, { RestaurantClusterLink } from './RestaurantCluster.jsx';
import SalonCluster, { SalonClusterLink } from './SalonCluster.jsx';
import MobileDetailingCluster, { MobileDetailingClusterLink } from './MobileDetailingCluster.jsx';
import LandscapingCluster, { LandscapingClusterLink } from './LandscapingCluster.jsx';
import CleaningCluster, { CleaningClusterLink } from './CleaningCluster.jsx';
import { trackProductEvent } from "./productAnalytics";
import "./secondary-pages.css";
import FreeTool, { FreeToolsHub } from "./FreeTools";
import { freeTools } from "./freeTools";
import "./blogs-page.css";
import "./about-contact.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import BlogSection from "./BlogSection";
import BlogArticle from "./BlogArticle";
import ProUserGuide from "./ProUserGuide";
import { blogListingData } from "./blogListingData.js";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import IndustryPage, { industryPages } from "./IndustryPage";
import { POLAR_CHECKOUT_URL } from "./billing";
const AuthPage = lazy(() => import("./AuthPages").then(module => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("./AuthPages").then(module => ({ default: module.DashboardPage })));
export default function SecondaryPage({ path, initialArticle }) {
  useProductPageView(path === "/pricing" ? "pro_pricing_view" : null);
  const pageMeta = {
    ...Object.fromEntries(Object.entries(staticPageMeta).map(([route, meta]) => [`/${route}`, meta])),
    ...Object.fromEntries(Object.entries(freeTools).map(([slug, tool]) => [`/calculators/${slug}`, [tool.title, tool.description]])),
  };
  useEffect(() => {
    const meta = pageMeta[path];
    if (!meta) return;
    document.title = meta[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta[1]);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://mybreakeven.com${path}/`);
  }, [path]);
  const slug = path.startsWith("/blogs/") ? path.split("/")[2] : null;
  const calculatorSlug = path.startsWith("/calculators/") ? path.split("/")[2] : null;
  const authPaths = ["/login", "/signup", "/forgot-password", "/reset-password"];
  const content = path === "/resources/daily-outfitter-founder-case-study" ? <FounderCaseStudy/> : authorityPages[path.slice(1)] ? <AuthorityPage path={path} /> : path === "/guides/agency-business" ? <AgencyCluster /> : path === "/guides/ecommerce-business" ? <EcommerceCluster /> : path === "/guides/photography-business" ? <PhotographyCluster /> : path === "/guides/restaurant-business" ? <RestaurantCluster /> : path === "/guides/salon-business" ? <SalonCluster /> : path === "/guides/mobile-detailing-business" ? <MobileDetailingCluster /> : path === "/guides/landscaping-business" ? <LandscapingCluster /> : path === "/guides/cleaning-business" ? <CleaningCluster /> : path === "/tools" ? <FreeToolsHub /> : calculatorSlug && freeTools[calculatorSlug] ? <FreeTool slug={calculatorSlug} /> : calculatorSlug && industryPages[calculatorSlug] ? <IndustryPage slug={calculatorSlug} /> : slug ? <BlogArticle slug={slug} initialArticle={initialArticle} /> :
    authPaths.includes(path) ? <Suspense fallback={<p className="route-loading">Loading secure account…</p>}><AuthPage path={path} /></Suspense> : path === "/dashboard" ? <Suspense fallback={<p className="route-loading">Loading secure workspace…</p>}><DashboardPage /></Suspense> :
    path === "/pro-user-guide" ? <ProUserGuide /> : path === "/pricing" ? (
      <Pricing />
    ) : path === "/blogs" || path === "/blog" ? (
      <div className="blogs-page">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <span><i /> MYBREAKEVEN JOURNAL</span>
            <h1>Clear numbers for <em>real business decisions.</em></h1>
            <p>Practical guides to pricing, startup costs, margins and break-even—written for owners doing the work.</p>
            <div className="blog-hero-actions"><a href="#blog">Browse all guides <span aria-hidden="true">↓</span></a><a href="/#calculator">Open calculator <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="blog-hero-index" aria-label="Guide library summary">
            <div><strong>{blogListingData.posts.length}</strong><span>focused guides</span></div>
            <div><strong>{blogListingData.modelCount}</strong><span>business models</span></div>
            <p><span>Pricing</span><span>Startup</span><span>Margins</span><span>Break-even</span></p>
          </div>
        </section>
        <ClusterDirectory /><BlogSection isHub />
      </div>
    ) : path === "/about-us" ? (
      <About />
    ) : path === "/contact-us" ? (
      <Contact />
    ) : legalPages[path] ? (
      <LegalPage page={legalPages[path]} />
    ) : null;
  if (!content) return null;
  return (
    <>
      <SiteHeader />
      <main className="secondary-page">{content}</main>
      <SiteFooter />
    </>
  );
}
