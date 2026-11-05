import {twelveDayDay2Drafts} from './twelveDayDay2.js';
export const day2PublicationDate='2026-11-05';
export const day2ExistingAdditions={
  "operating-cash-flow": "<h2 id=\"choose-cash-flow-or-capital\">Operating cash flow or operating capital: choose the right calculation</h2><p>Operating cash flow measures included operating cash generated during a period. Operating working capital is a defined balance of operating current assets less operating current liabilities at a date. Use the <a href=\"/blogs/how-to-calculate-working-capital/\">working-capital guide</a> for account boundaries; use the direct and indirect reconciliations above for the cash-flow calculation. Borrowing, total cash change and operating capital are not interchangeable names for OCF.</p>",
  "operating-expenses": "<h2 id=\"payroll-cogs-or-opex\">Is payroll an operating expense or part of COGS?</h2><p>Classify payroll by the work and the reporting policy, not simply by the fact that an employee was paid. Under this article’s separate COGS/OPEX convention, directly attributable production payroll may enter inventory or COGS, while administrative payroll belongs in the separate OPEX subtotal. The applicable accounting basis and actual duties determine the treatment.</p><p>In an independent illustration, a $12,000 payroll consists of $9,000 production work and $3,000 administration. Allocate those amounts once according to the documented basis; do not put the entire $12,000 into OPEX and then add $9,000 again to COGS. This separate classification example does not change the $18,000 OPEX schedule above. Payment dates also do not determine the recognition period: reconcile unpaid payroll and accruals using the <a href=\"/blogs/operating-cash-flow/\">operating-cash reconciliation</a>.</p>",
  "rolling-forecast": "<h2 id=\"sales-evidence-before-reforecast\">Build the sales-demand evidence before changing the rolling forecast</h2><p>Use the <a href=\"/blogs/sales-forecast-small-business/\">small-business sales forecast</a> to document unit demand, net prices and practical delivery capacity before revising the dated driver rows. Keep the original forecast version, the new assumption and its evidence separate. The existing workbook still owns the rolling cutoff and month matching; the sales-demand guide supplies assumptions rather than replacing that logic.</p>"
};
export const day2ExistingSlugs=new Set(Object.keys(day2ExistingAdditions));
const nextDecisions={
 'landscaping-working-capital':'If the seasonal gap exposes a larger operating constraint, use the <a href="/blogs/business-feasibility-study/">feasibility study</a> to separate demand, capacity and funding conditions.',
 'small-business-ideas':'After selecting an offer, follow the <a href="/blogs/how-to-start-small-business/">startup roadmap</a>. For a client engagement, use the <a href="/blogs/business-proposal-template/">proposal and delivery-cost record</a> before committing to scope.',
 'how-to-start-small-business':'Use the <a href="/blogs/business-model-canvas/">worked business model canvas</a> to connect the offer and delivery system, then test unresolved conditions in a <a href="/blogs/business-feasibility-study/">feasibility study</a>.',
 'business-model-canvas':'The <a href="/blogs/business-feasibility-study/">feasibility study</a> tests whether the model can proceed; <a href="/blogs/small-business-strategic-planning/">strategic planning</a> records which customers and resource priorities the business will choose.',
 'business-proposal-template':'When demand for the engagement grows, compare <a href="/blogs/business-growth-strategies/">growth options</a> against delivery capacity before promising a wider scope.',
 'business-growth-strategies':'Translate an approved growth choice into <a href="/blogs/business-goals/">measurable business goals</a>, and record the resource trade-off in the <a href="/blogs/small-business-strategic-planning/">strategic plan</a>.',
 'business-feasibility-study':'If a revised model passes the decision conditions, continue with the <a href="/blogs/how-to-start-small-business/">launch roadmap</a>; use the <a href="/blogs/landscaping-working-capital/">seasonal funding case</a> for an example of dated operating cash needs.',
 'business-goals':'Choose the underlying <a href="/blogs/business-growth-strategies/">growth mechanism</a> before assigning an activity target. The <a href="/blogs/small-business-strategic-planning/">strategy example</a> shows how to prioritize scarce resources.',
 'small-business-strategic-planning':'Use the <a href="/blogs/business-goals/">goal-to-driver record</a> to assign ownership after making the strategic choice. The <a href="/blogs/business-growth-strategies/">growth comparison</a> tests the cost of added capacity.'
};
export const twelveDayDay2Posts=twelveDayDay2Drafts.map(p=>{
 let html=p.html;
 html=html.replaceAll('<img src="/images/diagrams/day2','<img style="max-width:100%;height:auto" src="/images/diagrams/day2');
 html=html.replace('<h2 id="worksheet">','<p>'+nextDecisions[p.slug]+'</p><h2 id="worksheet">');
 if(p.slug==='small-business-strategic-planning')html=html.replace('</ul>', '<li><a href="https://extension.unr.edu/publication.aspx?PubID=4061">University of Nevada, Reno Extension: strategic planning</a></li></ul>');
 return {...p,seoTitle:p.slug==='small-business-ideas'?'Small Business Ideas: Demand and Costs':p.seoTitle,tag:p.slug==='landscaping-working-capital'?'Landscaping':'Break-Even Concepts',primaryKeyword:p.slug==='small-business-strategic-planning'?'small business strategic planning':p.primaryKeyword,editorialStatus:'published',published:day2PublicationDate,modified:day2PublicationDate,imageCaption:'AI-created topic illustration. Financial cases are original fictional teaching examples.',html};
});
export function applyDay2PublicationReview(post){
 const addition=day2ExistingAdditions[post.slug];
 if(!addition || post.html.includes(addition))return post;
 if(post.modified>'2026-10-25')throw Error('Day 2 existing page is protected: '+post.slug);
 return {...post,modified:day2PublicationDate,html:post.html+addition};
}
