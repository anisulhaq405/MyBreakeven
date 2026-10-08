import Decimal from "decimal.js";
import { calculate } from "./engine";

const D = (value) => new Decimal(value || 0);
const num = (value) => D(value).toNumber();

export function advancedAnalysis(input, result, options = {}) {
  if (!result?.valid) return { valid: false };
  const requestedUnits = options.plannedUnits ?? Math.ceil(result.jobs * 1.15);
  const requestedGrowth = options.growthPct ?? 2;
  if (!["number", "string"].includes(typeof requestedUnits) || (typeof requestedUnits === "string" && requestedUnits.trim() === "") || !Number.isSafeInteger(Number(requestedUnits)) || Number(requestedUnits) < 0 ||
      !["number", "string"].includes(typeof requestedGrowth) || (typeof requestedGrowth === "string" && requestedGrowth.trim() === "") || !Number.isFinite(Number(requestedGrowth)) || Number(requestedGrowth) < -25 || Number(requestedGrowth) > 50) {
    return { valid: false, message: "Enter a non-negative whole monthly sales plan and a monthly growth rate from −25% to 50%." };
  }
  const variable = D(input.materialCost).plus(input.laborCost).plus(input.otherVariableCost).plus(input.acquisitionCost);
  const feeRate = D(input.paymentFeePct).div(100);
  const netRate = D(1).minus(feeRate);
  const fixedBase = D(input.fixedCosts).plus(input.ownerPay);
  const baseContribution = D(input.price).mul(netRate).minus(variable);
  const accountingUnits = fixedBase.div(baseContribution);
  const accountingRevenue = accountingUnits.mul(input.price);
  const plannedUnits = D(Number(requestedUnits));
  const plannedRevenue = plannedUnits.mul(input.price);
  const plannedProfit = plannedUnits.mul(baseContribution).minus(fixedBase);
  const marginSafetyRevenue = Decimal.max(0, plannedRevenue.minus(accountingRevenue));
  const marginSafetyPct = plannedRevenue.gt(0) ? marginSafetyRevenue.div(plannedRevenue).mul(100) : D(0);
  const wholeCapacity = D(result.capacity).floor();
  const capacityPrice = wholeCapacity.gt(0)
    ? fixedBase.plus(input.targetProfit).div(wholeCapacity).plus(variable).div(netRate).toDecimalPlaces(2, Decimal.ROUND_CEIL)
    : null;
  const productiveHoursPerWorker = D(input.hoursPerWorker).mul(52).div(12).mul(D(input.utilizationPct).div(100));
  const additionalWorkers = result.wholeJobs > result.wholeCapacity
    ? productiveHoursPerWorker.gt(0)
      ? D(result.wholeJobs).mul(input.hoursPerJob).minus(D(result.capacity).mul(input.hoursPerJob)).div(productiveHoursPerWorker).ceil()
      : null
    : D(0);

  const drivers = [
    ["Selling price", "price", 0.9], ["Materials", "materialCost", 1.1],
    ["Labor", "laborCost", 1.1], ["Other variable", "otherVariableCost", 1.1],
    ["Acquisition", "acquisitionCost", 1.1], ["Fixed overhead", "fixedCosts", 1.1],
    ["Conversion", "conversionPct", 0.9],
  ].map(([name, key, factor]) => {
    const changed = calculate({ ...input, [key]: D(input[key]).mul(factor).toNumber() });
    const impact = !changed.valid ? null : D(result.revenue).gt(0)
      ? D(changed.revenue).minus(result.revenue).div(result.revenue).mul(100).toNumber()
      : 0;
    return { name, impact, viable: changed.valid };
  }).sort((a, b) => (b.impact === null ? Infinity : Math.abs(b.impact)) - (a.impact === null ? Infinity : Math.abs(a.impact)));

  const priceChanges = [-10, -5, 0, 5, 10];
  const volumeFactors = [0.8, 1, 1.2, 1.5];
  const heatmap = volumeFactors.map((volumeFactor) => ({
    volumeFactor,
    cells: priceChanges.map((priceChange) => {
      const price = D(input.price).mul(D(1).plus(D(priceChange).div(100)));
      const contribution = price.mul(netRate).minus(variable);
      const units = D(result.jobs).mul(volumeFactor);
      return { priceChange, profit: num(units.mul(contribution).minus(fixedBase)) };
    }),
  }));

  const growthPct = Number(options.growthPct ?? 2);
  const forecast = Array.from({ length: 12 }, (_, index) => {
    const units = plannedUnits.mul(D(1).plus(D(growthPct).div(100)).pow(index));
    const revenue = units.mul(input.price);
    const profit = units.mul(baseContribution).minus(fixedBase);
    return { month: index + 1, units: num(units), revenue: num(revenue), profit: num(profit) };
  });

  return {
    valid: true, accountingRevenue: num(accountingRevenue), targetRevenue: result.revenue,
    plannedUnits: num(plannedUnits), plannedRevenue: num(plannedRevenue), plannedProfit: num(plannedProfit),
    marginSafetyRevenue: num(marginSafetyRevenue), marginSafetyPct: num(marginSafetyPct),
    capacityPrice: capacityPrice ? num(capacityPrice) : null,
    additionalWorkers: additionalWorkers ? additionalWorkers.toNumber() : null,
    drivers, heatmap, forecast,
  };
}
