import { industryIntentForGuide } from '../../searchIntent.js';

export function applyIntentOwnershipReview(post) {
  const entry = industryIntentForGuide(post.slug);
  let result = entry && post.title !== entry[3]
    ? { ...post, title: entry[3] }
    : post;
  if (post.slug !== 'restaurant-budgeting') return result;
  // Make the download and the workbook's scope clear before the feature image.
  const answerHtml = '<h2 id="budget-download">Download the restaurant monthly budget</h2><p><a href="/downloads/restaurant-monthly-budget-template.xlsx" download>Download the editable restaurant budget for Excel (.xlsx)</a>. Use it to compare one month’s planned sales and operating costs with actual results. Read the labelled example below before replacing its assumptions.</p><p>This is an operating budget, not a dated cash forecast. For receipts, payroll dates, equipment purchases and debt principal, use the <a href="/calculators/cash-flow-forecast-template/">13-week cash flow forecast</a>. For the order volume needed to fund your entered monthly commitments, use the <a href="/calculators/restaurant-break-even-calculator/">restaurant break-even calculator</a>.</p>';
  const sectionLinks = [
    ['budget-download', 'Download Excel budget'],
    ['how-to-budget-a-restaurant', 'Build the monthly plan'],
    ['budget-workbook-example', 'Read the workbook example'],
    ['budget-actual-review', 'Review the next month'],
  ];
  const html = result.html
    .replace('<h2>Restaurant budget template for Excel: read the example first</h2>', '<h2 id="budget-workbook-example">Restaurant budget template for Excel: read the example first</h2>')
    .replace('<h2>What to do after the first month</h2>', '<h2 id="budget-actual-review">What to do after the first month</h2>');
  if (!html.includes('id="budget-workbook-example"') || !html.includes('id="budget-actual-review"')) throw new Error('Restaurant budget navigation anchors changed');
  return { ...result, answerHtml, sectionLinks, html, modified: '2026-10-16' };
}
