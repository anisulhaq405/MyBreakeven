# Discovery and conversion sprint — 16 October 2026

Owner scope: finish steps 1–4, then pricing and mobile verification. Base abc329c9634d57b23ddc3dd516d6dc9e9b8b26b2. No new categories or public routes. Financial formulas/defaults, account limits, billing URLs, shared header/footer and existing payment integration remain unchanged.

## Steps 1–4

- Analytics consent now catches denied reads and writes, validates stored choices and honors explicit acceptance/rejection in memory for the current page if persistence is blocked. A reload may ask again. Optional analytics never starts merely because storage is unavailable. Events share the same consent reader.
- The existing calculator directory now lists all 26 calculator routes: 8 industry models and 18 decision tools. Existing decision filters are retained; industry models fit Pricing & profit. Hyphen/space normalization supports break even, break-even and breakeven searches. Counts in pricing derive from the same existing registries.
- Edited, valid result tracking covers all eight industry pages and the full calculator. Sample loads, resets and untouched samples do not count as edited results. Trackers retry after consent and deduplicate accepted events; only industry labels are emitted. Pricing links use pro_pricing_click; pro_pricing_view now means a rendered pricing page with consent. Historical pre-16-October pro_pricing_view events can represent link clicks and must not be compared as identical measurements. A checkout click is not a purchase; no purchase event is fabricated.
- Two existing articles receive answer panels before their cover, section navigation and calculator links. Break-even example retains its product, cleaning and restaurant cases plus fill-in service template, with an example-focused SEO title/description and reduced repetitive opening. Target-profit guide retains its title, 70-job arithmetic, assumptions and scenarios; description and body clarify target operating income and required units versus revenue. Original publication dates/URLs/images remain; substantive modified date is October 16.

## Search evidence and judgment

Private Search Console page/query/country/device reports for September 17–October 14 informed the two selected guides. The global averages mix countries/devices, and visible query rows are a small sample subject to anonymization. They do not prove a snippet defect, current US ranking or an experiment result. Exact account metrics are not included in this public repository.

Public publisher search inspection found worked-example/formula intent; Pearson's target-profit explanation and Penn State's CVP chapter describe units/revenue forms. No exact country-localized Google top-three ranking was established. Existing checked math is preserved.

The private October 8–15 GA4 report was sparse and consent-dependent. Missing signup/save/checkout rows do not prove zero sales or identify a particular funnel failure. Neither source measures an effect of this release yet.

## Step 5

Pricing now starts with Free/Pro outcomes, retains $9.99/month and the existing checkout, exposes all original Pro tools in an expandable section, and provides restaurant/service/product planning uses. Saving limits, consistent units/currency, temporary continuation and the local-browser Monthly Monitor boundary are explicit. Includes walkthrough, saving/comparison instructions and cancellation/refund policy links. No trial, customer outcome or new feature is claimed.

## Step 6 and validation

- 584 unit/component tests pass; production build succeeds; 193-route/188-sitemap local audit reports no issues, with the existing conditional Pro anchors deferred as before.
- Temporary DOM suites pass for blocked-storage rejection, all eight industry sample-vs-edit event gates, one accepted edited-result event and payload privacy, directory restaurant search, pricing consent retry and view deduplication, distinct checkout click, and actual home-calculator edits.
- Responsive CSS reviewed for 320/360/390px layouts. Privacy buttons can stack below 380px; calculator filter targets have a 44px minimum height; pricing outcome cards become one column and CTA text can wrap. These are source/DOM checks, not an emulated-device visual pass.
- Local Chromium could not start because the runtime denied its required socket operation. Cloud browser exposes no viewport control, and its policy rejected the data-URL mobile test harness. No browser-policy workaround was used. Mobile screenshot/device verification remains a stated limitation. Desktop live browser checks and publication status are recorded after release.
- Work was built in an isolated checkout to preserve an unrelated pre-existing local image modification. That image is excluded from this release.

Rollback: revert the release merge and run the normal production build. Compare subsequent consented events and GSC periods without attributing prior history or publication-day movements to these changes. No scheduled task or social post is created.
