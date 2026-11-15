import React,{useMemo,useState} from 'react';
import CurrencySelector from './CurrencySelector.jsx';
import FreeToolGuide from './FreeToolGuide.jsx';
import {calculateDiscount,discountCSV} from './discountEngine.js';
import './discount-tool.css';
const count=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(n);
export default function DiscountTool({slug,tool}){
 const [input,setInput]=useState({...tool.defaults}),[currency,setCurrency]=useState('USD');
 const r=useMemo(()=>calculateDiscount(input),[input]);
 const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency,currencyDisplay:'code',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
 const pct=n=>`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n)}%`;
 const set=(key,value)=>setInput(s=>({...s,[key]:value}));
 const field=(key,label,help,step='0.01')=><label className="tool-field" key={key}><span>{label}</span><input type="number" min="0" step={step} value={input[key]??''} onChange={e=>set(key,e.target.value)} aria-describedby={`discount-help-${key}`}/><small id={`discount-help-${key}`}>{help}</small></label>;
 const mode=input.discountMode||'percent';
 const changeMode=value=>setInput(s=>({...s,discountMode:value,...(r.valid?{change:r.discountPercent,discountAmount:r.discountAmount,salePrice:r.salePrice}:{})}));
 const reset=()=>setInput({...tool.defaults});
 const exportCSV=()=>{const url=URL.createObjectURL(new Blob([discountCSV(r,currency)],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='discount-break-even-scenario.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 const limit=(value,floor)=>value<0?<><strong>No discount fits</strong><p>At this volume you need at least {money(floor)} per sale, above the current price.</p></>:<><strong>{pct(Math.floor(value*100)/100)} limit</strong><p>Minimum price rounded upward to two decimals: {money(floor)}. The displayed percentage limit is rounded downward.</p></>;
 return <div className="free-tools tool-theme discount-page" style={tool.theme}>
  <nav className="tool-breadcrumb"><a href="/">Home</a> / <a href="/tools/">Business calculators</a> / {tool.name}</nav>
  <section className="tool-hero"><span>FREE · NO SIGNUP · PRIVATE INPUTS</span><h1>{tool.name}</h1><p>{tool.intro}</p><div className="tool-hero-actions"><a className="tool-primary-link" href="#pricing-calculator">Calculate my pricing scenario →</a><a href="#how-to-use">Read the step-by-step guide</a></div></section>
  <figure className="tool-feature"><img src={tool.image} alt={tool.alt} width="1200" height="675" fetchPriority="high" decoding="async"/><figcaption>{tool.caption}</figcaption></figure>
  <section className="tool-quick-answer"><h2>Quick answer</h2><p>{tool.quick}</p></section>
  <nav className="tool-guide-nav" aria-label="Tool page sections">{[['pricing-calculator','Calculator'],['discount-scenarios','Compare discounts'],['how-to-use','How to use'],['formula','Formula'],['worked-examples','Worked examples'],['faqs','FAQs']].map(([id,label])=><a key={id} href={'#'+id}>{label}</a>)}</nav>
  <div className="tool-layout" id="pricing-calculator">
   <section className="tool-input-panel" aria-labelledby="discount-input-heading"><h2 id="discount-input-heading">Your promotion scenario</h2><CurrencySelector value={currency} onChange={setCurrency}/>
    <div className="tool-example-buttons"><button onClick={reset}>Service offer</button><button onClick={()=>setInput({...tool.defaults,price:50,cost:25,volume:200,change:15,expected:40,capacity:350})}>Retail promotion</button><button onClick={()=>setInput({...tool.defaults,campaignCost:300})}>Offer with campaign cost</button></div>
    <div className="tool-input-grid">
     {field('price','Current price per sale','Use the net price before sales tax collected for others.')}
     {field('cost','Current variable cost per sale','Materials, direct labor, fulfillment and flat fees. Exclude the percentage selling fee below.')}
     {field('newCost','Promotion variable cost per sale (optional)','Blank keeps current cost; zero deliberately sets it to zero. Include offer-specific packaging, shipping or variable labor once.')}
     {field('fee','Payment / selling fee (%)','Applied to the discounted selling price. Enter flat fees in variable cost.')}
     {field('volume','Current monthly completed sales','Baseline sales for only the product or customer group receiving the discount.','1')}
     <fieldset className="discount-mode"><legend>Enter your discount as</legend>{[['percent','Percentage off'],['amount','Amount off per sale'],['price','Sale price']].map(([value,label])=><label key={value}><input type="radio" name="discount-mode" checked={mode===value} onChange={()=>changeMode(value)}/>{label}</label>)}</fieldset>
     {mode==='percent'?field('change','Proposed discount (%)','From 0% to 100% of the current price.'):mode==='amount'?field('discountAmount','Discount amount per sale','Amount deducted from each current selling price.'):field('salePrice','Proposed sale price','Net selling price after the discount, before sales tax.')}
     {field('expected','Expected sales increase (%)','Your assumed increase in completed sales, not a demand forecast.','0.1')}
     {field('campaignCost','Additional campaign cost for this month (optional)','Fixed promotion expense such as an ad budget or setup charge. Deducted once, not per sale. Blank means zero.')}
     {field('capacity','Available monthly capacity (optional)','Maximum whole completed sales you can deliver. Blank means unknown.','1')}
    </div><button className="tool-reset" onClick={reset}>Reset example</button>
   </section>
   <section className="tool-result-panel" aria-labelledby="discount-result-heading"><h2 id="discount-result-heading">What the discount must earn back</h2>
    {!r.valid?<p className="tool-warning" role="status">{r.message}</p>:<>
     <div className="tool-headline"><small>Sales needed to preserve baseline profit</small><strong>{r.target===null?'Not recoverable':`${count(r.target)} / month`}</strong><p>{r.target===null?'The sale leaves zero or negative contribution. More sales cannot recover the positive baseline and campaign cost.':r.extra>=0?`${count(r.extra)} additional completed sales (${pct(r.requiredLift)} above baseline).`:`Revised costs allow ${count(-r.extra)} fewer sales while preserving baseline profit.`}</p></div>
     <div className="tool-example-buttons" aria-label="Compare discount percentages">{[5,10,15,20].map(change=><button key={change} aria-pressed={mode==='percent'&&Number(input.change)===change} onClick={()=>setInput(s=>({...s,discountMode:'percent',change}))}>{change}% off</button>)}</div>
     <div className="tool-metrics"><div><small>Sale price</small><strong>{money(r.salePrice)}</strong><span>{pct(r.discountPercent)} off · {money(r.discountAmount)} saved per sale</span></div><div><small>Contribution per sale</small><strong>{money(r.contribution)}</strong><span>Previously {money(r.oldContribution)}</span></div><div><small>Expected completed sales</small><strong>{count(r.expectedVolume)}</strong></div><div><small>Profit change after campaign cost</small><strong>{money(r.profitChange)}</strong><span>Contribution change {money(r.contributionChange)} less {money(r.campaignCost)} campaign cost</span></div></div>
     <p className={r.profitChange>=0?'tool-positive':'tool-warning'}>{r.profitChange>=0?'Expected volume preserves baseline profit.':'Expected volume leaves profit below the baseline.'} Existing overhead is assumed unchanged. This is profit change, not absolute net profit.</p>
     <div className="discount-summary"><div><h3>Revenue-only recovery</h3><strong>{r.revenueTarget===null?'Not recoverable':`${count(r.revenueTarget)} sales`}</strong><p>This ignores fulfillment costs and campaign expense.</p></div><div><h3>Profit recovery</h3><strong>{r.target===null?'Not recoverable':`${count(r.target)} sales`}</strong><p>Includes variable costs, percentage fees and the campaign cost.</p></div></div>
     {r.capacity!==null?<p className={r.target===null||r.target>r.capacity||r.expectedVolume>r.capacity?'tool-warning':'tool-positive'}>{r.target!==null&&r.target<=r.capacity?'The recovery target fits entered capacity.':'The recovery target does not fit entered capacity.'}{r.expectedVolume>r.capacity?' Expected sales also exceed capacity; this projection is not deliverable within that limit.':''} Profit change at full entered capacity: {money(r.capacityProfitChange)}.</p>:<p>Capacity has not been checked. The recovery target does not prove demand or delivery capacity.</p>}
     <details><summary>See the calculation</summary><p>Baseline: {money(r.oldContribution)} contribution × {count(r.volume)} sales = {money(r.baseline)}.</p><p>Discounted contribution = {money(r.salePrice)} × (1 − {pct(r.fee)}) − {money(r.revisedCost)} = {money(r.contribution)}.</p>{r.target!==null&&<p>Required sales = ceiling[({money(r.baseline)} + {money(r.campaignCost)}) ÷ {money(r.contribution)}] = {count(r.target)}. Continuous sales lift before whole-sale rounding: {pct(r.exactLift)}.</p>}<p>Expected contribution: {money(r.projected)}. Profit change = {money(r.projected)} − {money(r.baseline)} − {money(r.campaignCost)} = {money(r.profitChange)}.</p><p>Contribution margin changes from {pct(r.oldMargin)} to {r.newMargin===null?'undefined at a zero selling price':pct(r.newMargin)}. This is not net profit margin.</p><p>Calculations retain precision; displayed money and percentages round to two decimals. Required sales round up and expected completed sales round down.</p></details>
    </>}
   </section>
  </div>
  <section className="discount-decisions" id="discount-scenarios" aria-labelledby="discount-scenarios-heading"><h2 id="discount-scenarios-heading">Compare the offer before you launch</h2>{r.valid?<>
   <div className="discount-summary"><div><h3>Discount supported by expected sales</h3>{limit(r.maxDiscountAtExpected,r.expectedFloorQuote)}<p>Uses {count(r.expectedVolume)} completed sales, revised costs and the campaign expense. This is a mathematical limit, not a recommended promotion.</p></div><div><h3>Discount supported by capacity</h3>{r.capacity===null?<p>Enter available monthly capacity to calculate this limit.</p>:r.capacity===0?<p>Zero capacity cannot recover a positive baseline.</p>:limit(r.maxDiscountAtCapacity,r.capacityFloorQuote)}<p>A capacity limit describes what you can deliver, not what customers will buy.</p></div></div>
   <p>Each card keeps your expected sales at {count(r.expectedVolume)} and changes only the discount. Revised costs, fees and campaign expense stay the same.</p>
   <div className="discount-card-grid">{r.scenarios.map(s=><article key={s.discount} className={s.profitChange>=0?'discount-gain':'discount-loss'}><h3>{pct(s.discount)} off</h3><dl>{[['Sale price',money(s.price)],['Contribution per sale',money(s.contribution)],['Required sales',s.tooLarge?'Too large to report':s.target===null?'Not recoverable':count(s.target)],['Profit change',money(s.profitChange)]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{s.fitsCapacity!==null&&<p>{s.fitsCapacity?'Target fits capacity':'Target exceeds capacity'}</p>}</article>)}</div>
   <div className="discount-actions"><button className="tool-primary-link" onClick={exportCSV}>Download promotion CSV</button><button className="tool-reset" onClick={()=>window.print()}>Print / save PDF</button></div>
   <p>Per-sale contribution reaches zero at {pct(r.zeroContributionDiscount)} off using the promotion cost. {r.zeroContributionDiscount<0?'Promotion cost exceeds full-price proceeds after fees, so even no discount leaves negative contribution.':'This boundary funds no baseline contribution or campaign expense; stay below it to retain positive per-sale contribution.'}</p>
  </>:<p>Complete valid inputs above to compare discount scenarios.</p>}</section>
  <FreeToolGuide tool={tool} slug={slug}/>
 </div>;
}
