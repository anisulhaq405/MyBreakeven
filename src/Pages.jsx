import React, { lazy, Suspense, useEffect } from "react";
import { CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import BlogSection from "./BlogSection";
import BlogArticle from "./BlogArticle";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import IndustryPage, { industryPages } from "./IndustryPage";
const AuthPage = lazy(() => import("./AuthPages").then(module => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("./AuthPages").then(module => ({ default: module.DashboardPage })));
const Pricing = () => (
  <>
    <section className="page-hero">
      <span>STRAIGHTFORWARD PRICING</span>
      <h1>Start free. Upgrade when you need deeper planning.</h1>
      <p>
        Use the core calculator without an account. Pro tools will add saved
        scenarios, comparisons and downloadable reports.
      </p>
    </section>
    <section className="pricing page-pricing">
      <div>
        <article>
          <h3>Free</h3>
          <strong>$0</strong>
          <p>Calculate privately without a credit card.</p>
          <ul><li>All 8 industry calculators</li><li>Exact break-even and feasibility results</li><li>Formula trace</li><li>Up to 3 saved scenarios</li></ul>
          <a className="page-button secondary" href="/#calculator">
            Use calculator
          </a>
        </article>
        <article className="pro">
          <small>PLANNED PRO</small>
          <h3>Pro</h3>
          <strong>
            $19 <i>/ month</i>
          </strong>
          <p>Advanced planning for active owners and teams.</p>
          <ul><li>Up to 100 saved scenarios</li><li>Compare 3 plans side by side</li><li>Cost-drift stress testing</li><li>CSV and PDF-ready reports</li></ul>
          <a className="page-button" href="/signup/">
            Create free account
          </a>
        </article>
      </div>
    </section>
  </>
);
const About = () => (
  <>
    <section className="page-hero">
      <span>ABOUT MYBREAKEVEN</span>
      <h1>Business decisions should begin with numbers you can verify.</h1>
      <p>
        MyBreakeven connects break-even economics with capacity and customer
        demand.
      </p>
    </section>
    <section className="page-grid">
      <article>
        <Sparkles />
        <h2>Our purpose</h2>
        <p>
          Turn operating assumptions into a clear monthly target owners can
          understand and act on.
        </p>
      </article>
      <article>
        <ShieldCheck />
        <h2>Our standard</h2>
        <p>
          Transparent tested formulas. AI may explain verified outputs, but
          never invent the math.
        </p>
      </article>
      <article>
        <CheckCircle2 />
        <h2>Our approach</h2>
        <p>
          Industry-specific inputs, plain-language results and privacy-first
          calculations.
        </p>
      </article>
    </section>
  </>
);
const Contact = () => (
  <>
    <section className="page-hero">
      <span>CONTACT US</span>
      <h1>Questions, feedback or an industry request?</h1>
      <p>
        Tell us what you are building and which business model you want us to
        support next.
      </p>
    </section>
    <section className="contact-card">
      <Mail />
      <div>
        <h2>Get in touch</h2>
        <p>
          Include your business type so we can give your message the right
          context.
        </p>
        <a className="page-button" href="mailto:hello@mybreakeven.com">
          hello@mybreakeven.com
        </a>
      </div>
    </section>
  </>
);
const legalPages = {
  "/privacy-policy": {
    eyebrow: "PRIVACY",
    title: "Privacy Policy",
    intro: "How MyBreakeven handles information when you use our calculators and website.",
    sections: [
      ["Calculator data", "The free calculator currently runs in your browser. We do not receive or store the financial assumptions you enter unless a future account feature clearly asks you to save them."],
      ["Website information", "Our hosting and security providers may process standard technical data such as IP address, browser type, device information, requested pages and timestamps to operate, protect and diagnose the website."],
      ["Messages you send", "If you contact us, we use the information in your message to reply, provide support and improve the product."],
      ["Optional accounts", "If you create an account, our authentication provider processes your email address, encrypted authentication credentials, verification status and security session data. MyBreakeven never receives your plain-text password."],
      ["Account controls", "You may request access, correction or deletion of account information by emailing hello@mybreakeven.com. Authentication records may be retained where reasonably required for security, fraud prevention or legal compliance."],
      ["Analytics", "With your permission, Google Analytics measures pages viewed, approximate location, device and browser information, traffic sources and interactions. We do not send calculator inputs, account passwords or saved scenario contents to Google Analytics. You can reject optional analytics without losing access to the service."],
      ["Error monitoring", "We use Sentry to receive technical error details needed to diagnose failures. Default personally identifiable information, session replay, logs and performance tracing are disabled. Query strings, request headers, cookies, request bodies and user identity are removed before an error is sent."],
      ["Service providers", "We use carefully selected providers for hosting, analytics, authentication, email and future payments. Each provider processes data for its stated service and under its own applicable terms."],
      ["Your choices", "You may ask about, correct or request deletion of personal information you have directly provided by emailing hello@mybreakeven.com."],
    ],
  },
  "/terms-of-service": {
    eyebrow: "TERMS",
    title: "Terms of Service",
    intro: "Rules for using MyBreakeven calculators, content and future subscription features.",
    sections: [
      ["Planning tool", "MyBreakeven provides assumption-based planning estimates. Results are not tax, legal, accounting, lending or investment advice, and they are not a guarantee of revenue, profit or business performance."],
      ["Your responsibility", "You are responsible for the accuracy of your inputs and for reviewing important decisions with qualified professionals where appropriate."],
      ["Acceptable use", "Do not misuse the service, interfere with its operation, attempt unauthorized access, or copy and resell the product or its protected content."],
      ["Availability", "We may improve, change or discontinue features. We aim for reliable service but cannot promise uninterrupted or error-free availability."],
      ["Contact", "Questions about these terms can be sent to hello@mybreakeven.com."],
    ],
  },
  "/refund-policy": {
    eyebrow: "BILLING",
    title: "Refund Policy",
    intro: "The policy that will apply when paid MyBreakeven subscriptions become available.",
    sections: [
      ["Before paid launch", "MyBreakeven does not currently collect subscription payments. This page is published in preparation for the paid service."],
      ["Subscription cancellation", "When subscriptions launch, customers will be able to cancel renewal from the customer portal. Access will normally continue through the paid billing period."],
      ["Refund requests", "If a billing error, duplicate charge or material service problem occurs, contact us promptly at hello@mybreakeven.com. Eligible requests will be reviewed fairly under applicable consumer law and the checkout provider's rules."],
      ["No guaranteed outcome", "A subscription provides access to software features. Business results depend on user inputs and real-world conditions, so a particular financial outcome is not guaranteed."],
    ],
  },
  "/cookie-policy": {
    eyebrow: "COOKIES",
    title: "Cookie Policy",
    intro: "How browser storage and cookies may be used on MyBreakeven.",
    sections: [
      ["Current use", "The free calculator does not require an account and currently keeps its calculation state in the active browser session rather than sending financial inputs to our servers."],
      ["Account sessions", "Optional accounts use essential local storage and authentication tokens to keep users securely signed in, refresh sessions and protect private account routes. These essential technologies are not used for advertising."],
      ["Essential storage", "We may use essential cookies or similar browser storage for security, preferences, authentication and reliable site operation."],
      ["Optional analytics", "Google Analytics is disabled by default and loads only after you choose Accept analytics. If accepted, it may use cookies or similar identifiers to measure page views, interactions, approximate location, device and browser information, and traffic sources. Advertising personalization and Google Signals are disabled."],
      ["Your analytics choice", "You may reject analytics and continue using MyBreakeven. Your choice is stored in this browser. You can clear the site\'s browser storage to reset the choice and see the consent controls again."],
      ["Browser controls", "You can block or delete cookies through your browser settings, although essential account or checkout features may then stop working."],
    ],
  },
};

const LegalPage = ({ page }) => (
  <article className="legal-page">
    <header className="page-hero">
      <span>{page.eyebrow}</span>
      <h1>{page.title}</h1>
      <p>{page.intro}</p>
      <small>Effective September 13, 2026</small>
    </header>
    <div className="legal-content">
      {page.sections.map(([heading, copy]) => (
        <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>
      ))}
    </div>
  </article>
);
export default function SecondaryPage({ path }) {
  const pageMeta = {
    "/pricing": ["MyBreakeven Pricing: Free & Pro Business Planning", "Compare MyBreakeven Free and Pro plans for industry break-even calculators, saved scenarios, cost-drift analysis, comparisons and reports."],
    "/blogs": ["Small Business Break-Even Guides | MyBreakeven", "Read practical break-even guides for cleaning, landscaping, photography, agencies, mobile detailing, e-commerce, restaurants and salons."],
    "/about-us": ["About MyBreakeven | Formula-Backed Business Planning", "Learn how MyBreakeven turns contribution margin, sales demand and operating capacity into transparent business planning estimates."],
    "/contact-us": ["Contact MyBreakeven", "Contact MyBreakeven about calculator feedback, industry requests, partnerships or formula-backed business planning tools."],
    "/privacy-policy": ["Privacy Policy | MyBreakeven", "Read how MyBreakeven handles calculator data, website information and messages you send."],
    "/terms-of-service": ["Terms of Service | MyBreakeven", "Read the terms for using MyBreakeven calculators, content and subscription features."],
    "/refund-policy": ["Refund Policy | MyBreakeven", "Review the cancellation and refund policy for future MyBreakeven paid subscriptions."],
    "/cookie-policy": ["Cookie Policy | MyBreakeven", "Learn how MyBreakeven uses essential browser storage and cookies."],
    "/login": ["Log in to MyBreakeven", "Access your private MyBreakeven planning workspace."],
    "/signup": ["Create a MyBreakeven account", "Create an optional account for saved business planning scenarios and reports."],
    "/forgot-password": ["Reset your MyBreakeven password", "Request a secure password-reset link for your MyBreakeven account."],
    "/reset-password": ["Choose a new MyBreakeven password", "Securely update your MyBreakeven account password."],
    "/dashboard": ["Your MyBreakeven dashboard", "Manage your private MyBreakeven account and planning workspace."],
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
  const content = calculatorSlug && industryPages[calculatorSlug] ? <IndustryPage slug={calculatorSlug} /> : slug ? <BlogArticle slug={slug} /> :
    authPaths.includes(path) ? <Suspense fallback={<p className="route-loading">Loading secure account…</p>}><AuthPage path={path} /></Suspense> : path === "/dashboard" ? <Suspense fallback={<p className="route-loading">Loading secure workspace…</p>}><DashboardPage /></Suspense> :
    path === "/pricing" ? (
      <Pricing />
    ) : path === "/blogs" || path === "/blog" ? (
      <div className="blogs-page">
        <section className="page-hero">
          <span>MYBREAKEVEN BLOGS</span>
          <h1>Practical guides for stronger business decisions.</h1>
          <p>
            Industry-focused guidance on pricing, capacity, demand and
            break-even planning.
          </p>
        </section>
        <BlogSection />
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
