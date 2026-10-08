import Decimal from 'decimal.js';
import {decisionTools} from './decisionTools.js';
const D=Decimal.clone({precision:40});
export function calculateDecisionTool(input,mode){
 const tool=Object.values(decisionTools).find(t=>t.mode===mode);
 if(!tool)return {valid:false,message:'Unknown decision tool.'};
 const keys=Object.keys(tool.defaults);
 if(keys.some(k=>String(input[k]).trim()===''||input[k]==null||!Number.isFinite(Number(input[k]))||Number(input[k])<0||Number(input[k])>1e9))return {valid:false,message:'Complete every field with a non-negative number up to one billion.'};
 const v=Object.fromEntries(keys.map(k=>[k,new D(input[k])])),p=x=>x.div(100),one=new D(1);
 const invalid=message=>({valid:false,message});let main,metrics,notes=[];
 if(mode==='rebooking'){
  if(['appointments','capacity'].some(k=>!v[k].isInteger())||v.appointments.lte(0))return invalid('Completed appointments must be a positive whole number; spare capacity must be a whole number.');
  if(['current','target','attendance','fee'].some(k=>v[k].gt(100))||v.fee.gte(100))return invalid('Rates must be 0–100%; payment fee must be below 100%.');
  if(v.target.lt(v.current))return invalid('Target rebooking rate must be at least the current rate.');
  const extra=v.appointments.times(p(v.target.minus(v.current))),expected=extra.times(p(v.attendance)),delivered=D.min(expected,v.capacity),unit=v.price.times(one.minus(p(v.fee))).minus(v.cost),gain=delivered.times(unit);
  main=gain;metrics=[['Additional rebooked appointments',extra,'number'],['Expected attended visits',expected,'number'],['Capacity-limited completed visits',delivered,'number'],['Additional revenue',delivered.times(v.price),'money'],['Contribution per completed visit',unit,'money'],['Visits beyond spare capacity',D.max(0,expected.minus(v.capacity)),'number']];
  notes.push(expected.gt(v.capacity)?'Spare capacity caps the modeled gain. Extra demand above that limit is excluded.':'The expected additional visits fit your spare capacity.');
  notes.push(unit.lte(0)?'These visits have zero or negative contribution. More rebooking does not fix the entered pricing.':'The result is additional contribution before fixed overhead and personal tax.');
 }else if(mode==='noShow'){
  if(['bookings','missed','refilled'].some(k=>!v[k].isInteger())||v.bookings.lte(0)||v.missed.gt(v.bookings)||v.refilled.gt(v.missed))return invalid('Use whole appointment counts: bookings must be positive, missed cannot exceed bookings, and refills cannot exceed missed slots.');
  if(v.fee.gte(100)||v.reduction.gt(100))return invalid('Payment fee must be below 100%; assumed reduction must be 0–100%.');
  const netPrice=v.price.times(one.minus(p(v.fee))),normal=netPrice.minus(v.cost),unfilled=v.missed.minus(v.refilled),retained=v.retained.times(one.minus(p(v.fee))),gap=normal.plus(v.sunk).minus(retained),loss=unfilled.times(gap),avoided=unfilled.times(p(v.reduction));
  main=loss;metrics=[['Missed appointment rate',v.missed.div(v.bookings).times(100),'percent'],['Unfilled missed slots',unfilled,'number'],['Gross service revenue forgone',unfilled.times(v.price),'money'],['Net retained fees on unfilled slots',unfilled.times(retained),'money'],['Contribution gap per unfilled slot',gap,'money'],['Modeled contribution recovered',avoided.times(gap),'money'],['Annualized contribution gap',loss.times(12),'money']];
  notes.push('Refilled slots are treated as equivalent completed services. Retained fees apply only to unfilled slots; refundable deposits are excluded.');
  notes.push(gap.lt(0)?'Negative loss means retained fees exceed the modeled contribution gap. Review whether those fees and costs are realistic.':'Recovery uses your assumed reduction, not a forecast or a claim about reminder software.');
 }else{
  if(v.fee.gte(100))return invalid('Payment fee must be below 100%.');
  const job=s=>{const hours=v['service'+s].plus(v['setup'+s]).plus(v['travel'+s]).div(60);if(hours.lte(0))return null;const costs=v['distance'+s].times(v.vehicle).plus(v['cost'+s]).plus(v['overhead'+s]),revenue=v['price'+s].plus(v['surcharge'+s]),net=revenue.times(one.minus(p(v.fee))).minus(costs),required=costs.plus(hours.times(v.target)).div(one.minus(p(v.fee))),extra=D.max(0,required.minus(revenue)).times(100).ceil().div(100);return {hours,costs,revenue,net,hourly:net.div(hours),extra};};
  const a=job('A'),b=job('B');if(!a||!b)return invalid('Each job needs positive total service, setup or travel time.');
  main=a.hourly.minus(b.hourly);metrics=[['Job A owner earnings / occupied hour',a.hourly,'money'],['Job B owner earnings / occupied hour',b.hourly,'money'],['Job A owner earnings after entered costs',a.net,'money'],['Job B owner earnings after entered costs',b.net,'money'],['Job A occupied hours',a.hours,'number'],['Job B occupied hours',b.hours,'number'],['Additional surcharge needed: A',a.extra,'money'],['Additional surcharge needed: B',b.extra,'money']];
  notes.push(a.hourly.eq(b.hourly)?'Both jobs have the same modeled hourly return.':`${a.hourly.gt(b.hourly)?'Job A':'Job B'} has the higher modeled earnings per occupied hour. This does not prove which booking will sell.`);
  notes.push('Owner earnings are before personal tax. Include helper wages in job costs, but do not also subtract your own target earnings as a cost. Distance and travel minutes cover the entire allocated journey.');
 }
 const result={valid:true,main:main.toNumber(),metrics:metrics.map(([l,n,t])=>[l,n.toNumber(),t]),notes};
 return [result.main,...result.metrics.map(m=>m[1])].every(Number.isFinite)?result:invalid('These inputs exceed the reporting range. Reduce costs or use realistic positive time.');
}
