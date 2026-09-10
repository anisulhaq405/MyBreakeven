export const FORMULA_ENGINE_VERSION = "1.0.0";
export const calculate = (i) => {
  const feeRate = i.paymentFeePct / 100;
  const contribution = i.price * (1 - feeRate) - i.materialCost - i.laborCost - (i.otherVariableCost || 0) - (i.acquisitionCost || 0);
  const fixedNeed = i.fixedCosts + i.ownerPay + i.targetProfit;
  if (contribution <= 0) return { valid:false, contribution, message:"Each sale currently loses money before fixed costs." };
  const jobs = Math.ceil(fixedNeed / contribution);
  const revenue = jobs * i.price;
  const capacity = Math.floor((i.workers * i.hoursPerWorker * 4.33 * i.utilizationPct / 100) / i.hoursPerJob);
  const leads = Math.ceil(jobs / (i.conversionPct / 100));
  const gap = capacity - jobs;
  const score = Math.max(0, Math.min(100, Math.round(70 + Math.min(20, gap / Math.max(1,jobs) * 30) - (i.conversionPct < 20 ? 12 : 0))));
  const costs = {materials:i.materialCost,labor:i.laborCost,other:i.otherVariableCost||0,acquisition:i.acquisitionCost||0,fees:i.price*feeRate};
  const scenarios = [-10,0,10].map(change => {const c=i.price*(1+change/100)*(1-feeRate)-i.materialCost-i.laborCost-(i.otherVariableCost||0)-(i.acquisitionCost||0);return {change,jobs:c>0?Math.ceil(fixedNeed/c):null}});
  return {valid:true, contribution, jobs, revenue, capacity, leads, gap, score, marginPct: contribution/i.price*100,costs,scenarios};
};
