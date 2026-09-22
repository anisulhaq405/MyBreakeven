import React, { lazy, Suspense, useEffect, useState } from "react";
import { CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import BlogSection from "./BlogSection";
import BlogArticle from "./BlogArticle";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import IndustryPage, { industryPages } from "./IndustryPage";
import { POLAR_CHECKOUT_URL } from "./billing";
const AuthPage = lazy(() => import("./AuthPages").then(module => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("./AuthPages").then(module => ({ default: module.DashboardPage })));
const Pricing = () => (
  <>
    <section className="page-hero">
      <span>STRAIGHTFORWARD PRICING</span>
      <h1>Start free. Upgrade when you need deeper planning.</h1>
      <p>
        Use the core calculator without an account. Pro expands saved
        scenarios and adds advanced analysis, comparisons and downloadable reports.
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
          <small>MYBREAKEVEN PRO</small>
          <h3>Pro</h3>
          <strong>
            $9.99 <i>/ month</i>
          </strong>
          <p>Advanced planning for active owners and teams.</p>
          <ul><li>Up to 100 saved scenarios</li><li>Offer Mix Studio for multiple products and services</li><li>Price Guard and discount recovery analysis</li><li>Transparent Break-Even Ladder</li><li>Profit forecast, margin of safety and capacity solver</li><li>Risk sensitivity and price-volume heatmap</li><li>Compare 3 plans side by side</li><li>CSV and professional PDF reports</li></ul>
          <a className="page-button" href={POLAR_CHECKOUT_URL}>
            Upgrade to Pro
          </a>
        </article>
      </div>
    </section>
  </>
);
const About = () => (
  <>
    <section className="about-hero">
      <div className="about-hero-copy">
        <span className="journey-kicker"><i /> ABOUT MYBREAKEVEN</span>
        <h1>Know the number. Then see if the plan can actually work.</h1>
        <p>
          MyBreakeven turns your costs, pricing and workload into a monthly target you can inspect—not a promise, and not a black-box forecast.
        </p>
        <div className="journey-actions">
          <a className="journey-primary" href="/#calculator">Run your numbers <span aria-hidden="true">↗</span></a>
          <a className="journey-secondary" href="/blogs/">Read the guides <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <aside className="planning-loop" aria-label="The MyBreakeven planning loop">
        <small>THE PLANNING LOOP</small>
        <ol>
          <li><b>01</b><span><strong>Map the costs</strong><em>Fixed, variable and owner pay</em></span></li>
          <li><b>02</b><span><strong>Test the margin</strong><em>What each sale contributes</em></span></li>
          <li><b>03</b><span><strong>Check capacity</strong><em>What your team can deliver</em></span></li>
          <li><b>04</b><span><strong>Plan demand</strong><em>Customers and leads required</em></span></li>
        </ol>
      </aside>
    </section>
    <section className="about-story">
      <div>
        <span className="journey-kicker"><i /> WHY IT EXISTS</span>
        <h2>A break-even number is useful only when the business can deliver it.</h2>
      </div>
      <p>
        A spreadsheet may show that the math balances. The next question is whether you have enough hours, crew capacity and qualified demand to reach that target. MyBreakeven keeps those questions in one practical planning flow for owner-operators.
      </p>
    </section>
    <section className="about-principles" aria-label="How MyBreakeven works">
      <article>
        <span>01</span><Sparkles />
        <h2>Your assumptions stay visible</h2>
        <p>Every result begins with the costs, prices and capacity you enter. Change an input and see what moves.</p>
      </article>
      <article>
        <span>02</span><ShieldCheck />
        <h2>The formulas do the math</h2>
        <p>Deterministic calculations produce the numbers. Explanations add context; they do not replace the formula.</p>
      </article>
      <article>
        <span>03</span><CheckCircle2 />
        <h2>Feasibility comes next</h2>
        <p>The plan is checked against sales volume, workload and lead demand so an attractive target does not hide an impossible operation.</p>
      </article>
    </section>
    <section className="about-journey">
      <header>
        <span className="journey-kicker"><i /> FROM IDEA TO DECISION</span>
        <h2>One clean path through the numbers.</h2>
        <p>Use the result as a planning baseline, then revise it when your real costs or capacity change.</p>
      </header>
      <div>
        <article><b>01</b><h3>Choose your model</h3><p>Start with the calculator built around how your business sells and delivers work.</p></article>
        <article><b>02</b><h3>Enter real assumptions</h3><p>Add fixed costs, per-sale costs, owner pay, pricing and available capacity.</p></article>
        <article><b>03</b><h3>Read the whole result</h3><p>Review break-even revenue alongside sales volume, customer demand and workload.</p></article>
        <article><b>04</b><h3>Test a safer case</h3><p>Lower demand, raise a cost or adjust pricing before committing cash and time.</p></article>
      </div>
    </section>
    <section className="journey-cta">
      <div><span>READY WHEN YOU ARE</span><h2>Put your own assumptions through the model.</h2></div>
      <a href="/#calculator">Open the free calculator <span aria-hidden="true">↗</span></a>
    </section>
  </>
);
const supportEmailAddress = "support@mybreakeven.com";
const emailProviderUrl = (provider, subject) => {
  const email = encodeURIComponent(supportEmailAddress);
  const topic = encodeURIComponent(subject);
  return provider === "outlook"
    ? `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${topic}`
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${topic}`;
};
const SupportEmailLink = ({ subject, children }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(supportEmailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this support email:", supportEmailAddress);
    }
  };
  return <>
    <button type="button" className="support-email-trigger" onClick={() => setOpen(true)}>{children}</button>
    {open && <div className="email-panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="email-panel" role="dialog" aria-modal="true" aria-labelledby="email-panel-title">
        <button className="email-panel-close" type="button" onClick={() => setOpen(false)} aria-label="Close email options">×</button>
        <span className="email-panel-icon"><Mail /></span>
        <small>CONTACT MYBREAKEVEN</small>
        <h2 id="email-panel-title">Choose how you want to email us.</h2>
        <p>Your message will be addressed to <strong>{supportEmailAddress}</strong> with the subject ready.</p>
        <div className="email-provider-actions">
          <a href={emailProviderUrl("gmail", subject)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Continue with Gmail <span>↗</span></a>
          <a href={emailProviderUrl("outlook", subject)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Continue with Outlook <span>↗</span></a>
        </div>
        <button className="email-copy-action" type="button" onClick={copyAddress}>{copied ? "Email copied" : "Copy email address"}</button>
      </section>
    </div>}
  </>;
};
const Contact = () => (
  <>
    <section className="contact-hero">
      <div>
        <span className="journey-kicker"><i /> CONTACT MYBREAKEVEN</span>
        <h1>Tell us what you are trying to work out.</h1>
        <p>Send the business type, the page you were using and the question you need answered. Clear context helps us give you a useful reply.</p>
      </div>
      <aside className="contact-inbox">
        <Mail />
        <small>PRIMARY SUPPORT INBOX</small>
        <SupportEmailLink subject="MyBreakeven support request">support@mybreakeven.com <span aria-hidden="true">↗</span></SupportEmailLink>
        <p>Product questions, account support, calculator feedback and industry requests.</p>
      </aside>
    </section>
    <section className="contact-route" aria-label="Contact options">
      <article>
        <span>01</span>
        <h2>Calculator feedback</h2>
        <p>Share the calculator, input or result that needs attention. Do not include passwords or payment-card details.</p>
        <SupportEmailLink subject="Calculator feedback">Email calculator feedback ↗</SupportEmailLink>
      </article>
      <article>
        <span>02</span>
        <h2>Account or billing</h2>
        <p>Include the email attached to your account and a short description of the issue. Never send your password.</p>
        <SupportEmailLink subject="Account or billing support">Request account support ↗</SupportEmailLink>
      </article>
      <article>
        <span>03</span>
        <h2>Industry request</h2>
        <p>Tell us the business model, what it sells and which costs or capacity limits should be included.</p>
        <SupportEmailLink subject="New industry request">Suggest an industry ↗</SupportEmailLink>
      </article>
    </section>
    <section className="contact-brief">
      <div>
        <span className="journey-kicker"><i /> A USEFUL SUPPORT NOTE</span>
        <h2>Three details help us understand the problem faster.</h2>
      </div>
      <ol>
        <li><b>01</b><span><strong>Where were you?</strong>Include the page or calculator name.</span></li>
        <li><b>02</b><span><strong>What did you expect?</strong>Describe the result or behaviour you expected.</span></li>
        <li><b>03</b><span><strong>What happened instead?</strong>Add the exact message and a screenshot when useful.</span></li>
      </ol>
    </section>
    <section className="contact-final">
      <div><small>ONE INBOX. THE RIGHT CONTEXT.</small><h2>Ready to send your question?</h2></div>
      <SupportEmailLink subject="MyBreakeven support request">Email support <span aria-hidden="true">↗</span></SupportEmailLink>
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
      ["Account controls", "You may request access, correction or deletion of account information by emailing support@mybreakeven.com. Authentication records may be retained where reasonably required for security, fraud prevention or legal compliance."],
      ["Analytics", "With your permission, Google Analytics measures pages viewed, approximate location, device and browser information, traffic sources and interactions. We do not send calculator inputs, account passwords or saved scenario contents to Google Analytics. You can reject optional analytics without losing access to the service."],
      ["Error monitoring", "We use Sentry to receive technical error details needed to diagnose failures. Default personally identifiable information, session replay, logs and performance tracing are disabled. Query strings, request headers, cookies, request bodies and user identity are removed before an error is sent."],
      ["Service providers", "We use carefully selected providers for hosting, analytics, authentication, email and future payments. Each provider processes data for its stated service and under its own applicable terms."],
      ["Your choices", "You may ask about, correct or request deletion of personal information you have directly provided by emailing support@mybreakeven.com."],
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
      ["Contact", "Questions about these terms can be sent to support@mybreakeven.com."],
    ],
  },
  "/refund-policy": {
    eyebrow: "BILLING",
    title: "Refund Policy",
    intro: "Cancellation and refund terms for paid MyBreakeven subscriptions.",
    sections: [
      ["Subscription billing", "MyBreakeven Pro is billed monthly through Polar at the price shown during checkout."],
      ["Subscription cancellation", "Customers can cancel renewal through the billing customer portal. Access will normally continue through the paid billing period."],
      ["Refund requests", "If a billing error, duplicate charge or material service problem occurs, contact us promptly at support@mybreakeven.com. Eligible requests will be reviewed fairly under applicable consumer law and the checkout provider's rules."],
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
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <span><i /> MYBREAKEVEN JOURNAL</span>
            <h1>Clear numbers for <em>real business decisions.</em></h1>
            <p>Practical guides to pricing, startup costs, margins and break-even—written for owners doing the work.</p>
            <div className="blog-hero-actions"><a href="#blog">Browse all guides <span aria-hidden="true">↓</span></a><a href="/#calculator">Open calculator <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="blog-hero-index" aria-label="Guide library summary">
            <div><strong>32</strong><span>focused guides</span></div>
            <div><strong>8</strong><span>business models</span></div>
            <p><span>Pricing</span><span>Startup</span><span>Margins</span><span>Break-even</span></p>
          </div>
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
