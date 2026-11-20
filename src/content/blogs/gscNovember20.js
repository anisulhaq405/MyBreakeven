// Targeted improvements to existing owners, informed by the November 20 GSC export.
// Keep publication dates, slugs, images, worked bodies and FAQ ownership intact.
const link=(href,label)=>`<a href="${href}">${label}</a>`;
const table=(caption,headers,rows)=>`<div class="article-table-scroll" role="region" aria-label="${caption}" tabindex="0"><table><caption>${caption}</caption><thead><tr>${headers.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i===0?`<th scope="row">${x}</th>`:`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const gscReviews={
 'target-profit-sales-formula':{
  seoTitle:'Target Profit Formula: Sales & Units Example',
  description:'Calculate target profit sales and required units. Follow a checked 70-job example, include owner pay once, and test whether your working hours can deliver.',
  answer:'Required units = (fixed costs + target operating profit) ÷ contribution per unit. In this fictional USD case, ($7,500 + $3,000) ÷ ($240 − $90) = 70 jobs, producing $16,800 sales. Contribution is $10,500; subtract $7,500 fixed costs to confirm $3,000 operating profit. Planned base owner pay is already in those fixed costs.',
  context:'Start by naming the result: zero operating profit, owner-covered sales, or an additional operating profit target. They can produce different job counts from the same selling price. Write the target period and the costs included before changing any input.',
  next:`If you need the amount left by each job first, calculate ${link('/blogs/calculate-contribution-margin/','contribution margin')}. Then compare the job target with ${link('/calculators/employee-cost-calculator/','productive employee hours')} and put customer receipts and payroll dates into a ${link('/calculators/cash-flow-forecast-template/','dated cash forecast')}. A profitable target does not establish that every payment date is funded.`
 },
 'lower-break-even-point':{
  description:'Compare four ways to lower break-even: fixed costs, variable costs, net price and sales mix. Check the job targets, trade-offs and cash impact of each change.',
  answer:'Lower break-even by reducing fixed commitments or increasing contribution per sale through lower variable cost, a higher net price or a stronger sales mix. In the fictional baseline, $6,000 ÷ ($150 − $50) = 60 jobs. Removing $1,000 of fixed cost reduces that threshold to 50 jobs. More sales alone do not lower an unchanged threshold.',
  context:'Compare one documented change at a time before combining savings. For each option, record the contribution after fees, the fixed commitments actually removed, the whole-job requirement and the earliest month the change can take effect. The smallest threshold is useful only if demand and delivery remain feasible.',
  next:`Before a promotion, test the ${link('/calculators/discount-break-even-calculator/','extra sales needed after a discount')}. For a higher price, check ${link('/calculators/price-increase-calculator/','how many sales the business can lose')}. Use ${link('/blogs/capacity-planning/','capacity planning')} to verify the work required by the chosen option rather than assuming the lower target guarantees customers.`
 },
 'contribution-margin-vs-profit-margin':{
  description:'Compare contribution, operating and net profit margins using one reconciled example. See which costs each measure includes and the pricing question it answers.',
  answer:'Contribution margin is sales less variable costs; operating profit also deducts fixed operating expenses. Net profit includes the additional items in its stated definition. In the fictional USD month, $20,000 sales less $12,000 variable cost leaves $8,000 contribution (40%). After $5,000 fixed operating expenses, operating profit is $3,000 (15%). Assumed $400 interest and $600 tax leave $2,000 net profit (10%).',
  context:'Name the margin before comparing percentages. A contribution result asks what sales leave to fund operating commitments. An operating result asks what remains after operating expenses. A net result uses the business’s full net-income boundary; none of these percentages is a bank balance.',
  comparison:table('Choose the margin that answers the decision',['Measure','Costs deducted from sales','Useful question'],[
   ['Contribution margin','Variable costs under the stated behavior classification','What does an additional comparable sale contribute?'],
   ['Operating profit margin','All included operating expenses','Does this period cover operating overhead?'],
   ['Net profit margin','Operating and applicable nonoperating costs, interest and tax','What reported net result remains?']]),
  next:`For the operating subtotal, use the ${link('/calculators/operating-profit-margin-calculator/','operating profit margin calculator')}. For stock costs, reconcile ${link('/blogs/how-to-calculate-cost-of-goods-sold/','cost of goods sold')}; for a proposed hire, test ${link('/calculators/employee-cost-calculator/','employer cost and productive hours')}. Keep the employee cost in one classification so the same payroll does not get deducted twice.`
 },
 'retail-break-even-analysis':{
  seoTitle:'Retail Break-Even Analysis: Sales Example',
  description:'Calculate retail break-even sales and receipts from basket contribution. Check the 354-receipt example, discounts, store traffic, staffing and stock cash.',
  answer:'Retail break-even receipts = monthly commitments ÷ contribution per customer receipt. In this fictional USD example, a $40 receipt leaves $19.80 after the stated sale-related costs. Covering $4,200 overhead plus $2,800 owner pay requires 354 whole receipts and $14,160 collected sales. At 353 receipts the plan is $10.60 short; at 354 it has $9.20 left before any other excluded items.',
  context:'Define one receipt as one completed customer purchase, not an item, visitor or inquiry. Use an observed basket mix and a consistent treatment of discounts, returns and fees. Changing the basket or channel changes its contribution, so the original receipt threshold must be recalculated.',
  next:`Use ${link('/blogs/margin-vs-markup/','margin versus markup')} when checking the selling price of a stocked product. Test the ${link('/calculators/discount-break-even-calculator/','volume required by a promotion')} before applying a discount, and keep stock purchases and supplier dates in the ${link('/calculators/cash-flow-forecast-template/','cash forecast')}. The profit threshold does not finance the next inventory order by itself.`
 },
 'break-even-analysis-example':{
  seoTitle:'Break-Even Analysis Example: 500 Units',
  description:'Follow a break-even analysis example with full workings: $12,000 fixed cost, $24 contribution and 500 units. Check sales, profit and the editable worksheet.',
  answer:'At a $40 selling price and $16 variable cost, each unit contributes $24. With $12,000 monthly fixed costs, break-even is $12,000 ÷ $24 = 500 units, or $20,000 sales. Check: $20,000 revenue − $8,000 variable costs − $12,000 fixed costs = $0 operating profit. These are fictional USD inputs; other commitments must be included once if you want the target to fund them.',
  context:'Follow the arithmetic in this order: define one selling unit, identify matching fixed and variable costs, calculate contribution, and divide fixed costs by contribution. Reconcile the result back to revenue less costs. The example is a reproducible method, not a typical price or cost benchmark.',
  next:`If zero profit is not enough, use the separate ${link('/blogs/target-profit-sales-formula/','target profit sales formula')}. For time-based services, use the ${link('/calculators/hourly-rate-calculator/','hourly rate calculator')} to check sellable hours. A business still spending its opening cash should also check ${link('/calculators/cash-runway-calculator/','cash runway')}; an operating threshold is different from a cash-survival date.`
 },
 'margin-of-safety-business':{
  seoTitle:'Margin of Safety Formula: Units & Sales',
  description:'Calculate margin of safety in units, sales and percent. Check a $6,000 cushion and 33.33% example, then distinguish forecast risk from profit and cash.',
  answer:'Margin of safety = actual or forecast sales − break-even sales. Divide that cushion by the same actual or forecast sales to get the percentage. In the fictional USD case, $18,000 forecast sales − $12,000 break-even sales = $6,000, or 33.33% of forecast sales. In comparable units, 120 forecast appointments − 80 break-even appointments = 40 appointments. The cushion is not $6,000 profit or spendable cash.',
  context:'Choose either completed-period actuals or a clearly labeled forecast, then use that basis throughout the comparison. A forecast cushion can disappear when the sales mix changes or new fixed commitments begin. Recalculate break-even after those changes rather than keeping the old threshold beside new sales.',
  next:`If prices change, recompute the cushion after the ${link('/calculators/discount-break-even-calculator/','discount contribution check')}. Use ${link('/blogs/operating-leverage-small-business/','operating leverage')} for profit sensitivity within a stable cost range, and ${link('/calculators/cash-runway-calculator/','cash runway')} for cash depletion. Neither measure replaces a dated payment forecast.`
 },
 'fixed-vs-variable-costs':{
  description:'Compare fixed and variable costs in total and per unit. Use clear examples, identify mixed and step costs, and calculate contribution without double counting.',
  answer:'Fixed costs stay constant in total within a stated period and operating range; variable costs change with activity. At $3,000 fixed cost and $8 variable cost per unit, 500 units cost $7,000 in total: $3,000 + 500 × $8. Average total cost is $14 per unit, but variable cost remains $8. The fictional example assumes no new capacity step or changing unit rate.',
  context:'Classify the actual arrangement, not the account name. A guaranteed wage can be a fixed commitment, while an additional paid hour can vary with delivery. State the period, relevant activity range and contract terms before deciding what an extra sale costs.',
  next:`For a mixed-cost estimate, see the ${link('/blogs/high-low-method/','high-low method and its limits')}. Keep ${link('/blogs/average-cost-per-unit/','average cost per unit')} separate from variable cost. A service business can connect the classification to ${link('/calculators/hourly-rate-calculator/','sellable-hour pricing')} and ${link('/calculators/employee-cost-calculator/','the cost of an employee')} without adding the same wages to two cost buckets.`
 },
 'operating-leverage-small-business':{
  seoTitle:'Operating Leverage Formula: DOL Example',
  description:'Calculate operating leverage as contribution divided by operating profit. Check a DOL of 6, a 10% volume change and the limits near break-even.',
  answer:'Degree of operating leverage (DOL) = contribution ÷ operating profit at the stated sales volume. In the fictional service case, $14,400 contribution ÷ $2,400 operating profit = 6. With unchanged price, variable cost and fixed commitments, 10% more jobs raises profit by 60%, from $2,400 to $3,840. DOL is undefined at zero operating profit and changes when the starting volume changes.',
  context:'Read DOL beside the starting volume and the costs that can remain stable. It is a sensitivity ratio at that operating point, not a permanent multiplier for revenue growth. Compare the actual contribution and profit dollars when the business is near or below break-even.',
  next:`Use ${link('/blogs/margin-of-safety-business/','margin of safety')} to measure the sales cushion, then check ${link('/blogs/capacity-planning/','the delivery constraint')}. Before assuming a salaried hire will unlock more work, compare ${link('/calculators/employee-cost-calculator/','employee cost and productive capacity')}. A new fixed commitment changes both break-even and the original leverage ratio.`
 },
 'restaurant-budgeting':{
  description:'Download an editable restaurant budget template for Excel. Build a monthly sales and expense plan, compare actuals, and connect annual and cash forecasts.',
  answer:'A restaurant operating budget starts with completed orders or covers × a matching average check, then deducts food cost, loaded labor and the other expenses included in the plan. Use the monthly Excel template below for budget-versus-actual review. An annual budget adds seasonal monthly plans; a cash forecast places receipts and payments on their actual dates. These are related schedules, not interchangeable templates.',
  context:'Choose the planning question before opening a template. Keep original budget, revised forecast and completed-period actuals in separate labeled columns. A change in planned sales should update the relevant volume-driven costs while fixed commitments follow their own schedule.',
  comparison:table('Choose the restaurant planning schedule',['Question','Use','Keep separate'],[
   ['What should this month earn?','Monthly operating budget and actual comparison','Inventory purchases versus food consumed'],
   ['How does seasonality change the year?','Twelve-month operating budget','A repeated average month versus supported seasonal inputs'],
   ['Can each payment date be funded?','Dated cash forecast','Profit, customer collection dates and debt principal']]),
  next:`Reconcile food consumed with the ${link('/calculators/food-cost-calculator/','food cost percentage calculator')}. Cost a particular dish using ${link('/calculators/recipe-cost-calculator/','recipe costing')}, then test ${link('/calculators/menu-pricing-calculator/','menu price contribution')}. Put supplier, payroll and collection dates into the ${link('/calculators/cash-flow-forecast-template/','cash forecast')} instead of assuming a positive operating budget funds every week.`
 },
 'how-to-calculate-working-capital':{
  seoTitle:'Working Capital Formula: Example & Excel',
  description:'Calculate working capital as current assets minus current liabilities. Check the $24,000 example, operating capital differences and the free Excel worksheet.',
  answer:'Working capital = current assets − current liabilities at the same reporting date. The fictional balance sheet below has $62,000 current assets and $38,000 current liabilities, giving $24,000 working capital. Only $8,000 of the assets is cash. Operating working capital and days working capital use different account and period definitions; do not substitute either for this balance-sheet subtraction.',
  context:'Reconcile the current accounts first, then inspect their timing and quality. Receivables that are overdue and stock that cannot be sold promptly can leave the balance-sheet total unchanged while weakening the cash available for wages and suppliers. The calculation does not authorize spending the reported cushion.',
  comparison:table('Choose the working-capital calculation',['Term','Definition to establish','Avoid'],[
   ['Net working capital','Current assets minus current liabilities','Using all assets and all liabilities'],
   ['Operating working capital','Specified operating current assets minus specified operating current liabilities','Silently including cash or financing debt in an operating-only definition'],
   ['Days working capital','Defined average working capital divided by matching-period revenue, multiplied by days','Mixing a closing snapshot with an unexplained annual denominator'],
   ['Total operating capital','Definition can include long-term operating assets','Treating it as a synonym for current working capital']]),
  next:`Use ${link('/calculators/financial-ratios-calculator/','financial ratios')} for a consistently defined current or quick ratio, and the ${link('/calculators/cash-flow-forecast-template/','13-week cash forecast')} for dated funding needs. Review ${link('/blogs/cash-flow-analysis/','cash-flow analysis')} when reconciling movements; a change in a balance-sheet working-capital total is not automatically the operating cash-flow adjustment.`
 },
 'how-to-calculate-cost-of-goods-sold':{
  seoTitle:'Cost of Goods Sold Formula: Worked Example',
  description:'Calculate COGS from opening inventory, net additions and closing stock. Check a $30,000 example, supplier credits, freight, losses and the gross-profit bridge.',
  answer:'For the simplified periodic reseller case, COGS = beginning inventory + net inventory additions − ending inventory. Here, $12,000 + $29,000 − $11,000 = $30,000 COGS. Net additions already include the stated purchase credits and inbound freight. Separate losses or other inventory movements need their own reconciliation, and stock must be valued at cost under a consistent method.',
  context:'Start with stock ownership, the period cutoff and a consistent inventory-cost policy. Reconcile opening stock to the prior closing record and counted ending stock to the ledger. Cash paid to suppliers and selling prices are not substitutes for those cost records.',
  next:`Check the ${link('/blogs/inventory-valuation-methods/','inventory valuation method')} before comparing periods. Reconcile returns against ${link('/blogs/net-revenue/','net revenue')} and the ${link('/calculators/ecommerce-return-cost-calculator/','order-level return allowance')}. A customer refund reverses revenue, while a resellable return may also restore inventory; record the two effects once in the correct period.`
 }
};
export const gscReviewedSlugs=new Set(Object.keys(gscReviews));
const originals=new Map();
const plain=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replace(/\s+/g,' ').trim();
export function applyGscReview(post){
 const u=gscReviews[post.slug];if(!u)return post;
 const id='gsc-next-'+post.slug;
 if(post.html.includes(`id="${id}"`))return post;
 originals.set(post.slug,post);
 let html=post.html;
 const first=html.match(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/);
 if(first&&post.opening&&plain(first[0])===plain(post.opening))html=html.replace(first[0],`<p>${u.context}</p>`);
 const answer=post.answerHtml ? post.answerHtml.replace(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/,match=>`<p>${u.answer}</p>`+(post.slug==='restaurant-budgeting'?match:'')) : `<h2 id="gsc-answer-${post.slug}">Quick answer</h2><p>${u.answer}</p>`;
 return {...post,seoTitle:u.seoTitle||post.seoTitle,description:u.description,metaDescription:u.description,opening:u.answer,answerHtml:answer+(u.comparison||''),html:html+`<h2 id="${id}">Apply this result to the next decision</h2><p>${u.next}</p>`,modified:'2026-11-20',...(post.sectionLinks?{sectionLinks:[...post.sectionLinks,[id,'Choose the next calculation']]}:{})};
}
// Historical contracts reconstruct their exact publication boundary. Current-state
// preservation and every authorized field change are independently checked by this release.
export const restoreGscReview=post=>originals.get(post.slug)||post;
