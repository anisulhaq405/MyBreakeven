import Decimal from 'decimal.js';

// Shared by the full planner and the guide widget; no intermediate rounding.
export function unitContributionAmounts(price, variableCost, feePct, fixedFee = 0) {
  const sale = new Decimal(price);
  const percentageFee = sale.mul(feePct).div(100);
  const fees = percentageFee.plus(fixedFee);
  const totalVariableCost = new Decimal(variableCost).plus(fees);
  const contribution = sale.minus(totalVariableCost);
  return { percentageFee, fees, totalVariableCost, contribution };
}

export function calculateUnitContribution(raw) {
  const keys = ['price', 'variableCost', 'feePct', 'fixedFee'];
  const input = {};
  for (const key of keys) {
    const value = raw?.[key];
    if (value === '' || value === null || value === undefined || typeof value === 'boolean') {
      return { valid: false, message: 'Complete each field with a valid number. Enter 0 when a cost does not apply.' };
    }
    try { input[key] = new Decimal(value); } catch {
      return { valid: false, message: 'Complete each field with a valid number.' };
    }
    if (!input[key].isFinite() || input[key].isNegative() || input[key].gt('1000000000000')) {
      return { valid: false, message: 'Use non-negative finite amounts up to 1 trillion per unit.' };
    }
  }
  if (!input.price.gt(0)) return { valid: false, message: 'Selling price must be above zero to calculate a contribution percentage.' };
  if (input.feePct.gt(100)) return { valid: false, message: 'The percentage fee must be between 0 and 100.' };
  const amounts = unitContributionAmounts(input.price, input.variableCost, input.feePct, input.fixedFee);
  const ratio = amounts.contribution.div(input.price).mul(100);
  if (!Number.isFinite(ratio.toNumber())) return { valid: false, message: 'This price is too small relative to the costs. Review your per-unit amounts.' };
  return {
    valid: true,
    ...Object.fromEntries(Object.entries(amounts).map(([key, value]) => [key, value.toNumber()])),
    ratio: ratio.toNumber(),
    state: amounts.contribution.gt(0) ? 'positive' : amounts.contribution.isZero() ? 'zero' : 'negative',
  };
}
