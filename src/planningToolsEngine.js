import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
const bad=message=>({valid:false,message});
const read=v=>{if(v==null||v===''||typeof v==='boolean')return null;try{const n=new D(v);return n.isFinite()&&n.gte(0)&&n.lte(1e12)&&(n.isZero()||n.toNumber()>0)?n:null;}catch{return null;}};
const out=obj=>Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v instanceof D?v.toNumber():v]));
const supported=obj=>Object.values(obj).every(v=>v===null||typeof v!=='number'||(Number.isFinite(v)&&Math.abs(v)<=1e12));
export function calculateEmployeeCost(input){
 const keys=['salary','bonus','employerCosts','benefits','overhead','hiring','paidHours','leaveHours','utilization','billRate','otherHourly'];
 const v=Object.fromEntries(keys.map(k=>[k,read(input[k])]));
 if(Object.values(v).some(n=>n===null))return bad('Fill every field with finite non-negative numbers up to 1 trillion. Enter annual costs and annual hours on the same basis.');
 if(v.paidHours.lte(0)||v.leaveHours.gt(v.paidHours)||v.utilization.gt(100))return bad('Paid hours must be positive, leave cannot exceed paid hours, and productive share must be 0–100%.');
 const recurring=v.salary.plus(v.bonus).plus(v.employerCosts).plus(v.benefits).plus(v.overhead);
 const firstYear=recurring.plus(v.hiring),available=v.paidHours.minus(v.leaveHours),productive=available.times(v.utilization).div(100);
 const availableContribution=v.billRate.minus(v.otherHourly);
 const result=out({recurring,firstYear,available,productive,paidRate:recurring.div(v.paidHours),productiveRate:productive.gt(0)?recurring.div(productive):null,firstYearRate:productive.gt(0)?firstYear.div(productive):null,burden:v.salary.gt(0)?recurring.div(v.salary):null,requiredHours:availableContribution.gt(0)?firstYear.div(availableContribution):null,annualContribution:productive.times(availableContribution),fundingGap:productive.times(availableContribution).minus(firstYear)});
 if(!supported(result))return bad('The result exceeds the supported output range. Check the costs, hours and recovery rate.');
 return {valid:true,...result};
}
const DAY=86400000;
export function dateNumber(raw){if(typeof raw!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(raw))return null;const n=Date.parse(raw+'T00:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===raw&&raw>='1900-01-01'&&raw<='2100-12-31'?n:null;}
export const dateText=n=>new Date(n).toISOString().slice(0,10);
export function calculateCashForecast(input){
 const start=dateNumber(input.start),opening=read(input.opening),reserve=read(input.reserve),delay=read(input.delay),realization=read(input.realization);
 if(start===null||[opening,reserve,delay,realization].some(v=>v===null)||!delay.isInteger()||delay.gt(90)||realization.gt(100))return bad('Use a valid start date (1900–2100), non-negative cash amounts, a whole receipt delay of 0–90 days and collection share of 0–100%.');
 if(!Array.isArray(input.events)||input.events.length>100)return bad('Use up to 100 dated cash events.');
 const weeks=Array.from({length:13},(_,i)=>({start:dateText(start+i*7*DAY),end:dateText(start+(i*7+6)*DAY),receipts:new D(0),payments:new D(0),financeIn:new D(0),financeOut:new D(0)}));
 let excluded=0,excludedAmount=new D(0);
 for(const event of input.events){const amount=read(event.amount),date=dateNumber(event.date);if(amount===null||date===null||!['receipt','payment'].includes(event.type)||!['operating','financing'].includes(event.category))return bad('Every event needs a valid date, receipt/payment direction, operating/financing category and non-negative amount. Remove unused rows.');
 const receipt=event.type==='receipt',operating=event.category==='operating';
 const shifted=date+(receipt&&operating?delay.toNumber()*DAY:0),effective=receipt&&operating?amount.times(realization).div(100):amount;
 const index=Math.floor((shifted-start)/(7*DAY));
 if(index<0||index>=13){excluded++;excludedAmount=excludedAmount.plus(effective);continue;}
 const key=operating?(receipt?'receipts':'payments'):(receipt?'financeIn':'financeOut');weeks[index][key]=weeks[index][key].plus(effective);
 }
 let cash=opening,min=opening,firstBelow=opening.lt(reserve)?'Opening balance':null,totalIn=new D(0),totalOut=new D(0);
 const rows=weeks.map(w=>{const incoming=w.receipts.plus(w.financeIn),outgoing=w.payments.plus(w.financeOut),net=incoming.minus(outgoing),close=cash.plus(net);const row=out({...w,opening:cash,net,closing:close,headroom:close.minus(reserve)});cash=close;min=D.min(min,cash);if(firstBelow===null&&cash.lt(reserve))firstBelow=w.start;totalIn=totalIn.plus(incoming);totalOut=totalOut.plus(outgoing);return row;});
 const summary=out({closing:cash,min,shortfall:D.max(0,reserve.minus(min)),totalIn,totalOut,excludedAmount});
 if(!supported(summary)||rows.some(row=>!supported(row)))return bad('The forecast exceeds the supported cash range of 1 trillion.');
 return {valid:true,rows,...summary,firstBelow,excluded,end:dateText(start+90*DAY)};
}
