// Existing restaurant intent owners only; retain covers, URLs, examples and engine inputs.
const originals = new Map();
export const batch4ReviewedSlugs = new Set(['restaurant-food-cost-percentage','restaurant-labor-cost-percentage']);
export const restoreExistingBatch4 = p => originals.get(p.slug) || p;
const table=(caption,heads,rows)=>`<div class="article-table-scroll" role="region" aria-label="${caption}" tabindex="0"><table><caption>${caption}</caption><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${r[0]}</th>${r.slice(1).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export function applyExistingBatch4November26(p){
 if(!batch4ReviewedSlugs.has(p.slug)) return p;
 originals.set(p.slug,p);
 const a={...p,modified:'2026-11-26'};
 if(p.slug==='restaurant-food-cost-percentage'){
  // Keep the established title: no fresh page-filtered query export supports title churn.
  a.description=a.metaDescription='Calculate restaurant food cost percentage from inventory and net food sales. Reconcile actual vs theoretical costs, credits and waste without double counting.';
  a.answerHtml=p.answerHtml.replace('beginning food inventory + food purchases − ending food inventory','beginning food inventory + net food purchases − ending food inventory')+'<p>Net purchases means received food purchases less supplier credits counted once. If your scope has transfers or documented meal reclassifications, use the <a href="#food-cost-adjusted-bridge">adjusted inventory bridge</a>. <strong>Waste already included in inventory usage is not an extra cost to add again.</strong> <a href="/calculators/food-cost-calculator/">Open the food-cost reconciliation calculator</a> for the same method; opening it does not import figures from this article.</p>';
  const bridge='<h2 id="food-cost-adjusted-bridge">Match the inventory bridge to the calculator fields</h2><p>The simple $20,000 example assumes no credits, transfers or reclassified meals. This separate fictional USD case shows each adjustment once. Keep opening and closing stock at cost and use the same period, locations and food-only sales category.</p>'+table('Adjusted food-cost example: one matched period, USD',['Line','Calculation','Running amount'],[
   ['Opening plus gross purchases','$8,000 + $18,000','$26,000'],
   ['Supplier credits','− $500; purchases were gross','$25,500'],
   ['Transfers in and out','+ $300 − $200','$25,600'],
   ['Closing stock','− $6,000','$19,600 food used'],
   ['Documented meal reclassifications','− $400 staff meals − $200 comps','$19,000 adjusted food cost'],
   ['Adjusted food-cost percentage','$19,000 ÷ $60,000 net food sales × 100','31.67%'],
   ['Theoretical cost of the same sold mix','$19,000 − $18,200','$800 variance'],
   ['Recorded waste already within usage','$800 gap − $600 recorded waste','$200 remaining gap'],
  ])+'<p>Reclassified meals remain business expenses elsewhere; they have not disappeared or created a saving. Leave these adjustments at zero if they remain in your food-cost scope. If purchases are already net of the $500 credit, leave the separate credit field at zero. Waste stays within the $19,000, so adding $600 again would overstate food cost; the $200 remainder still needs records before assigning a cause.</p><p>Use <a href="/calculators/food-cost-calculator/">the period food-cost calculator</a> for this reconciliation, <a href="/calculators/recipe-cost-calculator/">the recipe calculator</a> for portions and yield, and <a href="/blogs/restaurant-labor-cost-percentage/">the loaded-labor guide</a> for payroll. Food cost alone is not prime cost or profit. The <a href="/guides/restaurant-business/">restaurant planning collection</a> connects these distinct steps.</p>';
  a.html=p.html.replace('<h2 id="food-cost-inventory-method">',bridge+'<h2 id="food-cost-inventory-method">');
  a.sectionLinks=[['restaurant-food-formula','Formula and quick answer'],['food-cost-adjusted-bridge','Credits, meals and waste'],['food-cost-comparison-heading','Actual vs theoretical'],['food-cost-reconciliation-heading','Investigate the gap'],['food-cost-period-close','Close the period'],['recipe-cost-worksheet','Recipe yield worksheet']];
 }
 if(p.slug==='restaurant-labor-cost-percentage'){
  a.description=a.metaDescription='Calculate restaurant labor cost percentage from loaded payroll and matched net sales. Check paid hours, employer costs and a four-hour staffing example.';
  a.answerHtml=p.answerHtml.replace('loaded labor expense ÷ sales × 100','loaded labor expense ÷ net sales × 100')+'<p>For a whole-restaurant payroll measure, use matching food and beverage net sales, excluding sales tax collected for remittance and customer tips that are not revenue. Food-only sales belong with food-only costs; do not copy that denominator into a whole-restaurant payroll ratio. <a href="#labor-cost-scope-check">Check payroll scope and owner work</a>, then <a href="#labor-shift-decision">test the paid-hour schedule</a>.</p>';
  const scope='<h2 id="labor-cost-scope-check">Separate recorded payroll, owner work and productive capacity</h2>'+table('Choose a consistent labor-cost boundary',['Question','Treatment'],[
   ['What did this period actually cost?','Match earned hourly and salaried wages, overtime, employer payroll costs and benefits to the same sales period; do not substitute the paycheck date.'],
   ['How much is paid once?','Employer cost is additional to gross wages; employee withholdings already within gross wages are not a second employer expense.'],
   ['Where does owner compensation go?','Include actual owner wages in the defined payroll measure. Show an unpaid owner’s replacement-cost allowance separately for planning; a draw or profit distribution is not automatically payroll expense.'],
   ['Which hours drive the ratio?','Paid labor-hours determine payroll. Productive hours estimate delivery capacity and can be lower because of breaks, training, setup and administration.'],
   ['What does zero sales mean?','The percentage is undefined when net sales are zero; report the labor dollars and hours instead of 0%. Investigate negative net sales before interpreting a percentage.'],
  ])+'<p>The <a href="/calculators/employee-cost-calculator/">employee-cost calculator</a> separates paid and productive hours for one hire. Aggregate the appropriate roles for the restaurant; it does not calculate the whole restaurant’s payroll-to-sales ratio. In the <a href="/calculators/restaurant-break-even-calculator/">monthly restaurant planner</a>, keep committed payroll in overhead and only genuinely order-dependent labor in the per-order input. Count each wage and owner goal once. Continue through the <a href="/guides/restaurant-business/">restaurant planning collection</a>.</p>';
  a.html=p.html.replace('<h2 id="loaded-labor-method">',scope+'<h2 id="loaded-labor-method">').replace('<h2>Build a shift from forecast sales, then check the percentage</h2>','<h2 id="labor-shift-decision">Build a shift from forecast sales, then check the percentage</h2>');
  a.html=a.html.replace('<table><thead><tr><th>Four-hour shift case</th><th>Orders × $30</th><th>Paid hours × $22</th><th>Labor / sales</th></tr></thead>','<table><caption>Fictional four-hour dinner shift, USD; paid worker-hours are added across staff</caption><thead><tr><th scope="col">Four-hour shift case</th><th scope="col">Orders × $30</th><th scope="col">Paid hours × $22</th><th scope="col">Labor / sales</th></tr></thead>');
  const q='Should owner wages count?',answer='Include actual owner wages in the defined payroll measure. Show an unpaid owner’s replacement-cost allowance separately for planning. Owner draws or profit distributions are not automatically payroll expense; count each item once.';
  const old=p.faq.find(f=>f.q===q);a.faq=p.faq.map(f=>f.q===q?{...f,a:answer}:f);a.html=a.html.replace(`<h3>${q}</h3><p>${old.a}</p>`,`<h3>${q}</h3><p>${answer}</p>`);
  a.sectionLinks=[['restaurant-labor-formula','Formula and quick answer'],['labor-cost-scope-check','Payroll scope and hours'],['loaded-labor-method','Monthly calculation'],['labor-shift-decision','Four-hour staffing example'],['labor-percentage-denominator','Choose the denominator'],['affordable-labor-percentage','Build a budget allowance']];
 }
 return a;
}
