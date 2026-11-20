export const householdTools={
  "prorated-rent-calculator": {
    "mode": "household",
    "reviewed": "2026-11-20",
    "published": "2026-11-20",
    "editorialStatus": "published",
    "theme": {
      "--tool-accent": "#765074",
      "--tool-soft": "#f5eff6",
      "--tool-dark": "#342039",
      "--tool-radius": "22px"
    },
    "caption": "AI-generated editorial illustration with topic text; not a customer record or verified financial document.",
    "name": "Prorated Rent Calculator",
    "title": "Prorated Rent Calculator: Days & Methods | MyBreakeven",
    "category": "Rent & household planning",
    "description": "Calculate partial-month rent with inclusive calendar dates. Compare actual-month, fixed 30 and annual 365 daily rates, inspect rounding and download a values record.",
    "intro": "Define the first and last charged dates in one month, then compare explicit day-rate conventions. Check the agreement’s method before using an amount as rent due.",
    "image": "/images/title-covers/combined-day3-prorated-rent-calculator-20261120.webp",
    "alt": "Prorated Rent Calculator title beside a tenant reviewing a calendar and rental paperwork.",
    "features": [
      "Inclusive start/end dates validated against the real calendar, including leap February.",
      "Actual-month, fixed30 and annual365 arithmetic compared on the same charged days.",
      "Unrounded daily arithmetic and final two-decimal rounding, with a visible calculation trail.",
      "Tab-only inputs, currency labels, values CSV, reset and print."
    ],
    "quick": "Fictional USD example: monthly rent 1800, charged November 16–30,2026 inclusive. Fifteen days out of 30 produce 900 using actual-month days; fixed 30 also gives 900, while monthly× 12 ÷ 365 × 15 gives 887.67.",
    "guide": "/blogs/gross-pay-vs-net-pay/",
    "guideLabel": "Compare gross income with take-home pay for a separate household budget",
    "assumptions": "One calendar month, both selected dates charged. Calendar arithmetic only: the tool does not determine entitlement, required notice, local law, lease interpretation or a legal invoice. Confirm the agreed date count and rate basis. Fixed 30 uses actual charged days divided by 30 and is not a 30/360 day-adjustment method. Annual 365 uses monthly rent × 12 / 365 even in leap years. Deposits, utilities, fees, rent changes, taxes and credits are excluded. Rent is nonnegative up to 1 trillion; dates 1900–9999. Required blanks are incomplete, not zero. Currency labels do not convert amounts. Money displays two decimals; final charge rounds once from 40-digit decimal arithmetic.",
    "sections": [
      {
        "id": "rent-day-count",
        "title": "Define which dates are actually charged",
        "paragraphs": [
          "Proration starts with an agreed billing interval. Enter the first charged day and last charged day, not simply a key-collection date or a convenient moving date. This calculator includes both endpoints. A period from November 16 through November 30 contains 15 charged calendar days; subtracting date numbers without adding the first day would give 14 and understate this interval.",
          "If the agreement excludes the final day, enter the last day actually charged. A move-out date alone does not establish the last billable date or eliminate a notice obligation. This arithmetic page cannot decide those contractual questions. Record the agreement, agreed method and any relevant professional confirmation alongside the downloaded result.",
          "The tool accepts a single calendar month so the actual-month divisor is unambiguous. A period spanning November and December needs separate runs, each using its own dates and full-month rent. Add the separately rounded charges only under the rounding policy being used. A rent increase during the period also needs a separate segment, even if the dates share a month."
        ]
      },
      {
        "id": "rent-formula",
        "title": "Compare explicit daily-rate conventions",
        "paragraphs": [
          "Actual-month charge = full monthly rent ÷ actual calendar days in that month × charged days. Fixed 30 charge = monthly rent ÷ 30 × actual charged days. Annual 365 charge = monthly rent × 12 ÷ 365 × charged days. These are three defined arithmetic choices, not a declaration that all leases permit each one. No live local-law rule selects a method for you.",
          "For the loaded fictional 1800 rent and November 16–30 interval, actual-month and fixed 30 both give 900. The annualized comparison gives 887.6712328767… before final rounding to 887.67. The difference comes from the rate basis, not from different occupancy dates. Preserve the method in your records rather than selecting whichever result happens to be cheaper.",
          "A full 31-day December at 1800 monthly rent gives 1800 under actual-month days, 1860 under the fixed 30 divisor and 1834.52 under annual 365. A comparison above one month’s rent is not an error in this defined fixed-divisor arithmetic; it highlights why the relevant agreement and billing convention matter. Fixed 30 does not silently change the charged date count to 30."
        ]
      },
      {
        "id": "rent-rounding",
        "title": "Round the final amount, not each displayed day",
        "paragraphs": [
          "For an original fictional 1700 rent in a 31-day month, 12 charged days give 1700÷ 31 × 12 = 658.064516…which rounds to 658.06. The displayed daily amount of 54.84 is not reused in the calculation; 54.84× 12 would give 658.08. Rounding the intermediate rate would add two cents in this example.",
          "The values CSV retains the unrounded daily rate and calculation result as text values alongside the rounded amount. It contains no formulas, so editing a date in that file does not recalculate the bill. The tool uses two-decimal monetary display for consistent teaching even when the selected currency normally uses another minor-unit convention; confirm invoicing precision separately."
        ]
      },
      {
        "id": "rent-leap-year",
        "title": "Check February and leap-year boundaries",
        "paragraphs": [
          "In fictional February 2028, a 2900 monthly rent charged from February 15 through February 29 covers 15 of 29 days. Actual-month arithmetic gives 1500. Fixed 30 gives 1450, and annual 365 gives 1430.14. The annual 365 comparison deliberately keeps 365 as its chosen denominator; it does not become 366 in leap years.",
          "Invalid dates such as February 30 are rejected. So are reversed dates, missing required amounts, unsupported date formats and cross-month intervals. Zero rent is accepted as an explicit zero scenario. A same-day interval counts one charged day. The tool does not infer free days from a missing date."
        ]
      },
      {
        "id": "rent-records",
        "title": "Reconcile the result with the complete payment record",
        "paragraphs": [
          "A partial rent charge is not the entire move-in payment. List refundable deposits, utility charges, administrative fees, taxes, credits and any other contractual amounts separately. Do not reduce the daily rent rate by a deposit or add a monthly charge twice. This page intentionally does not total those items because their treatment needs the agreement’s own records.",
          "Compare the entered monthly rent with the signed schedule and make sure a weekly amount has not been pasted into a monthly field. Keep the rent period and cash-payment date separate: a payment made today can cover a future interval. If this is part of a business cash plan, enter its actual due date in the 13-week cash forecast rather than treating the prorated charge as a whole-month expense automatically."
        ]
      },
      {
        "id": "rent-sources",
        "title": "Method sources and related planning",
        "paragraphs": [
          "HUD’s model-lease instructions provide a program-specific example of dividing tenant rent by actual month days and multiplying by occupied days. That document is not a universal private-lease rule and is not an endorsement of this site. California DOT’s published proration examples also illustrate a daily-rate-times-days calculation with final-cent rounding in their own program context.",
          "The fixed 30 and annual 365 comparisons here are explicitly stated teaching conventions. They are not copied lease terms or jurisdictional advice. For wider planning, separate gross earnings from take-home pay, compare the selected debt-to-income scope, or build a dated cash forecast."
        ],
        "links": [{"href": "/blogs/gross-pay-vs-net-pay/", "label": "gross earnings from take-home pay"}, {"href": "/calculators/debt-to-income-calculator/", "label": "selected debt-to-income scope"}, {"href": "/calculators/cash-flow-forecast-template/", "label": "cash forecast"}]
      }
    ],
    "faq": [
      [
        "Does this calculator include both dates?",
        "Yes. The first and last charged dates are both included. November 16–30 is 15 days. Enter the actual last charged day if an agreement excludes a move-out date."
      ],
      [
        "Which rent-proration method is legally correct?",
        "This tool does not decide that. Confirm the agreement, applicable rules and required date/rounding policy. The displayed methods are defined arithmetic comparisons, not universal legal standards."
      ],
      [
        "Can I calculate a period crossing two months?",
        "Run each calendar month separately with its own dates and monthly rent. The calculator rejects cross-month entries so it cannot silently apply one month’s divisor to another."
      ],
      [
        "Why can fixed 30 give more than a full month’s rent?",
        "The fixed 30 comparison divides by 30 but still counts actual charged days. A 31-dayinterval therefore uses 31/30 ofmonthly rent. It is not a 30/360 date-adjustment convention."
      ],
      [
        "How is leap-year February handled?",
        "The actual-month basis uses 29 days in a leap February. Annual 365 keeps its expressly chosen 365-daydenominator, even in a leap year."
      ],
      [
        "Does the CSV save or recalculate my lease?",
        "No. It downloads input and result values only. There is no account saving, bank connection, lease storage or recalculating spreadsheet formula."
      ]
    ],
    "sources": [
      [
        "HUD model-lease program instructions",
        "https://www.hud.gov/sites/documents/doc_35769.pdf"
      ],
      [
        "California DOT rent-proration examples",
        "https://dot.ca.gov/-/media/dot-media/programs/right-of-way/documents/rw-manual-exhibits/chapter-11/11-ex-05-updated-a11y.pdf"
      ]
    ],
    "related": [
      [
        "Plan dated cash obligations",
        "/calculators/cash-flow-forecast-template/"
      ]
    ]
  },
  "debt-to-income-calculator": {
    "mode": "household",
    "reviewed": "2026-11-20",
    "published": "2026-11-20",
    "editorialStatus": "published",
    "theme": {
      "--tool-accent": "#765074",
      "--tool-soft": "#f5eff6",
      "--tool-dark": "#342039",
      "--tool-radius": "22px"
    },
    "caption": "AI-generated editorial illustration with topic text; not a customer record or verified financial document.",
    "name": "Debt-to-Income Calculator",
    "title": "Debt-to-Income Calculator: DTI & Payment Scope | MyBreakeven",
    "category": "Borrowing & household planning",
    "description": "Calculate selected monthly debt payments divided by gross income. Control housing scope, convert income periods and test an additional payment without approval claims.",
    "intro": "Compare a defined set of monthly payments with gross monthly income. Make housing scope explicit, then test an optional additional payment and your own comparison percentage.",
    "image": "/images/title-covers/combined-day3-debt-to-income-calculator-20261120.webp",
    "alt": "Debt-to-Income Calculator title beside a person reconciling monthly income and debt payment records.",
    "features": [
      "Gross-income conversion for monthly, annual, weekly, every-two-week and twice-monthly inputs.",
      "Separate housing-only and selected-total ratios with an explicit housing-inclusion switch.",
      "Optional additional-payment scenario and signed headroom against your chosen percentage.",
      "Blank-versus-zero safeguards, values CSV, currency labels, reset and print."
    ],
    "quick": "Fictional USD example: 6000 monthly gross income;1500 housing plus 350 auto, 200 student, 150 creditcardminimums and 0 other. Selected payments 2200 give 36.6667%; housing alone is 25%. An additional 300 payment gives 41.6667%.",
    "guide": "/blogs/gross-pay-vs-net-pay/",
    "guideLabel": "Gross pay versus take-home pay",
    "assumptions": "Educational selected-obligation ratio, not a credit decision, affordability certificate, mortgage quote, legal definition or lender-specific underwriting model. Use gross income for the chosen period and monthly payment amounts, not balances. Housing inclusion is explicit; lender and product treatment of rent, mortgages, tax, insurance, support, deferred debts and income can differ. No approval thresholds or live rates are supplied. Proposed payment adds to retained obligations and does not replace a refinance payment. Gross income must be positive; amounts 0–1 trillion, chosen comparison 0–100%. Required blanks are incomplete, optional blank means not supplied. Currency labels do not convert. Ratios may exceed 100%. Values preserve 40-digit decimal calculation precision; displayed ratios up to 4 decimals.",
    "sections": [
      {
        "id": "dti-definition",
        "title": "Start with a defined monthly debt-to-income ratio",
        "paragraphs": [
          "Debt-to-income arithmetic compares monthly payment obligations with monthly gross income. Add the payments included in the chosen scope, divide by gross monthly income and multiply by 100. The CFPB explains that lenders and loan products can have different limits. A number alone does not establish approval, an offered rate or the amount someone can safely spend.",
          "This calculator deliberately exposes its housing switch. When selected, total payments include the housing bundle plus other entered obligations. When unselected, the displayed total excludes housing, while the separate housing-only ratio stays visible. These are different scopes, not a financial improvement caused by toggling a box. Confirm the definitions needed for the actual comparison.",
          "For a mortgage-oriented comparison, the housing bundle may include principal, interest, property taxes, insurance and association charges where applicable. Enter each amount once; an escrow payment can already include tax or insurance. Rent may be treated differently by other DTI exercises. The tool does not prescribe a universal inclusion rule."
        ]
      },
      {
        "id": "dti-worked-case",
        "title": "Reproduce the original fictional payment case",
        "paragraphs": [
          "The loaded example uses 6000 gross monthly income and monthly payments of 1500 housing, 350 auto, 200 student, 150 credit-card minimums and 0 other. Total selected payments are 2200. The selected ratio is 2200÷ 6000 × 100 = 36.666666…%, displayed to four decimal places as 36.6667%. Housing alone is 1500÷ 6000 × 100 = 25%.",
          "Excluding the housing bundle leaves 700 of other payments and 11.6667% against the same gross income. That lower percentage answers a narrower question. It does not mean the household stopped paying housing, gained spending cash or qualified for a different loan. Record the switch setting alongside any shared result.",
          "Use required monthly payments rather than outstanding loan balances. A 20000 auto balance is not the same as a 350 monthly installment. For revolving credit, obtain the payment amount required for the comparison rather than assuming the full statement balance or last voluntary overpayment is the minimum obligation."
        ]
      },
      {
        "id": "dti-income-periods",
        "title": "Convert income periods without confusing pay schedules",
        "paragraphs": [
          "Annual income is divided by 12. Weekly pay is multiplied by 52 and divided by 12. Every-two-week pay uses 26 payments per year, while twice-monthly pay uses 24. These are annualized equivalents; the tool does not place paydays on a calendar or model a particular year containing an extra payday.",
          "In a separate fictional frequency example, 2400 every two weeks becomes 5200 per month, while 2400 twice monthly becomes 4800. Against 2200 selected payments, those denominators produce 42.3077% and 45.8333%. Treating the two schedules as identical would change the ratio even with unchanged debt.",
          "Use gross pay before employee taxes and deductions, not the net bank deposit. For self-employment or variable income, do not paste gross business sales into personal qualifying income. The applicable lender may use documentation and adjustments this simple calculator does not perform. The gross-pay-versus-net-pay guide explains the payroll boundary; business net income is a different record."
        ],
        "links": [{"href": "/blogs/gross-pay-vs-net-pay/", "label": "gross-pay-versus-net-pay guide"}, {"href": "/blogs/net-income/", "label": "business net income"}]
      },
      {
        "id": "dti-scenarios",
        "title": "Test an added payment and a chosen percentage separately",
        "paragraphs": [
          "Entering an additional 300 monthly payment in the base example gives 2500 total and 41.6667%. This scenario retains every existing obligation. A refinance, payoff or replacement needs the old payment removed through a deliberate new base scenario; adding the new loan while retaining the old payment would double count a replacement. The separate mortgage refinance calculator owns term, fees and same-horizon comparisons.",
          "If a user independently chooses 40% as a comparison percentage, 6000× 40% − 2200 = 200 of arithmetic payment headroom. This example is not a recommended limit, lender threshold or borrowing allowance. Adding 300 would exceed that chosen payment budget by 100. The result does not account for living expenses, taxes, emergency costs or cash timing.",
          "A blank optional additional-payment field means no scenario was requested. An explicit zero checks a zero change. A blank comparison field disables headroom; zero is a real chosen percentage and can produce negative headroom. A negative difference is retained rather than presented as zero available credit."
        ],
        "links": [{"href": "/calculators/refinance-calculator/", "label": "mortgage refinance calculator"}]
      },
      {
        "id": "dti-records",
        "title": "Prepare source records before interpreting the percentage",
        "paragraphs": [
          "Use the same applicant or household scope for numerator and denominator. Do not include a second person’s income while omitting their relevant obligations, or count a shared debt twice. Write down how irregular income, support payments, deferred loans and housing were treated. The software cannot verify the completeness of supplied records.",
          "Compare current income documentation with current debt statements and the housing cost schedule. Keep groceries, utilities, transport, savings and other living costs in a separate cash budget even when they are outside the selected DTI numerator. A low selected ratio can coexist with a tight take-home cash position.",
          "Debt can exceed entered monthly gross income, so results above 100% are allowed and visibly flagged. Zero debt with positive income gives 0%; zero income cannot support a meaningful finite percentage and is rejected. Negative, missing required or nonfinite amounts do not become silent zeros."
        ]
      },
      {
        "id": "dti-sources",
        "title": "Use the result as a transparent record, not an approval",
        "paragraphs": [
          "The CFPB’s definition supports monthly debt divided by gross monthly income and explains that product/lender limits differ. The original cases here document this calculator’s chosen scope and arithmetic; they do not reproduce a lender decision or use a recommended pass/fail band. No external scoring service receives the values.",
          "Download the values CSV to retain the income frequency, housing switch, every entered payment, optional scenario and precise calculated values. Editing it does not recalculate formulas. Inputs stay in the tab and are not added to an account. For employer-side costs rather than employee take-home income, use the separate loaded employee cost calculator. A partial-month rent calculation is likewise a separate charge calculation, not a substitute for a monthly DTI payment basis."
        ],
        "links": [{"href": "/calculators/employee-cost-calculator/", "label": "loaded employee cost calculator"}, {"href": "/calculators/prorated-rent-calculator/", "label": "partial-month rent calculation"}]
      }
    ],
    "faq": [
      [
        "Does DTI use gross income or take-home pay?",
        "The denominator here is gross income before employee deductions, converted to a monthly equivalent. Do not use business sales as personal qualifying income or assume a lender will accept an undocumented amount."
      ],
      [
        "Is rent always included in DTI?",
        "No universal inclusion rule is imposed here. The housing switch defines this selected arithmetic scope. Confirm the relevant lender or product definitions; housing-only and housing-excluded results remain clearly labelled."
      ],
      [
        "Should I enter balances or monthly payments?",
        "Enter the monthly payment amount required for your comparison, such as an installment or credit-cardminimum, not the outstanding debt balance."
      ],
      [
        "What DTI percentage guarantees loan approval?",
        "None is provided by this calculator. Lenders and products differ, and approval also depends on information outside this model. An optional user-chosen percentage is only a mathematical comparison."
      ],
      [
        "Does an additional payment replace my existing mortgage?",
        "No. It adds to every retained obligation. For a replacement scenario, deliberately revise the base payments and check all relevant loan costs separately."
      ],
      [
        "Why is every-two-week income different from twice monthly?",
        "The annualized conventions use 26 payments for every two weeks and 24 for twice monthly. At 2400 perpayment, the monthly equivalents are 5200 and 4800."
      ]
    ],
    "sources": [
      [
        "CFPB: debt-to-income ratio and gross income",
        "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/"
      ]
    ],
    "related": [
      [
        "Gross income and payroll deductions",
        "/blogs/gross-pay-vs-net-pay/"
      ],
      [
        "Separate employer-side costs",
        "/calculators/employee-cost-calculator/"
      ]
    ]
  }
};
