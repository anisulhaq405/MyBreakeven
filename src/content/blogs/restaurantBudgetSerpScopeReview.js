// GSC Oct 27: improve answer-to-download navigation on the EXISTING restaurant-budgeting URL.
// Do not imply that the one-month spreadsheet is a 12-month model.
const scope = `<p><strong>New:</strong> <a href="/downloads/restaurant-12-month-budget-template.xlsx" download>Download the free editable 12-month restaurant budget workbook (Excel)</a>. It provides monthly budget inputs, actual-vs-budget columns, an annual dashboard and an operating break-even estimate. The original one-month template remains available below.</p>`;
const originalScope = `<div class="article-table-scroll" role="region" tabindex="0" aria-label="Restaurant budgeting resources by purpose"><table><caption>Choose the restaurant budgeting resource for your task</caption><thead><tr><th scope="col">Your planning question</th><th scope="col">Use this existing resource</th><th scope="col">Scope</th></tr></thead><tbody><tr><th scope="row">I need an editable restaurant budget template</th><td><a href="/downloads/restaurant-monthly-budget-template.xlsx">Download the monthly Excel workbook</a></td><td>One monthly budget versus actual; editable inputs and calculated differences, not a 12-month forecast</td></tr><tr><th scope="row">I need an annual budget example</th><td><a href="#annual-restaurant-budget">View the 12-month illustrative calculation</a></td><td>Worked example on this page; not a separate editable 12-month file</td></tr><tr><th scope="row">I need payment-date cash planning</th><td><a href="/calculators/cash-flow-forecast-template/">Use the 13-week cash-flow calculator</a></td><td>Separate dated receipts and payments, not operating profit</td></tr></tbody></table></div>`;
export function applyRestaurantBudgetSerpScopeReview(post) {
 if(post.slug!=='restaurant-budgeting')return post;

 if(typeof post.html!=='string'||!post.html.includes('id="restaurant-budget-diagnosis"'))throw new Error('Restaurant budget body boundary changed');
 if(post.html.includes('Choose the restaurant budgeting resource for your task'))throw new Error('Restaurant budgeting scope table already present');
 if(!post.html.includes('id="annual-restaurant-budget"'))throw new Error('Annual example anchor missing');
 return {...post,modified:'2026-10-27',html:scope+originalScope+post.html};
}
