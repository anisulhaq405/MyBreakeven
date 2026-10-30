# Check 4: P2 SEO audit and controlled correction — 2026-10-30

Prerequisite: Owner approved Check 3. User screenshot confirmed Build Hostinger production Actions #531 and #530 succeeded.

Pages checked against built hostinger-deploy HTML:
1. /blogs/operating-leverage-small-business/: formula contribution / operating profit, scenarios, fixed-cost/capacity discussion, 10% sales-change sensitivity, near-break-even caveats. No material missing content proven; preserve.
2. /blogs/restaurant-budgeting/: monthly workbook, illustrative 12-month example, actual separate 12-month workbook and 20 scenarios already exist. Found a verified contradiction in resource-picker table claiming annual example had no separate editable workbook despite a download link above. Corrected source table to link the real 12-month download and distinguish its scope. Kept the original monthly workbook and existing article intact.
3. /blogs/restaurant-food-cost-percentage/: inventory formula, actual versus ideal food cost, reconciliation, variance, recipe worksheet and decisions already exist. No material missing content proven; preserve.

Changes:
- src/content/blogs/restaurantBudgetSerpScopeReview.js: fix resource picker; avoid claims contradicting available 12-month workbook.
- src/restaurant-budget-workbook-consistency.test.js: regression guard for corrected workbook scope.

Release status:
- Latest post-fix CI and hostinger-deploy publication NOT YET confirmed. Must verify production output and downloadable file response before marking published.
- No changes to URLs, canonicals, unrelated accounting content, calculators, or new public routes.
- Owner approval required before Check 5. Existing Oct 26–Nov 9 no-new-URL freeze remains in effect.
