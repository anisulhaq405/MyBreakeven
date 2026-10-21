import Decimal from 'decimal.js';
const D = Decimal.clone({precision:40});
const invalid = message => ({valid:false,message});
function inputs(input, keys){
  const out={};
  for(const key of keys){const v=input[key];if(v==null||typeof v==='boolean'||String(v).trim()==='')return null;
    try{const n=new D(v);if(!n.isFinite()||n.lt(0)||n.gt(1e12)||(!n.isZero()&&n.toNumber()===0))return null;out[key]=n;}catch{return null;}}
  return out;
}
function result(values){if(Object.values(values).some(v=>v!==null&&!v.isZero()&&v.toNumber()===0))return invalid('The result is too small for the supported display. Check units.');const out=Object.fromEntries(Object.entries(values).map(([k,v])=>[k,v===null?null:v.toNumber()]));
  if(Object.values(out).some(v=>v!==null&&(!Number.isFinite(v)||Math.abs(v)>1e15)))return invalid('The result exceeds the supported range. Check units and amounts.');
  return {valid:true,...out};
}
export function calculateBudgetBridge(input){
  const n=inputs(input,['units','price','variable','fixed','openingCash','collectionPercent','oldReceipts','otherPayments','capital','minimumCash']);
  if(!n)return invalid('Complete all ten inputs with finite nonnegative numbers up to 1 trillion. Enter explicit zeros.');
  if(n.price.lte(0)||n.collectionPercent.gt(100))return invalid('Price must be positive and the current-period collection percentage must be between 0 and 100.');
  const sales=n.units.times(n.price),variableCost=n.units.times(n.variable),contribution=sales.minus(variableCost),profit=contribution.minus(n.fixed);
  const currentReceipts=sales.times(n.collectionPercent).div(100),receipts=currentReceipts.plus(n.oldReceipts);
  const operatingPayments=variableCost.plus(n.fixed),payments=operatingPayments.plus(n.otherPayments).plus(n.capital),closing=n.openingCash.plus(receipts).minus(payments);
  return result({sales,variableCost,contribution,profit,currentReceipts,receipts,operatingPayments,payments,closing,cashGap:D.max(n.minimumCash.minus(closing),0),uncollectedCurrentSales:sales.minus(currentReceipts)});
}
export function calculateDriverAllocation(input){
  const n=inputs(input,['poolA','totalA','jobA','poolB','totalB','jobB']);
  if(!n)return invalid('Complete both pools with finite nonnegative amounts up to 1 trillion. Enter explicit zeros for costs or job usage.');
  if(n.totalA.lte(0)||n.totalB.lte(0))return invalid('Each pool needs a positive total driver quantity, including a zero-cost pool.');
  if(n.jobA.gt(n.totalA)||n.jobB.gt(n.totalB))return invalid('Job driver usage cannot exceed its corresponding total pool usage in this same-period allocation.');
  const rateA=n.poolA.div(n.totalA),rateB=n.poolB.div(n.totalB),allocatedA=n.poolA.times(n.jobA).div(n.totalA),allocatedB=n.poolB.times(n.jobB).div(n.totalB);
  return result({rateA,rateB,allocatedA,allocatedB,total:allocatedA.plus(allocatedB),remaining:n.poolA.plus(n.poolB).minus(allocatedA).minus(allocatedB)});
}
export function calculateJobCost(input){
  const n=inputs(input,['materials','hours','laborRate','overhead','totalBase','jobBase','quantity','revenue']);
  if(!n)return invalid('Complete all eight inputs with finite nonnegative amounts up to 1 trillion. Enter explicit zeros where appropriate.');
  if(n.totalBase.lte(0)||n.quantity.lte(0))return invalid('Budgeted total overhead-base quantity and job output quantity must be positive.');
  const overheadRate=n.overhead.div(n.totalBase),applied=n.overhead.times(n.jobBase).div(n.totalBase),labor=n.hours.times(n.laborRate),total=n.materials.plus(labor).plus(applied),surplus=n.revenue.minus(total);
  return result({overheadRate,applied,labor,total,unitCost:total.div(n.quantity),surplus,margin:n.revenue.gt(0)?surplus.div(n.revenue).times(100):null});
}
export function formatDriverRate(n){return n!==0&&Math.abs(n)<1e-8?n.toExponential(4):new Intl.NumberFormat('en-US',{maximumFractionDigits:8}).format(n);}

// Preserve a nonzero result that would otherwise display as a zero currency amount.
export function formatDay3Money(n,currency='USD'){
 if(n!==0&&Math.abs(n)<0.005)return `${currency} ${n.toExponential(4)}`;
 return new Intl.NumberFormat('en-US',{style:'currency',currency,currencyDisplay:'code',minimumFractionDigits:2,maximumFractionDigits:2}).format(n===0?0:n);
}
