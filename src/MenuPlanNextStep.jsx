import React, {useState} from 'react';
import {menuRestaurantPlan} from './menuPlanTransfer.js';
import {stageCalculatorPlan} from './calculatorTransfer.js';
import {trackFoodEvent} from './productAnalytics.js';

const fields = [
 ['acquisitionCost','Additional promotion cost per order','Enter 0 only if none, or if already included above.'],
 ['workers','Active team members','Whole people delivering the modeled orders.'],
 ['hoursPerWorker','Hours per team member / week','Available working hours before productive utilization.'],
 ['hoursPerJob','Total worker-hours per order','Two people working 15 minutes each use 0.5 worker-hours.'],
 ['utilizationPct','Productive utilization (%)','Share of working time available for these orders, 0–100%.'],
 ['conversionPct','Qualified visit or inquiry conversion (%)','Use the same demand basis throughout, above 0% up to 100%.'],
];
export default function MenuPlanNextStep({input, currency}) {
 const [operations,setOperations]=useState(()=>Object.fromEntries(fields.map(([key])=>[key,''])));
 const [confirmed,setConfirmed]=useState(false);
 const [error,setError]=useState('');
 const plan=menuRestaurantPlan(input,operations,confirmed);
 return <section className="food-next-step" id="restaurant-plan-next" aria-labelledby="restaurant-plan-next-title">
  <h2 id="restaurant-plan-next-title">Carry this order into your monthly plan</h2>
  <p>The full calculator uses complete orders and working hours. A single dish or serving may be only part of an order. Keep using menu pricing for that item until you have a representative order.</p>
  <details><summary>Review scope and continue with these numbers</summary>
   <p>Carry your tested price, ingredients, variable labor, packaging plus other variable costs, percentage fee, fixed commitments, additional owner pay, profit goal and expected sales in {currency}. Targets based on food-cost percentage are not substituted for your tested price.</p>
   <p>Weekly item capacity cannot tell us team size or worker-hours. Enter those separately below; the full plan recalculates capacity and adds the promotion cost you enter here. Check that all monthly commitments cover the same modeled orders and compensation is counted once.</p>
   <div className="tool-input-grid">{fields.map(([key,label,help])=><label className="tool-field" key={key}><span>{label}</span><input type="number" inputMode="decimal" min={key==='workers'?'1':['hoursPerJob','conversionPct'].includes(key)?'0.01':'0'} max={key.endsWith('Pct')?'100':undefined} step={key==='workers'?'1':'any'} value={operations[key]} onChange={e=>{setOperations(s=>({...s,[key]:e.target.value}));setError('');}} aria-describedby={`plan-help-${key}`}/><small id={`plan-help-${key}`}>{help}</small></label>)}</div>
   <label className="food-scope-confirm"><input type="checkbox" checked={confirmed} onChange={e=>{setConfirmed(e.target.checked);setError('');}}/>Each selling unit is one complete representative order. Its costs, monthly commitments and expected sales share the same scope; labor and owner compensation are counted once.</label>
   <a className="tool-primary-link" href="/?industry=restaurant&from=industry#calculator" onClick={e=>{
    let saved=false;
    try {if(plan)saved=stageCalculatorPlan('restaurant',plan,window.sessionStorage,Date.now(),currency);} catch {/* Optional browser storage. */}
    if(saved)trackFoodEvent('menu_plan_continue','menu-pricing-calculator');
    else {e.preventDefault();setError(plan?'Your browser could not carry this plan. Your inputs remain here; allow session storage or enter the numbers manually in the restaurant calculator.':'Confirm the order scope and complete all six operating inputs. The tested price must leave positive contribution after promotion cost.');}
   }}>Continue with this order in the full calculator →</a>
   <p>Only this explicit action carries a temporary plan in the same tab. It expires after five minutes and is removed when opened. No financial inputs enter the URL or analytics.</p>
   {error&&<p className="tool-warning" role="status">{error}</p>}
  </details>
  <p>Need several dish or channel scenarios instead? <a href="/blogs/restaurant-menu-engineering-contribution-margin/">Review menu mix and kitchen time</a> before combining them.</p>
 </section>;
}
