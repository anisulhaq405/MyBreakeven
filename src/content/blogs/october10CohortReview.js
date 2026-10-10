// Scoped corrections from the US performance cohort review.
// Query-filtered GSC evidence is still pending; this does not rewrite titles.
export function applyOctober10CohortReview(post) {
  if (post.slug === "break-even-analysis-example") {
    const html = post.html
      .replace("before your revenue covers every cost", "before revenue covers the costs included in your model")
      .replace("</blockquote></p><p>The amount inside", "</blockquote><p>The amount inside")
      .replace("<h2>Worked examples: Break-Even Analysis Example With Full Workings</h2>", "<h2>Three worked business examples</h2>")
      .replace("<p>You sell candles for $28 each.", "<p>These USD figures are illustrative planning inputs, not observed business results or market rates.</p><p>You sell candles for $28 each.")
      .replace("<p>Before setting a price, compare this result with your capacity, travel time, and desired pay.", '<p>For a cleaning job, use the <a href="/resources/cleaning-job-cost-worksheet/">editable cleaning job-cost worksheet</a> to compare quoted and actual labor, supplies, travel and fees. It checks job contribution; keep monthly overhead and your break-even calculation alongside it.</p><p>Before setting a price, compare this result with your capacity, travel time, and desired pay.');
    return { ...post, html, modified: "2026-10-10" };
  }
  if (post.slug === "cleaning-business-monthly-expenses") {
    const addition = '<p>Keep the job records behind that monthly average. The <a href="/resources/cleaning-job-cost-worksheet/">free cleaning job-cost worksheet</a> lets you compare a quote with actual worker-hours, supplies, travel and fees. Use a consistent labor-cost basis, reconcile the jobs with payroll, and keep fixed monthly overhead separate from the worksheet\'s job contribution.</p>\n';
    const marker = '<h2>Common mistakes that hide the true cost</h2>';
    const idMarker = '<h2 id="common-mistakes-that-hide-the-true-cost">Common mistakes that hide the true cost</h2>';
    const html = post.html.includes(idMarker)
      ? post.html.replace(idMarker, addition + idMarker)
      : post.html.replace(marker, addition + marker);
    return { ...post, html, modified: "2026-10-10" };
  }
  return post;
}
