// Evidence: US free reports observed 2026-10-11. Keep existing intent owners and dates.
const metadata = {
  'restaurant-budgeting': {
    title: 'Restaurant Budget Template: Monthly Plan & Example',
    seoTitle: 'Restaurant Budget Template: Excel & Example',
    metaDescription: 'Download an editable restaurant budget template for Excel. Plan sales, food costs, loaded payroll and overhead, then compare budget with actual results.',
  },
  'cleaning-business-monthly-expenses': {
    seoTitle: 'Cleaning Business Expenses & Monthly Budget',
  },
  'agency-billable-utilization-rate': {
    title: 'Agency Utilization Rate: Billable Hours & Capacity',
    seoTitle: 'Agency Utilization Rate: Hours & Capacity',
  },
  'photography-pricing-packages': {
    title: 'Photography Pricing Packages: Costs, Time & Profit',
    seoTitle: 'Photography Pricing Packages: Cost & Profit',
  },
};
function replaceRequired(html, before, after) {
  if (!html.includes(before)) throw new Error('Keyword update insertion point missing: ' + before);
  return html.replace(before, after);
}
export function applyOctober11KeywordPlan(post) {
  let html = post.html;
  if (post.slug === 'restaurant-budgeting') {
    html = replaceRequired(html, '<p>', '<p>This restaurant budget template pairs an editable Excel workbook with a monthly planning example. Use it to budget sales, food costs, loaded payroll and recurring overhead, then compare actual results with your original plan.</p>\n<p>');
    html = replaceRequired(html, '<h2>Read the downloadable budget example before editing it</h2>', '<h2>Restaurant budget template for Excel: read the example first</h2>');
  }
  if (post.slug === 'restaurant-labor-cost-percentage') {
    html = replaceRequired(html, '<h2>Decide what you count as restaurant labor</h2>', '<h2>How to calculate restaurant labor cost percentage</h2>\n<p>Use loaded labor costs and sales from the same period: labor cost percentage = loaded labor expense ÷ sales × 100. Record which payroll costs you include before comparing periods. The $18,000 payroll and $60,000 sales example above gives 30%.</p>\n<h2>Decide what you count as restaurant labor</h2>');
  }
  if (post.slug === 'cleaning-business-monthly-expenses') {
    html = replaceRequired(html, '<h2>How to run your own numbers</h2>', '<h2>Download a monthly cleaning business budget template</h2>\n<p>Use the <a href="/resources/cleaning-business-budget-template/">monthly cleaning and janitorial budget template</a> to record bookings, paid payroll, direct costs, fixed overhead and owner pay in separate budget and actual columns. It also checks the required job target against productive worker-hours. The blank workbook and labelled example are different from the one-job worksheet: they reconcile a whole month.</p>\n<h2>How to run your own numbers</h2>');
  }
  if (post.slug === 'car-detailing-prices-list') {
    html = replaceRequired(html, '<h2 id="quick-answer">', '<h2>Mobile detailing price list: include the trip and setup</h2>\n<p>For mobile detailing pricing, state whether the listed service includes travel, water setup and pack-down. Count total paid worker-hours across the crew, then compare the contribution with the jobs your route can actually deliver. Keep a condition-based quote for vehicles outside the stated scope. The examples here illustrate costing; they are not a verified local market price list.</p>\n<h2 id="quick-answer">');
  }
  const changed = html !== post.html || metadata[post.slug];
  return changed ? { ...post, ...metadata[post.slug], description: metadata[post.slug]?.metaDescription || post.description, html, modified: '2026-10-11' } : post;
}
