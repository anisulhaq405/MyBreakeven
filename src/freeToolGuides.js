export const freeToolGuides = {
  "discount-break-even-calculator": {
    "image": "/images/tools/discount-break-even-calculator-orange.webp",
    "alt": "Discount planning example: a $100 sale reduced to $90 needs 136 monthly sales to preserve contribution from 100 sales.",
    "caption": "Illustrative starting scenario: $60 variable cost and a 3% payment fee. A 10% discount needs 36 additional sales to preserve contribution.",
    "quick": "A discount break-even calculator finds the extra sales needed to preserve your current contribution after lowering your price. Divide current monthly contribution by the discounted contribution per sale, then round up. A 10% discount on a $100 sale with $60 variable cost and a 3% fee needs 136 sales instead of 100.",
    "features": [
      "Compare current and proposed revenue and contribution side by side.",
      "Include percentage payment fees and direct costs without counting them twice.",
      "Round required sales upward to whole completed sales.",
      "Check the required and expected sales against optional monthly capacity.",
      "Try preset scenarios or compare 5%, 10%, 15% and 20% changes.",
      "Search by country, currency name or code, then choose your currency. Currency selection does not convert amounts.",
      "See the discount boundary where contribution becomes zero."
    ],
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the discount break-even calculator",
        "paragraphs": [
          "Start with one product, service or comparable order type. Use a representative completed month rather than mixing several periods. This makes the extra sales target comparable with your actual workload."
        ],
        "steps": [
          "Enter the current price before sales tax collected for others, and the direct cost of completing one sale.",
          "Add the percentage payment or selling fee separately. Put any flat transaction charge in variable cost.",
          "Enter current monthly completed sales and your proposed discount percentage.",
          "Estimate the percentage increase in completed sales you expect from the offer. This is your assumption; the tool does not predict demand.",
          "Add the maximum monthly sales you can deliver, if known. Compare both the recovery target and your expected sales with this limit.",
          "Read contribution change before deciding whether to run the offer. Test a smaller discount if the recovery target is unrealistic."
        ]
      },
      {
        "id": "formula",
        "title": "Discount break-even formula after costs and payment fees",
        "paragraphs": [
          "Current contribution per sale = current price × (1 − fee rate) − variable cost. Discounted price = current price × (1 − discount rate). Discounted contribution = discounted price × (1 − fee rate) − variable cost.",
          "Required whole sales = round upward (current contribution per sale × current monthly sales ÷ discounted contribution). Extra sales = required whole sales − current sales. Required sales increase = extra sales ÷ current sales × 100.",
          "Use decimal rates in the formula: 3% is 0.03 and 10% is 0.10. The result preserves contribution available for overhead and owner pay. It does not establish that the business covers those costs."
        ]
      },
      {
        "id": "worked-examples",
        "title": "How many extra sales does a 10% discount need?",
        "paragraphs": [
          "These are illustrative planning examples, not customer results or market averages. The starting service example contributes $100 × 0.97 − $60 = $37 per sale. At 100 sales, the baseline is $3,700. A 10% discount makes the selling price $90 and contribution $27.30.",
          "The exact recovery ratio is $3,700 ÷ $27.30 = 135.5311… sales. Round upward to 136 completed sales: 136 × $27.30 = $3,712.80. The whole-sale recovery target is therefore a 36% sales increase. At your assumed 20% lift, 120 sales contribute $3,276, which is $424 below the baseline."
        ],
        "table": {
          "headers": [
            "Scenario",
            "New contribution per sale",
            "Required whole sales",
            "Expected contribution change"
          ],
          "rows": [
            [
              "Service: $100 price, $60 cost, 3% fee; 100 sales; 10% off, 20% lift",
              "$27.30",
              "136 (+36%)",
              "−$424 at 120 sales"
            ],
            [
              "Retail: $50 price, $25 cost, 3% fee; 200 sales; 15% off, 40% lift",
              "$16.225",
              "290 (+45%)",
              "−$157 at 280 sales"
            ],
            [
              "Service: same baseline; 20% off, 20% lift",
              "$17.60",
              "211 (+111%)",
              "−$1,588 at 120 sales"
            ]
          ]
        },
        "after": [
          "The retail example starts with $23.50 contribution per sale and $4,700 monthly contribution. A $42.50 discounted price leaves $16.225 before display rounding. At 280 completed sales, contribution is $4,543. Required sales use the unrounded value: 290 sales contribute $4,705.25.",
          "If service capacity is 150 sales, the 10% discount recovery target of 136 fits. The 20% discount target of 211 does not. Capacity is a delivery ceiling, not evidence that customers will buy."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Read the sales increase, margin impact and capacity results",
        "paragraphs": [
          "A positive contribution change means your entered sales lift preserves the baseline before fixed overhead, owner pay and taxes. A negative change means the expected volume leaves less money for those commitments, even if revenue rises.",
          "“Not recoverable” means the discounted contribution is zero or negative. Selling more cannot fund a positive baseline under that scenario. For the service example, contribution reaches zero at about 38.14% off; this boundary covers no overhead and is not a recommended discount.",
          "Use separate scenarios when costs vary by product or when the promotion changes basket size. The tool keeps direct cost and the percentage fee unchanged for discounted sales. If extra staff or advertising creates a new monthly commitment, evaluate that expense in your full business plan."
        ]
      },
      {
        "id": "mistakes",
        "title": "Common mistakes when calculating discount profitability",
        "steps": [
          "Recovering revenue instead of contribution. Revenue ignores the cost of fulfilling each extra sale.",
          "Entering profit margin as variable cost. Use actual per-sale delivery costs.",
          "Counting the payment fee inside cost and again in the fee field.",
          "Assuming additional sales need no staff time or capacity.",
          "Applying the discount to a few customers while entering the volume of the whole business. Model the affected group separately.",
          "Calling the recovery target a forecast. Validate demand with your own promotion records."
        ]
      }
    ],
    "faq": [
      [
        "Is a 10% discount recovered by 10% more sales?",
        "Usually not. The discount removes selling price while direct cost remains. In the example here, 100 sales become a 136-sale recovery target, or 36% more completed sales after fees."
      ],
      [
        "Can I use this for a service business discount?",
        "Yes, when each modeled sale has comparable price and delivery costs. Include variable labor, supplies, travel and acquisition costs once. Keep monthly overhead and owner pay in a separate business funding plan."
      ],
      [
        "Does this calculate net profit after a discount?",
        "It calculates contribution after variable costs and percentage fees. Deduct fixed overhead, owner pay and other monthly commitments to assess net profit. Changed overhead needs a separate comparison."
      ],
      [
        "What if the required sales exceed capacity?",
        "The target is not deliverable under the capacity you entered. Test a smaller discount, lower direct cost or a different offer. Capacity warnings do not reduce the expected-sales projection automatically."
      ],
      [
        "Can I enter several products together?",
        "Use a consistent product or a stable average order with a comparable cost mix. If the promotion changes the mix, run separate scenarios rather than treating unlike sales as equal."
      ],
      [
        "Are my inputs saved or converted between currencies?",
        "These tool inputs stay in this browser tab and do not require an account. Currency selection changes labels only. It does not apply exchange rates, and this tool does not save a scenario to your account."
      ]
    ]
  },
  "price-increase-calculator": {
    "image": "/images/tools/price-increase-calculator-blue.webp",
    "alt": "Price increase planning example: raising a $100 sale to $110 requires 80 of the original 100 monthly sales to preserve contribution.",
    "caption": "Illustrative starting scenario: $60 variable cost and a 3% payment fee. A 10% price increase can absorb a loss of 20 whole sales.",
    "quick": "A price increase calculator compares contribution before and after raising prices, then finds the minimum sales needed to preserve your current monthly contribution. At $100 price, $60 variable cost and a 3% fee, a 10% increase needs 80 of the original 100 sales. Losing 20 whole sales still preserves contribution.",
    "features": [
      "Compare current and proposed revenue and contribution side by side.",
      "Include percentage payment fees and direct costs without counting them twice.",
      "Round required sales upward to whole completed sales.",
      "Check the required and expected sales against optional monthly capacity.",
      "Try preset scenarios or compare 5%, 10%, 15% and 20% changes.",
      "Search by country, currency name or code, then choose your currency. Currency selection does not convert amounts.",
      "Enter revised variable cost when materials, labor or fulfillment costs change.",
      "Find the maximum whole-sale loss that preserves the baseline, or the extra sales needed when costs rise too far."
    ],
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the price increase calculator for customer loss",
        "paragraphs": [
          "Choose one consistent product, service or customer group that will receive the increase. Use completed sales for the same monthly period in both scenarios. If customers buy different amounts, estimate lost sales rather than the percentage of customer names."
        ],
        "steps": [
          "Enter your current selling price, direct variable cost per sale and percentage selling fee.",
          "Enter revised variable cost only if delivery costs will change. Leave it blank to keep current cost; entering zero deliberately sets the revised cost to zero.",
          "Add current completed monthly sales and your proposed price increase percentage.",
          "Estimate the percentage of completed sales you expect to lose after the increase.",
          "Add your available monthly capacity if known. Read minimum required sales and the contribution change together.",
          "Try a smaller or larger increase and compare it against your own retention assumptions. The tool cannot predict customer response."
        ]
      },
      {
        "id": "formula",
        "title": "Price increase and allowable customer-loss formula",
        "paragraphs": [
          "Current contribution per sale = current price × (1 − fee rate) − current variable cost. New price = current price × (1 + increase rate). New contribution per sale = new price × (1 − fee rate) − revised variable cost.",
          "Minimum required whole sales = round upward (current contribution per sale × current monthly sales ÷ new contribution per sale). Allowable whole-sale loss = current monthly sales − minimum required whole sales, when that difference is positive.",
          "The tool calculates expected sales by rounding downward (current sales × (1 − expected loss rate)). Required sales are rounded upward because a partial completed sale cannot fund the baseline. If higher costs make required sales exceed the starting volume, the result shows additional sales needed instead of an allowable loss."
        ]
      },
      {
        "id": "worked-examples",
        "title": "How many customers can you lose after a 10% price increase?",
        "paragraphs": [
          "All figures below are illustrative planning assumptions. The starting service sale contributes $100 × 0.97 − $60 = $37. At 100 sales, monthly contribution is $3,700. Raising price to $110 leaves $110 × 0.97 − $60 = $46.70 per sale.",
          "The exact target is $3,700 ÷ $46.70 = 79.2291… sales, so you need 80 completed sales. Losing 20 of the original 100 sales leaves $3,736 contribution, still $36 above the baseline. Losing 21 leaves 79 × $46.70 = $3,689.30, below the baseline."
        ],
        "table": {
          "headers": [
            "Scenario",
            "New contribution per sale",
            "Minimum whole sales",
            "Expected contribution change"
          ],
          "rows": [
            [
              "Service: $100 price, $60 cost, 3% fee; 100 sales; 10% increase, 10% loss",
              "$46.70",
              "80 (up to 20 lost)",
              "+$503 at 90 sales"
            ],
            [
              "Retail: $50 price, $25 cost, 3% fee; 200 sales; 15% increase, 15% loss",
              "$30.775",
              "153 (up to 47 lost)",
              "+$531.75 at 170 sales"
            ],
            [
              "Service: same baseline; 10% increase; revised cost $80, 10% loss",
              "$26.70",
              "139 (+39 required)",
              "−$1,297 at 90 sales"
            ]
          ]
        },
        "after": [
          "In the retail example, $57.50 price contributes $30.775 after fees and $25 direct cost. Baseline contribution is $4,700. At 170 expected sales, contribution becomes $5,231.75. The whole-sale recovery target is 153, allowing a loss of 47 sales, or 23.5% of the original 200.",
          "A higher price does not protect contribution if delivery costs rise too far. In the third example, revised $80 cost leaves $26.70 contribution per sale. You need 139 sales to preserve $3,700, even though the price increased. At 90 expected sales, contribution is $2,403."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Understand revenue loss versus contribution after raising prices",
        "paragraphs": [
          "In the default service example, 90 sales at $110 produce $9,900 revenue, down from $10,000. Contribution rises from $3,700 to $4,203 because each sale leaves more money after direct cost and fees. This is why revenue retention and contribution retention answer different questions.",
          "The allowable loss applies to completed sales with comparable economics. It is a customer-loss threshold only when each customer represents the same number and type of sales. A high-value customer leaving can change the answer more than several small customers leaving.",
          "The capacity check compares required and expected sales with the limit you enter. It does not prove demand, automatically cap the forecast or include fixed expansion costs. If the result requires extra staff, equipment or software, add those commitments to a full break-even plan."
        ]
      },
      {
        "id": "mistakes",
        "title": "Common mistakes when testing a business price increase",
        "steps": [
          "Using lost customer count when customers have different order values. Model affected sales or comparable groups.",
          "Leaving revised cost blank even though fulfillment costs are rising.",
          "Treating higher revenue as proof of higher profit without checking contribution.",
          "Applying a price rise to new customers but modeling all existing sales at the new rate.",
          "Ignoring flat transaction charges or counting percentage fees twice.",
          "Treating allowable loss as predicted churn. The calculator gives a threshold based on your inputs."
        ]
      }
    ],
    "faq": [
      [
        "How much customer loss can a 10% price increase absorb?",
        "It depends on contribution before and after the increase, including fees and direct costs. In the worked service example, you can lose 20 of 100 completed sales. Use your own inputs; 20% is not a universal threshold."
      ],
      [
        "Why can revenue fall while contribution rises?",
        "Fewer higher-priced sales can leave more contribution per sale after delivery costs and fees. In the default example, revenue falls $100 while contribution rises $503. Monthly overhead still needs to be deducted."
      ],
      [
        "Can I use this when supplier or labor costs rise?",
        "Yes. Enter the changed cost in revised variable cost per sale. If revised contribution is lower than before, the tool may show that you need more sales despite the higher selling price."
      ],
      [
        "Is customer loss the same as sales loss?",
        "Only if customers represent comparable completed sales. For different order sizes or recurring frequencies, enter the percentage of sales lost or run separate customer-group scenarios."
      ],
      [
        "Does the calculator recommend a safe price increase?",
        "It shows the contribution threshold for the percentage you enter. It does not forecast churn, measure willingness to pay or recommend a guaranteed increase. Compare several scenarios with your actual retention evidence."
      ],
      [
        "Does it include taxes, overhead and owner pay?",
        "The comparison is before those monthly commitments. Enter price excluding sales tax collected for others. Use the full business break-even calculator for overhead, owner pay and a target profit."
      ]
    ]
  }
};
