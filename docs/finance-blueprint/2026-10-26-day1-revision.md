# Day 1 revision and acceptance

Scope is only C01 EBITDA, C02 Future Value and guides G01–G04. Baseline source: `7f00635` (preserves the separately completed Day 2 browser/print work and all 20 topic covers). No URLs, titles, publication dates, feature assets, calculator defaults or financial formulas changed.

## Findings and changes

- Adjustment-description failures previously appeared against the amount field. Names now have separate validation keys, visible inline messages and `aria-invalid`/`aria-describedby`; duplicate descriptions still fail without changing base earnings.
- Future Value chart now shows the amount scale, horizon in months and a visible start point for a zero-period projection.
- Day 1 print removes navigation, promotional sections and consent overlays; keeps advanced inputs and FAQ answers visible, and allows long schedules to paginate without splitting rows.
- Added consent-respecting calculator views, debounced success/validation events and related-guide clicks. Existing reset/use/download events remain. Event payloads accept only the two allowlisted calculator IDs; financial amounts, free text and URLs cannot enter the tracking function. View waits for existing analytics readiness/consent signals. This verifies implementation, not delivery to the user's GA account.
- G01 adds an independent EBITDA-to-OCF cross-check: 130,000 − 10,000 − 20,000 − 25,000 − 10,000 + 5,000 = 70,000.
- G02 gives exact steps to reproduce the separately signed 137,000 adjusted result, retaining the 130,000 base.
- G03 explains zeroing the calculator's default deposit to reproduce the 11,025 single-amount example, and qualifies zero/negative rates.
- G04 adds explicit 1,200 zero-rate and 199/197.01 negative-monthly-rate checks so the positive-rate annuity-due comparison is not overgeneralized.

Reviewed the six owners' task boundaries, sources, arithmetic, headings/anchors, tool/guide reciprocity and existing incoming links. SEC non-GAAP interpretations sections 100/103 and OpenStax Principles of Finance 8.2 were retrieved on 26 October 2026. Existing source citations remain on the pages. No search-volume, ranking or competitor-superiority claims are added.

## Validation

Local: 1,005 tests in 104 files; production build; 238 rendered routes; no internal-route/link issues; no image or page-delivery-budget failures; 18-priority-owner intent audit passes. New regression cases verify separate adjustment-field errors, the negative-rate timing fixture and measurement consent/payload isolation.

The Day 1 browser acceptance workflow checks all six pages at 390, 768 and 1280 CSS pixels. It checks image loading, canonical/H1, document overflow, page exceptions, changed/invalid/reset cases, signed tax benefit, adjustment validation, keyboard Tab, the 201/203.01 timing fixture, CSV contents and print PDFs. Reports, mobile screenshots and exports are retained as CI artifacts. Browser emulation is not a physical-phone test.

Production acceptance must follow the successful PR checks and existing Hostinger deployment. Recheck the six public HTML routes and the changed live calculator flows. The workflow's build/browser evidence is separate from public production verification; merging alone is not a live claim.

GSC indexing, query/page performance and real GA event delivery remain account-side verification items. The older seven-day backlog is unchanged. No social publishing is authorized by this revision; use `[skip social]` on the release.
