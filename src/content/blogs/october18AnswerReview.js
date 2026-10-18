// Reuse verified examples on four existing URLs; remove their displaced quick answers.
const settings = {
 'restaurant-labor-cost-percentage': {
  id:'restaurant-labor-formula', heading:'Restaurant labor cost percentage: formula and example',
  answer:'<p><strong>Labor cost percentage = loaded labor expense ÷ sales × 100.</strong> Use the same reporting period and state which wages, employer payroll costs, benefits and owner compensation are included.</p><p>In the fictional USD month below, $16,000 wages + $2,000 employer costs and benefits = <strong>$18,000 loaded labor</strong>. Divide by $60,000 sales: <strong>30% labor cost</strong>. The denominator is sales, not total expenses; it must be positive for a meaningful percentage.</p><p>A guaranteed shift can remain payable when sales fall. A ratio alone does not tell you which hours can be removed or whether service capacity fits the plan. <a href="#loaded-labor-method">Follow the payroll and schedule reconciliation</a>.</p>',
  oldHeading:'<h2>How to calculate restaurant labor cost percentage</h2>',newHeading:'<h2 id="loaded-labor-method">How to calculate restaurant labor cost percentage</h2>',
 },
 'restaurant-food-cost-percentage': {
  id:'restaurant-food-formula',heading:'Restaurant food cost percentage: inventory formula',
  answer:'<p><strong>Food cost percentage = (beginning food inventory + food purchases − ending food inventory) ÷ food sales × 100.</strong> Match the inventory counts, purchases and food sales to the same period and use consistent inventory values.</p><p>In the fictional USD example below, $8,000 beginning inventory + $18,000 purchases − $6,000 ending inventory = <strong>$20,000 food used</strong>. Divide by $60,000 food sales: <strong>33.33% actual food cost</strong>. Food sales must be positive; a food-only numerator should not be divided by food-plus-beverage sales.</p><p>This period-level actual food cost differs from the theoretical ingredient cost of one recipe. Neither includes payroll or every operating expense. <a href="#food-cost-inventory-method">Follow the inventory example and recipe-cost comparison</a>.</p>',
  oldHeading:'<h2>The inventory formula and a complete example</h2>',newHeading:'<h2 id="food-cost-inventory-method">The inventory formula and a complete example</h2>',
 },
 'operating-leverage-small-business': {
  id:'operating-leverage-formula',heading:'Operating leverage formula: contribution divided by operating profit',
  answer:'<p><strong>Degree of operating leverage (DOL) = total contribution margin ÷ operating profit</strong> at a stated starting sales level. For the positive-profit interpretation used here, contribution is sales less variable costs, and operating profit is contribution less fixed operating costs.</p><p>The fictional USD month below has $14,400 contribution and $2,400 operating profit: <strong>DOL = 6</strong>. With unchanged price, variable cost per unit, sales mix and fixed costs inside the same operating range, a 10% volume change produces a 60% operating-profit change from that starting point. It does not predict sales or cash.</p><p>At zero operating profit the ratio is undefined. At a loss, do not interpret a negative ratio as the same positive-profit sensitivity measure; near zero profit, small input changes can make the ratio unstable. <a href="#calculate-it-from-a-real-cost-structure">Review the full assumptions and capacity limits</a>.</p>',
  moveTable:true,
 },
 'contribution-margin-vs-profit-margin': {
  id:'contribution-profit-comparison',heading:'Contribution margin vs profit margin: which costs are included?',
  answer:'<ul><li><strong>Contribution margin ratio:</strong> (sales − variable costs) ÷ sales × 100.</li><li><strong>Operating profit margin:</strong> operating profit ÷ sales × 100; the simplified example subtracts variable costs and fixed operating expenses.</li><li><strong>Net profit margin:</strong> net profit after the applicable nonoperating items, interest and tax ÷ sales × 100.</li></ul><p>In the fictional USD month below, $20,000 sales − $12,000 variable costs = <strong>$8,000 contribution (40%)</strong>. After $5,000 fixed operating expenses, operating profit is <strong>$3,000 (15%)</strong>. The separate assumed $400 interest and $600 tax leave <strong>$2,000 net profit (10%)</strong>. These are three different measures from one stated cost boundary, not three names for the same available cash.</p><p>Use positive sales for the percentages, a consistent period and an explicit labor/owner-pay classification. <a href="#reconcile-contribution-with-operating-profit">Follow the complete reconciliation and classification examples</a>.</p>',
  moveTable:true,
 },
};
export function applyOctober18AnswerReview(post){
 const s=settings[post.slug];if(!s)return post;
 if(post.answerHtml)throw Error(`Early answer already exists: ${post.slug}`);
 let html=post.html;
 const quickBlock=/<blockquote>\s*(?:<p>)?<strong>Quick answer:<\/strong>[\s\S]*?<\/blockquote>/;
 const quickParagraph=/<p><strong>Quick answer:<\/strong>[\s\S]*?<\/p>/;
 const quick=quickBlock.test(html)?quickBlock:quickParagraph;
 if(!quick.test(html))throw Error(`Quick answer changed: ${post.slug}`);
 html=html.replace(quick,'');
 if(s.oldHeading){if(!html.includes(s.oldHeading))throw Error(`Method heading changed: ${post.slug}`);html=html.replace(s.oldHeading,s.newHeading);}
 let table='';
 if(s.moveTable){const found=html.match(/<div class="article-table-scroll"><table>[\s\S]*?<\/table><\/div>/);if(!found)throw Error(`Example table missing: ${post.slug}`);table=found[0];html=html.replace(table,'');}
 return {...post,modified:'2026-10-18',answerHtml:`<h2 id="${s.id}">${s.heading}</h2>${s.answer}${table}`,html};
}
