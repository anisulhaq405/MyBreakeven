import Decimal from 'decimal.js';
import {operationalTools} from './operationalTools.js';
const D=Decimal.clone({precision:40});
export function calculateOperationalTool(input,mode){
 const tool=Object.values(operationalTools).find(t=>t.mode===mode);
 if(!tool)return {valid:false,message:'Unknown tool.'};
 const keys=Object.keys(tool.defaults);
 if(keys.some(k=>input[k]===''||input[k]==null||!Number.isFinite(Number(input[k]))||Number(input[k])<0||Number(input[k])>1e12))return {valid:false,message:'Enter a non-negative number up to 1 trillion in every field.'};
 const v=Object.fromEntries(keys.map(k=>[k,new D(input[k])])); const pct=n=>n.div(100); let o;
 if(mode==='cleaningContract'){
 if(v.price.lte(0)||v.target.gte(100))return {valid:false,message:'Contract fee must be above zero and target margin below 100%.'};
 const visits=v.visits.times(52).div(12),cost=visits.times(v.hours.times(v.wage).plus(v.supplies).plus(v.travel)).plus(v.overhead),profit=v.price.minus(cost);
 o={main:profit,metrics:[['Average visits / month',visits,'number'],['Monthly modeled cost',cost,'money'],['Profit margin',profit.div(v.price).times(100),'percent'],['Fee for target margin',cost.div(new D(1).minus(pct(v.target))).times(100).ceil().div(100),'money']]};
 }else if(mode==='lawnRoute'){
 if(v.stops.lte(0)||!v.stops.isInteger()||v.crew.lte(0)||!v.crew.isInteger())return {valid:false,message:'Stops and crew must be positive whole numbers.'};
 const hours=v.stops.times(v.service).plus(v.drive).div(60);if(hours.lte(0))return {valid:false,message:'Enter positive service or driving time.'};
 const labor=hours.times(v.crew).times(v.wage),cost=labor.plus(v.vehicle).plus(v.stops.times(v.materials)).plus(v.overhead),profit=v.stops.times(v.price).minus(cost);
 o={main:profit,metrics:[['Elapsed route hours',hours,'number'],['Crew labor cost',labor,'money'],['Profit per elapsed hour',profit.div(hours),'money'],['Profit per stop',profit.div(v.stops),'money']]};
 }else if(mode==='chemical'){
 if(v.size.lte(0)||v.use.lte(0)||v.waste.gte(100))return {valid:false,message:'Bottle and applied volume must be above zero; waste must be below 100%.'};
 const prepared=v.size.times(v.water.plus(1)),usable=prepared.times(new D(1).minus(pct(v.waste))),cost=v.price.times(v.use).div(usable);
 o={main:cost,metrics:[['Prepared solution (mL)',prepared,'number'],['Usable solution (mL)',usable,'number'],['Car equivalents per bottle',usable.div(v.use),'number'],['Prepared volume consumed / car (mL)',v.use.div(new D(1).minus(pct(v.waste))),'number']]};
 }else if(mode==='hairColor'){
 if(v.colorSize.lte(0)||v.developerSize.lte(0)||v.waste.gt(100)||!v.services.isInteger())return {valid:false,message:'Pack quantities must be positive, waste 0–100%, and monthly services a whole number.'};
 const color=v.colorPrice.times(v.colorUse).div(v.colorSize),developer=v.developerPrice.times(v.developerUse).div(v.developerSize),cost=color.plus(developer);
 o={main:cost,metrics:[['Color cost / service',color,'money'],['Developer cost / service',developer,'money'],['Waste cost already included / service',cost.times(pct(v.waste)),'money'],['Monthly product cost',cost.times(v.services),'money']]};
 }else{
 if(!v.orders.isInteger()||v.rate.gt(100)||v.recovery.gt(100))return {valid:false,message:'Orders must be a whole number; return rate and recovery must be 0–100%.'};
 const inventory=v.product.times(new D(1).minus(pct(v.recovery))),cost=inventory.plus(v.outbound).plus(v.reverse).plus(v.handling).plus(v.fees),returns=v.orders.times(pct(v.rate));
 o={main:cost.times(pct(v.rate)),metrics:[['Expected returns / month',returns,'number'],['Inventory cost lost / return',inventory,'money'],['Cost per returned order',cost,'money'],['Monthly return cost burden',cost.times(returns),'money']]};
 }
 return {valid:true,main:o.main.toNumber(),metrics:o.metrics.map(([label,value,type])=>[label,value.toNumber(),type])};
}
