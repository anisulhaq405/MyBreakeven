export const authorityPages = {
  'calculation-methodology': ['Calculation Methodology | MyBreakeven', 'Inspect MyBreakeven formulas for contribution, break-even, capacity, business ROI and AI automation payback. Reproduce worked examples and check limits.', 'How MyBreakeven calculates your business target'],
  'editorial-policy': ['Editorial and Corrections Policy | MyBreakeven', 'See how MyBreakeven labels examples, checks calculations, attributes content and handles corrections. Learn what a review date does and does not mean.', 'Editorial standards and corrections'],
  'founder': ['Anis Ul Haq | Founder & SaaS Developer', 'Meet Anis Ul Haq, founder and SaaS developer. Explore his work in web apps, AI automation, technical SEO, e-commerce and business planning tools.', 'Anis Ul Haq'],
  'resources': ['Business Planning Resources | MyBreakeven', 'Find free business ROI, AI automation and break-even tools, cleaning budget worksheets and calculation walkthroughs. Inspect methods and worked examples.', 'Business planning resources'],
  'resources/cleaning-business-budget-template': ['Cleaning Business Budget Template: Monthly Plan', 'Download a monthly cleaning and janitorial budget template for Excel. Compare bookings, payroll, overhead and owner pay, then check job targets against capacity.', 'Cleaning business budget template'],
  'resources/cleaning-job-cost-worksheet': ['Cleaning Job Cost Worksheet: Quote vs Actual | MyBreakeven', 'Compare quoted and actual cleaning job costs. Track crew-hours, callback costs, customer credits and payment fees with a free worksheet and worked example.', 'Cleaning Job Cost Worksheet: Estimate vs Actual'],
  'calculator-walkthroughs': ['Calculator Walkthroughs | MyBreakeven', 'Follow cleaning and agency planning examples from inputs to contribution, monthly sales targets and capacity. See exactly which assumptions matter.', 'Follow a calculation from inputs to decision'],
};
export const worksheetFile = '/downloads/mybreakeven-cleaning-job-cost.xlsx?v=20261014';
export const exampleJobs = {
  estimated: { revenue: 240, hours: 4, wage: 25, supplies: 12, travel: 10, other: 0, fee: 3 },
  actual: { revenue: 240, hours: 5, wage: 25, supplies: 15, travel: 14, other: 0, fee: 3 },
};
export function dateLabel(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
}

export const demoPlans={cleaning:{price:100,materialCost:10,laborCost:8,otherVariableCost:2,acquisitionCost:0,fixedCosts:2500,ownerPay:1500,targetProfit:0,paymentFeePct:3,workers:1,hoursPerWorker:30,hoursPerJob:2.6,utilizationPct:80,conversionPct:25},agency:{price:2000,materialCost:0,laborCost:700,otherVariableCost:100,acquisitionCost:0,fixedCosts:2000,ownerPay:3000,targetProfit:0,paymentFeePct:3,workers:1,hoursPerWorker:30,hoursPerJob:24,utilizationPct:80,conversionPct:25}};
