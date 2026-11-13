import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const foodPeriodDefaults=Object.freeze({opening:8000,purchases:18000,credits:0,transferIn:0,transferOut:0,closing:6000,staff:0,comps:0,sales:60000,theoretical:18200,waste:600,target:30});
export const foodPeriodFields=[
 ['opening','Beginning food inventory','Physical stock valued at cost at the opening count.'],
 ['purchases','Food purchases received','Gross received food purchases before the credits below; exclude supplies.'],
 ['credits','Supplier credits / purchase reductions','Zero if purchases are already net. Do not enter the same return again as a transfer.'],
 ['transferIn','Food transfers in','At cost from outside this inventory scope; zero if already included in purchases.'],
 ['transferOut','Food transfers out','At cost to another scope. Internal moves within the counted scope are not transfers here.'],
 ['closing','Ending food inventory','Physical stock at cost, using the same locations and valuation basis.'],
 ['staff','Staff meals reclassified, at ingredient cost','Only meals already in usage and moved to a separate expense; not their menu price.'],
 ['comps','Complimentary/promotional food reclassified, at cost','Only documented food cost moved to another expense. Leave zero for ordinary discounts or if retained in food cost.'],
 ['sales','Net food sales for this period','Matching dates/category after discounts, refunds and comps; exclude tips and tax collected for remittance.'],
 ['theoretical','Theoretical ingredient usage (optional)','Recipe cost of the actual paid sales mix, including modifiers, on the same adjusted scope. Blank = unknown; zero = stated zero.'],
 ['waste','Recorded food waste (optional)','Documented waste already included in usage; excluding staff meals/comps. Explains the gap without adding or deducting it again.'],
 ['target','Your food-cost target (%) (optional)','A chosen planning assumption above 0% up to 100%; not an industry benchmark. Blank disables the target comparison.'],
];
const fail=message=>({valid:false,message});
export function calculateDetailedFoodPeriod(input){
 if(!input||typeof input!=='object')return fail('Enter an inventory period.');
 const optional=['theoretical','waste','target'],v={};
 for(const [k] of foodPeriodFields){const x=input[k];if(optional.includes(k)&&x===''){v[k]=null;continue;}if(!['string','number'].includes(typeof x)||String(x).trim()===''||!Number.isFinite(Number(x)))return fail('Complete required fields with numbers; leave an optional field blank if unknown.');try{v[k]=new D(x);}catch{return fail('Use valid decimal numbers.');}if(!v[k].isFinite()||v[k].lt(0)||v[k].gt('1e12'))return fail('Use non-negative amounts up to one trillion.');}
 if(v.sales.lte(0))return fail('Net food sales must be positive to calculate a percentage.');
 if(v.target!==null&&(v.target.lte(0)||v.target.gt(100)))return fail('Your target must be above 0% and at most 100%, or blank.');
 const netPurchases=v.purchases.minus(v.credits),available=v.opening.plus(netPurchases).plus(v.transferIn).minus(v.transferOut),used=available.minus(v.closing),reclassified=v.staff.plus(v.comps),adjusted=used.minus(reclassified);
 if(used.lt(0)||adjusted.lt(0))return fail('Usage is negative after inventory movements or reclassifications. Reconcile counts, credits, transfers and meal costs.');
 if(v.waste!==null&&v.waste.gt(adjusted))return fail('Recorded waste cannot exceed adjusted usage. Check duplicate entries and the inventory scope.');
 const variance=v.theoretical===null?null:adjusted.minus(v.theoretical),foodPct=adjusted.div(v.sales).times(100),budget=v.target===null?null:v.sales.times(v.target).div(100);
 const values={netPurchases,available,used,reclassified,adjusted,foodPct,grossUsagePct:used.div(v.sales).times(100),salesLessFood:v.sales.minus(adjusted),theoreticalPct:v.theoretical===null?null:v.theoretical.div(v.sales).times(100),variance,variancePoints:variance===null?null:variance.div(v.sales).times(100),wastePct:v.waste===null?null:v.waste.div(v.sales).times(100),remainingGap:variance===null||v.waste===null?null:variance.minus(v.waste),budget,targetGap:budget===null?null:adjusted.minus(budget),targetPoints:v.target===null?null:foodPct.minus(v.target),salesAtTarget:v.target===null?null:adjusted.div(v.target.div(100)).times(100).ceil().div(100)};
 if(Object.values(values).some(x=>x!==null&&(!x.isFinite()||x.abs().gt('1e15'))))return fail('These inputs exceed the reporting range. Use a realistic period and sales amount.');
 const warnings=[];if(netPurchases.lt(0))warnings.push('Credits exceed this period’s purchases. Confirm returns, timing and opening stock; negative net purchases are retained.');if(foodPct.gt(100))warnings.push('Adjusted food usage exceeds net food sales. This can occur; investigate period boundaries, counts, sales and cost coding.');if(variance?.lt(0))warnings.push('Actual adjusted usage is below theoretical usage. Verify recipe prices, portions, sales mix and count accuracy before calling this a saving.');if(values.remainingGap?.lt(0))warnings.push('Recorded waste exceeds the net actual–theoretical gap. Other favorable differences may offset it; the signed remainder is not proof of missing stock.');
 return {valid:true,...Object.fromEntries(Object.entries(values).map(([k,x])=>[k,x===null?null:x.toNumber()])),raw:Object.fromEntries(Object.entries(values).map(([k,x])=>[k,x===null?null:x.toString()])),warnings,sensitivity:[{label:'Usage cost 5% lower; sales unchanged',cost:adjusted.times('.95'),sales:v.sales},{label:'Current inputs',cost:adjusted,sales:v.sales},{label:'Sales 5% lower; usage unchanged',cost:adjusted,sales:v.sales.times('.95')}].map(s=>({label:s.label,cost:s.cost.toNumber(),sales:s.sales.toNumber(),pct:s.cost.div(s.sales).times(100).toNumber()}))};
}
export function foodPeriodCSV(input,currency,r){if(!r.valid)return null;const q=x=>'"'+String(x??'Unknown').replaceAll('"','""')+'"';return '\ufeff'+[['Food inventory reconciliation','Method 2026-11-13'],['Currency label; no exchange conversion',currency],...foodPeriodFields.map(([k,label])=>['Input',k,label,input[k]===''?'Unknown':input[k]]),...Object.entries(r.raw).map(([k,x])=>['Result',k,x]),['Assumption','One period, category and inventory scope; values at ingredient cost.'],['Assumption','Reclassified meals remain other business expenses. Waste is explanatory, never added again.'],['Assumption','Sales less food is not contribution or net profit. Targets and sensitivity are assumptions, not savings forecasts.'],...r.warnings.map(x=>['Warning',x])].map(row=>row.map(q).join(',')).join('\r\n');}
