export const depositTools = {
  "cd-calculator": {
    "mode": "deposit",
    "category": "Savings & deposit yields",
    "reviewed": "2026-11-17",
    "editorialStatus": "published",
    "published": "2026-11-17",
    "theme": {
      "--tool-accent": "#6c4d83",
      "--tool-soft": "#f4edf7",
      "--tool-dark": "#30223d",
      "--tool-radius": "18px"
    },
    "caption": "AI-created editorial illustration. Rates and numerical examples are fictional assumptions, not current offers.",
    "defaults": {},
    "resultLabel": "Your modeled result",
    "name": "CD Calculator",
    "title": "CD Calculator: Compare Interest & Maturity | MyBreakeven",
    "description": "Compare two fixed-term deposit assumptions using APY or nominal interest, matching term and deposit. See maturity, interest and a downloadable checkpoint record.",
    "intro": "Compare the gross maturity value of two entered fixed-rate deposit assumptions. Keep the same deposit and term, distinguish APY from nominal interest, and review access restrictions separately.",
    "image": "/images/title-covers/combined-day1-cd-calculator-20261117.webp",
    "alt": "Owner and adviser comparing fixed-term deposit documents beside the CD Calculator title.",
    "features": [
      "Two independently specified rate bases on an identical deposit and term",
      "Months/12 or actual entered days/365 planning convention",
      "Principal, gross interest, maturity difference and selected checkpoints",
      "Local CSV snapshot and print; no account opening, market quotes or saved entries"
    ],
    "quick": "Fictional example: 10,000 at 4.5% APY for 12 modeled months produces 10,450. A nominal 4.5% compounded monthly has 4.5939825% effective annual yield and produces about 10,459.40. The same printed percentage is not the same rate basis.",
    "guide": "/blogs/present-value-vs-future-value/",
    "guideLabel": "Keep future balances and present values on a stated date",
    "related": [
      [
        "Convert a nominal rate and APY",
        "/calculators/apy-calculator/"
      ],
      [
        "Add recurring contributions in the Future Value tool",
        "/calculators/future-value-calculator/"
      ],
      [
        "Review funding before an expansion commitment",
        "/blogs/business-expansion/"
      ],
      [
        "Separate a business valuation from deposit maturity",
        "/blogs/small-business-valuation/"
      ]
    ],
    "assumptions": "Fixed nonnegative entered rates, one opening deposit and retained interest throughout the term. No fees, tax, further deposits, early withdrawal, rate changes or cash-paid interest. Months are modeled as months/12 years; days use days/365. Fractional compounding intervals use smooth equivalent growth, which may differ from a provider’s actual crediting/day-count rules. Checkpoints are model observations, not bank statements. This is not an account-disclosure calculation, product recommendation, availability check or insurance determination. Inputs reset on reload; downloads contain only the scenario you request.",
    "sources": [
      [
        "Investor.gov: certificates of deposit",
        "https://www.investor.gov/introduction-investing/investing-basics/investment-products/certificates-deposit-cds"
      ],
      [
        "Investor.gov: brokered CDs and payout conventions",
        "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/brokered-cds-investor-bulletin"
      ],
      [
        "CFPB: annual percentage yield calculation",
        "https://www.consumerfinance.gov/rules-policy/regulations/1030/a/"
      ]
    ],
    "sections": [
      {
        "id": "how-to-use",
        "title": "Compare the same funded amount and term",
        "steps": [
          "Enter the amount deposited. Keep account-opening fees or other cash needs outside this gross model. Zero deposit is a deliberate zero result, not a missing input.",
          "Choose whole months or whole days and a matching term for both alternatives. A zero term returns principal with no modeled growth.",
          "For each alternative, identify whether the document states APY or a nominal annual interest rate. Only nominal rates need a compounding frequency.",
          "Read maturity value and interest separately. Compare access, renewal, fees, provider details and disclosure terms before acting.",
          "Download a local scenario snapshot or print the model. Reconcile its assumptions with the actual provider record; it is not a quoted offer."
        ]
      },
      {
        "id": "formula",
        "title": "The rate basis changes the growth factor",
        "paragraphs": [
          "For an entered APY Y as a decimal and modeled years t, gross maturity = P × (1+Y)^t. For nominal annual rate r with n compounds per year, effective annual yield = (1+r/n)^n − 1. The tool then applies that equivalent annual yield over the same t. This avoids applying an APY as if it were a nominal periodic rate.",
          "The APY choice ignores the frequency selector because effective annual yield already expresses annual compounding. The nominal choice uses annual, semiannual, quarterly, monthly or 365-times compounding. Days/365 is an explicit model convention, not a claim that every institution uses the same posting rules.",
          "Gross interest is maturity minus the original deposit. The comparison difference is B maturity minus A maturity at the same modeled date; it does not value liquidity restrictions or deduct tax and charges. Amounts display to two decimal places, while the model retains precision."
        ]
      },
      {
        "id": "worked-examples",
        "title": "A checked fictional comparison",
        "paragraphs": [
          "Use a 10,000 deposit and twelve modeled months. Alternative A states 4.5% APY. Its maturity is 10,000 × 1.045 = 10,450; gross interest is 450. Alternative B states a nominal annual rate of 4.5%, compounded monthly. Its maturity is 10,000 × (1+0.045/12)^12 = 10,459.3982504…, or 10,459.40 displayed.",
          "B’s effective annual yield is approximately 4.5939825%, so its gross maturity is 9.40 higher in this defined example. No extra deposit, fee, tax or withdrawal is included. This comparison isolates rate convention; it does not demonstrate that any real account is available or suitable.",
          "If both alternatives use 4.5% APY with the same principal and term, the modeled maturity values agree regardless of any nominal-frequency selector. At zero rate, maturity equals principal for any supported term. A six-month APY model uses a square-root annual growth factor rather than simply halving one year’s compound return."
        ]
      },
      {
        "id": "read-the-record",
        "title": "Read the deposit record before relying on a projection",
        "paragraphs": [
          "A deposit certificate’s maturity date, interest-crediting policy, fixed or variable rate terms and access conditions determine what actually happens. Review the institution, account ownership and written disclosures. A calculator cannot establish deposit-insurance coverage or the consequences of holding multiple accounts.",
          "If interest is paid out rather than retained, those payments do not compound inside the same deposit as this model assumes. Brokered CDs can have different payout and sale arrangements. Use the contract’s cash-flow schedule instead of forcing an account with distributed interest into a retained-interest model.",
          "An early-exit penalty is not modeled by subtracting an arbitrary number of months of interest. Contracts can define the penalty base and interest period differently, and an early withdrawal also shortens the growth period. Obtain the actual terms and compare cash at the actual exit date."
        ]
      },
      {
        "id": "decision-boundary",
        "title": "A larger maturity balance is only one part of the decision",
        "paragraphs": [
          "Match the term to the date funds may be needed. A higher modeled balance at maturity does not make money available for an earlier payroll, supplier bill or equipment payment. Keep a dated cash reserve and near-term obligations separate from money that can remain deposited.",
          "A long-term deposit can also expose the plan to reinvestment uncertainty at maturity and an opportunity cost if other available uses change. This page does not compare live offers or predict future rates. Run only rates you can document and label any what-if assumptions clearly.",
          "For a business decision, a deposit yield and project return answer different questions. Customer demand, operating contribution, capacity, taxes and funding dates can change an expansion case. Follow the connected expansion and valuation guides rather than interpreting this interest difference as a complete investment decision."
        ]
      },
      {
        "id": "scope-record",
        "title": "Keep a reviewable comparison",
        "paragraphs": [
          "Record the source date, entered amount, rate label, compounding convention, term unit and any excluded fees beside your calculation. Print or download each version when assumptions change. A CSV download is a fixed snapshot, not an editable recalculating model.",
          "The checkpoint table divides the modeled term into twelve intervals. Its observation times can be fractional months or days; it does not claim that interest was actually credited at those points. A zero term contains only the opening observation.",
          "Method references were checked November 17, 2026. The fictional calculations are independent teaching examples. Provider documents and applicable rules control a real account; no recommendation to buy a particular deposit is generated."
        ]
      }
    ],
    "faq": [
      [
        "Does the calculator use current CD rates?",
        "No. Every rate is entered by you. The starting rates are fictional teaching assumptions, not current offers."
      ],
      [
        "Should I enter APY or nominal interest?",
        "Use the label on the provider document. APY already describes effective annual yield; nominal interest needs its compounding convention."
      ],
      [
        "Can I add monthly deposits?",
        "Not in this fixed-opening-deposit model. Use the linked Future Value calculator for recurring contributions."
      ],
      [
        "Are tax and early-withdrawal penalties included?",
        "No. This is gross retained-interest growth. Review actual charges and cash dates separately."
      ],
      [
        "Are the checkpoints actual interest credits?",
        "No. They are observations of the equivalent-growth model, not a provider posting schedule."
      ],
      [
        "Does the higher result identify the better account?",
        "No. Availability, access, fees, terms, provider and coverage require a separate review."
      ]
    ]
  },
  "apy-calculator": {
    "mode": "deposit",
    "category": "Savings & deposit yields",
    "reviewed": "2026-11-17",
    "editorialStatus": "published",
    "published": "2026-11-17",
    "theme": {
      "--tool-accent": "#6c4d83",
      "--tool-soft": "#f4edf7",
      "--tool-dark": "#30223d",
      "--tool-radius": "18px"
    },
    "caption": "AI-created editorial illustration. Rates and numerical examples are fictional assumptions, not current offers.",
    "defaults": {},
    "resultLabel": "Your modeled result",
    "name": "APY Calculator",
    "title": "APY Calculator: Convert Rate & Effective Yield | MyBreakeven",
    "description": "Convert nominal interest and APY, or annualize a stated principal-and-interest term. Compare compounding conventions with checked examples and clear limits.",
    "intro": "Convert a nominal annual interest rate to APY, reverse the calculation, or annualize a defined interest amount. This rate tool does not project a savings balance or compare live accounts.",
    "image": "/images/title-covers/combined-day1-apy-calculator-20261117.webp",
    "alt": "Bookkeeper checking rate conventions on deposit documents beside the APY Calculator title.",
    "features": [
      "Nominal-to-effective and effective-to-nominal conversion",
      "Separate opening-principal and term-interest annualization mode",
      "Explicit supported compounding frequencies and rate boundaries",
      "Transparent formulas, fictional cases and local CSV snapshot"
    ],
    "quick": "A nominal annual 4.5% rate compounded monthly corresponds to approximately 4.5939825% APY. A quoted 4.5% APY corresponds to approximately 4.4097713% nominal annual interest with monthly compounding.",
    "guide": "/blogs/present-value-vs-future-value/",
    "guideLabel": "Understand the rate and date behind a future value",
    "related": [
      [
        "Project fixed-term deposit maturity",
        "/calculators/cd-calculator/"
      ],
      [
        "Project growth with recurring contributions",
        "/calculators/future-value-calculator/"
      ],
      [
        "Keep acquisition recovery separate from deposit yield",
        "/blogs/customer-acquisition-cost/"
      ],
      [
        "Distinguish net revenue from investment interest",
        "/blogs/net-revenue/"
      ]
    ],
    "assumptions": "Conversion assumes a constant nonnegative nominal rate and stated compounds per year, or an entered effective annual APY. The separate earned-interest mode assumes a fixed opening principal, retained interest, no intervening deposits/withdrawals and whole actual entered days; it uses a 365-day annualization basis. It is not the average-daily-balance periodic-statement method and does not cover all Regulation DD exceptions, tiers, stepped rates, distributed interest or product-specific terms. No market-rate feed, account recommendation, tax or fee calculation. Reloading clears entries.",
    "sources": [
      [
        "CFPB: annual percentage yield calculation",
        "https://www.consumerfinance.gov/rules-policy/regulations/1030/a/"
      ],
      [
        "CFPB: rate definitions",
        "https://www.consumerfinance.gov/rules-policy/regulations/1030/2/"
      ],
      [
        "Investor.gov: certificates of deposit",
        "https://www.investor.gov/introduction-investing/investing-basics/investment-products/certificates-deposit-cds"
      ]
    ],
    "sections": [
      {
        "id": "how-to-use",
        "title": "Choose the rate question before entering a number",
        "steps": [
          "Choose nominal interest to APY when the document gives a nominal annual rate and a compounding frequency.",
          "Choose APY to nominal when you have an effective annual yield and need the equivalent nominal rate for a stated frequency.",
          "Use principal-and-interest annualization only for a defined opening principal and term with no intervening cash flows. Enter whole days and an interest amount, not a percentage.",
          "Read APY and nominal interest as different labels. Neither is an automatically available bank offer or a borrowing APR.",
          "Keep the written rate source and terms with a printed or downloaded snapshot."
        ]
      },
      {
        "id": "formula",
        "title": "Convert a periodic growth factor, not just a label",
        "paragraphs": [
          "Let r be nominal annual interest as a decimal and n the number of compounds per year. APY = [(1+r/n)^n − 1] × 100%. For APY Y as a decimal, the equivalent nominal annual rate is n × [(1+Y)^(1/n) − 1] × 100%. Inputs and displayed outputs are percentages; the engine converts them to decimals once.",
          "At zero interest both results are zero. With annual compounding, nominal annual interest and APY agree. With positive nominal interest and more than one compound per year, APY exceeds that nominal rate because retained interest also earns interest. The magnitude depends on the rate and frequency; it is not a fixed add-on.",
          "The nominal-rate input supports 0–100%; APY input supports 0–1,000%. Frequencies are 1, 2, 4, 12 or 365 per year. These are numerical model limits, not statements about available product rates. Invalid or blank input produces a visible correction message instead of silently becoming zero."
        ]
      },
      {
        "id": "worked-examples",
        "title": "A checked fictional nominal-rate example",
        "paragraphs": [
          "At a nominal annual rate of 4.5%, compounded monthly, each monthly factor is 1+0.045/12 = 1.00375. Raising this factor to twelve and subtracting one gives 0.04593982504…, or 4.593982504…% APY. This is a fictional chosen rate and not a current market quote.",
          "Reverse the question: a 4.5% APY with monthly compounding has an equivalent nominal annual rate of 12 × [(1.045)^(1/12) − 1] = approximately 4.4097713%. The two displayed 4.5% labels therefore imply different equivalent rates. Use unrounded conversions when checking a round trip; rounded screen values can create tiny differences.",
          "The annualization mode asks a different input question. A fixed opening principal of 10,000 and 450 interest over 365 days produces a 4.5% annualized yield. Over a 182-day term, the same 450 interest annualizes to [(1+450/10,000)^(365/182) − 1] × 100%, approximately 9.229% before display rounding. The interest amount and day count must describe the same term."
        ]
      },
      {
        "id": "term-annualization",
        "title": "Keep opening-principal annualization separate from statement yield",
        "paragraphs": [
          "The term mode uses a beginning principal and the total interest earned on that unchanged principal over a defined term, assuming retained interest and no other transactions. The annualized result is a rate comparison, not an extra amount of cash actually received during the shorter term.",
          "A periodic statement can involve changing balances. The regulatory annual percentage yield earned calculation can use average daily balance under specified rules, which is not the opening-principal input on this page. Do not enter a closing balance or an average balance as opening principal merely to reproduce a statement percentage.",
          "Account disclosures can also have special rules for tiered or stepped rates, certain longer-term accounts, required interest withdrawals and maturity conventions. The CFPB reference explains these distinctions. This educational calculator does not replace an institution’s required disclosure process."
        ]
      },
      {
        "id": "apy-apr-boundary",
        "title": "APY is not a shortcut for a loan APR",
        "paragraphs": [
          "This tool converts deposit-style interest and effective yield. A borrowing APR can reflect a loan’s timing and included finance charges under applicable rules. You cannot turn a lender’s fee-inclusive APR into a deposit return merely by using the same percentage field.",
          "Likewise, the result does not deduct bank fees, tax, withdrawal costs or inflation. A high gross APY can coexist with a lower realized cash benefit after those items. Record each excluded item separately rather than calling the converted rate an after-tax or fee-adjusted yield.",
          "An investment’s uncertain return is also not a promised APY. The linked Future Value calculator handles entered growth scenarios with a separate contribution schedule; it does not make an assumed return guaranteed. Keep historical observations, hypothetical rates and contractual disclosures clearly labeled."
        ]
      },
      {
        "id": "decision-record",
        "title": "Record the basis before comparing alternatives",
        "paragraphs": [
          "Keep the provider’s exact rate label, source date, compounding convention, balance conditions, applicable term and access restrictions. Comparing percentages without these records can put unlike products on the same line. A rate conversion only resolves the mathematical convention you specify.",
          "Use the CD calculator when the question is how much a fixed opening deposit grows to at maturity. Use Future Value when the question includes recurring contributions. Use business ROI when the question concerns project cash costs and benefits. Keeping those intents separate prevents a deposit-rate quotient from becoming a business profitability claim.",
          "The method references were checked November 17, 2026. Printed results and CSV exports are snapshots of your entered assumptions. The page stores inputs only in its current browser state and does not open accounts, submit applications or supply current rates."
        ]
      }
    ],
    "faq": [
      [
        "Is APY the same as nominal interest?",
        "They agree with annual compounding. With positive interest and more frequent retained-interest compounding, effective APY is higher than the nominal annual rate."
      ],
      [
        "Can I convert APY back to a nominal rate?",
        "Yes. Select APY to nominal and choose the compounding frequency for the equivalent nominal annual rate."
      ],
      [
        "Is this a loan APR calculator?",
        "No. It does not model borrowing finance charges, loan payments or fee-inclusive APR disclosures."
      ],
      [
        "Can I enter interest earned over part of a year?",
        "Yes, in the separate term mode, with fixed opening principal, whole days and no intervening deposits or withdrawals."
      ],
      [
        "Does term mode reproduce every statement APY?",
        "No. Periodic-statement yield can use average daily balances and product-specific rules that are outside this opening-principal model."
      ],
      [
        "Where do I calculate a maturity balance?",
        "Use the linked CD calculator for fixed-term deposit growth, or Future Value for recurring contributions."
      ]
    ]
  }
};
