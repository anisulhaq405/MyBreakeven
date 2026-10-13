import React, { useMemo, useState } from 'react';
import CurrencySelector from './CurrencySelector';
import { calculateUnitContribution } from './unitContribution.js';
import './margin-markup-widget.css';

const example = { price: '50', variableCost: '25', feePct: '3', fixedFee: '0.30' };
export default function ContributionMarginWidget() {
  const [input, setInput] = useState({ ...example });
  const [currency, setCurrency] = useState('USD');
  const result = useMemo(() => calculateUnitContribution(input), [input]);
  const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: 'code', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const percentage = n => `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)}%`;
  const field = (key, label, help, max = 1e12) => <label className="margin-widget-field"><span>{label}</span><input type="number" inputMode="decimal" min="0" max={max} step="any" value={input[key]} onChange={e => setInput(s => ({ ...s, [key]: e.target.value }))} aria-describedby={`contribution-help-${key}`} /><small id={`contribution-help-${key}`}>{help}</small></label>;
  return <section className="margin-widget" id="contribution-calculator" aria-labelledby="contribution-widget-title">
    <h2 id="contribution-widget-title">Contribution margin per unit calculator</h2>
    <p>Calculate what one product, order or completed job leaves toward fixed costs and profit. Use the same sale unit for every input.</p>
    <div className="margin-widget-grid"><div className="margin-widget-inputs">
      <CurrencySelector value={currency} onChange={setCurrency} />
      {field('price', 'Selling price per unit', 'After discounts; exclude sales tax collected for a tax authority. The percentage fee below is applied to this price.')}
      {field('variableCost', 'Other variable costs per unit', 'Materials, variable labour, shipping, commissions and expected returns. Exclude fees entered separately below.')}
      {field('feePct', 'Payment / platform fee (%)', 'Enter your own combined rate, or 0. Do not also include this fee in other variable costs.', 100)}
      {field('fixedFee', 'Fixed transaction fee per unit', 'A fixed fee for each sale, not monthly overhead. For one order = one unit, enter the fee per order.')}
      <button type="button" onClick={() => setInput({ ...example })}>Reset fictional example</button>
    </div><div className="margin-widget-results" aria-labelledby="contribution-results-title">
      <h3 id="contribution-results-title">What each sale contributes</h3>
      <div aria-live="polite" aria-atomic="true">
        {!result.valid ? <p className="margin-widget-warning">{result.message}</p> : <>
          <dl><div><dt>Contribution per unit</dt><dd>{money(result.contribution)}</dd></div><div><dt>Contribution margin</dt><dd>{percentage(result.ratio)}</dd></div><div><dt>Total variable cost per unit</dt><dd>{money(result.totalVariableCost)}</dd></div><div><dt>Percentage fee per unit</dt><dd>{money(result.percentageFee)}</dd></div></dl>
          <p>Variable cost = {money(Number(input.variableCost))} other costs + {money(result.percentageFee)} percentage fee + {money(Number(input.fixedFee))} transaction fee.</p>
          {result.state === 'positive' && <p>This sale leaves {money(result.contribution)} toward fixed costs. It becomes profit only after those commitments are covered.</p>}
          {result.state === 'zero' && <p className="margin-widget-warning">This sale covers its entered variable costs but contributes nothing toward fixed costs or profit.</p>}
          {result.state === 'negative' && <p className="margin-widget-warning">This sale loses {money(Math.abs(result.contribution))} before fixed costs. Selling more at the same price and cost increases that loss.</p>}
        </>}
      </div>
      <p className="margin-widget-note">The starting values are a fictional USD example: $50 price, $25 other variable costs, 3% fee and $0.30 transaction fee produce $23.20 contribution and 46.4%. Replace every value with your records. Displayed amounts are rounded; calculations use unrounded inputs.</p>
    </div></div>
    <p><strong>Cost boundary:</strong> include labour here only when its cost changes with the sale. Keep salaried commitments, rent and other fixed overhead in the monthly plan. Enter each cost once. Contribution is not net profit.</p>
    <p className="margin-widget-note">Fees are modelled on the entered selling price only. Providers may charge on tax or customer shipping too; reconcile the fee basis with your statement. For batches, allocate fixed transaction fees to the chosen unit. Refund and return allowances belong in your stated variable costs; this is not a separate refund model.</p>
    <p><a href="/calculators/ecommerce-break-even-calculator/">Plan monthly break-even for products or orders</a>, or <a href="/#calculator">choose a service-business planner</a> to add fixed costs and capacity. Include the transaction fee above once in the planner's other variable costs.</p>
    <p><a href="#contribution-cost-boundaries">Read the formula, cost boundaries and examples</a>.</p>
  </section>;
}
