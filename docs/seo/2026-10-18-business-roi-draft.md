# Business ROI & Payback Calculator — unpublished draft

Status: draft only. Do not merge, deploy, dispatch production workflows or submit the proposed URL for indexing until the owner requests release.

Proposed URL: /calculators/business-roi-calculator/
One calculator with business-investment and AI-automation modes; existing eight industry models remain intact.

## Search scope and evidence
Primary intent: business ROI calculator. Supporting topics: payback period, return on investment, AI automation ROI, cash savings versus capacity. Public seodata.dev keyword pages reported US monthly estimates of 27,100 for “ROI calculator” (July 11, 2026 update) and “return on investment calculator” (August 1, 2026 update). These are third-party, overlapping estimates, not additive or a verified current Semrush export. AI-specific volume was not established. No traffic, ranking or indexing guarantee is implied.

## Model
Pre-tax, undiscounted incremental cash model over 1–60 whole months. Month zero is setup. Fixed running cost starts in month one; benefits, usage and extra paid labor begin after the entered delay.

ROI = (total modeled cash benefits − total modeled cash costs) / total modeled cash costs × 100. Costs include setup and every running payment in the selected horizon. This is not setup-only return, annualized return, accounting ROI, NPV or IRR.

Simple fractional payback = delay + (setup + fixed monthly cost × delay) / active monthly net benefit, only when that benefit is positive. This assumes uniform active cash flows; the cash table separately reports month-end recovery. Payback beyond the horizon is labeled. Zero total cost gives an undefined ROI percentage.

AI hours = adopted tasks × (manual minutes − AI plus human minutes) / 60. Paid-hours conversion applies to these net hours. Remaining capacity excludes paid hours. Only entered sell-through and contribution monetize positive remaining capacity; negative time changes produce extra paid labor and consumed capacity. This prevents counting the same saved hour twice. Fixed salary without a change in paid hours is not cash saving.

Workload comparisons scale contribution volume or adopted tasks and per-task usage costs. Fixed running cost and independently entered avoidable cash savings stay unchanged. Scenarios are assumptions, not forecasts.

## Reconciled examples
- Business: 6,000 setup; 200 monthly cost; 1,200 monthly contribution; 12 months → benefits 14,400; costs 8,400; net 6,000; ROI 71.43%; payback 6 months.
- AI: 600 setup; 100 monthly cost; 80 tasks × 30 saved minutes → 40 hours. Convert 25% to paid-hour reductions at 20/hour → 200 monthly cash benefit. Remaining 30 hours have no assumed cash value. Costs 1,800; benefits 2,400; net 600; ROI 33.33%; payback 6 months.
- Same AI with a two-month delay → benefits 2,000; costs 1,800; net 200; ROI 11.11%; payback 10 months.
- Same AI with unchanged salary and no extra work sold → no modeled cash benefit; net −1,800; ROI −100%; no finite payback.

## Content and delivery
Unique title/description, canonical, crawlable rendered guide, visible FAQs with matching generated FAQPage, WebPage/WebApplication/Breadcrumb structured data, sources, realistic limitations and links to existing employee-cost, agency, cash forecast and ROAS tools. No invented ratings. Responsive WebP feature image (1200/800px), explicit dimensions and alt text. Dedicated route limits unrelated code loading. Directory and sitemap regenerate on build; no extra industry or duplicate URL is introduced.

Inputs stay in browser memory and reset on reload. Separate mode inputs survive switching in the same tab. CSV is an explicit values snapshot, includes assumptions and a month-by-month schedule, and does not recalculate. Currency changes labels, not exchange rates.

## Validation and release
Run npm test, npm run build, scripts/audit-built-site.py and scripts/audit-page-delivery.mjs before review. Engine coverage includes delay, zero cost, no payback, slower AI, usage cost scaling, unchanged salary, capacity partition, validation and monthly reconciliation. Route rendering and existing site regression tests are included.

At release, review this draft, rerun checks on the then-current main, merge only after explicit owner instruction and verify production canonical/schema/calculation behavior. No production action was authorized by this draft request.
