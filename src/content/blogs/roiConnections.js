// Each link follows a decision already explained by the source guide.
const roi = '/calculators/business-roi-calculator/';
export const roiGuideConnections = {
  'cash-flow-break-even-vs-profit-break-even': ['Separate project return from operating break-even', 'Operating break-even does not show whether a new investment recovers its setup and running payments. Compare incremental cash benefits, total costs and the recovery timeline in the', 'business ROI and payback calculator'],
  'cash-flow-forecast-vs-break-even': ['Check a project before scheduling its cash', 'Before adding a new equipment or software purchase to the weekly forecast, compare its setup cost, recurring payments and expected incremental cash benefits using the', 'business investment ROI calculator'],
  'agency-employee-vs-freelancer-break-even': ['Test automation alongside the staffing decision', 'If automation is an alternative to hiring or outsourcing, count human review and rework. Saved salaried time is capacity unless paid hours actually change. Test those separate assumptions with the', 'AI automation ROI and payback calculator'],
  'agency-billable-utilization-rate': ['Keep released capacity separate from cash savings', 'An AI workflow may release delivery hours without reducing payroll or creating extra client demand. Separate paid-hours changes from additional work you can realistically sell in the', 'AI automation ROI calculator'],
  'how-to-calculate-working-capital': ['Check the investment and its funding need separately', 'Working capital is a balance-sheet measure, not the return on a proposed project. Use incremental receipts and avoidable payments in the', 'business ROI calculator with monthly cash recovery'],
};
export function connectRoiGuide(post) {
  const entry = roiGuideConnections[post.slug];
  if (!entry || !post.html || post.html.includes(`href="${roi}"`)) return post;
  const [heading, context, label] = entry;
  const section = `<h2 id="project-roi-next-step">${heading}</h2><p>${context} <a href="${roi}">${label}</a>. Opening the calculator does not transfer this guide’s figures; enter your own consistent assumptions.</p>`;
  // Keep the source guide's answer intact; put the contextual next step before its FAQ.
  const faq = post.html.search(/<h2\b[^>]*id="faqs"/);
  return {...post, modified:'2026-10-18', html:faq < 0 ? post.html + section : post.html.slice(0,faq) + section + post.html.slice(faq)};
}
