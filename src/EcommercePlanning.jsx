import React, { useState } from 'react';
import { calculate } from './engine';
import { ecommerceExamples } from './ecommerceExamples';
import { trackProductEvent } from './productAnalytics';
import './ecommerce-planning.css';

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
const count = value => value.toLocaleString('en-US', { maximumFractionDigits: 2 });

export function EcommerceExamples({ onLoad, activeId }) {
  const [previewId, setPreviewId] = useState(ecommerceExamples[0].id);
  const example = ecommerceExamples.find(item => item.id === previewId);
  const result = calculate(example.values);
  return <section className="ecommerce-examples" aria-labelledby="ecommerce-examples-title">
    <h3 id="ecommerce-examples-title">Start with a product like yours</h3>
    <p>Illustrative USD scenarios, not market averages. Loading an example replaces every calculator input below. Then edit the numbers to match your own records.</p>
    <div className="ecommerce-example-picker" role="group" aria-label="Preview a product example">{ecommerceExamples.map(item => <button type="button" key={item.id} aria-pressed={previewId === item.id} onClick={() => setPreviewId(item.id)}>{item.title}</button>)}</div>
    <div className="ecommerce-example-grid"><article key={example.id}>
        <h4>{example.title}</h4><p>{example.unit}</p>
        <dl><div><dt>Price</dt><dd>{money(example.values.price)}</dd></div><div><dt>Contribution / order</dt><dd>{money(result.contribution)}</dd></div><div><dt>Monthly order target</dt><dd>{count(result.wholeJobs)}</dd></div></dl>
        <details><summary>See all example assumptions</summary><p>{example.note}</p><ul>
          <li>Per order: {money(example.values.materialCost)} product/materials; {money(example.values.laborCost)} direct pay; {money(example.values.otherVariableCost)} other variable costs; {money(example.values.acquisitionCost)} acquisition; {example.values.paymentFeePct}% fees.</li>
          <li>Per month: {money(example.values.fixedCosts)} overhead; {money(example.values.ownerPay)} owner pay; {money(example.values.targetProfit)} additional profit target.</li>
          <li>Capacity: {example.values.workers} team member(s), {example.values.hoursPerWorker} hours each/week, {example.values.utilizationPct}% productive time, {example.values.hoursPerJob} total worker-hours/order. Conversion assumption: {example.values.conversionPct}%.</li>
        </ul></details>
        <button type="button" aria-pressed={activeId === example.id} onClick={() => onLoad(example)}>Load {example.title.toLowerCase()} example</button>
      </article>
    </div>
    <p className="ecommerce-example-status" role="status">{activeId ? `Starting point: ${ecommerceExamples.find(example => example.id === activeId)?.title}. Results below use the current inputs, including any edits you make.` : 'Starting point: general ecommerce example. Results below use the current inputs, including any edits you make.'}</p>
  </section>;
}

export function EcommerceResultGuide({ input, result }) {
  if (!result.valid) return null;
  const capacityFits = result.wholeCapacity >= result.wholeJobs;
  return <section className="ecommerce-result-guide" aria-labelledby="ecommerce-result-guide-title">
    <h3 id="ecommerce-result-guide-title">What your order target means</h3>
    <p>Each order leaves <strong>{money(result.contribution)}</strong> towards your monthly funding requirement of <strong>{money(result.fixedNeed)}</strong>. This contribution is not take-home profit. Displayed amounts are rounded; order targets use the engine's full precision.</p>
    <div className="ecommerce-result-grid">
      <div><h4>Follow one order</h4><dl className="ecommerce-cost-list">
        {[
          ['Net selling price', Number(input.price)], ['Product / materials', result.costs.materials],
          ['Direct labor', result.costs.labor], ['Other variable costs', result.costs.other],
          ['Allocated acquisition', result.costs.acquisition], ['Percentage fees', result.costs.fees],
          ['Contribution remaining', result.contribution],
        ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{money(value)}</dd></div>)}
      </dl><p>The cost rows are deductions from price. Flat fees belong in other variable costs; do not enter them again as percentage fees.</p></div>
      <div><h4>Check the monthly requirement</h4><ul>
        <li>Overhead: {money(Number(input.fixedCosts))}; owner pay: {money(Number(input.ownerPay))}; additional profit target: {money(Number(input.targetProfit))}.</li>
        <li>Financial target (shown to 2 decimals): {count(result.jobs)} orders. Plan for at least {count(result.wholeJobs)} whole orders, producing {money(result.practicalRevenue)} in sales at this price.</li>
        <li>Productive-hour capacity: {count(result.wholeCapacity)} whole orders per month.</li>
      </ul><p className={capacityFits ? 'ecommerce-capacity-ok' : 'ecommerce-capacity-warning'}><strong>{capacityFits ? 'Fits the entered productive hours.' : 'The order target exceeds your productive hours.'}</strong> {capacityFits ? 'Check demand, inventory and fulfilment constraints before treating this as achievable.' : 'Test price, cost or making time before committing. Any extra staffing or equipment must also be costed.'}</p></div>
    </div>
    <h4>What if your realised price changes?</h4>
    <p>These engine-calculated cases keep unit costs, monthly commitments and delivery time unchanged. Percentage fees move with price. Actual demand and order mix may also change.</p>
    <div className="ecommerce-scenario-scroll"><table><caption>Monthly whole-order target at a lower, current or higher price</caption><thead><tr><th scope="col">Price case</th><th scope="col">Orders needed</th><th scope="col">Within entered hours?</th></tr></thead><tbody>{result.scenarios.map(scenario => <tr key={scenario.change}><th scope="row">{scenario.change < 0 ? '10% lower price' : scenario.change > 0 ? '10% higher price' : 'Current price'}</th><td>{scenario.wholeJobs === null ? 'No supported positive-contribution target' : count(scenario.wholeJobs)}</td><td>{scenario.wholeJobs === null ? 'Review price and costs' : result.wholeCapacity >= scenario.wholeJobs ? 'Yes, hours only' : 'No'}</td></tr>)}</tbody></table></div>
    <p>Set target profit to zero to remove the additional profit goal. Set owner pay to zero only when intentionally excluding owner compensation. Orders are not individual items: keep price, product mix and costs on the same order basis.</p>
  </section>;
}

export function EcommercePlanOptions() {
  return <aside className="ecommerce-plan-options" aria-labelledby="ecommerce-plan-options-title">
    <div><span>KEEP THE PLAN YOU WANT TO REVISIT</span><h3 id="ecommerce-plan-options-title">Calculate free. Use Pro when you need ongoing comparisons.</h3><p>The calculation above is free, with no account required. Continue with your current inputs in the full calculator; a free account supports up to 3 saved scenarios.</p></div>
    <div><h4>MyBreakeven Pro · $9.99/month</h4><ul><li>Keep up to 100 saved scenarios.</li><li>Compare 3 plans side by side: for example, regular price, promotion and a higher-cost case.</li><li>Download CSV and professional PDF reports.</li><li>Use Offer Mix Studio for products with different cost and time requirements.</li></ul><p><a href="/pricing/" onClick={() => trackProductEvent('pro_pricing_click', 'ecommerce')}>Compare Free and Pro</a> · <a href="/pro-user-guide/">See how Pro planning works</a></p><small>Opening pricing does not save your current inputs. Use “Continue with these numbers” above to carry them to the full calculator.</small></div>
  </aside>;
}
