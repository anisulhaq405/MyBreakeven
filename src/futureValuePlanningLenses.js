/**
 * Optional planning lenses. These do not change the core future-value projection.
 * Tax is an illustrative flat tax applied only to positive projected investment gains.
 */
const val=(raw,min,max)=>{const x=String(raw??'').trim();if(!/^(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/.test(x))return null;const n=Number(x);return Number.isFinite(n)&&n>=min&&n<=max?n:null;};
export function futureValueTaxAndReserve(plan,opts={}){
 if(!plan?.valid)return {valid:false,errors:{plan:'Enter a valid investment plan first.'}};
 const taxRate=val(opts.taxRate??'0',0,100),monthlyExpense=val(opts.monthlyExpense??'0',0,1e9),reserveMonths=val(opts.reserveMonths??'6',0,120);
 const errors={};
 if(taxRate===null)errors.taxRate='Tax assumption must be 0 to 100%.';
 if(monthlyExpense===null)errors.monthlyExpense='Monthly operating expense must be 0 to one billion.';
 if(reserveMonths===null)errors.reserveMonths='Reserve months must be 0 to 120.';
 if(Object.keys(errors).length)return {valid:false,errors};
 const gains=Math.max(0,plan.balance-plan.contributed);
 const estimatedTax=gains*taxRate/100;
 const afterTax=Math.max(0,plan.balance-estimatedTax);
 const requiredReserve=monthlyExpense*reserveMonths;
 return {valid:true,taxRate,estimatedTax,afterTax,gains,requiredReserve,reserveCoverage:monthlyExpense?afterTax/monthlyExpense:null,surplusAfterReserve:afterTax-requiredReserve,model:'Illustrative tax on positive nominal gains only; ignores tax basis adjustments, capital loss offsets, account type, exemptions, withdrawals, jurisdiction and timing. Business reserves use a constant monthly expense assumption.'};
}
