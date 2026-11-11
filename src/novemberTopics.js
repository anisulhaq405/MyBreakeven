// Explicit subject ownership. This navigation does not change article URLs or records.
import {blogListingData} from './blogListingData.js';
import {cleaningClusters} from './cleaningCluster.js';
import {landscapingClusters} from './landscapingCluster.js';
import {mobileDetailingClusters} from './mobileDetailingCluster.js';
import {salonClusters} from './salonCluster.js';
import {restaurantClusters} from './restaurantCluster.js';
import {photographyClusters} from './photographyCluster.js';
import {ecommerceClusters} from './ecommerceCluster.js';
import {agencyClusters} from './agencyCluster.js';
const topic=(id,title,description,slugs)=>({id,title,description,slugs:slugs.split('|'),href:`/blogs/#topic-${id}`});
export const businessTopics=[
 topic('business-launch','Business ideas and launch','Screen demand, choose a business model and turn evidence into a feasible launch.', 'small-business-ideas|online-business-ideas|business-model-canvas|business-feasibility-study|how-to-start-small-business|how-to-start-online-business|start-home-based-business|business-proposal-template'),
 topic('strategy-risk','Strategy, growth and risk','Connect goals to resources, evaluate growth choices and prepare a response when assumptions fail.', 'small-business-strategic-planning|business-goals|business-growth-strategies|business-risk-assessment|business-financial-contingency-plan'),
 topic('accounting-records','Bookkeeping and financial statements','Follow transactions through the ledger, accruals and statements before interpreting reported profit.', 'bookkeeping-small-business|accounting-cycle|general-ledger-template|accrual-accounting|accrued-expenses|assets-liabilities-equity|retained-earnings|how-to-analyze-financial-statements|ebitda-vs-net-income-vs-cash-flow|adjusted-ebitda-add-backs'),
 topic('receivables-payables','Receivables, payables and credit risk','Follow invoices, obligations, collections and expected credit losses through matching records.', 'accounts-receivable-vs-accounts-payable|accounts-receivable-process|allowance-doubtful-accounts|bad-debt-expense|accounts-payable-process|current-assets|current-liabilities'),
 topic('asset-depreciation','Assets and depreciation','Build an asset schedule, choose a supported method and reconcile accumulated depreciation.', 'depreciation-methods|straight-line-depreciation|accumulated-depreciation'),
 topic('cost-accounting','Cost accounting and cost behavior','Classify costs, trace work and reconcile allocation, volume effects and cost-control actions.', 'fixed-vs-variable-costs|product-costs-vs-period-costs|absorption-vs-variable-costing|cost-drivers-small-business|job-order-costing|activity-based-costing|average-cost-per-unit|marginal-cost|high-low-method|make-or-buy-decision|cost-control|cost-per-hire-vs-employee-cost'),
 topic('pricing-profitability','Pricing and customer profitability','Choose a pricing method, reconcile fees and test the contribution customers and orders leave.', 'pricing-strategies|cost-plus-pricing|margin-vs-markup|calculate-contribution-margin|contribution-margin-vs-gross-margin|contribution-margin-vs-profit-margin|customer-profitability-analysis|penetration-pricing|discount-break-even-sales-volume|how-many-customers-can-you-lose-after-raising-prices'),
 topic('break-even','Break-even and sales risk','Translate contribution into sales targets and test capacity, product mix and the sales cushion.', 'cost-volume-profit-analysis|calculate-break-even-point|break-even-formula-units-dollars|break-even-analysis-example|target-profit-sales-formula|margin-of-safety-business|operating-leverage-small-business|break-even-multiple-products-sales-mix|lower-break-even-point'),
 topic('budgets-performance','Budgets, forecasts and performance','Build a capacity-aware forecast and compare actual results with a consistent budget and cost basis.', 'sales-forecast-small-business|master-budget|rolling-forecast|flexible-budget-variance-analysis|contribution-margin-income-statement|operating-expenses|cost-performance-index'),
 topic('cash-inventory','Cash flow, working capital and stock','Reconcile cash movements, working-capital timing and available inventory before committing money.', 'cash-flow-statement|operating-cash-flow|cash-flow-problems|cash-flow-break-even-vs-profit-break-even|how-to-calculate-working-capital|small-business-inventory-management'),
 topic('investment-capital','Investment decisions and cost of capital','Compare dated project cash flows, recovery, required returns and funding constraints.', 'capital-budgeting|cost-benefit-analysis|payback-period|profitability-index|wacc|cost-of-equity|present-value-vs-future-value|ordinary-annuity-vs-annuity-due'),
 topic('retirement-refinance','Retirement and refinancing decisions','Separate long-term spending assumptions from loan terms, fees and refinancing recovery.', 'fire-vs-coast-fire-vs-barista-fire|fire-withdrawal-rate-retirement-risks|mortgage-refinance-break-even|refinance-closing-costs-financed-fees|refinance-shorter-vs-longer-term'),
 topic('ratios-marketing','Ratios and marketing returns','Use a consistent denominator and distinguish campaign revenue from profit and return.', 'find-missing-value-equivalent-ratios|equivalent-ratio-tables-word-problems|roas-vs-roi'),
];
const sectorSpecs=[['Cleaning','cleaning-business',cleaningClusters],['Landscaping','landscaping-business',landscapingClusters],['Mobile Detailing','mobile-detailing-business',mobileDetailingClusters],['Salon','salon-business',salonClusters],['Restaurant','restaurant-business',restaurantClusters],['Photography','photography-business',photographyClusters],['E-commerce','ecommerce-business',ecommerceClusters],['Agency','agency-business',agencyClusters]];
export const sectorTopics=sectorSpecs.map(([tag,id,groups])=>({id,title:`${tag} business`,description:`Follow ${tag.toLowerCase()} costs, pricing, capacity and cash decisions.`,href:`/guides/${id}/`,slugs:blogListingData.posts.filter(p=>p.tag===tag).map(p=>p.slug),groups}));
export const allGuideTopics=[...businessTopics,...sectorTopics];
export const novemberGuides=blogListingData.posts.filter(p=>p.published.startsWith('2026-11-')||p.modified.startsWith('2026-11-'));
export const novemberGuideSlugs=new Set(novemberGuides.map(p=>p.slug));
export function guideTopic(slug){return allGuideTopics.find(t=>t.slugs.includes(slug));}
const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
const bridges={'asset-depreciation':['assets-liabilities-equity','capital-budgeting'],'cash-inventory':['accounts-receivable-process','accounts-payable-process'],'receivables-payables':['how-to-calculate-working-capital'],'ratios-marketing':['customer-profitability-analysis','pricing-strategies']};
const sectorBridges={
 'cleaning-business':['cost-control','customer-profitability-analysis','sales-forecast-small-business'],
 'landscaping-business':['cost-control','business-financial-contingency-plan','cost-benefit-analysis'],
 'mobile-detailing-business':['marginal-cost','pricing-strategies','average-cost-per-unit'],
 'salon-business':['customer-profitability-analysis','pricing-strategies','sales-forecast-small-business'],
 'restaurant-business':['small-business-inventory-management','cost-control','average-cost-per-unit'],
 'photography-business':['cost-plus-pricing','customer-profitability-analysis','cost-per-hire-vs-employee-cost'],
 'ecommerce-business':['small-business-inventory-management','product-costs-vs-period-costs','penetration-pricing'],
 'agency-business':['accounts-receivable-process','customer-profitability-analysis','cost-control'],
};
export function topicConnections(article){
 if(!novemberGuideSlugs.has(article.slug))return null;
 const t=guideTopic(article.slug);if(!t)return null;
 const linked=new Set();
 for(const[,slug]of String((article.answerHtml||'')+' '+(article.html||'')+' '+(article.queryReviewHtml||'')).matchAll(/href=["'](?:https:\/\/mybreakeven\.com)?\/blogs\/([^/"'?#]+)\//g))linked.add(slug);
 for(const section of article.sections||[])for(const[,href]of section.links||[]) {const s=href.match(/^\/blogs\/([^/]+)\//)?.[1];if(s)linked.add(s);}
 const sub=t.groups?.find(g=>g.slugs.includes(article.slug));
 const members=sub?.slugs||t.slugs,index=members.indexOf(article.slug),ordered=[];
 // Adjacent steps create a distributed path instead of always pointing at the first guide.
 for(let distance=1;distance<members.length;distance++)for(const offset of [distance,-distance])ordered.push(members[(index+offset+members.length)%members.length]);
 ordered.push(...(sectorBridges[t.id]||[]),...t.slugs,...(bridges[t.id]||[]));
 const suggestions=[...new Set(ordered)].filter(s=>s!==article.slug&&!linked.has(s)&&posts.has(s)).slice(0,3).map(s=>posts.get(s));
 return {topic:t,posts:suggestions};
}
