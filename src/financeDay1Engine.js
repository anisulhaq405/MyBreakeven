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
const csvCell=x=>'"'+String(x).replaceAll('"','""')+'"';
export function futureValueCsv(v,r,currency){if(!r.valid)return '';const lines=[['MyBreakeven future value schedule','Fixed-rate scenario; not a forecast'],['Currency',currency,'Labels only; no FX conversion'],...Object.entries(v).map(([k,x])=>[k,x]),['Annual rate convention',v.basis],['Timing',v.timing],['Excluded','Tax, fees, withdrawals and variable returns'],['Contribution basis','Fixed nominal amount per selected period'],[],['Period','Elapsed months','Opening balance','Contribution','Growth','Closing balance'],...r.rows.map(x=>[x.period,x.months,x.opening.toFixed(2),x.deposit.toFixed(2),x.growth.toFixed(2),x.balance.toFixed(2)]),[],['Ending balance',r.balance.toFixed(2)],['Contributed',r.contributed.toFixed(2)],['Growth',r.growth.toFixed(2)],['Inflation-adjusted ending balance',r.real.toFixed(2)],['Rounding','Rows display cents independently; engine retains precision']];return '\uFEFF'+lines.map(row=>row.map(csvCell).join(',')).join('\r\n');}
