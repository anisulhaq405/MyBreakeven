const description = 'Calculate contribution margin per unit with variable costs and selling fees. Check the ratio, worked examples and costs that belong in your monthly plan.';

export function applyContributionCalculatorReview(post) {
  if (post.slug !== 'calculate-contribution-margin') return post;
  const contentStart = post.html.indexOf('<h2>The direct answer</h2>');
  const retained = contentStart >= 0 ? post.html.slice(contentStart) : post.html;
  return {
    ...post,
    title: 'Contribution Margin per Unit Calculator and Guide',
    seoTitle: 'Contribution Margin per Unit Calculator',
    description,
    metaDescription: description,
    opening: 'Contribution margin per unit is selling price minus variable costs for that same unit. Use the calculator to include selling fees once, then follow the examples below.',
    primaryKeyword: 'contribution margin per unit calculator',
    modified: '2026-10-13',
    html: `<h2 id="contribution-cost-boundaries">Per-unit formula and cost boundaries</h2>
<p><strong>Contribution per unit = selling price − other variable costs − (selling price × percentage fee ÷ 100) − fixed transaction fee per unit.</strong> Contribution margin percentage = contribution per unit ÷ selling price × 100. Price must be positive for this percentage. Fixed overhead is deducted later when you evaluate the monthly operating result.</p>
<p>Choose one consistent unit: a product, an order or a completed job. If an order contains several products, do not subtract a whole order's transaction fee from each product. Allocate the fee or calculate the complete order. Use retained selling revenue after discounts and match every cost to that same sale.</p>
<p>Include materials, shipping and labour that changes with that sale. A guaranteed salary may remain fixed over your planning range; extra paid worker hours for a job may be variable. Check the actual arrangement. The calculator's other-cost field excludes the two separate fee fields. A processor's monthly subscription belongs in fixed overhead, not the fixed transaction fee.</p>
<h3>Checked fictional example with both fee types</h3>
<p>A $50 order has $25 of other variable costs, a 3% selling fee and a $0.30 transaction fee. The percentage fee is $1.50. Total variable cost is $25 + $1.50 + $0.30 = <strong>$26.80</strong>; contribution is $50 − $26.80 = <strong>$23.20 per order</strong>; its contribution ratio is $23.20 ÷ $50 × 100 = <strong>46.4%</strong>. These are illustrative inputs, not suggested fee rates.</p>
<p>This differs from the Product A example below, whose specified costs do not include a $0.30 fixed fee. Keep each example's cost boundary intact. When taking this widget's example into the larger ecommerce planner, include the $0.30 once in other variable costs and keep the 3% fee in its percentage field.</p>
<h3>Read zero and negative contribution correctly</h3>
<p>Zero contribution means the sale pays its entered variable costs and leaves nothing for fixed costs. Negative contribution means it loses money before fixed costs; more identical sales increase that loss. A positive contribution is still not net profit. To assess monthly viability, add sales volume, fixed commitments and capacity in the <a href="/calculators/ecommerce-break-even-calculator/">ecommerce break-even planner</a> or <a href="/#calculator">select your service-business model</a>.</p>
${retained}`,
  };
}
