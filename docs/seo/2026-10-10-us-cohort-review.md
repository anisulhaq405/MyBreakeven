# US cohort content review — 10 October 2026

The September 9–October 6 US/Web baseline selected seven pages with at least eight US impressions and average position below 20. This is a small-sample review cohort, not proof of defective snippets. Fresh page-filtered queries and Google URL Inspection are blocked in this session: Google accounts returned 502 Bad Gateway / connection refused twice. No indexing request was submitted and no Google-selected canonical or new crawl date is claimed.

| Page | US impressions | Position | Current review outcome |
|---|---:|---:|---|
| margin-of-safety-business | 39 | 18.85 | Formula, sales denominator, revenue-versus-profit distinction and worked cushion are already present. Retain October 7 revision and title pending query evidence. |
| landscaping calculator | 29 | 11.93 | Interactive inputs, explicit assumptions, whole-job rounding, worker-hour capacity, methodology and guide paths already exist. No engine or template change warranted by this review. |
| contribution-margin-vs-profit-margin | 21 | 16.57 | Direct answer and bridge from contribution through overhead to operating/net measures are present. Retain current title and cost boundaries. |
| cleaning-business-monthly-expenses | 20 | 15.35 | Add an editorial path to the now-available cleaning job-cost worksheet; explain how its job contribution relates to payroll and monthly overhead. |
| target-profit-sales-formula | 14 | 19.14 | Target units/revenue, owner-pay treatment, rounding and capacity scenarios already present. Retain October 7 revision. |
| landscaping-break-even | 11 | 14.91 | Formula and worker-hour capacity example already support the user task. Sample arithmetic recomputed. Retain current title and URL. |
| break-even-analysis-example | 10 | 14.2 | Replace overbroad “every cost” with included-cost scope; label scenario amounts as illustrative; remove unmatched paragraph close; shorten repetitive scenario heading; link the cleaning scenario to the job-cost worksheet with a clear scope distinction. |

All seven have zero US clicks in this baseline. No query-to-page mappings were inferred from separate exports, and no CTR uplift is predicted. Existing URLs, original publication dates, titles, calculator links and FAQ content are preserved. Only the two substantively edited guides receive an October 10 modified date. Generated listing/home metadata is refreshed from the same registry.

## Verification

- Scoped assertions verify the two changes, worksheet links and original publication dates.
- Full tests: 464 pass across 44 files with file parallelism disabled. Initial parallel run encountered a generated-JSON EOF in the loading test; all generated JSON parsed successfully and the sequential rerun passed. No unrelated test-runner change included.
- Production build passes; generated audit covers 184 routes / 179 sitemap URLs with zero reported issues. Three conditional #pro-analysis anchors remain explicitly deferred.
- Representative arithmetic recomputed: safety cushion 40 / 120 = 33.33%; operating margin (20,000 − 12,000 − 5,000) / 20,000 = 15%; cleaning requirement 4,320 / 108 = 40; target profit 10,500 / 150 = 70; landscaping required 103 whole jobs versus 94 capacity with $892.32 shortfall; break-even example 12,000 / 24 = 500 and template 7,200 / 120 = 60. This is not an exhaustive external accounting review.

## Release and follow-up

Small isolated branch based on eab881c. Changes are prepared for review, not deployed. Revert the cohort commit and rebuild to roll back. After publishing, verify the two live articles, worksheet destination, canonical/robots and sitemap lastmod. Revisit Google Inspection and page-filtered query reports when sign-in is available, then compare identical US/Web filters over a full post-release period. Do not repeatedly submit URLs or reset dates merely to force crawling.
