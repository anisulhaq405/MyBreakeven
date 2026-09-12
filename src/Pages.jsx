import React, { useEffect } from "react";
import { CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import BlogSection from "./BlogSection";
import BlogArticle from "./BlogArticle";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import IndustryPage, { industryPages } from "./IndustryPage";
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
          <p>
            Live industry calculator, feasibility score, visual analysis and
            formula trace.
          </p>
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
          <p>
            Saved scenarios, comparisons, cost-drift tracking and downloadable
            reports.
          </p>
          <a className="page-button" href="/contact-us/">
            Join the early list
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
export default function SecondaryPage({ path }) {
  const pageMeta = {
    "/pricing": ["Break-Even Calculator Pricing | MyBreakeven", "Use the free MyBreakeven calculator, or explore upcoming planning tools for saved scenarios, comparisons and downloadable reports."],
    "/blogs": ["Small Business Break-Even Guides | MyBreakeven", "Read practical break-even guides for cleaning, landscaping, photography, agencies, mobile detailing, e-commerce, restaurants and salons."],
    "/about-us": ["About MyBreakeven | Formula-Backed Business Planning", "Learn how MyBreakeven turns contribution margin, sales demand and operating capacity into transparent business planning estimates."],
    "/contact-us": ["Contact MyBreakeven", "Contact MyBreakeven about calculator feedback, industry requests, partnerships or formula-backed business planning tools."],
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
  const content = calculatorSlug && industryPages[calculatorSlug] ? <IndustryPage slug={calculatorSlug} /> : slug ? <BlogArticle slug={slug} /> :
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
