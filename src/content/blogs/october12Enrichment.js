import { calculate } from '../../engine.js';
import { industries, fieldLabels } from '../../industries.js';

// Capture inputs are intentionally fixed: this is a reproducible demonstration,
// not a claimed customer result or a live market benchmark.
export const walkthroughInputs = Object.freeze({
  cleaning: { price:180, materialCost:18, laborCost:58, otherVariableCost:12, acquisitionCost:10, fixedCosts:3200, ownerPay:4500, targetProfit:1000, paymentFeePct:2.9, workers:3, hoursPerWorker:35, hoursPerJob:3.5, utilizationPct:75, conversionPct:30 },
  ecommerce: { price:86, materialCost:29, laborCost:7, otherVariableCost:9, acquisitionCost:13, fixedCosts:7800, ownerPay:5000, targetProfit:2000, paymentFeePct:3.2, workers:3, hoursPerWorker:35, hoursPerJob:0.28, utilizationPct:78, conversionPct:2.8 },
});
const number = value => Number(value).toLocaleString('en-US', { maximumFractionDigits:2, minimumFractionDigits:2 });
const integer = value => Number(value).toLocaleString('en-US');
const table = (caption, headings, rows) => `<div class="article-table-scroll"><table><caption>${caption}</caption><thead><tr>${headings.map(v=>`<th scope="col">${v}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th scope="row">${row[0]}</th>${row.slice(1).map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export function calculatorWalkthrough(key) {
  const input=walkthroughInputs[key], result=calculate(input), industry=industries[key];
  if (!result.valid) throw new Error(`Invalid walkthrough: ${key}`);
  const rows=fieldLabels(industry).map(([label,field,unit])=>[`${label}${unit ? ` (${unit})` : ''}`,integer(input[field])]);
  const short=key==='cleaning'?'cleaning':'ecommerce';
  const explanation=key==='cleaning'
    ? 'The monthly target requires 114 jobs, but the modeled team can deliver only 97 whole jobs. The 17-job gap means this plan needs a change in price, scope, costs or productive hours. Adding hours can also add wages; update both fields together. A full booking calendar cannot close a workload gap by itself.'
    : 'The model has room for 587 orders within its 1,267-order monthly capacity. That does not prove demand, inventory availability or sufficient dispatch capacity on peak days. At the assumed 2.8% conversion, the target requires 20,965 inquiries. Use measured qualified visits and conversion for your own store; this number is not a traffic forecast.';
  return `<h2 id="verified-calculator-walkthrough">Reproduce the ${short} calculator example</h2>
<p>This is an actual MyBreakeven calculator demonstration captured on October 12, 2026, using illustrative USD inputs. It is not a customer case study, an industry average or a prediction. Open the calculator linked under “How to run your own numbers”, choose <strong>Reset example</strong>, and compare every input with the table. If presets change later, enter these values manually.</p>
${table('Inputs used for the captured demonstration (USD amounts; other units are in the field labels)', ['Calculator field','Value'],rows)}
<p>The percentage fee is calculated from price. ${key==='cleaning'?'$180 × 2.9% = $5.22; contribution is $180 − $18 − $58 − $12 − $10 − $5.22 = $76.78.':'$86 × 3.2% = $2.752; contribution is $86 − $29 − $7 − $9 − $13 − $2.752 = $25.248. The screen rounds this to $25.25, but the calculation retains full precision.'}</p>
${table('Verified output from the same inputs',['Result','Value'],[
 ['Monthly amount to cover',`$${number(result.fixedNeed)}`],['Exact required volume',`${number(result.jobs)} ${industry.unit}`],['Whole-unit target',`${integer(result.wholeJobs)} ${industry.unit}`],['Sales at whole-unit target',`$${number(result.practicalRevenue)}`],['Whole-unit delivery capacity',`${integer(result.wholeCapacity)} ${industry.unit}`],['Inquiries for whole-unit target',integer(result.practicalLeads)]])}
<figure class="article-visual"><img src="/images/walkthroughs/${short}-break-even-result.jpg" alt="Actual ${short} calculator result showing contribution, required ${industry.unit}, revenue and delivery capacity" width="1348" height="926" loading="lazy" decoding="async"><figcaption>Actual calculator screen, October 12, 2026. The displayed amounts come from the illustrative inputs above.</figcaption></figure>
<p>${explanation}</p><p>Capacity uses team members × weekly hours × 52 ÷ 12 × productive utilization ÷ worker-hours per ${industry.singular}. Required volume rounds up; deliverable volume rounds down. Owner pay and the extra profit goal are included in this target. Set both to zero only when checking overhead-only operating break-even.</p>`;
}
function replaceSection(html, heading, replacement) {
  const matches=[...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)];
  const i=matches.findIndex(m=>m[1].replace(/<[^>]+>/g,'')===heading);
  if(i<0) throw new Error(`Enrichment section missing: ${heading}`);
  return html.slice(0,matches[i].index)+replacement+html.slice(matches[i+1]?.index??html.length);
}
function beforeSection(html, heading, addition) {
  const match=[...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].find(m=>m[1].replace(/<[^>]+>/g,'')===heading);
  if(!match) throw new Error(`Enrichment anchor missing: ${heading}`);
  return html.slice(0,match.index)+addition+html.slice(match.index);
}
const descriptions={
 'margin-of-safety-business':'Calculate margin of safety in units, revenue and percent. Distinguish actual sales from forecasts and test the cushion against changed costs or service mix.',
 'calculate-contribution-margin':'Calculate contribution margin per sale and for a mixed-product month. Match revenue and variable costs, check weighted margins and use the result for pricing.',
 'how-much-does-it-cost-to-start-a-cleaning-business':'Build a cleaning startup budget from local quotes, setup purchases and payment timing. Separate launch cash from monthly costs, owner pay and job targets.',
 'how-much-to-charge-for-house-cleaning':'Price house cleaning from cleaner-hours, scope, fees and overhead. Compare hourly and flat quotes, then verify your monthly job target in the calculator.',
 'ecommerce-break-even':'Calculate ecommerce break-even after product, shipping, returns and ad costs. Reproduce verified calculator inputs and check demand and packing capacity.',
};
const titles={ 'margin-of-safety-business':'Margin of Safety: Formula and Worked Example', 'calculate-contribution-margin':'Contribution Margin: Formula and Examples', 'how-much-does-it-cost-to-start-a-cleaning-business':'Cleaning Business Startup Costs and Budget', 'how-much-to-charge-for-house-cleaning':'How Much to Charge for House Cleaning', 'ecommerce-break-even':'Ecommerce Break-Even: Costs and Capacity' };
export function applyOctober12Enrichment(post) {
 if(!descriptions[post.slug]) return post;
 let html=post.html, faq=[...post.faq];
 if(post.slug==='margin-of-safety-business') {
  html=replaceSection(html,'Read margin of safety in units, dollars and percent','');
  html=beforeSection(html,'Three changes that shrink the cushion', `<h2>Choose the measure that fits the decision</h2>${table('Three ways to read the same sales cushion',['Measure','Useful for','Check first'],[['Jobs or units','Booking losses and workload','Services must have comparable contribution.'],['Sales dollars','Revenue changes across periods','Use the same price and mix as the break-even calculation.'],['Percentage','Comparing months of different sizes','Divide the gap by actual or forecast sales, not break-even sales.']])}<p>A forecast cushion depends on the forecast; it is not cash in the bank or a probability of success. Label whether the threshold covers overhead only or also owner pay and a profit goal. The <a href="https://openstax.org/books/principles-managerial-accounting/pages/3-key-terms">OpenStax accounting definitions</a> distinguish contribution from the sales gap above break-even.</p>`);
 }
 if(post.slug==='calculate-contribution-margin') {
  html=replaceSection(html,'How to run your own numbers',`<h2>How to run your own numbers</h2><ol><li>Choose one sale unit and one reporting period. Match its retained revenue to the costs of delivering those same sales.</li><li>Use invoices, fee statements and job records to separate variable costs from fixed commitments. Mark allowances as estimates.</li><li>Use the <a href="/calculators/ecommerce-break-even-calculator/">ecommerce break-even calculator</a> for one product or a representative order. Enter each cost once, including percentage fees in their own field.</li><li>For several products, use the mixed-product calculation above. Total contribution dollars before calculating the weighted ratio; keep full precision until final rounding.</li><li>Compare monthly contribution with overhead and the owner-pay or profit requirement you actually want to cover.</li></ol><p>The <a href="https://openstax.org/books/principles-managerial-accounting/pages/3-key-terms">OpenStax accounting glossary</a> defines unit contribution and sales mix. It does not verify the fictional business inputs used here.</p>`);
  html=html.replace(/\s*Closing takeaways:[\s\S]*?<\/p>/,'</p>');
  html=html.replace('Worked examples: What Is Contribution Margin and How to Calculate It','Contribution in three different selling models');
  html=beforeSection(html,'Reconcile contribution for a mixed-product month', `<h2>Which record should supply each input?</h2>${table('Evidence to collect before calculating',['Input','Starting record','Avoid'],[['Retained sales','Sales and refund reconciliation','Combining list-price revenue with already-refunded orders.'],['Product or job cost','Supplier invoices and delivery records','Using costs from a different basket or service.'],['Fees and acquisition','Processor and campaign statements','Counting the same fee in dollars and percentages.']])}`);
 }
 if(post.slug==='how-much-does-it-cost-to-start-a-cleaning-business') {
  html=html.replace(/<p>[\s\S]*?<\/p>/,`<p>To budget for a cleaning business, add the purchases and deposits needed to launch, then map when ongoing bills and customer payments fall due. Keep that funding plan separate from the jobs needed to cover monthly costs. The USD examples below show the method; they are not current US market prices or required spending for every cleaner.</p>`);
  html=html.replace('A larger two-person operation could need $18,000 or more upfront.','The staffed examples below use different equipment, wages and payment assumptions.');
  html=html.replace('whether the $16,000 reserve is enough','whether the funding left after setup purchases covers that payment gap');
  html=beforeSection(html,'What changes the answer', `<h2>Build the launch budget from dated quotes</h2><p>The <a href="https://www.sba.gov/counseling/plan-your-business/">US Small Business Administration startup-cost guidance</a> separates one-time spending from recurring expenses. Apply that distinction to your own quotes rather than treating the examples here as local prices.</p>${table('A quote register for a US cleaning launch',['Budget line','Evidence to collect','Timing'],[['Tools and opening supplies','Supplier quote, quantities and service scope','Purchase date; then replenishment as supplies are used.'],['Insurance and recurring services','Written quote with deposit and monthly charge separated','Deposit at launch; renewals on their actual dates.'],['Vehicle or storage','Existing resources plus any new scoped commitment','Upfront payment and subsequent bills recorded separately.'],['Working cash','Customer receipt dates against wages and supplier payments','Largest projected cumulative cash shortfall.']])}<p>Do not assume every month needs the same reserve. Prepare a dated cash schedule through the planned ramp-up and test delayed receipts. Keep personal household reserves separate from business cash. For an invoice-paid contract, the <a href="/blogs/cleaning-contract-payroll-cash-gap/">cleaning payroll cash-gap example</a> shows why contribution and collection timing answer different questions.</p><p>Outside the US, use quotes and applicable local requirements in one currency throughout. Changing USD to GBP, CAD or AUD does not convert prices or establish a local registration or insurance cost.</p>`);
  faq.push({q:'Do I need to buy a vehicle before starting?',a:'Budget from the service area and equipment you actually need. An existing suitable vehicle and a new financed vehicle create different upfront and recurring costs. Check practical transport needs and obtain relevant quotes before adding a purchase to the plan.'});
 }
 if(post.slug==='how-much-to-charge-for-house-cleaning') {
  html=html.replace('and any card fee. Overhead includes','and any fixed per-job fee. Treat a percentage card fee separately because it changes with the final quote. Overhead includes');
  html=html.replace('If the target operating margin is 30%, divide $156 by 0.70.','This first example assumes no additional percentage payment fee. If the target operating margin is 30%, divide $156 by 0.70.');
  html=beforeSection(html,'What changes the answer', `<h2>Hourly or flat-rate: choose from the job scope</h2>${table('Choose a quote method before publishing a price',['Method','Useful situation','What the quote must explain'],[['Hourly','Uncertain first-clean condition','Rate per cleaner-hour, expected range and approval for extra time.'],['Flat per visit','Inspected recurring scope with measured time','Included tasks, exclusions and changes that trigger a new quote.'],['Room or area basis','Comparable properties with consistent condition','Size alone does not capture bathrooms, buildup or travel.']])}<p>Jobber's <a href="https://www.getjobber.com/academy/cleaning/how-much-to-charge-for-house-cleaning/">cleaning pricing guide</a> discusses these billing structures. It does not determine what your crew should charge. Check your own labor-hours and costs before using any advertised range.</p><p>For US customers, describe the home size and scope in the quote. In other markets, labels such as domestic cleaning, fortnightly service or end-of-tenancy cleaning may describe similar work with different inclusions. Confirm those inclusions and use local costs; USD, GBP, CAD and AUD are currency labels, not exchange-rate conversions.</p><p><strong>Percentage-fee pricing:</strong> price = cost before the percentage fee ÷ (1 − fee rate − target margin). The denominator must be positive. This is a cost-based quote check, not evidence that customers will accept the price. The <a href="/blogs/margin-vs-markup/">margin-versus-markup guide</a> explains why adding a percentage to cost gives a different result.</p>`);
  html=beforeSection(html,'Common mistakes',calculatorWalkthrough('cleaning'));
  faq.push({q:'Can I price every home by square footage alone?',a:'Use area as an estimating input only when the work is comparable. Bathrooms, property condition, extras, access and travel can change paid cleaner-hours substantially. Confirm scope and compare estimated time with actual time after the job.'});
 }
 if(post.slug==='ecommerce-break-even') {
  html=beforeSection(html,'How to run your own numbers', `<h2>Check the same order basis across channels</h2>${table('Reconcile these records before comparing channels',['Record','Use in the model','Boundary'],[['Order and refund export','Consistent retained revenue and completed order count','Keep canceled and refunded orders identifiable.'],['Payment or marketplace settlement','Actual percentage and fixed fees','Do not add processing again if already bundled.'],['Carrier, fulfillment and return records','Net merchant-paid costs for the same order mix','Reconcile reimbursements and recovered stock.'],['Campaign and acquisition records','Acquisition cost assigned to the modeled orders','Do not also include that same spend in overhead.']])}<p>Shopify's <a href="https://www.shopify.com/blog/break-even-point">break-even explanation</a> supplies the basic fixed-cost and unit-contribution relationship. The store examples here separately include shipping, acquisition and owner-pay assumptions. Replace USD inputs with consistent local figures when working in another country; the calculator does not supply exchange rates or local fee schedules.</p><p>For an advertising decision, compare the <a href="/blogs/break-even-roas-formula/">break-even ROAS calculation</a>. For damaged returns and unrecovered delivery costs, use the <a href="/blogs/ecommerce-return-cost-per-order/">return-cost-per-order guide</a>. Neither an ad-return ratio nor a positive unit contribution proves that monthly overhead is covered.</p>`);
  html=beforeSection(html,'Common mistakes',calculatorWalkthrough('ecommerce'));
 }
 const paragraphBreaks = {
  'margin-of-safety-business': ['In this example $6,000', 'Ten more appointments at $60'],
  'calculate-contribution-margin': ['Product B sells for $30'],
  'how-much-to-charge-for-house-cleaning': ['The example below is for planning', 'Then estimate <strong>paid cleaner-hours</strong>', 'A <strong>$373 quote</strong>', 'Compare the estimated six cleaner-hours', 'The card fee is $403'],
 };
 for (const sentence of paragraphBreaks[post.slug] || []) {
  const before = ` ${sentence}`;
  if (!html.includes(before)) throw new Error(`Paragraph break missing: ${sentence}`);
  html=html.replace(before,`</p><p>${sentence}`);
 }
 html += `<aside class="article-note"><p><strong>Publishing responsibility:</strong> <a href="/founder/">Anis Ul Haq</a> is the founder and publisher of MyBreakeven. This guide uses AI-assisted content and explicitly stated examples. This update checks explanation, cited source scope and the included calculation method; it does not claim independent professional review. See the <a href="/editorial-policy/">editorial standards</a> and <a href="/calculation-methodology/">calculation methodology</a>.</p></aside>`;
 return {...post,html,faq,modified:'2026-10-12',seoTitle:titles[post.slug],description:descriptions[post.slug],metaDescription:descriptions[post.slug]};
}
