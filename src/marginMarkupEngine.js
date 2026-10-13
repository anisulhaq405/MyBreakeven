import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const MARGIN_MARKUP_VERSION='1.0.0';
const read=raw=>{if(raw===''||raw==null||typeof raw==='boolean')return null;try{const n=new D(raw);return n.isFinite()&&n.gte(0)&&n.lte('1e12')&&(n.isZero()||n.toNumber()>0)?n:null;}catch{return null;}};
const centsUp=n=>n.toDecimalPlaces(2,D.ROUND_CEIL);
const invalid=message=>({valid:false,message});
const convert=values=>Object.fromEntries(Object.entries(values).map(([k,v])=>[k,v instanceof D?v.toNumber():v]));
export function calculateMarginMarkup(input){
 const cost=read(input.cost),price=read(input.price),discount=read(input.discount),target=read(input.target);
 if([cost,price,discount,target].some(v=>v===null))return invalid('Enter finite, non-negative numbers up to 1 trillion. Fill every number field; values too small to represent are not supported.');
 if(discount.gt(100))return invalid('Discount must be between 0% and 100%.');
 if(!['margin','markup'].includes(input.targetType))return invalid('Choose a target margin or target markup.');
 if(input.targetType==='margin'&&target.gte(100))return invalid('A target margin must be below 100% to calculate a finite positive-cost price.');
 const keep=new D(1).minus(discount.div(100));
 const sale=price.times(keep),difference=sale.minus(cost),listDifference=price.minus(cost);
 const targetExact=input.targetType==='margin'?cost.div(new D(1).minus(target.div(100))):cost.times(new D(1).plus(target.div(100)));
 const targetPrice=centsUp(targetExact);
 const requiredList=keep.gt(0)?centsUp(targetPrice.div(keep)):null;
 const targetDifference=targetPrice.minus(cost);
 const values=convert({sale,difference,listDifference,discountLoss:price.minus(sale),
  margin:sale.gt(0)?difference.div(sale).times(100):null,
  markup:cost.gt(0)?difference.div(cost).times(100):null,
  listMargin:price.gt(0)?listDifference.div(price).times(100):null,
  listMarkup:cost.gt(0)?listDifference.div(cost).times(100):null,
  targetPrice,requiredList,
  achievedTarget:input.targetType==='margin'?(targetPrice.gt(0)?targetDifference.div(targetPrice).times(100):null):(cost.gt(0)?targetDifference.div(cost).times(100):null),
 });
 if(Object.values(values).some(v=>v!==null&&(!Number.isFinite(v)||Math.abs(v)>1e12)))return invalid('These values exceed the supported output range of 1 trillion. Check the cost, price and target percentage.');
 return {valid:true,version:MARGIN_MARKUP_VERSION,...values};
}
