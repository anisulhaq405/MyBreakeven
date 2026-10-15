import React, { useState } from 'react';
import { calculate } from './engine';
import { restaurantExamples } from './restaurantExamples';
import { trackProductEvent } from './productAnalytics';
import './restaurant-planning.css';
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
const count = value => value.toLocaleString('en-US', { maximumFractionDigits: 2 });

export function RestaurantExamples({ activeId, onLoad }) {
  const [previewId, setPreviewId] = useState(restaurantExamples[0].id);
  const example = restaurantExamples.find(item => item.id === previewId);
  const result = calculate(example.values);
  return <section id="restaurant-channel-examples" className="restaurant-examples" aria-labelledby="restaurant-examples-title">
    <h3 id="restaurant-examples-title">Start with the way you serve customers</h3>
    <p>Preview three hypothetical USD cases. Previewing keeps your current inputs. Loading replaces every calculator input and clears any previous cost-builder detail; then edit the assumptions to match your records.</p>
    <div className="restaurant-example-picker" role="group" aria-label="Preview a restaurant channel">{restaurantExamples.map(item => <button type="button" key={item.id} aria-pressed={previewId === item.id} onClick={() => setPreviewId(item.id)}>{item.title}</button>)}</div>
    <article className="restaurant-example-card"><h4>{example.title}</h4><p>{example.unit}</p><dl className="restaurant-example-metrics"><div><dt>Net check / order</dt><dd>{money(example.values.price)}</dd></div><div><dt>Contribution / order</dt><dd>{money(result.contribution)}</dd></div><div><dt>Monthly order target</dt><dd>{count(result.wholeJobs)}</dd></div></dl>
      <details><summary>See all assumptions and fee boundaries</summary><p>{example.note}</p><ul><li>Per order: {money(example.values.materialCost)} food; {money(example.values.laborCost)} variable labor; {money(example.values.otherVariableCost)} packing/other; {money(example.values.acquisitionCost)} promotion; {example.values.paymentFeePct}% fees.</li><li>Per month: {money(example.values.fixedCosts)} overhead including committed payroll; {money(example.values.ownerPay)} owner pay; {money(example.values.targetProfit)} additional profit target.</li><li>Hours: {example.values.workers} people × {example.values.hoursPerWorker} hours/week × {example.values.utilizationPct}% productive time; {example.values.hoursPerJob} total worker-hours/order. Inquiry conversion: {example.values.conversionPct}%.</li></ul></details>
      <button type="button" aria-pressed={activeId === example.id} onClick={() => onLoad(example)}>Load {example.title.toLowerCase()} example</button>
    </article>
    <p role="status">{activeId ? `Starting point: ${restaurantExamples.find(item => item.id === activeId)?.title}. Results use your current inputs, including edits.` : 'Starting point: general restaurant example. Previewing a channel does not change the results below.'}</p>
    <p>These cases each allocate the full monthly commitments to one channel. Do not add their targets together or treat them as the same basket sold three ways. For a mixed restaurant, use a consistent order-weighted price, costs and worker-hours, or model a defined mix.</p>
  </section>;
}

export function RestaurantResultGuide({ input, result }) {
  const [days, setDays] = useState('26');
  const validDays = days !== '' && Number.isInteger(Number(days)) && Number(days) >= 1 && Number(days) <= 31;
  if (!result.valid) return null;
  const fits = result.wholeCapacity >= result.wholeJobs;
  return <section className="restaurant-result-guide" aria-labelledby="restaurant-results-title">
    <h3 id="restaurant-results-title">Turn the order target into a service plan</h3>
    <p>Each order leaves <strong>{money(result.contribution)}</strong> towards <strong>{money(result.fixedNeed)}</strong> of monthly overhead, owner pay and additional profit target. Contribution is not take-home profit.</p>
    <div className="restaurant-result-grid"><div><h4>Where one order goes</h4><dl className="restaurant-cost-list">{[['Net check / order', Number(input.price)], ['Food / ingredients', result.costs.materials], ['Sale-dependent labor', result.costs.labor], ['Packing / other variable costs', result.costs.other], ['Allocated promotion', result.costs.acquisition], ['Percentage fees', result.costs.fees], ['Contribution remaining', result.contribution]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{money(value)}</dd></div>)}</dl><p>Cost rows deduct from net price. Keep guaranteed payroll and variable pay separate; enter each fee once.</p></div>
    <div><h4>Plan your open days</h4><label htmlFor="restaurant-open-days">Open days this month</label><input id="restaurant-open-days" type="number" inputMode="numeric" min="1" max="31" step="1" value={days} aria-invalid={!validDays} aria-describedby="restaurant-days-note" onChange={event => setDays(event.target.value)} />
      {validDays ? <p><strong>{count(Math.ceil(result.wholeJobs / Number(days)))} orders per open day</strong> is a rounded daily planning pace for {count(result.wholeJobs)} monthly orders across {days} days.</p> : <p role="status">Enter a whole number of open days from 1 to 31.</p>}
      <p id="restaurant-days-note">26 days is an editable illustration. Days only change this daily pace; they do not change monthly costs or capacity inputs. This control is not carried to the full calculator or saved with a scenario.</p>
      <p className={fits ? 'restaurant-capacity-ok' : 'restaurant-capacity-warning'}><strong>{fits ? 'Fits the entered worker-hours.' : 'The monthly target exceeds worker-hour capacity.'}</strong> You need {count(result.wholeJobs)} orders; the entered productive hours support {count(result.wholeCapacity)}. {fits ? 'Check peak kitchen throughput, seats, opening hours and demand separately.' : 'Review price, cost, channel mix or throughput; include any extra payroll or equipment commitment before recalculating.'}</p>
    </div></div>
    <h4>What if your realised price changes?</h4><p>The engine holds entered unit costs, monthly commitments and worker-hours constant. Percentage fees follow price; actual demand, menu mix and food usage may change.</p>
    <div className="restaurant-scenario-scroll"><table><caption>Price sensitivity using your current inputs</caption><thead><tr><th scope="col">Price case</th><th scope="col">Monthly whole orders</th><th scope="col">Within worker-hours?</th></tr></thead><tbody>{result.scenarios.map(item => <tr key={item.change}><th scope="row">{item.change < 0 ? '10% lower price' : item.change > 0 ? '10% higher price' : 'Current price'}</th><td>{item.wholeJobs === null ? 'No positive-contribution target' : count(item.wholeJobs)}</td><td>{item.wholeJobs === null ? 'Review price and costs' : item.wholeJobs <= result.wholeCapacity ? 'Yes, hours only' : 'No'}</td></tr>)}</tbody></table></div>
    <p>For an operating-cost threshold, set owner pay and target profit to zero intentionally. Keep owner pay when the business must fund your compensation. Amounts are rounded for display; whole-order targets use full precision.</p>
    <nav aria-label="Next restaurant costing decision"><a href="/calculators/recipe-cost-calculator/">Cost ingredients and portions</a> · <a href="/calculators/menu-pricing-calculator/">Test a menu price</a> · <a href="/blogs/restaurant-delivery-app-commission-profit-per-order/">Check delivery commission boundaries</a></nav>
  </section>;
}

export function RestaurantPlanOptions() {
  return <aside className="restaurant-plan-options" aria-labelledby="restaurant-plan-title"><div><span>KEEP A PLAN YOU CAN REVIEW NEXT MONTH</span><h3 id="restaurant-plan-title">Start free. Compare your next restaurant decision with Pro.</h3><p>No account is needed for this calculation. Use “Continue with these numbers” above to carry the current inputs to the full calculator. A free account supports up to 3 saved scenarios.</p></div><div><h4>MyBreakeven Pro · $9.99/month</h4><ul><li>Keep up to 100 saved scenarios, such as your base plan and a higher-food-cost case.</li><li>Compare 3 saved plans side by side, using the same unit and currency.</li><li>Use Offer Mix Studio for a defined menu or channel mix with consistent costs and worker-hours.</li><li>Export CSV and professional PDF reports for a monthly planning review.</li></ul><p><a href="/pricing/" onClick={() => trackProductEvent('pro_pricing_click', 'restaurant')}>Compare Free and Pro</a> · <a href="/pro-user-guide/#save">See how saving and comparison work</a></p><small>Opening pricing does not save or carry your current inputs. Continue with your numbers first; save a scenario after signing in.</small></div></aside>;
}
