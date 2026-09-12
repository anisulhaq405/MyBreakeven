# MyBreakeven Formula Registry

**Engine:** 1.2.0
**Canonical period:** calendar month
**Arithmetic:** decimal.js, 40-digit intermediate precision
**Status:** engineering-verified; qualified accountant review remains required

## Shared single-unit model

All eight current calculators use the same deterministic single-unit engine with different business labels and default assumptions.

| Output | Formula | Rounding |
|---|---|---|
| Fee rate | paymentFeePct / 100 | None |
| Payment fee per unit | price × feeRate | None |
| Contribution per unit | price − payment fee − materials − labor − other variable cost − acquisition cost | None |
| Fixed need | fixed costs + owner pay + target profit | None |
| Exact units required | fixed need / contribution | None |
| Minimum whole units | ceil(exact units) | Ceiling at operational boundary only |
| Exact break-even revenue | exact units × price | None |
| Practical whole-unit revenue | minimum whole units × price | Uses already-ceiled units |
| Productive monthly hours | workers × weekly hours × 52 / 12 × utilization / 100 | None |
| Exact capacity | productive monthly hours / hours per unit | None |
| Whole-unit capacity | floor(exact capacity) | Floor at operational boundary only |
| Exact inquiries | exact units / (conversionPct / 100) | None |
| Minimum whole inquiries | ceil(exact inquiries) | Ceiling at operational boundary only |
| Exact capacity gap | exact capacity − exact units | None |
| Contribution margin | contribution / price × 100 | None |

Values are converted to JavaScript numbers only when returned to the current React UI. Formatting to two decimals is presentation-only.

## Current vertical mappings

| Model | Unit | Other variable cost represents | Acquisition cost represents |
|---|---|---|---|
| Cleaning | Job | Travel and equipment use | Lead generation per booked job |
| Landscaping | Job | Fuel and equipment use | Lead generation per booked job |
| Photography | Session | Editing, gallery and travel | Marketing per booked session |
| Agency | Client | Client software and contractor cost | Sales cost per new client |
| Mobile detailing | Job | Travel, water and equipment | Lead generation per booked job |
| E-commerce | Order | Shipping subsidy and returns allowance | Paid acquisition per order |
| Restaurant | Order | Packaging and delivery commission | Promotion per order |
| Salon | Appointment | Laundry and disposables | Marketing per appointment |

## Validation contract

- Blank, non-numeric or non-finite required inputs return an input error.
- Negative required inputs are rejected.
- Price, workers, hours per unit and conversion must be greater than zero.
- Fee, utilization and conversion percentages cannot exceed 100%.
- Zero or negative contribution returns no finite break-even.
- otherVariableCost and acquisitionCost are currently optional and default to zero when absent.
- Inputs are monthly unless their label explicitly says per week or per unit.

## Scenario contract

The current downside/base/upside comparison changes price by -10%, 0% and +10%. Direct costs and fixed need remain constant. Each scenario recalculates contribution and exact/whole units. A scenario with non-positive contribution returns no finite unit target.

## Known model limitations

- Each vertical currently uses one blended unit; service/product mix weighting is not yet implemented.
- Returns, cancellations, no-shows, commissions and seasonality are represented only through blended per-unit assumptions.
- Currency selection relabels values and does not perform foreign-exchange conversion.
- The feasibility score is a product heuristic, not a financial formula or probability of success.
- The engineering regression fixtures preserve deterministic behavior but have not yet received CPA/accountant approval.
