export const roiTools = {
  "business-roi-calculator": {
    "mode": "roi",
    "name": "Business ROI & Payback Calculator",
    "category": "Cash & investment",
    "resultLabel": "ROI on total modeled cost",
    "title": "Business ROI Calculator: Payback & AI Savings",
    "description": "Calculate business ROI, net benefit and payback after setup and recurring costs. Compare AI automation savings, extra capacity and workload scenarios.",
    "intro": "Test a business investment or AI workflow before committing cash. Separate actual payment savings from released time, include ongoing costs and see when the initial cash outlay could be recovered.",
    "defaults": {
      "setup": 6000,
      "recurring": 200,
      "months": 12,
      "delay": 0,
      "contribution": 1200,
      "cashSaving": 0
    },
    "fields": [
      [
        "setup",
        "One-time investment",
        "Incremental setup, implementation and paid training cash; counted once."
      ],
      [
        "recurring",
        "Fixed monthly running cost",
        "Starts in month one, even during benefit delay."
      ],
      [
        "months",
        "Planning horizon (months)",
        "Whole 1–60 months."
      ],
      [
        "delay",
        "Benefit delay (months)",
        "Whole 0–60 months before any benefit or usage cost."
      ]
    ],
    "reviewed": "2026-10-18",
    "quick": "ROI = (total modeled benefits − total modeled costs) ÷ total modeled costs × 100. In the fictional AI example, $200 monthly cash savings less $100 running cost gives $100 net per active month. With $600 setup and 12 active months, total costs are $1,800, net benefit is $600 and total-cost ROI is 33.33%. Simple payback is six months. The other 30 saved hours are capacity, not cash.",
    "features": [
      "Business investment and AI automation modes with independent inputs.",
      "Total-cost ROI, net modeled cash benefit, fractional payback and month-end recovery.",
      "AI task adoption, human review, paid-hours changes and remaining capacity kept separate.",
      "Lower, entered and higher workload comparisons with per-task AI cost scaling.",
      "Month-zero investment and monthly cumulative recovery table.",
      "Global currency labels with no exchange conversion; browser-only inputs.",
      "CSV snapshot and browser print / save PDF."
    ],
    "guide": "/blogs/cash-flow-break-even-vs-profit-break-even/",
    "guideLabel": "Understand cash-flow versus profit break-even",
    "image": "/images/tools/business-roi-calculator-editorial.webp",
    "alt": "Business ROI and payback cover with a calculator, recovery-date calendar and connected AI workflow tiles.",
    "caption": "AI-generated editorial illustration; not a real client or a verified investment result.",
    "theme": {
      "--tool-accent": "#3153a0",
      "--tool-soft": "#edf3ff",
      "--tool-dark": "#142747",
      "--tool-radius": "18px"
    },
    "assumptions": "This is a pre-tax, undiscounted incremental cash planning model, not accounting net profit, NPV, IRR or a demand forecast. Benefits start after the entered delay; fixed running cost starts in month one. There is no terminal asset/resale value, financing, depreciation or unentered tax/cost. Monthly benefits and costs are constant after launch. Fractional payback assumes smooth cash timing within a month; real dates and intramonth shortfalls require a cash forecast. Saved salary time is not a cash saving unless actual paid hours change. Extra contribution requires completed and collected extra work. Currency changes relabel amounts; they do not convert values.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the business ROI calculator",
        "steps": [
          "Choose Business investment or AI automation. Switching preserves each mode’s separate inputs.",
          "Choose one currency and a whole-month planning horizon. Enter all costs and benefits in that same currency.",
          "Enter incremental one-time cash investment and fixed monthly costs. Exclude costs already paid regardless of the decision.",
          "Business mode: enter additional collected contribution after incremental variable costs, plus genuinely avoidable cash payments. Do not enter gross sales as contribution.",
          "AI mode: enter eligible task volume, adoption, before/after time including checking, and the share of net hours that actually changes paid labor.",
          "Only monetize remaining released hours when there is capacity, sell-through and a defensible contribution per hour. Do not count the same hours as both payroll savings and new work.",
          "Compare lower workload, entered workload and higher workload. Review the month-by-month cash path and actual payment dates before acting."
        ]
      },
      {
        "id": "formula",
        "title": "ROI and payback formulas: one explicit cost boundary",
        "paragraphs": [
          "Total modeled costs = one-time investment + all fixed monthly running costs + active-month per-task AI costs + any additional paid labor required. Total benefits = active-month incremental contribution + actual avoided cash payments. Net benefit = total benefits − total costs. ROI (%) = net benefit ÷ total costs × 100. Zero total cost makes ROI undefined, even if a benefit exists.",
          "With no delay and a positive stable monthly net benefit, fractional payback = setup cash ÷ monthly net benefit. With d months of benefit delay: payback = d + (setup + d × fixed monthly cost) ÷ active monthly net benefit. A zero or negative active net benefit has no finite payback in this model. A result beyond the chosen horizon is labeled as such.",
          "The table records the full setup outlay at month zero, then each month’s cash benefits less cash costs. It identifies the first recovered month-end within the chosen horizon. Fractional payback and the first recovered month-end can differ.",
          "ROI uses the selected horizon and a total-cost denominator. It is not the return divided only by setup cost, and it is not annualized CAGR. Comparing different horizons without that context can mislead."
        ]
      },
      {
        "id": "ai-method",
        "title": "How the AI automation mode values saved time",
        "paragraphs": [
          "Adopted tasks = eligible monthly tasks × adoption rate. Net saved hours = adopted tasks × (manual minutes − AI minutes including human review and correction) ÷ 60. Paid-hours change = net saved hours × paid-hours conversion rate. Multiply that signed hours change by loaded hourly cost.",
          "A positive paid-hours change counts as avoided labor cash; a negative change creates an additional labor cost. A zero paid-hours share models fixed salary cash even when the workflow frees or consumes time. Remaining hours = net saved hours − paid-hours change.",
          "Assumed extra sold hours = max(remaining hours, 0) × sell-through rate. Extra contribution = sold hours × collected contribution per hour after incremental delivery costs. This partitions the time: paid hours are not available again for selling.",
          "A slower AI workflow may consume capacity. The model shows that instead of clamping all time savings to zero. No automatic performance improvement, hourly rate or tool price is promised. Per-task cost covers your own API/usage estimate; fixed subscription and maintenance belong in fixed monthly cost."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Reproduce the fictional worked examples",
        "table": {
          "caption": "12-month examples, USD, no benefit delay; not market benchmarks",
          "headers": [
            "Case",
            "Benefits",
            "Total cost",
            "Net benefit",
            "Total-cost ROI",
            "Simple payback"
          ],
          "rows": [
            [
              "Business investment",
              "$14,400",
              "$8,400",
              "$6,000",
              "71.43%",
              "6 months"
            ],
            [
              "AI: paid hours actually fall",
              "$2,400",
              "$1,800",
              "$600",
              "33.33%",
              "6 months"
            ],
            [
              "AI: same fixed salary, no extra sales",
              "$0",
              "$1,800",
              "−$1,800",
              "−100%",
              "No finite payback"
            ]
          ]
        },
        "paragraphs": [
          "Business case: $6,000 setup, $200 monthly running cost and $1,200 monthly additional collected contribution. Net monthly benefit is $1,000; 12 months gives $14,400 benefit minus $8,400 total cost.",
          "AI case: 80 adopted tasks at 60 manual minutes versus 30 minutes with AI and human checking saves 40 hours. At $20/hour and 25% paid-hours conversion, 10 paid hours save $200. Thirty hours remain as capacity. With $100 monthly running cost, no per-task charge and $600 setup, net monthly cash benefit is $100.",
          "If payroll stays unchanged and none of the released capacity is sold, set paid-hours conversion and capacity sell-through to zero. Forty hours can still be released, but the tool reports no labor cash savings and no assumed sales.",
          "For a two-month benefit delay in the AI example, fixed cost still runs from month one. Ten active months produce $2,000 benefit; costs are $600 + 12 × $100 = $1,800. Net benefit is $200, ROI is 11.11%, and payback is 2 + ($600 + 2 × $100) ÷ $100 = 10 months."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Compare scenarios without treating them as demand predictions",
        "paragraphs": [
          "The default comparison uses 75%, 100% and 125% of entered workload. These are editable what-if assumptions, not confidence intervals. Costs are not all scaled by the same percentage.",
          "Business mode scales additional contribution with workload, holds the separately entered avoidable monthly cash saving constant and holds fixed running cost constant. AI mode scales task volume, related time changes, extra-work contribution and per-task costs. Adoption and time per task stay as entered; other avoidable monthly cash saving stays constant.",
          "A smaller workload can have a different ROI even though the subscription is unchanged. More work is not automatically better if each AI task creates more cost than benefit. Check demand, staff availability and task quality separately.",
          "Look at net cash benefit and the lowest cumulative balance, not ROI alone. A high percentage on a small cost base may produce little money. For actual funding dates, continue to the dated cash-flow tool."
        ]
      },
      {
        "id": "input-records",
        "title": "Check these records before replacing the example",
        "table": {
          "caption": "Use a matching workflow and period",
          "headers": [
            "Input",
            "Evidence",
            "Avoid"
          ],
          "rows": [
            [
              "Task volume and time",
              "Task logs, sample timed runs, review and failure/rework time",
              "Assuming every task is suitable for AI"
            ],
            [
              "Paid-hours share",
              "Overtime, contractor invoices, actual hours that will be added or removed",
              "Calling unchanged salary cash a saving"
            ],
            [
              "Recurring and setup cost",
              "Supplier quote, implementation scope, API/usage report",
              "Counting a subscription twice"
            ],
            [
              "Extra contribution",
              "Confirmed workload and contribution after added delivery costs",
              "Using gross sales or selling the same hours twice"
            ]
          ]
        },
        "paragraphs": [
          "The calculator does not connect to your payroll, AI provider or sales account. Inputs and scenario factors are assumptions you supply. Compare the result with actual results after a pilot and update the model when costs or adoption change."
        ]
      }
    ],
    "faq": [
      [
        "How do you calculate business ROI?",
        "This tool divides modeled net benefit by total modeled costs over your chosen horizon. Costs include setup and ongoing payments. Inputs must describe incremental cash benefits and costs on the same boundary."
      ],
      [
        "What does the AI automation mode do?",
        "It converts adopted task volume and net time change into actual paid-labor changes and remaining capacity. Optional extra sold hours produce contribution only from the remaining positive capacity and your sell-through assumptions."
      ],
      [
        "Are all saved hours cash savings?",
        "No. A salaried employee’s unused time can remain capacity while payroll is unchanged. Only the entered paid-hours conversion share changes cash labor cost."
      ],
      [
        "Why is ROI 33.33% when $600 setup produces $600 net benefit?",
        "The default AI case also incurs $1,200 recurring cost over 12 months. Total modeled cost is $1,800, so $600 net benefit divided by $1,800 is 33.33%. Dividing by setup alone is a different return measure."
      ],
      [
        "What if setup cost is zero?",
        "ROI can still be defined if there are recurring costs. If every modeled cost is zero, the percentage is undefined. With no initial outlay there is no setup cash to recover; inspect the running net benefit instead."
      ],
      [
        "What if benefits start late or never cover the running cost?",
        "Fixed monthly running cost starts immediately. Benefits and usage costs start only after the delay. Nonpositive active monthly net benefit has no finite payback; no automatic borrowing is added."
      ],
      [
        "Does ROI include taxes, financing or resale value?",
        "No. This version is pre-tax and undiscounted, with no financing, terminal resale value or depreciation. Do not use it as an NPV, IRR, tax or formal valuation model."
      ],
      [
        "Are the workload scenarios forecasts?",
        "No. They are editable workload assumptions. No customer demand, adoption rate, time saving or sales conversion is independently verified."
      ],
      [
        "Does changing currency convert my values?",
        "No. It changes labels and formatting. Enter every amount in the chosen currency using your own consistent conversion if needed."
      ],
      [
        "Are my inputs saved or sent?",
        "The calculator itself keeps inputs in browser memory for the current tab and has no save or submission request. Reloading resets them. Downloaded CSV files contain the values you choose to export."
      ]
    ],
    "sources": [
      [
        "OpenStax: payback methods and cash-flow recovery",
        "https://openstax.org/books/principles-managerial-accounting/pages/11-2-evaluate-the-payback-and-accounting-rate-of-return-in-capital-investment-decisions"
      ],
      [
        "Calculator.net: ROI definition and boundary limitations",
        "https://www.calculator.net/roi-calculator.html"
      ],
      [
        "Zapier: how its automation time estimate is calculated",
        "https://help.zapier.com/hc/en-us/articles/25444544607373-Review-your-account-usage-in-the-analytics-dashboard"
      ]
    ],
    "related": [
      [
        "Budget loaded employee cost",
        "/calculators/employee-cost-calculator/"
      ],
      [
        "Schedule actual cash dates",
        "/calculators/cash-flow-forecast-template/"
      ],
      [
        "Check agency contribution and capacity",
        "/calculators/agency-break-even-calculator/"
      ],
      [
        "Compare ecommerce advertising ROAS",
        "/calculators/break-even-roas-calculator/"
      ]
    ]
  }
};
