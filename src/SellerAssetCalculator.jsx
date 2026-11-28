import React, {useState} from 'react';
import {dateLabel} from './authorityResources.js';
import FreeToolGuide from './FreeToolGuide.jsx';
import {paypalRates, paypalEstimate, depreciationSchedule} from './sellerAssetCalculations.js';
import {responsiveFeatureProps} from './responsiveFeatureImages.js';
import './marketplace-tool.css';

const usd = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'});

function NumberField({label, value, change, step = '0.01'}) {
  return <label className="tool-field">{label}
    <input type="number" min="0" step={step} value={value} onChange={event => change(event.target.value)}/>
  </label>;
}

function PayPalForm() {
  const [product, setProduct] = useState('');
  const [reverse, setReverse] = useState(false);
  const [amount, setAmount] = useState('100');
  const [custom, setCustom] = useState({rate:'3', fixed:'0.30'});
  const result = product && paypalEstimate({amount, ...(paypalRates[product] || custom), reverse});
  return <div className="tool-workspace">
    <section className="tool-panel">
      <h2>Payment details</h2>
      <div className="tool-inputs">
        <label className="tool-field">US merchant fee schedule
          <select value={product} onChange={event => setProduct(event.target.value)}>
            <option value="">Choose a fee schedule</option>
            {Object.entries(paypalRates).map(([key, item]) => <option value={key} key={key}>{item.label} · {item.rate}% + {usd.format(Number(item.fixed))}</option>)}
            <option value="custom">Custom fee</option>
          </select>
        </label>
        <label className="tool-field">Calculation
          <select value={reverse ? 'net' : 'gross'} onChange={event => setReverse(event.target.value === 'net')}>
            <option value="gross">Estimate seller proceeds</option>
            <option value="net">Find the charge for a target net</option>
          </select>
        </label>
        <NumberField label={reverse ? 'Desired net (USD)' : 'Gross payment (USD)'} value={amount} change={setAmount}/>
        {product === 'custom' && <>
          <NumberField label="Percentage fee" step="0.0001" value={custom.rate} change={rate => setCustom(previous => ({...previous, rate}))}/>
          <NumberField label="Fixed fee (USD)" value={custom.fixed} change={fixed => setCustom(previous => ({...previous, fixed}))}/>
        </>}
      </div>
    </section>
    <section className="tool-panel" aria-live="polite">
      <h2>{reverse ? 'Minimum gross charge' : 'Estimated seller proceeds'}</h2>
      {!result ? <p>Choose the fee schedule that matches how you receive the payment.</p> : result.error ? <p>{result.error}</p> : <>
        <dl>{[
          ['Gross charge', usd.format(result.gross)], ['Percentage fee', usd.format(result.percentageFee)],
          ['Fixed fee', usd.format(result.fixedFee)], ['Total fee', usd.format(result.fee)],
          ['Seller net', usd.format(result.net)], ['Effective fee rate', result.effectiveRate.toFixed(2)+'%'],
        ].map(([label,value]) => <React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>)}</dl>
        {result.net < 0 && <p>The modeled fee exceeds the payment.</p>}
      </>}
    </section>
  </div>;
}

function DepreciationForm() {
  const [inputs, setInputs] = useState({cost:'12000', residual:'2000', life:'5', method:'straight-line'});
  const update = key => value => setInputs(previous => ({...previous, [key]:value}));
  const result = depreciationSchedule(inputs);
  return <div>
    <section className="tool-panel">
      <h2>Asset details</h2>
      <div className="tool-inputs">
        <NumberField label="Asset cost (USD)" value={inputs.cost} change={update('cost')}/>
        <NumberField label="Residual value (USD)" value={inputs.residual} change={update('residual')}/>
        <NumberField label="Useful life (full years)" step="1" value={inputs.life} change={update('life')}/>
        <label className="tool-field">Book depreciation method
          <select value={inputs.method} onChange={event => update('method')(event.target.value)}>
            <option value="straight-line">Straight-line</option>
            <option value="double-declining">Double-declining balance</option>
          </select>
        </label>
      </div>
    </section>
    <section className="tool-panel">
      <h2>Annual book depreciation schedule</h2>
      <p>Expense is rounded to cents, and the final year allocates the remaining amount above residual.</p>
      {result.error ? <p role="status">{result.error}</p> : <>
        <p role="status">Total depreciation <strong>{usd.format(result.total)}</strong> · Final book value <strong>{usd.format(result.closing)}</strong></p>
        <div className="tool-table-wrap" tabIndex={0} role="region" aria-label="Annual depreciation schedule">
          <table><thead><tr>{['Year','Opening book value','Annual expense','Accumulated depreciation','Closing book value'].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
            <tbody>{result.rows.map(row => <tr key={row.year}><th scope="row">{row.year}</th>{[row.opening,row.expense,row.accumulated,row.closing].map((value,index) => <td key={index}>{usd.format(value)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </>}
      <p><a href="/downloads/business-depreciation-schedule.xlsx" download>Download the editable depreciation schedule (.xlsx)</a></p>
    </section>
  </div>;
}

export default function SellerAssetCalculator({tool, slug}) {
  return <div className="free-tools marketplace-tool" style={tool.theme}>
    <nav className="tool-breadcrumb" aria-label="Breadcrumb"><a href="/tools/">Free business calculators</a></nav>
    <section className="tool-hero">
      <h1>{tool.name}</h1>
      <p><time dateTime={tool.reviewed}>Published {dateLabel(tool.reviewed)}</time></p>
      <p>{tool.intro}</p>
    </section>
    {tool.mode === 'paypalFee' ? <PayPalForm/> : <DepreciationForm/>}
    <figure className="tool-image"><img {...responsiveFeatureProps(tool.image)} src={tool.image} alt={tool.alt} width="1200" height="675" loading="lazy"/></figure>
    <FreeToolGuide tool={tool} slug={slug}/>
  </div>;
}
