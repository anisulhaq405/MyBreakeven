// 2026-10-26: narrowly scoped GSC recovery for one established canonical URL.
// Preserve the article's existing original calculations, sections, FAQ, links and cover.
const slug = 'restaurant-food-cost-percentage';
const quickComparison = `
<section class="food-cost-recovery-summary" aria-labelledby="food-cost-comparison-heading">
<h2 id="food-cost-comparison-heading">Food cost percentage formula: actual vs ideal food cost</h2>
<p><strong>Actual food cost percentage = (beginning food inventory + net food purchases − ending food inventory) ÷ food-only sales × 100.</strong> Use a matched inventory and sales period. A restaurant's <strong>ideal (theoretical) food cost</strong> instead uses the recipes for the dishes actually sold, at the ingredient prices and portions assumed by those recipes. Both ratios use the same food-sales denominator when comparing the same period and sold mix.</p>
<div class="article-table-scroll article-records-table" role="region" aria-label="Actual versus ideal restaurant food cost comparison" tabindex="0"><table class="article-records-table"><caption>Fictional restaurant example: same $60,000 food sales period</caption><thead><tr><th scope="col">Measure</th><th scope="col">Calculation</th><th scope="col">Result</th></tr></thead><tbody>
<tr><th scope="row">Actual food used</th><td>$8,000 opening + $18,000 purchases − $6,000 closing</td><td>$20,000</td></tr>
<tr><th scope="row">Actual food cost percentage</th><td>$20,000 ÷ $60,000 × 100</td><td>33.33%</td></tr>
<tr><th scope="row">Ideal food cost percentage</th><td>$18,200 recipe-standard cost of food sold ÷ $60,000 × 100</td><td>30.33%</td></tr>
<tr><th scope="row">Variance to investigate</th><td>$20,000 − $18,200; 33.33% − 30.33%</td><td>$1,800; 3.00 percentage points</td></tr>
</tbody></table></div>
<p>The difference is <strong>not automatically waste or theft</strong>: check counts, purchase credits, recipe yields, staff meals, promotions, menu mix and ingredient-price changes before assigning a cause. This comparison is not a recommended food-cost benchmark. <a href="/calculators/food-cost-calculator/">Calculate actual food cost from inventory</a>, or <a href="/calculators/recipe-cost-calculator/">calculate ideal cost by ingredient and usable yield</a>. For an external method comparison, see <a href="https://www.usfoods.com/tools-tips-and-ideas/articles-and-publications/articles/track-your-food-cost-percentage-to-drive-revenue">US Foods' actual-versus-ideal food cost explanation</a>.</p>
</section><section class="food-cost-recovery-reconciliation" aria-labelledby="food-cost-reconciliation-heading">
<h2 id="food-cost-reconciliation-heading">Reconcile the food-cost variance before changing menu prices</h2>
<p>The fictional example above has $1,800 more actual ingredient use than recipe-standard cost. This is a <strong>variance to explain</strong>, not proof that $1,800 was wasted. Compare like-for-like food sales, count dates, transfers, invoice credits and dish quantities before concluding what caused the gap.</p>
<div class="article-table-scroll" role="region" tabindex="0" aria-label="Food cost variance investigation checklist"><table><caption>Worked diagnostic: allocate the $1,800 gap only after records support each amount</caption><thead><tr><th scope="col">Check</th><th scope="col">Record to compare</th><th scope="col">Action</th></tr></thead><tbody>
<tr><th scope="row">Inventory timing and adjustments</th><td>Opening and closing physical counts, transfers, staff meals and spoilage</td><td>Reconcile the same accounting period; explain unrecorded usage</td></tr>
<tr><th scope="row">Supplier prices and credits</th><td>Invoice unit costs, credited returns and contracted prices</td><td>Update recipe ingredient costs when prices change</td></tr>
<tr><th scope="row">Portion yields and substitutions</th><td>Recipe weights, usable yield and actual portions</td><td>Check whether standard ingredient quantities reflect service</td></tr>
<tr><th scope="row">Sales mix and promotions</th><td>POS item counts, discounts and food-only net sales</td><td>Reweight theoretical cost to the actual dishes sold</td></tr>
</tbody></table></div>
<p><strong>Reconciliation rule:</strong> actual ingredient usage minus theoretical usage equals the unexplained dollar gap until supported adjustments are recorded. Do not treat the difference as cash missing or as a prime-cost percentage. For food plus labor together, use the <a href="/blogs/restaurant-prime-cost/">restaurant prime-cost guide</a>; for monthly planning rather than inventory variance, use the <a href="/blogs/restaurant-budgeting/">restaurant budget workbook</a>.</p>
</section>`;
export function applyRestaurantFoodCostGscRecovery(post) {
  if (post.slug !== slug) return post;
  if (!post.html || !post.html.includes('The inventory formula and a complete example')) throw new Error('Restaurant food cost source no longer matches the approved baseline');
  if (post.html.includes('id="food-cost-comparison-heading"')) throw new Error('Duplicate GSC recovery insertion');
  return {
    ...post,
    metaDescription: 'Calculate restaurant food cost percentage from inventory, purchases and food sales. See a 33.33% worked example and compare actual vs ideal recipe cost.',
    modified: '2026-10-27',
    html: quickComparison + post.html,
  };
}
