// Scoped October 26, 2026 GSC growth pass for the existing working-capital URL.
// Direct query-intent routing: no new competing pages and no changes to frozen Day 2.
const slug='how-to-calculate-working-capital';
const section=`
<section aria-labelledby="working-capital-formula-selector">
<h2 id="working-capital-formula-selector">Which working capital formula do you need?</h2>
<p><strong>To calculate working capital from a balance sheet, subtract current liabilities from current assets.</strong> In our fictional example, $62,000 − $38,000 = <strong>$24,000 of net working capital</strong> at one reporting date. This does not mean $24,000 of immediately spendable cash. Some searches say “current capital”; check whether they mean this current-assets/current-liabilities measure or a differently defined total capital figure.</p>
<div class="article-table-scroll article-records-table" role="region" tabindex="0" aria-label="Comparison of working capital formulas"><table class="article-records-table"><caption>Working-capital terms, formulas and matching examples (illustrative USD)</caption><thead><tr><th scope="col">Question</th><th scope="col">Formula / basis</th><th scope="col">Where to continue</th></tr></thead><tbody>
<tr><th scope="row">How much working capital?</th><td>Current assets − current liabilities = $62,000 − $38,000 = $24,000</td><td><a href="#worked-balance-sheet">Balance-sheet walkthrough</a></td></tr>
<tr><th scope="row">What is the working capital ratio?</th><td>Current assets ÷ current liabilities = $62,000 ÷ $38,000 = 1.63×</td><td><a href="#ratios">Current and quick ratios</a></td></tr>
<tr><th scope="row">How to calculate operating working capital?</th><td>Selected operating current assets − selected operating current liabilities = $30,000 in this defined example</td><td><a href="#operating-definition">Operating and trade account bridge</a></td></tr>
<tr><th scope="row">What is the days of working capital equation?</th><td>Average working capital ÷ same-period net revenue × days = $22,000 ÷ $440,000 × 365 = 18.25 days</td><td><a href="#days-working-capital-formula">Days formula, definition and limits</a></td></tr>
</tbody></table></div>
<p><strong>Scope matters:</strong> operating working capital can exclude cash and financing debt, while “total operating capital” may include long-term operating assets and is not interchangeable with this current-account calculation. Days of working capital can use different denominators in published methods; the days example here explicitly uses average working capital and matching annual net revenue. Keep numerator, account definitions and reporting dates consistent. <a href="/guides/financial-ratios/">Compare liquidity-ratio definitions</a>, or <a href="/blogs/how-to-analyze-financial-statements/">read the three-statement walkthrough</a>. These are references to existing guides, not replacements for the Excel worksheet below.</p>
<p>For external definition comparisons, see <a href="https://stripe.com/resources/more/working-capital-formulas">Stripe's working-capital formula guide</a> and <a href="https://www.xero.com/us/guides/working-capital/">Xero's small-business working-capital explanation</a>.</p>
</section>`;
export function applyWorkingCapitalGscGrowth(post){
 if(post.slug!==slug)return post;
 if(!post.html?.includes('id="worked-balance-sheet"')||!post.html.includes('id="days-working-capital-formula"'))throw Error('Working capital review source boundaries changed');
 if(post.html.includes('id="working-capital-formula-selector"'))throw Error('Duplicate working capital formula selector');
 return {...post,
  modified:'2026-10-26',
  metaDescription:'Calculate working capital from current assets and liabilities. Compare operating working capital, current ratio and days working capital with examples and Excel.',
  html:section+post.html,
  sectionLinks:post.sectionLinks?[['working-capital-formula-selector','Choose the right formula'],...post.sectionLinks]:post.sectionLinks,
 };
}
