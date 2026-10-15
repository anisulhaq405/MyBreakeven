# Ecommerce product planning enrichment — 15 October 2026

## User-facing changes

- Replace the ecommerce hero's prominent large-store example revenue with a product-oriented entry point.
- Preview four illustrative USD product scenarios: handmade jewellery, small-batch ceramics, clothing/accessories and art prints. Previewing does not change inputs; the explicit Load action replaces all 14 financial/capacity assumptions and clears prior cost-builder detail. Reset restores the unchanged general ecommerce defaults.
- Explain landed product costs, batch/firing allocations, owner compensation, shipping, flat fees, return allowances, acquisition allocation and making/packing time beside ecommerce inputs.
- Explain the current engine result with an order-cost breakdown, exact and whole-order targets, monthly funding requirement, productive-hour capacity and the existing engine's ±10% price cases. Invalid input removes the detailed result. The ceramic example intentionally fails capacity.
- Preserve the existing same-tab full-calculator transfer; a pricing click does not save a plan. Keep calculation free; explain free-account scenario saving separately from Pro's $9.99/month saved-plan comparisons and reports.
- Add matching handmade/order-cost/saving FAQs to both rendered HTML and generated structured data through the shared FAQ source.

## Measurement

Existing consent-gated GA events are retained. Add `calculator_example_load`, `calculator_result_ready` and `pro_pricing_click`. Result-ready is recorded at most once per mounted calculator after a valid user edit pauses for 700ms; initial rendering, previewing and sample loading do not count as an edited result. Consent must already be accepted and `gtag` available. Financial values, names and product choices are never analytics parameters. Existing `calculator_continue`, pricing-view and checkout events remain distinct. GA reporting/real-time receipt must be checked in the site's analytics account; code tests do not establish receipt.

## Boundaries

No changes to `src/engine.js`, `src/industries.js`, financial formulas, default values, checkout URLs, billing, account entitlements, header or footer. All examples are explicit assumptions, not researched market prices, benchmarks or forecasts. Capacity is productive worker-hours, not inventory, kiln space or carrier capacity. Pro pricing/features match existing pricing-page code.

## Validation

- Full Vitest suite, including example contribution/capacity, rendered content, invalid results, transfer and consent/payload tests.
- Production build and rendered-site route/internal-link audit.
- Local DOM interaction check: server hydration, preview versus load, live input edits, invalid-input recovery, reset, capacity warning, same-tab transfer and event deduplication/privacy.
- Full visual browser validation is limited by the environment's unavailable Chromium download; responsive rules are present but no desktop/mobile screenshot QA is claimed.
