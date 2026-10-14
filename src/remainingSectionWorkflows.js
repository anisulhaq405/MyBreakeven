export const remainingSectionWorkflows = {
  salon: {
    label: 'Salon',
    records: ['Completed baseline visits, rebookings and the defined follow-up window.', 'Actual attendance, cancelled slots, equivalent refills and retained non-refundable fees.', 'Products used, avoidable commission or labour, processing fees and committed payroll.', 'Service duration, preparation/cleanup, stylist skills and spare slots in the delivery period.'],
    paths: [
      { title: 'More rebookings are not becoming more completed visits', steps: [
        ['Define the repeat-visit cohort', '/calculators/salon-rebooking-calculator/', 'Keep baseline visits, the booking window and follow-up delivery period separate. Adjust for attendance and available slots.'],
        ['Check missed-slot economics', '/blogs/salon-no-show-cost/', 'Separate equivalent refills, costs avoided and costs already incurred. Gross missed revenue is not the same as contribution lost.'],
        ['Test the whole diary', '/calculators/salon-break-even-calculator/', 'Bring the completed service mix into the monthly plan with committed payroll, owner pay and stylist capacity.'],
      ] },
      { title: 'A membership or colour service is consuming the diary', steps: [
        ['Cost the products actually mixed', '/calculators/hair-color-product-cost-calculator/', 'Record grams used, developer and waste. Product cost does not include every appointment expense.'],
        ['Cost the full appointment', '/blogs/hair-color-service-cost-per-appointment/', 'Include paid stylist time, preparation, cleanup and fees consistently; keep committed payroll separate.'],
        ['Reserve capacity for membership use', '/blogs/salon-membership-pricing/', 'Translate member-months into redeemed appointments, especially full-use and peak-time scenarios. Collections alone do not establish deliverable profit.'],
      ] },
    ],
    resources: [
      ['Repeat-visit calculator', '/calculators/salon-rebooking-calculator/', 'Attendance-adjusted demand capped by spare completed-visit capacity.'],
      ['No-show contribution calculator', '/calculators/salon-no-show-profit-loss-calculator/', 'Missed slots, equivalent refills, sunk costs and retained fees.'],
      ['Membership pricing review', '/blogs/salon-membership-pricing/', 'Redemption, fee and stylist-hour assumptions before enrolling members.'],
    ],
    example: {
      title: 'Worked check: spare slots cap the rebooking gain',
      rows: [['Baseline completed visits / current to target rebooking', '200 / 40% to 60%'], ['Additional bookings / assumed attendance', '40 / 80%'], ['Expected visits / spare slots', '32 / 25'], ['Delivered additional visits', '25'], ['Ticket / avoidable cost / percentage fee', '$80 / $25 / 3%'], ['Contribution per visit / added contribution', '$52.60 / $1,315']],
      explanation: 'The rate change creates 200 × (60% − 40%) = 40 extra bookings. Attendance reduces these to 32 expected visits, but 25 spare slots cap the model. Each completed visit leaves $80 − $25 − $2.40 = $52.60.',
      action: 'The seven visits beyond spare capacity are excluded. These are fictional assumptions, not a prediction about reminder software. Additional contribution still needs to help fund overhead; assess stylist skill and service duration as well as slot counts.',
    },
  },
  photography: {
    label: 'Photography',
    records: ['Agreed deliverables, image count, revisions and delivery dates for one assignment.', 'Enquiry/admin, preparation, travel, shooting, selection, editing and delivery hours.', 'Assistants, rentals, lab products, shipping, gallery charges and actual payment fees.', 'A consistent owner-labour allowance, monthly commitments and shoot/editing capacity.'],
    paths: [
      { title: 'A good session fee leaves little after editing', steps: [
        ['Track the full assignment', '/blogs/photography-cost-per-session-editing/', 'Record preparation through final delivery. Shooting time alone understates the hours consumed.'],
        ['Compare complete packages', '/blogs/photography-pricing-packages/', 'Keep image count, revisions, assistants and products aligned with each offered price.'],
        ['Check the monthly booking target', '/calculators/photography-business-break-even-calculator/', 'Use total worker-hours per assignment and monthly commitments. Spare shooting dates cannot repair an editing bottleneck.'],
      ] },
      { title: 'A mini-session day or add-on needs its own cost boundary', steps: [
        ['Separate event costs from each booking', '/blogs/photography-mini-session-profit/', 'Assign shared setup and venue once, then account for per-client editing and delivery.'],
        ['Cost the extra photographer', '/blogs/photography-second-shooter-cost/', 'Include travel, promised hours and lead-photographer coordination. A second shooter does not necessarily increase editing capacity.'],
        ['Review product fulfilment', '/blogs/photography-print-package-profit/', 'Include lab cost, design/revisions, shipping and fees before combining print contribution with session income.'],
      ] },
    ],
    resources: [
      ['Complete session-cost guide', '/blogs/photography-cost-per-session-editing/', 'Time and expense records from the enquiry to final delivery.'],
      ['Mini-session event review', '/blogs/photography-mini-session-profit/', 'Shared costs, bookings and the event break-even comparison.'],
      ['Monthly photography planner', '/calculators/photography-business-break-even-calculator/', 'Assignment contribution, required sessions and productive hours.'],
    ],
    example: {
      title: 'Worked check: two extra editing hours change the package result',
      rows: [['Selling fee / non-labour direct costs', '$650 / $100'], ['Owner delivery allowance / payment fee', '$30 per hour / 3%'], ['Original full assignment hours', '8'], ['Original contribution after labour allowance', '$290.50'], ['Revised hours / revised contribution', '10 / $230.50'], ['Contribution change / revised contribution per hour', '−$60 / $23.05']],
      explanation: 'This separate fictional assignment costs 8 × $30 + $100 + $19.50 = $359.50, leaving $290.50. Two additional editing hours add $60 under the same allowance, leaving $230.50. Divide by all ten hours, not the shooting time alone.',
      action: 'The $30 is a stated delivery-cost allowance, not a market rate. Do not count that same owner delivery time again as another job cost. Monthly overhead and any compensation outside the allowance remain separate. Clarify scope before promising a new package.',
    },
  },
  detailing: {
    label: 'Mobile detailing',
    records: ['Agreed vehicle condition, service scope and customer access requirements.', 'Service, setup, driving, waiting and refill time for the complete route.', 'Round-trip distance, vehicle-cost basis, chemicals used and any allocated overhead.', 'Cancellation timing, saved trips/costs, replacement work and actual retained fees.'],
    paths: [
      { title: 'A higher-ticket distant job pays less per occupied hour', steps: [
        ['Compare the complete visit', '/calculators/mobile-detailing-travel-profit-calculator/', 'Include service, setup, travel, total distance and fees on the same owner-earnings boundary.'],
        ['Cost product usage consistently', '/calculators/detailing-chemical-cost-calculator/', 'Use purchase volume, dilution and waste. Do not confuse concentrate with ready-to-use solution.'],
        ['Set a travel condition for the next quote', '/blogs/mobile-detailing-travel-fee/', 'Inspect cost and occupied time before assuming a surcharge will sell. Apply the same trip-cost basis once.'],
      ] },
      { title: 'A cancellation or refill changes the planned route', steps: [
        ['Rebuild the route after the cancellation', '/blogs/mobile-detailing-cancellation-cost/', 'Recalculate trips, avoided costs and equivalent replacement contribution. A rescheduled job is not automatically recovered today.'],
        ['Check water and refill time', '/blogs/mobile-detailing-water-refill-cost/', 'Use measured usable capacity and consumption. A refill matters financially when it adds cost or displaces deliverable work.'],
        ['Recheck the monthly target', '/calculators/mobile-detailing-break-even-calculator/', 'Use representative completed-job contribution and total delivery hours rather than a perfect route repeated every day.'],
      ] },
    ],
    resources: [
      ['Travel-profit comparison', '/calculators/mobile-detailing-travel-profit-calculator/', 'Two-job occupied-hour comparison, with result CSV and print options.'],
      ['Cancellation route review', '/blogs/mobile-detailing-cancellation-cost/', 'Saved costs, retained fees and replacements on a consistent boundary.'],
      ['Water-refill planning guide', '/blogs/mobile-detailing-water-refill-cost/', 'Usable water, trip time and capacity displacement.'],
    ],
    example: {
      title: 'Worked check: the nearby job has the higher hourly return',
      rows: [['Job A ticket / fees / entered costs', '$220 / $6.60 / $54'], ['Job A earnings / occupied hours', '$159.40 / 3.25'], ['Job A earnings per occupied hour', '$49.05'], ['Job B ticket / fees / entered costs', '$180 / $5.40 / $36'], ['Job B earnings / occupied time', '$138.60 / 155 minutes'], ['Job B hourly return / advantage over A', '$53.65 / $4.61 per hour']],
      explanation: 'Job A occupies 195 minutes; Job B occupies 155. The calculation uses full precision before rounding. Lower ticket revenue does not automatically mean lower earnings per occupied hour.',
      action: 'These are the travel tool\'s fictional assumptions, before personal tax and unentered costs. Owner delivery labour is not subtracted as a separate wage in this earnings comparison. The result does not prove which booking will sell or establish monthly profitability.',
    },
  },
  landscaping: {
    label: 'Landscaping',
    records: ['Accepted scope, quoted revenue, change approvals and supplier credits.', 'Estimated and actual worker-hours, loaded rates and machine operating hours.', 'Materials used, travel, disposal, subcontractors and equipment-cost boundaries.', 'Annual commitments, active service months, productive crew capacity and payment dates.'],
    paths: [
      { title: 'The completed job did not match the estimate', steps: [
        ['Preserve the original job comparison', '/blogs/landscaping-job-costing-estimate-vs-actual/', 'Match cost categories and distinguish worker-hours, crew elapsed hours and equipment hours.'],
        ['Separate added scope from an overrun', '/blogs/landscaping-change-order-cost/', 'Include added and genuinely avoided costs alongside extra customer revenue and credits.'],
        ['Review the equipment allowance', '/blogs/landscaping-equipment-cost-per-hour/', 'Use the stated operating/ownership boundary and productive machine hours. Do not count fuel or depreciation twice.'],
      ] },
      { title: 'A profitable route is not funding the quiet months', steps: [
        ['Check one route', '/calculators/lawn-route-profit-calculator/', 'Include service and driving time, the crew cost basis and the stated overhead allocation.'],
        ['Make active months fund annual commitments', '/blogs/landscaping-seasonal-break-even/', 'Keep the full-year target alongside active-month contribution and achievable workload.'],
        ['Check crew capacity and cash dates', '/blogs/landscaping-crew-utilization/', 'Separate available productive worker-hours from machine hours and collection timing. Do not assume every available hour sells.'],
      ] },
    ],
    resources: [
      ['Completed-job reconciliation', '/blogs/landscaping-job-costing-estimate-vs-actual/', 'Comparable estimate/actual records and explanations of cost differences.'],
      ['Route-profit calculator', '/calculators/lawn-route-profit-calculator/', 'Revenue, service/travel time, labour and entered overhead for a route.'],
      ['Seasonal break-even guide', '/blogs/landscaping-seasonal-break-even/', 'Annual funding target, active months and quiet-season cash.'],
    ],
    example: {
      title: 'Worked check: annual commitments exceed seasonal capacity',
      rows: [['Job price / direct cost before percentage fee', '$120 / $60'], ['Payment fee / job contribution', '$3.60 / $56.40'], ['Annual commitments / active service months', '$24,000 / 8'], ['Required annual whole jobs', '426'], ['Even monthly target / capacity', '54 / 50 jobs'], ['Contribution at 400 delivered jobs / annual gap', '$22,560 / −$1,440']],
      explanation: 'Annual break-even is $24,000 ÷ $56.40, rounded upward to 426 jobs. An even $3,000 active-month target needs 54 whole jobs; scheduling 54 in each of eight months would deliver 432, slightly above the annual minimum. Capacity of 50 per active month permits only 400.',
      action: 'The $1,440 gap is under these fictional assumptions. Use your actual service mix and season. Quiet months still need a dated cash plan; annual profitability cannot establish that payroll is funded on its due date.',
    },
  },
};
