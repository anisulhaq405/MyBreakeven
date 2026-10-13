const plans={
 'margin-vs-markup':{
  seoTitle:'Margin vs Markup: Calculator & Formula',
  title:'Margin vs Markup: Calculator, Formula & Examples',
  description:'Calculate margin and markup, compare discounts and find the selling price for your target. Use worked examples and clear formulas on one cost basis.',
  metaDescription:'Calculate margin and markup, compare discounts and find the selling price for your target. Use worked examples and clear formulas on one cost basis.',
  sectionLinks:[['margin-calculator','Calculator'],['margin-markup-formulas','Formulas'],['margin-markup-examples','Worked examples'],['margin-markup-spreadsheet','Spreadsheet worksheet'],['guide-faqs','FAQs']],
 },
 'how-to-calculate-cost-of-goods-sold':{
  seoTitle:'How to Calculate Cost of Goods Sold (COGS)',
  sectionLinks:[['quick-answer','COGS formula'],['worked-example','Worked example'],['returns-and-freight','Returns and freight'],['costing-methods','Costing methods'],['spreadsheet','Spreadsheet worksheet'],['guide-faqs','FAQs']],
 },
 'how-to-calculate-working-capital':{
  seoTitle:'How to Calculate Working Capital (Example)',
  sectionLinks:[['quick-answer','Working capital formula'],['worked-balance-sheet','Balance-sheet example'],['ratios','Current and quick ratios'],['dated-cash-test','Payment-date cash test'],['spreadsheet','Spreadsheet worksheet'],['guide-faqs','FAQs']],
 },
 'how-to-calculate-days-sales-outstanding':{
  seoTitle:'How to Calculate Days Sales Outstanding (DSO)',
  title:'How to Calculate Days Sales Outstanding (DSO)',
  sectionLinks:[['quick-answer','DSO formula'],['quarterly-example','Worked example'],['monthly-annual','Monthly and annual DSO'],['aging-versus-dso','DSO versus invoice aging'],['spreadsheet','Spreadsheet worksheet'],['guide-faqs','FAQs']],
 },
};
export function optimizeNewContent(post){
 const plan=plans[post.slug];
 if(!plan)return post;
 let html=post.html;
 if(post.slug==='margin-vs-markup'){
  html=html.replace('<h2>The direct answer</h2>','<h2 id="margin-markup-formulas">The margin and markup formulas</h2>')
   .replace('<h2>Worked examples: converting margin and markup</h2>','<h2 id="margin-markup-examples">Worked examples: converting margin and markup</h2>');
  html+='<h2 id="discount-target-price">Preserve a target margin after a planned discount</h2><p>If cost is $70 and the target margin is 30%, the required collected selling price is $100. To offer 20% off while retaining that price, the list price is $100 ÷ 0.80 = $125. Marking a $100 item down by 20% instead collects $80, leaving $10 and a 12.5% margin on the same $70 cost.</p><p>The <a href="#margin-calculator">markup versus margin calculator</a> rounds a target selling-price floor upward to cents, then rounds the discount-adjusted list-price floor upward. Recheck the collected price against the defined cost. At a 100% discount, no finite list price can collect a positive target selling price. These price floors do not predict demand or extra sales.</p><p>For the basic denominator distinction, see <a href="https://www.accountingcoach.com/blog/gross-margin-markup">AccountingCoach’s margin and markup explanation</a>. The discount-adjusted list-price example above is an original application of the stated formulas.</p>';
 }
 return {...post,...plan,html,modified:'2026-10-13'};
}
