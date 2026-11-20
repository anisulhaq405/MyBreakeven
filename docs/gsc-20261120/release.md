# Existing-page search visibility improvements

Review date: November 20, 2026. Production baseline: `32affa9d9eaff64b57881d05f6e4c417254e763e`.

## Scope and intent ownership

The uploaded Search Console export identifies existing owners with search visibility but limited click-through. Its performance series ends November 18 and indexing series November 16. These reports cannot measure the effect of this release or the November 20 calculator additions. Query and page exports are separate dimensions; they do not establish cannibalization or a query-to-page join.

| Existing owner | Change | Intent retained |
|---|---|---|
| target-profit-sales-formula | Direct 70-job target, reconciled sales/profit, delivery and cash handoffs | Required sales for a stated operating target |
| lower-break-even-point | Direct threshold comparison and documented one-change decision | Lower the threshold, rather than merely sell more |
| contribution-margin-vs-profit-margin | Cost-boundary comparison table and reconciled margin answer | Contribution, operating and net margins |
| retail-break-even-analysis | Receipt definition and 353/354 boundary check | Retail basket/receipt break-even |
| break-even-analysis-example | Reproducible 500-unit answer rather than a generic opening | A complete worked zero-profit example |
| margin-of-safety-business | Direct units/sales/percentage answer and risk handoffs | Sales cushion, not profit or cash |
| fixed-vs-variable-costs | Total versus variable/average cost answer | Cost behavior in a relevant operating range |
| operating-leverage-small-business | DOL formula and checked volume sensitivity upfront | Sensitivity at the stated starting volume |
| restaurant-budgeting | Monthly/annual/cash schedule choice and original early download | Operating budget, with separate cash schedule |
| how-to-calculate-working-capital | Net/operating/days/total operating capital comparison | Balance-sheet liquidity and defined alternatives |
| how-to-calculate-cost-of-goods-sold | Opening/additions/closing answer and inventory/revenue handoffs | Periodic reseller inventory reconciliation |
| break-even-roas-calculator | Static comparison of break-even, target and remainder | Defined order contribution and ad economics |
| landscaping-break-even-calculator | Job target, separate owner coverage, worker-hours and seasonal case | Landscaping break-even and deliverable capacity |

The first eight owners are the priority guide cohort; the remaining five are the deeper relevance cohort. No new page, alias or competing keyword owner was created. Existing publication dates, feature images, original worked tables, FAQ objects, downloads and calculation engines are preserved. Only genuinely revised guide metadata carries the new modified date; calculator decision guides have a scoped review date without altering their underlying records.

## Quality and arithmetic

Fictional cases retain their cost boundaries and period. Whole sales targets round upward. Retail contribution is $19.80 per receipt; 353 receipts leave a $10.60 deficit against $7,000 and 354 leave $9.20. The target-profit case gives 70 × $240 sales less 70 × $90 variable costs less $7,500 commitments = $3,000 operating profit. Margin of safety uses sales as the percentage denominator, not break-even sales. DOL uses contribution / operating profit at the defined volume; division by zero is not a valid sensitivity forecast.

ROAS teaching uses $80 order revenue, $44 direct costs and 3% fee: $33.60 contribution, 42%, 2.380952…× break-even, 3.125× for the stated 10% post-ad target and $680 remainder at $4,000 revenue/$1,000 ad spend. The displayed 2.38× is rounded and is not treated as an exact pass boundary.

The separate landscaping teaching case uses $500 price, $300 fully specified variable cost, $4,000 monthly operating commitments, $3,000 separately excluded owner allocation and $1,000 extra goal: 20 operating jobs versus 40 full-goal jobs. Six worker-hours per job and 180 available hours permit 30 jobs. Recovering all twelve months over eight earning months with no off-season contribution requires 60 jobs/active month. These figures do not replace the live calculator defaults.

Primary methodological references checked during this review:

- [OpenStax contribution margin](https://openstax.org/books/principles-managerial-accounting/pages/3-1-explain-contribution-margin-and-calculate-contribution-margin-per-unit-contribution-margin-ratio-and-total-contribution-margin)
- [OpenStax margin of safety and operating leverage](https://openstax.org/books/principles-managerial-accounting/pages/3-5-calculate-and-interpret-a-companys-margin-of-safety-and-operating-leverage)
- [IRS Publication 334](https://www.irs.gov/publications/p334), inventory/COGS context only. This release does not implement a tax inventory policy or filing calculation.
- [Google title links](https://developers.google.com/search/docs/appearance/title-link), [snippets](https://developers.google.com/search/docs/appearance/snippet), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) and [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Indexing and measurement

`indexing-readiness.json` records public HTTP, canonical, robots and sitemap observations. Those checks do not show Google's current indexed state, Google-selected canonical, Googlebot logs or an accepted indexing request. A Search Console visit showed the public sign-in entry rather than an authenticated property. Account-side URL Inspection and recrawl requests therefore require an authorized signed-in connection. No request is represented as submitted.

The original canonical parameter variants and intentional noindex pages must not be changed simply to reduce the excluded count. The reported old Restaurant Prime Cost redirect is verified against current HTTP behavior before any routing decision. No bulk robots, canonical or redirect rewrite is justified by the previous export alone.

Measure each exact canonical owner after recrawl using comparable 14- and 28-day windows, with US and device segments. Keep page-level and property-level aggregation separate. Compare clicks, impressions, weighted position and CTR; do not sum query-table rows into a false property total. Record actual query/page combinations before alleging overlap. Results are not guaranteed, and this release does not invent keyword search volume or conversion data.

## Validation contracts

The new release independently guards 231 unchanged articles, all 33 tool records, all existing target publication dates/covers/FAQ objects/table workings/download links, one H1, local anchors, real link destinations, metadata, current sitemap/search presence and original ownership. Historical release tests use the pre-review registry so they continue to enforce their exact original date and content boundary. The earlier industry rendering hash removes only the two explicitly identified new static decision-guide sections; other markup remains protected.

The existing full pull-request and Hostinger production checks remain required. No social announcement, outreach, new indexing API or external tracking service is included.

Local verification: all 1,475 tests except one historical date contract passed in the full run. That contract was corrected to the pre-review registry and its seven tests plus six current-release tests passed on retest. All 326 rendered routes and 320 sitemap entries passed the internal-link audit; all 326 delivery budgets passed with no image issues. Every workflow QA script passed after updating the historical date boundaries. Browser review covered all eleven guide titles/answers, both new decision guides, original covers and the early restaurant download. At a 340 CSS-pixel viewport, the ROAS, landscaping, contribution comparison, working-capital and restaurant pages had no horizontal page overflow. Public readiness checks covered 52 requests with zero errors: 50 HTML pages returned 200, and robots/sitemap were accessible. The Restaurant Prime Cost variant made one 301 redirect to the canonical slash URL. Final PR and production checks run again on the exact published commit.
