// Generated from docs/36-guide-authenticity-review/day*-patches.json.
export const authenticityReviewRecords = [
  {
    "slug": "customer-profitability-analysis",
    "heading": "Test the incremental effect before removing an account",
    "paragraphs": [
      "<p>The customer ledger above is a management allocation, not a standard contribution-margin income statement. A conventional contribution margin subtracts variable costs from sales; a traceable customer cost can be fixed, and a support allocation can remain payable after the customer leaves. The <a href=\"https://openstax.org/books/principles-managerial-accounting/pages/10-1-identify-relevant-information-for-decision-making\">OpenStax relevant-cost framework</a> supports comparing future amounts that actually differ between alternatives.</p>",
      "<p>Extend Customer C with another explicitly fictional assumption: its $1,200 direct delivery cost disappears if the account ends, but all support salaries and general overhead remain. Removing C loses $2,000 revenue and avoids only $1,200 cost. The business result falls by $800, from $2,200 to $1,400, before any replacement work. The account’s negative $700 allocated result therefore does not mean closure saves $700.</p>",
      "<p>Now test released capacity separately. If the team can sell replacement work, list its achievable revenue, additional materials, delivery hours and collection date. Deduct transition costs or contract penalties where supported. Compare that complete alternative with retaining C; do not count both a salary saving and revenue from the same retained employee without explaining the staffing arrangement.</p>",
      "<p>Keep three columns in the decision record: amount assigned in the reporting ledger, cash actually avoided by the decision, and capacity released. Ask the delivery manager to confirm each assumption and reconcile the chosen action to the next month’s actual cost and customer service evidence.</p>"
    ],
    "faq": [
      {
        "q": "Why can dropping a customer reduce business profit despite a negative allocated result?",
        "a": "The customer may still cover costs that remain payable after departure. In the added fictional case, removing $2,000 revenue avoids only $1,200 delivery cost, reducing the business result by $800."
      },
      {
        "q": "Is a directly traceable cost automatically variable?",
        "a": "No. Traceability identifies the customer or activity; cost behavior describes how the amount changes with activity or a decision. A dedicated salary can be traceable and fixed."
      }
    ],
    "replacements": [
      {
        "from": "Customer contribution = net revenue − directly traceable delivery and service costs.",
        "to": "Defined customer service subtotal = net revenue − directly traceable delivery and service costs."
      },
      {
        "from": "Contribution after support",
        "to": "Customer subtotal after assigned support"
      },
      {
        "from": "Show contribution and allocated profit separately before deciding whether a relationship should change.",
        "to": "Show the defined service subtotal and allocated profit separately before deciding whether a relationship should change."
      },
      {
        "from": "a zero contribution after support",
        "to": "a zero customer subtotal after assigned support"
      }
    ]
  },
  {
    "slug": "roas-vs-roi",
    "heading": "Reconcile the reported return to orders, attribution and cash",
    "paragraphs": [
      "<p><a href=\"https://support.google.com/google-ads/answer/14090?hl=en\">Google Ads’ ROI example</a> includes production and advertising costs in its stated investment base. That supports the total-cost version used above; it does not make every marketing team’s differently defined return interchangeable. Keep a named numerator, denominator and measurement window beside every percentage.</p>",
      "<p>For this fictional $12,000 campaign, prepare an order-level bridge from gross tracked value to $12,000 net attributed revenue. Show cancellations, credits and returns once. If the conversion tag sends profit or an assigned lead score rather than revenue, label the platform value accordingly; a 4× value-to-cost ratio then cannot be described as four sales dollars per advertising dollar.</p>",
      "<p>Incrementality is a separate question. <a href=\"https://support.google.com/google-ads/answer/14102450?hl=en-AU\">Google’s conversion-lift documentation</a> distinguishes experiment-based additional value from attribution-based credit. As an independent teaching calculation, suppose a valid experiment estimated $4,500 incremental revenue against $3,000 media spend: incremental revenue ROAS would be 1.5×. The same ledger could still show 4× attributed ROAS because the numerators answer different questions. This invented experiment result is not a measurement of the site or a customer.</p>",
      "<p>Before scaling, reconcile finance revenue, platform settings and the experiment’s uncertainty. Also check unsettled processor amounts and the expected return window. A correct reported ratio cannot replace evidence of additional demand, profitable fulfillment or enough cash to fund orders before collections arrive.</p>"
    ],
    "faq": [
      {
        "q": "Can the same campaign show 4× attributed ROAS and 1.5× incremental ROAS?",
        "a": "Yes, if a valid experiment supports the different incremental numerator. The added amounts are fictional arithmetic, not evidence that any actual campaign achieved those results."
      },
      {
        "q": "What if conversion value is a lead score rather than revenue?",
        "a": "Label the ratio conversion value divided by spend. Do not present a score-based conversion value as sales revenue, profit or received cash."
      }
    ],
    "replacements": []
  },
  {
    "slug": "sales-forecast-small-business",
    "heading": "Calibrate pipeline probability and reconcile it to delivery",
    "paragraphs": [
      "<p><a href=\"https://help.salesforce.com/s/articleView?id=forecasts3_best_practices.htm&amp;language=en_US&amp;type=5\">Salesforce’s forecasting guidance</a> recommends maintaining opportunity detail and using historical evidence when adjusting close probabilities. A stage label alone does not prove a reliable chance of winning. Record when each estimate was made, the expected close date and any unresolved condition.</p>",
      "<p>Consider an additional fictional pipeline: one $10,000 opportunity at an assumed 30% close probability and another $20,000 opportunity at 60%. Their weighted total is $15,000. Actual bookings from these two all-or-nothing opportunities could be $0, $10,000, $20,000 or $30,000. The $15,000 expectation is neither a partial signed contract nor a receipt guaranteed for next month. Correlated customer decisions can also make a downside scenario more severe than the weighted total suggests.</p>",
      "<p>Assign probable delivery dates only after checking the work. The existing two-offer base already requires all 128 productive worker-hours. Adding a newly won contract to that month without moving another job or obtaining supported additional capacity would overstate executable revenue. Preserve a demand view and a feasible delivery view, then send the feasible invoices and payment terms into cash planning.</p>",
      "<p>After closing the period, compare the dated opportunity list with wins, losses, slippages and delivery evidence. Investigate systematically optimistic close dates or stage probabilities. Keep the original forecast unchanged so later edits do not erase the forecast error being measured.</p>"
    ],
    "faq": [
      {
        "q": "Does $15,000 weighted pipeline mean $15,000 will be delivered next month?",
        "a": "No. It is an expectation from stated opportunity values and assumed probabilities. Wins, timing, recognition and delivery capacity need separate evidence."
      },
      {
        "q": "Can I add won pipeline to the base without another capacity check?",
        "a": "Only if the original base did not already include those jobs and sufficient delivery resources remain. This example’s base uses all 128 productive worker-hours."
      }
    ],
    "replacements": []
  },
  {
    "slug": "cost-volume-profit-analysis",
    "heading": "Measure the safety margin inside the relevant capacity range",
    "paragraphs": [
      "<p>The <a href=\"https://www.accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f5/technical-articles/CVP-analysis.html\">ACCA CVP explanation</a> treats margin of safety as the excess of budgeted or actual sales over break-even sales. It should use the same price, cost assumptions and sales mix as the break-even calculation. It is a sales buffer under that model, not a cash reserve or a probability of avoiding loss.</p>",
      "<p>At 250 units in the original fictional case, sales are $30,000 and break-even sales are $24,000. The margin of safety is 50 units or $6,000. Dividing $6,000 by $30,000 gives 20%. A loss of 50 sales units reaches zero operating profit under the original $48 unit contribution and $9,600 fixed-cost base. This statement assumes no simultaneous price, mix, variable-rate or fixed-cost change.</p>",
      "<p>A capacity change requires a fresh calculation. The case’s additional $2,400 commitment raises fixed costs to $12,000, so the revised break-even is 250 units at $48 contribution. At 300 units, the revised result is $2,400 and the revised margin of safety is 50 units, or 16.67% of 300. The old 200-unit threshold no longer explains that committed cost structure.</p>",
      "<p>Record exactly when the extra commitment becomes unavoidable. If a capacity purchase has already been agreed, returning to a lower sales volume may not restore the old fixed-cost base immediately. Show the applicable range, commitment date and exit terms beside each scenario rather than selecting whichever fixed-cost assumption produces the preferred answer.</p>"
    ],
    "faq": [
      {
        "q": "Does a 20% margin of safety mean a 20% chance of loss?",
        "a": "No. It describes the modeled sales reduction to break-even using a stated denominator, not a probability. Demand uncertainty requires separate analysis."
      },
      {
        "q": "Can I retain the old break-even after committing to more fixed capacity?",
        "a": "No. Recalculate using the applicable committed fixed costs and check whether reducing sales also removes that commitment."
      }
    ],
    "replacements": []
  },
  {
    "slug": "cost-per-hire-vs-employee-cost",
    "heading": "Reconcile recruiting, compensation and the first-year cash calendar",
    "paragraphs": [
      "<p>The <a href=\"https://learnhrm.shrm.org/wp-content/uploads/2015/12/EHRM_demo_excerpt.pdf\">official SHRM teaching excerpt</a> separates external recruiting spending, internal staffing resources and hires during the evaluated period. Its dated publication supports the metric’s components; it is not a current market cost-per-hire benchmark. The two completed starts remain the counted event in this guide’s fictional $2,700 case.</p>",
      "<p>Retain one row per counted hire, including role, actual start, source and the recruiting campaign reference. Maintain a separate accepted-offer count: a candidate who accepts and then never starts should not silently become a completed start in this example. Explain any cutoff policy for a recruiting campaign spanning several periods, and use the same policy when comparing channels.</p>",
      "<p>The <a href=\"https://www.bls.gov/opub/hom/ncs/concepts.htm\">BLS National Compensation Measures concepts</a> define compensation through wages/salaries and employee benefits. This article’s employment budget is broader because it also includes equipment, software and separately defined onboarding. Consequently the $58,600 subtotal should not be presented as a BLS compensation statistic or compared directly with an hourly benefits benchmark without reconciling those boundaries.</p>",
      "<p>Build a dated funding schedule as well as an annual total. A $1,200 equipment payment before the employee starts can create a larger first-month cash need than an annual average suggests. Check whether the $1,000 onboarding amount is genuinely additional; if the same paid hours already sit within the $48,000 salary, remove the duplicate. Retain jurisdiction-specific employer charges as supported inputs rather than applying the example’s amounts as universal payroll rates.</p>"
    ],
    "faq": [
      {
        "q": "Should an accepted offer that never starts count among the two starts?",
        "a": "No. This guide’s example counts completed starts. Track accepted offers separately and disclose any different policy used in another report."
      },
      {
        "q": "Is the $58,600 budget a BLS compensation benchmark?",
        "a": "No. It is an original fictional all-in employment budget with a broader scope, including equipment/software and a separately defined onboarding amount."
      }
    ],
    "replacements": [
      {
        "to": "For this example, count completed starts as hires and report accepted offers separately. If another internal report uses a different counted event, disclose it and reconcile the difference before comparing cost-per-hire results.",
        "from": "Count actual hires using a consistent event, such as accepted offers or starts, and disclose which event you use."
      },
      {
        "to": "$1,000 incremental onboarding paid time outside both the salary and recruiting amounts.",
        "from": "$1,000 onboarding paid time outside the recruiting definition."
      }
    ]
  },
  {
    "slug": "business-financial-contingency-plan",
    "heading": "Turn the four-week closing balance into a dated funding test",
    "paragraphs": [
      "<p>The <a href=\"https://legacy.sba.gov/business-guide/manage-your-business/prepare-emergencies\">SBA emergency-preparedness material</a> covers risk assessment, a business-specific response plan and practice. It supports preparation; it does not establish this example’s $5,000 cash floor or promise financing. Those amounts must follow the business’s actual commitments and decision policy.</p>",
      "<p>A positive month-end balance can conceal an earlier shortage. Extend the fictional base with dated movements: begin at $18,000, pay $12,000 in week one, then $8,000 in week two, and receive $8,000 in week four. Closing cash is still $6,000, but week-two cash reaches −$2,000. Restoring the selected $5,000 floor before that payment requires $7,000 of timely additional cash or agreed payment changes, rather than the $1,000 month-end buffer suggested by the aggregate base.</p>",
      "<p>Apply the same timing test to each response. If a $4,000 credit draw can arrive only in week three, it does not solve the week-two payment. If a supplier agrees to defer $1,500, record the replacement due date and include it in the next forecast period. Distinguish removing a genuinely uncommitted purchase from merely postponing an existing obligation.</p>",
      "<p>Keep the last evidence date beside every available-funding line. Check draw conditions, approvals and settlement delays before treating it as usable. Assign an alternative action if any condition fails, and rehearse the decision before the critical payment date. Disaster assistance, insurance claims and hoped-for receivable collections remain conditional until their amount and timing are supported.</p>"
    ],
    "faq": [
      {
        "q": "Can month-end positive cash hide an earlier negative balance?",
        "a": "Yes. The added fictional sequence closes at $6,000 but reaches −$2,000 in week two before its week-four receipt."
      },
      {
        "q": "Does a later credit draw fix an earlier missed payment automatically?",
        "a": "No. Cash must be usable by the payment deadline, and any draw conditions or settlement delays must be considered."
      }
    ],
    "replacements": [
      {
        "to": "https://www.sba.gov/counseling/manage-your-business/",
        "from": "https://www.sba.gov/business-guide/manage-your-business"
      }
    ]
  },
  {
    "slug": "accounts-receivable-vs-accounts-payable",
    "heading": "Complete the merchandise record without confusing the two prices",
    "paragraphs": [
      "<p>The receivable and payable use the invoice selling amount for the transaction between the two businesses. The seller also keeps a separate inventory-cost record. <a href=\"https://openstax.org/books/principles-financial-accounting/pages/6-4-analyze-and-record-transactions-for-the-sale-of-merchandise-using-the-perpetual-inventory-system\">OpenStax’s perpetual-inventory sales entries</a> illustrate both the revenue entry and the separate cost-of-sales entry; customer settlement subsequently reduces the receivable.</p>",
      "<p>To complete the fictional Harbor example, add a new explicit assumption: the delivered goods cost Harbor $1,800, and the accepted return contains resalable goods originally costing $180. At delivery Harbor records Dr Cost of Goods Sold $1,800 / Cr Inventory $1,800. On the resalable return it records Dr Inventory $180 / Cr Cost of Goods Sold $180. Net seller cost of goods sold is $1,620, and $2,700 net sales minus that cost gives $1,080 gross profit before other expenses. These new cost amounts are teaching assumptions, not a markup inferred from the original invoice.</p>",
      "<p>The buyer initially records its $3,000 acquisition at the supplier’s selling price; the $300 return leaves a $2,700 purchase amount in this restricted example. That is not the same as Harbor’s $1,620 cost of goods sold. The buyer must then trace what it retains, uses or sells before recognizing its own expense under the applicable policy.</p>",
      "<p>The $1,000 settlement still leaves both trade accounts open at $1,700 and creates no second sale. Match the agreed due date, bank receipt/payment and credit reference independently. A correct account balance does not prove the returned inventory was resalable or justify using the seller’s cost in the buyer’s ledger.</p>"
    ],
    "faq": [
      {
        "q": "Why are the seller’s cost and buyer’s inventory purchase different?",
        "a": "The seller measures its own inventory cost; the buyer records the acquisition price charged by the supplier, subject to its accounting policy. They are different cost records."
      },
      {
        "q": "Does the original $3,000 invoice reveal the seller’s profit?",
        "a": "No. The seller’s inventory cost and other expenses are needed. The added $1,800 and $180 cost assumptions create a fictional complete example; they are not facts inferred from the invoice."
      }
    ],
    "replacements": []
  },
  {
    "slug": "cost-performance-index",
    "heading": "Test the remaining efficiency needed to meet a chosen budget",
    "paragraphs": [
      "<p>CPI describes cost performance achieved to date. The separate to-complete performance index, or TCPI, asks what efficiency the remaining work would need to meet a selected funding target. <a href=\"https://www.pmi.org/learning/library/to-complete-performance-index-tcpi-6009\">PMI’s TCPI paper</a> explains the remaining-work numerator and the different denominators for the original budget and an approved revised estimate.</p>",
      "<p>Using the existing fictional status, $50,000 of budgeted work remains: $100,000 BAC minus $50,000 EV. Only $37,500 remains within the original budget: $100,000 minus $62,500 AC. Thus TCPI to the original BAC is $50,000 / $37,500 = 1.3333. That would require substantially better remaining cost efficiency than the measured 0.80 CPI; it is a requirement, not proof the team can achieve it.</p>",
      "<p>If the selected revised target is the $125,000 EAC, its remaining funding is $62,500 and TCPI becomes $50,000 / $62,500 = 0.80. That matches the continued-efficiency assumption used to derive this EAC. A $120,500 bottom-up EAC gives $58,000 remaining funding and TCPI approximately 0.8621. Each denominator must identify the target being tested; changing the forecast does not erase the original approved baseline.</p>",
      "<p>When the selected target has no remaining funding, this ratio is undefined or infeasible for positive remaining work. Investigate scope, accrual cutoff, remaining commitments and corrective resources before using the result. Do not interpret 1.3333 as a required percentage margin, a promised productivity improvement or a schedule completion date.</p>"
    ],
    "faq": [
      {
        "q": "Is TCPI the same as CPI?",
        "a": "No. CPI measures achieved earned value per actual cost. TCPI divides budgeted remaining work by funds remaining under a specified target."
      },
      {
        "q": "What does 1.3333 TCPI mean in this case?",
        "a": "The original budget would require about $1.3333 of budgeted remaining work for each remaining actual dollar. It does not show that this required performance is attainable."
      }
    ],
    "replacements": []
  },
  {
    "slug": "profitability-index",
    "heading": "Test feasible project combinations and make the PI convention explicit",
    "paragraphs": [
      "<p><a href=\"https://openstax.org/books/principles-managerial-accounting/pages/11-4-use-discounted-cash-flow-models-to-make-capital-investment-decisions\">OpenStax’s discounted-cash-flow explanation</a> provides the PV-of-net-future-cash-flows divided by initial-investment convention used here. Another convention reports NPV divided by investment. Under this guide’s positive time-zero outlay setup, those figures differ by one: 1.1191 versus 0.1191 for the base case. They can preserve rankings within that setup while using different acceptance thresholds.</p>",
      "<p>For a separate fictional indivisible-project decision, let a $30,000 budget fund A at $20,000 outlay and $26,000 future PV, or B and C at $15,000 outlay and $19,200 future PV each. Assume all PV amounts already use consistent risk, timing and rate assumptions; there are no dependencies or repeat opportunities. A has PI 1.30 and $6,000 NPV. B and C each have PI 1.28 and $4,200 NPV.</p>",
      "<p>Ranking only by PI selects A first and leaves $10,000 that cannot buy B or C, producing $6,000 total NPV. Choosing B plus C uses the whole $30,000 budget and yields $8,400 total NPV. The arithmetic demonstrates why a ratio ranking is insufficient when projects cannot be split. It is an original constrained-choice illustration, not an observed investment recommendation.</p>",
      "<p>List every feasible combination, include required companion investment and compare total NPV under the same stated assumptions. If future funding is also constrained, a single time-zero ratio may miss another bottleneck. Revisit working-capital recovery, terminal costs and discount-rate sensitivity before interpreting a rounded PI near its threshold as a robust decision.</p>"
    ],
    "faq": [
      {
        "q": "Why do some sources report a PI of 0.1191 rather than 1.1191?",
        "a": "They may use NPV divided by initial investment rather than PV of future net cash flows divided by initial investment. Reconcile the definition and threshold before comparison."
      },
      {
        "q": "Why does the lower-PI pair beat the highest-PI project here?",
        "a": "The projects are indivisible. B plus C fits the $30,000 budget and gives $8,400 total NPV, while A leaves unusable funding and gives $6,000."
      }
    ],
    "replacements": []
  },
  {
    "slug": "landscaping-working-capital",
    "heading": "Reconcile a funding draw through the later repayment",
    "paragraphs": [
      "<p><a href=\"https://www.bdc.ca/en/articles-tools/money-finance/manage-finances/making-most-working-capital\">BDC’s cash-management guidance</a> supports anticipating when receipts and payments occur. It is Canadian business education, not a statement of US lender eligibility. In this guide’s original case, the $8,000 requirement is a top-up to the chosen $5,000 weekly-close floor; it is not a recurring weekly expense, a recommended reserve or an approved credit limit.</p>",
      "<p>If an $8,000 draw is inserted immediately before the base case’s lowest weekly close, that close rises from −$3,000 to $5,000. The borrowing increases cash and an obligation; it does not create customer revenue. Carry the draw through every later balance and add principal repayments, interest and fees on their expected payment dates. Drawing $8,000 again in every later week would invent additional funding. Match the assumed availability date with the facility’s actual written conditions before treating the proceeds as usable.</p>",
      "<p>Check within-week order as well. A Monday payment before a Friday receipt can need more funding than a weekly-close table reveals. Include later repayment dates, off-season commitments and any customer refund obligation. If a payment is deferred to protect April cash, it remains a payment in the later schedule. Keep confirmed funds, conditional offers and applications separate. Approve a response only after both the low point and the repayment period can meet their actual obligations.</p>"
    ],
    "faq": [
      {
        "q": "Does the $8,000 funding need recur every week?",
        "a": "No. It is the additional amount needed at the base case’s lowest weekly close to reach the chosen floor. Carry any actual draw forward and schedule its repayment; do not invent a new draw each week."
      },
      {
        "q": "Does a line-of-credit approval guarantee usable cash on every date?",
        "a": "No. Check the actual availability conditions, remaining undrawn amount and timing in the written agreement. The forecast does not establish eligibility or approval."
      }
    ],
    "replacements": []
  },
  {
    "slug": "small-business-ideas",
    "heading": "Keep a demand-evidence record before comparing owner income",
    "paragraphs": [
      "<p>The <a href=\"https://www.sba.gov/counseling/plan-your-business/\">SBA planning guidance</a> connects customer research with competitor analysis. Apply that framework to a specific offer: record the customer group, the problem, the alternative supplier, matched service scope and date of each conversation or test. Compare nearby alternatives on the same scope; a public price for a different package is not an equivalent benchmark.</p>",
      "<p>Separate an interview, a request for a quote, an accepted order, completed delivery and cleared payment. They answer different questions and must not be added together as equal proof of demand. Record the cost and owner time needed to acquire the first buyer, not just the time spent delivering. In the fictional cleaning case, $125 spread over four job-related hours gives $31.25 per hour before general overhead, idle time and owner requirements. That is an offer-level comparison, not an authentic earnings average for cleaners.</p>",
      "<p>The case assumes the $55 and $90 cash delivery costs vary with the relevant jobs. If a real cost is a committed salary, a sunk purchase or allocated shared overhead, classify it separately before interpreting variable-cost contribution. A paid pilot may expose delivery or pricing problems but does not establish market-wide demand or repeatable income. Set the next test, maximum cash exposure and review date while keeping unsupported inputs labeled as assumptions. Retain failed tests as well as successful ones so the selection record reflects the evidence available at the time.</p>"
    ],
    "faq": [
      {
        "q": "Are the example hourly figures actual industry earnings?",
        "a": "No. They divide fictional price less the specified job-varying costs by assumed owner-hours. General overhead, non-job time, owner requirements and other omitted costs still need consideration."
      },
      {
        "q": "Can I count interviews and orders as the same demand evidence?",
        "a": "No. Record their distinct stages. Interest, accepted scope, completed work and cleared payment support different conclusions."
      }
    ],
    "replacements": [
      {
        "to": "Assumed job-varying cash delivery costs",
        "from": "Relevant cash delivery costs"
      }
    ]
  },
  {
    "slug": "how-to-start-small-business",
    "heading": "Build an agency-by-agency launch and recordkeeping file",
    "paragraphs": [
      "<p>The <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed/checklist-for-starting-a-business\">IRS startup checklist</a> is a federal starting point and explicitly is not all-inclusive. It lists an EIN when applicable. That does not mean every individual researching an idea needs every identifier, entity or permit. Establish the actual activity, ownership, business location, employee plans and customer locations before checking which requirements apply.</p>",
      "<p>For each applicable registration or permission, record the issuing agency, official source, current status, renewal date and supporting document. A bank account or tax identifier does not itself authorize every regulated activity. Separate preparatory research from commitments that depend on a permission being effective. Verify unresolved state, local or activity-specific questions with the actual agency and suitable advisers; a generic launch article cannot resolve them for an unidentified business.</p>",
      "<p><a href=\"https://www.irs.gov/publications/p583\">IRS Publication 583</a> explains business recordkeeping and supporting documents. For the fictional launch, trace the $4,500 owner contribution separately from customer receipts or loans. Preserve the quotes and payment dates behind the $6,500 need and the $2,000 unfunded difference. Identify which forecast already contains tools, deposits and early operating shortfalls so no cash item is added twice. Record customer invoices, supplier bills, receipts and bank movements from the first transaction. Check applicable retention requirements by record type instead of assuming a single universal period.</p>"
    ],
    "faq": [
      {
        "q": "Must every startup obtain an EIN and form an LLC?",
        "a": "No. Requirements depend on the owner, structure, activity and other facts. The IRS checklist says to obtain an EIN if applicable; verify entity and registration decisions using the relevant official agencies."
      },
      {
        "q": "Does the $4,500 owner contribution count as sales?",
        "a": "No. In the example it is a funding source. Customer revenue, cash collection, owner funding and borrowing need separate records."
      }
    ],
    "replacements": []
  },
  {
    "slug": "business-model-canvas",
    "heading": "Trace each changed promise through the connected blocks",
    "paragraphs": [
      "<p>The <a href=\"https://www.strategyzer.com/library/the-business-model-canvas\">official Strategyzer canvas guidance</a> treats the model as connected hypotheses that should be dated and revised as evidence changes. Put one accountable owner and version date on the record. Attach a short evidence reference to important assumptions rather than hiding every uncertainty in one general notes field.</p>",
      "<p>In the original cleaning case, expanding from eight to ten worker-hours per customer changes the resources, activities and cost blocks immediately. Ten customers would require 100 hours against 96 available. The $900 result after unchanged overhead does not resolve that four-hour operational shortage. A new distant segment can also change travel, channels, the support relationship and the acceptable price. Do not revise only the revenue block while leaving the delivery system unchanged. State what actual change supplies the missing capacity and recheck its cost before committing to the promise.</p>",
      "<p>This numerical example assumes the $30 loaded delivery rate varies with the included worker-hours and that its underlying labor is not also counted in overhead. A real salaried employee’s allocated rate may be useful for estimating full service cost without being an avoidable payment for one more customer. Mark that distinction before using the amount as variable-cost contribution or a cash forecast input. A completed canvas describes the proposed model; paid delivery, customer acceptance and repeat decisions test different parts of it. Archive the original and explain each changed block. Use the official source for its own tool and usage terms; this article’s evidence record is an independently written example.</p>"
    ],
    "faq": [
      {
        "q": "Does a completed canvas prove the business is feasible?",
        "a": "No. It records connected hypotheses. Customer demand, delivery capacity, costs and funding still require evidence and their own decision review."
      },
      {
        "q": "Is an internal hourly labor rate always a variable cash payment?",
        "a": "No. A loaded or allocated rate can include committed salary or shared costs. Identify the actual cost behavior and avoid counting its underlying amount again in overhead."
      }
    ],
    "replacements": [
      {
        "to": "an assumed job-varying loaded delivery cost of $30 per hour",
        "from": "a defined loaded delivery cost of $30 per hour"
      }
    ]
  },
  {
    "slug": "business-proposal-template",
    "heading": "Turn deliverables and changes into an acceptance record",
    "paragraphs": [
      "<p><a href=\"https://www.salesforce.com/small-business/how-to-write-a-business-proposal/\">Salesforce’s proposal guide</a> supports organizing client-specific scope, timing, price and acceptance. It is vendor education, not legal authority. For the 20-image case, identify the product list, final file format, dimensions, agreed background and the person authorized to approve delivery. Write observable completion criteria instead of promising an undefined “professional result.”</p>",
      "<p>Record which products, brand files and approvals the client must supply before production can proceed. Explain how a delayed input changes the proposed schedule. Give an additional image or correction request its own reference, estimated extra hours, impact on delivery and proposed fee decision. Confirm that decision before starting the additional scope. A recorded request alone is not evidence that the customer accepted a changed fee. Keep the accepted version and its supporting correspondence together so subsequent invoices can be traced to the same scope.</p>",
      "<p>The $40 internal loaded rate is an estimating assumption. It can include costs that do not vary with one additional project, so the $750 and $350 differences are labeled project surplus after included costs rather than automatically treated as textbook variable-cost contribution. Check which underlying salaries or shared costs are already in the rate before adding overhead. The $960, $960 and $480 installments sum to the $2,400 fee, but due dates are not receipt dates. Map cash timing independently, including a delayed second installment. Review intellectual property, cancellation, liability and other engagement-specific terms with appropriate expertise rather than treating the worksheet as a complete enforceable agreement.</p>"
    ],
    "faq": [
      {
        "q": "Is the $750 example surplus the company’s net profit?",
        "a": "No. It is the fee less the specified project costs. Shared overhead, financing, tax and any omitted costs still need consideration; the internal loaded-rate basis also matters."
      },
      {
        "q": "Does a customer request automatically approve an extra fee?",
        "a": "No. Record the requested change, proposed scope/date/fee effect and the actual acceptance before beginning additional work."
      }
    ],
    "replacements": [
      {
        "to": "project surplus after those included costs is $750",
        "from": "contribution after those included costs is $750"
      },
      {
        "to": "project surplus falls to $350",
        "from": "contribution falls to $350"
      }
    ]
  },
  {
    "slug": "business-growth-strategies",
    "heading": "Reconcile the separate campaign between profit and cash",
    "paragraphs": [
      "<p><a href=\"https://www.bdc.ca/en/articles-tools/business-strategy-planning/manage-growth/9-tips-handling-fast-business-growth\">BDC’s growth guidance</a> links expansion with resource and cash requirements. Apply that principle without treating cash receipt as the universal revenue-recognition rule. The original table isolates price, volume and capacity. Its fourth row’s $3,500 result is before a separately specified campaign expense.</p>",
      "<p>The fourth row already includes the extra 20 jobs’ $2,000 delivery cost and the $2,500 additional monthly capacity commitment. If the later $1,000 campaign payment represents an additional expense of this same month, that row’s result after campaign expense is $2,500. A payment alone does not determine its accounting period: a genuine prepayment or a different covered period needs its own treatment under the applicable basis. Keep the $3,500 before-campaign comparison and any after-campaign result explicitly labeled instead of mixing them in one table.</p>",
      "<p>In the stated cash scenario, the delivery, campaign and capacity payments are all due before the incremental customer receipts, so the pre-collection outlay is $5,500. Do not subtract that full amount again from $3,500: delivery and capacity are already included in the fourth row. The $1,000 campaign is the newly specified item, whose expense treatment must be stated separately. Map the subsequent receipts, any repayments and the period after the campaign ends. A funded expansion can still reduce profit; a profitable expansion can still require cash before collection. Reconcile both views to the same underlying commitments before increasing the next spending limit.</p>"
    ],
    "faq": [
      {
        "q": "Why is the growth table’s $3,500 result different from $2,500 after campaign expense?",
        "a": "The $3,500 row includes the delivery and added capacity costs but excludes the separate $1,000 campaign. If that campaign is an additional expense of the same period, the after-campaign result is $2,500."
      },
      {
        "q": "Should I subtract the $5,500 cash requirement again from the table result?",
        "a": "No. The delivery and capacity costs are already in the fourth row. Reconcile cash payment dates and expense periods item by item; a payment does not by itself establish the expense period."
      }
    ],
    "replacements": [
      {
        "to": "This is a cash schedule, not another $5,500 expense to subtract from the monthly result. The table already includes the $2,000 delivery cost and $2,500 capacity cost, but excludes the separately specified $1,000 campaign. If that campaign is an additional expense of the same month, the fourth-row result after campaign expense is $2,500; its payment date alone does not establish the expense period.",
        "from": "This is a cash schedule, not another $5,500 expense to subtract from the monthly result: some costs are already in the case."
      },
      {
        "to": "Growth result before a separately specified campaign expense depends on the capacity cost. Exact chart of the original fictional example.",
        "from": "Growth result depends on the capacity cost. Exact chart of the original fictional example."
      }
    ]
  },
  {
    "slug": "business-feasibility-study",
    "heading": "State which evidence would reverse the decision",
    "paragraphs": [
      "<p><a href=\"https://www.extension.iastate.edu/AgDM/wholefarm/html/c5-65.html\">Iowa State Extension’s feasibility guidance</a> examines whether a proposed idea can proceed using the resources and risks involved. The five connected tests in this article are its working structure, not a compulsory universal five-part standard. Its owner-income requirement is a planning recovery target, not automatically a deductible accounting expense.</p>",
      "<p>Give each decision condition a source, accountable owner and review date. For the original three-hour service, a forecast of 50 jobs does not resolve the 40-job practical capacity limit. A revised two-hour scope must be demonstrated at the required quality and accepted price. Include rework, inspection and added supervision before approving the new 60-job ceiling. A supplier quote should identify its scope, expiry, payment dates and assumptions; a favorable amount from a different specification is not equivalent support. Funding must still resolve the separate $2,000 startup gap.</p>",
      "<p>Compare proceed, pilot, revise and postpone on the same horizon and cost definitions. Record which commitments are difficult to reverse and the maximum exposure before the next evidence check. State the specific result that would stop further spending: missing permissions, a failed delivery test, insufficient buyer acceptance or unavailable funding can each matter. A “not yet supportable” conclusion is useful rather than a reason to manufacture a positive business plan. Preserve rejected alternatives and the evidence behind the decision. The university page is educational material; its authors state they no longer provide feasibility-study assistance, so use it as a reference rather than a promise of an available advisory service.</p>"
    ],
    "faq": [
      {
        "q": "Are the guide’s five feasibility areas an official universal standard?",
        "a": "No. They organize this guide’s market, delivery, organizational, economic and funding investigation. A real study should include the issues material to the actual venture."
      },
      {
        "q": "Does a forecast of 50 jobs resolve a 40-job capacity ceiling?",
        "a": "No. Demonstrate a workable change in price, scope, resources or the required recovery target, then recheck demand, quality and funding."
      }
    ],
    "replacements": []
  },
  {
    "slug": "business-goals",
    "heading": "Keep the same measurement definition through every review",
    "paragraphs": [
      "<p><a href=\"https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/templates-business-guides/glossary/smart-objectives\">BDC’s SMART explanation</a> supports clear criteria and alignment with available resources. For this guide’s original goal, define whether a job counts when booked, delivered, accepted or paid. Those stages are not interchangeable, even if each appears in the same customer system.</p>",
      "<p>State the calendar period and treatment of cancellations, refunds and rework. Use the same definition for the 80-job baseline and the 96-job target. A higher price can raise revenue without the same job increase, while a booking target can be met even when the resulting work exceeds available delivery time. Identify whether $250 is the gross quoted price or revenue after any agreed credits. If a definition changes, retain a reconciliation to the earlier series rather than claiming the resulting measurement jump is operating improvement.</p>",
      "<p>Assign a data owner for the job record and an action owner for the referral test; they may be different people. Keep the current forecast beside the intended target. Do not raise a forecast solely to match an ambition. At three hours each, 96 jobs still require 288 hours against 270 available: the 18-hour gap remains until a real capacity, scope or price/volume decision resolves it. Record the revised assumption, approval date and resulting cost or cash effect. Review completed activity, service quality, case-defined margin and payment timing together. Clear goal wording helps coordination; it cannot independently supply missing demand or delivery resources.</p>"
    ],
    "faq": [
      {
        "q": "Can I compare booked jobs with a completed-job baseline?",
        "a": "Not without a clear reconciliation. Bookings, delivery, acceptance and payment measure different stages; retain the same definition for the goal and baseline."
      },
      {
        "q": "Does a SMART goal automatically make 96 jobs achievable?",
        "a": "No. The fictional case still has an 18-hour delivery shortfall, and actual demand and cash evidence must support any revised operating plan."
      }
    ],
    "replacements": []
  },
  {
    "slug": "small-business-strategic-planning",
    "heading": "Record the scarce-resource decision and its review trigger",
    "paragraphs": [
      "<p><a href=\"https://www.bdc.ca/en/articles-tools/business-strategy-planning/define-strategy/how-write-strategic-plan\">BDC’s strategy guidance</a> connects priorities to named actions, responsibility, timing and measures. Apply that structure to an explicit resource choice. <a href=\"https://extension.unr.edu/publication.aspx?PubID=4061\">University of Nevada, Reno Extension</a> also treats strategic planning as fundamental direction and decisions, rather than simply a list of tasks.</p>",
      "<p>Record which of the original two options receives the next available hours and setup cash, what is deferred and what evidence could change the choice. Nearby offices use 100 of the stated 120 delivery hours. The remaining 20 can provide resilience or be offered to additional buyers, but unused capacity is not already revenue. Premium projects use all 120 hours and generate $400 greater modeled monthly result. They also need $4,000 more assumed setup cash. Neither difference by itself settles the strategic choice; compare buyer evidence, collection timing, service quality and the cost of acquiring the work.</p>",
      "<p>Assign each approved initiative an owner, due date, budget and outcome measure. Check that the same manager-hours or cash are not allocated to incompatible initiatives. A material customer loss, unavailable worker or failed price assumption may warrant review before the next chosen quarterly meeting. Record the trigger and the decision authority in advance. Separate a tactical adjustment within the selected model from a change in the model itself, and preserve the old version for comparison. Do not infer a compulsory review cadence or document length from one educational source. The business needs a usable record of its choices, commitments and evidence.</p>"
    ],
    "faq": [
      {
        "q": "Do the unused 20 hours automatically create more office revenue?",
        "a": "No. They are capacity, which may provide resilience or be offered to buyers. Additional accepted demand and its delivery/cash requirements still need evidence."
      },
      {
        "q": "Must a small business wait until a quarterly meeting to review strategy?",
        "a": "No. Quarterly review is this example’s chosen cadence. A material failed assumption can justify an earlier review under a documented decision process."
      }
    ],
    "replacements": []
  },
  {
    "slug": "business-risk-assessment",
    "heading": "Make the likelihood estimate and control decision auditable",
    "paragraphs": [
      "<p>A probability needs an event definition and a time unit. In this original example, interpret 15% as the assumed chance of at least one specified supplier interruption during the next quarter, with $16,000 as the modeled loss if it occurs. This is a deliberately simplified single-event model. A recurring incident count requires a frequency model instead; do not multiply a probability of at least one event by an assumed number of incidents without explaining the change.</p>",
      "<p>The <a href=\"https://csrc.nist.gov/pubs/ir/8286/a/r1/final\">December 2025 NIST risk-estimation revision</a> addresses cybersecurity risk, while the <a href=\"https://www.csps-efpc.gc.ca/tools/jobaids/risk-management-essentials/risk-register-eng.aspx\">Canadian public-service register</a> illustrates context, controls, residual exposure and ownership. Neither supplies this workshop’s probabilities. Record the evidence behind the original estimate and the assumptions behind the proposed 8% residual estimate. Until the backup supplier passes its qualification test, retain the uncontrolled scenario in the decision record.</p>",
      "<p>For a fair comparison, charge the $600 control cost against the same quarter used for the $1,120 modeled exposure reduction. If the $600 is one-time setup but benefits last longer, build a multi-period comparison rather than repeating or omitting the setup arbitrarily. Also test the cost on the actual payment date: a control can improve a probability-weighted comparison while worsening this week’s cash low point. Approval should state who accepts the remaining exposure, what evidence would invalidate the estimate and which trigger starts the contingency action.</p>"
    ],
    "faq": [
      {
        "q": "Is the 15% probability a published industry rate?",
        "a": "No. It is a fictional quarterly assumption used to explain the method. A real assessment needs dated evidence and an explicit event definition."
      },
      {
        "q": "Can a one-time control cost be compared with an annual benefit directly?",
        "a": "First align the time horizon. Record setup and recurring costs separately and model benefits over the same periods."
      }
    ],
    "replacements": []
  },
  {
    "slug": "online-business-ideas",
    "heading": "Test the rights, dependency and cash behind the offer",
    "paragraphs": [
      "<p>Before paying for a supposedly automated store or template package, identify exactly what you will own or be permitted to use: the domain, customer relationship, source files, product images, software account and supplier arrangement. Record restrictions on commercial use and resale. An attractive mockup does not establish that the seller owns the materials or that a marketplace will permit the proposed activity.</p>",
      "<p>The <a href=\"https://consumer.ftc.gov/consumer-alerts/2023/08/vetting-business-or-coaching-opportunity-you-buy\">FTC’s business-opportunity warning</a> describes the danger of unsupported online-store earnings promises. Treat projected revenue as an assumption until supported by records that also show costs and unsuccessful outcomes. Check the seller, cancellation terms, references and any applicable disclosure obligations before buying an opportunity. A third-party service’s claim is not evidence that your own account, inventory or delivery system can achieve its result.</p>",
      "<p>Use the existing original ecommerce case to separate unsold stock from lost cash. Paying $2,100 for fifty units and selling thirty leaves twenty units costing $840 in the simplified stock record. Cash has already left for all fifty, but that does not make the remaining twenty units another acquisition expense for each of the thirty sold. Investigate damage or unsellability separately. For a digital download, retain a dated version and test the file in the promised application; for the service, log revisions and unpaid selling time. The next decision is whether repeat orders remain deliverable at the recorded net economics, not whether the model can be described as passive income.</p>"
    ],
    "faq": [
      {
        "q": "Does an automated-store provider guarantee a usable business?",
        "a": "No. Verify account control, permitted activity, delivery responsibilities, total costs and the evidence behind earnings claims."
      },
      {
        "q": "Are the twenty unsold units automatically a loss?",
        "a": "Not in this simplified inventory example. They remain stock subject to the applicable measurement assessment, although their purchase has already used cash."
      }
    ],
    "replacements": []
  },
  {
    "slug": "how-to-start-online-business",
    "heading": "Set separate launch tests for merchandise and service promises",
    "paragraphs": [
      "<p>For US merchandise covered by the <a href=\"https://www.ftc.gov/business-guidance/resources/business-guide-ftcs-mail-internet-or-telephone-order-merchandise-rule\">FTC’s order rule guidance</a>, a seller needs a reasonable basis for its stated shipping time; when no shipping time is stated, the usual rule is shipment within thirty days after a properly completed order. If timely shipment becomes impossible, follow the applicable delay-consent or cancellation/refund procedure. This is not a universal thirty-day delivery rule for every online transaction, and the FTC guidance identifies exemptions and special cases. Services are outside this merchandise rule.</p>",
      "<p>For the original service pilot, make the delivery promise testable: what file or work product is due, how the buyer confirms receipt, which revisions are included and who handles a failed handoff. A payment receipt establishes a payment event; it does not by itself prove completed service performance. Keep the five fictional orders labeled as teaching data when presenting the 25% inquiry conversion. Replace them with dated, consented business records before describing a real customer result.</p>",
      "<p>The launch decision should have separate evidence for offer accuracy, payment, fulfillment and customer communications. The <a href=\"https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers\">FTC review-rule Q&amp;A</a> explains why businesses must avoid fake or false testimonials and incentives conditioned on a particular review sentiment. Ask genuine buyers for their actual experience; a test order, generated persona or fictional worked case must not become a customer endorsement. Record unresolved launch defects with an owner and retest the repaired step before increasing demand.</p>"
    ],
    "faq": [
      {
        "q": "Does the FTC’s usual thirty-day shipping rule cover my consulting service?",
        "a": "The cited rule concerns covered merchandise orders, not services. Service promises still need their own applicable contractual and legal assessment."
      },
      {
        "q": "Can the fictional five-order pilot be described as a client result?",
        "a": "No. It is a teaching example. Actual result claims need genuine underlying records and an accurate description of what was measured."
      }
    ],
    "replacements": [
      {
        "from": "Observed pilot list",
        "to": "Fictional inquiry log; illustrative only"
      },
      {
        "from": "Five divided by twenty is a 25% conversion for this tiny observed pilot",
        "to": "Five divided by twenty is a 25% conversion for this fictional teaching pilot"
      }
    ]
  },
  {
    "slug": "start-home-based-business",
    "heading": "Separate premises permission, tax treatment and usable capacity",
    "paragraphs": [
      "<p>Keep three decisions in different records: permission to conduct the activity at the address, the cash required to operate it, and any tax deduction. The <a href=\"https://www.sba.gov/counseling/launch-your-business/\">SBA location guidance</a> notes that zoning can apply to home businesses; the Arizona source is only an example for that jurisdiction. A permitted home activity does not automatically qualify its owner for a federal home-office deduction, and a possible deduction does not create local operating permission.</p>",
      "<p><a href=\"https://www.irs.gov/taxtopics/tc509\">IRS Topic 509</a> describes qualifying business uses and the exclusive-and-regular-use tests that apply to many home-office claims, with specific exceptions such as qualifying storage and daycare. Do not infer a deduction merely from calling a room an office or allocating household rent in a planning budget. Preserve the relevant use records and review the actual tax requirements separately from this original operating case.</p>",
      "<p>In the fictional capacity case, twenty jobs need forty delivery hours, leaving none of that delivery allowance unused. The sixteen hours already reserved for administration and selling must not be counted again as spare delivery capacity. Log actual booked time, completed jobs, cancellations and rework for the same month. If a job needs 2.5 hours, the sixteen-job ceiling leaves only $1,170 after the stated $350 commitments. Changing tax assumptions cannot repair that physical capacity shortfall. Revisit price, scope, scheduling or the owner-income target using evidence from completed work before accepting a fully loaded calendar.</p>"
    ],
    "faq": [
      {
        "q": "Does permission to work from home establish a tax deduction?",
        "a": "No. Local operating permission and federal tax qualification are separate questions."
      },
      {
        "q": "Are the sixteen administration hours spare delivery capacity?",
        "a": "No. They are already reserved in this example. Using them for jobs would require a revised plan for the administration and selling work."
      }
    ],
    "replacements": []
  },
  {
    "slug": "assets-liabilities-equity",
    "heading": "Trace a real document through all four financial statements",
    "paragraphs": [
      "<p>The <a href=\"https://www.sec.gov/investor/pubs/begfinstmtguide.htm\">SEC’s financial-statement primer</a> distinguishes a reporting-date balance sheet from statements covering a period. Use that distinction when explaining the original eight transactions: the $6,000 borrowing belongs in the liability balance and cash movement, not in sales. The $2,500 customer collection reduces an existing receivable without adding another $2,500 of earned income. The identity of the bank transaction is insufficient without its source document.</p>",
      "<p>For each actual entry, retain the date, economic event, supporting document, debit, credit and reviewer. <a href=\"https://openstax.org/books/principles-financial-accounting/pages/3-4-analyze-business-transactions-using-the-accounting-equation-and-show-the-impact-of-business-transactions-on-financial-statements\">OpenStax’s transaction-analysis lesson</a> shows how supported events affect the equation. The article’s owner-investment and withdrawal labels describe a simplified owner-equity case; a corporation would normally use its own share-capital, retained-earnings and distribution accounts. Changing the entity’s account labels does not authorize classifying a dividend as wages or a loan as revenue.</p>",
      "<p>A useful final check is to explain the difference between $2,800 included profit and $20,000 closing cash without a plug. Owner investment contributes $18,000; the loan contributes $6,000; equipment acquisition uses $5,000; part of earned revenue remains in the $1,500 receivable; $500 of expense remains unpaid; and the owner withdraws $800. Each belongs in its own bridge. A proposed market sale price or an estimate of employee expertise must not be inserted into the balance sheet simply to increase equity. Recognition and measurement require the applicable accounting policy, not an attractive valuation story.</p>"
    ],
    "faq": [
      {
        "q": "Why are the closing cash balance and included profit different?",
        "a": "Investment, financing, asset purchases, unpaid customer and supplier balances, and withdrawals affect cash and equity differently."
      },
      {
        "q": "Can a corporation reuse the owner-equity labels unchanged?",
        "a": "Use accounts appropriate to the legal entity and reporting framework. Share capital, retained earnings and distributions require their own supported records."
      }
    ],
    "replacements": []
  },
  {
    "slug": "current-assets",
    "heading": "Document the reporting basis before interpreting the subtotal",
    "paragraphs": [
      "<p>This is a classified-balance-sheet teaching case for a US business with a short operating cycle, not a complete rulebook for every reporting framework. <a href=\"https://openstax.org/books/principles-financial-accounting/pages/5-3-apply-the-results-from-the-adjusted-trial-balance-to-compute-current-ratio-and-working-capital-balance-and-explain-how-these-measures-represent-liquidity\">OpenStax’s classification lesson</a> explains the introductory one-year-or-longer-operating-cycle boundary. A maturity date alone is insufficient for every unusual asset: document the asset’s purpose, restriction, expected realization or consumption and the applicable policy. Do not take an issuer’s taxonomy label in a filing as the accounting standard itself.</p>",
      "<p>Create a review line for each original balance. The $9,000 gross receivable needs invoice and settlement support; the $600 allowance needs a separate estimate; $7,000 inventory needs count, cost and condition evidence; $1,200 prepaid insurance needs the unconsumed coverage schedule. These records support different judgments. A current classification does not validate the amount, and a supported carrying amount does not establish that the item can pay tomorrow’s bill. Reconcile the net $8,400 receivable once rather than adding its gross and net presentations.</p>",
      "<p>For the $2,000 deposit excluded from current assets, the example assumes a genuine long-term restriction consistent with the stated reporting policy, rather than merely an account named restricted cash. Confirm the contract, permitted withdrawals and release conditions. If those facts change, reassess classification before recalculating the subtotal; do not change a label only to improve working capital. Preserve current and noncurrent portions where the policy requires them. Use the same reporting date and accounting basis for the liability comparison, then build a separate collection and payment calendar from actual expected dates.</p>"
    ],
    "faq": [
      {
        "q": "Is a taxonomy description in a company filing the accounting standard?",
        "a": "No. It is a filing-related label or definition, and its presence on a regulator’s site does not make it regulator-authored accounting guidance."
      },
      {
        "q": "Does a current label validate the carrying amount?",
        "a": "No. Classification and measurement require different evidence, such as dates and restrictions versus valuation and recoverability."
      }
    ],
    "replacements": [
      {
        "from": "<li><a href=\"https://www.sec.gov/Archives/edgar/data/1442145/000119312512085286/R77.htm\">SEC-hosted taxonomy reference: current classification boundary</a></li>",
        "to": "<li><a href=\"https://openstax.org/books/principles-financial-accounting/pages/5-3-apply-the-results-from-the-adjusted-trial-balance-to-compute-current-ratio-and-working-capital-balance-and-explain-how-these-measures-represent-liquidity\">OpenStax: introductory current-asset classification and liquidity; not an accounting standard</a></li>"
      }
    ]
  },
  {
    "slug": "current-liabilities",
    "heading": "Separate the recognized balance, debt terms and settlement plan",
    "paragraphs": [
      "<p>This original schedule is an introductory classified-balance-sheet case for a short-cycle US business. <a href=\"https://openstax.org/books/principles-financial-accounting/pages/12-1-identify-and-describe-current-liabilities\">OpenStax’s current-liability lesson</a> supports the listed common categories. Do not extend the simplified $3,000-current/$9,000-noncurrent loan split to a loan with different terms. Read contractual maturities, demand clauses, covenant compliance and relevant refinancing evidence under the applicable reporting framework before assigning the portions. A lender’s informal expectation of renewal is not the same evidence as an executed right or agreement.</p>",
      "<p>Build a debt register with opening principal, new borrowings, principal repaid, closing principal, interest, next payment and classification assessment. Interest and principal answer different questions. The $250 principal payment in the original thirty-day schedule does not assert that no interest will be paid; the $9,750 total includes only the listed items. Add any actual interest and other omitted commitments to the separate cash plan without quietly changing the supported accounting balances.</p>",
      "<p>For customer advances, reconcile opening liability plus new receipts less amounts earned, approved refunds and other supported movements. The $2,000 advance in this case remains a service obligation at cutoff; it is not assumed to require an immediate $2,000 cash repayment. Its fulfillment can still require future payroll or supplies, so excluding that automatic refund is not permission to exclude delivery cash. Record refund conditions and delivery evidence. The classification schedule, the expense budget and the dated cash forecast should reconcile through explained differences rather than being forced into one identical total.</p>"
    ],
    "faq": [
      {
        "q": "Does the $9,750 cash illustration include every future payment?",
        "a": "No. It totals only the listed near-term items. Actual interest, delivery costs and other commitments need separate dated entries."
      },
      {
        "q": "Can an expected loan renewal determine classification by itself?",
        "a": "No. Review the actual rights, agreements, timing and applicable reporting rules rather than relying on an informal expectation."
      }
    ],
    "replacements": [
      {
        "from": "<li><a href=\"https://www.sec.gov/Archives/edgar/data/67215/000006721514000035/R81.htm\">SEC-hosted taxonomy reference: current obligation boundary</a></li>",
        "to": "<li><a href=\"https://openstax.org/books/principles-financial-accounting/pages/12-2-analyze-journalize-and-report-current-liabilities\">OpenStax: current-liability recognition and reporting examples; not an accounting standard</a></li>"
      }
    ]
  },
  {
    "slug": "accounts-receivable-process",
    "heading": "Resolve unapplied cash and report exceptions without hiding balances",
    "paragraphs": [
      "<p>Run three linked but separate records: the invoice and credit ledger, the receipt-allocation record, and the bank reconciliation. <a href=\"https://learn.microsoft.com/en-us/dynamics365/guidance/business-processes/order-to-cash-invoice-sales-orders-overview\">Microsoft’s receivables process documentation</a> separates invoices, credits, customer payments, prepayments, refunds and settlement. It describes a product workflow rather than prescribing a universal accounting policy. Your control record should still explain which event occurred, who approved it and how it links to the customer balance.</p>",
      "<p>For a separate original receipt example, a customer sends $1,200 against a supported $1,000 invoice. Apply $1,000 to that invoice and investigate the remaining $200 using remittance evidence. Do not increase revenue or create a second invoice merely to absorb the receipt. The balance may be an advance, an overpayment awaiting refund or another supported item; decide from the facts and accounting policy. Preserve both the gross bank receipt and its allocations so the customer account does not appear settled through an unexplained journal.</p>",
      "<p>At review, list outstanding disputes, unallocated receipts, approved-but-unposted credits and promised payments with owner and next action. Reconcile those exceptions to the same cutoff as the $8,500 gross ledger. Keep any allowance assessment separate from cash collection; the <a href=\"https://openstax.org/books/principles-financial-accounting/pages/9-1-explain-the-revenue-recognition-principle-and-how-it-relates-to-current-and-future-sales-and-purchase-transactions\">OpenStax receivable examples</a> distinguish earned sales from later settlement. A write-off or allowance change can alter a reported balance without collecting cash. Collection speed should not be improved cosmetically by changing due dates, netting unrelated parties or silently removing disputed invoices.</p>"
    ],
    "faq": [
      {
        "q": "How should a receipt larger than the invoice be handled?",
        "a": "Allocate the supported invoice amount and investigate the excess using remittance evidence. Do not invent sales to absorb the difference."
      },
      {
        "q": "Can gross receivables and the bank balance happen to be equal?",
        "a": "Yes, numerically by coincidence. They represent different accounts and are reconciled to different supporting records."
      }
    ],
    "replacements": [
      {
        "from": "An AR ledger cannot equal the bank balance because it represents unpaid amounts rather than cash held.",
        "to": "The AR control balance is not expected to reconcile to the bank balance: it represents unpaid customer amounts, while the bank balance represents cash held."
      },
      {
        "from": "JPMorgan’s receivables guidance describes the broad sequence from credit assessment through cash application and reconciliation.",
        "to": "Microsoft’s receivables process documentation distinguishes invoicing, customer payments, credits and settlement."
      },
      {
        "from": "<li><a href=\"https://www.jpmorgan.com/insights/treasury/receivables/accounts-receivable-management\">JPMorgan: accounts-receivable lifecycle</a></li>",
        "to": "<li><a href=\"https://openstax.org/books/principles-financial-accounting/pages/9-1-explain-the-revenue-recognition-principle-and-how-it-relates-to-current-and-future-sales-and-purchase-transactions\">OpenStax: receivable recognition and later settlement</a></li>"
      }
    ]
  },
  {
    "slug": "accounts-payable-process",
    "heading": "Keep matching tolerance and payment authority separate",
    "paragraphs": [
      "<p><a href=\"https://learn.microsoft.com/en-us/dynamics365/finance/accounts-payable/accounts-payable-invoice-matching\">Microsoft’s matching documentation</a> distinguishes two-way price checks from three-way checks that also compare receipt quantities. In the original case, ninety accepted units at $20 support $1,800 of received goods, while the $2,000 invoice contains a $200 quantity exception. A system tolerance is a configured review threshold, not proof that an incorrect invoice is economically correct or that missing goods arrived.</p>",
      "<p>Retain the original invoice, receiving record, exception decision and supplier correction. <a href=\"https://learning.sap.com/courses/sap-ariba-procurement-overview-1/understanding-invoice-reconciliation-1\">SAP’s reconciliation example</a> illustrates keeping the original document and the reconciliation trail separately. A documented partial payment, credit or corrected invoice must explain its effect on the remaining supplier balance. Resolving a matching icon does not itself show that a bank payment was authorized or settled; those events need their own references.</p>",
      "<p>Protect supplier-master changes as a separate control. The <a href=\"https://www.ic3.gov/CrimeInfo/BEC\">FBI’s IC3 guidance</a> recommends verifying account-change requests through another channel. For an actual payment run, confirm changed bank details through a previously trusted contact route, retain the verification and review the payee independently of invoice approval. If only one person operates the business, keep a visible callback and approval record rather than treating the sender’s email as confirmation. After settlement, allocate the receipt or payment reference to the invoice, reconcile the resulting $6,200 example balance, and investigate any unexplained supplier-statement difference before closing the period.</p>"
    ],
    "faq": [
      {
        "q": "Does an allowed matching tolerance prove the invoice is correct?",
        "a": "No. It is a configured control threshold. The underlying purchase, receipt and supplier evidence still determine the supported amount."
      },
      {
        "q": "Does invoice approval also approve a changed bank account?",
        "a": "Treat bank-detail verification as a separate control using a trusted independent contact route."
      }
    ],
    "replacements": []
  },
  {
    "slug": "accrual-accounting",
    "heading": "Check recognition, billing and settlement against separate evidence",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/4-2-discuss-the-adjustment-process-and-illustrate-common-types-of-adjusting-entries\">OpenStax adjustment framework</a> distinguishes accrued items from deferred items. Apply that distinction to the four case records: accepted work supports the revenue assessment; payroll evidence supports the wage accrual; the insurance contract supports the unused coverage; and the customer agreement supports the unearned advance. A bank statement establishes a receipt or payment, but does not establish that every recognition condition was satisfied.</p>",
      "<p>For a real close, create one row per event with the performance or consumption date, invoice date, due date, settlement date and account reference. Explain any difference rather than forcing all five dates to match. If an invoice includes work still to be delivered, review the separate obligations before assigning the entire invoice to revenue. If an amount is disputed, identify whether the problem concerns the transaction price, the recognition conditions or collectibility; those are different questions.</p>",
      "<p>The case’s $3,100 profit, $1,200 operating cash movement and $11,200 closing cash answer three defined questions. The owner’s $10,000 investment belongs in the funding bridge, not service revenue. Compare each reconciliation with the same reporting cutoff and included transactions. <a href=\"https://www.irs.gov/publications/p538\">IRS Publication 538</a> is a separate federal tax-method reference; it does not turn this introductory financial-reporting case into a tax return.</p>"
    ],
    "faq": [
      {
        "q": "Can a customer invoice contain both earned and unearned amounts?",
        "a": "Yes. Assess the underlying delivery obligations and applicable recognition rules; the invoice total alone does not settle that question."
      },
      {
        "q": "Which evidence supports the insurance adjustment?",
        "a": "The coverage period and amount in the insurance agreement, together with the payment and prior prepaid balance, support the allocation."
      }
    ],
    "replacements": []
  },
  {
    "slug": "bookkeeping-small-business",
    "heading": "Build a close package that another person can reproduce",
    "paragraphs": [
      "<p>The <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep\">IRS recordkeeping guidance</a> allows a system suited to the business, while requiring records that support the amounts reported. It does not require this guide’s particular spreadsheet, chart of accounts or monthly timetable. Keep the document that explains a transaction alongside its posting reference; a category selected in an app is not the underlying evidence.</p>",
      "<p>For the $9,700 cash reconciliation, preserve the original statement, opening book balance, receipts and payments, the omitted $50 fee, and the $250/$400 timing items. The reviewer should be able to reach the same adjusted balance without asking the preparer to remember what happened. Retain subsequent clearing evidence for the timing items. If a payment remains outstanding unusually long, record the investigation rather than deleting it to make the schedule shorter.</p>",
      "<p>A practical close package also contains customer and supplier detail, the bank reconciliation, asset and loan schedules, approved adjustments, the trial balance and the reports actually reviewed. Make the cutoff and version visible. Record who prepared and reviewed each reconciliation and which issues remain open. Retention is a separate decision: <a href=\"https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records\">IRS retention guidance</a> has different conditions for different records, so a blanket “discard everything after three years” instruction would be misleading. Consider other applicable contractual or legal requirements before disposal.</p>"
    ],
    "faq": [
      {
        "q": "Must every business use the same chart of accounts?",
        "a": "No. The chart should support the business and reporting requirements, with consistent account identities and documented mappings."
      },
      {
        "q": "Is a bank-feed category sufficient supporting evidence?",
        "a": "Not by itself. Retain the invoice, receipt, agreement or other evidence explaining the amount, purpose and reporting period."
      }
    ],
    "replacements": []
  },
  {
    "slug": "accounting-cycle",
    "heading": "Use a stage-by-stage completion test before carrying balances forward",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/5-1-describe-and-prepare-closing-entries-for-a-business\">OpenStax closing-entry explanation</a> separates temporary revenue and expense accounts from permanent balance-sheet accounts. The teaching case uses owner capital because it is a sole-proprietor illustration. A corporation may use retained earnings and different distribution accounts. Follow the entity and system actually used instead of copying equity-account names without checking them.</p>",
      "<p>Treat each stage as a separate control. The unadjusted trial balance must trace to posted journals. Each adjustment needs its own evidence and reference. Statements must reconcile to the adjusted balances. The closing journals must reset only the intended temporary accounts. Finally, permanent balances must agree with the next period’s opening records. A list of stage names without these links does not demonstrate a completed close.</p>",
      "<p>In this case, $4,400 revenue less $1,600 expenses produces $2,800 profit before closing. Transferring that amount to capital changes where the result is recorded within equity; it does not create another $2,800 of business performance. The $15,200 post-closing debit total is smaller than the $16,800 adjusted debit total because the expense balances have been closed, not because $1,600 cash disappeared at closing. Keep both reports so that difference can be explained. Reversing selected accruals, when the system uses that procedure, is also separate from closing all temporary accounts.</p>"
    ],
    "faq": [
      {
        "q": "Why do adjusted and post-closing trial-balance totals differ?",
        "a": "Temporary accounts have been closed. In this case the $1,600 expense debit balances disappear from the post-closing trial balance while the result is transferred to equity."
      },
      {
        "q": "Does transferring profit to capital earn the profit again?",
        "a": "No. It transfers an already measured result within the accounting records; it is not a new revenue or cash event."
      }
    ],
    "replacements": []
  },
  {
    "slug": "general-ledger-template",
    "heading": "Read normal balances without treating debit and credit as cash directions",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/3-5-use-journal-entries-to-record-transactions-and-post-to-t-accounts\">OpenStax journal and posting explanation</a> defines journal entries before their transfer to individual accounts. Debits and credits are the two sides of an entry; their effect depends on the account. Cash and an ordinary receivable normally carry debit balances, while a payable normally carries a credit balance. A contra-asset such as accumulated depreciation has a different normal side from the related asset.</p>",
      "<p>Use the template as one account’s working record, not a substitute for the whole double-entry system. Every journal reference needs the complete balanced entry in its supporting record. For J03, the absence of cash movement explains why the invoice is missing from the Cash ledger, but it must still be present in Receivables and Revenue. If only bank-feed transactions were imported, the books would omit that unpaid revenue and receivable even though Cash looked correct.</p>",
      "<p>Check a ledger in both directions: trace selected source documents forward to the journal and ledger, then trace selected ledger lines back to their documents. Compare the date, account, amount and counter-account, not just the existence of a reference. An unusual credit in Cash may be an ordinary payment; an unusual credit balance in a customer account may require investigation or reclassification. The normal-side label helps interpret the balance but cannot replace that review. Preserve approved corrections as traceable entries instead of silently replacing the original row.</p>"
    ],
    "faq": [
      {
        "q": "Does debit always mean cash received?",
        "a": "No. Debit identifies one side of an entry. For example, buying equipment for cash debits Equipment and credits Cash."
      },
      {
        "q": "Can one Cash ledger represent every transaction?",
        "a": "No. Credit sales and other noncash events can affect other accounts without appearing in Cash."
      }
    ],
    "replacements": []
  },
  {
    "slug": "depreciation-methods",
    "heading": "Separate a reporting method from a tax deduction and an asset valuation",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/11-3-explain-and-apply-depreciation-methods-to-allocate-capitalized-costs\">OpenStax method comparison</a> supports the straight-line, usage and declining-balance mechanics used here. The choice concerns cost allocation under a reporting policy. It does not establish the asset’s resale value, a replacement-funding balance or a tax deduction. The case explicitly keeps the $14,000 acquisition cash amount the same under all three alternatives.</p>",
      "<p>For a real asset, retain the purchase and installation evidence, readiness date, approved life and residual assumptions, method rationale and review history. For a usage method, reconcile the period’s production measure to the same unit definition used for total estimated output. Do not use machine-hours for one input and saleable units for the other. For declining balance, retain the residual cap and the policy on any method switch rather than allowing a formula to drive carrying amount below its intended floor.</p>",
      "<p>Compare the effects using a common cutoff and cost boundary. The first-year service-case results of $7,600, $7,000 and $4,400 assume all depreciation reaches that period’s expenses. They cannot be copied unchanged into a manufacturer’s result if some allocation remains in unsold inventory. For federal tax, <a href=\"https://www.irs.gov/publications/p946\">IRS Publication 946</a> addresses separate eligibility, basis, recovery-method and convention rules. A financial-statement five-year life is not proof that the same five-year tax treatment applies. Keep the reporting schedule and any tax schedule separately reconcilable.</p>"
    ],
    "faq": [
      {
        "q": "Is a depreciation schedule a replacement fund?",
        "a": "No. Depreciation is an accounting allocation. A replacement-funding plan requires a separate cash decision."
      },
      {
        "q": "Can units-of-production inputs use different units?",
        "a": "No. The period usage and estimated lifetime usage must use a consistent measure for the ratio to be meaningful."
      }
    ],
    "replacements": []
  },
  {
    "slug": "accumulated-depreciation",
    "heading": "Keep impairment, disposal and ordinary depreciation as separate movements",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/11-5-describe-some-special-issues-in-accounting-for-long-term-assets\">OpenStax long-term-asset discussion</a> treats a revised estimate and a disposal as separate events. The $15,600 closing accumulated balance in this guide is an allocation-and-removal reconciliation under the stated cost-model assumptions. It is not an appraisal of the remaining assets and does not, by itself, establish their recoverable or market values.</p>",
      "<p>For the disposed item, retain its asset ID, $12,000 cost, $8,400 accumulated allocation through disposal, $4,000 proceeds and any disposal costs. The $400 gain follows only because the case assumes no selling costs and no other carrying-amount adjustments. If costs or another relevant adjustment exist, reconcile them before calculating the result rather than treating gross sale proceeds as net gain. Do not remove another active asset’s accumulated balance simply because its amount makes the group total reconcile.</p>",
      "<p>The closing gross-cost and accumulated schedules should agree on which asset IDs remain. A fully allocated asset can still be in use; a physical count may identify that fact without creating a new cost or rewriting its previous allocation. Conversely, an item with a positive carrying amount may have been disposed of or lost. Investigate the actual event. Where impairment or another adjustment applies under the reporting framework, show it separately; the simplified equation “cost less accumulated depreciation” is not a universal complete valuation model.</p>"
    ],
    "faq": [
      {
        "q": "Does a low carrying amount prove impairment?",
        "a": "No. Carrying amount alone does not establish an impairment conclusion; the applicable framework and evidence require a separate assessment."
      },
      {
        "q": "Why retain asset IDs in the rollforward?",
        "a": "They help ensure that disposed cost and accumulated balances belong to the same item and that closing balances relate to assets still recorded."
      }
    ],
    "replacements": []
  },
  {
    "slug": "straight-line-depreciation",
    "heading": "Distinguish a changed estimate from an error in the original schedule",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/11-5-describe-some-special-issues-in-accounting-for-long-term-assets\">OpenStax discussion of revised estimates</a> illustrates allocating a remaining depreciable amount over a revised remaining life. That is a different task from correcting an arithmetic error. Keep the original approved schedule and document why new information changes an estimate; do not simply overwrite its life or residual assumptions without an effective date.</p>",
      "<p>In the unchanged case here, April 2027 through March 2032 contains exactly sixty whole months. A genuine revision would require a separately documented carrying amount at the revision date, supported remaining life and updated residual estimate. Use those facts for the future schedule under the applicable policy. A mistake in the original cost, a wrongly entered start date and newly learned usage information are not automatically the same type of change.</p>",
      "<p>Before using a partial-period result, verify the year, available-for-use date, convention, reporting cutoff and rounding treatment. Reconcile the first partial period and final residual, not just the annual formula. A tax convention cannot be selected solely because it creates the same first-year amount as this teaching case: <a href=\"https://www.irs.gov/publications/p946\">IRS Publication 946</a> is the separate federal tax reference. Likewise, a switch to a usage method or an actual disposal requires its own decision. The manual worksheet preserves a working record but does not automatically implement any of these changes.</p>"
    ],
    "faq": [
      {
        "q": "Does new useful-life information mean the original accounting was necessarily wrong?",
        "a": "No. New information can support a change in estimate. An original error requires a separate assessment and treatment."
      },
      {
        "q": "What should be checked before using a partial-year result?",
        "a": "Check the readiness date, reporting cutoff, stated convention, number of included periods, rounding and final residual balance."
      }
    ],
    "replacements": []
  },
  {
    "slug": "allowance-doubtful-accounts",
    "heading": "Apply the current policy scope before treating an aging table as an estimate",
    "paragraphs": [
      "<p>The official <a href=\"https://storage.fasb.org/ASU%202025-05.pdf\">FASB ASU 2025-05 summary</a> states that the optional changes apply to specified current receivables and contract assets arising under Topic 606. The effective annual periods begin after December 15, 2025, with early adoption permitted. This case does not elect the options; its arithmetic is not evidence that another entity’s population or policy qualifies.</p>",
      "<p>Before using a real aging matrix, reconcile the population to the gross receivable control, separate credit balances and disputed items for review, and record how due dates are assigned. Keep the loss-rate support, risk grouping, current information and any forecasting assessment together with the calculation. A rate copied from an online article is an unsupported input even when the multiplication is exact. A customer’s overdue status and an approved write-off are also different facts.</p>",
      "<p>The $2,800 target is a closing allowance balance. The current $2,100 provision follows from the existing $700 credit after the specified write-off and recovery events. If the pre-adjustment allowance were already higher than the supported target, investigate the evidence and policy rather than forcing another positive expense simply because a table has a positive estimated loss. Keep a signed rollforward: opening allowance, provision or release, write-offs, recoveries and other explained movements. Reconcile the net receivable as well as the gross population so an adjustment is not counted twice.</p>"
    ],
    "faq": [
      {
        "q": "Do the optional FASB changes cover every financial asset?",
        "a": "No. ASU 2025-05 describes a specified scope for current receivables and contract assets arising from Topic 606 transactions."
      },
      {
        "q": "Must every adjustment to an allowance increase expense?",
        "a": "No. Compare the supported closing requirement with the signed existing balance and movements; the evidence can require a provision or a release under the applicable policy."
      }
    ],
    "replacements": []
  },
  {
    "slug": "bad-debt-expense",
    "heading": "Keep an allowance write-off separate from a tax-worthlessness conclusion",
    "paragraphs": [
      "<p>The <a href=\"https://openstax.org/books/principles-financial-accounting/pages/9-2-account-for-uncollectible-accounts-using-the-balance-sheet-and-income-statement-approaches\">OpenStax uncollectible-account illustration</a> distinguishes estimation from a later removal of a customer balance. This guide demonstrates that mechanical distinction. It does not present its two-step reinstatement and collection sequence as the only recovery presentation permitted under every accounting policy.</p>",
      "<p>For each event, identify what actually changed. The $900 provision changes the allowance estimate and included period expense. The $1,200 write-off removes a customer item and uses the existing allowance. The $300 reinstatement restores that item in the illustrated process; the subsequent $300 receipt must match bank evidence. Keep those references together so an automated receipt import cannot create a second collection, a second expense or a new sale.</p>",
      "<p>An internal credit approval, a financial-reporting estimate, a customer-ledger write-off and a federal tax deduction do not share an automatic trigger. If tax treatment is needed, use the <a href=\"https://www.irs.gov/taxtopics/tc453\">IRS bad-debt topic</a> and the applicable business-debt guidance for the taxpayer and facts. Do not assume an unpaid invoice was previously included in taxable income, especially where a different tax accounting method is used. The numerical case intentionally makes no deductible-amount claim. Preserve the accounting trail even if legal collection activity or a tax assessment follows a different timetable.</p>"
    ],
    "faq": [
      {
        "q": "Does this guide prescribe the only permitted recovery entry?",
        "a": "No. It illustrates a two-step reinstatement and receipt sequence; use the policy appropriate to the entity and accounting framework."
      },
      {
        "q": "Does a customer-ledger write-off automatically create a federal deduction?",
        "a": "No. The applicable tax conditions and accounting-method history require a separate determination."
      }
    ],
    "replacements": []
  }
];
