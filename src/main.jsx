import React, { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { calculate } from "./engine";
import { fieldLabels, industries } from "./industries";
import Insights from "./Insights";
import HomeBlogShowcase from "./HomeBlogShowcase";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import HomeSEO from "./HomeSEO";
import AnalyticsConsent from "./AnalyticsConsent";
import { POLAR_CHECKOUT_URL } from "./billing";
import "./styles.css";
import "./industries.css";
import "./visuals.css";
import "./home-presentation.css";
const SecondaryPage = lazy(() => import("./Pages"));
const ScenarioTools = lazy(() => import("./ScenarioTools"));
const quantity = (n) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n || 0);
function App() {
  const [showTools, setShowTools] = useState(false);
  const initialIndustry = new URLSearchParams(window.location.search).get("industry");
  const startingIndustry = industries[initialIndustry] ? initialIndustry : "cleaning";
  const [industryKey, setIndustryKey] = useState(startingIndustry),
    [input, setInput] = useState(industries[startingIndustry].values),
    [currency, setCurrency] = useState("USD");
  const currencySymbol = new Intl.NumberFormat("en-US", { style: "currency", currency, currencyDisplay: "narrowSymbol" }).formatToParts(0).find(p => p.type === "currency")?.value || currency;
  const industry = industries[industryKey],
    fields = fieldLabels(industry);
  const result = useMemo(() => calculate(input), [input]);
  const set = (k, v) => setInput((s) => ({ ...s, [k]: v }));
  const normalize = (k, value, options = {}) => {
    if (value === "") return;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return set(k, "");
    const stepped = options.step === 1 ? Math.round(parsed) : parsed;
    set(k, Math.min(options.max ?? Number.POSITIVE_INFINITY, Math.max(options.min ?? 0, stepped)));
  };
  const choose = (k) => {
    setIndustryKey(k);
    setInput({ ...industries[k].values });
  };
  useEffect(() => {
    const scenarioId = new URLSearchParams(window.location.search).get("scenario");
    if (!scenarioId) return;
    import("./authClient").then(async ({ supabase }) => {
      if (!supabase) return;
      const { data } = await supabase.from("saved_scenarios").select("industry_key,currency,inputs").eq("id", scenarioId).single();
      if (!data || !industries[data.industry_key]) return;
      setIndustryKey(data.industry_key);
      setInput(data.inputs);
      setCurrency(data.currency);
      requestAnimationFrame(() => document.getElementById("calculator")?.scrollIntoView());
    });
  }, []);
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  useEffect(() => {
    if (path !== "/") return;
    const target = document.getElementById("scenario-tools-anchor");
    if (!target || !window.IntersectionObserver) {
      setShowTools(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) return;
      setShowTools(true);
      observer.disconnect();
    }, { rootMargin: "600px 0px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [path]);
  if (path !== "/") return <Suspense fallback={<main className="page-hero"><h1>Loading page…</h1></main>}><SecondaryPage path={path} /></Suspense>;
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="intro calculator-hero" id="calculator">
          <div className="hero-visual">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <div className="mini-card">
              <div className="mini-head">
              <span>{industry.short} feasibility</span>
              <span className="good">
                {result.valid && result.gap >= 0 ? "FEASIBLE" : "REVIEW"}
              </span>
              </div>
              <div className="ai-signal">
                <Sparkles />
                <span><b>AI insight layer</b> Verified inputs · Explainable output</span>
              </div>
            <div className="dial">
              <div>
                <strong>{result.valid ? result.score : 0}</strong>
                <small>/100</small>
              </div>
            </div>
            <div className="mini-grid">
              <span>
                {industry.unit} needed
                <strong>{result.valid ? quantity(result.jobs) : "—"}</strong>
              </span>
              <span>
                Capacity<strong>{result.valid ? quantity(result.capacity) : "—"}</strong>
              </span>
              <span>
                <BarChart3 /> Inquiries<strong>{result.valid ? quantity(result.leads) : "—"}</strong>
              </span>
            </div>
            <p>
              <Info /> Live model updates as you edit the calculator.
            </p>
            <a className="hero-calculator-cta" href="#calculator-inputs">Edit your assumptions <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="hero-calculator-panel" id="calculator-inputs">
            <div className="hero-calculator-heading">
              <div>
                <span>FREE INDUSTRY CALCULATOR</span>
                <h1>Build your break-even plan.</h1>
                <p>Choose your model and adjust the monthly assumptions.</p>
              </div>
              <span className="live-pill"><i /> Live</span>
            </div>
            <div className="calculator-selectors">
              <label>
                <span><BriefcaseBusiness /> Business model</span>
                <div className="select-shell">
                  <select value={industryKey} onChange={event => choose(event.target.value)}>
                    {Object.entries(industries).map(([key, item]) => <option value={key} key={key}>{item.short}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </label>
              <label>
                <span><b>{currencySymbol}</b> Currency</span>
                <div className="select-shell">
                  <select value={currency} onChange={e => setCurrency(e.target.value)}>
                    {["USD","EUR","GBP","CAD","AUD","NZD","AED","SAR","PKR","INR","BDT","SGD","MYR","ZAR","JPY","CHF","SEK","NOK","DKK"].map(code => <option key={code}>{code}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </label>
            </div>
            <div className="inputs hero-inputs">
              <div className="panel-head">
                <div>
                  <span className="step">01</span>
                  <h3>{industry.short} operating model</h3>
                </div>
                <button onClick={() => setInput({ ...industry.values })}>
                  Reset example
                </button>
              </div>
              <div className="field-grid">
                {fields.map(([label, key, suffix, options = {}]) => (
                  <label key={key}>
                    <span>{label}</span>
                    <div className="control">
                      {suffix === "$" && <b>{currencySymbol}</b>}
                      <input
                        type="number"
                        min={options.min ?? 0}
                        max={options.max}
                        step={options.step ?? "0.01"}
                        inputMode="decimal"
                        value={input[key]}
                        onChange={(e) => set(key, e.target.value)}
                        onBlur={(e) => normalize(key, e.target.value, options)}
                        aria-invalid={input[key] === ""}
                      />
                      {suffix && suffix !== "$" && <i>{suffix}</i>}
                    </div>
                  </label>
                ))}
              </div>
              <div className="privacy">
                <ShieldCheck />
                <span>
                  <strong>Private calculation</strong>Your financial inputs are
                  not sent or saved.
                </span>
              </div>
            </div>
          </div>
        </section>
        <Insights result={result} input={input} industry={industry} currency={currency} />
        <div id="scenario-tools-anchor">
          {showTools && <Suspense fallback={<section className="scenario-tools" aria-label="Loading planning tools" />}>
            <ScenarioTools result={result} input={input} industry={industry} industryKey={industryKey} currency={currency} />
          </Suspense>}
        </div>
        <HomeBlogShowcase />
        <section className="proof" id="how">
          <span>ONE NUMBER ISN'T ENOUGH</span>
          <h2>
            A break-even target only works when your business can deliver it.
          </h2>
          <div>
            <article>
              <b>01</b>
              <h3>Economics</h3>
              <p>See the true contribution left after direct costs and fees.</p>
            </article>
            <article>
              <b>02</b>
              <h3>Capacity</h3>
              <p>Check whether your team has enough productive hours.</p>
            </article>
            <article>
              <b>03</b>
              <h3>Demand</h3>
              <p>
                Translate jobs into the leads your conversion rate requires.
              </p>
            </article>
            <article>
              <b>04</b>
              <h3>Resilience</h3>
              <p>
                Test how cost, price, and utilization changes move the target.
              </p>
            </article>
          </div>
        </section>
        <section className="industries" id="industries">
          <div>
            <span>BUILT AROUND HOW YOU WORK</span>
            <h2>Eight focused business models. No generic spreadsheet.</h2>
          </div>
          <div className="chips">
            {Object.entries(industries).map(([key, item]) => (
              <button
                className={key === industryKey ? "active" : ""}
                key={key}
                onClick={() => {
                  choose(key);
                  location.hash = "calculator";
                }}
              >
                {item.short}
              </button>
            ))}
          </div>
        </section>
        <section className="method" id="methodology">
          <div>
            <span>TRANSPARENT BY DESIGN</span>
            <h2>The math comes first.</h2>
            <p>
              Every result exposes its inputs, units, formula, rounding rule and
              engine version. AI may explain verified results later; it will
              never invent or calculate your numbers.
            </p>
          </div>
          <div className="code">
            <small>FORMULA TRACE · ENGINE v1.3.0</small>
            <code>contribution = price - direct_costs - fees</code>
            <code>exact_units = fixed_need / contribution</code>
            <code>required_inquiries = exact_units / conversion</code>
          </div>
        </section>
        <HomeSEO />
        <section className="pricing" id="pricing">
          <span>START WITHOUT AN EMAIL GATE</span>
          <h2>Calculate free. Save when it matters.</h2>
          <div>
            <article>
              <h3>Free</h3>
              <strong>$0</strong>
              <p>
                All eight calculators, live results, formula trace and up to
                three saved scenarios with an optional account.
              </p>
              <button onClick={() => { location.hash = "calculator"; }}>Use calculator</button>
            </article>
            <article className="pro">
              <small>MYBREAKEVEN PRO</small>
              <h3>Pro</h3>
              <strong>
                $9.99 <i>/ month</i>
              </strong>
              <p>
                Advanced charts, profit forecasts, risk sensitivity, capacity
                planning, 100 saved scenarios and downloadable reports.
              </p>
              <button onClick={() => { location.href = POLAR_CHECKOUT_URL; }}>Upgrade to Pro</button>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
const rootElement = document.getElementById("root");
function RevealAfterRender() {
  useLayoutEffect(() => {
    rootElement.removeAttribute("data-booting");
  }, []);
  return null;
}
createRoot(rootElement).render(<><App /><AnalyticsConsent /><RevealAfterRender /></>);
if (import.meta.env.PROD) {
  const startMonitoring = () => { import("./sentry"); };
  if ("requestIdleCallback" in window) window.requestIdleCallback(startMonitoring, { timeout: 3000 });
  else window.setTimeout(startMonitoring, 1500);
}
