import Decimal from "decimal.js";

// Prices round UP to cents so a displayed price still funds the stated goal.
export function pricingSuggestions(input, plannedUnits) {
  const keys = ["price", "materialCost", "laborCost", "otherVariableCost", "acquisitionCost", "fixedCosts", "ownerPay", "targetProfit", "paymentFeePct", "workers", "hoursPerWorker", "hoursPerJob", "utilizationPct"];
  if (keys.some(key => !["string", "number"].includes(typeof input[key]) || String(input[key]).trim() === "" || !Number.isFinite(Number(input[key])) || Number(input[key]) < 0)
    || !Number.isFinite(Number(plannedUnits)) || Number(plannedUnits) <= 0 || !Number.isInteger(Number(plannedUnits))) {
    return { valid: false, message: "Enter a positive whole number of expected monthly sales and non-negative, finite costs and capacity inputs." };
  }
  const d = key => new Decimal(input[key]);
  const rate = new Decimal(1).minus(d("paymentFeePct").div(100));
  if (!rate.gt(0) || d("utilizationPct").gt(100) || !d("hoursPerJob").gt(0)) {
    return { valid: false, message: "Payment fees must be below 100%, utilization at most 100%, and delivery hours above zero." };
  }
  const volume = new Decimal(plannedUnits);
  const variable = d("materialCost").plus(d("laborCost")).plus(d("otherVariableCost")).plus(d("acquisitionCost"));
  const operatingNeed = d("fixedCosts").plus(d("ownerPay"));
  const targetNeed = operatingNeed.plus(d("targetProfit"));
  const capacity = d("workers").mul(d("hoursPerWorker")).mul(52).div(12).mul(d("utilizationPct").div(100)).div(d("hoursPerJob")).floor();
  const priceFor = need => variable.plus(need.div(volume)).div(rate).toDecimalPlaces(2, Decimal.ROUND_CEIL);
  const rows = [
    ["Direct-cost floor", "Covers per-sale costs and fees only. No overhead or owner pay allowance.", new Decimal(0)],
    ["Sustainable price", "Covers per-sale costs, fees, monthly overhead and owner pay.", operatingNeed],
    ["Target-profit price", "Also funds your selected monthly target profit.", targetNeed],
  ].map(([name, description, need]) => {
    const price = priceFor(need);
    const contribution = price.mul(rate).minus(variable);
    // At a zero-contribution floor, there is no finite sales target for positive need.
    const requiredUnits = targetNeed.isZero() ? 0 : contribution.gt(0) ? targetNeed.div(contribution).ceil().toNumber() : null;
    return { name, description, price: price.toNumber(), contribution: contribution.toNumber(), profit: volume.mul(contribution).minus(operatingNeed).toNumber(), requiredUnits, fitsCapacity: requiredUnits !== null && new Decimal(requiredUnits).lte(capacity) };
  });
  const currentContribution = d("price").mul(rate).minus(variable);
  const currentRequiredUnits = targetNeed.isZero() ? 0 : currentContribution.gt(0) ? targetNeed.div(currentContribution).ceil().toNumber() : null;
  return {
    valid: true, plannedUnits: volume.toNumber(), wholeCapacity: capacity.toNumber(), plannedFitsCapacity: volume.lte(capacity),
    variableCost: variable.toNumber(), operatingNeed: operatingNeed.toNumber(), targetNeed: targetNeed.toNumber(), rows,
    currentProfit: volume.mul(currentContribution).minus(operatingNeed).toNumber(), currentRequiredUnits,
    currentFitsCapacity: currentRequiredUnits !== null && new Decimal(currentRequiredUnits).lte(capacity),
    priceChange: rows[2].price - Number(input.price),
    capacityTargetPrice: capacity.gt(0) ? variable.plus(targetNeed.div(capacity)).div(rate).toDecimalPlaces(2, Decimal.ROUND_CEIL).toNumber() : null,
  };
}
