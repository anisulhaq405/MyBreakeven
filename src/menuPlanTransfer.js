import Decimal from 'decimal.js';
import { calculateMenuPrice } from './foodCostEngine.js';
import { calculate } from './engine.js';

// Require an explicit selling-unit/scope review and actual workforce assumptions.
// Item capacity cannot determine team hours or inquiry conversion.
export function menuRestaurantPlan(input, operations, confirmed) {
  if (!confirmed || !calculateMenuPrice(input).valid) return null;
  const keys = ['acquisitionCost','workers','hoursPerWorker','hoursPerJob','utilizationPct','conversionPct'];
  if (keys.some(key => operations[key] === '' || operations[key] == null || !Number.isFinite(Number(operations[key])) || Number(operations[key]) < 0)) return null;
  const plan = {
    price: Number(input.price), materialCost: Number(input.ingredient), laborCost: Number(input.labor),
    otherVariableCost: new Decimal(input.packaging).plus(input.other).toNumber(),
    paymentFeePct: Number(input.fee), fixedCosts: Number(input.fixed), ownerPay: Number(input.ownerPay),
    targetProfit: Number(input.profitTarget), expectedMonthlyUnits: Number(input.volume),
    ...Object.fromEntries(keys.map(key => [key, Number(operations[key])])),
  };
  return calculate(plan).valid ? plan : null;
}
