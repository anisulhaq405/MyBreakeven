// Original Day 1 finance guides; checked methods and independent examples.
export const financeDay1Posts = [
  {
    "slug": "ebitda-vs-net-income-vs-cash-flow",
    "title": "EBITDA vs Net Income vs Cash Flow: A Reconciled Example",
    "seoTitle": "EBITDA vs Net Income vs Cash Flow",
    "description": "Compare EBITDA, net income and operating cash flow using one reconciled business example. Trace receivables, inventory, interest, tax and equipment cash.",
    "metaDescription": "Compare EBITDA, net income and operating cash flow using one reconciled business example. Trace receivables, inventory, interest, tax and equipment cash.",
    "opening": "One business can report three different, valid results.",
    "tag": "Break-Even Concepts",
    "tags": [
      "EBITDA",
      "Net income",
      "Operating cash flow"
    ],
    "cluster": "earnings-analysis",
    "calculatorSlug": "ebitda-calculator",
    "image": "/images/blog/finance-day1-ebitda-vs-net-income-vs-cash-flow.webp",
    "alt": "Three earnings, reconciliation and cash columns illustrating distinct business measurement boundaries",
    "imageCaption": "Original MyBreakeven editorial illustration; the guide uses independent fictional examples, not customer results.",
    "published": "2026-10-26",
    "modified": "2026-10-26",
    "editorialStatus": "published",
    "features": [
      "Original reconciled examples",
      "Explicit calculation assumptions",
      "Contextual calculator and method links"
    ],
    "html": "<h2 id=\"three-measures\">EBITDA, net income and cash flow answer different questions</h2><p><strong>EBITDA measures earnings before interest, income taxes, depreciation and amortization; net income retains those included expenses; operating cash flow reconciles profit with operating cash movements.</strong> They are different measures, not competing labels for money in the bank. In the original example below, the same year produces $130,000 EBITDA, $80,000 net income and $70,000 operating cash flow.</p><p>Use <a href=\"/calculators/ebitda-calculator/\">the EBITDA calculator</a> to rebuild the earnings bridge. Use this guide to understand why the cash answer differs. All amounts below are fictional USD for a simplified nonfinancial business under a stated US-style classification. They are not margins or performance benchmarks.</p><h2 id=\"comparison\">Compare the three measurement boundaries</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Read the subtotal before comparing companies</caption><thead><tr><th scope=\"col\">Measure</th><th scope=\"col\">Included here</th><th scope=\"col\">Does not prove</th></tr></thead><tbody><tr><th scope=\"row\">EBITDA</th><td>Net income with included interest, income taxes and D&A added back</td><td>Cash collected, debt-service capacity or money available to distribute</td></tr><tr><th scope=\"row\">Net income</th><td>Recognized revenue and period expenses, including D&A, interest and tax</td><td>That customers have paid or inventory has been funded</td></tr><tr><th scope=\"row\">Operating cash flow</th><td>Operating receipts/payments or an indirect reconciliation</td><td>Cash remaining after all investing and financing activity</td></tr></tbody></table></div><p>A lender agreement or management report may define a measure differently. Preserve its actual definition and reconcile it instead of assuming that identically named numbers use the same accounting perimeter.</p><h2 id=\"income-statement\">Start with one complete fictional income statement</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Harbor Supply annual teaching example; USD</caption><thead><tr><th scope=\"col\">Line</th><th scope=\"col\">Amount</th></tr></thead><tbody><tr><th scope=\"row\">Net revenue</th><td>1,000,000</td></tr><tr><th scope=\"row\">Cost of goods sold</th><td>600,000</td></tr><tr><th scope=\"row\">Operating expenses including D&A</th><td>290,000</td></tr><tr><th scope=\"row\">Operating profit / EBIT in this example</th><td>110,000</td></tr><tr><th scope=\"row\">Interest expense</th><td>10,000</td></tr><tr><th scope=\"row\">Income-tax expense</th><td>20,000</td></tr><tr><th scope=\"row\">Net income</th><td>80,000</td></tr><tr><th scope=\"row\">Included depreciation / amortization</th><td>15,000 / 5,000</td></tr></tbody></table></div><p>The operating expenses contain $20,000 D&A and $270,000 other operating expenses. There are no additional non-operating gains, foreign-exchange items or discontinued operations in this simplified statement. Thus operating profit and EBIT agree here; that equality should not be assumed for every company.</p><p>The check is $1,000,000 − $600,000 − $290,000 − $10,000 − $20,000 = $80,000 net income. Keep <a href=\"/blogs/how-to-calculate-cost-of-goods-sold/\">inventory and COGS</a> on a consistent accrual basis.</p><h2 id=\"earnings-bridge\">Reconcile net income to EBITDA</h2><p>$80,000 + $10,000 interest + $20,000 income taxes + $15,000 depreciation + $5,000 amortization = <strong>$130,000 EBITDA</strong>. Dividing by $1,000,000 net revenue gives 13% EBITDA margin. Net margin is 8%; operating margin is 11%. These percentages use the same revenue denominator but different profit numerators.</p><p>Do not add back payroll, rent or materials merely because they are operating costs. Do not add back debt principal: principal was not an income-statement expense in the first place. If depreciation is already excluded from a starting subtotal, adding it again inflates earnings.</p><h2 id=\"operating-cash-bridge\">Follow the cash bridge to operating cash flow</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Indirect method; annual operating balance changes in USD</caption><thead><tr><th scope=\"col\">Reconciliation</th><th scope=\"col\">Signed amount</th></tr></thead><tbody><tr><th scope=\"row\">Net income</th><td>80,000</td></tr><tr><th scope=\"row\">Add included noncash D&A</th><td>+20,000</td></tr><tr><th scope=\"row\">Increase in trade receivables</th><td>−25,000</td></tr><tr><th scope=\"row\">Increase in operating inventory</th><td>−10,000</td></tr><tr><th scope=\"row\">Increase in supplier payables</th><td>+5,000</td></tr><tr><th scope=\"row\">Operating cash flow</th><td>70,000</td></tr></tbody></table></div><p>Receivables grew because recognized sales exceeded collections; inventory absorbed funds; supplier credit partly funded operating purchases. Interest and income tax paid are operating in this illustrative policy, and their payable balances do not change. There are no other operating-balance changes or noncash adjustments. Real statements require every applicable reconciling item.</p><p>The <a href=\"/blogs/operating-cash-flow/\">operating cash flow guide</a> develops direct and indirect calculations. The <a href=\"/blogs/how-to-calculate-working-capital/\">working capital guide</a> explains why a growing current-asset balance can consume cash.</p><h2 id=\"equipment-and-financing\">Equipment and loans sit outside this operating subtotal</h2><p>Suppose the business pays $40,000 for equipment and repays $15,000 loan principal, with no other investing or financing movements. Operating cash of $70,000 less those payments leaves a $15,000 total cash increase. The $40,000 purchase is investing; the $15,000 principal repayment is financing under the example policy. Neither is automatically a new full current-year operating expense.</p><p>Under a stated operating-cash-flow-minus-capital-expenditure convention, the intermediate amount is $30,000 before the principal repayment. A report calling a number “free cash flow” must disclose its definition. EBITDA is not that $30,000 amount. See the <a href=\"/blogs/cash-flow-statement/\">complete cash flow statement</a> for reconciliation to the opening bank balance.</p><h2 id=\"decisions\">Choose the measure that matches the decision</h2><p>Use the EBITDA bridge to compare defined earnings across matched periods, then review its exclusions. Use net income for the period’s bottom-line accounting result. Use operating and total cash-flow schedules for payment timing, asset purchases and funding. None alone establishes what owners can safely withdraw.</p><p>Compare the same company perimeter, reporting duration and revenue basis. A growth business can have improving EBITDA and deteriorating collections simultaneously. Keep that diagnosis separate from the sales volume needed to break even. The <a href=\"/calculators/operating-profit-margin-calculator/\">operating margin calculator</a> answers the operating-profit percentage question.</p><h2 id=\"errors\">Common mistakes that change the answer</h2><p>Adding D&A twice, using cash tax paid as a substitute for accrued tax expense, treating all current accounts as operating working capital and subtracting equipment purchases twice can each create a false bridge. Reconcile missing data rather than entering a convenient zero.</p><p>If an Adjusted EBITDA report removes unusual costs or gains, read <a href=\"/blogs/adjusted-ebitda-add-backs/\">the add-back evidence guide</a>. A claimed one-off does not disappear from bank cash simply because management adjusts an earnings measure.</p><h2 id=\"sources\">Sources and reporting scope</h2><p><a href=\"https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures\">SEC guidance on EBIT and EBITDA</a> establishes the net-income starting point and distinct naming of adjusted measures. <a href=\"https://openstax.org/books/principles-financial-accounting/pages/16-3-prepare-the-statement-of-cash-flows-using-the-indirect-method\">OpenStax explains the indirect cash-flow reconciliation</a>. Our Harbor Supply statement and arithmetic are original.</p><p>The illustrative US-style interest/tax classification is explicit, not a universal IFRS presentation template. Apply the adopted reporting framework and professional advice where required. For actual dated collections and payments, use the <a href=\"/calculators/cash-flow-forecast-template/\">13-week cash forecast</a>.</p>",
    "sectionLinks": [
      [
        "quick-answer",
        "Quick answer and calculator"
      ],
      [
        "three-measures",
        "EBITDA, net income and cash flow answer different questions"
      ],
      [
        "comparison",
        "Compare the three measurement boundaries"
      ],
      [
        "income-statement",
        "Start with one complete fictional income statement"
      ],
      [
        "earnings-bridge",
        "Reconcile net income to EBITDA"
      ],
      [
        "operating-cash-bridge",
        "Follow the cash bridge to operating cash flow"
      ],
      [
        "equipment-and-financing",
        "Equipment and loans sit outside this operating subtotal"
      ],
      [
        "decisions",
        "Choose the measure that matches the decision"
      ],
      [
        "errors",
        "Common mistakes that change the answer"
      ],
      [
        "sources",
        "Sources and reporting scope"
      ],
      [
        "guide-faqs",
        "Questions and answers"
      ]
    ],
    "faq": [
      {
        "q": "Is EBITDA the same as operating cash flow?",
        "a": "No. EBITDA excludes selected expenses but does not automatically account for collections, inventory, payables or all operating cash adjustments."
      },
      {
        "q": "Can EBITDA be positive while cash falls?",
        "a": "Yes. Uncollected sales, inventory investment, equipment payments and debt principal can absorb cash even when the earnings subtotal is positive."
      },
      {
        "q": "Why is depreciation added back in the cash bridge?",
        "a": "Included depreciation reduced net income without being a cash payment in that period. The actual asset purchase is classified separately."
      },
      {
        "q": "Does operating income always equal EBIT?",
        "a": "No. They agree in the fictional example because no separate non-operating items exist. Reconcile the actual statement before using either starting subtotal."
      }
    ],
    "answerHtml": "<p id=\"quick-answer\">Quick answer: Harbor Supply’s fictional annual example has $130,000 EBITDA, $80,000 net income and $70,000 operating cash flow. The reconciled statement below explains each boundary. <a href=\"/calculators/ebitda-calculator/\">Enter your own earnings records in the EBITDA calculator</a>.</p>"
  },
  {
    "slug": "adjusted-ebitda-add-backs",
    "title": "Adjusted EBITDA and Add-backs: Build an Evidence-Based Bridge",
    "seoTitle": "Adjusted EBITDA: Add-backs and Reconciliation",
    "description": "Build a signed Adjusted EBITDA bridge with documented add-backs and deductions. Check recurring costs, gains, owner compensation and double counting.",
    "metaDescription": "Build a signed Adjusted EBITDA bridge with documented add-backs and deductions. Check recurring costs, gains, owner compensation and double counting.",
    "opening": "Every adjustment needs a description, amount and reason.",
    "tag": "Break-Even Concepts",
    "tags": [
      "Adjusted EBITDA",
      "Add-backs",
      "Reconciliation"
    ],
    "cluster": "earnings-analysis",
    "calculatorSlug": "ebitda-calculator",
    "image": "/images/blog/finance-day1-adjusted-ebitda-add-backs.webp",
    "alt": "Base earnings connected through documented evidence to a separately labelled adjusted subtotal",
    "imageCaption": "Original MyBreakeven editorial illustration; the guide uses independent fictional examples, not customer results.",
    "published": "2026-10-26",
    "modified": "2026-10-26",
    "editorialStatus": "published",
    "features": [
      "Original reconciled examples",
      "Explicit calculation assumptions",
      "Contextual calculator and method links"
    ],
    "html": "<h2 id=\"definition\">What Adjusted EBITDA changes</h2><p><strong>Adjusted EBITDA starts with a defined EBITDA subtotal and applies separately identified adjustments.</strong> A cost adjustment usually increases the subtotal; removing an included gain decreases it. The resulting measure depends on the chosen definition and is not automatically comparable across businesses.</p><p>Begin with <a href=\"/calculators/ebitda-calculator/\">the EBITDA calculator</a> and preserve the standard earnings bridge before adding adjustments. This guide evaluates the evidence behind that second bridge. It does not endorse an adjustment for a transaction, covenant or public filing.</p><h2 id=\"standard-versus-adjusted\">Keep standard and adjusted earnings separate</h2><p>Standard EBITDA adds back the included interest, income taxes, depreciation and amortization to net income. A proposed litigation, owner-pay or restructuring adjustment is a further policy choice; it does not belong silently inside the standard formula.</p><p>The calculator labels base EBITDA and Adjusted EBITDA separately. A negative adjustment is allowed because unusual income may need to be removed. Do not use the same positive-only “add-back” field for every event and hide its direction.</p><h2 id=\"worked-bridge\">Reconcile a complete signed example</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Separate fictional annual scenario; USD, not the Harbor Supply ledger</caption><thead><tr><th scope=\"col\">Bridge line</th><th scope=\"col\">Signed amount</th><th scope=\"col\">Evidence to retain</th></tr></thead><tbody><tr><th scope=\"row\">Base EBITDA</th><td>130,000</td><td>Net-income/D&A reconciliation</td></tr><tr><th scope=\"row\">Remove included special legal expense</th><td>+12,000</td><td>Invoice, matter description and selected policy</td></tr><tr><th scope=\"row\">Remove included nonrecurring gain</th><td>−5,000</td><td>Ledger entry and underlying transaction</td></tr><tr><th scope=\"row\">Adjusted EBITDA</th><td>137,000</td><td>130,000 + 12,000 − 5,000</td></tr></tbody></table></div><p>This independent scenario assumes both the $12,000 expense and $5,000 gain already affected the net income underlying base EBITDA. The legal-cost adjustment is an illustrative proposal, not a conclusion that all legal fees are nonrecurring. If the gain did not enter the starting earnings, subtracting it here would be a second adjustment.</p><p>At $1,000,000 matched net revenue, base margin is 13% and adjusted margin is 13.7%. The $7,000 increase is a change in the selected performance measure, not $7,000 new cash received.</p><h2 id=\"evidence-register\">Build an adjustment evidence register</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>A reviewable adjustment needs more than a number</caption><thead><tr><th scope=\"col\">Field</th><th scope=\"col\">Question</th></tr></thead><tbody><tr><th scope=\"row\">Event and reporting date</th><td>What happened, and is it in this period?</td></tr><tr><th scope=\"row\">Starting treatment</th><td>Where did it affect net income or base EBITDA?</td></tr><tr><th scope=\"row\">Signed amount</th><td>Is this an expense add-back or an income deduction?</td></tr><tr><th scope=\"row\">Recurrence</th><td>Has the same class of cost occurred before or been budgeted again?</td></tr><tr><th scope=\"row\">Replacement economics</th><td>Will a replacement employee, system or supplier still cost money?</td></tr><tr><th scope=\"row\">Reporting purpose</th><td>What definition does the contract or reporting framework require?</td></tr></tbody></table></div><p>Retain the ledger reference, invoice, approval and written rationale with the calculation. Unique descriptions reduce duplicate entries but software cannot verify whether an event is genuinely unusual or whether a buyer will accept the adjustment.</p><h2 id=\"owner-pay\">Owner compensation needs a replacement-cost view</h2><p>An owner’s salary is not automatically removable. If the owner performs necessary work, someone must still deliver it after a sale or management change. An adjustment based on replacement economics may remove only an evidenced excess over comparable necessary compensation, with employer costs and role scope considered.</p><p>For example, $90,000 included owner compensation and a documented $70,000 replacement cost suggest a $20,000 difference under that chosen normalization policy, not a $90,000 saving. This is a hypothetical arithmetic example, not a salary benchmark or accepted valuation adjustment. Owner draws are not another wage expense merely because cash leaves the business.</p><h2 id=\"recurrence\">Repeated one-offs and future savings need scrutiny</h2><p>A category called “one-time” every year may be part of the ongoing cost of operating. A future system saving is not necessarily a valid adjustment to historical earnings. Show expected savings in a separate forecast with implementation costs and a start date.</p><p>Do not remove ordinary rent, marketing, payroll or maintenance simply to reach a target margin. Stock compensation, impairment, acquisition costs and restructuring can have purpose-specific treatment; this simple tool does not decide the appropriate policy or contractual EBITDA definition.</p><h2 id=\"cash-and-valuation\">Adjusted EBITDA is not cash flow or a valuation</h2><p>Even a well-documented adjustment does not erase cash already paid. Debt service, working capital and capital investment remain separate. Read <a href=\"/blogs/ebitda-vs-net-income-vs-cash-flow/\">the reconciled profit-versus-cash example</a> before treating adjusted earnings as distributable money.</p><p>A valuation also needs a defensible approach, risk assessment, debt/cash treatment and transaction perimeter. The calculator supplies no market multiple and no automatic sale price. For scenario planning, keep projected benefits separate from actual historical records.</p><h2 id=\"review-checklist\">Review the bridge before using it</h2><p>Check that the starting EBITDA reconciles, every signed item affected that starting figure, recurring economics remain visible, gains are treated consistently with expenses, and no item appears twice. Compare prior periods using the same definitions or explain a change.</p><p>Keep base and adjusted subtotals side by side. If an item is disputed, show the scenario with and without it instead of presenting a single adjusted number as an independently verified fact. Return to <a href=\"/calculators/ebitda-calculator/\">the itemized calculator</a> to test the arithmetic.</p><h2 id=\"sources\">Source and methodology</h2><p><a href=\"https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures\">SEC non-GAAP interpretations, including sections 100 and 103</a>, discuss potentially misleading adjustments and the naming/reconciliation of EBIT, EBITDA and adjusted measures. Public-company rules have a defined scope; this guide does not imply every private-company worksheet is an SEC filing.</p><p>The numbers, adjustment register and commentary here are original teaching material. Consult the actual agreement and qualified accounting advisers for a reporting or transaction decision.</p>",
    "sectionLinks": [
      [
        "quick-answer",
        "Quick answer and calculator"
      ],
      [
        "definition",
        "What Adjusted EBITDA changes"
      ],
      [
        "standard-versus-adjusted",
        "Keep standard and adjusted earnings separate"
      ],
      [
        "worked-bridge",
        "Reconcile a complete signed example"
      ],
      [
        "evidence-register",
        "Build an adjustment evidence register"
      ],
      [
        "owner-pay",
        "Owner compensation needs a replacement-cost view"
      ],
      [
        "recurrence",
        "Repeated one-offs and future savings need scrutiny"
      ],
      [
        "cash-and-valuation",
        "Adjusted EBITDA is not cash flow or a valuation"
      ],
      [
        "review-checklist",
        "Review the bridge before using it"
      ],
      [
        "sources",
        "Source and methodology"
      ],
      [
        "guide-faqs",
        "Questions and answers"
      ]
    ],
    "faq": [
      {
        "q": "What is an EBITDA add-back?",
        "a": "It is an identified adjustment that increases a specified EBITDA measure, normally for an expense already included in the starting earnings. Whether it is appropriate depends on evidence and purpose."
      },
      {
        "q": "Can Adjusted EBITDA be lower than EBITDA?",
        "a": "Yes. Removing included unusual income or applying other signed deductions can lower the adjusted subtotal."
      },
      {
        "q": "Can I add back all owner salary?",
        "a": "Not automatically. Necessary owner work may require paid replacement; draws are not the same as included salary expense."
      },
      {
        "q": "Does the calculator approve my adjustments?",
        "a": "No. It checks arithmetic and input structure. It does not verify records, recurrence, contract terms or professional acceptance."
      }
    ],
    "answerHtml": "<p id=\"quick-answer\">Quick answer: keep base EBITDA separate from signed extra adjustments. In the independent example, 130,000 + 12,000 − 5,000 = 137,000 Adjusted EBITDA; appropriateness still needs evidence. <a href=\"/calculators/ebitda-calculator/\">Build the separately labelled calculator bridge</a>.</p>"
  },
  {
    "slug": "present-value-vs-future-value",
    "title": "Present Value vs Future Value: Compare Money on One Date",
    "seoTitle": "Present Value vs Future Value: Examples",
    "description": "Compare present and future value with a matched-date example. Understand compounding, discounting, inflation and the limits of fixed-rate projections.",
    "metaDescription": "Compare present and future value with a matched-date example. Understand compounding, discounting, inflation and the limits of fixed-rate projections.",
    "opening": "A date and a rate belong beside every value.",
    "tag": "Break-Even Concepts",
    "tags": [
      "Present value",
      "Future value",
      "Time value of money"
    ],
    "cluster": "time-value-of-money",
    "calculatorSlug": "future-value-calculator",
    "image": "/images/blog/finance-day1-present-value-vs-future-value.webp",
    "alt": "A dated timeline connects today’s money with a later balance using a stated rate",
    "imageCaption": "Original MyBreakeven editorial illustration; the guide uses independent fictional examples, not customer results.",
    "published": "2026-10-26",
    "modified": "2026-10-26",
    "editorialStatus": "published",
    "features": [
      "Original reconciled examples",
      "Explicit calculation assumptions",
      "Contextual calculator and method links"
    ],
    "html": "<h2 id=\"difference\">Present value and future value reverse the timeline</h2><p><strong>Future value moves a stated amount forward using a chosen growth rate; present value moves a future cash flow back using a chosen discount rate.</strong> Both require dated cash flows and matched period units. Neither establishes what an uncertain investment will actually return.</p><p>Use <a href=\"/calculators/future-value-calculator/\">the Future Value calculator</a> when the question is what today’s amount plus regular deposits could become. This guide explains the comparison of dates; it does not add a separate present-value solver.</p><h2 id=\"formula\">Use consistent formulas and periods</h2><p>For a single amount, <strong>FV = PV × (1+i)<sup>n</sup></strong> and <strong>PV = FV ÷ (1+i)<sup>n</sup></strong>. Here i is the effective rate for one period and n is the number of those periods. A monthly rate must be paired with months, not years.</p><p>A nominal annual rate compounded monthly is not generally the same as the same numerical effective annual rate. Convert using the stated convention before comparing offers. The calculator displays its selected effective period rate so the result is reproducible.</p><h2 id=\"worked-example\">Follow one amount forward and backward</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Original fictional example; 5% effective annual rate, USD</caption><thead><tr><th scope=\"col\">Date or action</th><th scope=\"col\">Calculation</th><th scope=\"col\">Value</th></tr></thead><tbody><tr><th scope=\"row\">Today</th><td>Starting balance</td><td>10,000.00</td></tr><tr><th scope=\"row\">End of year 1</th><td>10,000 × 1.05</td><td>10,500.00</td></tr><tr><th scope=\"row\">End of year 2</th><td>10,500 × 1.05</td><td>11,025.00</td></tr><tr><th scope=\"row\">Discount year-2 value to today</th><td>11,025 ÷ 1.05²</td><td>10,000.00</td></tr></tbody></table></div><p>The forward and reverse calculations agree because the rate, dates and cash flow are matched. If a different discount rate is appropriate for the future payment’s risk, the reverse value will change. An arithmetic identity is not proof that a proposed return or payment is reliable.</p><h2 id=\"timeline\">Put each cash flow on a timeline</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Date-aware comparison</caption><thead><tr><th scope=\"col\">Time</th><th scope=\"col\">Lump-sum path</th><th scope=\"col\">Additional contribution path</th></tr></thead><tbody><tr><th scope=\"row\">0</th><td>Initial principal</td><td>Initial principal, plus any beginning contribution</td></tr><tr><th scope=\"row\">1</th><td>First period growth</td><td>Growth plus the contribution at its selected time</td></tr><tr><th scope=\"row\">2 and later</th><td>Continue same stated convention</td><td>Each contribution grows only after its own deposit date</td></tr></tbody></table></div><p>A deposit made near the end does not earn all the earlier years of returns. Calculate each cash flow from its own date or use a correctly matched annuity formula. See <a href=\"/blogs/ordinary-annuity-vs-annuity-due/\">the payment-timing comparison</a> for beginning versus end contributions.</p><h2 id=\"inflation\">Discounting and inflation adjustment are different tasks</h2><p>Discounting can represent the selected required return for a dated cash flow. Inflation adjustment expresses purchasing power. To restate a nominal ending balance in today’s money, divide it by (1+assumed inflation)<sup>years</sup>. Do not subtract the same inflation adjustment twice.</p><p>At 5% nominal effective growth and 2% inflation, the exact annual real growth factor is 1.05 ÷ 1.02, or about 2.9412% real growth, rather than exactly 3%. Both return and inflation are assumptions. Real-life spending baskets and returns vary.</p><h2 id=\"business-example\">Apply the timeline to a business reserve</h2><p>A business planning to replace equipment can project a reserve from current cash and fixed contributions. Label the target’s date and whether the replacement quote is today’s price or an assumed future price. Keep the reserve calculation separate from the project’s operating return.</p><p>The <a href=\"/calculators/business-roi-calculator/\">Business ROI and payback calculator</a> evaluates modeled project costs and cash benefits. It does not use the same question as a future savings balance. A positive project ROI also does not guarantee cash arrives before the equipment payment. Use a dated cash forecast for that funding question.</p><h2 id=\"mistakes\">Avoid misleading comparisons</h2><p>Do not compare one offer’s annual effective rate with another nominal rate as if they were identical. Do not use 6% annually as 6% monthly. Do not inflate a today’s-money target and then compare it with an already inflation-adjusted balance. Do not assume a high expected return is a deposit guarantee.</p><p>Fees, tax timing, withdrawals, uncertain cash flows and changing contributions can require a more complete model. The current Future Value tool excludes fees and taxes rather than producing an unsupported after-tax forecast. No 401(k)-specific contribution or withdrawal rules are included.</p><h2 id=\"choose\">Choose the right next calculation</h2><p>Known principal, deposits and horizon: use <a href=\"/calculators/future-value-calculator/\">Future Value</a>. Same deposits but changed timing: use <a href=\"/blogs/ordinary-annuity-vs-annuity-due/\">the annuity timing guide</a>. A completed business reporting period: use <a href=\"/blogs/cash-flow-statement/\">the cash flow statement</a>. A project’s cash costs and benefits: use ROI/payback.</p><p>Record rates, time units, payment dates, rounding and exclusions with your result. That record makes later comparisons meaningful; a bare future balance does not.</p><h2 id=\"sources\">Sources and assumptions</h2><p><a href=\"https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics\">OpenStax explains future value and compounding</a>; <a href=\"https://openstax.org/books/principles-finance/pages/8-2-annuities\">its annuity chapter explains periodic payments and their dates</a>. The timelines and numerical cases here are original fictional illustrations.</p><p>Treat the rate as an entered scenario, not a current quote or recommended asset return. Compare risk and terms independently before using any real financial product.</p>",
    "sectionLinks": [
      [
        "quick-answer",
        "Quick answer and calculator"
      ],
      [
        "difference",
        "Present value and future value reverse the timeline"
      ],
      [
        "formula",
        "Use consistent formulas and periods"
      ],
      [
        "worked-example",
        "Follow one amount forward and backward"
      ],
      [
        "timeline",
        "Put each cash flow on a timeline"
      ],
      [
        "inflation",
        "Discounting and inflation adjustment are different tasks"
      ],
      [
        "business-example",
        "Apply the timeline to a business reserve"
      ],
      [
        "mistakes",
        "Avoid misleading comparisons"
      ],
      [
        "choose",
        "Choose the right next calculation"
      ],
      [
        "sources",
        "Sources and assumptions"
      ],
      [
        "guide-faqs",
        "Questions and answers"
      ]
    ],
    "faq": [
      {
        "q": "Is present value always lower than future value?",
        "a": "With a positive rate and positive time for one positive cash flow, yes. At zero rate they agree; a negative effective rate can reverse the relationship."
      },
      {
        "q": "Is present value just inflation adjustment?",
        "a": "No. A discount rate can reflect a selected required return and risk, whereas inflation adjustment expresses purchasing power under an inflation assumption."
      },
      {
        "q": "Can I compare monthly and annual rates directly?",
        "a": "Only after converting them to a common effective period and matching the cash-flow dates."
      },
      {
        "q": "Does a future value projection guarantee the balance?",
        "a": "No. A fixed-rate calculation follows entered assumptions. Actual returns, deposits, fees and tax can differ."
      }
    ],
    "answerHtml": "<p id=\"quick-answer\">Quick answer: at a matched 5% effective annual rate, $10,000 today grows to $11,025 in two years; discounting that same future amount returns $10,000. <a href=\"/calculators/future-value-calculator/\">Project a balance with your own assumptions</a>.</p>"
  },
  {
    "slug": "ordinary-annuity-vs-annuity-due",
    "title": "Ordinary Annuity vs Annuity Due: Payment Timing Explained",
    "seoTitle": "Ordinary Annuity vs Annuity Due: Examples",
    "description": "Compare end-period and beginning-period payments with timelines and worked examples. Match contribution frequency, compounding and valuation date.",
    "metaDescription": "Compare end-period and beginning-period payments with timelines and worked examples. Match contribution frequency, compounding and valuation date.",
    "opening": "The same deposits can have different time to grow.",
    "tag": "Break-Even Concepts",
    "tags": [
      "Ordinary annuity",
      "Annuity due",
      "Contribution timing"
    ],
    "cluster": "time-value-of-money",
    "calculatorSlug": "future-value-calculator",
    "image": "/images/blog/finance-day1-ordinary-annuity-vs-annuity-due.webp",
    "alt": "Beginning, period and end markers illustrate the timing of equal recurring contributions",
    "imageCaption": "Original MyBreakeven editorial illustration; the guide uses independent fictional examples, not customer results.",
    "published": "2026-10-26",
    "modified": "2026-10-26",
    "editorialStatus": "published",
    "features": [
      "Original reconciled examples",
      "Explicit calculation assumptions",
      "Contextual calculator and method links"
    ],
    "html": "<h2 id=\"difference\">The difference is when each payment happens</h2><p><strong>An ordinary annuity has payments at the end of each period; an annuity due has payments at the beginning.</strong> For otherwise identical deposits and a positive period rate, beginning payments have one extra period of growth at the common ending date. “Annuity” here means a regular cash-flow pattern, not a recommendation to buy an insurance product.</p><p>The <a href=\"/calculators/future-value-calculator/\">Future Value calculator</a> supports both timing conventions. Enter the same principal, contribution, rate and horizon before changing only the timing option.</p><h2 id=\"timeline\">Draw the payment dates first</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Two annual contributions valued at the end of year 2</caption><thead><tr><th scope=\"col\">Time</th><th scope=\"col\">Ordinary / end</th><th scope=\"col\">Due / beginning</th></tr></thead><tbody><tr><th scope=\"row\">Start of year 1, t=0</th><td>No contribution</td><td>First contribution</td></tr><tr><th scope=\"row\">End of year 1 / start of year 2, t=1</th><td>First contribution</td><td>Second contribution</td></tr><tr><th scope=\"row\">End of year 2, t=2</th><td>Second contribution; value total</td><td>Value total; no third contribution</td></tr></tbody></table></div><p>Both paths contain exactly two contributions. Do not accidentally put a third payment at the final date in the beginning case. A deposit count error can matter more than the interest calculation. Initial principal is a separate cash flow and is not another recurring contribution.</p><h2 id=\"formulas\">Apply the matched-period annuity formulas</h2><p>For n equal end-period payments P and effective period rate i: <strong>FV ordinary = P × [(1+i)<sup>n</sup> − 1] ÷ i</strong>. Beginning-period future value is <strong>FV due = FV ordinary × (1+i)</strong>. Add PV × (1+i)<sup>n</sup> separately for initial principal.</p><p>At i=0, both contribution totals are P×n. The due multiplier applies to the contribution stream, not the existing principal. For a negative valid effective rate, beginning contributions can finish lower because they experience the negative rate for longer.</p><h2 id=\"annual-example\">Compare two $1,000 annual deposits</h2><div class=\"article-table-scroll\"><table class=\"article-records-table\"><caption>Original fictional USD example; 5% effective annual rate</caption><thead><tr><th scope=\"col\">Payment</th><th scope=\"col\">Ordinary value at t=2</th><th scope=\"col\">Due value at t=2</th></tr></thead><tbody><tr><th scope=\"row\">First 1,000</th><td>1,000 × 1.05 = 1,050</td><td>1,000 × 1.05² = 1,102.50</td></tr><tr><th scope=\"row\">Second 1,000</th><td>1,000</td><td>1,000 × 1.05 = 1,050</td></tr><tr><th scope=\"row\">Total</th><td>2,050</td><td>2,152.50</td></tr></tbody></table></div><p>The $102.50 difference is payment timing under the stated assumptions. It is not an extra deposit or a guaranteed bonus. If there is also $10,000 initial principal, both paths add the same $11,025 principal future value; do not multiply that amount by another 1.05.</p><h2 id=\"monthly-example\">Check a short monthly example</h2><p>With no initial principal, $100 per month, two months and 1% effective monthly growth, end-month deposits finish at $100×1.01 + $100 = <strong>$201</strong>. Beginning deposits finish at $100×1.01² + $100×1.01 = <strong>$203.01</strong>.</p><p>To reproduce a monthly rate through an annual input, use a matched convention: 12% nominal compounded monthly gives 1% per month. An effective annual rate of 12% gives a smaller monthly effective rate. Keep these labels visible rather than dividing every annual rate by twelve.</p><h2 id=\"frequency\">Contribution frequency is not compounding frequency</h2><p>A bank or projection may quote monthly compounding while the user deposits quarterly. The effective quarterly rate must represent the growth across that three-month payment interval. Under the calculator’s disclosed equivalent-rate convention, nominal j compounded m times a year converts to payment-period rate (1+j/m)<sup>m/p</sup>−1 for p payments per year.</p><p>The tool requires whole contribution periods. Annual contributions need a horizon made of whole years, quarterly contributions whole quarters and monthly contributions whole months. It does not invent a fractional final deposit.</p><h2 id=\"business-use\">Use timing without assuming it is free money</h2><p>Beginning contributions may reduce cash available for payroll or suppliers earlier in the period. A savings projection does not check those operating commitments. For a replacement reserve, choose deposit dates the business can actually fund and compare them with the payment calendar.</p><p>Use <a href=\"/calculators/cash-flow-forecast-template/\">the dated cash forecast</a> for short-term liquidity and <a href=\"/blogs/present-value-vs-future-value/\">present versus future value</a> to compare money on a common date. Payment timing and product risk remain separate decisions.</p><h2 id=\"errors\">Check the common timing mistakes</h2><p>Do not mix rent paid at the beginning with a formula assuming end payments. Do not give the final ordinary deposit a full extra period of growth. Do not add n+1 deposits to a horizon defined as n contribution periods. Do not multiply the whole balance, including existing principal, by the due adjustment.</p><p>Schedules may display cents while the engine retains precision. Sum unrounded values when reconciling; a one-cent display difference across independently rounded rows is not an extra return. Download the tool’s CSV with its assumptions when saving a scenario.</p><h2 id=\"sources\">Sources and next step</h2><p><a href=\"https://openstax.org/books/principles-finance/pages/8-2-annuities\">OpenStax discusses ordinary annuities and annuities due</a>. The payment timelines, business application and numerical examples here are original teaching cases.</p><p>Return to <a href=\"/calculators/future-value-calculator/\">the Future Value calculator</a> to change contribution timing while keeping all other inputs constant. The fixed-rate model does not forecast market returns or decide whether an annuity product suits your circumstances.</p>",
    "sectionLinks": [
      [
        "quick-answer",
        "Quick answer and calculator"
      ],
      [
        "difference",
        "The difference is when each payment happens"
      ],
      [
        "timeline",
        "Draw the payment dates first"
      ],
      [
        "formulas",
        "Apply the matched-period annuity formulas"
      ],
      [
        "annual-example",
        "Compare two $1,000 annual deposits"
      ],
      [
        "monthly-example",
        "Check a short monthly example"
      ],
      [
        "frequency",
        "Contribution frequency is not compounding frequency"
      ],
      [
        "business-use",
        "Use timing without assuming it is free money"
      ],
      [
        "errors",
        "Check the common timing mistakes"
      ],
      [
        "sources",
        "Sources and next step"
      ],
      [
        "guide-faqs",
        "Questions and answers"
      ]
    ],
    "faq": [
      {
        "q": "Which has higher future value, ordinary annuity or annuity due?",
        "a": "For the same positive period rate, dates and contribution count, annuity due is higher because each payment grows for one extra period. At zero rate they agree."
      },
      {
        "q": "Does the due multiplier apply to my starting balance?",
        "a": "No. It applies to the recurring payment stream. Initial principal follows its own full-horizon growth formula."
      },
      {
        "q": "Can contributions and compounding have different frequencies?",
        "a": "Yes, with a disclosed effective-rate conversion and consistent payment intervals. The calculator supports annual, quarterly and monthly contributions."
      },
      {
        "q": "Does this calculator price an insurance annuity?",
        "a": "No. It models equal periodic cash flows at a constant assumed rate, without product-specific fees, guarantees or contract terms."
      }
    ],
    "answerHtml": "<p id=\"quick-answer\">Quick answer: ordinary payments occur at period end; due payments occur at the beginning. Two $1,000 annual deposits at 5% finish at $2,050 versus $2,152.50 respectively. <a href=\"/calculators/future-value-calculator/\">Compare timing in the calculator</a>.</p>"
  }
];
