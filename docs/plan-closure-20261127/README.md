# Plan reconciliation and mobile corrections — 27 November 2026

## Outcome and evidence boundary

The named November program is reconciled: **81 distinct published new guide owners + 45 existing candidate dispositions**. The existing candidates comprise **35 improved owners and 10 reviewed/retained owners**, not45 rewrites. Protected or already-complete work is not labeled as missing simply because no rewrite occurred. These are implementation/disposition counts, not proof that every original research checkpoint, independent review or Google outcome is complete.

Base: deployed main `f506493bbac8dadbd648f8312b9ecbfa9a6c37b7`. The126-image-plan JSON supplies IDs/titles only; its queued/generated image statuses are not execution evidence. Current source integration, release records, built output and normal live HTTP checks establish the dispositions below.

**No new URL, guide, calculator or publication-date refresh is introduced by this reconciliation.** Two narrowly scoped presentation fixes are included: darker calculator unit labels and a non-sticky block layout for the mortgage content header. Formulas, defaults, content, existing covers and downloads are retained.

## Closed implementation scope

| Program | Reconciled state |
|---|---|
| N001–N081 | All81 owners exist, are live-ready and have exactly one primary topic. N039 is a bounded educational OCI reconciliation; its earlier independent specialist-review gate is not claimed cleared. |
| E001–E045 |35 improved,10 reviewed/retained; exact owner and source evidence below. This is the final disposition classification, not a claim that the original protected/eligible labels never changed. |
| Combined three-day new work |18 of the81 guides,4 tools (CD,APY,prorated rent,DTI) and1 income-statement resource. Do not add these18 again to the81. |
| Mortgage conditional owner | Separately published `/calculators/mortgage-calculator/`; default math, zero-rate and final-balance coverage remain in the existing release tests. Mobile header corrected in this follow-up. |
| Six older named core gaps | Five intents were consolidated into working-capital, operating-cash-flow and sales-forecast owners on November26. The sixth was **valuation**, explicitly named in `docs/seo/2026-10-25-day5-cash-flow-guides.md`, already delivered by N064 `/blogs/small-business-valuation/`. All six now have named owners. |
| Existing-page SEO batches1–4 | Release/source records exist through PR283. Their account-side indexing/field-performance verification is separate from implementation. |

E003 and E004 were a documentation ambiguity: the obsolete draft preview generator still describes proposals, but `Day1PlanningReview` is mounted by `BusinessPlanTemplatePage` and `CleaningCluster`. The normal live pages both contain the approved additions. Historical draft records are retained; this report supplies their current disposition.

## Verification performed

- **135 unique public URLs** checked:81 new guides,45 existing owners and supporting tools/resources/navigation. Every expected URL returned200, has oneH1, a self-canonical, no detected noindex directive and a live sitemap entry. Scoped additions were checked in live HTML where applicable. See `live-readiness.json`. These conditions do not prove Google indexed a URL.
- The calculator directory is `/tools/`. An initial guessed `/calculators/` directory returned403; it is not a published expected route and is not counted as a site defect or passing page.
- Exact N-ID mappings and primary topics: `new-ledger.json`. The cluster gate passes for all81 new guides with at least3 authored incoming paths each;243 total guides,15 general topics and8 industry hubs.
- Production build:328 routes,322 sitemap URLs. Full built route/link audit:zero issues after generating the existing annual restaurant workbook CI prerequisite. Three pre-existing conditional Pro anchors remain separately deferred. The transient missing workbook in the fresh checkout was not a live broken-download diagnosis.
- Whole-site search:337 public documents, all sitemap owners covered. Delivery audit:zero image issues and zero payload-budget failures.
- Word and Excel landscaping downloads return200 with real ZIP file signatures; OCI manual record returns200. See `resource-downloads.json`. No native Excel recalculation claim follows from this check.
- Local production-browser checks at390px mobile/touch and1280px desktop:12 priority pages ×2 widths =24 passing layouts. Checks include actual layout viewport, no document overflow, loaded visible images, oneH1, no page exceptions, cookie dismissal and FAQ disclosure where present. Mortgage child content must remain inside its header bounds. See `mobile-browser.json`. These are emulated viewports, not physical-device testing or live hosting performance.
- Local Lighthouse mobile simulations cover home,mortgage and landscaping template. SEO/accessibility scores and method limits are in `mobile-lab-summary.json`. Local Python hosting serves uncompressed assets without production caching, so lab timing/transfer findings are not used to claim a production speed gain or change Hostinger settings.

## Actual defects corrected

1. Shared currency/unit hints used `#718296` on `#f7faff`; the observed `hrs` contrast was3.76:1. The scoped `.control b,.control i` color becomes `#526579`. Home Lighthouse accessibility changes from97 to100 in the same local audit method. This is a tested readability correction, not a search-ranking claim.
2. The mortgage `<header class="hh-hero">` inherited the global site header's sticky positioning, flex row and fixed height. On390px mobile this compressed/overlapped title and paragraphs, expanded the layout viewport to450px and interfered with cookie/FAQ clicks. `.household-page .hh-hero` now explicitly uses block flow, static positioning and automatic height, retaining the existing padding/border/background. The final mobile viewport is390px, hero content fits and cookie rejection/FAQ interaction pass.

## Still open: evidence/access, not invented pages

| Item | Exact limit and next requirement |
|---|---|
| Google indexing | No authenticated Search Console URL Inspection capability is available in this session. Fresh inspection/index-coverage evidence is required. Windsor.ai was discovered as installable but not connected; its advertised performance metrics are not a substitute for URL Inspection. |
| Field Core Web Vitals | Both fresh PageSpeed API mobile requests returned429 quota exceeded. The executor's direct Chromium live request also failed certificate validation; no security bypass was applied. Local-build lab checks are recorded separately and do not establish CrUX LCP/INP/CLS or a field pass. |
| Seven historical conditional topics | The full named source list remains unavailable after exact-title searches and repository-history review. Known mortgage work is complete, but it is not valid to declare all seven complete or infer the names/count of remaining pages. Recover the original list before implementing any extra owner. |
| OCI independent accounting review | Not obtained. The bounded educational guide is live; do not relabel it as professionally certified recognition,tax or filing advice. |
| Fresh keyword/traffic outcomes | No new Semrush volume/KD, controlled USA top-three capture or comparative post-release GSC export is supplied by this audit. No clicks,impressions,indexing or ranking gain is asserted. |

## Existing45: exact final dispositions

| ID | Existing owner | Disposition | Release/source evidence |
|---|---|---|---|
| E001 | [Financial Ratios: Formulas, Types & Examples](https://mybreakeven.com/guides/financial-ratios/) | improved — November18 expanded reference; 36 definitions plus 19 worked formulas. | `src/FivePageReview.jsx` |
| E002 | [Business Plan Template: Word Outline & Executive Summary](https://mybreakeven.com/resources/business-plan-template/) | reviewed-retained — Protected general business-plan owner retained; draft supplement deliberately not mounted. Read-only review closed; no rewrite claimed. | `scripts/build-day1-review.mjs` |
| E003 | [Landscaping Business Plan Template: Free Word & Excel](https://mybreakeven.com/resources/landscaping-business-plan-template/) | improved — Approved planning evidence section is mounted by BusinessPlanTemplatePage. | `src/Day1PlanningReview.jsx` |
| E004 | [Cleaning Business Planning Guides](https://mybreakeven.com/guides/cleaning-business/) | improved — Approved quote-to-cash section is mounted by CleaningCluster. | `src/Day1PlanningReview.jsx` |
| E005 | [How to Analyze Financial Statements](https://mybreakeven.com/blogs/how-to-analyze-financial-statements/) | improved — November18 scoped report-preparation path. | `src/CombinedDay2Review.jsx` |
| E006 | [Cash Flow Statement: Format & Worked Example](https://mybreakeven.com/blogs/cash-flow-statement/) | improved — November4 close-cutoff supplement and November18 profit-to-cash widget. | `src/CombinedDay2Review.jsx` |
| E007 | [Operating Cash Flow: Formula & Example](https://mybreakeven.com/blogs/operating-cash-flow/) | improved — November5 cash-vs-capital path; November26 cash-ratio/free-cash-flow section. | `src/content/blogs/pendingCloseReview.js` |
| E008 | [Cash Flow Problems: Causes & Recovery Plan](https://mybreakeven.com/blogs/cash-flow-problems/) | reviewed-retained — Reviewed and retained: existing dated recovery schedules already answer the task. | `docs/seo/2026-11-05-day2-publication.md` |
| E009 | [Operating Expenses: Examples, Formula & COGS](https://mybreakeven.com/blogs/operating-expenses/) | improved — November5 payroll COGS/OPEX classification case. | `src/content/blogs/twelveDayDay2Release.js` |
| E010 | [Rolling Forecast: Example & Excel Template](https://mybreakeven.com/blogs/rolling-forecast/) | improved — November5 sales-demand evidence path. | `src/content/blogs/twelveDayDay2Release.js` |
| E011 | [Cost Drivers: Examples & Calculator](https://mybreakeven.com/blogs/cost-drivers-small-business/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay3Review.js` |
| E012 | [Job Order Costing: Formula & Cost Sheet](https://mybreakeven.com/blogs/job-order-costing/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay3Review.js` |
| E013 | [Flexible Budget & Variance Calculator](https://mybreakeven.com/blogs/flexible-budget-variance-analysis/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay3Review.js` |
| E014 | [Contribution Margin Income Statement](https://mybreakeven.com/blogs/contribution-margin-income-statement/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay3Review.js` |
| E015 | [How to Calculate Cost of Goods Sold (COGS)](https://mybreakeven.com/blogs/how-to-calculate-cost-of-goods-sold/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay4Review.js` |
| E016 | [How to Calculate Working Capital: Formula](https://mybreakeven.com/blogs/how-to-calculate-working-capital/) | improved — Originally protected; November26 targeted authorized management/turnover addition. | `src/content/blogs/pendingCloseReview.js` |
| E017 | [How to Calculate Days Sales Outstanding (DSO)](https://mybreakeven.com/blogs/how-to-calculate-days-sales-outstanding/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay4Review.js` |
| E018 | [Target Profit Formula: Sales and Units](https://mybreakeven.com/blogs/target-profit-sales-formula/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay4Review.js` |
| E019 | [Operating Leverage Formula and Example](https://mybreakeven.com/blogs/operating-leverage-small-business/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay4Review.js` |
| E020 | [Break-Even ROAS Formula for Ecommerce](https://mybreakeven.com/blogs/break-even-roas-formula/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay5Review.js` |
| E021 | [Break-Even for Multiple Products: Sales Mix](https://mybreakeven.com/blogs/break-even-multiple-products-sales-mix/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay5Review.js` |
| E022 | [Landscaping Seasonal Break-Even Guide](https://mybreakeven.com/blogs/landscaping-seasonal-break-even/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay5Review.js` |
| E023 | [Cleaning Business Expenses & Monthly Budget](https://mybreakeven.com/blogs/cleaning-business-monthly-expenses/) | improved — Approved append-only teaching/navigation addition; original article retained. | `src/content/blogs/twelveDayDay5Review.js` |
| E024 | [Calculate Break-Even Point: Units and Sales](https://mybreakeven.com/blogs/calculate-break-even-point/) | improved — November11 explicit authorization covers both former inspect-only and eligible owners. | `src/content/blogs/november11Day6Existing.js` |
| E025 | [Break-Even Formula: Units and Dollars](https://mybreakeven.com/blogs/break-even-formula-units-dollars/) | improved — November11 explicit authorization covers both former inspect-only and eligible owners. | `src/content/blogs/november11Day6Existing.js` |
| E026 | [Contribution Margin per Unit Calculator](https://mybreakeven.com/blogs/calculate-contribution-margin/) | improved — November11 explicit authorization covers both former inspect-only and eligible owners. | `src/content/blogs/november11Day6Existing.js` |
| E027 | [Fixed vs Variable Costs: Per-Unit Formula](https://mybreakeven.com/blogs/fixed-vs-variable-costs/) | improved — November11 explicit authorization covers both former inspect-only and eligible owners. | `src/content/blogs/november11Day6Existing.js` |
| E028 | [Margin vs Markup: Calculator & Formula](https://mybreakeven.com/blogs/margin-vs-markup/) | improved — November17 fee-adjusted contribution case plus combined-plan connections. | `src/content/blogs/twelveDayDay7Review.js` |
| E029 | [Is a Cleaning Business Profitable?](https://mybreakeven.com/blogs/is-a-cleaning-business-profitable/) | reviewed-retained — Protected no-change audit; original profitability owner retained. | `docs/day7-release/editorial-review.md` |
| E030 | [Landscaping Business Profit Margin](https://mybreakeven.com/blogs/landscaping-business-profit-margin/) | improved — November17 hiring/cash-principal case. | `src/content/blogs/twelveDayDay7Review.js` |
| E031 | [Agency Profit Margin: Formula & Examples](https://mybreakeven.com/blogs/agency-profit-margin/) | improved — November17 advance/reserve case. | `src/content/blogs/twelveDayDay7Review.js` |
| E032 | [Cleaning Business Startup Costs and Budget](https://mybreakeven.com/blogs/how-much-does-it-cost-to-start-a-cleaning-business/) | reviewed-retained — November20 protected audit; no rewrite, cosmetic date or engine replacement. | `docs/combined-day3/protected-audits.json` |
| E033 | [Landscaping Startup Costs and Cash Budget](https://mybreakeven.com/blogs/how-much-does-it-cost-to-start-a-landscaping-business/) | reviewed-retained — November20 protected audit; no rewrite, cosmetic date or engine replacement. | `docs/combined-day3/protected-audits.json` |
| E034 | [How Much to Charge for House Cleaning](https://mybreakeven.com/blogs/how-much-to-charge-for-house-cleaning/) | reviewed-retained — November20 protected audit; no rewrite, cosmetic date or engine replacement. | `docs/combined-day3/protected-audits.json` |
| E035 | [Lawn Care Pricing Per Acre: Set Your Rates](https://mybreakeven.com/blogs/lawn-care-pricing-per-acre/) | improved — Context-only owner received November20 whole-visit quote component; original article preserved. | `src/CombinedDay3Review.jsx` |
| E036 | [Ecommerce Pricing: Costs, Fees and Margin](https://mybreakeven.com/blogs/how-to-price-products-for-ecommerce/) | improved — November20 independent contribution-price component. | `src/CombinedDay3Review.jsx` |
| E037 | [Financial Ratios Calculator: 55 Measures](https://mybreakeven.com/calculators/financial-ratios-calculator/) | reviewed-retained — November18 protected calculator audit; original definitions, defaults and engine retained. | `docs/combined-day2/protected-audits.json` |
| E038 | [Refinance Calculator: 5 Loan Types](https://mybreakeven.com/calculators/refinance-calculator/) | reviewed-retained — November20 protected audit; no rewrite, cosmetic date or engine replacement. | `docs/combined-day3/protected-audits.json` |
| E039 | [EBITDA Calculator: Formula, Margin & Examples](https://mybreakeven.com/calculators/ebitda-calculator/) | reviewed-retained — November18 protected calculator audit; original definitions, defaults and engine retained. | `docs/combined-day2/protected-audits.json` |
| E040 | [Business Startup Cost Calculator: Cash Needed to Launch](https://mybreakeven.com/calculators/business-startup-cost-calculator/) | improved — November18 startup funding-versus-accounting classification. | `src/CombinedDay2Review.jsx` |
| E041 | [Operating Profit Margin Calculator](https://mybreakeven.com/calculators/operating-profit-margin-calculator/) | improved — November17 net-revenue to gross/operating-income bridge. | `src/CombinedDay1Widgets.jsx` |
| E042 | [Business ROI Calculator: Uneven & Discounted Payback](https://mybreakeven.com/calculators/business-roi-calculator/) | improved — November17 simple unannualized ROI widget. | `src/CombinedDay1Widgets.jsx` |
| E043 | [Break-Even ROAS Calculator: Margin, Fees & CPA](https://mybreakeven.com/calculators/break-even-roas-calculator/) | reviewed-retained — November20 protected audit; no rewrite, cosmetic date or engine replacement. | `docs/combined-day3/protected-audits.json` |
| E044 | [Employee Cost Calculator: Productive Hour](https://mybreakeven.com/calculators/employee-cost-calculator/) | improved — November20 loaded cost and usable capacity explanation. | `src/CombinedDay3Review.jsx` |
| E045 | [Cash Flow Forecast Template: 13 Weeks](https://mybreakeven.com/calculators/cash-flow-forecast-template/) | improved — November18 event/date/category preflight. | `src/CombinedDay2Review.jsx` |

## Release acceptance

This report is prepared with the two presentation corrections. Required PR verification and the normal Hostinger production workflow must succeed before those corrections are called live. The release PR timeline records final CI, merge and live checks. The135-URL readiness snapshot above was collected against the deployed base; it is not mislabeled as post-release inspection or search-index evidence.
