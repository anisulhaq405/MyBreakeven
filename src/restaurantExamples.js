// Hypothetical USD planning cases, not market averages or platform fee schedules.
// Each uses one completed customer check/order; committed payroll is in fixedCosts.
const monthly = { fixedCosts: 18000, ownerPay: 4000, targetProfit: 2000, workers: 8, hoursPerWorker: 35, utilizationPct: 70, conversionPct: 50 };
export const restaurantExamples = [
  { id: 'dine-in', title: 'Dine-in', unit: 'One completed customer check, not one guest', note: 'Food covers the complete check. Guaranteed payroll is included in overhead; direct labor is only incremental sale-dependent pay. Productive worker-hours do not measure table turns or seats.', values: { ...monthly, price: 48, materialCost: 14, laborCost: 3, otherVariableCost: 1, acquisitionCost: 1, paymentFeePct: 3, hoursPerJob: 0.45 } },
  { id: 'takeaway', title: 'Direct takeaway', unit: 'One completed direct pickup order', note: 'Other variable costs include $2 packing and a $0.50 flat transaction allowance. The 3% fee is separate. This is a standalone planning case using the same monthly commitments as the other examples.', values: { ...monthly, price: 28, materialCost: 8, laborCost: 2, otherVariableCost: 2.5, acquisitionCost: 1, paymentFeePct: 3, hoursPerJob: 0.25 } },
  { id: 'delivery', title: 'Delivery app', unit: 'One completed app order', note: 'The illustrative 28% combines a 25% commission and a separate 3% payment fee, both assumed on the same net selling-price basis. Other variable costs contain $2.50 packaging only. Use your actual contract; never repeat commission in both fields.', values: { ...monthly, price: 32, materialCost: 9, laborCost: 2, otherVariableCost: 2.5, acquisitionCost: 1, paymentFeePct: 28, hoursPerJob: 0.3 } },
];
export const restaurantFieldHelp = {
  price: 'Net revenue for one complete customer check/order after discounts. Exclude sales tax collected for others and pass-through tips. One check may serve several guests.',
  materialCost: 'Ingredients consumed by the complete order, including an appropriate waste allowance. A single dish recipe is not the cost of a multi-dish check.',
  laborCost: 'Only pay that changes with an extra order. Keep guaranteed kitchen/service payroll and employer costs in monthly overhead; do not count them here again.',
  otherVariableCost: 'Packing, flat transaction charges and any commission expressed as dollars per order. If commission is in percentage fees, exclude it here.',
  fixedCosts: 'Monthly rent, guaranteed payroll and other committed operating expenses. Exclude owner compensation entered below and costs already charged per order.',
  paymentFeePct: 'Combined fees only when charged on the same net-price basis. Enter commission here OR as dollars per order above. Use actual net dollar costs for fees with different bases.',
  hoursPerJob: 'Total productive worker-hours across kitchen, service and packing for one order. This is not customer waiting time; check peak kitchen and seat limits separately.',
  conversionPct: 'Completed orders divided by comparable qualified inquiries or visits on the same basis. Guests, checks, website sessions and delivery-app views are different units.',
};
