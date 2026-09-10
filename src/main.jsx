import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Info,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { calculate } from "./engine";
import { fieldLabels, industries } from "./industries";
import Insights from "./Insights";
import BlogSection from "./BlogSection";
import SecondaryPage from "./Pages";
import { Logo, SiteFooter } from "./SiteChrome";
import ScenarioTools from "./ScenarioTools";
import HomeSEO from "./HomeSEO";
import "./styles.css";
import "./industries.css";
import "./visuals.css";
const money = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);
const quantity = (n) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n || 0);
function App() {
  const initialIndustry = new URLSearchParams(window.location.search).get("industry");
  const startingIndustry = industries[initialIndustry] ? initialIndustry : "cleaning";
  const [industryKey, setIndustryKey] = useState(startingIndustry),
    [input, setInput] = useState(industries[startingIndustry].values),
    [mobile, setMobile] = useState(false),
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
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path !== "/") return <SecondaryPage path={path} />;
  return (
    <>
      <header>
        <Logo />
        <nav className={mobile ? "open" : ""}>
          <a href="/pricing/">Pricing</a>
          <a href="/blogs/">Blogs</a>
          <a href="/about-us/">About Us</a>
          <a href="/contact-us/">Contact Us</a>
          <button className="navCta">
            Start free <ArrowRight />
          </button>
        </nav>
        <button className="menu" onClick={() => setMobile(!mobile)}>
          {mobile ? <X /> : <Menu />}
        </button>
      </header>
      <main id="top">
        <section className="intro">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles /> AI-ready decision intelligence for SMBs
            </div>
            <h1>
              Free break-even calculator
              <br />
              <em>for small businesses.</em>
            </h1>
            <p>
              Calculate exact break-even revenue, required sales volume, team
              capacity and customer demand with an industry-specific feasibility report.
            </p>
            <div className="trust">
              <span>
                <CheckCircle2 /> No signup
              </span>
              <span>
                <CheckCircle2 /> Private by default
              </span>
              <span>
                <CheckCircle2 /> Formula-backed
              </span>
            </div>
          </div>
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
                Inquiries<strong>{result.valid ? quantity(result.leads) : "—"}</strong>
              </span>
            </div>
            <p>
              <Info /> Live model updates as you edit the calculator.
            </p>
            </div>
          </div>
        </section>
        <section className="calculator" id="calculator">
          <div className="section-title">
            <span>FREE INDUSTRY CALCULATORS</span>
            <h2>Can your {industry.name.toLowerCase()} break even?</h2>
            <p>Choose a business model, then edit its monthly assumptions.</p>
            <label className="currency-select">Currency <select value={currency} onChange={e => setCurrency(e.target.value)}>{["USD","EUR","GBP","CAD","AUD","NZD","AED","SAR","PKR","INR","BDT","SGD","MYR","ZAR","JPY","CHF","SEK","NOK","DKK"].map(code => <option key={code}>{code}</option>)}</select><small>Amounts are labeled, not converted.</small></label>
          </div>
          <div
            className="industry-picker"
            role="tablist"
            aria-label="Choose a business model"
          >
            {Object.entries(industries).map(([key, item]) => (
              <button
                role="tab"
                aria-selected={key === industryKey}
                className={key === industryKey ? "active" : ""}
                key={key}
                onClick={() => choose(key)}
              >
                <span>{item.short}</span>
                <small>{item.source}</small>
              </button>
            ))}
          </div>
          <div className="workspace">
            <div className="inputs">
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
            <div className="results">
              <div className="result-head">
                <div>
                  <span>LIVE RESULTS</span>
                  <h3>Your monthly break-even plan</h3>
                </div>
                <div
                  className={
                    result.valid && result.gap >= 0
                      ? "badge good"
                      : "badge warn"
                  }
                >
                  {result.valid
                    ? result.gap >= 0
                      ? "Feasible"
                      : "Capacity gap"
                    : "Fix pricing"}
                </div>
              </div>
              {!result.valid ? (
                <div className="alert">{result.message}</div>
              ) : (
                <>
                  <div className="hero-result">
                    <span>Break-even revenue</span>
                    <strong>{money(result.revenue, currency)}</strong>
                    <small>
                      Exact: {quantity(result.jobs)} {industry.unit} × {money(input.price, currency)} average price
                    </small>
                  </div>
                  <div className="metrics">
                    <article>
                      <Target />
                      <span>
                        {industry.unit} needed
                        <strong>
                          {quantity(result.jobs)}
                          <small>/ month</small>
                        </strong>
                      </span>
                    </article>
                    <article>
                      <BriefcaseBusiness />
                      <span>
                        Delivery capacity
                        <strong>
                          {quantity(result.capacity)}
                          <small>{industry.unit} / month</small>
                        </strong>
                      </span>
                    </article>
                    <article>
                      <BarChart3 />
                      <span>
                        Inquiries required
                        <strong>
                          {quantity(result.leads)}
                          <small>/ month</small>
                        </strong>
                      </span>
                    </article>
                  </div>
                  <div className="capacity">
                    <div>
                      <span>Capacity used</span>
                      <strong>
                        {quantity((result.jobs / result.capacity) * 100)}%
                      </strong>
                    </div>
                    <div className="bar">
                      <i
                        style={{
                          width: `${Math.min(100, (result.jobs / result.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                    <p>
                      {result.gap >= 0
                        ? `You have room for ${quantity(result.gap)} more ${industry.unit} each month.`
                        : `You need capacity for ${quantity(Math.abs(result.gap))} additional ${industry.unit}.`}
                    </p>
                  </div>
                  <details>
                    <summary>
                      Show the formula trace <ChevronDown />
                    </summary>
                    <p>
                      Contribution per {industry.singular} = Price − direct
                      costs − direct labor − payment fees ={" "}
                      <strong>{money(result.contribution, currency)}</strong>. Required{" "}
                      {industry.unit} = (overhead + owner pay + target profit) ÷
                      contribution = <strong>{quantity(result.jobs)}</strong> exact {industry.unit}. For real-world planning, use at least <strong>{result.wholeJobs}</strong> whole {industry.unit}, producing {money(result.practicalRevenue, currency)}.
                    </p>
                  </details>
                </>
              )}
            </div>
          </div>
        </section>
        <Insights result={result} input={input} industry={industry} currency={currency} />
        <ScenarioTools result={result} input={input} industry={industry} currency={currency} />
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
            <small>FORMULA TRACE · ENGINE v1.1.0</small>
            <code>contribution = price - direct_costs - fees</code>
            <code>exact_units = fixed_need / contribution</code>
            <code>required_inquiries = exact_units / conversion</code>
          </div>
        </section>
        <HomeSEO />
        <BlogSection />
        <section className="pricing" id="pricing">
          <span>START WITHOUT AN EMAIL GATE</span>
          <h2>Calculate free. Save when it matters.</h2>
          <div>
            <article>
              <h3>Free</h3>
              <strong>$0</strong>
              <p>
                Anonymous calculator, live results, formula trace and one
                business model.
              </p>
              <button onClick={() => { location.hash = "calculator"; }}>Use calculator</button>
            </article>
            <article className="pro">
              <small>PLANNED PRO</small>
              <h3>Pro</h3>
              <strong>
                $19 <i>/ month</i>
              </strong>
              <p>
                Saved scenarios, comparisons, cost-drift tracking and
                downloadable reports.
              </p>
              <button onClick={() => { location.href = "/contact-us/"; }}>Join the early list</button>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
