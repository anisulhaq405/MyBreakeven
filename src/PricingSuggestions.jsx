import React from "react";
import { pricingSuggestions } from "./pricingSuggestions";

const money = (value, currency) => new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

export default function PricingSuggestions({ input, plannedUnits, industry, currency }) {
  const analysis = pricingSuggestions(input, plannedUnits);
  return <section className="pricing-suggestions" aria-label="Pricing suggestions">
    <div className="panel-intro"><div><small>PRICING SUGGESTIONS</small><h3>What price supports your monthly plan?</h3><p>Uses Expected monthly {industry.unit} from the dashboard above. Change that input to compare sales assumptions.</p></div></div>
    {!analysis.valid ? <p className="decision-warning" role="alert">{analysis.message}</p> : <>
      <p>Assumption: <strong>{analysis.plannedUnits} {industry.unit}/month</strong>. Available capacity: <strong>{analysis.wholeCapacity} whole {industry.unit}/month</strong>.</p>
      {!analysis.plannedFitsCapacity && <p className="decision-warning" role="alert">Expected sales exceed delivery capacity by {analysis.plannedUnits - analysis.wholeCapacity} {industry.unit}. These prices fund the goal only if the expected sales are delivered. {analysis.capacityTargetPrice !== null ? `At full entered capacity, the target-profit price is ${money(analysis.capacityTargetPrice, currency)} per ${industry.singular}.` : "No whole sales can be delivered at the entered capacity."}</p>}
      <div className="decision-summary pricing-grid">
        {analysis.rows.map(row => <article key={row.name}>
          <small>{row.name}</small><strong>{money(row.price, currency)}</strong><span>per {industry.singular}</span><p>{row.description}</p>
          <dl><div><dt>Monthly profit after owner pay</dt><dd>{money(row.profit, currency)}</dd></div><div><dt>Sales needed for target profit</dt><dd>{row.requiredUnits === null ? "No finite sales target" : `${row.requiredUnits} ${industry.unit}`}</dd></div><div><dt>Target fits capacity?</dt><dd>{row.fitsCapacity ? "Yes, at entered capacity" : "No"}</dd></div></dl>
        </article>)}
      </div>
      <div className={`price-verdict ${analysis.currentFitsCapacity ? "safe" : "risk"}`}><div><strong>Current price: {money(input.price, currency)} per {industry.singular}</strong><p>At {analysis.plannedUnits} monthly {industry.unit}, profit after owner pay is {money(analysis.currentProfit, currency)}. {analysis.currentRequiredUnits === null ? "This price has no positive contribution to fund the monthly goal." : `Your target needs ${analysis.currentRequiredUnits} ${industry.unit}; ${analysis.currentFitsCapacity ? "this fits" : "this exceeds"} entered capacity.`}</p><p>Target-profit price at your expected volume: {money(analysis.rows[2].price, currency)} ({analysis.priceChange >= 0 ? "increase" : "decrease"} of {money(Math.abs(analysis.priceChange), currency)} from the current price).</p></div></div>
      <details><summary>How these prices are calculated</summary><p>Price = (per-sale costs + monthly contribution requirement ÷ expected monthly sales) ÷ (1 − fee percentage ÷ 100). Sustainable pricing includes overhead and owner pay; target pricing also includes target profit. Per-sale costs include materials, labor, other variable costs and acquisition. Prices round up to cents; required sales round up to whole units; capacity rounds down.</p></details>
      <p className="decision-disclaimer">These are cost-based planning prices. Demand and willingness to pay are not predicted. Costs, fees and delivery time are assumed unchanged when price changes. At the direct-cost floor, rounding can leave a small contribution; it is not an overhead allowance.</p>
    </>}
  </section>;
}
