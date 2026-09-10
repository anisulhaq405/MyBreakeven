import React from "react";
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from "lucide-react";
import { calculate } from "./engine";
import { industries } from "./industries";

export const industryPages = {
  "cleaning-business-break-even-calculator": { key: "cleaning", title: "Cleaning Business Break-Even Calculator", lead: "Calculate the monthly cleaning jobs, leads and team hours needed to cover overhead, owner pay and your profit goal.", costs: "cleaning supplies, direct labor, travel, equipment use, card fees and lead-generation cost", questions: ["How many cleaning jobs do I need to break even?", "Can my cleaners deliver the required monthly jobs?", "How many cleaning leads does my conversion rate require?"] },
  "landscaping-break-even-calculator": { key: "landscaping", title: "Landscaping Break-Even Calculator", lead: "Estimate the lawn-care or landscaping jobs your crew needs after labor, materials, fuel, equipment and marketing costs.", costs: "plants and materials, crew labor, fuel, equipment use, payment fees and customer acquisition", questions: ["How many landscaping jobs cover monthly overhead?", "Is current crew capacity enough for the target?", "How does average job price change break-even volume?"] },
  "photography-business-break-even-calculator": { key: "photography", title: "Photography Business Break-Even Calculator", lead: "Turn session pricing, editing time, travel, booking costs and studio overhead into an exact monthly session target.", costs: "session materials, photographer labor, editing, gallery delivery, travel, payment fees and booking acquisition", questions: ["How many photography sessions do I need each month?", "Does editing time create a capacity gap?", "What average session price supports owner pay?"] },
  "agency-break-even-calculator": { key: "agency", title: "Agency and Freelancer Break-Even Calculator", lead: "Calculate required retainers, client leads and delivery capacity using contractor costs, software, labor and acquisition assumptions.", costs: "delivery labor, contractors, client software, payment fees and sales acquisition", questions: ["How many retainer clients cover agency overhead?", "How much delivery capacity does the team have?", "How many qualified leads are needed to win the target clients?"] },
  "mobile-detailing-break-even-calculator": { key: "detailing", title: "Mobile Detailing Break-Even Calculator", lead: "Estimate required detailing jobs and bookings after supplies, technician labor, travel, equipment and local marketing costs.", costs: "detailing products, technician labor, water, travel, equipment use, fees and booked-job acquisition", questions: ["How many detailing jobs are needed to break even?", "Can the mobile team serve enough vehicles?", "How does price affect monthly booking requirements?"] },
  "ecommerce-break-even-calculator": { key: "ecommerce", title: "E-commerce Break-Even Calculator", lead: "Calculate exact break-even orders and revenue after COGS, fulfillment, shipping subsidy, returns, platform fees and paid acquisition.", costs: "COGS, fulfillment labor, shipping subsidy, return allowance, payment or platform fees and customer acquisition cost", questions: ["How many e-commerce orders are needed to break even?", "What revenue covers overhead and advertising?", "How do returns and shipping affect contribution margin?"] },
  "restaurant-break-even-calculator": { key: "restaurant", title: "Restaurant Break-Even Calculator", lead: "Convert average check, food cost, direct labor, packaging, delivery commission and overhead into required monthly orders.", costs: "food and ingredients, direct labor, packaging, delivery commissions, card fees and promotion", questions: ["How many restaurant orders cover monthly fixed costs?", "What sales revenue reaches break-even?", "Can kitchen and service capacity handle required demand?"] },
  "salon-break-even-calculator": { key: "salon", title: "Salon Break-Even Calculator", lead: "Estimate appointments, revenue and customer inquiries using service price, product usage, stylist labor and chair capacity.", costs: "service products, stylist labor, disposables, laundry, payment fees and appointment acquisition", questions: ["How many salon appointments are needed to break even?", "What revenue covers rent and owner pay?", "Are stylist hours sufficient for the target appointments?"] },
};

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

export default function IndustryPage({ slug }) {
  const page = industryPages[slug];
  if (!page) return null;
  const industry = industries[page.key];
  const example = calculate(industry.values);
  return (
    <>
      <section className="industry-hero">
        <div>
          <span>FREE INDUSTRY CALCULATOR</span>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <a className="page-button industry-cta" href={`/?industry=${page.key}#calculator`}>Use the free calculator <ArrowRight /></a>
        </div>
        <aside>
          <small>EXAMPLE MODEL</small>
          <strong>{money(example.revenue)}</strong>
          <span>exact monthly break-even revenue</span>
          <div><b>{example.jobs.toFixed(2)}</b> {industry.unit} required</div>
          <div><b>{example.capacity.toFixed(2)}</b> {industry.unit} capacity</div>
        </aside>
      </section>
      <section className="industry-content">
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
        <div className="industry-faq">
          <span>QUESTIONS THIS MODEL ANSWERS</span>
          <h2>{industry.short} break-even questions</h2>
          {page.questions.map((question) => <details key={question}><summary>{question}</summary><p>Enter your actual prices, costs, capacity and conversion assumptions in the free calculator to receive an exact, scenario-specific answer.</p></details>)}
        </div>
      </section>
    </>
  );
}
