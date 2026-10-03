import React from "react";
import { pricingSuggestions } from "./pricingSuggestions";
const money = (value, currency) => new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
export default function PricingSuggestions({ input, plannedUnits, industry, currency, onPlannedUnitsChange }) {
  const a = pricingSuggestions(input, plannedUnits);
  return <section className="pricing-suggestions" aria-label="Pricing suggestions">
    <div className="panel-intro"><div><small>PRICING PLAN</small><h3>What should your price cover?</h3><p>Enter the monthly {industry.unit} you expect to sell. We check them against your team’s available time.</p></div></div>
    <div className="decision-input-grid three">
      <label><span>Expected monthly {industry.unit}</span><div><input aria-label={`Pricing expected monthly ${industry.unit}`} type="number" min="1" step="1" value={plannedUnits} onChange={event => onPlannedUnitsChange?.(event.target.value === "" ? "" : Number(event.target.value))} /></div></label>
      <p className="pricing-input-help">The starting value is an editable planning example, not a prediction of customer demand.</p>
    </div>
    {!a.valid ? <p className="decision-warning" role="alert">{a.message}</p> : <div aria-live="polite">
      <p>Expected: <strong>{a.plannedUnits} {industry.unit}/month</strong> · Team capacity: <strong>{a.wholeCapacity} {industry.unit}/month</strong>.</p>
      {!a.plannedFitsCapacity && <p className="decision-warning" role="alert">Your team can deliver {a.wholeCapacity} of the {a.plannedUnits} expected {industry.unit}. The prices below use {a.feasibleUnits} {industry.unit}, so the plan fits your entered capacity. More capacity would be needed to deliver all {a.plannedUnits}.</p>}
      {a.feasibleUnits === 0 ? <p className="decision-warning" role="alert">No whole {industry.unit} can be delivered at the entered capacity. Review team hours, utilization or delivery time before choosing a monthly price plan.</p> : <>
        <p><strong>Pricing basis: {a.feasibleUnits} {industry.unit} per month.</strong> This volume still needs real customer demand.</p>
        <div className="decision-summary pricing-grid simple-prices">
          {a.feasibleRows.slice(1).map((row, index) => <article key={row.name}>
            <small>{index === 0 ? "Cover expenses and pay yourself" : "Also earn your target profit"}</small>
            <strong>{money(row.price, currency)}</strong><span>per {industry.singular}</span>
            <p>{index === 0 ? `Covers all entered per-sale costs, fees, monthly overhead and owner pay at ${a.feasibleUnits} ${industry.unit}.` : `Covers the same costs plus ${money(input.targetProfit, currency)} monthly profit at ${a.feasibleUnits} ${industry.unit}.`}</p>
            <dl><div><dt>Monthly profit after costs and owner pay</dt><dd>{money(row.profit, currency)}</dd></div></dl>
          </article>)}
        </div>
        <div className={`price-verdict ${a.feasibleCurrentProfit >= Number(input.targetProfit) ? "safe" : "risk"}`}><div>
          <strong>Your current price: {money(input.price, currency)} per {industry.singular}</strong>
          <p>At {a.feasibleUnits} monthly {industry.unit}, you would {a.feasibleCurrentProfit < 0 ? "lose" : "have"} {money(Math.abs(a.feasibleCurrentProfit), currency)} {a.feasibleCurrentProfit < 0 ? "after costs and owner pay" : "profit after costs and owner pay"}.</p>
          <p>{a.feasibleCurrentProfit >= Number(input.targetProfit) ? "Your current price already funds the selected profit goal at this volume. The calculated minimum is not a recommendation to lower your price." : `To fund your ${money(input.targetProfit, currency)} profit goal at this volume, the calculated price is ${money(a.feasibleRows[2].price, currency)} per ${industry.singular}.`}</p>
        </div></div>
        <details><summary>See the calculation in simple steps</summary><dl className="pricing-explanation">
          <div><dt>Monthly overhead + owner pay + target profit</dt><dd>{money(a.targetNeed, currency)}</dd></div>
          <div><dt>Divide by {a.feasibleUnits} monthly {industry.unit}</dt><dd>{money(a.targetNeed / a.feasibleUnits, currency)} needed from each {industry.singular}</dd></div>
          <div><dt>Add per-{industry.singular} costs</dt><dd>{money(a.variableCost, currency)}</dd></div>
          <div><dt>Allow for {input.paymentFeePct}% fees; round price up to cents</dt><dd>{money(a.feasibleRows[2].price, currency)} per {industry.singular}</dd></div>
        </dl><p>Step amounts are displayed rounded; the calculation uses full precision.</p></details>
      </>}
      <details><summary>Per-sale cost floor: {money(a.rows[0].price, currency)}</summary><p>This covers only the entered per-sale costs and fees. It does not include monthly overhead, owner pay or target profit. It is not a price recommendation or a monthly sales target.</p></details>
      <p className="decision-disclaimer">These are minimum cost-based planning prices, not market price recommendations. Sales demand, costs and delivery time must be checked when changing price.</p>
    </div>}
  </section>;
}
