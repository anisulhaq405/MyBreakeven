# Full 185-URL technical and on-page review — 11 October 2026

Baseline: production merge d27377dc3d2964bcd5133eee752d0f954792374a. Rollback: revert this review PR; preserve all route URLs and index directives.

All 185 live routes fetched successfully. 180 public sitemap pages and 5 intentionally noindexed account pages. The per-URL CSV records title, metadata lengths, heading count, content size and specific fixes. This is a defined technical/on-page audit, not a Google compliance score or a claim that every financial statement has been independently fact-checked.

## Implemented fixes

- Correct misleading editorial anchors that pointed to the blog hub or wrong articles; remove the mislabeled insurance reference rather than inventing an insurance guide.
- Replace published future/draft wording with links to current resources. Improve scenario headings and the margin/markup H1.
- Convert five collapsed Markdown budget tables across three startup guides into semantic HTML tables; preserve their figures and totals.
- Correct plural agency wording in calculator headings.
- Four foundation article pages retain the industry calculator in the run-your-numbers section without the extra duplicate inline link.
- Measure all 140 article image assets. Correct image attributes and article schema/Open Graph dimensions where files differ from hardcoded dimensions; preserve image files.
- Share the homepage FAQ content between rendering and generated schema.
- Shorten the tools-hub title; descriptive meaning retained.
- Extend build audit to reject missing/duplicate descriptions, absent language/viewport, missing image alt attributes and dimensions.

## Validation and limitations

466 tests passed. Generated route audit: 185 routes, 180 sitemap URLs, no reported issues. Additional on-page checks passed for all routes, including visible FAQ/schema correspondence. All 140 image dimensions checked against files. External references: 54 of 56 fetched successfully; US Foods returned 403 and Google Ads help returned 429, so those two are access-incomplete, not confirmed broken. Three Pro fragment checks require rendered interaction because the section is conditional.

GSC/GA4 remain deferred by the user. No authenticated account, billing or checkout operation was performed. Mobile field Core Web Vitals, Google-selected canonicals, indexing and manual actions are not established by this audit. No new consequential tax/legal/investment claims were published. No content mass-generated, backlinks bought or social posts sent.

Post-deployment verification is recorded after publication. No page deletions, URL moves, canonical/robots changes or navigation restructuring.
