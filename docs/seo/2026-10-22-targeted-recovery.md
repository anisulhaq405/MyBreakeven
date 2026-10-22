# October 22 — existing startup-cost pages and restaurant budget

Scope: four existing startup guides plus the existing restaurant monthly budget. No new routes, release flags, calculator-engine changes or social publishing. The separate new-plan Day 1 branch remains unpublished.

## Diagnosis and evidence boundary

All five URLs returned HTTP 200, their own canonical, one H1 and index/follow metadata during the October 22 pre-change check. No X-Robots-Tag block was returned. The earlier same-day robots and sitemap checks allowed crawling and included these pages. This establishes delivery eligibility only, not Google's actual index state.

The connected Search Console export exposes performance and sitemap data, not URL Inspection. Its supported action list is empty. The browser is on the Search Console public start page without an authenticated property session. Last crawl, index verdict and Google-selected canonical therefore remain unverified. No indexing request was submitted. Do not label a zero-impression row as deindexed.

The private baseline report retains exact property, page and visible query/country metrics, source dates and missing-row caveats. Do not commit the private exports to this public repository. Comparison periods are September 22–October 5 and October 6–19; the last finalized performance date is October 19. October 21–22 releases cannot explain that earlier period's change.

## Current competitor comparison — checked October 22

Search-engine retrieval supplies current examples of competing content, not a reproducible geolocated Google USA top-ten ranking or competitor traffic audit. No ranking, volume, KD, backlink or competitor click figure is inferred from result order.

| Existing owner / observed query family | Inspected source | Decision implemented |
|---|---|---|
| Restaurant startup / average and small restaurant costs | Square US restaurant startup guide, March 11 2026 | Put attributed broad cost context before the image; separate it from our fictional model; add premises-specific quote checklist and budget/cash links. |
| Ecommerce startup / online-store launch cost | Shopify online-store guide and official pricing | Compare new stock-holding store versus incremental online extension; label incomparable subtotals; distinguish subscription price, annual commitment and complete launch funding. |
| Mobile detailing startup cost | Fresh Layer operator guide; Detail King starter-kit collection | Separate provider kit quotes from a complete business budget; correct paid-in-full van plus unexplained monthly financing; distinguish cash funding targets from accounting profit. |
| Photography business startup cost | Xero US photography startup guide | Retain existing comparisons; add controlled already-owned-gear case and preserve its separately chosen cushion and replacement boundary. |
| Restaurant budget template / monthly expenses | Smartsheet restaurant budget template collection | Preserve current Excel file and early download; add records-to-expenses checklist and practical variance decisions, without promising extra workbook features. |

Sources:
- https://squareup.com/us/en/the-bottom-line/starting-your-business/restaurant-start-up-costs
- https://www.shopify.com/blog/start-online-store
- https://www.shopify.com/pricing
- https://www.fresh-layer.com/blog/how-to-start-a-mobile-detailing-business
- https://www.detailking.com/collections/start-up-kits
- https://www.xero.com/us/guides/how-to-start-photography-business/
- https://www.smartsheet.com/content/restaurant-budget-templates
- https://www.sba.gov/counseling/plan-your-business/

## Calculation corrections

Main detailing case: $18,000 van paid outright. Recurring included amounts are $250+$140+$300+$260=$950, with no unexplained $550 vehicle payment. Adding $3,500 owner pay and $1,000 desired surplus gives $5,450 funding goal. $240−$36=$204 contribution; ceiling($5,450/$204)=27 jobs; revenue $6,480, variable cost $972, contribution $5,508, $58 above goal. Explicit cash-model boundary excludes depreciation, taxes and omitted costs. Financed alternatives label principal as a cash commitment and show down payment at launch rather than calling debt principal an operating expense.

Photography controlled alternative: already-owned camera, two lenses and computer total $5,100 within the original $6,550 setup. Remaining listed purchases $1,450; plus the existing $1,790 chosen cash cushion = $3,240. This is a separate alternative, not a new market estimate or replacement for the existing cases.

Restaurant workbook bridge remains unchanged: −$3,000 sales −$700 COGS −$900 committed expenses = −$4,600 operating-result variance. This bridge alone does not identify waste, price, efficiency or volume as the cause.

## Measurement protocol

Record deployment commit and actual live verification time in the private recovery report. Keep this release separate from Day 1, earlier October 17 changes and October 21–22 Day 2/3 releases. Capture observed Google crawl time if available; deployment time is not crawl time.

- Delivery: check all five live URLs, metadata, content, anchors, sitemap and workbook response after deployment.
- Index diagnosis: inspect each of the four losing URLs in native GSC. Record verdict, last crawl, user/Google canonicals, crawl/index permissions and referring sitemap. Apply a correction only when that evidence identifies a defect.
- Early review after enough finalized data: report the same page/country/query cohort, impressions and clicks, together with newly observed queries. Label sparse/missing query rows; never convert missing rows to known zero demand or an index verdict.
- Primary assessment: complete 28-day post-release window against the 28 days immediately before release, same filters and weekday balance. Recheck at 56 days when samples are too small. Wait for finalized dates; do not compare partial periods as complete ones.
- Search visibility and ranking: monitor USA separately from global. Keep fixed query/page comparisons alongside aggregate position so query-mix changes cannot masquerade as a universal ranking change.
- No traffic target or recovery guarantee is asserted. Avoid repeatedly rewriting all pages before collecting interpretable evidence.

## Validation

Use the existing complete test suite, production build, rendered route/internal-anchor audit, delivery-budget audit and priority-intent audit. Targeted tests independently reconcile the two changed numeric cases and validate rendered answer ordering, unique IDs and anchor targets. A first full run hit the existing five-second route-delivery timeout; a run with a 15-second test timeout passed all 739 tests. The final default-timeout run also passed all 739 tests in 84 files. The production build and route/anchor, delivery and priority-intent audit results are recorded in the private report.
