import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export function calculateBusinessTool(input,mode){
 const fields=mode==='roas'?['price','cost','fee','spend','revenue','margin']:mode==='hourly'?['income','overhead','profit','hours','weeks','billable','fee']:['cash','reserve','incoming','outgoing','months'];
 if(fields.some(k=>input[k]===''||input[k]==null||!Number.isFinite(Number(input[k]))||Number(input[k])<0||Number(input[k])>1e12))return {valid:false,message:'Enter a non-negative number up to 1 trillion in every field.'};
 const v=Object.fromEntries(fields.map(k=>[k,new D(input[k])]));let out;
 if(mode==='roas'){
  if(v.price.lte(0)||v.spend.lte(0)||v.fee.gte(100)||v.margin.gte(100))return {valid:false,message:'Order value and ad spend must be above zero. Fees and target margin must be below 100%.'};
  const contribution=v.price.times(new D(1).minus(v.fee.div(100))).minus(v.cost),rate=contribution.div(v.price),targetRate=rate.minus(v.margin.div(100));
  out={contribution,rate:rate.times(100),breakEven:rate.gt(0)?new D(1).div(rate):null,target:targetRate.gt(0)?new D(1).div(targetRate):null,actual:v.revenue.div(v.spend),profit:v.revenue.times(rate).minus(v.spend),maxCPA:contribution.gt(0)?contribution:new D(0),requiredRevenue:rate.gt(0)?v.spend.div(rate):null,estimatedOrders:v.revenue.div(v.price)};
 }else if(mode==='hourly'){
  if(v.hours.lte(0)||v.hours.gt(168)||v.weeks.lte(0)||v.weeks.gt(52)||v.billable.lte(0)||v.billable.gt(100)||v.fee.gte(100))return {valid:false,message:'Use 0–168 weekly hours (above zero), 0–52 working weeks (above zero), billable time above 0% up to 100%, and fees below 100%.'};
  const annualHours=v.hours.times(v.weeks).times(v.billable.div(100)),annualNeed=v.income.plus(v.overhead).plus(v.profit).times(12),raw=annualNeed.div(annualHours).div(new D(1).minus(v.fee.div(100)));
  const rate=raw.times(100).ceil().div(100);
  out={rate,annualHours,monthlyHours:annualHours.div(12),annualNeed,annualRevenue:rate.times(annualHours),monthlyNet:rate.times(annualHours).times(new D(1).minus(v.fee.div(100))).div(12).minus(v.overhead),nonBillable:v.hours.times(v.weeks).minus(annualHours)};
 }else if(mode==='runway'){
  if(v.reserve.gt(v.cash)||!v.months.isInteger()||v.months.lt(1)||v.months.gt(36))return {valid:false,message:'Reserve cannot exceed current cash. Choose a whole planning horizon from 1 to 36 months.'};
  const usable=v.cash.minus(v.reserve),burn=v.outgoing.minus(v.incoming),runway=usable.eq(0)?new D(0):burn.gt(0)?usable.div(burn):null;
  out={usable,burn,runway,fullMonths:runway===null?null:runway.floor(),endingCash:v.cash.minus(burn.times(v.months)),extraNeeded:D.max(0,burn.times(v.months).minus(usable))};
  out.balances=Array.from({length:Number(input.months)},(_,i)=>({month:i+1,cash:v.cash.minus(burn.times(i+1)).toNumber()}));
 }else return {valid:false,message:'Unknown tool.'};
 const result={valid:true};for(const [k,n]of Object.entries(out))result[k]=n instanceof D?n.toNumber():n;
 if(Object.values(result).some(n=>typeof n==='number'&&!Number.isFinite(n)))return {valid:false,message:'These values are too large to report. Use smaller amounts.'};
 return result;
}
