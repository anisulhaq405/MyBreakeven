import { SalonClusterLink } from './SalonCluster.jsx';
import { MobileDetailingClusterLink } from './MobileDetailingCluster.jsx';
import { LandscapingClusterLink } from './LandscapingCluster.jsx';
import { CleaningClusterLink } from './CleaningCluster.jsx';
import { trackProductEvent } from "./productAnalytics";
const salonPlanningSection = {"heading": "Test salon appointments against productive chair hours", "text": "Use complete appointment worker-hours and actual available productive time. Suppose a salon needs $6,000 contribution each month and leaves $60 per appointment. It needs 100 appointments. If each requires 1.5 delivery hours, that is 150 hours of work. A plan with only 135 productive hours has capacity for 90 whole appointments and does not fit the target.\n\nRetail purchases can add contribution, but they should not be treated as extra chair appointments. Model the service mix and product economics consistently. No-shows can consume reserved time without producing the planned paid service. Track cancellations and rebooked slots rather than assuming every diary entry creates revenue.\n\nOwner pay remains explicit in the monthly amount to cover. A booth-rental arrangement and an employee-service arrangement have different revenue and cost boundaries; avoid mixing their fields. The calculator shows an assumption-based capacity and contribution test, not a guarantee of appointment demand or salon profitability.", "question": "Does a full diary prove the salon covers its costs?", "answer": "No. Entries can include unpaid gaps, no-shows and services with different contribution. Compare paid delivered appointments, their costs and productive hours with the monthly requirement."};
import { toolThemes } from './toolThemes.js';
import './tool-themes.css';
import React, { useMemo, useState } from "react";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import { stageCalculatorPlan } from "./calculatorTransfer";
import { calculate } from "./engine";
import { fieldLabels, industries } from "./industries";
import CostBuilder from "./CostBuilder";
import { builtFields } from "./costBuilder";

export const industryPages = {
  "cleaning-business-break-even-calculator": { key: "cleaning", title: "Cleaning Business Break-Even Calculator", lead: "Calculate the monthly cleaning jobs, leads and team hours needed to cover overhead, owner pay and your profit goal.", costs: "cleaning supplies, direct labor, travel, equipment use, card fees and lead-generation cost", questions: ["How many cleaning jobs do I need to break even?", "Can my cleaners deliver the required monthly jobs?", "How many cleaning leads does my conversion rate require?"] },
  "landscaping-break-even-calculator": { key: "landscaping", title: "Landscaping Break-Even Calculator", lead: "Enter your landscaping job price and costs to calculate monthly job targets, revenue and crew capacity. Set owner pay and target profit to zero to check operating break-even.", costs: "plants and materials, crew labor, fuel, equipment use, payment fees and customer acquisition", questions: ["How many landscaping jobs cover monthly overhead?", "Is current crew capacity enough for the target?", "How does average job price change break-even volume?"] },
  "photography-business-break-even-calculator": { key: "photography", title: "Photography Business Break-Even Calculator", lead: "Turn session pricing, editing time, travel, booking costs and studio overhead into an exact monthly session target.", costs: "session materials, photographer labor, editing, gallery delivery, travel, payment fees and booking acquisition", questions: ["How many photography sessions do I need each month?", "Does editing time create a capacity gap?", "What average session price supports owner pay?"] },
  "agency-break-even-calculator": { key: "agency", title: "Agency and Freelancer Break-Even Calculator", lead: "Calculate required retainers, client leads and delivery capacity using contractor costs, software, labor and acquisition assumptions.", costs: "delivery labor, contractors, client software, payment fees and sales acquisition", questions: ["How many retainer clients cover agency overhead?", "How much delivery capacity does the team have?", "How many qualified leads are needed to win the target clients?"] },
  "mobile-detailing-break-even-calculator": { key: "detailing", title: "Mobile Detailing Break-Even Calculator", lead: "Estimate required detailing jobs and bookings after supplies, technician labor, travel, equipment and local marketing costs.", costs: "detailing products, technician labor, water, travel, equipment use, fees and booked-job acquisition", questions: ["How many detailing jobs are needed to break even?", "Can the mobile team serve enough vehicles?", "How does price affect monthly booking requirements?"] },
  "ecommerce-break-even-calculator": { key: "ecommerce", title: "E-commerce Break-Even Calculator", lead: "Calculate exact break-even orders and revenue after COGS, fulfillment, shipping subsidy, returns, platform fees and paid acquisition.", costs: "COGS, fulfillment labor, shipping subsidy, return allowance, payment or platform fees and customer acquisition cost", questions: ["How many e-commerce orders are needed to break even?", "What revenue covers overhead and advertising?", "How do returns and shipping affect contribution margin?"] },
  "restaurant-break-even-calculator": { key: "restaurant", title: "Restaurant Break-Even Calculator", lead: "Convert average check, food cost, direct labor, packaging, delivery commission and overhead into required monthly orders.", costs: "food and ingredients, direct labor, packaging, delivery commissions, card fees and promotion", questions: ["How many restaurant orders cover monthly fixed costs?", "What sales revenue reaches break-even?", "Can kitchen and service capacity handle required demand?"] },
  "salon-break-even-calculator": { key: "salon", title: "Salon Break-Even Calculator", lead: "Estimate appointments, revenue and customer inquiries using service price, product usage, stylist labor and chair capacity.", costs: "service products, stylist labor, disposables, laundry, payment fees and appointment acquisition", questions: ["How many salon appointments are needed to break even?", "What revenue covers rent and owner pay?", "Are stylist hours sufficient for the target appointments?"] },
};

const operationalLinks = {"cleaning": ["cleaning-contract-profit-calculator", "Cleaning Contract Profit Calculator"], "landscaping": ["lawn-route-profit-calculator", "Lawn Route Profit Calculator"], "detailing": ["detailing-chemical-cost-calculator", "Detailing Chemical Cost Calculator"], "salon": ["hair-color-product-cost-calculator", "Hair Color Product Cost Calculator"], "ecommerce": ["ecommerce-return-cost-calculator", "Ecommerce Return Cost Calculator"]};

const industryGuideSlugs = {
  cleaning: "cleaning-business-break-even", landscaping: "landscaping-break-even",
  photography: "photography-business-break-even", agency: "agency-break-even",
  detailing: "mobile-detailing-break-even", ecommerce: "ecommerce-break-even",
  restaurant: "restaurant-break-even", salon: "salon-break-even",
};

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

function answerQuestion(question, result, industry) {
  const unit = industry.unit;
  const v = industry.values;
  if (/price|returns|shipping/i.test(question)) {
    return `In this example, each ${industry.singular} contributes ${money(result.contribution)} after direct costs and fees. Changing the price or a per-${industry.singular} cost changes that contribution and therefore the number of ${unit} needed. Enter your own assumptions to see the effect.`;
  }
  if (/capacity|crew|team|cleaners|editing|kitchen|stylist|mobile|handle|serve/i.test(question)) {
    return `The example requires ${result.wholeJobs} whole ${unit} and estimates capacity for ${result.wholeCapacity} whole ${unit} per month, using ${v.workers} team members, ${v.hoursPerWorker} hours each per week and ${v.utilizationPct}% productive time. Adjust those inputs to check your own delivery limit.`;
  }
  if (/leads|inquiries|bookings/i.test(question)) {
    return `At the example ${v.conversionPct}% inquiry-to-${industry.singular} conversion rate, the model estimates ${result.leads.toFixed(2)} inquiries for the exact fractional financial target (${result.wholeLeads} rounded up). Use your measured conversion rate for a more useful demand estimate.`;
  }
  return `At the example price of ${money(v.price)}, each ${industry.singular} contributes ${money(result.contribution)} after direct costs and fees. Covering ${money(result.fixedNeed)} in overhead, owner pay and target profit requires ${result.wholeJobs} whole ${unit}, or ${money(result.practicalRevenue)} in practical monthly sales. Replace these sample inputs with your figures.`;
}

function IndustryQuickCalculator({ industry, industryKey }) {
  const [values, setValues] = useState(() => ({ ...industry.values }));
  const result = useMemo(() => calculate(values), [values]);
  const fields = fieldLabels(industry);
  const [transferError, setTransferError] = useState("");

  return <section className="industry-quick-calculator" id="industry-calculator" aria-labelledby="industry-calculator-title">
    <div className="industry-quick-intro">
      <span>TRY YOUR OWN NUMBERS · USD</span>
      <h2 id="industry-calculator-title">Calculate your {industry.short.toLowerCase()} break-even point</h2>
      <p>Replace the example inputs below. Results update in your browser as you type. Enter monthly totals for overhead, owner pay and target profit; enter direct costs per {industry.singular} separately.</p>
    </div>
    <div className="industry-quick-fields">
      {fields.map(([label, key, suffix, options = {}]) => <label key={key}>
        <span>{label}</span>
        <span className="industry-quick-control">
          {suffix === "$" && <b aria-hidden="true">$</b>}
          <input type="number" inputMode="decimal" min={options.min ?? 0} max={options.max} step={options.step ?? "0.01"} value={values[key]} onChange={event => setValues(current => {
            const next = { ...current, [key]: event.target.value };
            if (builtFields.includes(key)) delete next.costBuilder;
            return next;
          })} aria-invalid={values[key] === ""} />
          {suffix && suffix !== "$" && <b aria-hidden="true">{suffix}</b>}
        </span>
      </label>)}
    </div>
    <CostBuilder industryKey={industryKey} input={values} onApply={patch => setValues(current => ({ ...current, ...patch }))} />
    {result.valid ? <div className="industry-quick-results" aria-live="polite">
      <div><span>Contribution per {industry.singular}</span><strong>{money(result.contribution)}</strong></div>
      <div><span>Whole {industry.unit} for your target</span><strong>{result.wholeJobs.toLocaleString("en-US")}</strong></div>
      <div><span>Monthly sales at that volume</span><strong>{money(result.practicalRevenue)}</strong></div>
      <p>The whole-unit target needs approximately {result.practicalLeads.toLocaleString("en-US")} inquiries at your assumed conversion rate. This is a planning requirement, not a demand forecast.</p>
      <p>At these assumptions, estimated delivery capacity is {result.wholeCapacity.toLocaleString("en-US")} whole {industry.unit} per month. {result.wholeCapacity < result.wholeJobs ? "The current capacity is below the required volume." : "The estimated capacity covers the required volume."} These are planning estimates, not a sales forecast.</p>
    </div> : <p className="industry-quick-error" role="status">{result.message}</p>}
    <div className="industry-quick-actions">
      <button type="button" onClick={() => setValues({ ...industry.values })}>Reset example</button>
      <a href={`/?industry=${industryKey}&from=industry#calculator`} onClick={event => {
        let saved = false;
        try { saved = stageCalculatorPlan(industryKey, values, window.sessionStorage); } catch { /* Storage can be disabled. */ }
        if (saved) trackProductEvent("calculator_continue", industryKey);
        if (!saved) {
          event.preventDefault();
          setTransferError(result.valid ? "Your browser could not carry these inputs. Allow session storage or keep using this calculator; your edited numbers are still here." : "Correct the inputs above before continuing with this plan.");
        }
      }}>Continue with these numbers in the full calculator <ArrowRight /></a>
    </div>
    {transferError && <p className="industry-quick-error" role="status">{transferError}</p>}
  </section>;
}

export default function IndustryPage({ slug }) {
  const page = industryPages[slug];
  if (!page) return null;
  const industry = industries[page.key];
  const example = calculate(industry.values);
  return (
    <div className="industry-tool-theme" style={toolThemes[page.key]}>
      {page.key === "salon" && <SalonClusterLink />}{page.key === "cleaning" && <CleaningClusterLink />}{page.key === "landscaping" && <LandscapingClusterLink />}{page.key === "detailing" && <MobileDetailingClusterLink />}{operationalLinks[page.key] && <aside className="tool-related"><p>Check a specific cost decision: <a href={`/calculators/${operationalLinks[page.key][0]}/`}>{operationalLinks[page.key][1]}</a>.</p></aside>}{page.key === 'salon' && <aside className="tool-related"><p>Measure repeat-visit economics with the <a href="/calculators/salon-rebooking-calculator/">salon rebooking calculator</a>, then separate missed revenue from contribution using the <a href="/calculators/salon-no-show-profit-loss-calculator/">no-show profit loss calculator</a>.</p></aside>}{page.key === 'detailing' && <aside className="tool-related"><p>Compare nearby and distant jobs with the <a href="/calculators/mobile-detailing-travel-profit-calculator/">mobile detailing travel profit calculator</a> before accepting a lower hourly return.</p></aside>}<section className="industry-hero">
        <div>
          <span>FREE INDUSTRY CALCULATOR</span>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <a className="page-button industry-cta" href="#industry-calculator">Use the free calculator <ArrowRight /></a>
        </div>
        <aside>
          <small>EXAMPLE MODEL</small>
          <strong>{money(example.revenue)}</strong>
          <span>sample revenue target including owner pay and profit, before rounding up to whole {industry.unit}</span>
          <div><b>{example.jobs.toFixed(2)}</b> {industry.unit} required</div>
          <div><b>{example.wholeCapacity}</b> whole {industry.unit} capacity</div>
        </aside>
      </section>
      <figure className="industry-tool-feature"><img src={`/images/tools/${page.key}-break-even.webp`} alt={`${industry.short} break-even planning: direct costs, contribution, monthly sales target and working capacity.`} width="1200" height="675" decoding="async"/><figcaption>A {industry.short.toLowerCase()} planning model: use your own price, costs and delivery capacity.</figcaption></figure>
      <IndustryQuickCalculator key={page.key} industry={industry} industryKey={page.key} />
      <section className="industry-content">
        <div className="industry-copy"><h2>Check the next business decision</h2><p>{page.key === "ecommerce" ? <a href="/calculators/break-even-roas-calculator/">Calculate break-even ad returns after order costs and fees</a> : page.key === "agency" || page.key === "photography" ? <a href="/calculators/hourly-rate-calculator/">Calculate a billing rate from income and billable hours</a> : <a href="/calculators/discount-break-even-calculator/">Check how many extra sales a discount needs</a>} before changing your plan. Use the <a href="/calculators/cash-runway-calculator/">cash runway calculator</a> to compare available cash with expected receipts and payments.</p></div>
        <div className="industry-copy">
          <span>INDUSTRY-SPECIFIC UNIT ECONOMICS</span>
          <h2>What this {industry.short.toLowerCase()} break-even analysis includes</h2>
          <p>This model calculates contribution per {industry.singular} after {page.costs}. It then determines the exact volume and revenue required to cover monthly operating overhead, owner compensation and an optional target profit.</p>
          <p>Because a financial target is useful only when the business can deliver it, MyBreakeven also compares required volume with productive team hours and estimates the customer inquiries needed at your conversion rate.</p>
        </div>
        <div className="industry-benefits">
          <article><BarChart3 /><h3>Exact financial target</h3><p>See fractional break-even volume, exact revenue and the minimum practical whole-unit target separately.</p></article>
          <article><CheckCircle2 /><h3>Operational feasibility</h3><p>Compare required {industry.unit} with estimated monthly delivery capacity before committing to the plan.</p></article>
          <article><ShieldCheck /><h3>Private and transparent</h3><p>Inputs stay in your browser, while the formula trace explains how each result was calculated.</p></article>
        </div>
        <div className="industry-copy">
          <h2>Formula, assumptions and rounding</h2>
          <p>Contribution per {industry.singular} = average price minus direct materials, labor, other variable costs, acquisition cost and percentage payment fees. Required monthly {industry.unit} = (operating overhead + owner pay + target profit) divided by contribution per {industry.singular}.</p>
          <p>For a traditional operating break-even calculation, set owner pay and target profit to zero. Keep owner pay if you want the business to cover your compensation, and add profit only when calculating a profit target. The example values are illustrative USD inputs, not industry averages.</p>
          <p>The example contribution is {money(example.contribution)} per {industry.singular}. The exact target is {example.jobs.toFixed(2)} {industry.unit}; rounding up gives {example.wholeJobs.toLocaleString("en-US")} whole {industry.unit} and {money(example.practicalRevenue)} in monthly sales. Costs entered per {industry.singular} must not also be included in monthly overhead.</p>
          <p>Capacity uses team members × weekly hours × 52 / 12 × productive utilization ÷ delivery hours per {industry.singular}. Delivery hours mean total team labor hours per {industry.singular}, including preparation and travel where relevant. Whole-unit capacity rounds down, while required sales round up.</p>
          <p>Inquiry estimates use your assumed conversion rate, not a prediction of demand. For recurring work, count existing customers separately from new customer acquisition. The full calculator supports other currency labels; it does not convert exchange rates.</p>
          <p><a href={`/blogs/${industryGuideSlugs[page.key]}/`}>Read the {industry.short.toLowerCase()} break-even guide</a></p>
          <p><a href="/#methodology">Read the calculation methodology</a> · <a href="/blogs/">Browse business planning guides</a></p>
        </div>
        {page.key === "salon" && <section className="industry-copy"><h2>{salonPlanningSection.heading}</h2>{salonPlanningSection.text.split("\n\n").map(p=><p key={p}>{p}</p>)}<h3>{salonPlanningSection.question}</h3><p>{salonPlanningSection.answer}</p></section>}<div className="industry-faq">
          <span>QUESTIONS THIS MODEL ANSWERS</span>
          <h2>{industry.short} break-even questions</h2>
          {page.questions.map((question) => <details key={question}><summary>{question}</summary><p>{answerQuestion(question, example, industry)}</p></details>)}
        </div>
      </section>
    </div>
  );
}
