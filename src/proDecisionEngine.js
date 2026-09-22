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
  if (!validOffers.length) return { valid: false, message: "Add at least one offer with a positive price, mix and delivery time." };
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
