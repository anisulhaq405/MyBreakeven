import React, {useState} from 'react';
import Decimal from 'decimal.js';

const excelSchedule = [
  'Year\tNet cash flow\tCumulative cash flow',
  '0\t-10000\t=SUM($B$2:B2)',
  '1\t3500\t=SUM($B$2:B3)',
  '2\t4500\t=SUM($B$2:B4)',
  '3\t5000\t=SUM($B$2:B5)',
].join('\n');

const cogsFields = [
  ['opening', 'Beginning inventory at cost'],
  ['additions', 'Net inventory additions at cost'],
  ['closing', 'Ending inventory at cost'],
];

const usd = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

function CogsCalculator() {
  const [inputs, setInputs] = useState({opening: '4000', additions: '12000', closing: '6000'});
  const valid = cogsFields.every(([key]) => /^\d+(?:\.\d{0,2})?$/.test(inputs[key]) && Number(inputs[key]) <= 1e9);
  const available = valid ? new Decimal(inputs.opening).plus(inputs.additions) : null;
  const cogs = available ? available.minus(inputs.closing) : null;
  return <div className="margin-widget" id="cogs-calculator">
    <div className="margin-widget-inputs">{cogsFields.map(([key,label]) => (
      <label className="margin-widget-field" key={key}>{label} (USD)
        <input type="number" min="0" max="1000000000" step="0.01" inputMode="decimal" value={inputs[key]}
          onChange={event => setInputs(previous => ({...previous, [key]: event.target.value}))}/>
      </label>
    ))}</div>
    <div role="status">
      {!available ? <p>Enter each amount from $0 to $1 billion, with up to two decimal places.</p>
        : cogs.isNegative() ? <p>Ending inventory exceeds the {usd.format(available.toNumber())} available for sale. Check the dates and additions.</p>
        : <p>Cost available for sale <strong>{usd.format(available.toNumber())}</strong> · Estimated COGS <strong>{usd.format(cogs.toNumber())}</strong></p>}
    </div>
  </div>;
}

export default function GrowthArticleUpdate({slug, update}) {
  return <section className="article-summary" aria-labelledby="growth-answer" id="worked-calculation">
    <h2 id="growth-answer">{update.heading}</h2>
    <p>{update.copy}</p>
    {slug === 'how-to-calculate-cost-of-goods-sold' && <CogsCalculator/>}
    {slug === 'payback-period' && <label>Excel cash-flow schedule
      <textarea aria-label="Excel cash-flow schedule" readOnly rows={6} defaultValue={excelSchedule} style={{display:'block',width:'100%',maxWidth:'100%',boxSizing:'border-box'}}/>
    </label>}
    <ul>{update.links.map(([label,href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
  </section>;
}
