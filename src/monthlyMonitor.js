import Decimal from "decimal.js";

const dec = value => new Decimal(value);
const amount = value => dec(value).toNumber();
const validNumber = value => value !== "" && value !== null && value !== undefined && Number.isFinite(Number(value)) && Number(value) >= 0;

export function analyzeMonth(actual, plan) {
  const fields = ["units", "revenue", "variableCosts", "fixedCosts", "ownerPay", "inquiries"];
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(actual.month || "") || fields.some(key => !validNumber(actual[key])) || !Number.isInteger(Number(actual.units)) || !Number.isInteger(Number(actual.inquiries))) {
    return { valid: false, message: "Enter a valid month and non-negative figures. Sales and inquiries must be whole numbers." };
  }
  if (!plan || !validNumber(plan.targetRevenue) || !validNumber(plan.targetUnits) || !validNumber(plan.targetProfit)) {
    return { valid: false, message: "Calculate a valid plan before recording a month." };
  }
  const revenue = dec(actual.revenue);
  const variable = dec(actual.variableCosts);
  const fixed = dec(actual.fixedCosts);
  const owner = dec(actual.ownerPay);
  const units = dec(actual.units);
  const profit = revenue.minus(variable).minus(fixed).minus(owner);
  const contribution = revenue.minus(variable);
  const contributionPerUnit = units.gt(0) ? contribution.div(units) : null;
  const breakEvenUnits = contributionPerUnit?.gt(0) ? fixed.plus(owner).div(contributionPerUnit).ceil().toNumber() : null;
  return {
    valid: true,
    profit: amount(profit),
    contribution: amount(contribution),
    contributionPerUnit: contributionPerUnit ? amount(contributionPerUnit) : null,
    breakEvenUnits,
    revenueGap: amount(revenue.minus(plan.targetRevenue)),
    unitGap: amount(units.minus(plan.targetUnits)),
    profitGap: amount(profit.minus(plan.targetProfit)),
    conversionPct: Number(actual.inquiries) > 0 ? amount(units.div(actual.inquiries).mul(100)) : null,
  };
}

export function snapshotPlan(input, result) {
  return {
    targetRevenue: result.revenue,
    targetUnits: result.jobs,
    targetProfit: Number(input.targetProfit),
  };
}
