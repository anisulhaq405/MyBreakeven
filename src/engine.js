export const FORMULA_ENGINE_VERSION = "1.1.0";

const number = (value) => {
  if (value === "" || value === null || value === undefined) return NaN;
  return Number(value);
};

export const calculate = (raw) => {
  const i = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, number(value)]));
  i.otherVariableCost = Number.isFinite(i.otherVariableCost) ? i.otherVariableCost : 0;
  i.acquisitionCost = Number.isFinite(i.acquisitionCost) ? i.acquisitionCost : 0;
  const required = ["price", "materialCost", "laborCost", "fixedCosts", "ownerPay", "targetProfit", "paymentFeePct", "workers", "hoursPerWorker", "hoursPerJob", "utilizationPct", "conversionPct"];
  if (required.some((key) => !Number.isFinite(i[key]))) return { valid: false, inputError: true, message: "Complete every field with a valid number." };
  if (required.some((key) => i[key] < 0) || i.price <= 0 || i.workers <= 0 || i.hoursPerJob <= 0) return { valid: false, inputError: true, message: "Price, team size and delivery hours must be above zero; other values cannot be negative." };
  if (i.paymentFeePct > 100 || i.utilizationPct > 100 || i.conversionPct <= 0 || i.conversionPct > 100) return { valid: false, inputError: true, message: "Percentages must be between 0 and 100, and conversion must be above zero." };

  const feeRate = i.paymentFeePct / 100;
  const paymentFees = i.price * feeRate;
  const contribution = i.price - paymentFees - i.materialCost - i.laborCost - i.otherVariableCost - i.acquisitionCost;
  const fixedNeed = i.fixedCosts + i.ownerPay + i.targetProfit;
  if (contribution <= 0) return { valid: false, contribution, message: "Each sale currently loses money before fixed costs." };

  const jobs = fixedNeed / contribution;
  const wholeJobs = Math.ceil(jobs);
  const revenue = jobs * i.price;
  const practicalRevenue = wholeJobs * i.price;
  const capacity = (i.workers * i.hoursPerWorker * 52 / 12 * i.utilizationPct / 100) / i.hoursPerJob;
  const wholeCapacity = Math.floor(capacity);
  const leads = jobs / (i.conversionPct / 100);
  const wholeLeads = Math.ceil(leads);
  const gap = capacity - jobs;
  const score = Math.max(0, Math.min(100, Math.round(70 + Math.min(20, gap / Math.max(1, jobs) * 30) - (i.conversionPct < 20 ? 12 : 0))));
  const costs = { materials: i.materialCost, labor: i.laborCost, other: i.otherVariableCost, acquisition: i.acquisitionCost, fees: paymentFees };
  const scenarios = [-10, 0, 10].map((change) => {
    const scenarioPrice = i.price * (1 + change / 100);
    const scenarioContribution = scenarioPrice * (1 - feeRate) - i.materialCost - i.laborCost - i.otherVariableCost - i.acquisitionCost;
    const exactJobs = scenarioContribution > 0 ? fixedNeed / scenarioContribution : null;
    return { change, jobs: exactJobs, wholeJobs: exactJobs === null ? null : Math.ceil(exactJobs) };
  });
  return { valid: true, contribution, fixedNeed, jobs, wholeJobs, revenue, practicalRevenue, capacity, wholeCapacity, leads, wholeLeads, gap, score, marginPct: contribution / i.price * 100, costs, scenarios };
};
