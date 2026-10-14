export const sectionWorkflows = {
  restaurant: {
    label: 'Restaurant',
    records: ['Purchase-pack prices, pack sizes and usable ingredient yields.', 'Recipes, portions sold and the dates of the inventory period.', 'Opening and closing inventory, purchases, supplier credits and food sales on the same basis.', 'Loaded payroll, packaging, channel fees and monthly commitments, counted once.'],
    paths: [
      { title: 'My food cost is higher than the recipes suggest', steps: [
        ['Build the ingredient standard', '/calculators/recipe-cost-calculator/', 'Use purchased quantities and edible yield. Multiply recipe cost by the actual portions sold, including the real menu mix.'],
        ['Reconcile the period', '/calculators/food-cost-calculator/', 'Use inventory movements and food sales for the same dates. Compare actual usage with the sold-mix standard, not a single popular dish.'],
        ['Investigate the difference', '/blogs/restaurant-food-cost-percentage/', 'Check counts, credits, portions, waste and staff meals before changing menu prices. A variance alone does not identify its cause.'],
      ] },
      { title: 'A busy menu is not covering the monthly bills', steps: [
        ['Cost the full selling unit', '/blogs/restaurant-menu-pricing-formula/', 'Include ingredients, packaging, genuinely variable labour and the fee basis for the selected channel.'],
        ['Test price and capacity', '/calculators/menu-pricing-calculator/', 'Compare contribution at your price with the monthly target and deliverable volume. Food-cost target pricing is only one comparison.'],
        ['Compare the month with its budget', '/blogs/restaurant-budgeting/', 'Keep the original budget and actuals separate. Explain sales, COGS and committed expense differences before revising the forecast.'],
      ] },
    ],
    resources: [
      ['Restaurant monthly budget', '/blogs/restaurant-budgeting/', 'Editable Excel budget and actuals, with an explained example and its cost limits.'],
      ['Restaurant business plan', '/blogs/restaurant-business-plan/', 'Planning outline and editable financial workbook for the launch and monthly model.'],
      ['Coffee shop business plan', '/blogs/coffee-shop-business-plan/', 'A separate café format and workbook; replace its illustrative assumptions.'],
    ],
    example: {
      title: 'Worked check: actual food usage exceeds the standard',
      rows: [['Opening inventory', '$8,000'], ['Purchases / supplier credits', '$18,000 / $0'], ['Closing inventory', '$6,000'], ['Food sales / theoretical usage', '$60,000 / $18,200'], ['Actual usage / food-cost percentage', '$20,000 / 33.33%'], ['Usage variance / percentage-point gap', '+$1,800 / +3.00 points']],
      explanation: 'Actual usage is $8,000 + $18,000 − $6,000 = $20,000. The theoretical $18,200 represents the actual sold mix in this fictional example. Its 30.33% of sales differs from actual food cost by 3 percentage points, not 3% of food spending.',
      action: 'Reconcile records before interpreting the $1,800. The result does not establish waste, theft, staff performance or a price increase. It also excludes payroll and overhead.',
    },
  },
  cleaning: {
    label: 'Cleaning',
    records: ['Accepted scope, first-visit versus maintenance tasks and the agreed job or contract price.', 'Estimated and actual paid crew-hours, with a consistent loaded hourly cost.', 'Supplies used, travel, actual processing fees, callbacks and customer credits.', 'Completed visits, committed payroll, monthly overhead, owner pay and expected collection dates.'],
    paths: [
      { title: 'The completed job left less than the quote', steps: [
        ['Preserve the accepted estimate', '/blogs/cleaning-estimate-vs-actual-job-cost/', 'Compare the same job and cost boundary. Keep approved extra work distinct from an estimating error or service callback.'],
        ['Reconcile the final job', '/resources/cleaning-job-cost-worksheet/', 'Record first-visit actuals, then callbacks and credits once. Use actual net payment fees when a refund changes them.'],
        ['Use evidence in the next quote', '/blogs/how-much-to-charge-for-house-cleaning/', 'Revise the specific time or scope assumption for comparable work; one exceptional job does not set every future price.'],
      ] },
      { title: 'The contract looks profitable but payroll is tight', steps: [
        ['Check the account economics', '/calculators/cleaning-contract-profit-calculator/', 'Use one contract period, a stated visit schedule and account costs. Check which expenses the tool includes.'],
        ['Budget the whole month', '/resources/cleaning-business-budget-template/', 'Separate completed visits and variable costs from committed payroll, owner pay and overhead.'],
        ['Place receipts beside payroll dates', '/blogs/cleaning-contract-payroll-cash-gap/', 'Test when cleared customer payments arrive. A positive contract result cannot fund an earlier payroll by itself.'],
      ] },
    ],
    resources: [
      ['Quote versus actual worksheet', '/resources/cleaning-job-cost-worksheet/', 'Blank Job and fictional Example tabs, including callback costs, credits and final contribution.'],
      ['Monthly cleaning budget', '/resources/cleaning-business-budget-template/', 'Editable monthly visit, payroll, overhead and capacity plan.'],
    ],
    example: {
      title: 'Worked check: first-visit contribution is not the final result',
      rows: [['Quoted revenue / estimated contribution', '$240 / $110.80'], ['First-visit actual contribution', '$78.80'], ['Callback: labour + supplies + travel', '$25 + $4 + $8 = $37'], ['Customer credit / retained revenue', '$20 / $220'], ['Final variable costs / contribution', '$198.20 / $21.80'], ['Final contribution versus estimate', '−$89.00']],
      explanation: 'The $32 first-visit reduction, $37 callback and $20 credit explain the $89 difference. The credit reduces revenue; it is not also entered as an expense. Actual processing fees remain $7.20 in this fictional job.',
      action: 'Count each cost once and review the cause before changing a quote. The $21.80 still needs to help fund monthly overhead and any costs outside these job inputs.',
    },
  },
  ecommerce: {
    label: 'E-commerce',
    records: ['Order revenue after discounts, with sales tax and customer-paid shipping treated consistently.', 'Landed product cost, fulfilment, packaging, outbound shipping subsidy and actual fees.', 'Return cohorts: refunds, recovered inventory value, reverse shipping, handling and retained fees.', 'Advertising spend and attributable orders for matching dates, plus inventory payment dates and monthly overhead.'],
    paths: [
      { title: 'Reported ROAS looks good but orders leave little money', steps: [
        ['Build the complete order contribution', '/blogs/break-even-roas-formula/', 'Subtract product, fulfilment, shipping, fees and expected losses before testing acquisition. Use the advertised order mix.'],
        ['Calculate the advertising threshold', '/calculators/break-even-roas-calculator/', 'Enter a pre-ad contribution margin. Do not include ad spend in that margin and subtract the same spend again.'],
        ['Check whole-store break-even', '/calculators/ecommerce-break-even-calculator/', 'Include acquisition once, then add overhead and owner pay. Passing the ad threshold alone does not cover the monthly business.'],
      ] },
      { title: 'Returns or stock purchases are absorbing cash', steps: [
        ['Define a returned-order loss', '/calculators/ecommerce-return-cost-calculator/', 'Include refunds and return costs alongside recoverable stock. Read the calculator definition before averaging its result.'],
        ['Reconcile the cohort', '/blogs/ecommerce-return-cost-per-order/', 'Track the original sales cohort, returns still open and the actual recovery cutoff. State the denominator for any per-order allowance.'],
        ['Place the next inventory payment', '/blogs/inventory-reorder-point-cash-flow/', 'Model replenishment dates and cash separately from COGS attributed to sold orders. Profitable stock can still need funding before it sells.'],
      ] },
    ],
    resources: [
      ['Order contribution and ROAS walkthrough', '/blogs/break-even-roas-formula/', 'Cost-boundary checklist, campaign examples and links to the free ad-return tool.'],
      ['Return-cost calculator', '/calculators/ecommerce-return-cost-calculator/', 'Refund, recovery and handling assumptions for your own returned-order scenario.'],
      ['Stock and working-capital guide', '/blogs/how-to-calculate-working-capital/', 'Balance-sheet resources and obligations alongside the separate payment-timing question.'],
    ],
    example: {
      title: 'Worked check: ad break-even differs from store break-even',
      rows: [['Selling revenue per order', '$50.00'], ['Product / fulfilment and shipping / return-loss allowance', '$20 / $6 / $2'], ['Payment fees: 3% of $50', '$1.50'], ['Pre-ad contribution / margin', '$20.50 / 41%'], ['Advertising cost per order / remaining contribution', '$8 / $12.50'], ['Monthly commitments / required whole orders', '$2,500 / 200']],
      explanation: 'Pre-ad contribution is $50 − $20 − $6 − $2 − $1.50 = $20.50. Its ad-only break-even ROAS is 1 ÷ 0.41 = approximately 2.44×, using the unrounded ratio. At $8 advertising cost per order, the remaining $12.50 funds $2,500 of monthly commitments at 200 orders.',
      action: 'At exactly the ad-only threshold, no contribution remains for overhead. This fictional example treats $2 as a net expected loss allowance before ads; do not add the same refund or inventory loss elsewhere.',
    },
  },
  agency: {
    label: 'Agency',
    records: ['Earned service revenue, agreed deliverables and changes; keep reimbursed media spend separate.', 'Delivery, meetings, revisions and account-management hours, including owner delivery time.', 'Loaded labour basis, client-specific contractors and tools, payment fees and committed payroll.', 'Available productive hours, client concentration, invoice clearance dates and payroll due dates.'],
    paths: [
      { title: 'A retainer keeps the team busy but loses contribution', steps: [
        ['Reconcile the client-month', '/blogs/agency-client-profitability/', 'Match the fee with work delivered. Show direct contribution separately from any allocated shared overhead.'],
        ['Cost the added scope', '/blogs/agency-scope-creep-cost/', 'Record extra hours and incremental expenses without rewriting the original scope. Distinguish a request from an estimate miss.'],
        ['Check monthly team capacity', '/blogs/agency-billable-utilization-rate/', 'Include committed work and use a stated available-hours denominator. Planned billable hours are not guaranteed sold hours.'],
      ] },
      { title: 'The client target or hiring plan does not fit the cash calendar', steps: [
        ['Calculate whole-client targets', '/calculators/agency-break-even-calculator/', 'Use a consistent client-month, contribution, monthly commitments and total delivery hours.'],
        ['Compare staffing on the same workload', '/blogs/agency-employee-vs-freelancer-break-even/', 'Include employer burden, minimum contractor terms and onboarding. Do not count committed payroll again as a variable client cost.'],
        ['Forecast actual receipt dates', '/calculators/cash-flow-forecast-template/', 'Place invoices, payroll and supplier payments into the thirteen-week schedule and test a delayed receipt.'],
      ] },
    ],
    resources: [
      ['Client profitability review', '/blogs/agency-client-profitability/', 'A client P&L example and the records needed to separate contribution from overhead.'],
      ['Thirteen-week cash forecast', '/calculators/cash-flow-forecast-template/', 'Dated receipt and payment inputs, reserve checks and an explained forecast method.'],
      ['Guided agency demonstration', '/calculator-walkthroughs/', 'Choose the Agency example to follow costs, whole-client target and capacity.'],
    ],
    example: {
      title: 'Worked check: the required client count exceeds capacity',
      rows: [['Fee / direct labour / other delivery cost', '$2,000 / $700 / $100'], ['Payment fees / client contribution', '$60 / $1,140'], ['Overhead + owner pay', '$2,000 + $3,000 = $5,000'], ['Required whole clients', '5'], ['Productive hours / hours per client-month', '104 / 24'], ['Whole-client capacity / contribution at capacity', '4 / $4,560']],
      explanation: 'Five clients are required because $5,000 ÷ $1,140 is about 4.39. One worker at 30 weekly hours and 80% utilisation provides 104 productive monthly hours using 52 ÷ 12 weeks. At 24 hours per client-month, only four complete clients fit.',
      action: 'At that capacity, contribution is $440 below the monthly target. Test scope, price, costs or productive capacity before promising a fifth retainer. These are fictional averages, not evidence of actual demand or a recommendation to hire.',
    },
  },
};
