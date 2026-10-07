# October 8 technical work completed early on October 7

Scope: existing routes only. No new guides or calculators. Baseline source commit `19cb6182b41419f6fee54c1b96fd5c58809ab3ec`; isolated branch `seo/oct07-technical-sprint`. Inventory combines the current content registry, generated route crawl, live HTTP checks and the earlier Search Console findings. GSC data is a lagged subset, not a complete live route inventory.

## Inventory and confirmed healthy signals

- 160 generated HTML routes: 155 public sitemap URLs and five private/account routes; 126 published guides.
- All 160 live canonical routes returned HTTP 200 with expected canonical URLs in the pre-release crawl. No accidental public noindex was found. Private/account exclusions are intentional.
- No missing generated local assets, broken internal page destinations, duplicate sitemap URLs or public orphan routes were found. Full HTML graph checks are recorded in the CSV/JSON inventories.
- HTTP and www requests resolve to the HTTPS apex homepage; a nonexistent test route returns an actual 404. The previously reported slashless restaurant-prime-cost URL has a single redirect to its trailing-slash 200 destination.
- robots.txt permits public crawling and declares the sitemap. Published structured-data blocks parse as JSON. The build audit does not claim external Rich Results Test validation.
- Existing source dimensions and lazy loading were reviewed on the blog listing and articles. Public pages use local fonts; hashed assets have an immutable-cache rule in the deployment configuration. No cache configuration rewrite was justified by this audit.

## Fixes

| Confirmed issue | Change | Evidence |
| --- | --- | --- |
| Historical blog update maps shipped in the shared page loader | Resolve the registry before build and generate one lazy content module per guide; preserve metadata, cache and concurrent-load handling | Loader falls from 568,376 raw / 146,399 gzip bytes to approximately 149,220 raw / 31,430 gzip bytes; all guide payloads match registry tests |
| Ready article/home HTML was hidden until JavaScript completed; blog hub used a different fallback layout | Render homepage, hub and articles using their real components; keep HTML visible and hydrate matching markup | Full page content, navigation and calculator default inputs exist in initial HTML; built route audit passes |
| Fragment destinations for calculator/methodology existed only after JavaScript | Full homepage render supplies those anchors; conditional Pro link eagerly loads the section and reapplies its fragment when available | Static fragment audit has only two documented Pro references that require the interactive component |
| Sitemap omitted known article modification dates | Emit each article's existing modified date; omit dates where a reliable modification date is unavailable | No mass timestamp bump; originals and canonical destinations preserved |
| CI checked calculator links but not the full route graph | Add standard-library audit to PR and production workflows | Blocks inconsistent canonicals/robots/sitemap, missing H1/title/schema, broken local links/assets and public orphan routes before publishing |

The supporting-page static JavaScript dependency set falls from 1,049,350 to about 630,700 raw bytes; gzip estimate falls from 290,796 to about 176,000 bytes (approximately 39% reduction). A requested article now adds its own small content chunk instead of a complete publication group and update archive. These are build-payload measurements, not measured page-load time or a PageSpeed score. Homepage static JavaScript is essentially unchanged; its improvement is complete visible initial HTML.

## Validation and limits

- Full 394-test suite, production build and all 160 generated route checks must pass for release.
- Complete live baseline is in `2026-10-07-live-baseline.json` / `.csv`; generated after-crawl is in `2026-10-07-built-after.json` / `.csv`.
- Google PageSpeed API returned HTTP 429. Its web report also hit browser credential-protection restrictions. No fabricated lab score or Core Web Vitals pass is reported. Field data was unavailable in the earlier GSC review.
- GSC still reports 22 discovered and two crawled but unindexed URLs in its October 4 snapshot. Earlier content/discovery corrections were deployed separately in PR 70. URL Inspection/request-indexing remains unsubmitted because of browser protection; deployment is not proof of Google indexing.
- No server/CDN access logs were available through the current integration. Live HTTP response checks cannot establish Googlebot's historic crawl behavior.
- Unused CSS candidates were reviewed; this release avoids broad stylesheet removal without a representative mobile rendering check. Further product/mobile UX checks remain in the later sprint scope.

## Rollback and follow-up

Revert this technical merge and redeploy to restore the source baseline. Generated content is reproducible from the registry and is not tracked as a second content source. Canonical rules, robots rules, private noindex, payment/account permissions, original publication dates and social deduplication state are preserved.

After deployment, verify current HTML/assets on representative homepage, hub, article, calculator, pricing and account routes; inspect browser errors and calculator interactions when the browser allows it. Compare a post-release live inventory to this baseline. Review indexing and query/page metrics in equal 14- and 28-day periods when new GSC data is available; no background monitoring automation is implied by this report.
