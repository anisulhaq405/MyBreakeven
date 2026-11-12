import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40,rounding:Decimal.ROUND_HALF_UP});
export const ecommerceDetailedDefaults={price:86,shippingIncome:0,cogs:29,outbound:6,packaging:2,labor:7,other:1,cpa:13,feePct:3.2,flatFee:0,returnRate:0,shippingRefundPct:100,recoveryPct:100,returnHandling:5,feeRefundPct:0,flatRefundPct:0,fixed:7800,ownerPay:5000,targetProfit:2000,plannedOrders:650,days:30,conversionPct:2.8,productiveHours:260,hoursPerOrder:.1,returnHours:.1};
const percents=['feePct','returnRate','shippingRefundPct','recoveryPct','feeRefundPct','flatRefundPct','conversionPct'];
export function calculateEcommerceDetailed(raw){
 let v={};for(const k of Object.keys(ecommerceDetailedDefaults)){try{if(raw[k]===''||raw[k]===null||raw[k]===undefined)throw Error();v[k]=new D(raw[k]);if(!v[k].isFinite()||v[k].isNegative()||!Number.isFinite(v[k].toNumber()))throw Error();}catch{return{valid:false,message:'Complete every field with a finite, non-negative number.'}}}
 if(!v.price.gt(0)||!v.hoursPerOrder.gt(0)||!v.conversionPct.gt(0)||!v.days.isInteger()||v.days.lt(1)||v.days.gt(31)||!v.plannedOrders.isInteger()||percents.some(k=>v[k].gt(100)))return{valid:false,message:'Use price and order hours above zero, conversion above 0% and at most 100%, whole planned orders, 1–31 days, and percentages from 0% to 100%.'};
 const n=x=>x.toNumber(),r=v.returnRate.div(100),gross=v.price.plus(v.shippingIncome);
 const refunds=v.price.mul(r).plus(v.shippingIncome.mul(r).mul(v.shippingRefundPct.div(100)));
 const revenue=gross.minus(refunds),stockRecovery=v.cogs.mul(r).mul(v.recoveryPct.div(100)),netCogs=v.cogs.minus(stockRecovery);
 const percentageFees=gross.mul(v.feePct.div(100)).mul(new D(1).minus(r.mul(v.feeRefundPct.div(100))));
 const flatFees=v.flatFee.mul(new D(1).minus(r.mul(v.flatRefundPct.div(100))));
 const returnCost=r.mul(v.returnHandling),variable=netCogs.plus(v.outbound).plus(v.packaging).plus(v.labor).plus(v.other).plus(v.cpa).plus(percentageFees).plus(flatFees).plus(returnCost),cm=revenue.minus(variable);
 const ownerNeed=v.fixed.plus(v.ownerPay),targetNeed=ownerNeed.plus(v.targetProfit),viable=cm.gt(0),target=need=>viable?need.div(cm):null;
 const be=target(v.fixed),owner=target(ownerNeed),goal=target(targetNeed),whole=x=>x===null?null:x.ceil();
 const beWhole=whole(be),ownerWhole=whole(owner),targetWhole=whole(goal),capacity=v.productiveHours.div(v.hoursPerOrder.plus(r.mul(v.returnHours))).floor();
 const operating=v.plannedOrders.mul(cm).minus(v.fixed),afterOwner=operating.minus(v.ownerPay),margin=v.plannedOrders.gt(0)&&be!==null?v.plannedOrders.minus(be).div(v.plannedOrders).mul(100):null;
 const coef=new D(1).minus(r).minus(v.feePct.div(100).mul(new D(1).minus(r.mul(v.feeRefundPct.div(100)))));
 const constant=cm.minus(coef.mul(v.price));
 const priceNeed=v.plannedOrders.gt(0)&&coef.gt(0)?D.max(0,targetNeed.div(v.plannedOrders).minus(constant).div(coef)):null;
 const values={grossRevenuePerOrder:gross,refundsPerOrder:refunds,revenuePerOrder:revenue,stockRecoveryPerOrder:stockRecovery,netCogs,percentageFees,flatFees,returnCost,variableCost:variable,contribution:cm,contributionPct:revenue.gt(0)?cm.div(revenue).mul(100):null,breakEvenExact:be,breakEvenOrders:beWhole,ownerCoveredOrders:ownerWhole,targetExact:goal,targetOrders:targetWhole,breakEvenNetRevenue:beWhole?.mul(revenue)??null,targetNetRevenue:targetWhole?.mul(revenue)??null,targetGrossSales:targetWhole?.mul(gross)??null,targetAverageDaily:targetWhole?.div(v.days)??null,targetDailyCeiling:targetWhole?targetWhole.div(v.days).ceil():null,operatingRemainder:operating,afterOwnerRemainder:afterOwner,targetGap:afterOwner.minus(v.targetProfit),marginOfSafetyPct:margin,plannedNetRevenue:v.plannedOrders.mul(revenue),plannedVariableCost:v.plannedOrders.mul(variable),requiredVisits:targetWhole?targetWhole.div(v.conversionPct.div(100)).ceil():null,capacity,expectedReturnedOrders:v.plannedOrders.mul(r),requiredItemPrice:priceNeed,requiredItemPriceCeiling:priceNeed===null?null:priceNeed.mul(100).ceil().div(100)};
 for(const [k,x]of Object.entries(values)){if(x!==null&&(!Number.isFinite(n(x))||Math.abs(n(x))>Number.MAX_SAFE_INTEGER))return{valid:false,message:'These inputs produce a result outside the supported numeric range. Review the price, margin and volume.'};}
 return{valid:true,viable,...Object.fromEntries(Object.entries(values).map(([k,x])=>[k,x===null?null:n(x)])),capacityFits:targetWhole!==null&&capacity.gte(targetWhole),targetMet:afterOwner.gte(v.targetProfit)};
}
export function ecommerceDetailedScenarios(v){return[['Current inputs',{}],['10% lower item price',{price:new D(v.price||0).mul(.9).toString()}],['$5 higher outbound cost',{outbound:new D(v.outbound||0).plus(5).toString()}],['5 points more returns',{returnRate:D.min(100,new D(v.returnRate||0).plus(5)).toString()}]].map(([label,patch])=>({label,result:calculateEcommerceDetailed({...v,...patch})}));}
