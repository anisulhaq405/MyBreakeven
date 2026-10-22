import React from 'react';

const notes = {
  landscaping:{title:'Budget landscaping overhead against productive hours', paragraphs:[
    'Start a monthly landscaping budget with completed services, crew-hours and the actual fixed commitments. Keep insurance, storage, administration and guaranteed payroll separate from costs that change with each job. Startup purchases and loan principal need their own cash schedule.',
    'In a separate fictional annual plan, $44,000 overhead divided by 1,600 productive worker-hours is $27.50 per hour to recover. At only 1,000 productive hours, the same commitment requires $44 per hour. Allocating overhead over optimistic hours does not lower the actual bill. These are planning assumptions, not market rates.',
    'Build seasonality month by month. Track available hours, weather, travel and service mix before multiplying an annual overhead rate by a job. Do not charge the same wage, equipment or travel allowance twice. Review estimated versus actual job costs and retain a dated original budget.',
  ],links:[['Check landscaping break-even and service mix','/blogs/landscaping-break-even/'],['Review job estimates against actual costs','/blogs/landscaping-job-costing-estimate-vs-actual/']]},
  ecommerce:{title:'Build an ecommerce budget from retained orders and payment dates',paragraphs:[
    'Budget net sales, product cost, fulfillment, shipping, selling fees, expected return losses and monthly commitments separately. Then add a dated cash view for opening stock, supplier deposits and processor payouts. A product margin is not the complete store budget.',
    'In a separate fictional month, 100 comparable orders at $60 generate $6,000 net sales. All included order-variable costs of $40 per order total $4,000, leaving $2,000 contribution. Deduct $1,500 fixed commitments once and the modeled operating result is $500. Owner compensation, tax and financing need explicit treatment rather than being assumed included.',
    'The $500 operating result does not establish bank cash. Stock may have been paid for before this month and the next batch may be due before customer proceeds arrive. Reconcile inventory purchases with the cost consumed by sold orders, and carry actual payment dates into the cash forecast.',
  ],links:[['Check shipping cost and customer subsidy','/blogs/ecommerce-shipping-costs/'],['Build a dated cash forecast','/calculators/cash-flow-forecast-template/']]},
  detailing:{title:'Mobile detailing gross margin is not take-home profit',paragraphs:[
    'State which costs your gross margin includes before comparing a detailing business with a shop, supplier or software report. A vehicle purchase, chemicals, direct job labor, travel and monthly storage do not all belong in the same cost subtotal.',
    'In a separate fictional $200 job, assume the defined cost of service is $60, giving $140 gross profit and 70% gross margin. Another $20 of variable selling and travel expense reduces contribution to $120, or 60%. Both figures still precede the monthly fixed costs and any owner income not already included. These are illustrative definitions, not a typical detailing margin.',
    'Use actual invoices, paid job time and route records. Include travel once, distinguish financed vehicle principal from operating expense, and compare contribution per occupied hour as well as per appointment. A higher ticket can leave less daily contribution when it consumes more time.',
  ],links:[['Check detailing profitability and route costs','/blogs/is-mobile-detailing-profitable/'],['Review vehicle and equipment startup cash','/blogs/mobile-detailing-business-startup-cost/']]},
};
export default function KeywordPlanningNotes({industry}) {
  const n=notes[industry]; if(!n)return null;
  return <section className="industry-copy" aria-labelledby={'budget-notes-'+industry}><h2 id={'budget-notes-'+industry}>{n.title}</h2>{n.paragraphs.map(p=><p key={p}>{p}</p>)}<ul>{n.links.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>;
}
