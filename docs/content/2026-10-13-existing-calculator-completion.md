# Existing calculator page completion — 13 October 2026

Baseline: 839f4ec (PR112). Scope: 21 existing calculator routes (13 focused tools and eight industry pages). No new routes or calculator engines.

## Page-level changes

| Existing page | Specific completion |
|---|---|
| [discount-break-even-calculator](https://mybreakeven.com/calculators/discount-break-even-calculator/) | Measure the promotion before applying it to every sale; input-record table, specific decision checklist and one additional FAQ. |
| [price-increase-calculator](https://mybreakeven.com/calculators/price-increase-calculator/) | Track the customers actually receiving the increase; input-record table, specific decision checklist and one additional FAQ. |
| [break-even-roas-calculator](https://mybreakeven.com/calculators/break-even-roas-calculator/) | Reconcile advertising with a matched order cohort; input-record table, specific decision checklist and one additional FAQ. |
| [hourly-rate-calculator](https://mybreakeven.com/calculators/hourly-rate-calculator/) | Build the rate from hours you can actually invoice; input-record table, specific decision checklist and one additional FAQ. |
| [cash-runway-calculator](https://mybreakeven.com/calculators/cash-runway-calculator/) | Reconcile runway with dated bank payments; input-record table, specific decision checklist and one additional FAQ. |
| [cleaning-contract-profit-calculator](https://mybreakeven.com/calculators/cleaning-contract-profit-calculator/) | Audit the agreed contract before accepting the quote; input-record table, specific decision checklist and one additional FAQ. |
| [lawn-route-profit-calculator](https://mybreakeven.com/calculators/lawn-route-profit-calculator/) | Compare route time before adding a distant stop; input-record table, specific decision checklist and one additional FAQ. |
| [detailing-chemical-cost-calculator](https://mybreakeven.com/calculators/detailing-chemical-cost-calculator/) | Measure product usage without changing the label instructions; input-record table, specific decision checklist and one additional FAQ. |
| [hair-color-product-cost-calculator](https://mybreakeven.com/calculators/hair-color-product-cost-calculator/) | Keep prepared product and discarded cost on one basis; input-record table, specific decision checklist and one additional FAQ. |
| [ecommerce-return-cost-calculator](https://mybreakeven.com/calculators/ecommerce-return-cost-calculator/) | Build the allowance from reconciled returned orders; input-record table, specific decision checklist and one additional FAQ. |
| [salon-rebooking-calculator](https://mybreakeven.com/calculators/salon-rebooking-calculator/) | Follow the rebooked cohort through completed visits; input-record table, specific decision checklist and one additional FAQ. |
| [salon-no-show-profit-loss-calculator](https://mybreakeven.com/calculators/salon-no-show-profit-loss-calculator/) | Reconcile missed slots, replacement work and retained fees; input-record table, specific decision checklist and one additional FAQ. |
| [mobile-detailing-travel-profit-calculator](https://mybreakeven.com/calculators/mobile-detailing-travel-profit-calculator/) | Compare complete occupied time, not the service ticket alone; input-record table, specific decision checklist and one additional FAQ. |
| [cleaning-business-break-even-calculator](https://mybreakeven.com/calculators/cleaning-business-break-even-calculator/) | For a two-person team working two hours, enter four total worker-hours per job. If the work is one customer contract with several visits, model one completed visit consistently and price the contract in the linked tool. |
| [landscaping-break-even-calculator](https://mybreakeven.com/calculators/landscaping-break-even-calculator/) | Use measured crew-hours for the complete visit, including necessary setup and travel. A per-acre public price still needs the cost and delivery time of a complete job; small properties may require a minimum visit charge. |
| [photography-business-break-even-calculator](https://mybreakeven.com/calculators/photography-business-break-even-calculator/) | Use total worker-hours for preparation, shooting, editing and delivery. If owner labor is represented in monthly owner pay, do not also enter the same compensation per session; paid assistants remain a separate delivery cost. |
| [agency-break-even-calculator](https://mybreakeven.com/calculators/agency-break-even-calculator/) | A new-client acquisition cost entered against every monthly retainer would overstate recurring cost if it occurs only once. Use a clearly allocated recurring-unit allowance or a separate new-client acquisition scenario; the calculator does not model acquisition timing automatically. |
| [mobile-detailing-break-even-calculator](https://mybreakeven.com/calculators/mobile-detailing-break-even-calculator/) | For an owner-operated mobile visit, time includes loading, setup, service, cleanup and the allocated journey. Compare the whole-day schedule as well as per-job contribution; a financially attractive distant job can consume the remaining delivery hours. |
| [ecommerce-break-even-calculator](https://mybreakeven.com/calculators/ecommerce-break-even-calculator/) | Fulfillment capacity here is based on entered productive hours, not stock availability, carrier cutoff or warehouse-space limits. A viable hours result does not prove enough inventory or advertising demand exists. Reconcile monthly operating profit with interest, taxes and cash timing separately. |
| [restaurant-break-even-calculator](https://mybreakeven.com/calculators/restaurant-break-even-calculator/) | Use one comparable order unit and an explicit channel mix. A delivery commission charged on some orders needs a representative blended fee or separate channel scenarios; it is not a fee on every dine-in check. Capacity based on worker-hours does not automatically check seats or kitchen bottlenecks. |
| [salon-break-even-calculator](https://mybreakeven.com/calculators/salon-break-even-calculator/) | For color services, preparation, processing work and cleanup can require different amounts of occupied stylist time. Enter the worker-hours actually required, then check any separate chair or station bottleneck. Retail contribution does not create extra chair appointments. |

## Shared improvements

- Industry forms: descriptive help linked to all 14 inputs; page navigation for calculator, input records, formula and FAQs. Calculator remains ahead of detailed record guidance.
- Eight industry pages: three additional visible FAQ answers, matching FAQ structured data from the same function, review date, publisher and image metadata. Structured data does not promise a Google rich result.
- Thirteen focused tools: real input-record checklists; specific next-step explanations replace generic operational-tool advice. Additional hypothetical scenarios are checked against existing deterministic engines.
- Corrected discount FAQ: contribution, operating profit and net profit are different boundaries.
- Review date and sitemap lastmod aligned to the substantive 13 October update for all 21 pages. Tables use scoped headers and scroll within the page on narrow screens.
- Original calculator slugs, titles, descriptions, default inputs, numeric field definitions and images preserved. All financial-engine files, industry values, entitlements, auth and billing remain unchanged.

## Verification

- Existing suite: 468 tests across 46 files passed. Production build passed.
- Built-site audit: 185 routes / 180 sitemap URLs, zero issues; existing conditional Pro fragments remain deferred.
- Targeted audit: 21 calculator pages; every FAQ question and answer in schema also occurs in visible content; record and decision sections present; all eight industry forms expose 14 linked input descriptions; review/schema/sitemap dates aligned.
- Additional scenarios checked against existing engines: cleaning extra-hour quote, lawn travel-time increase, chemical waste, smaller color bowl, higher return rate, rebooking capacity, refilled missed appointments and ROAS target.
- Protected financial engines and original tool defaults/fields/metadata checked unchanged.

## Free references reviewed

- [SBA break-even method](https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point): base fixed-cost/contribution method. The site explicitly distinguishes owner-pay/profit targets and productive-hour capacity additions.
- [BDC cash-flow planning](https://www.bdc.ca/en/articles-tools/money-finance/manage-finances/making-projection-coming-year): rolling forecast and payment timing boundaries.
- [Shopify profit reporting](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/profit-reports): cost coverage and report boundaries.

Worked examples are illustrative input scenarios, not market rates or forecasts. No traffic/ranking gain or exhaustive competitor superiority is claimed. Release commit and merge use [skip social]. Deployment/live results are recorded after release.
