# October 7 Search Console recovery

Owner: MyBreakeven. Baseline captured October 7, 2026; indexing data last updated October 4. These changes address observable content and discovery gaps. They do not establish the cause of the ranking decline or guarantee indexing.

## Evidence and actions

| Evidence | Action | Validation |
| --- | --- | --- |
| 88 indexed, 28 excluded: 22 discovered, 2 crawled, 2 alternate canonical, 1 login noindex, 1 redirect error | Inspect all 22 discovered examples; add contextual paths to business guides with few article links | Valid destination slugs, crawlable generated HTML, sitemap membership |
| Salon and cleaning client-count guides crawled September 22 but not indexed | Correct salon weekly calculation; compare chair capacity; distinguish cleaning pre-tax profit from take-home income; preserve original publication dates | Recomputed examples, visible comparison tables, matching server/client content |
| Restaurant opening guide impressions 285 to 50; average position 39.8 to 44.4 (September 20–26 vs September 27–October 3) | Align title with restaurant startup costs; link from restaurant break-even guide | Title length, indexable self-canonical HTML; later equal-period comparison |
| Labor-cost guide gained 127 impressions, zero clicks, position 36.9 in September 27–October 3 | Put labor cost percentage in title and add a relevant inbound link | Title length, preserve recent worked shift examples |
| Restaurant prime-cost slashless URL reported redirect error; current single-hop redirect reaches 200 | Preserve redirect configuration; Google inspection/validation remains a separate action | Check actual redirect response; do not declare GSC cleared before recrawl |

## Discovered examples

Business guides: break-even-formula-units-dollars, calculate-break-even-point, cash-flow-break-even-vs-profit-break-even, corporate-headshot-pricing, ecommerce-profit-margin, fixed-vs-variable-costs, fleet-detailing-contract-pricing, how-many-detailing-jobs-week, how-many-photography-clients-month, landscaping-crew-utilization, landscaping-equipment-cost-per-hour, landscaping-maintenance-contract-pricing, landscaping-seasonal-break-even, margin-vs-markup, move-out-cleaning-job-cost, photography-business-break-even, photography-pricing-packages, post-construction-cleaning-estimate, product-photography-pricing-per-image, restaurant-sales-forecast.

Contact-us and terms-of-service are the other two discovered examples. They are lower priority than the useful business guides. Existing article links already reach many of the discovered guides; this release adds missing contextual paths rather than claiming all were orphaned.

## Arithmetic

- Cleaning: 17 × $300 × 70% − $500 = $3,070 pre-tax profit; 27 clients give $5,170. Continuous revenue requirement is $5,500 / 0.70 = $7,857.142857 monthly, or $94,285.71 yearly. At 4.75 delivery hours per account, 27 accounts need 128.25 hours monthly and 29.596 hours weekly using 52/12 weeks.
- Salon: $86,400 / $88 / 52 = 18.881 completed clients weekly, or 3.776 per five-day operating day. Five 70-minute appointments fit in 390 available minutes. Seven need 490 minutes plus 90 minutes of other duties, totaling 580 minutes. At five clients over 260 operating days, a $132,000 target needs $101.538 contribution per client.

## Release and rollback

Base commit: `27b4530544e065d18da63fba5cfd7e7067a681a7`. Isolated branch: `seo/oct07-gsc-recovery`. Revert the recovery merge commit and redeploy to restore the baseline. Feature images and social deduplication state are preserved. Existing social automation can process changed guides under its normal rules.

Check the full test suite, production build, generated canonical/robots/schema/links, and live release content before marking deployment complete. Search Console validation and indexing results must be reported independently from site deployment.

## Measurement

Compare equal 14- and 28-day periods after data becomes available, with page/query/device/country filters held constant. Record impressions, clicks, CTR, position, and index status for the four priority pages. Review at 2, 4 and 8 weeks; no scheduled automation is created by this document. October 7 edits cannot explain a decline measured before October 4.
