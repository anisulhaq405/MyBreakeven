# Day 3 post-release review — 22 October 2026

Authorized scope: review and optimize the three already published Day 3 guides and their calculators/download handoffs. The separate new-keyword roadmap is not implemented here.

## Baseline and changes
Baseline production commit ece8f51b6a69717f7129f0ffd48d673af48e6e8d, tree 3d73b73484f31f3d64015e62e4c472a6d88b7852. Original guide publication dates remain October 22.

- Master budget: extend the existing service example with opening/closing cash, receivables, equipment, debt and equity. Opening assets and liabilities/equity both 18,000; closing both 23,000. State the additional opening balances and that the 1,000 other payment is principal in this particular illustration. Keep the tool/CSV scope explicit: neither automatically builds balance-sheet schedules.
- Cost drivers: a cost-object/pool/driver/rate table plus the denominator error to avoid. Existing allocation, capacity and avoidability boundaries retained.
- Job order costing: reconcile traced 1,920, hypothetical contribution 1,080 only under stated variable/fixed assumptions, applied overhead 900 and assigned-cost surplus 180. Do not equate traced cost with variable cost.
- Tighten three unique titles/descriptions around actual content and outputs. Make calculator and relevant CSV downloads discoverable in section navigation.
- Add calculator input/result jump links with focusable targets, labelled input groups/results, scroll offset and 44-pixel navigation targets. Separate field labels from helper descriptions through explicit label/input associations.
- Match visible maximum input constraints to engine limits; collection percentage capped at 100. Clarify planned-period job input.
- Preserve nonzero sub-half-cent outputs in scientific currency notation instead of displaying 0.00. Normalize negative zero. Use the selected currency code directly on allocation/overhead rates.
- Explain CSV row/formula preservation, 80 vs 0.8 collection input, margin-percent formatting, reference totals, missing-input and zero-denominator behavior. File formulas/URLs are unchanged.

## Validation before deployment
736 tests / 83 files passed. Production build passed. Built-site audit: 203 routes / 198 sitemap URLs, zero issues. Image/delivery budgets clear. Existing 18 priority intent/link checks clear. All three built pages retain one H1, valid JSON-LD, published dates and working section targets. Independent CSV formula-subset checks reproduce default values and seven invalid/zero-revenue cases; no claim of native Excel/Sheets recalculation.

Primary accounting references rechecked: OpenStax operating budgets (7.2), financial budgets (7.3), cost drivers (6.2), predetermined overhead/application (4.4). New figures are original extensions of the existing fictional examples.

After production deploy, verify the actual new metadata/content, jump targets, small-currency display, invalid inputs and reset in a live browser. Release commit uses [skip social]. No ranking/traffic improvement is claimed from this implementation.
