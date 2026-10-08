# Calculator and conversion sprint — October 8, 2026

Base: f2a132dc67c558d5ca2a73dd9be4e513fe99a2eb (PR 72). Rollback: revert this sprint's merge commit and let the standard production build publish the previous source. No new articles or calculator routes.

## Confirmed issues and fixes

| Issue | Reproducer / acceptance |
| --- | --- |
| Edited industry values disappear when opening the full calculator | Continue now carries validated inputs in same-tab session storage, consumed once, with a five-minute expiry. All eight industry round trips are tested. Blocked storage keeps the user on the edited page with an explanation; expired/mismatched handoffs explicitly show example fallback. No financial inputs in URLs. |
| Missing record fields crash the formula engine | Every missing required field, null and empty records now return validation; oversized amounts and unsafe whole-unit outputs are rejected. Engine 1.3.1 preserves existing exact formulas. |
| Fractional capacity can produce a false feasible badge or zero extra workers | A 10.1-sale requirement with capacity 10.9 needs 11 whole sales and fits only 10. Badge, Insights, staffing solver and executive brief now agree that the plan does not fit. |
| Rounded sales and lead targets describe different volumes | Cleaning baseline requires 114 whole jobs and 380 estimated inquiries at 30% conversion. Exact fractional volume and its 377.70 inquiries remain separately available. |
| Pro cards call an owner-pay threshold accounting break-even | Display, help, CSV and print report now say Costs + owner-pay revenue. Planned profit explicitly follows owner pay and precedes personal tax. Internal field identifiers stay compatible. |
| Invalid forecast controls can display misleading projections | Blank, negative/fractional sales and growth outside -25% to 50% show validation with editable controls. Invalid projections cannot be exported or saved. |
| Lazy Pro fragments and sticky header obscure navigation | Initial and same-page hash navigation wait for lazy sections; headings have scroll margin. A direct next-step link exposes planning tools. Malformed fragments do not break page initialization. |
| Mobile menu has no Escape dismissal | Escape closes navigation and returns focus; crossing to desktop closes the mobile menu. Touch controls retain minimum heights; narrow-screen financial values wrap and inputs use 16px text. |
| Conversion actions lack explicit event measurement | calculator_continue, pro_pricing_view, pro_checkout_click and scenario_saved are emitted only after analytics acceptance, with at most the industry label. No inputs, names, account IDs or record IDs. |

## Evidence and limits

422 tests pass across 41 files. Production build and 160-route/155-sitemap built audit pass. Eight baseline models independently satisfy whole-sales funding and inquiry-rate checks. Paid Pro UI is exercised by component tests without altering entitlements. Public calculator, continuation and Pro-entry flows receive post-release browser verification.

Mobile rules were reviewed for 320–620px layouts; this browser does not expose viewport emulation, so this is not a claim of physical-phone or device-emulated visual acceptance. PageSpeed API returned 429 quota exceeded on October 8. A subsequent PageSpeed web report completed at 10:12 PKT: mobile Performance 95, Accessibility 96, Best Practices 100, SEO 100; LCP 2.1s, FCP 1.9s, TBT 0ms, CLS 0. Desktop Performance 100, Accessibility 96, Best Practices 100, SEO 100. CrUX displays No Data; no real-user Core Web Vitals pass is claimed. Report: https://pagespeed.web.dev/analysis/https-mybreakeven-com/200k0qh3db?form_factor=mobile Authenticated saved-plan lifecycle, actual payment and billing webhook execution require separate live verification; payment URLs and entitlement rules are unchanged. GSC results require recrawl and comparable reporting windows.

Monitoring: October 22 / November 5 / December 3, compare consented CTA event counts and qualified signups/purchases alongside organic landing impressions and clicks. CTA events are intent signals, not purchases. No recurring task is created by this document. Preserve October 7 GSC baseline and avoid attributing prior ranking losses to these later releases.

Live checkout inspection: Pricing opens Polar for MyBreakeven Pro at US$9.99/month. The existing external product description says unlimited saves while the actual Pro entitlement is 100. After secure merchant sign-in, the product description was updated to comparison of 3 plans and up to 100 saved scenarios. The saved description and fresh public checkout were both verified, with the existing US$9.99 monthly price. The mismatch is resolved. No purchase or payment details were entered.

## PageSpeed follow-up

The report identified low-contrast labels in Insights, the reading list and methodology cards, a skipped heading level on the operating-model input panel, an incompatible dialog role on an aside and ambiguous Pricing links. A focused follow-up darkens these labels while preserving the palette, uses h2 for the input panel with existing visual sizing, uses a div for the consent dialog and labels the blog topic Pricing guides. Tests/build/built route audit remain green. Rollback for this follow-up: revert its merge commit to PR 73 source. A new live PageSpeed report is required before claiming that these audits pass.
