import Decimal from 'decimal.js';
import {calculatePriceChange} from './freeToolEngine.js';
const D=Decimal.clone({precision:40});
export function calculatePriceIncrease(input){
 const direct=input.priceMode==='amount';
 if(direct&&(input.newPrice===''||input.newPrice==null||!Number.isFinite(Number(input.newPrice))||Number(input.newPrice)<Number(input.price)||Number(input.newPrice)>1e12))return {valid:false,message:'Enter a new price at least equal to the current price and no greater than 1 trillion. Use the discount calculator for a lower price.'};
 const overhead=input.overheadChange===''||input.overheadChange==null?0:Number(input.overheadChange);
 if(!Number.isFinite(overhead)||overhead<0||overhead>1e12)return {valid:false,message:'Additional monthly overhead must be between zero and 1 trillion.'};
 const check=calculatePriceChange({...input,change:direct?0:input.change},'increase');
 if(!check.valid)return check;
 const price=new D(input.price),keep=new D(1).minus(new D(input.fee).div(100)),volume=new D(input.volume);
 const newPrice=direct?new D(input.newPrice):price.times(new D(1).plus(new D(input.change).div(100)));
 const change=newPrice.div(price).minus(1).times(100);
 const cost=input.newCost===''||input.newCost==null?new D(input.cost):new D(input.newCost);
 const oldContribution=price.times(keep).minus(input.cost),contribution=newPrice.times(keep).minus(cost),baseline=oldContribution.times(volume),needed=baseline.plus(overhead);
 const target=contribution.gt(0)?needed.div(contribution).ceil():null;
 if(target&&target.gt(Number.MAX_SAFE_INTEGER))return {valid:false,message:'This scenario needs too many whole sales to report safely. Adjust the price or cost assumptions.'};
 const expectedVolume=volume.times(new D(1).minus(new D(input.expected).div(100))).floor();
 const revenueTarget=price.times(volume).div(newPrice).ceil();
 const scenario=loss=>{const sales=volume.times(new D(1).minus(new D(loss).div(100))).floor();return {loss,sales:sales.toNumber(),revenue:newPrice.times(sales).toNumber(),contribution:contribution.times(sales).toNumber(),profitChange:contribution.times(sales).minus(needed).toNumber()};};
 const values={newPrice,change,contribution,revisedCost:cost,target,extra:target?target.minus(volume):null,requiredChange:target?volume.minus(target).div(volume).times(100):null,exactLoss:contribution.gt(0)?new D(1).minus(needed.div(contribution.times(volume))).times(100):null,revenueTarget,revenueLoss:volume.minus(revenueTarget).div(volume).times(100),revenueExactLoss:new D(1).minus(price.div(newPrice)).times(100),profitChange:contribution.times(expectedVolume).minus(needed),delta:contribution.times(expectedVolume).minus(baseline),projected:contribution.times(expectedVolume),newRevenue:newPrice.times(expectedVolume),priceDifference:newPrice.minus(price),oldMargin:oldContribution.div(price).times(100),newMargin:contribution.div(newPrice).times(100)};
 const result={...check,inputs:{price:Number(input.price),cost:Number(input.cost),fee:Number(input.fee),volume:Number(input.volume),expected:Number(input.expected)},overheadChange:overhead,expectedVolume:expectedVolume.toNumber(),scenarios:[...new Set([0,5,10,15,20,25,Number(input.expected)])].sort((a,b)=>a-b).map(scenario)};
 for(const [key,value]of Object.entries(values))result[key]=value===null?null:value.toNumber();
 if(Object.values(result).some(x=>typeof x==='number'&&!Number.isFinite(x)))return {valid:false,message:'These values are too large to calculate safely. Use smaller amounts.'};
 return result;
}
export function priceIncreaseCSV(r,currency){
 if(!r.valid)return '';
 return [['Price increase scenario',currency],['Current price',r.inputs.price],['Current variable cost',r.inputs.cost],['Revised variable cost',r.revisedCost],['Percentage selling fee',r.inputs.fee],['Original monthly sales',r.inputs.volume],['Expected sales loss percent',r.inputs.expected],['Monthly capacity',r.capacity??'Unknown'],['New price',r.newPrice],['Price increase percent',r.change],['Additional monthly overhead',r.overheadChange],['Minimum whole sales for unchanged profit',r.target??'Not recoverable'],['Minimum whole sales for unchanged revenue',r.revenueTarget],[],['Assumed sales loss percent','Whole sales','Revenue','Contribution before fixed overhead','Profit change after additional overhead'],...r.scenarios.map(s=>[s.loss,s.sales,s.revenue,s.contribution,s.profitChange]),[],['Assumptions','Same sales mix; unchanged existing overhead; fee applied to new price; expected sales rounded down; required sales rounded up; no demand prediction; currency labels only']].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
