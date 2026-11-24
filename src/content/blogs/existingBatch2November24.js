// Four existing intent owners. Keep their engines, covers and publication dates.
const originals=new Map();
export const restoreExistingBatch2=p=>originals.get(p.slug)||p;
export const batch2ReviewedSlugs=new Set(['how-much-does-it-cost-to-start-a-photography-business','mobile-detailing-business-startup-cost','break-even-formula-units-dollars','calculate-contribution-margin']);
const table=(caption,heads,rows)=>`<div class="article-table-scroll" role="region" aria-label="${caption}" tabindex="0"><table><caption>${caption}</caption><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${r[0]}</th>${r.slice(1).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const addId=(html,title,id)=>{
 const heading=[...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].find(m=>m[1]===title);
 if(!heading)throw Error('Missing reviewed heading: '+title);
 // Keep older fragment destinations whenever they already exist.
 const current=heading[0].match(/id="([^"]+)"/)?.[1];
 return {html:current?html:html.replace(heading[0],`<h2 id="${id}">${title}</h2>`),id:current||id};
};
export function applyExistingBatch2November24(p){
 if(!batch2ReviewedSlugs.has(p.slug))return p;
 originals.set(p.slug,p);
 const a={...p,modified:'2026-11-24'};
 if(p.slug==='how-much-does-it-cost-to-start-a-photography-business'){
  a.seoTitle='Photography Startup Costs: Gear & Cash Budget';
  a.description=a.metaDescription='Build a photography startup budget for gear, setup and opening cash. Compare owned equipment, home and studio examples, then calculate monthly booking targets.';
  a.answerHtml='<h2 id="quick-answer">How much does it cost to start a photography business?</h2><p>Start with purchases you still need, setup payments and cash required before clients pay. In this guide\'s fictional portrait budget, <strong>$6,550 setup + $1,790 chosen cash cushion = $8,340 opening cash</strong>. Already owning the listed camera, two lenses and computer removes $5,100 of new purchases: $1,450 remaining setup + $1,790 cushion = <strong>$3,240</strong>. These are two versions of one stated example, not an industry range or a minimum budget.</p><p>The cash cushion is a chosen planning amount, not a recommended reserve. Owner living costs, backup needs, taxes and missing commitments can raise the requirement. <a href="#photography-already-owned-kit">Check the owned-gear calculation</a> or <a href="#photography-startup-cost-method">build the complete cost list</a>.</p>'+p.answerHtml;
  a.html=p.html.replace('Monthly break-even should cover recurring fixed costs, owner pay, and a clearly stated target profit.','Keep operating break-even separate from a funding target that also includes owner pay, a replacement reserve or additional profit.');
  const answer='Keep equipment purchase cash and loan principal in a separate cash schedule. Do not treat the entire loan payment as an operating expense. Interest, depreciation and any chosen replacement reserve have different purposes; count each only under the stated model boundary. The calculator’s owner-pay and target-profit fields add income goals beyond operating break-even.';
  a.faq=p.faq.map(f=>f.q==='Does break-even include my photography gear?'?{...f,a:answer}:f);
  a.html+='<h2 id="photography-startup-next">Turn the startup budget into a deliverable monthly plan</h2><p>The <a href="/calculators/photography-business-break-even-calculator/">photography calculator</a> tests monthly contribution and worker-hour capacity; it does not calculate the opening cash listed here. Use <a href="/blogs/photography-cost-per-session-editing/">shooting, editing and delivery costs</a> for the booking inputs, and <a href="/blogs/photography-business-profit-margin/">the monthly profit-margin reconciliation</a> for what remains after overhead and the stated owner goal. The <a href="/guides/photography-business/">photography planning collection</a> connects these existing decisions.</p>';
  a.sectionLinks=[['quick-answer','Opening cash answer'],['photography-already-owned-kit','Already own gear?'],['photography-startup-comparison','Compare setups'],['photography-startup-cost-method','Itemize costs'],['photography-cost-sources','Quotes and cash boundaries'],['photography-startup-next','Monthly booking plan']];
 }
 if(p.slug==='mobile-detailing-business-startup-cost'){
  a.description=a.metaDescription='Compare mobile detailing startup costs for an owned vehicle or financed van. Separate equipment cash, reserves, debt payments and monthly job targets.';
  const comparison=table('Three existing fictional detailing setups; USD; opening reserves are separate',['Setup','Listed opening subtotal','Monthly funding target','Contribution per job','Whole jobs needed'],[
   ['Owned vehicle; includes $8,500 preparation allowance','$13,000','$4,000','$153','27'],
   ['Financed van and equipment','$15,900','$7,290','$225','33'],
   ['Two-person operation','$36,000','$12,550','$270','47']
  ]);
  a.answerHtml='<h2 id="quick-answer">How much cash do you need to start mobile detailing?</h2><p>Price the vehicle work and equipment you actually need, then add setup payments and a separate opening reserve. <strong>An equipment kit is not the total startup budget.</strong> In the owned-vehicle example below, the non-refurbishment setup lines total $4,500; an additional illustrative $8,500 preparation/repair allowance brings the subtotal to $13,000. Remove that allowance only if an inspection and your service requirements justify doing so. Neither subtotal includes a separately chosen opening reserve.</p>'+comparison+'<p>The financed cases include debt service and a surplus goal in their monthly funding targets. These are <strong>cash-funding targets, not accounting operating break-even</strong>. Compare loan principal, interest and operating costs separately. Required jobs do not forecast demand or prove that travel and delivery hours fit.</p>'+p.answerHtml;
  const c=addId(p.html,'The direct answer: separate opening cash from monthly break-even','detailing-opening-cash');a.html=c.html;
  a.html+='<h2 id="detailing-startup-checklist">Check the budget before buying the rig</h2><ol><li>Get itemized quotes and list what you already own. Check the condition, load and service requirements of the actual vehicle.</li><li>Separate purchase price, financing proceeds/down payment and later loan payments. Do not charge the same financed purchase twice.</li><li>Prepare a dated opening cash plan. The main outright-purchase example is $26,400 setup + $2,000 chosen reserve = $28,400; that reserve is an assumption, not a universal recommendation.</li><li>Calculate the contribution and occupied worker-hours for the service mix. Required jobs must fit driving, refill, setup and cleanup as well as paid detailing time.</li></ol><p>Use <a href="/calculators/mobile-detailing-break-even-calculator/">the monthly detailing planner</a> for contribution and capacity, <a href="/calculators/mobile-detailing-travel-profit-calculator/">travel profit</a> for route economics, and <a href="/calculators/detailing-chemical-cost-calculator/">chemical cost per car</a> for one job-cost input. Continue through the <a href="/guides/mobile-detailing-business/">mobile detailing planning collection</a>. Opening a calculator does not copy the budgets from this guide.</p>';
  a.sectionLinks=[['quick-answer','Startup cost answer'],[c.id,'Opening cash list'],['detailing-startup-scenarios','Compare three setups'],['position-recovery-mobile-detailing-business-startup-cost','Buy vs rent'],['detailing-startup-checklist','Before buying equipment']];
 }
 if(p.slug==='break-even-formula-units-dollars'){
  a.seoTitle='Break-Even Point Formula: Units & Sales';
  a.description=a.metaDescription='Use the break-even point formula for units and sales revenue. Compare contribution dollars vs ratio, whole-unit rounding and a $12,000 fixed-cost example.';
  const match=p.html.match(/<h2 id="break-even-formula-quick-reference">[\s\S]*?(?=<h2\b)/);
  if(!match)throw Error('Missing formula quick reference');
  a.html=p.html.replace(match[0],'').replace(/<blockquote>[\s\S]*?<\/blockquote>/,'');
  const matrix=table('Choose the formula for the question you are answering',['Question','Formula','Fictional same-price example'],[
   ['How many units cover operating fixed costs?','Fixed costs ÷ contribution dollars per unit','$12,000 ÷ ($50 − $30) = 600 units'],
   ['How much sales revenue covers those costs?','Fixed costs ÷ contribution ratio','$12,000 ÷ 0.40 = $30,000 sales'],
   ['How many units also fund $2,000 target profit?','(Fixed costs + target profit) ÷ contribution dollars per unit','$14,000 ÷ $20 = 700 units']
  ]);
  a.answerHtml='<h2 id="quick-answer">What is the break-even point formula?</h2><p><strong>Break-even units = fixed costs ÷ (selling price − variable cost per unit).</strong> For sales revenue, divide fixed costs by the contribution margin ratio, expressed as a decimal. A $50 price and $30 variable cost leave $20 contribution, or 40% (0.40). Dividing $12,000 by $20 gives <strong>600 units</strong>; dividing by 0.40 gives <strong>$30,000 sales</strong>. Do not divide fixed costs by 40 instead of 0.40.</p>'+matrix+match[0];
  a.html+='<h2 id="formula-next-decision">Choose the existing guide for your next question</h2><p>This page is the formula reference. Use the <a href="/blogs/calculate-break-even-point/">step-by-step break-even calculation</a> to assemble inputs and verify neighboring whole-unit results; use the <a href="/blogs/break-even-analysis-example/">worked break-even analysis and chart</a> to see the result explained. Calculate the denominator with <a href="/blogs/calculate-contribution-margin/">contribution per unit and ratio</a>, or use the <a href="/blogs/target-profit-sales-formula/">target-profit sales formula</a> when the question includes additional profit. A contribution ratio must be positive to cover positive fixed costs under this model.</p>';
  a.sectionLinks=[['quick-answer','Units vs sales formulas'],['break-even-formula-quick-reference','Assumptions'],['exact-versus-whole-sales','Exact vs whole sales'],['day6-20261111-break-even-formula-units-dollars','Price and cost limits'],['formula-next-decision','Apply the formula']];
 }
 if(p.slug==='calculate-contribution-margin'){
  const summary=table('The unchanged calculator example: USD; 100 matching orders',['Measure','Calculation','Result'],[
   ['Other variable cost plus fees per order','$25 + ($50 × 3%) + $0.30','$26.80'],
   ['Contribution per order','$50 − $26.80','$23.20'],
   ['Contribution margin ratio','$23.20 ÷ $50 × 100','46.4%'],
   ['Contribution from 100 identical orders','100 × $23.20','$2,320']
  ]);
  a.answerHtml='<h2 id="quick-answer">How do you calculate contribution margin?</h2><p><strong>Contribution margin = net sales − variable costs.</strong> Calculate per-unit contribution for one product, order or job; divide it by that unit\'s selling price for the ratio. Multiply by a matching quantity for total contribution. In the calculator\'s fictional example, a $50 order with $25 other variable costs, a 3% fee and one $0.30 transaction fee leaves <strong>$23.20 contribution, or 46.4%</strong>. One hundred identical orders contribute $2,320 before monthly fixed costs.</p>'+summary+'<p><a href="#contribution-calculator">Use the calculator</a> or <a href="#contribution-cost-boundaries">check which costs belong in the formula</a>. A flat checkout fee belongs once per transaction: allocate it when the chosen unit is an item in a multi-item order. Contribution is not net profit.</p>';
  a.html=p.html+'<h2 id="contribution-next-decision">Use the result without changing its meaning</h2><p>Use <a href="/blogs/contribution-margin-income-statement/">the contribution income statement</a> to deduct monthly fixed operating costs once. Use the <a href="/blogs/break-even-formula-units-dollars/">break-even formula reference</a> to solve the sales threshold, or <a href="/blogs/contribution-margin-vs-profit-margin/">contribution versus profit margin</a> to compare their different cost boundaries. Keep the <a href="#reconcile-contribution-for-a-mixed-product-month">weighted sales-mix calculation</a> when products differ; multiplying one item\'s ratio across a different basket is not a valid shortcut.</p>';
  a.sectionLinks=[['quick-answer','Unit, ratio and total'],['contribution-calculator','Calculator'],['contribution-cost-boundaries','Formula and costs'],['contribution-margin-ratio-formula','Ratio formula'],['reconcile-contribution-for-a-mixed-product-month','Mixed-product totals'],['day6-20261111-calculate-contribution-margin','Allocate checkout fees']];
 }
 return a;
}
