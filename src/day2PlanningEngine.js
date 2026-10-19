import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
const bad=message=>({valid:false,message});
function read(v){if(v==null||typeof v==='boolean'||String(v).trim()==='')return null;try{const n=new D(v);return n.isFinite()&&n.gte(0)&&n.lte(1e12)&&(n.isZero()||n.toNumber()>0)?n:null;}catch{return null;}}
const convert=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v instanceof D?v.toNumber():v]));
const safe=o=>Object.values(o).every(v=>v===null||typeof v!=='number'||Number.isFinite(v)&&Math.abs(v)<=1e15);
export function calculateFlexibleBudget(input){
 const keys=['plannedUnits','actualUnits','price','variableRate','fixedBudget','actualRevenue','actualVariable','actualFixed'];
 const n=Object.fromEntries(keys.map(k=>[k,read(input[k])]));
 if(Object.values(n).some(v=>v===null))return bad('Complete all eight inputs with finite, nonnegative amounts up to 1 trillion. Enter explicit zeros where appropriate.');
 if(n.price.lte(0))return bad('The budgeted unit selling price must be positive.');
 const make=(units)=>{const revenue=units.times(n.price),variable=units.times(n.variableRate),contribution=revenue.minus(variable),fixed=n.fixedBudget;return {revenue,variable,contribution,fixed,profit:contribution.minus(fixed)};};
 const staticBudget=make(n.plannedUnits),flexibleBudget=make(n.actualUnits);
 const actual={revenue:n.actualRevenue,variable:n.actualVariable,contribution:n.actualRevenue.minus(n.actualVariable),fixed:n.actualFixed,profit:n.actualRevenue.minus(n.actualVariable).minus(n.actualFixed)};
 const volumeEffect=new D(flexibleBudget.profit).minus(staticBudget.profit),performanceEffect=new D(actual.profit).minus(flexibleBudget.profit),totalVariance=new D(actual.profit).minus(staticBudget.profit);
 const summary=convert({volumeEffect,performanceEffect,totalVariance,actualUnitPrice:n.actualUnits.gt(0)?n.actualRevenue.div(n.actualUnits):null});
 if(![convert(staticBudget),convert(flexibleBudget),convert(actual),summary].every(safe))return bad('The result exceeds the supported output range. Check quantities and cost units.');
 return {valid:true,staticBudget:convert(staticBudget),flexibleBudget:convert(flexibleBudget),actual:convert(actual),...summary,warning:n.actualUnits.isZero()&&n.actualRevenue.gt(0)?'Revenue is positive with zero activity. Reconcile the timing and chosen unit before interpreting this comparison.':null};
}
export function calculateMakeOrBuy(input){
 const keys=['quantity','makeVariable','avoidableFixed','buyUnit','buyExtra','opportunity','commonFixed'];
 const n=Object.fromEntries(keys.map(k=>[k,read(input[k])]));
 if(Object.values(n).some(v=>v===null))return bad('Complete all seven inputs with finite, nonnegative amounts up to 1 trillion. Enter explicit zeros for excluded costs.');
 if(n.quantity.lte(0))return bad('Quantity must be positive for this decision.');
 const make=n.quantity.times(n.makeVariable).plus(n.avoidableFixed).plus(n.opportunity),buy=n.quantity.times(n.buyUnit).plus(n.buyExtra),difference=make.minus(buy);
 const slope=n.buyUnit.minus(n.makeVariable),numerator=n.avoidableFixed.plus(n.opportunity).minus(n.buyExtra);
 const cross=slope.isZero()?null:numerator.div(slope);
 const result=convert({make,buy,difference,makeIncludingCommon:make.plus(n.commonFixed),buyIncludingCommon:buy.plus(n.commonFixed),commonFixed:n.commonFixed,crossover:cross!==null&&cross.gt(0)?cross:null});
 if(!safe(result))return bad('The result exceeds the supported output range. Check unit costs and period totals.');
 return {valid:true,...result,choice:difference.isZero()?'tie':difference.gt(0)?'buy':'make',sameSlope:slope.isZero(),allQuantitiesTie:slope.isZero()&&numerator.isZero()};
}
export function varianceLabel(value,higherIsBetter=true){if(value===0)return 'On budget';return (higherIsBetter?value>0:value<0)?'Favorable':'Unfavorable';}
export function calculateBreakEvenChart(input){
 const keys=['fixed','price','variable','maxUnits'];const n=Object.fromEntries(keys.map(k=>[k,read(input[k])]));
 if(Object.values(n).some(v=>v===null))return bad('Complete all four inputs with finite nonnegative numbers up to 1 trillion.');
 if(n.price.lte(0)||n.maxUnits.lte(0))return bad('Price and the maximum plotted activity must be positive.');
 const contribution=n.price.minus(n.variable),exact=contribution.gt(0)?n.fixed.div(contribution):null;
 const result=convert({fixed:n.fixed,price:n.price,variable:n.variable,maxUnits:n.maxUnits,contribution,exactUnits:exact,wholeUnits:exact===null?null:exact.ceil(),maxSales:n.maxUnits.times(n.price),maxCost:n.fixed.plus(n.maxUnits.times(n.variable))});
 if(!safe(result))return bad('The result exceeds the supported display range. Check costs and activity units.');
 return {valid:true,...result};
}
