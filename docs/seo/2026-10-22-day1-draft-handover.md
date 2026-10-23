# New plan Day 1 — unpublished release package

User instruction: complete Day 1, keep it saved, publish in the morning only. Do not deploy this branch or merge it into main during draft preparation.

Production base: 39fae09c480ac476d106fb748319e0f193982341. Local base e32491e has the same production tree.

## Scope

- /resources/budget-vs-actual-template/: 5 research keywords. Original monthly/YTD explanation, blank and filled XLSX, checked static operating-result bridge, missing/zero/negative budget interpretation, actual preview and method links. `dashboard budget vs actual` is a partial fit for its compact report, not an automated/category-chart dashboard promise.
- /blogs/rolling-forecast/: 5 research keywords. Original guide, dated driver model, actuals kept separate, fixed forward horizon, refresh workflow, worked example, capacity constraint, quarterly boundary and comparison with annual/flexible budgeting. Direct XLSX and truthful preview.
- /blogs/flexible-budget-variance-analysis/: 26 existing-owner research keywords. Keep the current calculator, quick answer, same-activity bridge and published content. Add one static-report section with a distinctly labelled separate numerical example and reciprocal paths.
- /resources/: contextual discovery links to both new owners.
- Conditional review: 10 accounting/bookkeeping-plan queries. Remain held for a genuinely practice-specific plan. Financial Cents and Zarla pages inspected; a free download and capacity prose alone do not distinguish a new offer. Do not inflate Day 1 to three new pages or promise all CPA intents from an agency template.

The 36 implementation-mapped queries are not 36 newly SERP-confirmed targets. Detailed query decisions, vendor volume/KD and baseline limits are in the companion keyword mapping JSON. No GSC ranking, traffic, CTR or competitor traffic was invented.

## Workbook checks

Artifact Tool authored and recalculated both XLSX files. Independently asserted key arithmetic and input changes, rendered both BvA sheets and rolling output, and inspected saved XLSX XML for formula presence/error caches. No macros, external data connections or private business data.

BvA: January budget 30000 revenue / 20000 expenses / 10000 operating result; actual 28000 / 21000 / 7000; operating variance -3000. March YTD result 28500 versus 30000. Missing April actuals and blank report remain Unreported. Explicit zero remains zero. Zero budget has n.a. percentage; invalid month is labelled.

Rolling: April 90 jobs ×205 price =18450 revenue; 90×85=7650 variable expense; fixed 9000; operating result1800. Next eleven example months each3000, forward result34800 and revenue238450. Changing cutoff retrieves the next dated row; actuals unchanged. Changing May price recalculates. Missing driver or an absent end month makes the relevant output incomplete. The initial dated schedule ends June2027 and requires range extension thereafter, explicitly explained on page and workbook.

Native Microsoft Excel / Google Sheets application behavior remains unverified; neither is advertised as certified. Files use common formulas and include opening/import control figures.

## Draft safety and release

`src/day1PlanningRelease.js` is false. Both new owners have draft labels and noindex; neither is in the draft sitemap. Existing production stays unchanged. Draft review build contains both pages for QA. No automatic morning deployment is configured.

On the user's morning publication instruction:
1. Recheck remote main. Reconcile this package with any newer production changes; preserve old Day 3 and prior improvements.
2. Run `node scripts/promote-day1-planning.mjs YYYY-MM-DD` with the actual release date. This only prepares source, does not publish. Central status removes draft labels/noindex and includes both URLs in the sitemap. It also supplies matching dates.
3. Re-run tests, build, route/link, image and delivery audits. Check both pages' canonical, robots, schema, dates and real download links.
4. Commit with `[skip social]`, then deploy through the existing production workflow only when authorized. Verify the release and live asset responses. No outreach or social posting.
5. Record GSC page/query baseline if available and capture release date. Early delivery review is separate from 28/56-day query assessment.

## QA repairs included

- New registry collection and lazy generated-content mapping.
- Original new forecast cover in full and responsive sizes; previews use measured intrinsic dimensions.
- Inline worksheet preview uses the existing responsive article-visual class; no oversized image forces body scrolling.
- Image audit strips URL query/fragment before checking the corresponding local asset. This avoids falsely marking the existing variance cover's `?v=release` URL missing.

## Completed validation

- Full suite: 739 tests passed across 84 files.
- Draft build: 205 routes, 198 sitemap URLs; both new owners noindex and absent from sitemap. Route/link audit has no issues.
- Publication rehearsal: 205 routes, 200 sitemap URLs; both new owners indexable, no draft banners, matching actual-date control. Reverted to false/draft and rebuilt afterward.
- Image audit: no missing or duplicated covers. Page delivery audit: no image or delivery-budget failures. Priority intent audit: 18 articles, no issues.
- Desktop browser: both new pages render, their worksheet images load, body has no horizontal overflow, worked-example navigation reaches its heading. Native mobile viewport was not exercised.
- Workbook download links resolve to built real XLSX assets and ZIP/XML checks pass. A browser download-event wait timed out; browser-event verification is not claimed.
- GSC baseline and native Excel/Sheets execution remain unavailable in this run. No traffic or ranking improvement is claimed.
