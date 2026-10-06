export const businessTools = {
  "break-even-roas-calculator": {
    "mode": "roas",
    "name": "Break-Even ROAS Calculator",
    "category": "Advertising",
    "resultLabel": "Break-even ROAS before fixed overhead",
    "title": "Break-Even ROAS Calculator | MyBreakeven",
    "description": "Calculate break-even ROAS after product costs and fees. Compare ad performance, maximum CPA and the ROAS needed for your contribution target.",
    "intro": "Find the ad return your order economics need. Compare your actual ROAS with the contribution left after delivery costs, fees and advertising.",
    "defaults": {
      "price": 80,
      "cost": 44,
      "fee": 3,
      "spend": 1000,
      "revenue": 4000,
      "margin": 10
    },
    "fields": [
      [
        "price",
        "Average order value",
        "Net order revenue after discounts and refunds. Exclude tax collected for others."
      ],
      [
        "cost",
        "Direct cost per order, before ads",
        "Product, delivery, fulfillment and flat fees. Exclude ad spend and percentage fees entered separately."
      ],
      [
        "fee",
        "Payment / selling fee (%)",
        "Use the blended percentage fee for these orders."
      ],
      [
        "spend",
        "Ad spend for the period",
        "Spend attributed to the same period and revenue window."
      ],
      [
        "revenue",
        "Ad-attributed net revenue",
        "Use revenue after refunds. Attribution is your input, not verified by this tool."
      ],
      [
        "margin",
        "Target margin after ads (%)",
        "Desired share of revenue remaining after direct costs, fees and ads. Fixed overhead is excluded."
      ]
    ],
    "quick": "Break-even ROAS is 1 divided by contribution margin before ads. An $80 order with $44 direct cost and a 3% fee leaves $33.60, or 42% contribution. Its break-even ROAS is 2.38×. At 4× ROAS on $1,000 spend, $680 remains after direct costs, fees and ads, before fixed overhead.",
    "features": [
      "Instant results as you change inputs, with plain-language explanations.",
      "A checked example, transparent formula and step-by-step input guide.",
      "Searchable global currency labels, including USD, GBP, EUR, CAD and AUD; no exchange-rate conversion.",
      "No signup required; calculation inputs remain in this browser tab.",
      "Break-even and target ROAS from your actual order cost mix.",
      "Maximum ad cost per order and contribution after advertising."
    ],
    "guide": "/blogs/break-even-roas-formula/",
    "guideLabel": "Break-even ROAS formula and ecommerce examples",
    "image": "/images/tools/break-even-roas-calculator.webp",
    "alt": "Ad planning example: an $80 order leaves 42% contribution and needs 2.38 times return on ad spend before fixed overhead.",
    "caption": "Illustrative order economics: $80 order value, $44 direct cost and a 3% fee. This is a campaign contribution threshold, not whole-business break-even.",
    "assumptions": "The model uses a stable average order value and direct cost mix. Percentage fees are unchanged. Revenue and spend must use the same attribution window. It excludes fixed overhead, owner pay, taxes and unentered retention costs. Refunds must already be reflected in net revenue and your cost allowance. Attribution does not prove incremental sales.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to calculate break-even ROAS after fees",
        "paragraphs": [
          "Use one campaign or a comparable group of orders over a consistent period. If you mix a low-margin product with a high-margin product, the average must represent the orders your advertising actually sells."
        ],
        "steps": [
          "Enter net average order value after discounts and refunds.",
          "Enter direct cost before advertising: products, fulfillment, shipping subsidies and flat fees.",
          "Enter the percentage selling fee separately. Do not count it again in direct cost.",
          "Add ad spend and ad-attributed net revenue for the same reporting window.",
          "Choose a target margin after ads and compare the actual return with both thresholds."
        ]
      },
      {
        "id": "formula",
        "title": "Break-even ROAS and maximum CPA formulas",
        "paragraphs": [
          "Contribution per order = order value × (1 − fee rate) − direct cost. Contribution margin = contribution ÷ order value. Break-even ROAS = 1 ÷ contribution margin.",
          "Actual ROAS = attributed revenue ÷ ad spend. Contribution after ads = attributed revenue × contribution margin − ad spend. Maximum CPA before fixed overhead equals contribution per order.",
          "Target ROAS = 1 ÷ (contribution margin − target margin). Use decimals in this formula. If the target margin is at least the pre-ad contribution margin, there is no finite ROAS that reaches that target with positive ad spend."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Does a 4× ROAS mean your ads are profitable?",
        "paragraphs": [
          "These examples are fictional planning assumptions, not advertising benchmarks. At $80 order value, $44 direct cost and 3% fees, contribution is $80 − $2.40 − $44 = $33.60. Margin before ads is 42%; break-even ROAS is 1 ÷ 0.42 = 2.380952…×.",
          "With $1,000 spend and $4,000 attributed net revenue, actual ROAS is 4×. Estimated contribution after ads is $4,000 × 0.42 − $1,000 = $680. A target of 10% revenue left after ads requires 1 ÷ (0.42 − 0.10) = 3.125×.",
          "If direct cost rises to $60, contribution falls to $17.60, or 22%. Break-even ROAS rises to 4.54545…×. The same 4× return now leaves $4,000 × 0.22 − $1,000 = −$120. A fixed ROAS benchmark misses this cost change."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Read campaign contribution before increasing spend",
        "paragraphs": [
          "A positive result covers the modeled direct costs, fees and ads. It still has to fund rent, salaries, software and owner pay. Use the ecommerce break-even calculator to add those monthly commitments.",
          "Maximum CPA is a per-order ceiling before overhead, not a recommended bid. Actual platform attribution can include sales that would have happened without the ads. Compare the model with refund-adjusted records and your own testing."
        ]
      },
      {
        "id": "mistakes",
        "title": "Common ROAS calculation mistakes",
        "steps": [
          "Using gross revenue before returns alongside net costs.",
          "Counting ads in direct order cost and again as ad spend.",
          "Comparing different attribution windows or currencies.",
          "Calling the contribution after ads net profit.",
          "Using one average margin when ads change the product mix."
        ]
      }
    ],
    "faq": [
      [
        "What is a good break-even ROAS?",
        "There is no universal number. Your direct costs and fees determine the contribution margin. A 42% margin before ads needs about 2.38×; a 22% margin needs about 4.55×, both before overhead."
      ],
      [
        "Is ROAS the same as ROI?",
        "No. ROAS compares attributed revenue with ad spend. This tool also shows contribution after direct costs and ads, but does not calculate whole-business ROI."
      ],
      [
        "Can I use this for Meta or Google Ads?",
        "Yes, if you supply consistent net revenue and spend from the same reporting window. The tool does not connect to either platform or verify attribution."
      ],
      [
        "Why is target ROAS not attainable?",
        "Your requested post-ad margin leaves no positive allowance for ads. Lower the target or improve the order contribution before comparing returns."
      ],
      [
        "Does maximum CPA include overhead?",
        "No. It is the contribution available per order before advertising and fixed overhead. Set a lower operational ceiling if you need those orders to fund monthly commitments."
      ]
    ],
    "sources": [
      [
        "Shopify: break-even ROAS method",
        "https://www.shopify.com/uk/blog/break-even-roas-calculator"
      ]
    ],
    "related": [
      [
        "Ecommerce business break-even calculator",
        "/calculators/ecommerce-break-even-calculator/"
      ]
    ]
  },
  "hourly-rate-calculator": {
    "mode": "hourly",
    "name": "Hourly Rate Calculator",
    "category": "Freelance pricing",
    "resultLabel": "Minimum hourly billing rate",
    "title": "Hourly Rate Calculator for Freelancers | MyBreakeven",
    "description": "Calculate a freelance hourly rate from income, overhead, working weeks, billable time and fees. Check annual hours and the revenue your plan needs.",
    "intro": "Build a billing rate around the hours you can actually sell. Include time off, admin work, business overhead and your income goal.",
    "defaults": {
      "income": 4000,
      "overhead": 600,
      "profit": 400,
      "hours": 35,
      "weeks": 46,
      "billable": 60,
      "fee": 3
    },
    "fields": [
      [
        "income",
        "Monthly owner income goal",
        "Before personal income tax. This is what you want the business to fund."
      ],
      [
        "overhead",
        "Monthly business overhead",
        "Software, insurance, rent and other committed business costs."
      ],
      [
        "profit",
        "Monthly profit buffer",
        "An additional business profit target above owner income. Use zero if none."
      ],
      [
        "hours",
        "Working hours per week",
        "All working time, including admin and sales. Maximum 168."
      ],
      [
        "weeks",
        "Working weeks per year",
        "Exclude holiday, sickness and other time you do not work. Maximum 52."
      ],
      [
        "billable",
        "Billable share of working time (%)",
        "The share of working hours you expect to invoice and collect. Above 0%, up to 100%."
      ],
      [
        "fee",
        "Payment / platform fee (%)",
        "Percentage taken from billed revenue; below 100%."
      ]
    ],
    "quick": "Divide annual owner income, overhead and profit needs by annual billable hours, then gross up for percentage fees. A $4,000 monthly income goal, $600 overhead and $400 buffer need $60,000 a year. At 35 weekly hours, 46 weeks and 60% billable time, a 3% fee requires at least $64.04 per billed hour.",
    "features": [
      "Instant results as you change inputs, with plain-language explanations.",
      "A checked example, transparent formula and step-by-step input guide.",
      "Searchable global currency labels, including USD, GBP, EUR, CAD and AUD; no exchange-rate conversion.",
      "No signup required; calculation inputs remain in this browser tab.",
      "Billable-time and working-week adjustments for realistic annual capacity.",
      "A rate rounded upward to the next cent, with monthly and annual checks."
    ],
    "guide": "/calculators/agency-break-even-calculator/",
    "guideLabel": "Agency and freelancer business break-even calculator",
    "image": "/images/tools/hourly-rate-calculator.webp",
    "alt": "Freelance pricing example: 966 annual billable hours require a $64.04 hourly rate to fund a $60,000 annual need after a 3% fee.",
    "caption": "Illustrative scenario: 35 working hours per week, 46 working weeks and 60% billable time. Income targets are before personal income tax.",
    "assumptions": "The model assumes all planned billable hours are sold and collected at one rate. Monthly income, overhead and profit targets are annualized over 12 months. It excludes unentered per-project costs, unpaid invoices, tax calculations and changes in workload. The fee applies to all billed revenue. Currency selection changes labels only.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to calculate a freelance hourly rate",
        "paragraphs": [
          "Start with the income your business needs to fund before personal income tax. Add costs the business must pay regardless of which client buys your time."
        ],
        "steps": [
          "Enter your monthly owner income goal and overhead.",
          "Add a separate profit buffer if you want retained business profit.",
          "Enter total weekly work hours and the weeks you plan to work each year.",
          "Estimate billable share after admin, prospecting, meetings and revisions you cannot invoice.",
          "Add payment or platform fees. Check the resulting rate against the hours you can realistically sell."
        ]
      },
      {
        "id": "formula",
        "title": "Hourly rate formula with non-billable time and fees",
        "paragraphs": [
          "Annual billable hours = weekly working hours × working weeks × billable percentage. Annual funding need = (monthly owner income + monthly overhead + monthly profit target) × 12.",
          "Required rate = annual funding need ÷ annual billable hours ÷ (1 − percentage fee). Round upward to the next currency cent so the displayed rate does not underfund the target.",
          "Average monthly billable hours are annual billable hours ÷ 12. This average smooths time off across the year; it does not assume every month has the same invoicing pattern."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Freelance hourly rate example with 60% billable time",
        "paragraphs": [
          "Illustrative example: owner income $4,000, overhead $600 and profit buffer $400 total $5,000 per month, or $60,000 a year. Weekly hours 35 × 46 working weeks × 60% billable time = 966 billable hours.",
          "The fee-adjusted rate is $60,000 ÷ 966 ÷ 0.97 = $64.0333… per hour. Rounded upward, charge at least $64.04 under these assumptions. Annual billed revenue is $64.04 × 966 = $61,862.64. After a 3% fee, $60,006.7608 remains to fund the annual need.",
          "If billable share falls to 40%, annual billable hours fall to 644. The same funding need requires $96.05 per billed hour. This is a capacity issue: more total working hours do not help if the additional hours cannot be invoiced."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Understand minimum rate versus a market price",
        "paragraphs": [
          "The result is your funding threshold, not evidence that customers will accept the rate. Test it against the work scope, delivery skill, buyer demand and observed client budgets. A project quote can also price scope and outcomes rather than hours.",
          "The monthly amount after fees and overhead should cover owner income and the entered profit buffer. If a job needs materials, subcontractors or other project costs, charge them separately or use the agency calculator for that delivery model."
        ]
      },
      {
        "id": "mistakes",
        "title": "Common hourly pricing mistakes",
        "steps": [
          "Dividing income by every working hour instead of billable hours.",
          "Using 52 working weeks while planning several weeks away.",
          "Counting personal income tax as already included when it is not.",
          "Adding profit buffer but forgetting committed overhead.",
          "Assuming invoiced hours are collected when clients pay late or do not pay."
        ]
      }
    ],
    "faq": [
      [
        "Should I use 40 hours as billable time?",
        "Only if you actually invoice and collect for all 40 hours. Enter total working hours first, then reduce the billable share for admin, marketing and non-chargeable delivery time."
      ],
      [
        "Does the hourly rate include tax?",
        "It does not calculate personal income tax, sales tax or VAT. The owner income goal is before personal income tax. Adjust your own funding target with qualified advice where needed."
      ],
      [
        "Why are fees divided out instead of added?",
        "A percentage fee takes a share of the final billed amount. Dividing by the retained percentage funds the target exactly; adding the same percentage does not."
      ],
      [
        "Can I price projects with this?",
        "Use the rate as an internal labor funding reference and multiply by estimated billable project hours. Add direct project costs and check scope changes separately."
      ],
      [
        "Is this the best rate for my market?",
        "No. It is a minimum funding rate under your assumptions. Your market price also depends on demand, scope, value and how reliably you can sell the modeled hours."
      ]
    ],
    "related": [
      [
        "Price increase and customer-loss calculator",
        "/calculators/price-increase-calculator/"
      ]
    ]
  },
  "cash-runway-calculator": {
    "mode": "runway",
    "name": "Cash Runway Calculator",
    "category": "Cash planning",
    "resultLabel": "Time until your cash reserve boundary",
    "title": "Cash Runway Calculator for Small Business | MyBreakeven",
    "description": "Calculate cash runway after a reserve buffer using monthly cash receipts and payments. View a cash projection and the funding gap for your planning horizon.",
    "intro": "See how long available cash can fund your monthly cash gap. Protect a reserve and check the projected balance over your chosen horizon.",
    "defaults": {
      "cash": 30000,
      "reserve": 6000,
      "incoming": 7000,
      "outgoing": 10000,
      "months": 6
    },
    "fields": [
      [
        "cash",
        "Cash available today",
        "Accessible business cash. Exclude uncollected invoices and unapproved borrowing."
      ],
      [
        "reserve",
        "Cash reserve to protect",
        "Part of current cash you want to keep untouched. Cannot exceed cash."
      ],
      [
        "incoming",
        "Monthly cash received",
        "Money actually expected to arrive, not just revenue invoiced."
      ],
      [
        "outgoing",
        "Monthly cash paid",
        "All expected cash payments, including owner withdrawals and debt payments."
      ],
      [
        "months",
        "Planning horizon (months)",
        "Whole months from 1 to 36. Used for the balance table and reserve funding gap.",
        "1"
      ]
    ],
    "quick": "Cash runway equals cash above your protected reserve divided by monthly net cash burn. With $30,000 cash, a $6,000 reserve, $7,000 monthly receipts and $10,000 monthly payments, usable cash is $24,000 and burn is $3,000 per month. Runway to the reserve is 8 months; after 6 months, $12,000 cash remains.",
    "features": [
      "Instant results as you change inputs, with plain-language explanations.",
      "A checked example, transparent formula and step-by-step input guide.",
      "Searchable global currency labels, including USD, GBP, EUR, CAD and AUD; no exchange-rate conversion.",
      "No signup required; calculation inputs remain in this browser tab.",
      "Protected reserve, net burn and full-month runway in one view.",
      "A month-by-month constant-flow cash table and horizon funding gap."
    ],
    "guide": "/blogs/cash-flow-forecast-vs-break-even/",
    "guideLabel": "Cash-flow forecasts versus break-even planning",
    "image": "/images/tools/cash-runway-calculator.webp",
    "alt": "Cash planning example: $24,000 above reserve and $3,000 monthly cash burn provide eight months of runway.",
    "caption": "Illustrative constant-flow projection: $30,000 starting cash, $6,000 reserve, $7,000 receipts and $10,000 payments each month.",
    "assumptions": "Receipts and payments stay constant and are evenly spread for the fractional-month runway estimate. The model excludes unentered one-off purchases, new financing and seasonal changes. It reports time to your reserve, not a legal insolvency date. A monthly ending balance can miss an earlier payment shortfall within that month. Use a dated cash-flow forecast for actual payment scheduling.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to calculate small-business cash runway with a reserve",
        "paragraphs": [
          "Use accessible cash today and expected receipts and payments, rather than accounting profit. An invoice sent today may not turn into spendable cash for several weeks."
        ],
        "steps": [
          "Enter cash you can access now. Do not add uncollected invoices.",
          "Choose how much of that cash should remain as a reserve.",
          "Enter monthly cash you expect to receive and pay. Include taxes, debt payments and owner withdrawals if applicable; do not double-count them.",
          "Choose a planning horizon from 1 to 36 whole months.",
          "Read time to reserve alongside the projected monthly balances. Reconcile seasonal or one-off payments in a dated forecast."
        ]
      },
      {
        "id": "formula",
        "title": "Cash runway formula using net burn",
        "paragraphs": [
          "Usable cash = current cash − protected reserve. Monthly net cash burn = monthly payments − monthly receipts. Runway to reserve = usable cash ÷ positive monthly burn.",
          "Ending cash at month N = current cash − net burn × N. Extra cash needed to protect reserve = the greater of zero and (net burn × N − usable cash).",
          "When receipts equal or exceed payments and cash is above reserve, the constant-flow model has no depletion horizon. If current cash already equals reserve, the tool reports zero room above reserve today even if future receipts would build cash."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Cash runway example for a six-month planning horizon",
        "paragraphs": [
          "These are illustrative cash assumptions. Start with $30,000 accessible cash and protect $6,000. Usable cash is $24,000. With $10,000 monthly payments and $7,000 receipts, monthly net burn is $3,000.",
          "Runway to the reserve is $24,000 ÷ $3,000 = 8 months. Six-month ending cash is $30,000 − 6 × $3,000 = $12,000, so no additional cash is needed to keep the $6,000 reserve over that horizon.",
          "If receipts fall to $5,000 while payments remain $10,000, burn rises to $5,000. Runway becomes 4.8 months, or four full months above reserve. After six months, projected cash is zero; the reserve funding gap is $6,000. Negative later balances show a cash need, not money the business can actually spend."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Read cash runway without confusing it with profit",
        "paragraphs": [
          "A profitable business can still have a cash gap when customers pay late, inventory is purchased early or loans are repaid. Count money when you expect it to move. The result is a simple planning screen, not a forecast based on your transaction dates.",
          "A no-depletion result means only that the entered recurring receipts cover payments. Recheck when contracts end, tax payments arrive or large purchases are planned. The reserve is your assumption; the tool does not prescribe a universal safe buffer."
        ]
      },
      {
        "id": "mistakes",
        "title": "Common cash runway mistakes",
        "steps": [
          "Counting unpaid invoices as cash available today.",
          "Using revenue earned instead of cash received.",
          "Leaving owner withdrawals or debt payments outside monthly payments.",
          "Assuming a positive monthly ending balance means every earlier bill can be paid.",
          "Ignoring one-off purchases, seasonality or funding that has not been secured."
        ]
      }
    ],
    "faq": [
      [
        "What is the difference between cash runway and profit?",
        "Runway measures available cash against cash moving in and out. Profit uses accounting revenue and costs. Timing differences mean a profitable business can still run out of spendable cash."
      ],
      [
        "Why protect a reserve?",
        "The reserve defines cash you do not want the plan to consume. Choose it for your own needs; there is no universal reserve amount built into this calculator."
      ],
      [
        "What if monthly cash burn is zero or negative?",
        "When cash is above reserve, the model shows no depletion at the entered pace. Receipts cover payments. This does not account for unentered seasonal or one-off expenses."
      ],
      [
        "Does 4.8 months mean I can pay every bill for that long?",
        "No. Fractional runway assumes the net flow is evenly spread. Actual payment dates may create a shortfall earlier. Use a dated cash-flow forecast for payment decisions."
      ],
      [
        "Can the projection show negative cash?",
        "Yes. A negative ending balance represents an unfunded cash requirement. The tool does not assume overdraft or borrowing is available."
      ]
    ],
    "sources": [
      [
        "business.gov.au: cash-flow statement and forecasting",
        "https://business.gov.au/finance/cash-flow/set-up-a-cash-flow-statement"
      ]
    ],
    "related": [
      [
        "Hourly rate and billable capacity calculator",
        "/calculators/hourly-rate-calculator/"
      ]
    ]
  }
};
