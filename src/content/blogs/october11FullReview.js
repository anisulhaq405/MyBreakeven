// Correct misleading link labels/destinations and published draft wording.
const links = {
  'how-much-does-it-cost-to-start-a-cleaning-business': [
    ['post about pricing a cleaning service', 'how-much-to-charge-for-house-cleaning', 'house-cleaning pricing guide'],
    ['post about getting clients for a cleaning business', 'how-many-cleaning-clients-5000', 'cleaning client-count and lead-demand example'],
  ],
  'how-much-does-it-cost-to-open-a-salon': [
    ['post about salon service pricing', 'salon-service-pricing', 'salon service pricing examples'],
    ['post about salon staffing models', 'salon-clients-per-day-break-even', 'salon appointment and staffing-capacity guide'],
    ['post about salon break-even capacity', 'salon-break-even', 'salon break-even and capacity guide'],
  ],
  'how-much-does-it-cost-to-start-a-marketing-agency': [
    ['post about paying yourself in a marketing agency', 'agency-profit-margin', 'agency profit and owner-pay guide'],
    ['post about agency cash flow and payment terms', 'cash-flow-forecast-vs-break-even', 'cash-flow forecasting and payment timing'],
  ],
  'how-much-to-charge-for-house-cleaning': [
    ['post about cleaning business startup costs', 'how-much-does-it-cost-to-start-a-cleaning-business', 'cleaning business startup costs'],
    ['post about cleaning business profit margins', 'is-a-cleaning-business-profitable', 'cleaning business profit calculations'],
  ],
  'lawn-care-pricing-per-acre': [
    ['post about landscaping business startup costs', 'how-much-does-it-cost-to-start-a-landscaping-business', 'landscaping startup costs'],
    ['post about landscaping business profit margin', 'landscaping-business-profit-margin', 'landscaping profit margin'],
    ['post about how many lawns you need to make $100,000', 'how-many-lawns-100k', 'lawn volume needed for $100,000 revenue'],
  ],
  'photography-pricing-packages': [
    ['photography business profit margins', 'photography-business-profit-margin', 'photography business profit margins'],
    ['photography business startup costs', 'how-much-does-it-cost-to-start-a-photography-business', 'photography business startup costs'],
    ['how many photography clients you need per month', 'how-many-photography-clients-month', 'how many photography clients you need per month'],
  ],
  'agency-retainer-pricing': [
    ['post about agency utilization', 'agency-billable-utilization-rate', 'agency utilization guide'],
    ['post about agency profit margins', 'agency-profit-margin', 'agency profit margin guide'],
    ['post about billable hours in an agency', 'agency-client-profitability', 'agency client delivery-cost example'],
  ],
};
const scenarioPosts = new Set(['contribution-margin-vs-gross-margin', 'how-many-lawns-100k', 'how-much-to-charge-for-house-cleaning', 'lawn-care-pricing-per-acre', 'photography-pricing-packages', 'salon-service-pricing', 'agency-retainer-pricing']);
function required(html, before, after) {
  if (!html.includes(before)) throw new Error('Full review insertion missing: ' + before);
  return html.replace(before, after);
}
export function applyOctober11FullReview(post) {
  if (!post.html) return post;
  let html = post.html;
  for (const [label, slug, text] of links[post.slug] || []) {
    const anchor = [...html.matchAll(/<a href="[^"]*">([^<]*)<\/a>/g)].find(match => match[1] === label);
    if (!anchor) throw new Error('Full review anchor missing: ' + label);
    html = html.replace(anchor[0], `<a href="/blogs/${slug}/">${text}</a>`);
  }
  if (post.slug === 'how-much-does-it-cost-to-start-a-cleaning-business') html = required(html, 'See <a href="https://mybreakeven.com/blogs/how-much-to-charge-for-house-cleaning/">post about cleaning business insurance costs</a> when separating launch protection from monthly premiums.', 'Separate one-time setup and deposits from recurring insurance premiums. Obtain actual policy quotes for your location, services and staffing arrangements; a pricing example does not establish insurance costs.');
  if (post.slug === 'how-much-does-it-cost-to-open-a-salon') {
    html = required(html, 'Future resources could include', 'Compare');
    html = required(html, 'A future resource could be', 'Compare your required appointments with productive stylist hours using the');
  }
  if (post.slug === 'agency-retainer-pricing') {
    html = required(html, 'can be added when that article is published', 'explains how to measure productive delivery hours');
    html = required(html, ' when available.', '.');
  }
  if (post.slug === 'subscription-box-churn-break-even') html = required(html, 'This draft does not make that claim.', 'This example does not establish an industry benchmark.');
  if (scenarioPosts.has(post.slug)) html = required(html, '<h2>2–3 realistic worked scenarios</h2>', '<h2>Worked pricing and operating scenarios</h2>');
  if (post.slug === 'margin-vs-markup') html = required(html, 'Worked examples: Margin vs Markup: Key Difference Money', 'Worked examples: converting margin and markup');
  if (['how-much-does-it-cost-to-start-a-cleaning-business', 'how-much-does-it-cost-to-open-a-salon', 'how-much-does-it-cost-to-start-a-marketing-agency'].includes(post.slug)) {
    let tableCount = 0;
    html = html.replace(/<p>(\|[\s\S]*?)<\/p>/g, (paragraph, raw) => {
      if (!/\|\s*:?-{3}/.test(raw)) return paragraph;
      const rows = [...raw.matchAll(/\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/g)].map(match => [match[1], match[2]]);
      if (rows.length < 3 || !/^:?-+:?$/.test(rows[1][0]) || !/^:?-+:?$/.test(rows[1][1])) throw new Error('Invalid budget table: ' + post.slug);
      tableCount += 1;
      return `<div class="article-table-scroll"><table><caption>Illustrative ${/monthly/i.test(rows[0].join(" ")) ? "monthly" : "startup"} budget (USD)</caption><thead><tr>${rows[0].map(cell => `<th scope="col">${cell}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row => `<tr><th scope="row">${row[0]}</th><td>${row[1]}</td></tr>`).join('')}</tbody></table></div>`;
    });
    const expected = post.slug === 'how-much-does-it-cost-to-open-a-salon' ? 1 : 2;
    if (tableCount !== expected) throw new Error('Missing budget table: ' + post.slug);
  }
  return html === post.html ? post : { ...post, ...(post.slug === "margin-vs-markup" ? { title: "Margin vs Markup: Formula, Difference & Examples" } : {}), html, modified: '2026-10-11' };
}
