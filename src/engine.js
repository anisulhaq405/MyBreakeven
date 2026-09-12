import Decimal from "decimal.js";

export const FORMULA_ENGINE_VERSION = "1.2.0";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

const decimal = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  try {
    const parsed = new Decimal(value);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
};

const output = (value) => value.toNumber();

export const calculate = (raw) => {
  const i = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, decimal(value)]),
  );
  i.otherVariableCost ??= new Decimal(0);
  i.acquisitionCost ??= new Decimal(0);

  const required = [
    "price", "materialCost", "laborCost", "fixedCosts", "ownerPay",
    "targetProfit", "paymentFeePct", "workers", "hoursPerWorker",
    "hoursPerJob", "utilizationPct", "conversionPct",
  ];
  if (required.some((key) => i[key] === null)) {
    return { valid: false, inputError: true, message: "Complete every field with a valid number." };
  }
  if (
    required.some((key) => i[key].isNegative()) ||
    !i.price.gt(0) || !i.workers.gt(0) || !i.hoursPerJob.gt(0)
  ) {
    return { valid: false, inputError: true, message: "Price, team size and delivery hours must be above zero; other values cannot be negative." };
  }
  if (
    i.paymentFeePct.gt(100) || i.utilizationPct.gt(100) ||
    !i.conversionPct.gt(0) || i.conversionPct.gt(100)
  ) {
    return { valid: false, inputError: true, message: "Percentages must be between 0 and 100, and conversion must be above zero." };
  }

  const hundred = new Decimal(100);
  const feeRate = i.paymentFeePct.div(hundred);
  const paymentFees = i.price.mul(feeRate);
  const contribution = i.price
    .minus(paymentFees)
    .minus(i.materialCost)
    .minus(i.laborCost)
    .minus(i.otherVariableCost)
    .minus(i.acquisitionCost);
  const fixedNeed = i.fixedCosts.plus(i.ownerPay).plus(i.targetProfit);
  if (!contribution.gt(0)) {
    return { valid: false, contribution: output(contribution), message: "Each sale currently loses money before fixed costs." };
  }

  const jobs = fixedNeed.div(contribution);
  const wholeJobs = jobs.ceil();
  const revenue = jobs.mul(i.price);
  const practicalRevenue = wholeJobs.mul(i.price);
  const capacity = i.workers
    .mul(i.hoursPerWorker)
    .mul(52)
    .div(12)
    .mul(i.utilizationPct)
    .div(hundred)
    .div(i.hoursPerJob);
  const wholeCapacity = capacity.floor();
  const leads = jobs.div(i.conversionPct.div(hundred));
  const wholeLeads = leads.ceil();
  const gap = capacity.minus(jobs);
  const gapRatioAdjustment = gap.div(Decimal.max(1, jobs)).mul(30);
  const score = Decimal.max(
    0,
    Decimal.min(
      100,
      new Decimal(70)
        .plus(Decimal.min(20, gapRatioAdjustment))
        .minus(i.conversionPct.lt(20) ? 12 : 0)
        .round(),
    ),
  );

  const costs = {
    materials: output(i.materialCost),
    labor: output(i.laborCost),
    other: output(i.otherVariableCost),
    acquisition: output(i.acquisitionCost),
    fees: output(paymentFees),
  };
  const scenarios = [-10, 0, 10].map((change) => {
    const scenarioPrice = i.price.mul(new Decimal(1).plus(new Decimal(change).div(hundred)));
    const scenarioContribution = scenarioPrice
      .mul(new Decimal(1).minus(feeRate))
      .minus(i.materialCost)
      .minus(i.laborCost)
      .minus(i.otherVariableCost)
      .minus(i.acquisitionCost);
    if (!scenarioContribution.gt(0)) return { change, jobs: null, wholeJobs: null };
    const exactJobs = fixedNeed.div(scenarioContribution);
    return { change, jobs: output(exactJobs), wholeJobs: exactJobs.ceil().toNumber() };
  });

  return {
    valid: true,
    contribution: output(contribution),
    fixedNeed: output(fixedNeed),
    jobs: output(jobs),
    wholeJobs: wholeJobs.toNumber(),
    revenue: output(revenue),
    practicalRevenue: output(practicalRevenue),
    capacity: output(capacity),
    wholeCapacity: wholeCapacity.toNumber(),
    leads: output(leads),
    wholeLeads: wholeLeads.toNumber(),
    gap: output(gap),
    score: score.toNumber(),
    marginPct: output(contribution.div(i.price).mul(hundred)),
    costs,
    scenarios,
  };
};
