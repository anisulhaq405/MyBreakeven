# Steps 1–6 reverse-engineering verification — 2026-10-30

Scope: compare original SEO sprint objectives with current published `hostinger-deploy` artifacts, prior source analyses and user-provided CI screenshots. No new SEO route, article or calculator modification authorized by this audit.

## Evidence-based verdicts
1. **GSC baseline / planning: PARTIAL (analysis complete, outcome not established).** Oct 30 owner-supplied 28-day comparison reported 22 clicks, 6,129 impressions and ~0.36% CTR; six priority pages selected. Dates, query-mix cautions and targets were documented. The current turn did not fetch refreshed post-change GSC data; therefore ranking/CTR recovery cannot be verified.
2. **Six-page competitor research: PARTIAL (content benchmarks and editorial briefs complete).** Source/competitor comparisons established existing strengths and a restaurant workbook UX gap; not a reproducible USA SERP top-ten rank/backlink/traffic audit. Do not claim competitor domination.
3. **P1 content/formula preservation: PASS for checked artifacts.** Target-profit (70 jobs, $16,800), contribution versus profit (40% contribution, $3,000 operating income), margin of safety ($6k/$18k=33.33%) were checked in published HTML. Relevant sections already exist; no needless rewrite. Content regression safeguards committed.
4. **P2 correction/release: PASS for checked artifacts.** Operating leverage and food-cost sections present. Restaurant budgeting annual resource-picker contradiction corrected in current published HTML; previous phrase absent. Separate 12-month workbook exists in production branch; the owner-supplied green live QA #5 supports scripted HTTP/XLSX checks, but the raw screenshot artifact was not independently inspected here.
5. **Technical SEO/internal links: PARTIAL.** On six published pages, 6/6 have self-canonicals, index/follow meta, viewport, one H1, syntactically parsable JSON-LD and routes in the 233-URL generated sitemap. Checked related guide/calculator links are listed in the sitemap. robots.txt source permits crawling. Remaining: exact 45 discovered-not-indexed URLs, native GSC URL Inspection, Google-selected canonical, verified bot logs/HTTP redirect chain. No basis to assert root-cause recovery or successful indexing.
6. **Regression, schema and mobile QA: PASS for scoped automated checks; not exhaustive.** Owner screenshot shows Build Hostinger #544 green, live restaurant mobile/workbook QA #5 green after Ubuntu 24.04 runner fix. Script tests 375px,390px,1280px and horizontal overflow for **Restaurant Budgeting**, not all six pages and not human visual/performance/cross-browser usability. JSON-LD parses; rich result eligibility not proven. Generated six-page assertions check selected formulas as substrings and do not constitute an exhaustive independent numerical/formula audit of all scenarios.

## Current artifact cross-check (hostinger-deploy)
Six slugs: target-profit-sales-formula, contribution-margin-vs-profit-margin, margin-of-safety-business, operating-leverage-small-business, restaurant-budgeting, restaurant-food-cost-percentage.
All six: self-canonical YES; index/follow YES; viewport YES; one H1 YES; JSON-LD syntax parses YES; published sitemap included YES; checked destination links represented in sitemap YES. Restaurant budgeting obsolete workbook sentence absent.

## Owner acceptance boundaries
- Content preservation, targeted resource UX correction, generated SEO structure and scoped automated regression checks can be accepted.
- **Do not close SEO recovery / indexing** until 45-URL drilldown plus URL Inspection and relevant origin/CDN crawl data are obtained.
- **Do not claim all six articles mobile-visual QA complete:** current dedicated live browser workflow only tests Restaurant Budgeting.
- Preserve 15-day no-new-public-URL freeze and previous calculator locks. No new source changes required solely from current six-page structural audit.
