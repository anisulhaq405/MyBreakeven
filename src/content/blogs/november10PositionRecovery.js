// Scope: existing owners with BOTH impression loss and worse average position
// in the supplied 9-Nov comparison. No inferred query-to-page assignments.
const sba = '<a href="https://www.sba.gov/counseling/plan-your-business/">SBA startup-cost planning guidance</a>';
const openstax = '<a href="https://openstax.org/books/principles-managerial-accounting/pages/3-2-calculate-a-break-even-point-in-units-and-dollars">OpenStax break-even method</a>';
const table = (caption, headings, rows) => `<div class="article-table-scroll"><table class="article-records-table"><caption>${caption}</caption><thead><tr>${headings.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th scope="row">${row[0]}</th>${row.slice(1).map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const november10Recovery = Object.freeze({
 'mobile-detailing-business-startup-cost': {
  heading:'Choose an equipment purchase only after testing job contribution',
  copy:'<p>A larger equipment budget needs a measurable operating benefit. In a separate fictional decision, buying an extractor for $1,200 instead of renting it for $20 on each eligible job avoids $20 per job before maintenance, financing and other differences. Simple purchase-cost recovery needs 60 eligible jobs: $1,200 ÷ $20. At four eligible jobs a month that is 15 months; at twelve it is five months. Those counts concern jobs that actually require the machine, not every booking.</p><p>List purchase cash, rental cost avoided, maintenance, storage and realistic utilization separately. Do not label the avoided rental fee as extra sales, or subtract the purchase price from every job. Keep this purchase-recovery estimate separate from the <a href="/blogs/mobile-detailing-break-even/">monthly detailing break-even plan</a>. A purchase can reduce job costs while leaving too little cash for fuel, supplies and the next insurance payment.</p>',
 },
 'how-much-does-it-cost-to-start-a-photography-business': {
  heading:'Budget the cash gap between a booking and final delivery',
  copy:'<p>Gear already owned can reduce new purchase cash, but a booked session is not always collected revenue. In a separate fictional booking, the agreed package is $650, a $200 deposit is collected before the session and the remaining $450 arrives after delivery. If $260 of actual cash payments fall due before that balance arrives, the booking needs $60 of temporary funding even though the full package may be profitable. This is a payment-timing illustration, not a deposit-policy recommendation.</p>'+table('Separate booking illustration, USD',['Stage','Cash movement','Cumulative booking cash'],[['Deposit collected','+200','200'],['Payments before final collection','−260','−60'],['Final balance collected','+450','390']])+'<p>The $390 is cash remaining within these selected flows, not profit after all business costs. Add your real editing, assistant, travel and other payment dates; retain separate overhead and owner-pay budgets. Use a <a href="/calculators/cash-flow-forecast-template/">dated cash forecast</a> when deposits and final payments cross months.</p>',
 },
 'break-even-analysis-example': {
  heading:'Check the result one unit below and above break-even',
  copy:table('Independent check of the existing $12,000 / $24 example',['Units sold','Contribution at $24','Less $12,000 fixed costs'],[['499','$11,976','−$24'],['500','$12,000','$0'],['501','$12,024','$24']])+'<p>This cross-check helps expose a mistaken use of revenue instead of contribution. It assumes a constant unit contribution within the relevant capacity range. For a $3,000 target operating profit, ($12,000 + $3,000) ÷ $24 gives 625 units; that is a profit target, distinct from the 500-unit break-even point. The '+openstax+' provides the fixed-cost/contribution framework. Choose the relevant <a href="/calculators/">business break-even calculator</a> and replace the example inputs.</p>',
 },
 'how-much-does-it-cost-to-start-a-landscaping-business': {
  heading:'Separate cash purchases from the value of equipment you own',
  copy:'<p>A launch budget should show what must actually be paid before customers pay you. In a separate fictional purchase list, required equipment and setup total $12,000 at quoted cash prices. Suitable equipment you already own accounts for $4,000 of that list, leaving $8,000 of new payments. Add an assumed $1,000 for immediate repairs and $3,000 for separately modeled launch cash needs: funding required is $12,000, not $16,000. Do not subtract equipment you own unless it meets the planned service and capacity requirements.</p><p>Keep the asset inventory and replacement allowance alongside this cash view. Owned equipment still needs maintenance; its historical purchase price is not a new launch payment. Conversely, a loan approval does not pay a supplier until the funds are available. Record cash due dates before accepting work that needs rented machinery or materials bought ahead of customer payment. The '+sba+' distinguishes one-time and monthly expenses; use the <a href="/calculators/cash-flow-forecast-template/">cash forecast</a> to schedule your actual collections and payments.</p>',
 },
 'how-much-does-it-cost-to-start-a-cleaning-business': {
  heading:'Add a first-contract cash bridge to the startup purchase list',
  copy:'<p>A commercial contract can require payroll before the first customer payment. In a separate fictional launch test, wages and other cash payments are $700 at the end of each of four weeks; the first $3,600 customer payment arrives after week four. The maximum gap immediately before collection is $2,800. That amount is additional funding if it is not already covered by the reserve in your startup budget.</p>'+table('First collection test, USD; no opening cash allocated',['Point in time','Cumulative payments','Customer collections','Cumulative net cash'],[['End of week 1','700','0','−700'],['End of week 2','1,400','0','−1,400'],['End of week 3','2,100','0','−2,100'],['Week 4, before collection','2,800','0','−2,800'],['After first collection','2,800','3,600','800']])+'<p>The final $800 is not proof of net profit: this short bridge excludes other opening and overhead payments. Replace the terms and timing with the agreed contract and real payroll dates. Do not add $2,800 twice if your existing opening reserve already funds these exact payments. Pair the '+sba+' expense split with the <a href="/blogs/cleaning-business-break-even/">cleaning break-even guide</a> for the separate recurring job target.</p>',
 },
 'how-much-does-it-cost-to-open-a-salon': {
  lead:'<p><strong>How much does it cost to open a salon?</strong> Build the amount from your premises, equipment, setup payments and launch cash reserve. The itemized three-station example below totals <strong>$61,000</strong>, including a separately stated $15,000 reserve. This is a fictional USD budget, not a US average, a quoted market range or a minimum investment.</p><blockquote><p><strong>Quick answer:</strong> Price the actual site and service scope, add dated setup payments and the cash needed until collections cover payments. A finished suite and a storefront requiring plumbing or other construction need different quotes. Keep launch funding separate from the monthly sales target and avoid counting the same reserve twice.</p></blockquote>',
  replaceOpening:true,
  heading:'Test a delayed opening before spending the reserve',
  copy:'<p>The existing $61,000 example includes $15,000 of reserve, so its other opening lines total $46,000. In a separate delay test, assume an extra $4,000 of lease, utilities and other payments falls due before opening, with no sales receipts. Spending those payments from the existing reserve leaves $11,000; it does not automatically turn the total funded budget into $65,000. If the operating forecast still needs the full $15,000 after opening, an additional $4,000 must be funded or another payment reduced.</p><p>Record the opening date, contractor milestones, lease start and first payroll separately. A reserve label does not prove its amount is sufficient. Follow the '+sba+' distinction between one-time and recurring expenses, then use the <a href="/calculators/cash-flow-forecast-template/">cash forecast</a> to test the delay without changing the salon’s operating break-even formula.</p>',
 },
 'ecommerce-orders-per-day-profitable': {
  heading:'Turn a daily average into a whole-order dispatch target',
  copy:'<p>Using the existing $96,000 annual contribution requirement and $28 contribution per order, the exact requirement is 3,428.5714 orders. Round the annual operating target up to <strong>3,429 orders</strong>. At 260 shipping days, the workload averages 13.19 orders per shipping day, compared with 9.39 per calendar day. These are different denominators, not different profit forecasts.</p><p>Rounding every shipping day up to 14 creates capacity for 3,640 orders, 211 more than the annual minimum. That can be a scheduling choice, but should not be presented as the exact annual break-even requirement. Check peak weeks as well as the annual average. Revisit the <a href="/blogs/ecommerce-return-cost-per-order/">return allowance</a> and <a href="/blogs/ecommerce-chargeback-cost-per-order/">dispute allowance</a> when contribution changes; higher volume alone cannot repair negative contribution.</p>',
 },
 'ecommerce-chargeback-cost-per-order': {
  heading:'Reconcile pending and resolved disputes before updating the allowance',
  copy:'<p>Keep pending disputes separate from resolved outcomes. In a fictional closed cohort of 1,000 orders, two lost disputes reverse $60 each and add a $15 fee each. A third dispute is won with its full $60 payment retained but an assumed $15 fee still charged. Total incremental loss is 2 × ($60 + $15) + $15 = <strong>$165</strong>, or <strong>$0.165 per original order</strong>. All fees here are assumptions, not provider prices.</p><p>If you display a rounded $0.17 allowance, keep $165 as the cohort total rather than rebuilding it as $170. A won payment should not remain in the lost-revenue column, and a fee should only be removed when a credit is confirmed. Keep original product and shipping costs in the baseline once. Reconcile any refund on the same order with the <a href="/blogs/ecommerce-return-cost-per-order/">returns calculation</a> so a refund and dispute do not both reverse the same revenue in the final settled outcome.</p>',
 },
 'ecommerce-return-cost-per-order': {
  heading:'Weight return costs by product rather than averaging percentages',
  copy:'<p>Different products can have different return economics. In a separate fictional cohort, 800 orders have a 5% return probability and lose $40 of contribution per return relative to a kept order. Another 200 orders have a 20% probability and lose $80 per return. Expected losses are 800 × 5% × $40 = $1,600 and 200 × 20% × $80 = $3,200. Total burden is <strong>$4,800 ÷ 1,000 = $4.80 per placed order</strong>.</p><p>The unweighted average return rate of 12.5% misrepresents this mix. Even the correctly weighted 8% expected return rate is insufficient without the different losses per returned product. Keep product mix, return probabilities and recoverable item value consistent with the cohort. Feed the resulting allowance into the <a href="/blogs/ecommerce-orders-per-day-profitable/">orders-per-day contribution calculation</a> once, alongside any separately reconciled dispute allowance.</p>',
 },
 'how-much-to-charge-for-house-cleaning': {
  heading:'Quote an extra hour without confusing crew time and worker-hours',
  copy:'<p>In a separate fictional quote, two cleaners each need one extra hour. That adds two worker-hours. At $24 loaded cost per worker-hour plus $4 extra supplies and travel, incremental cost is $52. With an assumed 3% payment fee and a 20% target operating margin on the added charge, quote $52 ÷ (1 − 0.03 − 0.20) = <strong>$67.53</strong> rounded to cents.</p><p>At $67.53, the assumed fee is about $2.03, leaving about $13.50 after the $52 incremental cost. The job’s original quote must still cover its assigned overhead and original work. This is an additional-scope calculation, not a replacement for the full-job budget or a local market rate. Agree the rooms, tasks and extra time before accepting the change, then compare actual worker-hours with the quote. Use the <a href="/blogs/cleaning-business-break-even/">monthly cleaning break-even model</a> to check whether the combined booking mix supports the whole business.</p>',
 },
 'agency-scope-creep-cost': {
  heading:'Price an additional revision using incremental delivery cost',
  copy:'<p>For a separate fictional change request, three team members spend two hours each on an extra revision. Six worker-hours at $30 cost $180; an additional $20 direct expense brings incremental cost to $200. With an assumed 3% payment fee and a 25% contribution-margin target on the added charge, the quote is $200 ÷ (1 − 0.03 − 0.25) = <strong>$277.78</strong>. This margin still has to contribute toward agency overhead; it is not net profit.</p><p>Charging $250 by adding 25% to cost produces only a 17% contribution margin after the 3% fee: ($250 − $7.50 − $200) ÷ $250. Record who approves the revision, what the extra deliverable contains and the worker-hours it replaces in the schedule. Compare the revised plan with <a href="/blogs/agency-billable-utilization-rate/">billable capacity</a>; an acceptable margin does not create additional delivery hours.</p>',
 },
});

export const november10RecoverySlugs = new Set([...Object.keys(november10Recovery),'cleaning-business-break-even']);

const cleaningSection = Object.freeze({
 id:'cleaning-break-even-sensitivity',
 heading:'Check the price change against the existing capacity limit',
 paragraphs:[
 'The worked example needs $8,700 of monthly contribution and has capacity for 97.50 jobs. At the original $76.78 contribution per job, 97 whole jobs provide $7,447.66, leaving a $1,252.34 gap. The next question is which input can change without overloading the crew.',
 'In a separate sensitivity, raise price from $180 to $195 while holding the stated non-fee variable costs at $98 and the card fee at 2.9%. The fee becomes $5.655 and contribution $91.345. Required jobs are $8,700 ÷ $91.345 = 95.24, rounded up to 96. At 96 jobs contribution is $8,769.12, or $69.12 above the stated target. This fits the 97-whole-job capacity assumption, but does not prove customers will accept the price or that job duration will stay constant.',
 'Retain full precision until the final display. If supplies, crew time or acquisition costs rise with the higher-priced scope, revise them too. Setting the $1,000 target profit to zero answers a different question; it should not silently replace the original owner-pay-and-profit plan.',
 ],
 links:[['Review the scope behind your house-cleaning quote','/blogs/how-much-to-charge-for-house-cleaning/']],
});

export function applyNovember10PositionRecovery(post) {
 const update=november10Recovery[post.slug];
 if(!update && post.slug!=='cleaning-business-break-even') return post;
 if((post.modified || post.published)>'2026-10-25') throw new Error(`Protected recovery owner: ${post.slug}`);
 if(post.slug==='cleaning-business-break-even') return {...post,modified:'2026-11-10',sections:[...post.sections,cleaningSection]};
 const sectionId=`position-recovery-${post.slug}`;
 let html=post.html;
 if(update.replaceOpening){const firstH2=html.indexOf('<h2');if(firstH2<0)throw new Error('Missing salon opening boundary');html=update.lead+html.slice(firstH2);}
 else if(update.lead) html=update.lead+html;
 const addition=`<section aria-labelledby="${sectionId}"><h2 id="${sectionId}">${update.heading}</h2>${update.copy}</section>`;
 // Keep FAQs and closing navigation at the end where an explicit FAQ heading exists.
 const faqAt=html.search(/<h2\b[^>]*>(?:FAQs|Frequently asked questions)<\/h2>/i);
 html=faqAt>=0?html.slice(0,faqAt)+addition+html.slice(faqAt):html+addition;
 return {...post,html,modified:'2026-11-10'};
}
