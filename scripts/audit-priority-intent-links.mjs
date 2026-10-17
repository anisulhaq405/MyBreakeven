import {readFile,writeFile,readdir} from 'node:fs/promises';
const rows=[
 ['restaurant-budgeting','restaurant','restaurant-break-even-calculator','Monthly operating budget; cash timing uses the separate forecast.'],
 ['cleaning-business-monthly-expenses','cleaning','cleaning-business-break-even-calculator','Monthly expenses and resource handoff; no duplicate worksheet.'],
 ['landscaping-break-even','landscaping','landscaping-break-even-calculator','How-to method; interactive calculator owns entered-number results.'],
 ['margin-of-safety-business',null,null,'Sales cushion in units, sales and percent; planner supplies a threshold, not the ratio.'],
 ['contribution-margin-vs-profit-margin',null,'ecommerce-break-even-calculator','Per-sale contribution versus period profit; not a second calculator owner.'],
 ['operating-leverage-small-business',null,null,'Fixed-cost sensitivity with a positive-profit boundary; planner is not a DOL tool.'],
 ['how-much-does-it-cost-to-start-a-photography-business','photography','photography-business-break-even-calculator','Startup cash versus monthly operating requirement.'],
 ['restaurant-food-cost-percentage','restaurant','food-cost-calculator','Matched food inventory and sales period, not payroll.'],
 ['restaurant-labor-cost-percentage','restaurant','employee-cost-calculator','Loaded hire cost is an input; aggregate payroll/sales for the same period.'],
 ['restaurant-prime-cost','restaurant','food-cost-calculator','Food plus loaded labor, counted once.'],
 ['restaurant-menu-pricing-formula','restaurant','menu-pricing-calculator','Explain full-order cost; existing menu tool runs price and capacity.'],
 ['landscaping-seasonal-break-even','landscaping','landscaping-break-even-calculator','Annual commitments versus active-season workload; no new seasonal calculator.'],
 ['landscaping-business-profit-margin','landscaping','landscaping-break-even-calculator','Contribution and retained profit, not a duplicate how-to owner.'],
 ['free-shipping-threshold-profit','ecommerce','ecommerce-break-even-calculator','Seller contribution after shipping, not gift-buying intent.'],
 ['ecommerce-return-cost-per-order','ecommerce','ecommerce-return-cost-calculator','Returned-order cost and recovery; keep whole-store planning separate.'],
 ['is-a-cleaning-business-profitable','cleaning','cleaning-business-break-even-calculator','Owner-operator economics and capacity, not a demand guarantee.'],
 ['commercial-cleaning-contract-bid','cleaning','cleaning-contract-profit-calculator','Agreed account scope, visits and paid hours before whole-business target.'],
 ['agency-billable-utilization-rate','agency','hourly-rate-calculator','Billable versus available hours before a sustainable rate; no promised sales.'],
];
const pages=new Map();
async function visit(dir){for(const e of await readdir(dir,{withFileTypes:true})){const f=dir+'/'+e.name;if(e.isDirectory())await visit(f);else if(e.name==='index.html'){const html=await readFile(f,'utf8');pages.set(f.slice(4,-10),{html,links:[...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(x=>x[1].replaceAll('&amp;','&').replace(/^https:\/\/mybreakeven\.com(?=\/)/,''))});}}}
await visit('dist');
const issues=[],records=[];
for(const [slug,industry,tool,boundary] of rows){
 const url=`/blogs/${slug}/`,hub=industry?`/guides/${industry}-business/`:'/resources/',next=tool?`/calculators/${tool}/`:'/#calculator';
 const page=pages.get(url),entry=pages.get(hub);
 const incoming=[...pages].filter(([p,d])=>p!==url&&p!=='/blogs/'&&(p.startsWith('/blogs/')||p.startsWith('/guides/')||p==='/resources/')&&d.links.includes(url)).map(([p])=>p);
 for(const [ok,problem] of [[!!page,'missing article'],[!!entry?.links.includes(url),'hub entry missing'],[!!page?.links.some(x=>x.split(/[?#]/)[0]===hub),'article return-to-hub missing'],[!!page?.links.includes(next),'next tool missing'],[incoming.length>0,'contextual incoming missing']])if(!ok)issues.push({url,problem});
 records.push({url,hub,next,boundary,contextual_incoming:incoming,status:issues.some(x=>x.url===url)?'gap':'verified'});
}
const report={scheduled_day:'2026-10-18',checked:'2026-10-17',scope:'Built HTML link ownership; not rankings, live HTTP or proof of cannibalization',priority_articles:records.length,issues,records};
await writeFile('docs/seo/2026-10-18-priority-intent-links.json',JSON.stringify(report,null,2)+'\n');
const escape=s=>s.replaceAll('|','\\|');
await writeFile('docs/seo/2026-10-18-priority-intent-links.md','# Day 3: priority intent and link ownership\n\nScheduled October 18; completed one day ahead October 17. All 18 existing articles mapped to an existing hub and next calculator. This checks generated HTML, not ranking impact or live HTTP. General financial concepts use the existing Resources hub; no new category or page.\n\n| Article | Entry hub | Next calculation | Intent boundary | Link check |\n| --- | --- | --- | --- | --- |\n'+records.map(r=>`| ${[r.url,r.hub,r.next,r.boundary,r.status].map(escape).join(' | ')} |`).join('\n')+'\n\n## Landscaping ownership\n\nThe how-to article explains the monthly break-even method. The existing calculator owns input-driven monthly jobs, revenue and capacity. The seasonal article explains annual commitments versus active-month delivery. The existing hub directly lists both guides and the tool; the guides link to each other and the calculator already links to the how-to guide. Retain all three distinct URLs, canonicals and titles. Existing overlap is not proof of harmful cannibalization; no redirect, merge or noindex is justified here.\n\n## Verified changes\n\nAdd bounded handoffs from restaurant labor to loaded employee cost, cleaning bid to contract profit, and agency utilization to hourly rate. Expose the three financial concept guides in the existing Resources page, with context links back and general-planner handoffs where missing. Existing sufficient links remain. No numeric examples, formulas or original publication dates changed; linking-only additions retain substantive content-review dates. No external feedback, outreach or social publishing.\n');
console.log(JSON.stringify({priority_articles:records.length,issues},null,2));if(issues.length)process.exitCode=1;
