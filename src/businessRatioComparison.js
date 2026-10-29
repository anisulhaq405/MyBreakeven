// Business comparisons are derived from exactly parsed, positive-denominator business inputs.
// Raw ratio equality remains the responsibility of equivalentRatioEngine.js.
const numeric = x => { const s=String(x??'').trim(); if(!/^[+]?\d+(?:\.\d+)?$/.test(s))return null; const n=Number(s);return Number.isFinite(n)?n:null; };
export const businessScenarios={
 cost:{title:'Cost-to-revenue efficiency',labels:['Cost','Revenue'],unit:'%',good:'lower'},
 debt:{title:'Debt-to-equity exposure',labels:['Debt','Equity'],unit:'×',good:'lower'},
 labor:{title:'Labor hours per unit',labels:['Labor hours','Units produced'],unit:'hours/unit',good:'lower'},
 mix:{title:'Revenue mix composition',labels:['Product A','Product B','Product C'],unit:'%',good:'neutral'}
};
export function evaluateBusinessRatio(type,inputs){
 const item=businessScenarios[type];if(!item)return null;
 const count=item.labels.length;
 const rows=['a','b'].map(side=>inputs[side].slice(0,count).map(numeric));
 if(rows.some(a=>a.some(x=>x===null)))return {valid:false,reason:'Enter nonnegative finite numbers for both business periods.'};
 if(rows.some(a=>a.some(x=>x<0)))return {valid:false,reason:'Business scenario values cannot be negative.'};
 if(type==='mix'){
  const sums=rows.map(a=>a.reduce((s,n)=>s+n,0));if(sums.some(x=>x<=0))return {valid:false,reason:'Each revenue mix must have a positive total.'};
  const shares=rows.map((a,i)=>a.map(x=>100*x/sums[i]));
  return {valid:true,title:item.title,unit:'%',values:shares,delta:shares[1].map((v,i)=>v-shares[0][i]),labels:item.labels,kind:'mix',note:'Changes are percentage-point shifts in revenue mix, not profit changes.'};
 }
 if(rows.some(a=>a[1]<=0))return {valid:false,reason:'Revenue, equity or units produced must be greater than zero.'};
 const values=rows.map(a=>a[0]/a[1]*(type==='cost'?100:1));const delta=values[1]-values[0];
 const direction=Math.abs(delta)<1e-10?'Unchanged':delta>0?'Increased':'Decreased';
 const notes={
  cost:'Lower cost-to-revenue generally leaves more revenue before other expenses, but this comparison alone is not net profit.',
  debt:'Debt relative to equity is a leverage indicator, not a standalone judgment of borrowing risk.',
  labor:'Lower labor hours per output unit suggests higher labor productivity when product mix and quality are comparable.'
 };
 return {valid:true,title:item.title,unit:item.unit,values,delta,labels:item.labels,kind:'two',direction,note:notes[type]};
}

export function evaluateBusinessTarget(type,comparison,targetText){
 if(!comparison?.valid)return null;
 const target=numeric(targetText);
 if(target===null)return {valid:false,reason:'Enter a nonnegative numeric target.'};
 if(type==='mix')return {valid:false,reason:'Mix targets require separate target shares for each component.'};
 const current=comparison.values[1],delta=current-target;
 const lowerIsBetter=businessScenarios[type]?.good==='lower';
 const met=lowerIsBetter?current<=target:current>=target;
 const unit=comparison.unit;
 const action={
  cost:'Review variable costs, pricing and product mix. Compare the same cost categories and revenue basis across periods.',
  debt:'Review borrowing obligations, equity movements, interest coverage and debt maturity before changing financing.',
  labor:'Review hours per unit alongside product quality, staffing, capacity utilization and production mix.'
 }[type];
 return {valid:true,target,current,delta,met,unit,
  status:met?'Target met':'Target not met',
  action,
  note:'Illustrative threshold chosen by the user, not an industry benchmark. This tool does not establish causal drivers.'};
}
