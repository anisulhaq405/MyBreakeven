import Decimal from "decimal.js";

const D = (value) => new Decimal(value || 0);
const number = (value) => D(value).toNumber();
const variableCost = (input) => D(input.materialCost)
  .plus(input.laborCost)
  .plus(input.otherVariableCost)
  .plus(input.acquisitionCost);
const netRate = (input) => D(1).minus(D(input.paymentFeePct).div(100));

export function analyzeOfferMix(input, offers = []) {
  const validOffers = offers
    .map((offer, index) => ({
      id: offer.id ?? index,
      name: String(offer.name || `Offer ${index + 1}`).trim(),
      price: D(offer.price),
      variableCost: D(offer.variableCost),
      mixPct: D(offer.mixPct),
      hours: D(offer.hours),
    }))
    .filter((offer) => offer.price.gt(0) && offer.variableCost.gte(0) && offer.mixPct.gt(0) && offer.hours.gt(0));
  if (!validOffers.length || validOffers.length !== offers.length) return { valid: false, message: "Every offer needs a positive price, sales mix and delivery time, plus a non-negative variable cost." };
  const mixTotal = validOffers.reduce((sum, offer) => sum.plus(offer.mixPct), D(0));
  const rate = netRate(input);
  const rows = validOffers.map((offer) => {
    const share = offer.mixPct.div(mixTotal);
    const contribution = offer.price.mul(rate).minus(offer.variableCost);
    return { ...offer, share, contribution };
  });
  if (rows.some((offer) => !offer.contribution.gt(0))) {
    return { valid: false, message: "Every included offer must make a positive contribution before fixed costs." };
  }
  const weightedContribution = rows.reduce((sum, offer) => sum.plus(offer.contribution.mul(offer.share)), D(0));
  const requiredContribution = D(input.fixedCosts).plus(input.ownerPay).plus(input.targetProfit);
  const totalUnits = requiredContribution.div(weightedContribution);
  const detailedRows = rows.map((offer) => {
    const units = totalUnits.mul(offer.share);
    return {
      id: offer.id,
      name: offer.name,
      price: number(offer.price),
      variableCost: number(offer.variableCost),
      mixPct: number(offer.share.mul(100)),
      hours: number(offer.hours),
      contribution: number(offer.contribution),
      contributionPerHour: number(offer.contribution.div(offer.hours)),
      breakEvenUnits: number(units),
      revenue: number(units.mul(offer.price)),
      requiredHours: number(units.mul(offer.hours)),
    };
  });
  const requiredHours = detailedRows.reduce((sum, offer) => sum + offer.requiredHours, 0);
  const availableHours = number(D(input.workers).mul(input.hoursPerWorker).mul(52).div(12).mul(D(input.utilizationPct).div(100)));
  return {
    valid: true,
    mixTotal: number(mixTotal),
    weightedContribution: number(weightedContribution),
    requiredContribution: number(requiredContribution),
    totalUnits: number(totalUnits),
    wholeUnits: totalUnits.ceil().toNumber(),
    revenue: detailedRows.reduce((sum, offer) => sum + offer.revenue, 0),
    requiredHours,
    availableHours,
    capacityGapHours: availableHours - requiredHours,
    rows: detailedRows,
  };
}

export function analyzePriceGuard(input, currentResult, discountPct = 10) {
  const rate = netRate(input);
  const variable = variableCost(input);
  const price = D(input.price);
  const discount = Decimal.max(0, Decimal.min(99, D(discountPct)));
  const newPrice = price.mul(D(1).minus(discount.div(100)));
  const newContribution = newPrice.mul(rate).minus(variable);
  const requiredContribution = D(input.fixedCosts).plus(input.ownerPay).plus(input.targetProfit);
  const floorPrice = rate.gt(0) ? variable.div(rate) : null;
  const maxDiscountPct = floorPrice && price.gt(0)
    ? Decimal.max(0, D(1).minus(floorPrice.div(price)).mul(100))
    : D(0);
  if (!newContribution.gt(0)) {
    return {
      valid: false,
      discountPct: number(discount),
      newPrice: number(newPrice),
      floorPrice: floorPrice ? number(floorPrice) : null,
      maxDiscountPct: number(maxDiscountPct),
      message: "This discount removes the contribution needed to cover fixed costs.",
    };
  }
  const requiredUnits = requiredContribution.div(newContribution);
  const baselineUnits = D(currentResult.jobs);
  return {
    valid: true,
    discountPct: number(discount),
    newPrice: number(newPrice),
    newContribution: number(newContribution),
    contributionLostPerSale: number(D(currentResult.contribution).minus(newContribution)),
    requiredUnits: number(requiredUnits),
    wholeRequiredUnits: requiredUnits.ceil().toNumber(),
    additionalUnits: number(Decimal.max(0, requiredUnits.minus(baselineUnits))),
    volumeLiftPct: baselineUnits.gt(0) ? number(requiredUnits.div(baselineUnits).minus(1).mul(100)) : 0,
    floorPrice: floorPrice ? number(floorPrice) : null,
    maxDiscountPct: number(maxDiscountPct),
  };
}

export function buildBreakEvenLadder(input, safetyBufferPct = 10) {
  const contribution = D(input.price).mul(netRate(input)).minus(variableCost(input));
  if (!contribution.gt(0)) return { valid: false, message: "Positive contribution is required." };
  const fixed = D(input.fixedCosts);
  const owner = fixed.plus(input.ownerPay);
  const target = owner.plus(input.targetProfit);
  const buffer = Decimal.max(0, D(safetyBufferPct));
  const definitions = [
    ["Expense coverage", "Operating overhead covered", fixed],
    ["Owner-paid", "Overhead and owner pay covered", owner],
    ["Target profit", "Selected monthly profit achieved", target],
    ["Safety buffer", `${number(buffer)}% volume above target`, target.div(contribution).mul(D(1).plus(buffer.div(100))).mul(contribution)],
  ];
  const levels = definitions.map(([name, description, need]) => {
    const units = D(need).div(contribution);
    return {
      name,
      description,
      requiredContribution: number(need),
      units: number(units),
      wholeUnits: units.ceil().toNumber(),
      revenue: number(units.mul(input.price)),
    };
  });
  return { valid: true, contribution: number(contribution), safetyBufferPct: number(buffer), levels };
}

export function analyzeAcquisitionBreakEven(input, currentResult, options = {}) {
  const spend = Decimal.max(0, D(options.monthlySpend));
  const leads = D(options.leads);
  const conversion = D(options.conversionPct).div(100);
  const repeatPurchases = D(options.repeatPurchases);
  // The base contribution already deducts the calculator's per-sale acquisition estimate.
  // Replace it with this channel's spend-derived CAC instead of deducting both.
  const contribution = D(currentResult?.contribution).plus(input.acquisitionCost);
  if (!leads.gt(0) || !conversion.gt(0) || conversion.gt(1) || !repeatPurchases.gt(0) || !contribution.gt(0)) {
    return { valid: false, message: "Use positive leads, contribution and purchases, with conversion between 0% and 100%." };
  }
  const customers = leads.mul(conversion);
  const cac = spend.div(customers);
  const customerContribution = contribution.mul(repeatPurchases);
  const lifetimeProfitAfterCac = customerContribution.minus(cac);
  const firstOrderProfitAfterCac = contribution.minus(cac);
  return {
    valid: true,
    monthlySpend: number(spend),
    customers: number(customers),
    cac: number(cac),
    customerContribution: number(customerContribution),
    firstOrderProfitAfterCac: number(firstOrderProfitAfterCac),
    lifetimeProfitAfterCac: number(lifetimeProfitAfterCac),
    breakEvenPurchases: number(cac.div(contribution)),
    maxAffordableCac: number(customerContribution),
    maxMonthlySpend: number(customers.mul(customerContribution)),
    breakEvenCustomers: number(customerContribution.gt(0) ? spend.div(customerContribution) : 0),
    leadsNeededToRecoverSpend: number(spend.div(contribution.mul(repeatPurchases).mul(conversion))),
  };
}

export function analyzeHireBreakEven(input, currentResult, options = {}) {
  const monthlyPay = Decimal.max(0, D(options.monthlyPay));
  const burden = Decimal.max(0, D(options.payrollBurdenPct)).div(100);
  const otherCost = Decimal.max(0, D(options.otherMonthlyCost));
  const oneTimeCost = Decimal.max(0, D(options.oneTimeCost));
  const productiveHours = D(options.productiveHoursPerMonth);
  const expectedUnits = Decimal.max(0, D(options.expectedExtraUnits));
  const contribution = D(currentResult?.contribution);
  const conversion = D(input.conversionPct).div(100);
  const hoursPerUnit = D(input.hoursPerJob);
  if (!contribution.gt(0) || !productiveHours.gt(0) || !conversion.gt(0) || !hoursPerUnit.gt(0)) {
    return { valid: false, message: "Positive contribution, productive hours, conversion and delivery time are required." };
  }
  const monthlyHireCost = monthlyPay.mul(D(1).plus(burden)).plus(otherCost);
  const breakEvenUnits = monthlyHireCost.div(contribution);
  const monthlyNetBenefit = expectedUnits.mul(contribution).minus(monthlyHireCost);
  return {
    valid: true,
    monthlyHireCost: number(monthlyHireCost),
    breakEvenUnits: number(breakEvenUnits),
    wholeBreakEvenUnits: breakEvenUnits.ceil().toNumber(),
    requiredLeads: number(breakEvenUnits.div(conversion)),
    utilizationNeededPct: number(breakEvenUnits.mul(hoursPerUnit).div(productiveHours).mul(100)),
    expectedContribution: number(expectedUnits.mul(contribution)),
    monthlyNetBenefit: number(monthlyNetBenefit),
    paybackMonths: monthlyNetBenefit.gt(0) ? number(oneTimeCost.div(monthlyNetBenefit)) : null,
    revenueRequired: number(breakEvenUnits.mul(input.price)),
  };
}

export function buildBreakEvenTimeline(input, currentResult, options = {}) {
  const startupInvestment = Decimal.max(0, D(options.startupInvestment));
  const startingUnits = Decimal.max(0, D(options.startingMonthlyUnits));
  const growth = D(options.growthPct).div(100);
  const maxMonths = Math.max(1, Math.min(60, Math.round(Number(options.maxMonths) || 36)));
  const contribution = D(currentResult?.contribution);
  const operatingBase = D(input.fixedCosts).plus(input.ownerPay);
  const targetProfit = D(input.targetProfit);
  if (!contribution.gt(0) || growth.lte(-1)) {
    return { valid: false, message: "Positive contribution and monthly growth above -100% are required." };
  }
  const operatingBreakEvenUnits = operatingBase.div(contribution);
  let cumulativeRecovery = startupInvestment.neg();
  let paybackMonth = null;
  let targetProfitMonth = null;
  const forecast = Array.from({ length: maxMonths }, (_, index) => {
    const month = index + 1;
    const units = startingUnits.mul(D(1).plus(growth).pow(index));
    const revenue = units.mul(input.price);
    const operatingProfit = units.mul(contribution).minus(operatingBase);
    cumulativeRecovery = cumulativeRecovery.plus(operatingProfit);
    if (paybackMonth === null && cumulativeRecovery.gte(0)) paybackMonth = month;
    if (targetProfitMonth === null && operatingProfit.gte(targetProfit)) targetProfitMonth = month;
    return {
      month,
      units: number(units),
      revenue: number(revenue),
      operatingProfit: number(operatingProfit),
      cumulativeRecovery: number(cumulativeRecovery),
      breakEvenDay: units.gte(operatingBreakEvenUnits) && units.gt(0)
        ? number(operatingBreakEvenUnits.div(units).mul(30))
        : null,
    };
  });
  return {
    valid: true,
    startupInvestment: number(startupInvestment),
    operatingBreakEvenUnits: number(operatingBreakEvenUnits),
    wholeOperatingBreakEvenUnits: operatingBreakEvenUnits.ceil().toNumber(),
    operatingBreakEvenRevenue: number(operatingBreakEvenUnits.mul(input.price)),
    paybackMonth,
    targetProfitMonth,
    forecast,
  };
}
