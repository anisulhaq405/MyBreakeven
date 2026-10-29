/**
 * Phase 3 illustrative annual-return simulation.
 * Independent from the existing deterministic Future Value engine.
 * Seeded PRNG makes regression checks and comparisons repeatable.
 */
const number=(s,min,max)=>{const text=String(s??'').trim();if(!/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/.test(text))return null;const n=Number(text);return Number.isFinite(n)&&n>=min&&n<=max?n:null;};
function rng(seed){let x=(seed>>>0)||1;return()=>{x=(Math.imul(1664525,x)+1013904223)>>>0;return (x+.5)/4294967296;};}
function normal(next){const u=next(),v=next();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
const percentile=(arr,q)=>{const at=(arr.length-1)*q,i=Math.floor(at),f=at-i;return arr[i]*(1-f)+(arr[Math.min(arr.length-1,i+1)])*f;};
export function simulateFutureValueRisk(v,options={}){
 const errors={};
 const mean=number(options.mean??v.rate,-50,50),vol=number(options.volatility??'15',0,100),paths=number(options.paths??'500',100,2000);
 const seed=number(options.seed??'2027',1,4294967295);
 if(mean===null)errors.mean='Expected arithmetic annual return must be between -50% and 50%.';
 if(vol===null)errors.volatility='Annual volatility must be between 0% and 100%.';
 if(paths===null||!Number.isInteger(paths))errors.paths='Use 100 to 2,000 simulations.';
 if(seed===null||!Number.isInteger(seed))errors.seed='Use a positive whole-number simulation seed.';
 const principal=number(v.principal,0,1e9),payment=number(v.payment,0,1e9),months=number(v.months,0,1200),inflation=number(v.inflation,-99,100);
 const freq=Number(v.frequency);
 if(principal===null||payment===null||months===null||!Number.isInteger(months)||![1,4,12].includes(freq)||months*freq%12!==0||!['begin','end'].includes(v.timing)||inflation===null)errors.inputs='Enter a valid main calculator plan with whole contribution periods.';
 if(Object.keys(errors).length)return {valid:false,errors};
 const next=rng(seed),n=months*freq/12,years=months/12,values=[];
 // Annual simple returns are drawn from a normal model then floored at -100%.
 // Equivalent period growth is derived from each year's sampled return.
 for(let k=0;k<paths;k++){
  let balance=principal,annualReturn=0;
  for(let i=0;i<n;i++){
   if(i%freq===0)annualReturn=Math.max(-1,(mean+vol*normal(next))/100);
   const step=Math.pow(1+annualReturn,1/freq)-1;
   balance=v.timing==='begin'?(balance+payment)*(1+step):balance*(1+step)+payment;
   if(!Number.isFinite(balance)||balance>1e15)return {valid:false,errors:{simulation:'The projection exceeds the supported range.'}};
  }
  values.push(balance);
 }
 values.sort((a,b)=>a-b);
 const target=options.target===undefined||options.target===''?null:number(options.target,0,1e12);
 if(options.target!==undefined&&options.target!==''&&target===null)return {valid:false,errors:{target:'Enter a target from 0 to one trillion.'}};
 const summary={p10:percentile(values,.1),p50:percentile(values,.5),p90:percentile(values,.9),min:values[0],max:values.at(-1),mean:values.reduce((s,x)=>s+x,0)/paths};
 const deflator=Math.pow(1+inflation/100,years);
 return {valid:true,summary,realMedian:summary.p50/deflator,paths,seed,expectedAnnual:mean,volatility:vol,target,probability:target===null?null:values.filter(x=>x>=target).length/paths,model:'Illustrative normally distributed annual simple returns, floored at -100%; independent annual draws, constant contributions; no tax or fees. Percentiles are simulated outcomes, not confidence intervals or guarantees.'};
}
