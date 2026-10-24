// Editorial ownership, not measured keywords or a claim about Google's chosen URL.
// Guides explain a method; calculators accept inputs; hubs help choose a task.
export const industryIntent = [
  ['cleaning', 'cleaning-business-break-even', 'cleaning-business-break-even-calculator', 'Cleaning Business Break-Even: Jobs, Costs and Crew Capacity'],
  ['landscaping', 'landscaping-break-even', 'landscaping-break-even-calculator', 'How to Do Break-Even Analysis for a Landscaping Business'],
  ['photography', 'photography-business-break-even', 'photography-business-break-even-calculator', 'Photography Break-Even: Sessions, Costs and Working Hours'],
  ['agency', 'agency-break-even', 'agency-break-even-calculator', 'Agency Break-Even: Retainers, Contribution and Delivery Capacity'],
  ['detailing', 'mobile-detailing-break-even', 'mobile-detailing-break-even-calculator', 'Mobile Detailing Break-Even: Jobs, Route Costs and Capacity'],
  ['ecommerce', 'ecommerce-break-even', 'ecommerce-break-even-calculator', 'Ecommerce Break-Even: Net Orders, Costs and Capacity'],
  ['restaurant', 'restaurant-break-even', 'restaurant-break-even-calculator', 'Restaurant Break-Even: Orders, Costs and Service Capacity'],
  ['salon', 'salon-break-even', 'salon-break-even-calculator', 'Salon Break-Even: Appointments, Service Mix and Stylist Capacity'],
];

export const decisionIntent = [
 ["net-cash-flow-calculator", "Completed-period net cash flow and closing balance reconciliation", ["cash-flow-break-even-vs-profit-break-even", "cash-flow-forecast-vs-break-even"]],
 ["operating-profit-margin-calculator", "Operating margin from consistent statement inputs", ["operating-expenses", "contribution-margin-vs-profit-margin"]],
  ['business-roi-calculator', 'business ROI and AI automation payback calculator', ['cash-flow-break-even-vs-profit-break-even']],
  ['discount-break-even-calculator', 'discount break-even calculator', ['discount-break-even-sales-volume']],
  ['price-increase-calculator', 'price increase customer loss calculator', ['how-many-customers-can-you-lose-after-raising-prices']],
  ['break-even-roas-calculator', 'break-even ROAS calculator', ['break-even-roas-formula']],
  ['hourly-rate-calculator', 'billable hourly rate calculator', ['agency-billable-utilization-rate', 'photography-pricing-packages']],
  ['cash-runway-calculator', 'cash runway calculator', ['how-to-calculate-working-capital']],
  ['cleaning-contract-profit-calculator', 'cleaning contract profit calculator', ['commercial-cleaning-contract-bid']],
  ['lawn-route-profit-calculator', 'lawn route profit calculator', ['landscaping-route-density-profit']],
  ['detailing-chemical-cost-calculator', 'detailing chemical cost calculator', ['car-detailing-prices-list']],
  ['hair-color-product-cost-calculator', 'hair color product cost calculator', ['hair-color-service-cost-per-appointment']],
  ['ecommerce-return-cost-calculator', 'ecommerce return cost calculator', ['ecommerce-return-cost-per-order']],
  ['salon-rebooking-calculator', 'salon rebooking contribution calculator', ['salon-membership-pricing']],
  ['salon-no-show-profit-loss-calculator', 'salon no-show profit loss calculator', ['salon-no-show-cost']],
  ['mobile-detailing-travel-profit-calculator', 'mobile detailing travel profit calculator', ['mobile-detailing-travel-fee']],
  ['recipe-cost-calculator', 'recipe cost and yield calculator', ['restaurant-food-cost-percentage', 'coffee-shop-drink-contribution-margin']],
  ['food-cost-calculator', 'actual food cost percentage calculator', ['restaurant-food-cost-percentage', 'restaurant-prime-cost']],
  ['menu-pricing-calculator', 'menu pricing calculator', ['restaurant-menu-pricing-formula', 'restaurant-menu-engineering-contribution-margin']],
  ['employee-cost-calculator', 'loaded employee cost calculator', ['agency-employee-vs-freelancer-break-even', 'restaurant-labor-cost-percentage']],
  ['cash-flow-forecast-template', '13-week cash flow forecast template', ['cash-flow-forecast-vs-break-even', 'cash-flow-break-even-vs-profit-break-even']],
];

export function industryIntentForGuide(slug) {
  return industryIntent.find(([, guide]) => guide === slug);
}
