# Core break-even intent & indexing audit — 28 October 2026

## Scope and guardrails
Existing URLs only; preserve October 26–November 9 freeze on new public pages. Do not disturb Financial Ratios Calculator or rewrite existing content wholesale. GSC indexing improvement requires subsequent comparable exports.

## Distinct intent ownership
| Existing URL | Primary purpose | Keep out of competing page |
|---|---|---|
| /blogs/break-even-formula-units-dollars/ | Define exact break-even formulas in units and sales dollars, assumptions, rounding, worked math | Avoid targeting primary interactive calculator intent |
| /blogs/calculate-break-even-point/ | Teach step-by-step calculation and input workflow with worked examples | Avoid repeating formula-reference article word for word |
| / | General small-business interactive break-even decision calculator | Do not convert into duplicate long-form formula article |
| /blogs/fixed-vs-variable-costs/ | Categorize cost behavior correctly and mixed/step costs | Do not target the formula head term |
| /calculators/cash-flow-forecast-template/ | 13-week timing/cash forecast, not accounting profit break-even | Do not imply profit BEP equals cash balance |
| /calculators/food-cost-calculator/ | Restaurant ingredient/inventory food-cost reconciliation | Do not target broad break-even formula query |

## Evidence available at audit
- Public formula page visibly provides both formula types, contribution definition, exact-versus-whole-unit guidance, assumptions, examples and FAQs. No evidence to justify rewriting everything.
- Existing HomeSEO contextual method already links directly to formula page, calculation guide, fixed/variable guide, cash forecast and food-cost calculator. Existing test src/gsc-five-priority-recovery.test.jsx explicitly protects those five pathways.
- Owner-supplied October 26 GSC Coverage drilldown previously recorded formula and calculate-step pages as discovered-not-indexed; this is NOT evidence they were crawled.
- October 26 recovery register verified both pages in XML sitemap and self-canonical, index/follow rendered metadata, but not HTTP response headers or fresh indexing transitions.
- Competitive page examples have easy access to whole-unit rounding, contribution margin and interactive break-even chart; these are calculator intent features rather than proof the formula guide lacks content.
- No fresh query-level GSC exports were available for this specific pass. Do not invent ranking gains or claim confirmed keyword cannibalization.

## Action plan, conditional on evidence
1. Export GSC by query and by page over a matched last-28-day window for both URLs and the home page. Flag actual overlap only where the SAME query has meaningful impressions on multiple URLs; segment branded and unbranded.
2. Record query, landing URL, clicks, impressions, CTR, average position and date. Separate ranking volatility from query mix.
3. For each URL, check URL Inspection current index status, selected canonical, last crawled, HTTP response and actual Googlebot access logs. Do not use sitemap presence as proof of indexing.
4. If a query is misplaced, adjust only the relevant title/introduction/section heading and a few context-specific links. Preserve article URLs, substantive examples, original formulas and all existing helpful content.
5. Keep one primary internal link for the formula-reference intent and one for step-by-step application; do not link both with indistinguishable anchor text from every context.
6. Compare exact same URLs and query sets after recrawl before judging results. No guarantees about Google indexing.

## Current execution outcome
Intent map and existing homepage pathway audited; no proven overlap or missing core formulas requiring a risky live change. No new public URL, noindex, redirect, canonical rewrite, or unverified rewrite was introduced.
