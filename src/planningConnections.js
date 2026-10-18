// Curated next steps: each connection follows a specific decision in the source page.
const employee='/calculators/employee-cost-calculator/';
const cash='/calculators/cash-flow-forecast-template/';
const roi='/calculators/business-roi-calculator/';
const margin='/blogs/margin-vs-markup/#margin-calculator';
export const planningGuideConnections={
 'agency-retainer-pricing':[employee,'Check employee cost per productive hour','If staff deliver the retainer, budget recurring employer costs and productive hours before allocating that cost to client work. Keep payroll once in the combined monthly plan.'],
 'agency-scope-creep-cost':[employee,'Calculate the employee cost of productive delivery time','Use the productive-hour cost as one input to your scope review. Extra work consumes time even when an unchanged salary creates no additional immediate cash payment.'],
 'how-to-calculate-working-capital':[cash,'Build a dated 13-week cash flow forecast','A balance-sheet working-capital total does not tell you whether payroll is due before a customer pays. Enter expected bank dates to inspect the reserve gap.'],
 'how-to-calculate-days-sales-outstanding':[cash,'Test collection dates in the cash flow forecast template','DSO is an aggregate measure. Enter realistic dates for individual receipts and test a collection delay without treating the average as a promised payment date.'],
 'cash-flow-break-even-vs-profit-break-even':[cash,'Compare actual payment timing in a 13-week forecast','Use the dated cash schedule for payroll, supplier payments, financing and customer collections alongside the profit break-even calculation.'],
 'inventory-reorder-point-cash-flow':[cash,'Forecast inventory payments and customer collections','Place supplier payments and expected receipts on their bank dates. Include purchases once; do not add noncash cost recognition as a second cash payment.'],
 'agency-profit-margin':[margin,'Check margin versus markup on your defined cost basis','Compare the two denominators before interpreting a pricing percentage. The widget only includes its entered cost; a price margin is not automatically agency net profit.'],
 'ecommerce-profit-margin':[margin,'Calculate margin, markup and discount-adjusted price floors','Define the cost included in the widget, then reconcile selling fees, advertising and overhead separately before interpreting the result as whole-business profit.'],
};
export function connectPlanningGuide(post){
 const connection=planningGuideConnections[post.slug];
 if(!connection||post.html.includes(connection[0]))return post;
 const [href,label,context]=connection;
 return {...post,modified:'2026-10-13',html:post.html+`<h2 id="planning-next-step">Apply the next planning step</h2><p>${context} <a href="${href}">${label}</a>.</p>`};
}
export const planningToolConnections={
 'hourly-rate-calculator':[['Budget a hire separately from your freelance income goal',employee],['Check the dates billed work turns into cash',cash]],
 'cash-flow-forecast-template':[['Compare a project’s ROI before scheduling its receipts and payments',roi]],
 'cash-runway-calculator':[['Check investment return separately from constant-burn runway',roi],['Use dated receipts and payments in a 13-week cash forecast',cash]],
 'menu-pricing-calculator':[['Check the margin and markup denominators',margin]],
 'break-even-roas-calculator':[['Compare markup with margin before building an ad threshold',margin]],
 'employee-cost-calculator':[['Compare automation cash savings with released staff capacity',roi],['Explore agency staffing, delivery and cash planning','/guides/agency-business/']],
};
export function connectPlanningTool(slug,tool){
 const extra=planningToolConnections[slug];
 if(!extra)return tool;
 const related=[...(tool.related||[])],seen=new Set([tool.guide,...related.map(([,url])=>url)]);
 for(const link of extra)if(!seen.has(link[1])){related.push(link);seen.add(link[1]);}
 return {...tool,related};
}
