export function applyKeywordToolReview(slug,tool) {
  if(slug!=='break-even-roas-calculator')return tool;
  return {...tool, reviewed:'2026-10-22', sections:[...tool.sections,{
    id:'be-roas-cost-boundary', title:'BE ROAS versus a product gross-margin shortcut',
    paragraphs:[
      'BE ROAS, also written BEROAS, means break-even return on ad spend. Start with contribution before advertising when payment fees, shipping subsidy and other order-dependent costs must also be recovered. A product-only gross-margin shortcut can understate the required ad return.',
      'In a separate fictional $100 order, product cost is $40, so the product-only gross margin is 60% and its reciprocal is 1.67×. Add $15 fulfillment and shipping, a $5 expected unrecovered return allowance and a $3 payment fee. Full pre-ad contribution becomes $37, or 37%, requiring 2.702702…× ROAS before fixed overhead. At 2× ROAS, attributed revenue of $2,000 against $1,000 spend leaves $2,000 × 0.37 − $1,000 = −$260 contribution after ads.',
      'Use net revenue and a consistent return-cost definition so refunds or recovered inventory are not counted twice. This example assumes the stated $5 is additional unrecovered cost outside the already-defined net revenue. The calculator does not independently validate attribution, demand, repeat-customer value or your refund records.',
    ],
    links:[{label:'Review the full order-profit boundary',href:'/blogs/ecommerce-profit-margin/'}],
  }]};
}
