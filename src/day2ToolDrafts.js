const sections = {
  "employee-cost-calculator": {
    "id": "direct-labor-budget",
    "title": "Direct labor budget: required hours are not a full annual hire cost",
    "paragraphs": [
      "A direct labor cost budget starts with required activity times standard paid delivery hours times the relevant labor rate. For 200 fictional equivalent jobs, 1.5 paid delivery hours per job and a loaded rate of $32, the same-period labor budget is 300 hours and $9,600. A wage-only $24 rate would instead show $7,200 before the additional employer burden; do not call those two scopes the same cost.",
      "This employee calculator answers a different but connected question: full annual employment cost and productive-hour recovery. Reconcile the period, paid-versus-productive hours and cost inclusions before taking its hourly result into a job budget. Do not also charge the same guaranteed salary as extra per-job labor."
    ]
  },
  "cash-flow-forecast-template": {
    "id": "cash-budget-definition",
    "title": "Cash budget and cash receipts budget: bridge sales to bank dates",
    "paragraphs": [
      "A business cash budget is a dated schedule: opening available cash plus cash receipts minus cash payments equals closing cash. A cash receipts budget schedules expected collections by channel and payment date; it is not simply this month's recognized sales. Carry unpaid opening invoices, expected refunds and relevant deposits consistently.",
      "In a separate fictional week, opening cash $5,000 plus $3,000 collections less $4,000 payments closes at $4,000. If $1,000 of those collections slips to the next week, this week closes at $3,000; the later receipt must not be counted twice. An operating-profit budget and a cash budget need a bridge for settlement timing, inventory payments, noncash expenses and financing. This is business liquidity planning, not personal cash-envelope budgeting."
    ]
  }
};
export function applyDay2ToolDraft(slug,tool){ return sections[slug] ? {...tool,reviewed:"2026-10-20",sections:[...tool.sections,sections[slug]]} : tool; }
