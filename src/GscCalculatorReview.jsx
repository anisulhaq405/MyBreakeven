import React from 'react';
import './gsc-review.css';
export default function GscCalculatorReview({kind}){
 if(!['roas','landscaping'].includes(kind))return null;
 return <section className="gsc-calculator-review" id={`gsc-calculator-${kind}`} aria-labelledby={`gsc-calculator-${kind}-title`}>
  <h2 id={`gsc-calculator-${kind}-title`}>{kind==='roas'?'Break-even ROAS, target ROAS or profit: choose the right result':'How to do break-even analysis for a landscaping business'}</h2>
  {kind==='roas'?<>
   <p><strong>Break-even ROAS = 1 ÷ contribution margin ratio before advertising.</strong> With the fictional default $80 order, $44 direct cost and 3% fee, pre-ad contribution is $33.60, or 42%. Break-even ROAS is 2.380952…×; its displayed 2.38× is rounded, so use the unrounded calculation when checking the boundary.</p>
   <div className="gsc-review-scroll" role="region" aria-label="Advertising measures compared" tabIndex="0"><table><caption>Same fictional order economics, three different questions</caption><thead><tr><th scope="col">Measure</th><th scope="col">Calculation / result</th><th scope="col">What it answers</th></tr></thead><tbody>
    <tr><th scope="row">Break-even ROAS</th><td>1 ÷ 0.42 = 2.380952…×</td><td>Revenue/ad spend needed to cover the defined direct costs and ads, before fixed overhead.</td></tr>
    <tr><th scope="row">ROAS for a 10% post-ad margin</th><td>1 ÷ (0.42 − 0.10) = 3.125×</td><td>The stated contribution target before fixed overhead. It requires pre-ad margin above the chosen target.</td></tr>
    <tr><th scope="row">Remainder at 4× ROAS</th><td>$4,000 × 42% − $1,000 = $680</td><td>Dollars left after entered direct costs, percentage fees and ads; not business net profit.</td></tr>
   </tbody></table></div>
   <p>A 4× dashboard return can still leave little after rent, payroll commitments or refunds outside its attribution window. Match attributed revenue, refunds and ad spend to one cohort. Do not count the same advertising cost both in direct order cost and in the separate ad-spend input.</p>
   <p>Use <a href="/blogs/contribution-margin-vs-profit-margin/">the contribution-to-profit reconciliation</a> to define the cost boundary. For returned orders, check <a href="/calculators/ecommerce-return-cost-calculator/">the return allowance</a>. For the whole store’s monthly target, use <a href="/calculators/ecommerce-break-even-calculator/">ecommerce break-even planning</a>. This calculator does not certify platform attribution or predict campaign demand.</p>
  </>:<>
   <p>Define one completed landscaping job, calculate the contribution it leaves, then divide the commitments for the same period by that contribution. Separate the operating threshold from owner coverage and an extra profit goal. Finally check crew hours, owner hours and the active earning season.</p>
   <p>For a separate fictional USD teaching case, a $500 job with $300 of fully specified variable cost leaves $200 contribution. Monthly fixed operating costs of $4,000 need <strong>20 jobs</strong>. If a separate $3,000 owner allocation and $1,000 extra target are not already included, the full goal needs ($4,000 + $3,000 + $1,000) ÷ $200 = <strong>40 jobs</strong>. At 39 jobs, contribution is $7,800 and the full plan is $200 short. These teaching inputs are independent of the live form above.</p>
   <p>If each job needs six total crew-worker-hours and 180 crew-worker-hours are available, the crew can deliver only 30 jobs. The 40-job target therefore does not fit, even before checking owner time or equipment. If all 12 months of these commitments must be recovered in eight earning months with zero off-season contribution, the same simplified full goal requires 60 jobs per active month. Neither arithmetic target proves customer demand.</p>
   <p>Refine delivery assumptions using <a href="/blogs/landscaping-job-costing-estimate-vs-actual/">estimated versus actual job costs</a> and <a href="/blogs/landscaping-crew-utilization/">crew utilization</a>. Compare recurring route work in the <a href="/calculators/lawn-route-profit-calculator/">lawn route profit calculator</a>, and put customer collections and payroll dates into a <a href="/calculators/cash-flow-forecast-template/">cash forecast</a>. Avoid adding payroll or equipment cost twice when moving figures between these records.</p>
  </>}
  <p className="gsc-review-date">Decision guide and arithmetic reviewed <time dateTime="2026-11-20">November 20, 2026</time>.</p>
 </section>;
}
