export const decisionTools = {
  "salon-rebooking-calculator": {
    "mode": "rebooking",
    "name": "Salon Rebooking Calculator",
    "category": "Salon retention",
    "resultLabel": "Additional contribution from rebooking",
    "title": "Salon Rebooking Calculator | MyBreakeven",
    "description": "Calculate salon rebooking revenue and contribution with attendance and spare-capacity limits. Free tool with transparent formulas and worked examples.",
    "intro": "With 200 completed visits, rebooking rising from 40% to 60% creates 40 additional bookings. At 80% attendance, 32 visits are expected; 25 spare slots cap delivery at 25. At an $80 ticket, $25 cost and 3% fee, added contribution is $1,315.",
    "defaults": {
      "appointments": 200,
      "current": 40,
      "target": 60,
      "attendance": 80,
      "capacity": 25,
      "price": 80,
      "cost": 25,
      "fee": 3
    },
    "fields": [
      [
        "appointments",
        "Completed appointments in your baseline cohort",
        "Use one reporting period and one defined rebooking window.",
        "1"
      ],
      [
        "current",
        "Current rebooking rate (%)",
        "Rebookings divided by completed baseline appointments."
      ],
      [
        "target",
        "Target rebooking rate (%)",
        "Your assumption; must be at least the current rate."
      ],
      [
        "attendance",
        "Expected attendance on additional bookings (%)",
        "Rebooking does not guarantee attendance."
      ],
      [
        "capacity",
        "Spare completed-visit capacity",
        "Available slots in the follow-up delivery period.",
        "1"
      ],
      [
        "price",
        "Average service price",
        "Exclude tax and tips."
      ],
      [
        "cost",
        "Avoidable service cost per completed visit",
        "Products, variable staff compensation and flat fees; do not include fixed wages twice."
      ],
      [
        "fee",
        "Payment fee (%)",
        "Percentage of service revenue."
      ]
    ],
    "quick": "With 200 completed visits, rebooking rising from 40% to 60% creates 40 additional bookings. At 80% attendance, 32 visits are expected; 25 spare slots cap delivery at 25. At an $80 ticket, $25 cost and 3% fee, added contribution is $1,315.",
    "features": [
      "Free, private calculations without signup.",
      "Exact decimal arithmetic with validated inputs and transparent assumptions.",
      "Editable inputs, reset example and global currency labels; no exchange-rate conversion.",
      "Attendance-adjusted visits capped by your actual spare capacity."
    ],
    "guide": "/calculators/salon-break-even-calculator/",
    "guideLabel": "Full salon break-even calculator",
    "image": "/images/tools/salon-rebooking-calculator-cover.webp",
    "alt": "Blush salon chair with a translucent rebooking calendar and repeat-booking arrow",
    "caption": "With 200 completed visits, rebooking rising from 40% to 60% creates 40 additional bookings. At 80% attendance, 32 visits are expected; 25 spare slots cap delivery at 25. At an $80 ticket, $25 cost and 3% fee, added contribution is $1,315.",
    "assumptions": "This models one follow-up visit per extra rebooking, not compound lifetime value. It assumes the visits are incremental rather than merely moved earlier. Fixed overhead is unchanged; new campaign costs must be subtracted separately. Do not annualize a cohort without its visit timing.",
    "reviewed": "2026-10-08",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use this calculator",
        "steps": [
          "Choose a completed-appointment cohort and a consistent rebooking window.",
          "Estimate attendance from actual returned visits, separately from checkout rebooking.",
          "Enter spare slots for the period when those visits would occur.",
          "Compare added contribution with the cost of your retention effort."
        ]
      },
      {
        "id": "formula",
        "title": "Formula and calculation boundaries",
        "paragraphs": [
          "Extra bookings = completed baseline appointments \u00d7 (target rate \u2212 current rate). Expected attendance = extra bookings \u00d7 attendance rate. Delivered visits = minimum of expected attendance and spare capacity.",
          "Contribution per visit = price \u00d7 (1 \u2212 payment fee) \u2212 avoidable cost. Added contribution = delivered visits \u00d7 contribution per visit. Fractional visits describe expectations, not guaranteed whole bookings."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Checked example",
        "paragraphs": [
          "With 200 completed visits, rebooking rising from 40% to 60% creates 40 additional bookings. At 80% attendance, 32 visits are expected; 25 spare slots cap delivery at 25. At an $80 ticket, $25 cost and 3% fee, added contribution is $1,315.",
          "These are hypothetical inputs, not market benchmarks. Change the inputs to use your own records."
        ]
      },
      {
        "id": "common-mistakes",
        "title": "Avoid double counting",
        "paragraphs": [
          "This models one follow-up visit per extra rebooking, not compound lifetime value. It assumes the visits are incremental rather than merely moved earlier. Fixed overhead is unchanged; new campaign costs must be subtracted separately. Do not annualize a cohort without its visit timing."
        ]
      }
    ],
    "faq": [
      [
        "Is rebooking the same as retention?",
        "No. Rebooking is a scheduled future visit; retention records actual returns. Attendance is modeled separately."
      ],
      [
        "Why does capacity reduce the result?",
        "Only extra visits that fit available delivery capacity are counted. Additional demand is reported but excluded from contribution."
      ],
      [
        "Does this predict repeat revenue?",
        "No. Target rate and attendance are your assumptions. It models one subsequent visit, not a guaranteed recurring stream."
      ],
      [
        "What if contribution is negative?",
        "The calculator keeps the negative result visible. Increasing visits cannot repair an unprofitable service price."
      ]
    ],
    "related": [
      [
        "Check hair-color product cost",
        "/calculators/hair-color-product-cost-calculator/"
      ],
      [
        "Calculate no-show losses",
        "/calculators/salon-no-show-profit-loss-calculator/"
      ]
    ],
    "sources": [
      [
        "Rebooking measurement and timing \u2014 AttentionClaw",
        "https://www.attentionclaw.com/tools/client-rebooking-rate-calculator"
      ]
    ]
  },
  "salon-no-show-profit-loss-calculator": {
    "mode": "noShow",
    "name": "Salon No-Show Profit Loss Calculator",
    "category": "Salon attendance",
    "resultLabel": "Monthly contribution gap from unfilled slots",
    "title": "Salon No-Show Profit Loss Calculator | MyBreakeven",
    "description": "Calculate salon no-show revenue and contribution loss after refilled slots, retained fees and avoidable costs. Test your own recovery scenario for free.",
    "intro": "Of 200 monthly bookings, 20 are missed and 5 refilled, leaving 15 unfilled slots. At $80 per service, $25 avoidable cost, $5 wasted cost, a $15 retained fee and 3% processing, the contribution gap is $645.75. A modeled 40% reduction recovers $258.30.",
    "defaults": {
      "bookings": 200,
      "missed": 20,
      "refilled": 5,
      "price": 80,
      "cost": 25,
      "sunk": 5,
      "retained": 15,
      "fee": 3,
      "reduction": 40
    },
    "fields": [
      [
        "bookings",
        "Original scheduled appointments / month",
        "Exclude replacement appointments from this denominator.",
        "1"
      ],
      [
        "missed",
        "No-shows and late cancellations",
        "Use the same definition each month.",
        "1"
      ],
      [
        "refilled",
        "Missed slots refilled with an equivalent service",
        "Replacement visits are assumed to have the same ticket and cost.",
        "1"
      ],
      [
        "price",
        "Average service price",
        "Exclude sales tax and tips."
      ],
      [
        "cost",
        "Avoidable cost of a completed service",
        "Costs not incurred on an unfilled slot, such as unused products and variable commission."
      ],
      [
        "sunk",
        "Extra unrecoverable cost per unfilled slot",
        "Only wasted preparation or other incremental costs; exclude unchanged rent and fixed salaries."
      ],
      [
        "retained",
        "Fee actually retained per unfilled slot",
        "Non-refundable amount collected. Exclude refundable deposits and fees on refilled slots."
      ],
      [
        "fee",
        "Payment processing fee (%)",
        "Same percentage assumed on service revenue and retained fees."
      ],
      [
        "reduction",
        "Assumed reduction in unfilled missed slots (%)",
        "User scenario, not a software efficacy claim."
      ]
    ],
    "quick": "Of 200 monthly bookings, 20 are missed and 5 refilled, leaving 15 unfilled slots. At $80 per service, $25 avoidable cost, $5 wasted cost, a $15 retained fee and 3% processing, the contribution gap is $645.75. A modeled 40% reduction recovers $258.30.",
    "features": [
      "Free, private calculations without signup.",
      "Exact decimal arithmetic with validated inputs and transparent assumptions.",
      "Editable inputs, reset example and global currency labels; no exchange-rate conversion.",
      "Separate revenue forgone, contribution gap, refill offsets and retained fees."
    ],
    "guide": "/calculators/salon-break-even-calculator/",
    "guideLabel": "Full salon break-even calculator",
    "image": "/images/tools/salon-no-show-profit-loss-calculator-cover.webp",
    "alt": "Empty salon chair beside a missed-appointment calendar and illustrative coins",
    "caption": "Of 200 monthly bookings, 20 are missed and 5 refilled, leaving 15 unfilled slots. At $80 per service, $25 avoidable cost, $5 wasted cost, a $15 retained fee and 3% processing, the contribution gap is $645.75. A modeled 40% reduction recovers $258.30.",
    "assumptions": "This is a counterfactual contribution gap, not accounting net profit. Equivalent refills fully offset the missed service. Fees are allocated only to unfilled slots. Fixed overhead is unchanged. Negative gaps are possible when retained fees exceed contribution and wasted cost. No recommended cancellation policy or guaranteed recovery is implied.",
    "reviewed": "2026-10-08",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use this calculator",
        "steps": [
          "Count original bookings, misses and equivalent refilled slots for the same month.",
          "Separate avoidable completed-service costs from incremental wasted preparation.",
          "Enter only cancellation money actually retained after refunds.",
          "Test a reduction scenario and compare recovery with intervention costs."
        ]
      },
      {
        "id": "formula",
        "title": "Formula and calculation boundaries",
        "paragraphs": [
          "Unfilled slots = missed appointments \u2212 equivalent refilled slots. Normal contribution = price \u00d7 (1 \u2212 fee rate) \u2212 avoidable completed-service cost.",
          "Gap per unfilled slot = normal contribution + extra wasted cost \u2212 retained fee \u00d7 (1 \u2212 fee rate). Monthly gap = unfilled slots \u00d7 gap. Recovery = monthly gap \u00d7 assumed reduction. Annualized gap = monthly gap \u00d7 12 under an unchanged monthly pattern."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Checked example",
        "paragraphs": [
          "Of 200 monthly bookings, 20 are missed and 5 refilled, leaving 15 unfilled slots. At $80 per service, $25 avoidable cost, $5 wasted cost, a $15 retained fee and 3% processing, the contribution gap is $645.75. A modeled 40% reduction recovers $258.30.",
          "These are hypothetical inputs, not market benchmarks. Change the inputs to use your own records."
        ]
      },
      {
        "id": "common-mistakes",
        "title": "Avoid double counting",
        "paragraphs": [
          "This is a counterfactual contribution gap, not accounting net profit. Equivalent refills fully offset the missed service. Fees are allocated only to unfilled slots. Fixed overhead is unchanged. Negative gaps are possible when retained fees exceed contribution and wasted cost. No recommended cancellation policy or guaranteed recovery is implied."
        ]
      }
    ],
    "faq": [
      [
        "Why is lost revenue higher than lost contribution?",
        "Undelivered services can avoid product or variable labor costs. The tool separates the ticket value from the actual contribution gap."
      ],
      [
        "Can I include salaried staff wages as avoidable cost?",
        "Only if those wages genuinely disappear when the slot is unfilled. Unchanged salaries belong in fixed overhead and cancel out of this comparison."
      ],
      [
        "Does a deposit eliminate the loss?",
        "Only the portion actually retained offsets the gap. Refundable money remains a liability and is excluded."
      ],
      [
        "What if I fill the canceled slot?",
        "An equivalent replacement fully offsets that service. If its ticket or costs differ, model the difference separately."
      ]
    ],
    "related": [
      [
        "Model salon rebooking",
        "/calculators/salon-rebooking-calculator/"
      ]
    ],
    "sources": [
      [
        "No-show definition and rate \u2014 Goldie",
        "https://heygoldie.com/blog/how-to-calculate-salon-no-show-rate"
      ],
      [
        "Cancellation fees and prepayments \u2014 Square",
        "https://squareup.com/help/us/en/article/5493-manage-booking-cancellations-and-prepayment-policies"
      ]
    ]
  },
  "mobile-detailing-travel-profit-calculator": {
    "mode": "travelProfit",
    "name": "Mobile Detailing Travel Profit Calculator",
    "category": "Mobile detailing",
    "resultLabel": "Job A minus Job B: owner earnings per hour",
    "title": "Mobile Detailing Travel Profit Calculator | MyBreakeven",
    "description": "Compare two mobile detailing jobs after travel time, vehicle costs and fees. Calculate hourly earnings and the extra surcharge needed to meet your target.",
    "intro": "Job A charges $220 and occupies 3.25 hours with $54 costs; at 3% fees it earns $49.05/hour. Job B charges $180 and occupies 2.58 hours with $36 costs, earning $53.65/hour. The nearby job earns $4.61 more per occupied hour despite its lower ticket.",
    "defaults": {
      "fee": 3,
      "vehicle": 0.6,
      "target": 50,
      "priceA": 220,
      "surchargeA": 0,
      "serviceA": 120,
      "setupA": 15,
      "travelA": 60,
      "distanceA": 40,
      "costA": 20,
      "overheadA": 10,
      "priceB": 180,
      "surchargeB": 0,
      "serviceB": 120,
      "setupB": 15,
      "travelB": 20,
      "distanceB": 10,
      "costB": 20,
      "overheadB": 10
    },
    "fields": [
      [
        "fee",
        "Payment fee (%)",
        "Applied to base price plus existing travel surcharge."
      ],
      [
        "vehicle",
        "Vehicle cost per distance unit",
        "Use cost per mile or per kilometer consistently for both jobs; this is not a tax deduction rate."
      ],
      [
        "target",
        "Target owner earnings / occupied hour",
        "Before personal tax; not an additional expense to subtract."
      ],
      [
        "priceA",
        "Job A: Base service price",
        "Exclude sales tax and existing travel surcharge."
      ],
      [
        "surchargeA",
        "Job A: Existing travel surcharge",
        "Amount already charged, not a cost."
      ],
      [
        "serviceA",
        "Job A: Service time (minutes)",
        "Total owner time working on this car."
      ],
      [
        "setupA",
        "Job A: Setup and cleanup time (minutes)",
        "Include loading or packing allocated to this job."
      ],
      [
        "travelA",
        "Job A: Total travel time (minutes)",
        "Both journeys or allocated route legs; do not double count."
      ],
      [
        "distanceA",
        "Job A: Total allocated distance",
        "Enter round-trip miles or kilometers consistently."
      ],
      [
        "costA",
        "Job A: Direct job costs",
        "Products, helper labor and parking; exclude vehicle cost and owner earnings target."
      ],
      [
        "overheadA",
        "Job A: Allocated overhead",
        "This job\u2019s share of fixed expenses only."
      ],
      [
        "priceB",
        "Job B: Base service price",
        "Exclude sales tax and existing travel surcharge."
      ],
      [
        "surchargeB",
        "Job B: Existing travel surcharge",
        "Amount already charged, not a cost."
      ],
      [
        "serviceB",
        "Job B: Service time (minutes)",
        "Total owner time working on this car."
      ],
      [
        "setupB",
        "Job B: Setup and cleanup time (minutes)",
        "Include loading or packing allocated to this job."
      ],
      [
        "travelB",
        "Job B: Total travel time (minutes)",
        "Both journeys or allocated route legs; do not double count."
      ],
      [
        "distanceB",
        "Job B: Total allocated distance",
        "Enter round-trip miles or kilometers consistently."
      ],
      [
        "costB",
        "Job B: Direct job costs",
        "Products, helper labor and parking; exclude vehicle cost and owner earnings target."
      ],
      [
        "overheadB",
        "Job B: Allocated overhead",
        "This job\u2019s share of fixed expenses only."
      ]
    ],
    "quick": "Job A charges $220 and occupies 3.25 hours with $54 costs; at 3% fees it earns $49.05/hour. Job B charges $180 and occupies 2.58 hours with $36 costs, earning $53.65/hour. The nearby job earns $4.61 more per occupied hour despite its lower ticket.",
    "features": [
      "Free, private calculations without signup.",
      "Exact decimal arithmetic with validated inputs and transparent assumptions.",
      "Editable inputs, reset example and global currency labels; no exchange-rate conversion.",
      "Compare two jobs by occupied-hour earnings and the extra surcharge needed."
    ],
    "guide": "/calculators/mobile-detailing-break-even-calculator/",
    "guideLabel": "Full mobile detailing break-even calculator",
    "image": "/images/tools/mobile-detailing-travel-profit-calculator-cover.webp",
    "alt": "Mobile detailing van and car with a travel route and clock",
    "caption": "Job A charges $220 and occupies 3.25 hours with $54 costs; at 3% fees it earns $49.05/hour. Job B charges $180 and occupies 2.58 hours with $36 costs, earning $53.65/hour. The nearby job earns $4.61 more per occupied hour despite its lower ticket.",
    "assumptions": "Assumes one owner\u2019s occupied time. Not scheduling software and does not predict bookings, traffic or route order. Taxes, unpaid admin time not entered, and new equipment finance are excluded. Use all costs once. Lower ticket jobs may produce higher hourly earnings but fewer total earnings; both metrics are shown.",
    "reviewed": "2026-10-08",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use this calculator",
        "steps": [
          "Enter both candidate jobs with the same cost and time definitions.",
          "Allocate each driving leg once; enter total journey distance and time.",
          "Include helper wages separately, but leave your own target earnings outside expenses.",
          "Compare hourly earnings and the additional surcharge needed to reach your target."
        ]
      },
      {
        "id": "formula",
        "title": "Formula and calculation boundaries",
        "paragraphs": [
          "Occupied hours = (service + setup + allocated travel minutes) \u00f7 60. Costs = distance \u00d7 vehicle cost per unit + direct costs + allocated overhead.",
          "Owner earnings = (base price + existing surcharge) \u00d7 (1 \u2212 fee rate) \u2212 entered costs. Hourly earnings = owner earnings \u00f7 occupied hours.",
          "Required total charge = (entered costs + occupied hours \u00d7 target hourly earnings) \u00f7 (1 \u2212 fee rate). Additional surcharge = maximum of zero and required total minus current total, rounded upward to cents. Compare hourly returns using unrounded values."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Checked example",
        "paragraphs": [
          "Job A charges $220 and occupies 3.25 hours with $54 costs; at 3% fees it earns $49.05/hour. Job B charges $180 and occupies 2.58 hours with $36 costs, earning $53.65/hour. The nearby job earns $4.61 more per occupied hour despite its lower ticket.",
          "These are hypothetical inputs, not market benchmarks. Change the inputs to use your own records."
        ]
      },
      {
        "id": "common-mistakes",
        "title": "Avoid double counting",
        "paragraphs": [
          "Assumes one owner\u2019s occupied time. Not scheduling software and does not predict bookings, traffic or route order. Taxes, unpaid admin time not entered, and new equipment finance are excluded. Use all costs once. Lower ticket jobs may produce higher hourly earnings but fewer total earnings; both metrics are shown."
        ]
      }
    ],
    "faq": [
      [
        "Can I use kilometers?",
        "Yes. Use kilometers and vehicle cost per kilometer for both jobs. Distance is total allocated travel, not automatically doubled."
      ],
      [
        "Why not use fuel cost alone?",
        "Vehicle cost may include wear, maintenance and insurance allocations. Do not also include the same vehicle costs in overhead."
      ],
      [
        "Is owner hourly earnings net profit?",
        "No. It includes compensation for the owner\u2019s time and is before personal tax and unentered costs."
      ],
      [
        "Does the suggested extra surcharge include fees?",
        "Yes. It grosses up the target charge for the entered percentage payment fee, then subtracts what you already charge."
      ]
    ],
    "related": [
      [
        "Calculate detailing chemical cost",
        "/calculators/detailing-chemical-cost-calculator/"
      ]
    ],
    "sources": [
      [
        "Travel and occupied-time pricing \u2014 CalMov",
        "https://www.calmov.com/tools/mobile-car-detailing-pricing-calculator"
      ]
    ]
  }
};
