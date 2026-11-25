// Directory summaries describe the decision; worked figures stay on the calculator page.
const copy = {
 household: ['Compare your income and payment obligations using your own figures.', 'Check my figures'],
 deposit: ['Compare deposit growth using your balance, rate, term and compounding assumptions.', 'Compare savings'],
 cashForecast: ['Map dated receipts and payments to spot cash shortfalls and reserve gaps.', 'Forecast cash'],
 employeeCost: ['Budget recurring employment costs, first-year hiring costs and productive hours.', 'Budget an employee'],
 foodWorkflow: ['Connect ingredient costs, portions and selling prices to understand food margins.', 'Work out food costs'],
 travelProfit: ['Compare detailing jobs after travel, materials and labor; check contribution per working hour.', 'Compare job profit'],
 noShow: ['Estimate the contribution lost to missed appointments and compare recovery assumptions.', 'Check no-show cost'],
 rebooking: ['Compare repeat visits, retained clients and contribution under your rebooking assumptions.', 'Plan repeat bookings'],
 returns: ['Include refunds, shipping and handling to check what returns cost each retained order.', 'Check return costs'],
 hairColor: ['Cost the color and developer used per service before setting a contribution target.', 'Cost a color service'],
 chemical: ['Convert dilution and product use into chemical cost per detailing job.', 'Cost a detailing job'],
 lawnRoute: ['Compare route revenue with crew time, travel and delivery costs.', 'Check route profit'],
 cleaningContract: ['Check whether a cleaning contract covers delivery labor, supplies and allocated overhead.', 'Check contract profit'],
 runway: ['Estimate how many months your cash can cover net burn while protecting a reserve.', 'Check cash runway'],
 hourly: ['Translate annual costs, owner pay and billable hours into a planning hourly rate.', 'Work out my rate'],
 roas: ['Find the ad return needed to cover order costs, fees and your selected profit target.', 'Check break-even ROAS'],
 increase: ['Test how a price increase and a change in sales volume affect contribution.', 'Test a price change'],
 discount: ['Calculate the extra sales needed to preserve contribution after a discount.', 'Test a discount'],
 roi: ['Compare investment cost with net return and check the assumptions behind the percentage.', 'Calculate business ROI'],
 operatingMargin: ['Calculate operating profit margin from revenue and operating expenses.', 'Check operating margin'],
 netCashFlow: ['Reconcile opening cash, receipts and payments to your closing cash balance.', 'Calculate net cash flow'],
 startupCost: ['Separate launch purchases, recurring costs and cash reserves in your startup budget.', 'Budget startup costs'],
 futureValue: ['Project a balance from your starting amount, contributions, time and assumed return.', 'Project future value'],
 ebitda: ['Reconcile earnings before interest, tax, depreciation and amortization from your figures.', 'Calculate EBITDA'],
 coast: ['Estimate the invested balance needed now to grow toward your retirement target.', 'Check Coast FIRE'],
 fire: ['Compare spending, savings and return assumptions for a financial independence target.', 'Plan a FIRE target'],
 refinance: ['Compare refinancing payments, closing costs and the time needed to recover those costs.', 'Compare refinancing'],
 equivalentRatio: ['Scale a proportion or solve a missing ratio term with a visible calculation.', 'Solve a ratio'],
 financialRatios: ['Calculate liquidity, profitability and leverage ratios from financial statements.', 'Check financial ratios'],
};
export function calculatorCardCopy(slug, tool) {
 if (slug === 'debt-to-income-calculator') return ['Compare monthly debt payments with gross income, with rent shown separately.', 'Check debt to income'];
 if (slug === 'prorated-rent-calculator') return ['Work out partial-month rent using the selected dates and day-count method.', 'Calculate prorated rent'];
 const [summary, action] = copy[tool.mode] || [tool.intro, 'Build my break-even plan'];
 return [summary, action];
}
