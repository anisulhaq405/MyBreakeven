// Editorial completion of existing calculators; calculation engines and defaults are unchanged.
export const calculatorPageReview = {
  "discount-break-even-calculator": [
    "Measure the promotion before applying it to every sale",
    [
      [
        "Price and fee",
        "Paid invoice and processor statement",
        "Use the realized discounted price; flat charges belong in variable cost."
      ],
      [
        "Completed volume",
        "Fulfilled orders for the affected offer",
        "Exclude canceled orders and sales that never receive the promotion."
      ],
      [
        "Sales lift and capacity",
        "Prior offer results and delivery schedule",
        "Enter an assumption you can track; required sales are not forecast demand."
      ]
    ],
    [
      "Save the baseline price, cost and contribution before the offer starts.",
      "Compare completed promotional sales with the recovery target; record extra staffing or campaign spending separately.",
      "If the promotion changes the basket or product mix, recalculate using that mix rather than counting every extra order as equivalent."
    ],
    [
      "Does the target include a new promotion budget?",
      "No. The recovery target preserves the existing contribution under unchanged fixed costs. Additional advertising or other campaign commitments need a separate cost comparison before you conclude the promotion earns more."
    ]
  ],
  "price-increase-calculator": [
    "Track the customers actually receiving the increase",
    [
      [
        "Current price and cost",
        "Completed invoices and job/order costing",
        "Use a comparable selling unit and include percentage fees separately."
      ],
      [
        "Revised cost",
        "Current supplier quotes and delivery records",
        "Blank keeps the old cost; zero means a deliberate zero revised cost."
      ],
      [
        "Lost sales",
        "Renewals and completed purchases after the change",
        "Compare the affected cohort over matching periods; pending renewals are not confirmed losses."
      ]
    ],
    [
      "Keep unaffected customers outside this comparison or run a separate group.",
      "Track contribution as well as revenue; fewer higher-priced sales can change them in different directions.",
      "Check whether the retained volume still covers the monthly business requirement, not just the prior contribution baseline."
    ],
    [
      "Can I raise prices only for new customers?",
      "Yes, but model that affected group separately. The tool applies the new price to every proposed sale you enter; it does not automatically preserve legacy customer rates."
    ]
  ],
  "break-even-roas-calculator": [
    "Reconcile advertising with a matched order cohort",
    [
      [
        "Order value and direct cost",
        "Matched order IDs and product/fulfillment records",
        "Use a representative advertised mix; do not average unlike margin percentages."
      ],
      [
        "Ad spend and revenue",
        "Campaign spend plus reconciled attributed orders",
        "Keep one attribution window and remove duplicates claimed by different platforms."
      ],
      [
        "Refunds and fees",
        "Returns records and processor/marketplace statements",
        "Net refunded revenue once; avoid counting platform-inclusive fees again."
      ]
    ],
    [
      "Read the campaign contribution threshold separately from whole-business profitability.",
      "At the default 42% pre-ad contribution rate, a 10% after-ad target leaves 32% for advertising: target ROAS is 3.125 times.",
      "Track returns that arrive after the reporting cutoff and revise the matched cohort. Attributed revenue does not prove advertising created incremental sales."
    ],
    [
      "Can a profitable ROAS still leave the store losing money?",
      "Yes. This calculator excludes monthly fixed overhead, owner pay and other unentered commitments. Campaign contribution must also cover those costs in the full store plan."
    ]
  ],
  "hourly-rate-calculator": [
    "Build the rate from hours you can actually invoice",
    [
      [
        "Monthly funding need",
        "Owner-income budget and overhead ledger",
        "Keep the additional profit buffer distinct from compensation for your work."
      ],
      [
        "Working weeks and weekly hours",
        "Annual availability calendar",
        "Remove planned leave and closures through working weeks, not a second duplicate deduction."
      ],
      [
        "Billable share",
        "Recorded invoiced hours divided by working hours",
        "Administration, sales and revisions can consume time without becoming extra invoices."
      ]
    ],
    [
      "Use a lower-billable-time case alongside your current estimate. A minimum rate assumes the entered hours sell.",
      "Compare the required rate with realized billings after discounts, write-offs and included revision time.",
      "For fixed-price work, divide realized job revenue by all occupied hours; compare the result with the hourly funding requirement."
    ],
    [
      "Does the rate include personal income tax?",
      "No. The owner-income amount is funded before personal income tax under this model. The calculator does not determine tax liability; enter a clearly defined income requirement and keep the tax/payment schedule separate."
    ]
  ],
  "cash-runway-calculator": [
    "Reconcile runway with dated bank payments",
    [
      [
        "Current cash and reserve",
        "Available bank balances and earmarked funds",
        "Exclude restricted funds; do not enter an unapproved financing promise as cash."
      ],
      [
        "Monthly incoming cash",
        "Expected collection dates",
        "Use receipts, not invoices that remain unpaid."
      ],
      [
        "Monthly outgoing cash",
        "Payroll, supplier, tax and debt payment schedule",
        "Include actual cash payments; depreciation alone is not a cash payment."
      ]
    ],
    [
      "Read the whole-month room above reserve as a constant-flow scenario.",
      "If equipment or a large tax payment occurs once, use a dated forecast rather than pretending it repeats every month.",
      "Check the earliest daily or weekly low point. Monthly closing cash can conceal a payment due before a customer receipt."
    ],
    [
      "How should I include seasonal receipts or a one-off purchase?",
      "This tool assumes constant monthly flows. Use the linked cash forecast guide to schedule changing receipts and individual payments by date; do not rely on an averaged runway alone."
    ]
  ],
  "cleaning-contract-profit-calculator": [
    "Audit the agreed contract before accepting the quote",
    [
      [
        "Visits and person-hours",
        "Written service scope and completed time sheets",
        "Two people working two hours use four person-hours; account for paid travel once."
      ],
      [
        "Loaded labor and supplies",
        "Payroll cost and stock/vehicle records",
        "Include employer costs in the hourly amount and vehicle costs separately from travel labor."
      ],
      [
        "Overhead and target margin",
        "Contract allocation and approved pricing target",
        "Allocate only this contract share; target is a margin on revenue, not markup."
      ]
    ],
    [
      "At the default 13 monthly visits, one extra person-hour at $24 on every visit adds $312 cost. Profit falls from $692 to $380.",
      "With that extra labor, total modeled cost is $2,020. A 25% margin needs $2,693.34, rounded upward to cents.",
      "Compare actual calendar visits and re-cleans with the annual-average quote. Revisit the scope or future quote before treating an estimating error as a customer charge."
    ],
    [
      "Does the quoted margin include a payment-processing fee?",
      "There is no separate percentage fee field in this tool. Include any known applicable costs consistently, and calculate a percentage-of-price fee separately when setting the final quote. Do not assume an omitted fee is covered by the displayed margin."
    ]
  ],
  "lawn-route-profit-calculator": [
    "Compare route time before adding a distant stop",
    [
      [
        "Stops and average price",
        "Completed route invoices",
        "Use one comparable route; seasonal cleanups may need a separate scenario."
      ],
      [
        "Service and driving minutes",
        "Observed route log",
        "Elapsed route hours differ from person-hours; crew count multiplies labor cost."
      ],
      [
        "Vehicle, materials and overhead",
        "Mileage/vehicle records and cost allocation",
        "Do not include the same vehicle allowance again in overhead."
      ]
    ],
    [
      "For the default route, adding 60 driving minutes with unchanged revenue adds $44 crew labor. Profit falls from $334 to $290.",
      "Elapsed time rises from five to six hours, so profit per elapsed route hour falls from $66.80 to about $48.33 before any extra vehicle cost.",
      "A new stop should be assessed with its own ticket, service time, detour and material cost. Higher route revenue alone does not establish better hourly economics."
    ],
    [
      "Does this find the fastest route or include card fees automatically?",
      "No. Enter observed total driving time; the tool does not map or optimize a route. It has no separate percentage card-fee field, so reconcile applicable fees and other unentered costs before treating the result as complete profit."
    ]
  ],
  "detailing-chemical-cost-calculator": [
    "Measure product usage without changing the label instructions",
    [
      [
        "Bottle cost and volume",
        "Purchase invoice and bottle label",
        "Use concentrate volume and the same liquid unit as usage."
      ],
      [
        "Dilution and applied volume",
        "Product instructions and observed usage",
        "The entered ratio is water to concentrate; this calculator does not prescribe a mixing ratio."
      ],
      [
        "Discarded share",
        "Prepared and discarded liquid measurements",
        "Waste is a share of prepared liquid, not an extra percentage added to applied volume."
      ]
    ],
    [
      "At the default 9:1 ratio, a 1,000 mL concentrate bottle produces 10,000 mL prepared liquid. With no waste, 500 mL application costs $2 per car.",
      "At 10% waste the same application costs $2.22; at 20% it costs $2.50. These cost scenarios do not recommend a product mixture.",
      "Repeat the calculation for each product used on the job, then sum product costs and add other job costs once."
    ],
    [
      "Can I enter weight ounces as fluid ounces?",
      "No. Fluid ounces measure volume and weight ounces measure mass. This selector converts mL and US fluid ounces only; use the product-specific measurement and follow its label."
    ]
  ],
  "hair-color-product-cost-calculator": [
    "Keep prepared product and discarded cost on one basis",
    [
      [
        "Color pack and quantity used",
        "Invoice and weighed color removed from stock",
        "Keep pack size and quantity used in the same weight unit."
      ],
      [
        "Developer pack and quantity used",
        "Invoice and measured liquid usage",
        "Use the same liquid unit for bottle and usage; do not convert grams to mL."
      ],
      [
        "Waste and monthly services",
        "Discarded mix log and completed service count",
        "Waste describes cost already consumed; it is not added again."
      ]
    ],
    [
      "The default bowl costs $7.08 before service labor and other products. A 15% discarded share identifies $1.062 of that cost, not an extra purchase.",
      "If both mixed quantities are reduced by 20%, color falls to 24 g and developer to 48 mL. Cost becomes $5.664 per service, or $453.12 for 80 services.",
      "That smaller-bowl scenario assumes it still meets the actual service need; the calculator does not advise formulation, suitability or chemical handling."
    ],
    [
      "Can this set my final color-service price?",
      "It estimates the entered product recipe only. Add stylist labor, other products, disposables, fees and the monthly contribution requirement before pricing the full service."
    ]
  ],
  "ecommerce-return-cost-calculator": [
    "Build the allowance from reconciled returned orders",
    [
      [
        "Orders and return rate",
        "A defined fulfilled-order cohort",
        "Use full-order returns; late returns can change an immature cohort."
      ],
      [
        "Product cost and recovery",
        "Landed cost and inspected recoverable inventory",
        "Recovery uses retained acquisition value, not a hoped-for resale ticket."
      ],
      [
        "Shipping, handling and retained fees",
        "Refund/carrier/processor records",
        "Enter net unrecovered costs and keep refunded sales revenue separate."
      ]
    ],
    [
      "At the default $26 per return, a 10% return rate creates $2.60 cost allowance per fulfilled order. A 15% rate creates $3.90, or $3,900 across 1,000 orders.",
      "Check which outbound costs already appear in your original order costing before adding the allowance. Include each cost once in the combined view.",
      "Reconcile refunded revenue separately and retain a dated refund-payment schedule. This allowance is not the complete lost contribution or a cash forecast."
    ],
    [
      "Can I use the same allowance for partial returns?",
      "This model assumes full-order returns. For partial returns, calculate a separate consistent item-level scenario or reconcile the actual order costs; do not apply a full-order loss to every returned item."
    ]
  ],
  "salon-rebooking-calculator": [
    "Follow the rebooked cohort through completed visits",
    [
      [
        "Baseline and rebooking rates",
        "Completed appointment cohort and future bookings",
        "Keep the same rebooking window and distinguish booking from attendance."
      ],
      [
        "Attendance and spare slots",
        "Actual returns and follow-up diary availability",
        "Capacity is for the delivery period, not the baseline booking period."
      ],
      [
        "Ticket and avoidable cost",
        "Completed service invoices and cost records",
        "Include sale-dependent commission and products; unchanged salary is not deducted twice."
      ]
    ],
    [
      "The default scenario creates 40 additional bookings and 32 expected attended visits; 25 spare slots cap delivered visits at 25.",
      "Raising spare capacity to 32 with all other defaults unchanged gives $1,683.20 additional contribution, versus $1,315 at 25 slots.",
      "Any new cost needed to create those seven slots is outside the unchanged-overhead comparison. Confirm visits are incremental rather than moved from a later date."
    ],
    [
      "Should I multiply the result by twelve for annual retention value?",
      "Not automatically. The model covers one follow-up visit per additional rebooking. Annual value needs cohort timing, observed repeat visits, capacity and acquisition costs rather than repeating the same cohort each month."
    ]
  ],
  "salon-no-show-profit-loss-calculator": [
    "Reconcile missed slots, replacement work and retained fees",
    [
      [
        "Missed and refilled appointments",
        "Original diary and replacement visits",
        "Keep equivalent refills separate from the original scheduled denominator."
      ],
      [
        "Avoidable and wasted costs",
        "Product/staff preparation records",
        "Unchanged salaries are not avoided; incremental wasted preparation is a separate cost."
      ],
      [
        "Fees actually retained",
        "Settled payment/refund records",
        "Exclude refundable deposits and retained fees on refilled slots in this model."
      ]
    ],
    [
      "At the default assumptions, 15 unfilled slots create a $645.75 contribution gap. It is not the $1,200 ticket value alone.",
      "If another five missed slots are filled with equivalent services, ten remain unfilled and the gap falls to $430.50. The modeled improvement is $215.25.",
      "Use different ticket or cost scenarios for non-equivalent replacements. Count only fees actually retained and track collection timing separately."
    ],
    [
      "Does a negative contribution gap mean cancellations are desirable?",
      "No. It can occur mathematically when retained fees exceed the modeled service contribution and wasted costs. Check the inputs and missing obligations; the tool does not recommend a cancellation policy or predict customer behavior."
    ]
  ],
  "mobile-detailing-travel-profit-calculator": [
    "Compare complete occupied time, not the service ticket alone",
    [
      [
        "Service, setup and travel time",
        "Timed completed visits",
        "Use all owner-occupied time; route legs should be allocated once."
      ],
      [
        "Distance and vehicle rate",
        "A consistent mileage or kilometer cost record",
        "Use the same distance unit for both jobs; this is not a prescribed tax rate."
      ],
      [
        "Direct costs, overhead and surcharge",
        "Job cost sheet and paid invoice",
        "Existing surcharge is revenue; owner hourly target is a desired outcome, not another expense."
      ]
    ],
    [
      "Compare total owner earnings alongside earnings per occupied hour. A shorter lower-ticket job can rank higher hourly while leaving fewer total dollars.",
      "The extra surcharge assumes customers accept it and the occupied time stays unchanged. Review demand and job scope before changing a quote.",
      "If several workers are involved, include helper labor as a direct cost and use the owner-time boundary consistently; this is not a multi-crew scheduling model."
    ],
    [
      "Can I enter only one-way travel?",
      "Enter the complete distance and occupied travel time allocated to the job, including the return or relevant route legs. The tool does not automatically double the distance or time."
    ]
  ]
};

export function completeCalculatorPage(slug, tool) {
  const review = calculatorPageReview[slug];
  if (!review) return tool;
  const [title, records, decisions, faq] = review;
  const sections = [...tool.sections];
  const at = sections.findIndex(section => section.id === 'formula');
  sections.splice(at < 0 ? 1 : at, 0, {id:'input-records', title, paragraphs:['Gather a matched set of records before replacing the example inputs. These are input checks, not market averages.'], table:{caption:'Records to check before calculating',headers:['Input group','Record to use','Boundary to check'],rows:records}});
  const decisionSection = {id:'decision-checklist',title:'What to check before acting on the result',paragraphs:decisions};
  const oldInterpretation = sections.findIndex(section => section.id === 'interpret-results');
  if (oldInterpretation >= 0 && ['cleaningContract','lawnRoute','chemical','hairColor','returns'].includes(tool.mode)) sections[oldInterpretation] = decisionSection;
  else sections.splice(sections.findIndex(section=>section.id==='worked-examples')+1,0,decisionSection);
  const corrections = {
    'Does this calculate net profit after a discount?':'It calculates contribution after variable costs and percentage fees. Subtract fixed operating costs for operating profit, then reconcile interest, taxes and other applicable items for net profit. Keep owner compensation explicit and changed commitments in a separate comparison.'
  };
  return {...tool,sections,faq:[...tool.faq.map(([q,a])=>[q,corrections[q] || a]),faq],reviewed:'2026-10-13'};
}
