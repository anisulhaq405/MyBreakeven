# Net cash flow review — November 14, 2026

Target: https://mybreakeven.com/calculators/net-cash-flow-calculator/

Scope: retain the existing URL, title, example totals, image and actual-period intent. Improve the existing direct cash model and presentation; keep the indirect preparation method and dated 13-week forecast separate. No social publication ([skip social]). Existing blog records and all other calculator metadata are frozen in baseline.json. Historical salon/food preservation tests exempt only this newly authorized target; this release adds a dedicated full-registry guard.

## Research

Three relevant competitor search results examined, not a claim of fixed Google top-three positions:
- ReportPilot, https://www.reportpilot.tax/tools/net-cash-flow-calculator — trading, equipment and financing totals, optional opening cash. Our reconciliation keeps FX separate from the three activity subtotal, rather than assuming activity net cash always equals the balance change.
- Finlyzers, https://finlyzers.com/calculators/cash-flow-calculator — detailed direct/indirect workflows and free cash flow. We retain a bounded direct summary and do not label investing totals or financing-excluded movement as free cash flow.
- Rillion, https://www.rillion.com/finance-tools/cash-flow-calculator/ — itemized operating, investing and financing flows and visual breakdown. We retain six explicit gross activity totals, with supporting classification guidance, observed closing check and reserve comparison.

Primary sources verified:
- SEC beginner guide: https://www.sec.gov/reportspubs/investor-publications/investorpubsbegfinstmtguidehtm.html
- IFRS IAS7 overview: https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows.html/
- SEC taxonomy presentation reminder: https://www.sec.gov/newsroom/whats-new/2403-dqr-cash-flow-statement-data-element-presentation
- IFRS18 effective date: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/

The overview and effective-date sources support keeping classification policy explicit, cash versus income, non-cash exclusion and FX separation. IFRS18 applies to annual periods beginning on/after January1,2027, with early application permitted. This model makes no statutory-compliance claim or automatic classification decision. Subscription-only standard text was not relied on. No industry benchmarks or guaranteed funding outcomes are inserted.

## Calculation and display

Each activity net = positive receipts minus positive payments. Activity movement = operating+investing+financing = gross external receipts minus gross external payments. Total cash change = movement+signedFX. Closing = opening+change. Observed less calculated = observedClosing−closing; blank skips the check while zero is a stated balance. Decimal equality decides whether a difference matches, not displayed rounded cents.

New comparisons: beforeFinancing=operating+investing; closingWithoutFinancing=opening+beforeFinancing+FX. This removes both financing receipts and payments while holding other flows fixed; not free cash flow or an alternative plan. Reserve headroom=calculatedClosing−chosenReserve; reserve is not a payment or restricted-cash adjustment. A period-end comparison cannot establish intraperiod solvency.

Default: operating2000, investing−3000, financing3500, receipts24000, payments21500, movement2500, FX0, opening5000, closing7500, financing-excluded closing4000; 30 inclusive calendar days. Optional observed/reserve are unknown. Loan-growth preset: operating−3000, investing−3000, financing9500, movement3500, closing8500, financing-excluded closing−1000. FX preset: FX+100 → cash change2600, closing7600; observed7400 → difference−200; chosen reserve8000 → headroom−400.

Nonnegative cash inputs ≤1e12, signedFX ≤absolute1e12. Nonnegative opening and observed cash preserved as a deliberate simplified scope; no automated overdraft/restricted cash presentation. Dates valid and ordered1900–9999; inclusive days do not annualize or filter records. Decimal precision40; small nonzero values show scientific notation instead of zero. Currency selection changes labels only. CSV retains raw decimal calculation strings and every input/date/currency/assumption. CSV is values-only and does not recalculate. Browser-local React state; no account persistence or bank integration.

## Validation

Engine/component tests cover baseline conservation, loan support, signed financing, FX, optional unknown versus zero, reserve warning, exact subcent mismatch and CSV, dates/leap days, malformed values, bounds and registry preservation. Release check validates initial built HTML, unique IDs/local anchors, canonical, date,10 amount inputs,two dates,12 visible/schema-matched FAQs and no horizontal tables. Existing full suite, production build, prior release checks and whole-site audits run before publication.
