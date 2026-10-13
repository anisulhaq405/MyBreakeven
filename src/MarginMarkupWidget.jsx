import React,{useMemo,useState} from 'react';
import CurrencySelector from './CurrencySelector';
import {calculateMarginMarkup,MARGIN_MARKUP_VERSION} from './marginMarkupEngine.js';
import './margin-markup-widget.css';
const example={cost:70,price:100,discount:0,targetType:'margin',target:30};
export default function MarginMarkupWidget(){
 const [input,setInput]=useState({...example});const [currency,setCurrency]=useState('USD');
 const result=useMemo(()=>calculateMarginMarkup(input),[input]);
 const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency,currencyDisplay:'code',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
 const percentage=n=>n===null?'Undefined':`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n)}%`;
 const field=(key,label,help,max)=> <label className="margin-widget-field"><span>{label}</span><input type="number" inputMode="decimal" min="0" max={max} step="any" value={input[key]} onChange={e=>setInput(s=>({...s,[key]:e.target.value}))} aria-describedby={`margin-help-${key}`}/><small id={`margin-help-${key}`}>{help}</small></label>;
 return <section className="margin-widget" id="margin-calculator" aria-labelledby="margin-widget-title">
  <h2 id="margin-widget-title">Markup vs Margin Calculator</h2>
  <p>Compare both percentages on the same sale, test a discount, then work backward from a target margin or markup.</p>
  <div className="margin-widget-grid"><div className="margin-widget-inputs">
   <CurrencySelector value={currency} onChange={setCurrency}/>
   {field('cost','Defined cost per unit','Include the non-percentage costs relevant to this product or job, once.')}
   {field('price','List selling price per unit','Price before the entered discount; exclude pass-through sales tax.')}
   {field('discount','Discount (%)','Zero compares the original price. Cost is assumed unchanged.',100)}
   <fieldset><legend>Price from your target</legend><label className="margin-widget-field"><span>Target type</span><select value={input.targetType} onChange={e=>setInput(s=>({...s,targetType:e.target.value}))}><option value="margin">Margin on selling price</option><option value="markup">Markup on cost</option></select></label>
   {field('target',input.targetType==='margin'?'Target margin (%)':'Target markup (%)','Margin must be below 100%; markup may exceed 100%.',input.targetType==='margin'?99.999999:undefined)}</fieldset>
   <button type="button" onClick={()=>setInput({...example})}>Reset example</button>
  </div><div className="margin-widget-results" aria-labelledby="margin-results-title"><h3 id="margin-results-title">Your sale and target price</h3>
   {!result.valid?<p className="margin-widget-warning" role="status">{result.message}</p>:<>
    <dl aria-live="polite" aria-atomic="true"><div><dt>Collected price after discount</dt><dd>{money(result.sale)}</dd></div><div><dt>Difference after defined cost</dt><dd>{money(result.difference)}</dd></div><div><dt>Margin on collected price</dt><dd>{percentage(result.margin)}</dd></div><div><dt>Markup on defined cost</dt><dd>{percentage(result.markup)}</dd></div></dl>
    <div className="margin-widget-target"><p>{input.targetType==='margin'?'Selling price for target margin':'Selling price for target markup'}<strong>{money(result.targetPrice)}</strong></p><p>List price that preserves this floor after your discount<strong>{result.requiredList===null?'No finite price at 100% off':money(result.requiredList)}</strong></p><p>Achieved {input.targetType} at the rounded selling-price floor: {percentage(result.achievedTarget)}.</p></div>
    <p>Before discount: {percentage(result.listMargin)} margin and {percentage(result.listMarkup)} markup. This discount removes {money(result.discountLoss)} from the price and from the difference after the unchanged cost.</p>
    {result.difference<0&&<p className="margin-widget-warning">The collected price is below your entered cost.</p>}
    {Number(input.cost)===0&&<p>Percentage markup is undefined at zero cost. A zero target-price floor does not define a margin; use a positive selling price to evaluate it.</p>}
    {result.sale===0&&<p>Percentage margin is undefined at zero collected price.</p>}
   </>}
   <p className="margin-widget-note">Margin uses selling price as its denominator; markup uses cost. Price floors round upward to cents. Inputs stay on this page; currency labels do not convert amounts.</p>
  </div></div>
  <p>This is margin on your stated cost basis, not automatically gross or net accounting profit. Percentage selling fees and monthly overhead are outside this widget. Test percentage fees with the <a href="/calculators/menu-pricing-calculator/">menu pricing calculator</a>, or extra sales needed after a discount with the <a href="/calculators/discount-break-even-calculator/">discount break-even calculator</a>.</p>
  <p className="margin-widget-note">Pricing engine {MARGIN_MARKUP_VERSION}. Read the <a href="#margin-markup-formulas">formulas and cost boundaries</a> below.</p>
 </section>;
}
