const numeric=(raw,min,max)=>{const s=String(raw??'').trim();if(!/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/.test(s))return null;const n=Number(s);return Number.isFinite(n)&&n>=min&&n<=max?n:null;};
export function futureValueGrowthBreakdown(plan){
 if(!plan?.valid||!Array.isArray(plan.rows)||!plan.rows.length)return {valid:false,errors:{plan:'A valid advanced plan is required.'}};
 const contributions=plan.contributed,fees=plan.fees,netGrowth=plan.balance-contributions;
 const grossGrowth=netGrowth+fees;
 const feeDrag=plan.noFeeBalance-plan.balance;
 const checkpoints=plan.rows.filter((r,i)=>i===0||i===plan.rows.length-1||Math.abs(r.months/12-Math.round(r.months/12))<1e-8).map(r=>({months:r.months,contributions:contributionsAt(plan.rows,r.period),balance:r.balance,growth:r.balance-contributionsAt(plan.rows,r.period)}));
 const reconciles=Math.abs(contributions+grossGrowth-fees-plan.balance)<=Math.max(1e-6,Math.abs(plan.balance)*1e-10);
 return {valid:reconciles,errors:reconciles?{}:{breakdown:'Investment breakdown does not reconcile.'},contributions,grossGrowth,fees,netGrowth,finalBalance:plan.balance,feeDrag,checkpoints};
}
function contributionsAt(rows,period){let total=rows[0].balance;for(let i=1;i<=period;i++)total+=rows[i].deposit;return total;}
export function futureValueAssetPlan(opts={}){
 const errors={};
 const cost=numeric(opts.purchasePrice??'100000',0,1e12),annual=numeric(opts.appreciation??'3',-99,100),years=numeric(opts.years??'10',0,100),expenses=numeric(opts.annualCosts??'0',0,1e10),saleCost=numeric(opts.saleCostRate??'0',0,100),inflation=numeric(opts.inflation??'2.5',-99,100);
 for(const [k,v] of Object.entries({purchasePrice:cost,appreciation:annual,years,annualCosts:expenses,saleCostRate:saleCost,inflation}))if(v===null)errors[k]='Enter a valid numerical assumption within the supported range.';
 if(Object.keys(errors).length)return {valid:false,errors};
 const projected=cost*Math.pow(1+annual/100,years);
 const cumulativeCosts=years===0?0:annual===0?expenses*years:expenses*(Math.pow(1+annual/100,years)-1)/(annual/100); // costs escalated at appreciation rate: simplification disclosed
 const saleExpenses=projected*saleCost/100;
 const netProceeds=projected-saleExpenses;
 const netGain=netProceeds-cost-cumulativeCosts;
 const realProceeds=netProceeds/Math.pow(1+inflation/100,years);
 if(![projected,cumulativeCosts,saleExpenses,netProceeds,netGain,realProceeds].every(x=>Number.isFinite(x)&&Math.abs(x)<=1e15))return {valid:false,errors:{asset:'Projection exceeds supported range.'}};
 return {valid:true,projected,cumulativeCosts,saleExpenses,netProceeds,netGain,realProceeds,model:'Illustrative unleveraged asset appreciation. Annual holding costs escalate at the same rate as asset appreciation for simplicity. Excludes financing, rent, tax, depreciation, maintenance surprises, transaction timing and market liquidity.'};
}
