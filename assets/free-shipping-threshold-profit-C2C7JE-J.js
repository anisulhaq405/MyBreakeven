var e={slug:`free-shipping-threshold-profit`,tag:`E-commerce`,name:`E-commerce`,cluster:`pricing`,title:`Free Shipping Threshold: Does the Bigger Basket Pay?`,seoTitle:`Free Shipping Threshold: Contribution Test`,description:`Test a free-shipping threshold against lost delivery revenue, added basket contribution and carrier costs. Compare matched traffic and realistic product mixes.`,metaDescription:`Test a free-shipping threshold against lost delivery revenue, added basket contribution and carrier costs. Compare matched traffic and realistic product mixes.`,image:`/images/title-covers/blog-free-shipping-threshold-profit-20261026.webp`,alt:`Two cardboard parcels on a packing bench, one with a mug, towel and small carton, the other with one carton.`,imageCaption:`Generated editorial image illustrating the work discussed in this guide; not a photograph of a real customer or business.`,published:`2026-10-05`,modified:`2026-10-31`,opening:`Under the basket costs below, a free shipping threshold needs to be at least $51.93 to leave $15 of contribution per order. A rounded $55 threshold clears that target, provided the product mix and shipping expense stay within the stated assumptions.`,unit:`orders`,singular:`order`,calculatorSlug:`ecommerce-break-even-calculator`,tags:[`E-commerce`,`Profitable Free Shipping Threshold`],features:[`Explicit fictional assumptions and checked arithmetic`,`Costs and delivery hours tied to a complete planning unit`,`Rounded job targets compared with delivery capacity`],html:`<p>Under the basket costs below, a free shipping threshold needs to be at least $51.93 to leave $15 of contribution per order. A rounded $55 threshold clears that target, provided the product mix and shipping expense stay within the stated assumptions.</p>
<p>Those conditions matter more than the neat number on the banner. A customer may add a low-margin item or a heavier product to qualify, changing what the order leaves you. Work through the illustrative USD baskets below before testing a threshold in your own store.</p>
<h2 id="quick-answer">Quick answer</h2>
<p>Start with the eligible merchandise revenue and its product cost. Subtract payment fees, carrier expense, packaging, fulfillment and acquisition costs. Set a contribution goal, solve for the basket value that meets it, then test heavier parcels and different product mixes. Treat the calculated threshold as a candidate offer; it does not predict customer conversion or average order value.</p>
<h2 id="check-which-carts-can-qualify">Check which carts can qualify</h2>
<p>Start with the products and destinations eligible for the offer. A threshold that works for a lightweight basket sent nearby may fail for a bulky item going farther away. Separate those groups in the cost sheet before using one amount across the store.</p>
<p>Use the amount the customer pays after discounts when you calculate contribution. A $60 cart with a $10 product discount brings in $50 of merchandise revenue. Your checkout rule also needs to handle that discount consistently, so test an eligible cart with and without the other promotions you intend to offer.</p>
<p>Shopify's <a href="https://help.shopify.com/en/manual/discounts/discount-types/free-shipping">free shipping discount documentation</a> explains its minimum purchase requirements and settings. Check the equivalent current rules for your platform, then try the actual checkout. The calculation here tells you what a basket earns; it does not configure the offer.</p>
<p>Below the threshold, include the shipping charge the customer pays in revenue if you also subtract the full carrier bill. Above it, the customer shipping charge is zero and the carrier bill remains a cost. That convention lets you compare the two orders without counting shipping twice.</p>
<p>For this example, revenue excludes taxes collected for another party. The fee is an assumed percentage of the stated revenue, so check your own fee basis when adapting the worksheet. Write any fixed transaction charge on its own cost line.</p>
<h2 id="build-the-order-assumptions">Build the order assumptions</h2>
<div class="article-table-scroll"><table>
<thead>
<tr class="header">
<th>Input</th>
<th style="text-align: right;">Example input</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Product cost as a share of merchandise revenue</td>
<td style="text-align: right;">45%</td>
</tr>
<tr class="even">
<td>Product margin before order costs</td>
<td style="text-align: right;">55%</td>
</tr>
<tr class="odd">
<td>Payment fee on revenue</td>
<td style="text-align: right;">3%</td>
</tr>
<tr class="even">
<td>Carrier shipping cost per eligible order</td>
<td style="text-align: right;">$8</td>
</tr>
<tr class="odd">
<td>Packaging and fulfillment cost</td>
<td style="text-align: right;">$2</td>
</tr>
<tr class="even">
<td>Acquisition cost per completed order</td>
<td style="text-align: right;">$2</td>
</tr>
<tr class="odd">
<td>Chosen contribution goal per order</td>
<td style="text-align: right;">$15</td>
</tr>
</tbody>
</table></div>
<p>The 45% product-cost ratio is a average for the eligible basket mix. It must include the relevant landed cost of goods sold. It is not safe to use a high-margin accessory's ratio for every combination a customer can add to the cart. Returns, chargebacks and other losses are set to zero in this initial example so the threshold formula is easy to follow; add your own allocations when those costs are material.</p>
<p>Carrier cost is also a scenario assumption. Weight, package dimensions, service level and destination can change it. A flat $8 may fit one tested parcel group and fail another. Keep an expensive shipping zone or oversized product separate before extending the offer to it.</p>
<h2 id="solve-for-a-contribution-based-threshold">Solve for a contribution-based threshold</h2>
<p>Let basket merchandise revenue be B. Contribution is:</p>
<p><strong>B × (1 − 45% − 3%) − $8 − $2 − $2 = 0.52B − $12.</strong></p>
<p>To leave $15, solve 0.52B − $12 = $15. Therefore B = $27 ÷ 0.52 = <strong>$51.93</strong>, rounded up to the next cent. A $55 threshold gives $55 × 0.52 − $12 = $16.60 contribution for a basket exactly at that value.</p>
<p>The formula uses a chosen contribution goal. Covering shipping alone would produce a lower threshold but leave less toward monthly bills and owner income. The right goal depends on your complete business plan and achievable paid order volume; a formula cannot choose it independently of those constraints.</p>
<p>A threshold is also not an average order value. Customers may qualify with a $55 basket, spend more, remain below it and pay shipping, or abandon checkout. Model these as separate completed-order groups. Do not assume announcing $55 free shipping makes every future order worth $55.</p>
<h2 id="compare-a-paid-shipping-basket-and-two-qualifying-baskets">Compare a paid-shipping basket and two qualifying baskets</h2>
<div class="article-table-scroll"><table>
<thead>
<tr class="header">
<th>Scenario</th>
<th style="text-align: right;">Merchandise</th>
<th style="text-align: right;">Customer shipping charge</th>
<th style="text-align: right;">Product cost</th>
<th style="text-align: right;">Carrier cost</th>
<th style="text-align: right;">Other costs before fee</th>
<th style="text-align: right;">Contribution</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Below threshold, paid shipping</td>
<td style="text-align: right;">$40</td>
<td style="text-align: right;">$6</td>
<td style="text-align: right;">$18</td>
<td style="text-align: right;">$8</td>
<td style="text-align: right;">$4</td>
<td style="text-align: right;">$14.62</td>
</tr>
<tr class="even">
<td>Eligible basket at $55</td>
<td style="text-align: right;">$55</td>
<td style="text-align: right;">$0</td>
<td style="text-align: right;">$24.75</td>
<td style="text-align: right;">$8</td>
<td style="text-align: right;">$4</td>
<td style="text-align: right;">$16.60</td>
</tr>
<tr class="odd">
<td>Eligible heavier basket at $70</td>
<td style="text-align: right;">$70</td>
<td style="text-align: right;">$0</td>
<td style="text-align: right;">$31.50</td>
<td style="text-align: right;">$11</td>
<td style="text-align: right;">$4</td>
<td style="text-align: right;">$21.40</td>
</tr>
</tbody>
</table></div>
<p>For the first row, total collected revenue is $46 and the 3% fee is $1.38. Contribution is $46 − $18 − $8 − $4 − $1.38 = $14.62. The $55 basket collects more merchandise revenue but loses the $6 shipping charge, so contribution rises by only $1.98.</p>
<p>The $70 basket has a larger carrier expense. Its contribution is $70 − $31.50 − $11 − $4 − $2.10 = $21.40. Ignoring that $3 shipping increase would overstate the benefit of the larger basket. If an added item also changes packaging or fulfillment time, revise those inputs as well.</p>
<p>Suppose the $55 basket instead contains a product mix with 60% cost of goods. Contribution falls to $55 × 0.37 − $12 = $8.35. Meeting the same $15 contribution goal would require $27 ÷ 0.37 = $72.98. This is why a store-wide threshold needs a test of the products and destinations customers can actually choose.</p>
<h2 id="allow-for-returns-without-inventing-certainty">Allow for returns without inventing certainty</h2>
<p>If your records support a $3 expected return-related cost per completed order, add it to the model. The original $55 basket contribution then falls from $16.60 to $13.60. The minimum basket for the $15 goal becomes ($12 + $3 + $15) ÷ 0.52 = <strong>$57.70</strong>, rounded upward to the next cent.</p>
<p>That allocation should reflect the costs your revenue and product-cost figures do not already include. If returned merchandise revenue has already been removed from the net sales figure, subtracting it again as a loss would double count it. Keep refunds, recoverable stock, return carrier cost and handling distinct before creating a single planning average.</p>
<p>Do not carry a return rate from an unrelated product category into a new launch as if it were observed. Label an untested rate as an assumption, compare a higher-cost case, and replace it with actual records once orders have been completed and return windows have passed.</p>
<h2 id="check-orders-needed-and-fulfillment-hours">Check orders needed and fulfillment hours</h2>
<p>Assume monthly fixed costs $2,000, owner pay $2,500 and target profit $500. The $5,000 goal needs $5,000 ÷ $16.60 = 301.20, rounded up to <strong>302 eligible $55 orders</strong>. This uses only the threshold basket scenario, not a claim about the future order mix.</p>
<p>One worker available 30 weekly hours at 70% utilization provides 91 monthly delivery hours. At 0.25 worker-hours per order, capacity is 364 whole orders. The scenario fits on total hours, but you still need enough paid demand and a workable daily dispatch pattern. Carrier collection cutoffs and stock availability can constrain actual fulfillment even when monthly hours fit.</p>
<p>At $13.60 contribution after the return allocation, the requirement rises to 368 orders and exceeds that same capacity. A seemingly small $3 order cost can therefore change the feasibility of the offer. Check cost sensitivity before optimizing only for the cart total.</p>
<h2 id="enter-the-eligible-order-in-the-calculator">Enter the eligible order in the calculator</h2>
<p>Open the <a href="/calculators/ecommerce-break-even-calculator/">ecommerce break-even calculator</a>. Enter price $55, material or product cost $24.75, labor cost $0, other variable cost $10 for carrier plus packaging and fulfillment, acquisition cost $2 and payment fee 3%. The $2 fulfillment allowance is already inside other variable cost here; do not enter it again as labor.</p>
<p>You can use another supported currency for your own inputs; keep every amount in the same currency.</p>
<p>Use fixed costs $2,000, owner pay $2,500, target profit $500, one worker, 30 weekly hours, 0.25 hours per order and 70% utilization. The example should show $16.60 contribution, 302 required orders and 364 whole-order capacity. For the paid-shipping case, use total collected revenue $46 and its complete order costs.</p>
<h2 id="before-putting-the-offer-on-your-store">Before putting the offer on your store</h2>
<ul>
<li>Treating the threshold as average order value. The rule does not establish the completed basket mix.</li>
<li>Counting shipping revenue twice. Use collected revenue and full shipping expense consistently.</li>
<li>Assuming a larger basket ships for the same cost. Test weight, packaging and destination changes.</li>
<li>Using the best product margin for every order. Check low-margin combinations that can qualify.</li>
<li>Judging the offer by revenue alone. Compare contribution, achievable order volume and fulfillment capacity.</li>
</ul>
<section id="owner-decision-check" style="scroll-margin-top:110px" aria-label="Worked owner decision"><h2>Compare the qualifying basket with the order you would otherwise receive</h2><p>Setting a threshold above average order value is a test idea, not proof that the offer pays. Identify the customer shipping charge you surrender, the contribution from products added to qualify and any increase in carrier or fulfillment cost. A heavier qualifying basket can undo the benefit of a higher merchandise total.</p><p><strong>Independent hypothetical USD comparison:</strong> an original basket has $50 merchandise revenue, $5 shipping charged to the customer, $25 product cost, $7 carrier cost and $4 packing/fulfillment cost. A 3% fee on all $55 collected is $1.65. Contribution is <strong>$17.35</strong>. Assume no tax is included in these figures and use your processor's actual fee base.</p><div class="article-table-scroll" role="region" tabindex="0" aria-label="Shipping threshold basket mix comparison"><table class="article-records-table"><caption>Same $65 free-shipping basket; different product and carrier costs</caption><thead><tr><th scope="col">Basket</th><th scope="col">Merchandise / customer shipping</th><th scope="col">Product / carrier / fulfillment</th><th scope="col">Contribution after fee</th></tr></thead><tbody><tr><th scope="row">Original paid shipping</th><td>$50 / $5</td><td>$25 / $7 / $4</td><td>$17.35</td></tr><tr><th scope="row">Qualifying light basket</th><td>$65 / $0</td><td>$31 / $7 / $4</td><td>$21.05</td></tr><tr><th scope="row">Qualifying heavy basket</th><td>$65 / $0</td><td>$35 / $12 / $4</td><td>$12.05</td></tr></tbody></table></div><p>The light basket adds $3.70 contribution; the heavy basket loses $5.30 compared with the original order. Merchandise AOV rises 30% in both cases. These assumptions show why a blanket threshold can hide weak product and shipping-zone combinations.</p><h3>Measure the offer against the same eligible audience</h3><p>If 100 original orders leave $1,735, a test period with ninety light qualifying baskets leaves $1,894.50, while 120 heavy baskets leave only $1,446. Conversion can fall while contribution rises, or rise while contribution falls. Those comparisons require equivalent traffic, acquisition spending, returns and costs; raw order totals across unrelated months do not establish causation.</p><p>Define whether the threshold is checked before or after discounts, which destinations and products qualify, and what happens to split shipments, remote-area charges and partial refunds. Put the rule beside the offer and at checkout. Do not describe a threshold as profitable for every cart if excluded products or costly destinations change the result.</p><p>Track contribution per eligible visitor, not AOV alone, and compare settled shipping and return costs once enough outcomes are known. Use the <a href="/blogs/ecommerce-bundle-pricing-profit/">bundle contribution test</a> when the qualifying add-on is a discounted product set, and <a href="/blogs/ecommerce-shipping-costs/">shipping-cost guide</a> for carrier inputs.</p><p><strong>Further reading and method:</strong> <a href="https://shipperhq.com/blog/maximizing-ecommerce-profits-with-strategic-free-shipping">Industry source</a>. ShipperHQ discusses shipping eligibility, merchant cost and threshold strategy. The basket and traffic comparisons here are hypothetical; external conversion statistics are not adopted as promises.</p></section><h2 id="faqs">FAQs</h2>
<h3 id="should-i-set-the-threshold-just-above-my-current-average-order-value">Should I set the threshold just above my current average order value?</h3>
<p>That can give you a candidate amount to test, but first check its contribution with the eligible products and shipping costs. Your current average does not show what the baskets that qualify for the new offer will contain.</p>
<h3 id="why-does-the-formula-use-52-of-basket-value">Why does the formula use 52% of basket value?</h3>
<p>The example removes 45% product cost and a 3% payment fee from merchandise revenue. The remaining 52% then has to cover shipping, the other order costs and the chosen contribution goal.</p>
<h3 id="what-if-a-discount-takes-the-basket-below-the-threshold">What if a discount takes the basket below the threshold?</h3>
<p>Check the qualification rule in your platform and test the combined checkout. Use the discounted amount actually paid in the profitability worksheet, whatever threshold rule the promotion uses.</p>
<h3 id="how-do-i-compare-paid-shipping-with-free-shipping">How do I compare paid shipping with free shipping?</h3>
<p>Include the customer shipping charge in paid-order revenue and subtract the full carrier cost in both cases. This keeps the $40 merchandise basket comparable with the $55 qualifying basket.</p>
<h3 id="what-if-a-customer-adds-a-heavy-low-margin-item">What if a customer adds a heavy, low-margin item?</h3>
<p>Recalculate product cost, parcel cost and any additional packing time for that basket. The original $51.93 minimum assumes the stated 45% product cost and $8 carrier expense.</p>
<h3 id="what-should-i-track-after-launching-the-offer">What should I track after launching the offer?</h3>
<p>Compare completed basket groups, contribution per order, carrier cost, returns and fulfillment time. Record orders below and above the threshold separately before combining them into a monthly average.</p>
<h3>Should the payment fee include the shipping charge paid by the customer?</h3><p>Use the actual processor fee base. In the example the fee applies to merchandise plus customer-paid shipping, so the original order incurs 3% of $55 rather than 3% of $50.</p><h3>What metric should I use besides average order value?</h3><p>Compare realized contribution per eligible visitor or a matched customer cohort, including product mix, carrier cost, acquisition and returns. A higher AOV can coexist with lower contribution.</p><h2 id="takeaways">Takeaways</h2>
<ul>
<li>Calculate from discounted merchandise revenue and the eligible product mix.</li>
<li>Include the carrier bill even when checkout says shipping is free.</li>
<li>Test heavier baskets, low-margin products and return costs.</li>
<li>Review completed-order contribution alongside the dispatch workload.</li>
</ul>
<p>See the <a href="/blogs/ecommerce-shipping-costs/">ecommerce shipping cost guide</a>, <a href="/blogs/ecommerce-return-cost-per-order/">return cost per order guide</a> and <a href="/blogs/how-to-price-products-for-ecommerce/">ecommerce pricing guide</a>. More examples are in the <a href="/blogs/">business guides</a>.</p>
`,faq:[{q:`Should I set the threshold just above my current average order value?`,a:`That can give you a candidate amount to test, but first check its contribution with the eligible products and shipping costs. Your current average does not show what the baskets that qualify for the new offer will contain.`},{q:`Why does the formula use 52% of basket value?`,a:`The example removes 45% product cost and a 3% payment fee from merchandise revenue. The remaining 52% then has to cover shipping, the other order costs and the chosen contribution goal.`},{q:`What if a discount takes the basket below the threshold?`,a:`Check the qualification rule in your platform and test the combined checkout. Use the discounted amount actually paid in the profitability worksheet, whatever threshold rule the promotion uses.`},{q:`How do I compare paid shipping with free shipping?`,a:`Include the customer shipping charge in paid-order revenue and subtract the full carrier cost in both cases. This keeps the $40 merchandise basket comparable with the $55 qualifying basket.`},{q:`What if a customer adds a heavy, low-margin item?`,a:`Recalculate product cost, parcel cost and any additional packing time for that basket. The original $51.93 minimum assumes the stated 45% product cost and $8 carrier expense.`},{q:`What should I track after launching the offer?`,a:`Compare completed basket groups, contribution per order, carrier cost, returns and fulfillment time. Record orders below and above the threshold separately before combining them into a monthly average.`}]};export{e as default};