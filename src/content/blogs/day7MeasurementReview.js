// Narrow improvements after the October 24 measurement review. No new page owners.
const tracking = `<h2 id="track-cleaning-company-profit" style="scroll-margin-top:110px">Track cleaning-company profit from completed work</h2>
<p>A quote calculator tests a plan; a monthly review needs records of the work actually delivered. Keep one row per completed visit with its job ID, service type, net charge after discounts or refunds, total paid worker-hours, labor cost, supplies used, travel allocation, acquisition cost and payment fee. Link any re-clean to the original job. Add invoice and collection dates in separate fields so unpaid sales do not quietly become bank cash.</p>
<p>Close the same reporting period for sales, staff costs and overhead. Separate an estimate from an actual amount, and flag a missing supplier or payroll record rather than filling the gap with zero. A supply purchase can cover several months: the per-visit schedule needs the portion used, while the cash review needs the payment. Retain the source record behind each allocation.</p>
<div class="article-table-scroll"><table><caption>Independent fictional month: 70 completed visits, USD</caption><thead><tr><th scope="col">Management-report line</th><th scope="col">Reconciliation</th><th scope="col">Amount</th></tr></thead><tbody>
<tr><th scope="row">Net visit revenue</th><td>70 × $160</td><td>$11,200</td></tr>
<tr><th scope="row">Paid staff labor</th><td>70 × 3.4 worker-hours × $22</td><td>($5,236)</td></tr>
<tr><th scope="row">Supplies used</th><td>70 × $8</td><td>($560)</td></tr>
<tr><th scope="row">Other variable costs</th><td>70 × $10</td><td>($700)</td></tr>
<tr><th scope="row">Acquisition allocation</th><td>70 × $8</td><td>($560)</td></tr>
<tr><th scope="row">Payment fees</th><td>$11,200 × 3%</td><td>($336)</td></tr>
<tr><th scope="row">Contribution</th><td>$11,200 − $7,392</td><td>$3,808</td></tr>
<tr><th scope="row">Specified fixed operating costs</th><td>Same $2,500 scope as the base plan</td><td>($2,500)</td></tr>
<tr><th scope="row">Operating surplus before owner compensation and omitted items</th><td>$3,808 − $2,500</td><td>$1,308</td></tr>
<tr><th scope="row">Separate owner-income funding target</th><td>$1,308 − $3,000</td><td>($1,692) shortfall</td></tr>
</tbody></table></div>
<p>The labor record is the important change: each visit uses 3.4 worker-hours instead of the base plan’s three. At 70 visits, the extra 28 worker-hours cost $616. At the original three-hour assumption, those same visits would contribute $4,424; subtracting the $616 labor overrun reconciles to $3,808. The plan for 95 visits would leave $504 after its $3,000 owner-income target. The revised month is $2,196 below that result: $1,580 from 25 fewer visits at $63.20 contribution, plus $616 extra labor. This bridge isolates volume and labor under the stated unchanged assumptions; it does not prove why jobs took longer.</p>
<p>Check capacity as well as the ledger. Seventy visits at 3.4 worker-hours require 238 worker-hours, exceeding the base team’s 212.33 delivery hours by 25.67. If the records genuinely show this month’s 70 visits, document overtime, extra staffing or a different available-hours schedule and include the related costs. Do not call the original two-person schedule feasible merely because the profit table reconciles.</p>
<p>The $3,000 owner-income target is shown after operating surplus as a planning requirement. It is not automatically a payroll expense. In a sole-proprietor example, personal drawings belong in a separate owner/cash record; <a href="https://www.irs.gov/publications/p334">IRS Publication 334, Employees’ Pay</a> explains the US tax distinction between employee pay and a sole proprietor’s own withdrawals. Other entity and payroll arrangements need their own treatment. This simplified schedule excludes taxes, financing, depreciation and any unlisted owner labor or expenses, so $1,308 is not certified net income.</p>
<p>Finish the review with an action tied to the record: inspect scope changes on jobs with excess hours, correct duplicate travel allocations, investigate re-cleans, and compare recurring and one-time services separately. Use the <a href="/resources/cleaning-job-cost-worksheet/">estimate-versus-actual job worksheet</a> for individual visits and the <a href="/resources/cleaning-business-budget-template/">monthly cleaning budget</a> for the period. The <a href="/calculators/net-cash-flow-calculator/">net cash flow calculator</a> checks actual receipts and payments; a profitable month does not guarantee that every invoice was collected.</p>`;

export function applyDay7MeasurementReview(post) {
  if (post.slug !== 'is-a-cleaning-business-profitable') return post;
  const marker = 'id="track-cleaning-company-profit"';
  if (post.html.includes(marker)) return post;
  const heading = post.html.match(/<h2[^>]*>Enter the base visit in the calculator<\/h2>/)?.[0];
  if (!heading) throw new Error('Missing cleaning calculator handoff for Day 7 review');
  return {
    ...post,
    modified: '2026-10-24',
    html: post.html.replace(heading, tracking + heading),
    ...(post.sectionLinks ? {sectionLinks:[...post.sectionLinks,['track-cleaning-company-profit','Track actual monthly profit']]} : {}),
  };
}
