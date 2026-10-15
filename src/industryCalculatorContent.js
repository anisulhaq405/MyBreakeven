import { calculate } from './engine.js';
import { industries } from './industries.js';
export const industryPages = {
  "cleaning-business-break-even-calculator": { key: "cleaning", title: "Cleaning Business Break-Even Calculator", lead: "Calculate the monthly cleaning jobs, leads and team hours needed to cover overhead, owner pay and your profit goal.", costs: "cleaning supplies, direct labor, travel, equipment use, card fees and lead-generation cost", questions: ["How many cleaning jobs do I need to break even?", "Can my cleaners deliver the required monthly jobs?", "How many cleaning leads does my conversion rate require?"] },
  "landscaping-break-even-calculator": { key: "landscaping", title: "Landscaping Break-Even Calculator", lead: "Enter your landscaping job price and costs to calculate monthly job targets, revenue and crew capacity. Set owner pay and target profit to zero to check operating break-even.", costs: "plants and materials, crew labor, fuel, equipment use, payment fees and customer acquisition", questions: ["How many landscaping jobs cover monthly overhead?", "Is current crew capacity enough for the target?", "How does average job price change break-even volume?"] },
  "photography-business-break-even-calculator": { key: "photography", title: "Photography Business Break-Even Calculator", lead: "Turn session pricing, editing time, travel, booking costs and studio overhead into an exact monthly session target.", costs: "session materials, photographer labor, editing, gallery delivery, travel, payment fees and booking acquisition", questions: ["How many photography sessions do I need each month?", "Does editing time create a capacity gap?", "What average session price supports owner pay?"] },
  "agency-break-even-calculator": { key: "agency", title: "Agency and Freelancer Break-Even Calculator", lead: "Calculate required retainers, client leads and delivery capacity using contractor costs, software, labor and acquisition assumptions.", costs: "delivery labor, contractors, client software, payment fees and sales acquisition", questions: ["How many retainer clients cover agency overhead?", "How much delivery capacity does the team have?", "How many qualified leads are needed to win the target clients?"] },
  "mobile-detailing-break-even-calculator": { key: "detailing", title: "Mobile Detailing Break-Even Calculator", lead: "Estimate required detailing jobs and bookings after supplies, technician labor, travel, equipment and local marketing costs.", costs: "detailing products, technician labor, water, travel, equipment use, fees and booked-job acquisition", questions: ["How many detailing jobs are needed to break even?", "Can the mobile team serve enough vehicles?", "How does price affect monthly booking requirements?"] },
  "ecommerce-break-even-calculator": { key: "ecommerce", title: "E-commerce Break-Even Calculator", lead: "Calculate exact break-even orders and revenue after COGS, fulfillment, shipping subsidy, returns, platform fees and paid acquisition.", costs: "COGS, fulfillment labor, shipping subsidy, return allowance, payment or platform fees and customer acquisition cost", questions: ["How many e-commerce orders are needed to break even?", "What revenue covers overhead and advertising?", "How do returns and shipping affect contribution margin?"] },
  "restaurant-break-even-calculator": { key: "restaurant", title: "Restaurant Break-Even Calculator", lead: "Convert average check, food cost, direct labor, packaging, delivery commission and overhead into required monthly orders.", costs: "food and ingredients, direct labor, packaging, delivery commissions, card fees and promotion", questions: ["How many restaurant orders cover monthly fixed costs?", "What sales revenue reaches break-even?", "Can kitchen and service capacity handle required demand?"] },
  "salon-break-even-calculator": { key: "salon", title: "Salon Break-Even Calculator", lead: "Estimate appointments, revenue and customer inquiries using service price, product usage, stylist labor and chair capacity.", costs: "service products, stylist labor, disposables, laundry, payment fees and appointment acquisition", questions: ["How many salon appointments are needed to break even?", "What revenue covers rent and owner pay?", "Are stylist hours sufficient for the target appointments?"] },
};
export const industryInputGuidance = {
  "cleaning": {
    "records": [
      [
        "Price per completed visit",
        "Paid invoices and written visit scope",
        "Separate deep cleans from routine visits when time or cost differs."
      ],
      [
        "Worker-hours and loaded labor",
        "Time sheets including setup and allocated paid travel",
        "Use total person-hours, not elapsed time for a whole crew."
      ],
      [
        "Monthly commitments",
        "Insurance, admin, equipment and owner-pay budget",
        "Keep costs already charged per visit out of overhead."
      ]
    ],
    "pitfall": "For a two-person team working two hours, enter four total worker-hours per job. If the work is one customer contract with several visits, model one completed visit consistently and price the contract in the linked tool.",
    "question": "Can I use a monthly cleaning contract as one job?",
    "answer": "Yes, only if price, variable costs and total worker-hours all describe that entire monthly contract. Otherwise use a completed visit as the unit and keep the monthly contract quote separate.",
    "links": [
      [
        "Price a recurring contract",
        "/calculators/cleaning-contract-profit-calculator/"
      ],
      [
        "Review quote versus actual cost",
        "/blogs/cleaning-estimate-vs-actual-job-cost/"
      ]
    ]
  },
  "landscaping": {
    "records": [
      [
        "Price and visit scope",
        "Paid mowing/job invoices",
        "Do not mix routine mowing and large installations without a stable weighted unit."
      ],
      [
        "Crew-hours and vehicle/material cost",
        "Route log and job cost records",
        "Separate crew time from route elapsed hours and include allocated travel once."
      ],
      [
        "Fixed commitments",
        "Equipment, insurance and overhead ledger",
        "Separate usage-related wear from fixed costs; loan principal belongs in cash planning."
      ]
    ],
    "pitfall": "Use measured crew-hours for the complete visit, including necessary setup and travel. A per-acre public price still needs the cost and delivery time of a complete job; small properties may require a minimum visit charge.",
    "question": "Does acreage belong in the job count?",
    "answer": "Only if one modeled unit consistently means one acre with matching price, costs and crew-hours. For complete visits, use visits as the unit and test property sizes separately.",
    "links": [
      [
        "Compare a complete lawn route",
        "/calculators/lawn-route-profit-calculator/"
      ],
      [
        "Set a fee-aware per-acre quote",
        "/blogs/lawn-care-pricing-per-acre/"
      ]
    ]
  },
  "photography": {
    "records": [
      [
        "Realized session price",
        "Paid packages after discounts",
        "Keep prints, albums and add-ons in the same defined package or a separate model."
      ],
      [
        "Delivery cost and total hours",
        "Shoot, edit, travel and client-delivery records",
        "Editing and revisions consume capacity even when not separately invoiced."
      ],
      [
        "Monthly overhead and availability",
        "Studio/software ledger and annual work calendar",
        "Equipment purchases are a cash decision; do not duplicate their allocation."
      ]
    ],
    "pitfall": "Use total worker-hours for preparation, shooting, editing and delivery. If owner labor is represented in monthly owner pay, do not also enter the same compensation per session; paid assistants remain a separate delivery cost.",
    "question": "Should I include editing hours in capacity?",
    "answer": "Yes. Include editing, preparation, allocated travel and delivery work needed for the modeled package. Counting only shooting time can overstate how many sessions the team can complete.",
    "links": [
      [
        "Check your billable-hour rate",
        "/calculators/hourly-rate-calculator/"
      ],
      [
        "Review monthly client capacity",
        "/blogs/how-many-photography-clients-month/"
      ]
    ]
  },
  "agency": {
    "records": [
      [
        "Retainer revenue and scope",
        "Current contract and realized invoices",
        "Define one monthly retainer unit; one-off projects need a separate scenario."
      ],
      [
        "Client-delivery cost and hours",
        "Contractor invoices and timesheets",
        "Include revisions and supervision; avoid repeating salaried commitments per client."
      ],
      [
        "Monthly overhead and owner pay",
        "Payroll, software and founder budget",
        "Separate fixed staffing commitments from genuinely variable contractor work."
      ]
    ],
    "pitfall": "A new-client acquisition cost entered against every monthly retainer would overstate recurring cost if it occurs only once. Use a clearly allocated recurring-unit allowance or a separate new-client acquisition scenario; the calculator does not model acquisition timing automatically.",
    "question": "Does the lead target mean every retained client must be reacquired monthly?",
    "answer": "No. The tool applies your conversion rate to the required unit volume. Separate existing retained clients from the new clients still needed, then apply an appropriate acquisition/conversion model to that new-client gap.",
    "links": [
      [
        "Compare employee and freelancer delivery",
        "/blogs/agency-employee-vs-freelancer-break-even/"
      ],
      [
        "Review client profitability",
        "/blogs/agency-client-profitability/"
      ]
    ]
  },
  "detailing": {
    "records": [
      [
        "Job price and service scope",
        "Paid invoices and service checklist",
        "Keep interior/exterior packages separate when their economics differ."
      ],
      [
        "Full job time and direct cost",
        "Timed service, setup, travel and product usage",
        "Sum technician worker-hours and allocated travel; chemicals are only one cost."
      ],
      [
        "Monthly commitments",
        "Insurance, vehicle/equipment and owner budget",
        "Avoid repeating vehicle or equipment allocations in per-job and fixed costs."
      ]
    ],
    "pitfall": "For an owner-operated mobile visit, time includes loading, setup, service, cleanup and the allocated journey. Compare the whole-day schedule as well as per-job contribution; a financially attractive distant job can consume the remaining delivery hours.",
    "question": "Can I use chemical cost as the entire variable cost?",
    "answer": "No. Add the other relevant job costs, such as technician labor, travel, consumables and fees. The chemical calculator estimates one product component, not a full detailing job.",
    "links": [
      [
        "Measure chemical cost per car",
        "/calculators/detailing-chemical-cost-calculator/"
      ],
      [
        "Compare travel and occupied time",
        "/calculators/mobile-detailing-travel-profit-calculator/"
      ]
    ]
  },
  "ecommerce": {
    "records": [
      [
        "Net order value",
        "Matched orders after discounts and refunds",
        "Exclude taxes collected for others; a payout after fees is not the original revenue."
      ],
      [
        "Order costs and return allowance",
        "Landed product, fulfillment, shipping and return records",
        "Net refunded revenue once and include remaining unrecovered costs once."
      ],
      [
        "Overhead and fulfillment hours",
        "Platform/staff commitments and order-processing records",
        "Use stable order mix and available delivery worker-hours; stock availability is separate."
      ]
    ],
    "pitfall": "Fulfillment capacity here is based on entered productive hours, not stock availability, carrier cutoff or warehouse-space limits. A viable hours result does not prove enough inventory or advertising demand exists. Reconcile monthly operating profit with interest, taxes and cash timing separately.",
    "question": "Does positive order contribution prove the store is profitable?",
    "answer": "No. Order contribution must cover monthly overhead and the stated owner-pay/profit requirement. Returns, acquisition mix and unentered costs can change the full result; the tool does not verify your order records.",
    "links": [
      [
        "Check campaign break-even ROAS",
        "/calculators/break-even-roas-calculator/"
      ],
      [
        "Reconcile full ecommerce margins",
        "/blogs/ecommerce-profit-margin/"
      ]
    ]
  },
  "restaurant": {
    "records": [
      [
        "Net average order/check",
        "Matched POS sales by channel",
        "Do not confuse meals, covers and whole customer checks as the selling unit."
      ],
      [
        "Food, sale-dependent labor and fees",
        "Recipe/inventory, payroll and platform records",
        "Guaranteed payroll is a fixed commitment; do not also charge it per order."
      ],
      [
        "Monthly commitments and productive time",
        "Occupancy/payroll ledger and service schedule",
        "Kitchen, seating and daypart limits may require separate checks beyond worker-hours."
      ]
    ],
    "pitfall": "Use one comparable order unit and an explicit channel mix. A delivery commission charged on some orders needs a representative blended fee or separate channel scenarios; it is not a fee on every dine-in check. Capacity based on worker-hours does not automatically check seats or kitchen bottlenecks.",
    "question": "Should all restaurant labor be variable?",
    "answer": "No. Include labor that changes with the modeled sales unit in per-order cost. Keep guaranteed staffing in monthly fixed costs for the chosen period, and split mixed payroll consistently so the same wages are not counted twice.",
    "links": [
      [
        "Cost the menu against available orders",
        "/blogs/restaurant-menu-pricing-formula/"
      ],
      [
        "Reconcile restaurant labor",
        "/blogs/restaurant-labor-cost-percentage/"
      ]
    ]
  },
  "salon": {
    "records": [
      [
        "Realized service ticket",
        "Paid appointments by comparable service",
        "Exclude tax/tips and keep retail sales separate from chair appointments."
      ],
      [
        "Product and variable staff cost",
        "Recipe usage and commission/payroll records",
        "Include waste once; fixed wages should not be repeated as variable commission."
      ],
      [
        "Productive time and monthly commitments",
        "Delivered service times, diary and overhead ledger",
        "Use total worker-hours; gaps and no-shows can reduce realized paid volume."
      ]
    ],
    "pitfall": "For color services, preparation, processing work and cleanup can require different amounts of occupied stylist time. Enter the worker-hours actually required, then check any separate chair or station bottleneck. Retail contribution does not create extra chair appointments.",
    "question": "Does retail revenue increase appointment capacity?",
    "answer": "No. Product sales can add contribution but do not become chair appointments. Model retail economics separately or use a clearly defined combined unit; preserve the service-time boundary.",
    "links": [
      [
        "Check color product cost",
        "/calculators/hair-color-product-cost-calculator/"
      ],
      [
        "Measure missed-appointment contribution",
        "/calculators/salon-no-show-profit-loss-calculator/"
      ]
    ]
  }
};
export const industryFieldHelp = {
  "price": "Net revenue per defined unit after discounts. Exclude taxes collected for others.",
  "materialCost": "Materials or product consumed per unit, using compatible quantities and purchase costs.",
  "laborCost": "Labor that changes with a delivered unit. Keep guaranteed payroll in fixed costs and owner compensation once.",
  "otherVariableCost": "Other sale-dependent costs, including flat fees. Exclude the percentage fee entered below.",
  "acquisitionCost": "Acquisition cost allocated per modeled sale. Do not charge a one-time customer cost to every repeat visit.",
  "fixedCosts": "Monthly commitments for this operating range, excluding costs already entered per unit.",
  "ownerPay": "Monthly owner-compensation requirement. Do not repeat the same owner wage in per-unit labor.",
  "targetProfit": "Additional monthly profit goal beyond entered costs and owner pay. Zero means no additional profit goal.",
  "paymentFeePct": "Percentage of selling price. A flat transaction charge belongs in other variable cost.",
  "workers": "Positive whole team size contributing the modeled productive hours.",
  "hoursPerWorker": "Available hours per team member per week before productive-utilization adjustment.",
  "hoursPerJob": "Total worker-hours per completed unit, including necessary preparation, delivery and allocated travel.",
  "utilizationPct": "Share of available hours usable for the modeled delivery work. Do not subtract the same downtime twice.",
  "conversionPct": "Completed sales divided by comparable qualified inquiries. Enter a measured rate above zero."
};
const money = value => new Intl.NumberFormat("en-US", {style:"currency",currency:"USD",maximumFractionDigits:2}).format(value);
function answerQuestion(question, result, industry) {
  const unit = industry.unit;
  const v = industry.values;
  if (/price|returns|shipping/i.test(question)) {
    return `In this example, each ${industry.singular} contributes ${money(result.contribution)} after direct costs and fees. Changing the price or a per-${industry.singular} cost changes that contribution and therefore the number of ${unit} needed. Enter your own assumptions to see the effect.`;
  }
  if (/capacity|crew|team|cleaners|editing|kitchen|stylist|mobile|handle|serve/i.test(question)) {
    return `The example requires ${result.wholeJobs} whole ${unit} and estimates capacity for ${result.wholeCapacity} whole ${unit} per month, using ${v.workers} team members, ${v.hoursPerWorker} hours each per week and ${v.utilizationPct}% productive time. Adjust those inputs to check your own delivery limit.`;
  }
  if (/leads|inquiries|bookings/i.test(question)) {
    return `At the example ${v.conversionPct}% inquiry-to-${industry.singular} conversion rate, the model estimates ${result.leads.toFixed(2)} inquiries for the exact fractional financial target (${result.wholeLeads} rounded up). Use your measured conversion rate for a more useful demand estimate.`;
  }
  return `At the example price of ${money(v.price)}, each ${industry.singular} contributes ${money(result.contribution)} after direct costs and fees. Covering ${money(result.fixedNeed)} in overhead, owner pay and target profit requires ${result.wholeJobs} whole ${unit}, or ${money(result.practicalRevenue)} in practical monthly sales. Replace these sample inputs with your figures.`;
}


export function industryCalculatorFaq(industryKey) {
  const page = Object.values(industryPages).find(page => page.key === industryKey);
  if (!page) return [];
  const industry = industries[industryKey], result = calculate(industry.values), guidance = industryInputGuidance[industryKey];
  const ecommerceQuestions = industryKey === 'ecommerce' ? [
    ['Can I use this for handmade products and small batches?', 'Yes. Preview and load the jewellery, ceramics, clothing or art-print example, then replace every assumption. Include making and packing worker-hours, allocate batch costs consistently, and keep owner compensation either in monthly owner pay or the relevant labor cost, once. The examples are illustrative USD inputs, not industry benchmarks.'],
    ['How should I enter shipping, returns and platform fees?', 'Include seller-funded shipping, packing, flat fees and unrecovered return costs in the appropriate per-order costs. Exclude collected taxes from net price. Reconcile refunds and fee reversals so the same amount is not deducted twice; enter percentage fees separately from flat charges.'],
    ['Do I need Pro to calculate, and where can I save my plan?', 'No. This page calculates free without an account. Continue with these numbers carries valid inputs to the full calculator in the same browser tab. A free account supports up to 3 saved scenarios; Pro supports up to 100 saved scenarios, three-plan comparisons and CSV/PDF reports. Opening the pricing page alone does not save inputs.'],
  ] : [];
  return [...page.questions.map(q=>[q,answerQuestion(q,result,industry)]), ...ecommerceQuestions,
    [guidance.question,guidance.answer],
    ['What if required sales exceed capacity?','The target does not fit the productive hours you entered. Test price, costs, delivery time or a revised capacity plan. Recalculate any new monthly staffing or equipment commitment; more available hours do not prove customer demand.'],
    ['Is this a cash-flow forecast or net-profit statement?','No. It models contribution, a monthly funding target and productive-hour capacity. Schedule collections, supplier payments, taxes, equipment cash and loan principal separately; reconcile any unentered items before interpreting accounting net profit.']];
}
