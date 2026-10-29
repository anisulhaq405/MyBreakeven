import Decimal from 'decimal.js';
const D=Decimal.clone({precision:36});
export const ebitdaDefaults=()=>({net:'80000',interest:'10000',tax:'20000',depreciation:'15000',amortization:'5000',revenue:'1000000'});
export const fvDefaults=()=>({principal:'10000',payment:'200',months:'120',rate:'6',basis:'effective',compound:'12',frequency:'12',timing:'end',inflation:'2.5'});
function parse(v,key,errors,{min=0,max=1e9,places=2,optional=false,integer=false}={}){
 if(optional&&(v===''||v===undefined))return null;
 const s=String(v??'');const re=new RegExp(`^-?(?:0|[1-9]\\d*)(?:\\.\\d{1,${places}})?$`);
 if(!re.test(s)){errors[key]='Enter a plain number'+(places===0?'':` with up to ${places} decimal places`)+'. Use zero explicitly.';return null;}
 const n=new D(s);if(n.lt(min)||n.gt(max)||(integer&&!n.isInteger())){errors[key]=`Enter ${integer?'a whole number ':''}from ${min} to ${max}.`;return null;}return n;
}
export function calculateEbitda(v,adjustments=[]){
 const errors={},x={};for(const k of ['net','interest','tax','depreciation','amortization','revenue'])x[k]=parse(v[k],k,errors,{min:['net','tax'].includes(k)?-1e9:0,optional:k==='revenue'});
 const names=new Set();const adj=adjustments.map((a,i)=>{const name=String(a.name??'').trim(),norm=name.toLowerCase();if(!name||name.length>100||names.has(norm))errors['adjustment-name-'+i]='Give each adjustment a unique description of 1–100 characters.';names.add(norm);return {name,amount:parse(a.amount,'adjustment-'+i,errors,{min:-1e9})};});
 if(adjustments.length>12)errors.adjustments='Use at most 12 separately documented adjustments.';
 if(Object.keys(errors).length)return {valid:false,errors};
 const base=x.net.plus(x.interest).plus(x.tax).plus(x.depreciation).plus(x.amortization),adjusted=adj.reduce((s,a)=>s.plus(a.amount),base);
 const margin=n=>x.revenue?.gt(0)?n.div(x.revenue).times(100).toNumber():null;
 return {valid:true,errors,base:base.toNumber(),adjusted:adjusted.toNumber(),margin:margin(base),adjustedMargin:margin(adjusted),bridge:Object.entries(x).filter(([k])=>k!=='revenue').map(([key,n])=>({key,value:n.toNumber()})),adjustments:adj.map(a=>({name:a.name,amount:a.amount.toNumber()}))};
}
export function calculateFutureValue(v){
 const errors={};let principal=parse(v.principal,'principal',errors),payment=parse(v.payment,'payment',errors),months=parse(v.months,'months',errors,{max:1200,integer:true}),rate=parse(v.rate,'rate',errors,{min:-99,max:100,places:4}),inflation=parse(v.inflation,'inflation',errors,{min:-99,max:100,places:4});
 if(!['effective','nominal'].includes(v.basis))errors.basis='Choose an annual rate convention.';
 if(!['1','2','4','12','365'].includes(v.compound))errors.compound='Choose a listed compounding frequency.';
 if(!['1','4','12'].includes(v.frequency))errors.frequency='Choose annual, quarterly or monthly contributions.';
 if(!['begin','end'].includes(v.timing))errors.timing='Choose beginning or end of period.';
 const frequency=Number(v.frequency),compounds=Number(v.compound);
 if(months&&!months.times(frequency).mod(12).eq(0))errors.months=`Use whole ${12/frequency}-month contribution periods for this frequency.`;
 if(Object.keys(errors).length)return {valid:false,errors};
 const annual=rate.div(100).toNumber(),p=frequency,n=months.times(p).div(12).toNumber(),years=months.div(12).toNumber();
 const logAnnual=v.basis==='nominal'?compounds*Math.log1p(annual/compounds):Math.log1p(annual),i=Math.expm1(logAnnual/p),period=new D(i),factor=period.plus(1),due=v.timing==='begin';
 let balance=principal,contributed=principal,rows=[];
 rows.push({period:0,months:0,opening:principal.toNumber(),deposit:0,growth:0,balance:principal.toNumber()});
 for(let k=1;k<=n;k++){const opening=balance,deposit=payment;const growth=(due?balance.plus(deposit):balance).times(period);balance=balance.plus(deposit).plus(growth);contributed=contributed.plus(deposit);if(!balance.isFinite()||balance.abs().gt(1e15))return {valid:false,errors:{rate:'This combination exceeds the supported ending-balance range (1 quadrillion). Reduce rate, term or amounts.'}};rows.push({period:k,months:k*12/p,opening:opening.toNumber(),deposit:deposit.toNumber(),growth:growth.toNumber(),balance:balance.toNumber()});}
 const deflator=Math.exp(Math.log1p(inflation.div(100).toNumber())*years),real=balance.div(deflator);if(!real.isFinite()||real.abs().gt(1e15))return {valid:false,errors:{inflation:'Inflation-adjusted result exceeds the supported range. Adjust inflation or horizon.'}};
 const pow=Math.exp(logAnnual*years),annuity=i===0?n:Math.expm1(logAnnual*years)/i;const closed=principal.times(pow).plus(payment.times(annuity).times(due?factor:1)).toNumber();
 return {valid:true,errors,balance:balance.toNumber(),contributed:contributed.toNumber(),growth:balance.minus(contributed).toNumber(),real:real.toNumber(),periodRate:i*100,effectiveAnnual:Math.expm1(logAnnual)*100,periods:n,years,rows,closed};
}
// Optional planning extension. Existing fixed-deposit engine remains the baseline.
export function calculateFutureValuePlan(v,settings={}){
 const baseline=calculateFutureValue(v);
 if(!baseline.valid)return baseline;
 const errors={};
 const fee=parse(settings.fee??'0','fee',errors,{min:0,max:25,places:4});
 const step=parse(settings.step??'0','step',errors,{min:-100,max:100,places:4});
 const fixedFee=parse(settings.fixedFee??'0','fixedFee',errors,{min:0,max:100000,places:2});
 const delay=parse(settings.delay??'0','delay',errors,{min:0,max:1200,places:0,integer:true});
 if(Object.keys(errors).length)return {valid:false,errors};
 const rate=Number(v.rate)/100,compounds=Number(v.compound),frequency=Number(v.frequency);
 const logAnnual=v.basis==='nominal'?compounds*Math.log1p(rate/compounds):Math.log1p(rate);
 const periodRate=Math.expm1(logAnnual/frequency);
 const periodFee=Math.expm1(Math.log1p(-fee.toNumber()/100)/frequency);
 const periods=baseline.periods,initial=new D(v.principal),basePayment=new D(v.payment);
 let balance=initial,withoutFees=initial,contributed=initial,totalFees=new D(0),rows=[{period:0,months:0,opening:initial.toNumber(),deposit:0,growth:0,fee:0,balance:initial.toNumber()}];
 const due=v.timing==='begin';
 for(let k=1;k<=periods;k++){
  const opening=balance;
  const yearIndex=Math.floor((k-1)/frequency);
  const payment=basePayment.times(new D(1).plus(step.div(100)).pow(yearIndex));
  const deposit=k<=delay.toNumber()?new D(0):payment;
  const noFeeBase=due?withoutFees.plus(deposit):withoutFees;
  withoutFees=withoutFees.plus(deposit).plus(noFeeBase.times(periodRate));
  const earningBase=due?balance.plus(deposit):balance;
  const growth=earningBase.times(periodRate);
  const beforeFee=balance.plus(deposit).plus(growth);
  const variableFee=beforeFee.times(-periodFee);
  const charge=variableFee.plus(fixedFee);
  balance=D.max(0,beforeFee.minus(charge));
  totalFees=totalFees.plus(D.min(charge,beforeFee));
  contributed=contributed.plus(deposit);
  if(!balance.isFinite()||!contributed.isFinite()||balance.gt('1e15')||contributed.gt('1e15'))return {valid:false,errors:{plan:'The projected amounts exceed the supported range.'}};
  rows.push({period:k,months:k*12/frequency,opening:opening.toNumber(),deposit:deposit.toNumber(),growth:growth.toNumber(),fee:D.min(charge,beforeFee).toNumber(),balance:balance.toNumber()});
 }
 const years=Number(v.months)/12,deflator=Math.pow(1+Number(v.inflation)/100,years);
 if(!Number.isFinite(deflator)||deflator===0||!balance.div(deflator).isFinite()||balance.div(deflator).abs().gt('1e15'))return {valid:false,errors:{inflation:'Inflation-adjusted result exceeds the supported range.'}};
 return {valid:true,errors,balance:balance.toNumber(),contributed:contributed.toNumber(),growth:balance.minus(contributed).toNumber(),fees:totalFees.toNumber(),real:balance.div(deflator).toNumber(),rows,periods,years,baseline:baseline.balance,noFeeBalance:withoutFees.toNumber(),noFeeReal:withoutFees.div(deflator).toNumber(),feeDrag:withoutFees.minus(balance).toNumber(),annualStep:step.toNumber(),annualFee:fee.toNumber(),fixedFee:fixedFee.toNumber(),delay:delay.toNumber()};
}
const csvCell=x=>'"'+String(x).replaceAll('"','""')+'"';
export function futureValueCsv(v,r,currency){if(!r.valid)return '';const lines=[['MyBreakeven future value schedule','Fixed-rate scenario; not a forecast'],['Currency',currency,'Labels only; no FX conversion'],...Object.entries(v).map(([k,x])=>[k,x]),['Annual rate convention',v.basis],['Timing',v.timing],['Excluded','Tax, fees, withdrawals and variable returns'],['Contribution basis','Fixed nominal amount per selected period'],[],['Period','Elapsed months','Opening balance','Contribution','Growth','Closing balance'],...r.rows.map(x=>[x.period,x.months,x.opening.toFixed(2),x.deposit.toFixed(2),x.growth.toFixed(2),x.balance.toFixed(2)]),[],['Ending balance',r.balance.toFixed(2)],['Contributed',r.contributed.toFixed(2)],['Growth',r.growth.toFixed(2)],['Inflation-adjusted ending balance',r.real.toFixed(2)],['Rounding','Rows display cents independently; engine retains precision']];return '\uFEFF'+lines.map(row=>row.map(csvCell).join(',')).join('\r\n');}

/** Goal-based contribution solver, using the same effective payment-period convention as the schedule. */
export function calculateFutureValueGoal(v,goalInput){
 const baseline=calculateFutureValue({...v,payment:'0'});
 if(!baseline.valid)return {valid:false,errors:baseline.errors};
 const errors={};const goal=parse(goalInput,'goal',errors,{min:0,max:1e12});
 if(Object.keys(errors).length)return {valid:false,errors};
 if(baseline.periods===0)return {valid:false,errors:{goal:'A nonzero investment horizon is required to calculate contributions.'}};
 // Solve via the engine's existing payment convention; avoid a separate approximation of rates.
 const trial=calculateFutureValue({...v,payment:'1'});
 if(!trial.valid)return {valid:false,errors:trial.errors};
 const perUnit=trial.balance-baseline.balance;
 if(!Number.isFinite(perUnit)||perUnit<=0)return {valid:false,errors:{goal:'Unable to solve this combination of assumptions.'}};
 const raw=Math.max(0,(goal.toNumber()-baseline.balance)/perUnit);
 let required=Math.ceil(raw*100)/100;
 if(required>1e9)return {valid:false,errors:{goal:'Required contribution exceeds the supported per-period amount.'}};
 let verification=calculateFutureValue({...v,payment:required.toFixed(2)});
 if(verification.valid&&verification.balance+1e-7<goal.toNumber()){required=Math.round(required*100+1)/100;verification=calculateFutureValue({...v,payment:required.toFixed(2)});}
 if(!verification.valid)return {valid:false,errors:verification.errors};
 const remaining=Math.max(0,goal.toNumber()-baseline.balance);
 return {valid:true,goal:goal.toNumber(),required,startingOnly:baseline.balance,projected:verification.balance,incrementalNeeded:remaining,periods:baseline.periods,frequency:Number(v.frequency),alreadyFunded:required===0};
}

/** Export the full advanced plan with its assumptions and per-period fee accounting. */
export function futureValuePlanCsv(v,settings,r,currency){
 if(!r?.valid)return '';
 const rows=[['MyBreakeven advanced future value plan','Illustrative fixed-return scenario'],['Currency',currency,'No FX conversion'],...Object.entries(v).map(([k,val])=>[k,val]),...Object.entries(settings).map(([k,val])=>['plan_'+k,val]),['Fee model','Annual percentage converted to equivalent period retention; fixed fee deducted after growth'],['Tax','Excluded; not after-tax advice'],[],['Period','Elapsed months','Opening','Contribution','Gross growth','Fees paid','Closing balance'],...r.rows.map(x=>[x.period,x.months,x.opening.toFixed(2),x.deposit.toFixed(2),x.growth.toFixed(2),x.fee.toFixed(2),x.balance.toFixed(2)]),[],['After-fee ending balance',r.balance.toFixed(2)],['No-fee ending balance on identical deposits',r.noFeeBalance.toFixed(2)],['Cumulative fees paid',r.fees.toFixed(2)],['Fee drag including lost compounding',r.feeDrag.toFixed(2)],['Inflation-adjusted after-fee balance',r.real.toFixed(2)]];
 return '\\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\\r\\n');
}

/** Phase 2: like-for-like, independently calculated investment plan comparison. */
export function compareFutureValuePlans(v,alternatives=[]){
 const choices=[{label:'Current plan',overrides:{},plan:{}},...alternatives].slice(0,4);
 const results=choices.map((choice,index)=>{
  const input={...v,...(choice.overrides||{})};
  const result=calculateFutureValuePlan(input,choice.plan||{});
  return {label:String(choice.label||'Plan '+(index+1)),input,result};
 });
 const valid=results.every(x=>x.result.valid);
 return {valid,results,leader:valid?results.reduce((best,x)=>x.result.balance>best.result.balance?x:best,results[0]):null};
}
