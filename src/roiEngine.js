import Decimal from 'decimal.js';
const Cash = Decimal.clone({precision:40});
const D = v => new Cash(v);
export const roiDefaults = {
 business:{setup:6000,recurring:200,months:12,delay:0,contribution:1200,cashSaving:0},
 ai:{setup:600,recurring:100,months:12,delay:0,tasks:80,before:60,after:30,adoption:100,hourlyCost:20,paidShare:25,sellShare:0,contributionPerHour:0,unitCost:0,cashSaving:0},
};
const common=['setup','recurring','months','delay','cashSaving'];
const extra={business:['contribution'],ai:['tasks','before','after','adoption','hourlyCost','paidShare','sellShare','contributionPerHour','unitCost']};
function isNumber(v){return (typeof v==='number'||typeof v==='string'&&v.trim()!==''&&/^[+\-]?(?:\d+\.?\d*|\.\d+)(?:e[+\-]?\d+)?$/i.test(v.trim()))&&Number.isFinite(Number(v));}
export function calculateRoi(input,mode='business',workloadFactor=1){
 if(!extra[mode])return {valid:false,message:'Choose business investment or AI automation.'};
 const keys=[...common,...extra[mode]];
 if(keys.some(k=>!isNumber(input[k])||Number(input[k])<0||Number(input[k])>1e9))return {valid:false,message:'Complete every field with a non-negative number up to 1 billion. Use zero where a cost or benefit does not apply.'};
 if(!isNumber(workloadFactor)||Number(workloadFactor)<0||Number(workloadFactor)>2)return {valid:false,message:'Workload comparison must be between 0% and 200%.'};
 if(!Number.isInteger(Number(input.months))||Number(input.months)<1||Number(input.months)>60||!Number.isInteger(Number(input.delay))||Number(input.delay)>60)return {valid:false,message:'Choose a whole 1–60 month horizon and a whole 0–60 month benefit delay.'};
 if(mode==='ai'&&(['adoption','paidShare','sellShare'].some(k=>Number(input[k])>100)||Number(input.tasks)>1e7||Number(input.before)>1440||Number(input.after)>1440))return {valid:false,message:'Percentages must be 0–100, average monthly tasks at most 10 million, and time per task at most 1,440 minutes.'};
 const x=Object.fromEntries(keys.map(k=>[k,D(input[k])])),factor=D(workloadFactor),months=Number(input.months),delay=Number(input.delay);
 let netHours=D(0),paidHours=D(0),capacity=D(0),soldHours=D(0),laborSaving=D(0),newContribution=D(0),variableCost=D(0),adoptedTasks=D(0);
 if(mode==='ai'){
  adoptedTasks=x.tasks.times(factor).times(x.adoption).div(100);
  netHours=adoptedTasks.times(x.before.minus(x.after)).div(60);
  paidHours=netHours.times(x.paidShare).div(100);capacity=netHours.minus(paidHours);
  laborSaving=paidHours.times(x.hourlyCost);soldHours=Cash.max(0,capacity).times(x.sellShare).div(100);
  newContribution=soldHours.times(x.contributionPerHour);variableCost=adoptedTasks.times(x.unitCost);
 }else newContribution=x.contribution.times(factor);
 // Positive labor change is an avoided payment. Extra paid hours are a cost, never a negative benefit.
 const grossBenefit=Cash.max(0,laborSaving).plus(newContribution).plus(x.cashSaving);
 const activeCost=x.recurring.plus(variableCost).plus(Cash.max(0,laborSaving.negated()));
 const steadyNet=grossBenefit.minus(activeCost);
 let cumulative=x.setup.negated(),totalBenefits=D(0),totalCosts=x.setup,minCash=cumulative;
 const rows=[{month:0,benefits:0,costs:x.setup.toNumber(),net:x.setup.negated().toNumber(),cumulative:cumulative.toNumber()}];
 let recoveryMonth=null;
 for(let month=1;month<=months;month++){
  const active=month>delay,benefit=active?grossBenefit:D(0),cost=active?activeCost:x.recurring,net=benefit.minus(cost);
  cumulative=cumulative.plus(net);totalBenefits=totalBenefits.plus(benefit);totalCosts=totalCosts.plus(cost);minCash=Cash.min(minCash,cumulative);
  if(active&&recoveryMonth===null&&cumulative.gte(0)&&steadyNet.gt(0))recoveryMonth=month;
  rows.push({month,benefits:benefit.toNumber(),costs:cost.toNumber(),net:net.toNumber(),cumulative:cumulative.toNumber()});
 }
 // Fractional payback assumes uniform cash movement inside an active month; table uses month-end totals.
 const payback=steadyNet.gt(0)?D(delay).plus(x.setup.plus(x.recurring.times(delay)).div(steadyNet)):null;
 const roi=totalCosts.gt(0)?totalBenefits.minus(totalCosts).div(totalCosts).times(100):null;
 const values={adoptedTasks,netHours,paidHours,capacity,soldHours,laborSaving,newContribution,variableCost,grossBenefit,activeCost,steadyNet,totalBenefits,totalCosts,netBenefit:totalBenefits.minus(totalCosts),minCash,roi,payback};
 if(Object.values(values).some(v=>v!==null&&(!v.isFinite()||v.abs().gt(Number.MAX_SAFE_INTEGER))))return {valid:false,message:'These combined inputs produce results too large to report safely. Reduce the amounts or workload.'};
 return {valid:true,mode,months,delay,activeMonths:Math.max(0,months-delay),recoveryMonth,rows,...Object.fromEntries(Object.entries(values).map(([k,v])=>[k,v===null?null:v.toNumber()]))};
}
export function compareRoi(input,mode,low=75,high=125){
 if(![low,high].every(v=>isNumber(v)&&Number(v)>=0&&Number(v)<=200)||Number(low)>100||Number(high)<100)return {valid:false,message:'Use 0–100% for lower workload and 100–200% for higher workload.'};
 const rows=[['Lower workload',Number(low)/100],['Entered workload',1],['Higher workload',Number(high)/100]].map(([name,factor])=>({name,factor,...calculateRoi(input,mode,factor)}));
 return {valid:rows.every(r=>r.valid),message:rows.find(r=>!r.valid)?.message,rows};
}
export function roiCsv(input,result,comparison,currency){
 const cell=v=>'"'+(typeof v==='string'?v.replace(/^[\t\r\n ]*[=+@-]/,"'$&"):String(v??'')).replaceAll('"','""')+'"';
 const rows=[['MyBreakeven ROI snapshot','Values only; does not recalculate'],['Mode',result.mode],['Currency label',currency,'No exchange conversion'],['Horizon months',result.months],['ROI denominator','Setup plus all modeled recurring and extra paid-labor costs in the selected horizon'],...Object.entries(input).map(([k,v])=>['Input',k,Number(v)]),['Result','Total benefits',result.totalBenefits],['Result','Total costs',result.totalCosts],['Result','Net modeled cash benefit',result.netBenefit],['Result','ROI percent',result.roi??'Undefined: no modeled cost'],['Result','Fractional payback months',result.payback??'No finite payback'],['Result','First recovered month-end in horizon',result.recoveryMonth??'Not recovered in horizon'],['AI','Net hours saved per active month',result.netHours],['AI','Paid hours change',result.paidHours],['AI','Remaining hours released / consumed',result.capacity],['AI','Assumed sold hours',result.soldHours],['Month','Benefits','Costs','Net','Cumulative']];
 for(const r of result.rows)rows.push([r.month,r.benefits,r.costs,r.net,r.cumulative]);
 if(comparison.valid){rows.push(['Workload scenario','Factor','ROI percent','Net benefit','Payback months']);for(const r of comparison.rows)rows.push([r.name,r.factor,r.roi??'Undefined',r.netBenefit,r.payback??'No finite payback']);}
 rows.push(['Limits','Pre-tax, undiscounted planning estimates. Excludes unentered cash flows, financing, resale value and demand verification.']);
 return '\ufeff'+rows.map(r=>r.map(cell).join(',')).join('\r\n');
}
