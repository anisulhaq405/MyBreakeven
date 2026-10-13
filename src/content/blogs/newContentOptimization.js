const plans={
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
 return plan?{...post,...plan,modified:'2026-10-13'}:post;
}
