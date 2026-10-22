// Add only gaps that survive the overlap review. Other articles were reviewed without appending duplicate examples.
export const keywordReviewedSlugs = ["landscaping-break-even", "margin-of-safety-business", "calculate-contribution-margin", "contribution-margin-vs-gross-margin", "restaurant-labor-cost-percentage", "is-a-cleaning-business-profitable", "restaurant-profit-margin-average", "how-to-calculate-cost-of-goods-sold", "how-to-calculate-working-capital", "how-to-calculate-days-sales-outstanding", "how-to-start-restaurant", "operating-leverage-small-business", "cafe-opening-costs", "restaurant-food-cost-percentage", "how-much-to-charge-for-house-cleaning", "how-much-does-it-cost-to-start-a-landscaping-business", "contribution-margin-vs-profit-margin", "salon-service-pricing", "agency-profit-margin", "lawn-care-pricing-per-acre", "ecommerce-shipping-costs", "coffee-shop-business-plan", "agency-billable-utilization-rate", "how-much-does-it-cost-to-open-a-salon", "restaurant-menu-pricing-formula", "how-to-start-coffee-shop", "photography-usage-licensing-pricing"];
export const keywordContentReviewData = [
  {
    "slug": "margin-of-safety-business",
    "id": "query-margin-of-safety-business",
    "heading": "Turn the margin of safety ratio into a sales alert",
    "answer": "The margin of safety ratio is (sales − break-even sales) ÷ sales. Multiply by 100 for the percentage. It measures the sales cushion, not profit margin or cash available.",
    "paragraphs": [
      "A percentage can become a review trigger. In a separate fictional month, break-even sales are $30,000 and forecast sales are $45,000. The cushion is $15,000, or 33.33% of forecast sales. A chosen 20% cushion requires sales of $30,000 ÷ (1 − 0.20) = $37,500. The 20% is a management assumption, not a recommended universal buffer.",
      "If the sales forecast falls to $36,000 with the same cost behavior, the cushion is $6,000 ÷ $36,000 = 16.67%. That crosses the chosen alert threshold even though forecast sales remain above break-even. Review the cause and cash calendar before deciding on a price or staffing change.",
      "Recalculate break-even when contribution, fixed commitments or product mix changes. Do not preserve an old $30,000 threshold after a cost increase. With zero sales the percentage is undefined; show the dollar shortfall. A forecast cushion describes the assumptions, not evidence that those sales will occur."
    ],
    "links": [
      [
        "Check the operating break-even calculation",
        "/blogs/calculate-break-even-point/"
      ]
    ],
    "source": "https://www.accountingcoach.com/blog/what-is-the-contribution-margin-ratio"
  },
  {
    "slug": "is-a-cleaning-business-profitable",
    "id": "query-is-a-cleaning-business-profitable",
    "heading": "Compare cleaning payroll ratios without inventing a benchmark",
    "answer": "A cleaning business is profitable when revenue covers delivery costs and the included operating commitments. Revenue alone does not show what the owner keeps. Calculate payroll percentage from a defined payroll numerator and the same period’s net sales.",
    "paragraphs": [
      "An average cleaning-company revenue figure needs a dated sample, business size, service mix and geography. This guide does not establish such an average. Use the completed-visit revenue and owner-pay reconciliation already worked above rather than interpreting revenue as take-home income.",
      "For an isolated payroll-ratio sensitivity, fictional loaded field payroll of $8,000 divided by $20,000 matching net sales is 40%. The same payroll against $16,000 sales is 50%. Neither 40% nor 50% here is a survey benchmark. A query containing 40–60 does not make that range a verified industry rule.",
      "Match payroll and sales periods, state whether employer costs and owner cleaning time are included, and separate residential recurring work from commercial contracts before comparing businesses. Keep the existing visit-level example for the complete profit and capacity calculation."
    ],
    "links": [
      [
        "Cost a commercial cleaning contract",
        "/calculators/cleaning-contract-profit-calculator/"
      ],
      [
        "Build a cleaning expense budget",
        "/resources/cleaning-business-budget-template/"
      ]
    ],
    "source": null
  },
  {
    "slug": "how-to-calculate-days-sales-outstanding",
    "id": "query-how-to-calculate-days-sales-outstanding",
    "heading": "Forecast accounts receivable using DSO: state the closing-balance convention",
    "answer": "Historical DSO measures receivables relative to credit sales and the matching day count. A forecast can use a chosen receivable-days assumption to estimate a balance, but that does not determine which specific invoices will be collected.",
    "paragraphs": [
      "For a simplified steady-sales forecast, estimated closing receivables = forecast credit sales ÷ days in the period × assumed closing-receivable days. With fictional monthly credit sales of $90,000, a 30-day month and 20 receivable days, forecast closing AR is $60,000. This uses a closing-balance convention; do not silently substitute it for the historical average-AR method explained above.",
      "If opening AR is $50,000 and the model has no write-offs, returns, tax differences, foreign exchange or other adjustments, collections reconcile as $50,000 + $90,000 − $60,000 = $80,000. Forecasting 25 days instead raises closing AR to $75,000 and lowers modeled collections to $65,000. The five-day change ties up another $15,000 under these assumptions.",
      "Use only credit sales in this receivables schedule, keep the actual calendar-day count and reconcile any adjustments explicitly. For seasonal sales or a few large late invoices, an invoice-level collection schedule is more informative than a single DSO assumption. Keep forecast days separate from measured historical DSO."
    ],
    "links": [
      [
        "Carry collections into the cash forecast",
        "/calculators/cash-flow-forecast-template/"
      ]
    ],
    "source": "https://corporatefinanceinstitute.com/resources/financial-modeling/forecasting-balance-sheet-items-financial-model/"
  },
  {
    "slug": "how-much-does-it-cost-to-open-a-salon",
    "id": "query-how-much-does-it-cost-to-open-a-salon",
    "heading": "Salon build-out cost per square foot needs a site-specific quote",
    "answer": "Salon opening costs depend on the premises, service menu, equipment, installations, deposits and cash through the opening ramp. A per-square-foot figure is meaningful only with a defined work scope and area.",
    "paragraphs": [
      "This guide does not establish a verified New York City build-out benchmark. Obtain current site-specific contractor and professional quotes and the relevant local requirements. Ask whether plumbing, electrical work, ventilation, accessibility-related work, design, installation, fixtures, taxes and contingency are included or excluded. This is a quote-scope checklist, not a determination of legal requirements.",
      "For a separate fictional 1,200-square-foot project, a scoped $96,000 build-out quote equals $80 per square foot. If equipment of $30,000 and deposits of $12,000 are separate, identified opening commitments are $138,000 before operating cash or other exclusions. Dividing that larger amount by area gives $115 per square foot, which describes a different numerator and should not be compared as the same build-out rate.",
      "Keep opening purchases, financed balances and monthly rent on separate schedules. Compare equivalent scope before choosing a low headline quote, then test appointment contribution and stylist capacity against the recurring commitments."
    ],
    "links": [
      [
        "Check salon prices and appointment contribution",
        "/blogs/salon-service-pricing/"
      ]
    ],
    "source": "https://www.sba.gov/counseling/plan-your-business/"
  }
];
