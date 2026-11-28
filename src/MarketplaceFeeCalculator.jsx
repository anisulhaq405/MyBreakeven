import React, {useMemo, useState} from 'react';
import './marketplace-tool.css';
import FreeToolGuide from './FreeToolGuide.jsx';
import {calculateMarketplace, digitalMarketplaceDefaults, ebayRates, marketplaceDefaults} from './marketplaceFeeEngine.js';
import {responsiveFeatureProps} from './responsiveFeatureImages.js';

const usd = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'});
const money = value => value === null ? 'Outside modeled price range' : usd.format(value);

export default function MarketplaceFeeCalculator({tool, slug}) {
  const etsy = tool.marketplace === 'etsy';
  const [productType, setProductType] = useState('physical');
  const [scenarios, setScenarios] = useState({
    physical: marketplaceDefaults[tool.marketplace],
    digital: digitalMarketplaceDefaults[tool.marketplace],
  });
  const digital = productType === 'digital';
  const values = scenarios[productType];
  const result = useMemo(() => calculateMarketplace(tool.marketplace, values), [tool.marketplace, values]);
  const update = (key, value) => setScenarios(previous => ({
    ...previous, [productType]: {...previous[productType], [key]: value},
  }));
  const reset = () => setScenarios(previous => ({
    ...previous, [productType]: (digital ? digitalMarketplaceDefaults : marketplaceDefaults)[tool.marketplace],
  }));
  const field = (key, label, help, step = '0.01') => (
    <label className="tool-field" htmlFor={key}>
      <span>{label}</span>
      <input id={key} type="number" min="0" step={step} value={values[key]} onChange={event => update(key, event.target.value)} aria-describedby={key+'-help'}/>
      <small id={key+'-help'}>{help}</small>
    </label>
  );

  return <div className="free-tool-page marketplace-tool" style={tool.theme}>
    <div className="tool-wrap">
      <nav className="tool-breadcrumb" aria-label="Breadcrumb"><a href="/tools/">Free business calculators</a></nav>
      <div className="tool-hero">
        <h1>{tool.name}</h1><p>{tool.intro}</p>
        <p><strong>Scope</strong> US domestic sale · USD · one item per checkout</p>
        <p><a href="#marketplace-inputs">Enter your order</a> · <a href="#marketplace-formula">Fee formula</a> · <a href="#marketplace-example">Worked example</a></p>
      </div>
      <div className="tool-workspace" id="marketplace-inputs">
        <section className="tool-panel">
          <h2>Your sale and seller costs</h2>
          <label className="tool-field">Product type
            <select value={productType} onChange={event => setProductType(event.target.value)}>
              <option value="physical">Physical product</option>
              <option value="digital">Digital product</option>
            </select>
          </label>
          {digital && !etsy && <p>For eligible electronically delivered items, use the fees confirmed for your listing format. eBay restricts digital listings. Check its <a href="https://www.ebay.com/help/policies/selling-policies/prohibited-restricted-items-policy?id=4289">electronically delivered items policy</a> before listing. This scenario does not apply the standard physical category rates or order charge.</p>}
          <div className="tool-inputs">
            {field('price','Item selling price ($)','What the buyer pays for the item after seller discounts.')}
            {!digital && field('shipping','Shipping charged to buyer ($)','Enter handling and gift wrap here when they share the modeled fee and tax bases.')}
            {field('tax',digital ? 'Effective sales tax on item (%)' : 'Effective sales tax on item + shipping (%)',digital ? 'Enter the rate shown for this digital order. Use zero if no buyer tax applies.' : 'Use the effective checkout rate. If only the item is taxable, divide actual tax by item plus shipping.')}
            {field('itemCost',digital ? 'Digital product cost per sale ($)' : 'Landed item cost ($)',digital ? 'Include per-sale royalties, file delivery, or an allocated share of design costs.' : 'Inventory or materials, direct labor and inbound freight allocated to the sold item.')}
            {!digital && field('postage','Postage you pay ($)','Use your actual label or fulfillment cost, even when the buyer pays for shipping.')}
            {!digital && field('supplies','Packaging and handling cost ($)','Enter incremental seller costs that are not already in landed cost or postage.')}
            {field('allowance',digital ? 'Support and refund allowance ($)' : 'Other cost or expected return loss ($)',digital ? 'Estimate unrecovered refunds and support per sale. Count each cost once.' : 'Use a per-sale allowance. Keep refunded revenue, fee credits and recoverable stock out of a duplicated cost entry.')}
            {field('goal','Target contribution per sale ($)','Amount left after the fees and costs entered here.')}
          </div>
          <h3>{etsy ? 'Etsy fees and ad attribution' : 'eBay category and listing fees'}</h3>
          <div className="tool-inputs">
            {etsy ? <>
              {field('listings','Number of $0.20 listing charges allocated','Use one for a typical sale. Allocate any extra renewals independently of payment processing.', '1')}
              <label className="tool-field">Offsite Ads attribution
                <select value={values.offsite} onChange={event => update('offsite',event.target.value)}>
                  <option value="0">Unattributed order</option><option value="15">Attributed at 15%</option><option value="12">Attributed at 12%</option>
                </select>
                <small>Choose the rate shown in your Etsy account. The fee is capped at $100 per attributed order.</small>
              </label>
            </> : <>
              {digital ? <>
                {field('customRate','Verified percentage fee (%)','Applied to the modeled item price plus buyer tax. Enter zero if it does not apply.')}
                {field('digitalOrderFee','Verified fixed fee per order ($)','Enter the checkout or processing charge for one sale, or zero.')}
              </> : <>
              <label className="tool-field">US final value fee schedule
                <select value={values.category} onChange={event => update('category',event.target.value)}>
                  {Object.entries(ebayRates).map(([key,option])=><option key={key} value={key}>{option.label} · {option.rate}%</option>)}
                  <option value="custom">Custom flat percentage from your schedule</option>
                </select>
                <small>Published basic-fee schedules only. Use custom for a flat rate you have verified.</small>
              </label>
              {values.category === 'custom' && field('customRate','Custom final value percentage (%)','One flat rate across the modeled sale amount.')}
              </>}
              {field('insertion','Insertion and listing upgrades allocated ($)','Enter zero if covered by a free listing and you did not buy upgrades.')}
              {field('promoted',digital ? 'Verified attributed advertising rate (%)' : 'Attributed Promoted Listings rate (%)',digital ? 'Enter zero if no percentage-based advertising fee applies.' : 'Use zero for an unattributed order. This models a percentage of item, shipping and tax.')}
            </>}
          </div>
          <button type="button" onClick={reset}>Reset example</button>
        </section>
        <section className="tool-panel" aria-labelledby="marketplace-results">
          <h2 id="marketplace-results">Order profit and price floor</h2>
          {result.error ? <p role="status">{result.error}</p> : <>
            <dl aria-live="polite" aria-atomic="true">
              <dt>Contribution after seller costs</dt><dd><strong>{money(result.profit)}</strong></dd>
              <dt>Contribution margin</dt><dd>{result.margin === null ? 'Unavailable at zero revenue' : result.margin+'%'}</dd>
              <dt>Break-even item price</dt><dd>{money(result.breakEven)}</dd>
              <dt>Item price for target contribution</dt><dd>{money(result.targetPrice)}</dd>
            </dl>
            <div className="tool-table-wrap"><table>
              <caption>Fee and payout breakdown</caption>
              <thead><tr><th scope="col">Order line</th><th scope="col">Amount</th></tr></thead>
              <tbody>{[
                ['Seller revenue before fees',result.revenue], ['Buyer sales tax (excluded from revenue)',result.tax],
                ['Buyer checkout total',result.feeBase], ...result.lines, ['Total modeled fees',result.fees],
                ['Estimated proceeds before seller costs',result.payout], ['Seller costs and allowances',result.costs],
              ].map(([label,value])=><tr key={label}><th scope="row">{label}</th><td>{money(value)}</td></tr>)}</tbody>
            </table></div>
            {result.adsImpact > 0 && <p>Without attributed advertising, the same order would leave about {money(result.profit + result.adsImpact)} in contribution. Compare that difference with the extra orders the ads generate.</p>}
            <p>Price floors hold the effective tax rate and seller costs constant{digital ? '.' : ', including shipping.'} Fees are estimated at full precision and displayed to cents. Compare against your order statement before setting a live price.</p>
          </>}
        </section>
      </div>
      <figure className="tool-image"><img {...responsiveFeatureProps(tool.image)} src={tool.image} width="1200" height="675" loading="lazy" alt={tool.alt}/></figure>
      <FreeToolGuide tool={tool} slug={slug} nextStep={{title:'Check your monthly order target', description:'Use the contribution left per order to estimate how many orders cover your overhead and profit goal.', href:'/calculators/ecommerce-break-even-calculator/', label:'Calculate ecommerce break-even'}}/>
    </div>
  </div>;
}
