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

## Food workflow engine 1.0.0 — independent module, 2026-10-13

`src/foodCostEngine.js` is separate from the locked industry engine and existing decision-tool engines. It uses a cloned Decimal context at 40-digit precision. Existing formulas, defaults and rounding are unchanged.

- Recipe: compatible usable ingredient quantity / (pack quantity × yield rate) × pack cost; total ingredients divided by whole selling units. Batch labor and other costs divide once; packaging is already per unit. No mass/volume density assumption.
- Period usage: opening + purchases − supplier credits − closing. Food ratio divides by positive food sales; optional theoretical variance uses the same sales base. Stock usage is not proof that every outflow was a normal paid sale.
- Menu: ingredient-target price and full variable contribution-target price are distinct. Percentage fees reduce retained price. Required units ceil; monthly capacity floor(weekly × 52/12). Capacity funding floor uses the whole-unit capacity and rounds price upward to cents.
- Contributions and funding targets are not accounting net profit. Owner labor already in variable cost must not be repeated in owner pay. The whole-cake transfer uses additional profit beyond entered labor, not a repeated wage.
- `foodCostEngine.test.js` and `foodCostTransfer.test.js` cover conversion, yield, boundaries, rounding, negative results, capacity and guarded one-time transfer. Example defaults and guide calculations are hypothetical, not market benchmarks.

## Margin/markup guide widget 1.0.0 — 2026-10-13

Independent `src/marginMarkupEngine.js`, cloned Decimal context at 40-digit precision; existing engines are unchanged. The widget belongs to `/blogs/margin-vs-markup/#margin-calculator`.

- Collected price = list price × (1 − discount rate). Difference = collected price − defined cost.
- Margin = difference / collected price; markup = difference / defined cost. Zero denominators remain undefined, and negative results stay visible.
- Target margin price = cost / (1 − target margin); target markup price = cost × (1 + target markup). These are separate percentage bases.
- Target selling-price floor rounds upward to cents. Discount-adjusted list-price floor = rounded target price / (1 − discount), again rounded upward. At 100% off, no finite list price can preserve a positive selling-price floor.
- Percentage fees, monthly overhead and demand are outside the widget. Cost basis must be stated; difference is not automatically accounting gross or net profit. Currency selection relabels without conversion.
- Tests cover known denominators, targets, two-stage ceiling, discounts, losses, undefined percentages and invalid/overflow/underflow inputs.

## Employee cost and dated cash forecast — 13 October 2026

Independent `planningToolsEngine.js` uses Decimal precision 40. No changes to core break-even, auth or billing engines.

Employee: recurring annual cost sums salary, bonus, employer-only contribution amounts, benefits and overhead. First-year cost adds one-time hiring. Available hours = paid hours − paid leave; productive hours = available × productive percentage. Zero productive hours and zero salary leave their respective denominators undefined. Recovery = first-year cost / (collected productive-hour revenue − other variable-hour cost), with no finite recovery when contribution is nonpositive. Displayed recovery hours round upward to hundredths. Leave affects hours; salary already covering leave is not increased again. Country rates are not hardcoded.

Cash: thirteen seven-day UTC calendar periods, inclusive start through start+90 days. Opening + operating/financing receipts − operating/financing payments = closing; next opening = prior closing. Minimum includes initial opening and weekly closings. Reserve shortfall = max(0, reserve − minimum). Delay 0–90 whole days and realization 0–100% affect only operating receipts. Events outside horizon are counted/excluded; financing is not sales. Weekly summaries can miss intraweek overdrafts. Maximum 100 dated events. Inputs and outputs reject nonfinite or unsupported >1e12 results.

CSV is a formula-free current-scenario snapshot with quoted, spreadsheet-safe text cells. XLSX is a separate base template using editable dated events, bounded SUMIFS, roll-forward formulas and row validation; it does not copy browser inputs or implement browser scenarios. Both sheets were rendered and formulas recalculated; delayed receipt, final-day cutoff, incomplete row and baseline checks passed in Artifact Tool. Native Excel/Google Sheets application behavior has not been tested.
