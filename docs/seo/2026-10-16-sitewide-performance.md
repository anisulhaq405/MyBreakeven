# Sitewide page-delivery optimization — October 16, 2026

The owner requested optimization of every page after the three-page mobile follow-up. Coverage is all 193 generated index routes, including 188 sitemap entries and private/fallback routes. This release changes delivery, not the content strategy or public URL inventory.

## Confirmed bottlenecks and implementation

Previously every secondary route preloaded one combined Pages module containing unrelated guide, calculator, hub and static-page code and CSS. Split browser entries into article, article hub, directory, industry calculator, four decision-tool families, eight existing industry hubs, authority, general static, Pro guide and account routes. The server renders the same route component tree used by hydration, including generated form IDs. Preload the actual route's assets and its article/tool data, keeping visible server content and styles available before startup.

Extract the unchanged static-page copy and directory rendering. Generate lightweight directory cards and pricing counts from existing source registries. The home page's list of tool links no longer imports every tool's full guide/defaults. Decision tools load only their own generated data. Article navigation uses its existing navigation rules without importing complete hub layouts/workflows; media guards and source order are preserved.

The all-page image scan identified ten eager guide images over 250KB, several at 2560px width. Add separate 1200x675 and 800x450 WebP delivery copies with responsive selection. Original art remains available; article text, author attribution, review/publication dates and URLs are unchanged. Total source bytes were 3,127,354; 1200px copies total 1,111,100 (64.5% smaller), and 800px copies total 602,596 (80.7% smaller). These are asset-file savings, not whole-page timing claims.

## Per-page delivery coverage

The baseline was rebuilt from local commit e8b4ff4 (the same tree as deployed main 0ddd509) with the same installed runtime/dependencies. The before/after comparison uses gzip level 9 in the same Node runtime. The versioned baseline is `2026-10-16-page-delivery-before.json`; the complete 193-row result is `2026-10-16-page-delivery.md`.

All 193 routes have less declared initial JavaScript; 192 secondary routes have less declared CSS, while home CSS is unchanged. Illustrative declared-JS reductions: home 23.0%, directory 71.4%, pricing 69.0%, cleaning calculator 55.8%, menu pricing 60.8%, restaurant hub 58.1%, restaurant budgeting guide 45.9%. These are gzip estimates of scripts/modulepreloads in built HTML, not network totals, PageSpeed scores or measured time reductions. New article/tool data preloads are included after the split; deferred resources and optional analytics remain outside that initial declaration total.

## Regression and release acceptance

- 599 tests pass. Coverage includes matching rendered public article/calculator/supporting-page content across the old dispatcher and new route entries, directory/count synchronization, real generated per-tool data loading, and the dimensions/size/rendered selection of all ten optimized guide assets.
- Production build and 193-route/188-sitemap audit pass; the existing three conditional Pro-analysis fragments remain deferred. The 162-cover audit reports no missing/duplicate covers. The all-page scan reports no missing image dimensions, missing local image files or remaining eager fallbacks over its 250KB triage threshold.
- Add a CI delivery budget for every baseline URL: keep declared JS at least 10% below the previous combined-route build and avoid CSS growth over 3%. This is a payload regression check, not a Core Web Vitals certification.
- Require PR CI, deployment, a complete live route audit, scoped live asset/content checks, browser interaction across route families and fresh representative mobile PageSpeed runs before declaring release complete.

Shared header/footer markup, formulas, defaults, cost transfers, currency-label behavior, plan limits, account authorization and Polar checkout destinations are preserved. No external message, social post, account creation, paid checkout or private scenario mutation is needed for this release. Existing consent gating remains. Full mobile authenticated save/reopen was confirmed by the owner before this performance-only change; a private-session smoke test remains distinct from public/static audit coverage.

## Measurement boundary

Every generated URL receives delivery/image coverage. Not every URL receives a separate Lighthouse lab run; representative mobile runs cover page families and targeted heavy-image content. No field Core Web Vitals pass, guaranteed ranking, 100 score or universal speed improvement is claimed from a smaller build. Remaining diagnostics should be evaluated from fresh reports instead of assuming payload savings equal a specific LCP reduction.

## First live mobile observations after the route release

Official PageSpeed runs at approximately 12:50–12:54 PM Pakistan time, emulated Moto G Power / Slow 4G / Lighthouse 13.5.0. All have No Data for field experience. Each is one lab observation, not a controlled multi-run causal comparison.

| Representative page | Performance | LCP | Accessibility |
| --- | ---: | ---: | ---: |
| Home | 98 | 2.1s | 100 |
| Directory | 96 | 2.0s | 100 |
| Cleaning industry calculator | 95 | 2.3s | 100 |
| Menu pricing | 98 | 2.0s | 100 |
| Detailing pricing guide | 96 | 2.5s | 100 |
| Guide library | 96 | 2.2s | 96 |
| Pricing | 99 | 1.8s | 100 |
| Restaurant hub | 98 | 2.1s | 100 |
| Calculation methodology | 96 | 2.1s | 100 |
| Pro guide | 99 | 1.7s | 96 |
| ROAS calculator | 94 | 2.6s | 100 |
| Discount calculator | 94 | 2.4s | 100 |
| Employee cost | 98 | 2.0s | 100 |

All thirteen report TBT 0ms and Best Practices/SEO 100. CLS ranges 0–0.039. Directory and cleaning earlier same-day readings were 88/2.9s and 88/3.0s respectively. Fresh readings are better, but no field or universal timing claim follows.

The two 96 accessibility readings identify specific low-contrast text: featured-library dates and Pro-guide figure notes. Follow-up: darken those body-text colors without changing shared chrome; also let blog cards use already registered responsive image candidates. Require affected-page remeasurement after deployment. No new image generation or content rewrite is needed.

Live browser checks after the main release: directory empty search/reset works; menu-price edits and currency-label changes update results; currency labels match the generated input IDs. Thirteen route-family HTTP/content checks find the expected dedicated entries and no old combined Pages preload. The complete route crawl is tracked separately from these scoped checks.
