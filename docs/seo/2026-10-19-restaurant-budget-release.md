# Day 4: restaurant budget path

Scheduled October 19; implemented early October 17 with owner authorization. Existing restaurant budget URL, early Excel download, separate workbook/guide examples and restaurant-calculator handoff retained. No new page or category, no video embed without a recording and no social publication. The English demo script and three Week1 post drafts are prepared separately for manual distribution.

## Confirmed workbook defect and fix

The prior IFERROR threshold returned zero for zero contribution and a negative threshold for loss-making contribution. The existing Monthly Budget sheet now distinguishes No sales, No positive contribution, Complete inputs and Check inputs. Zero values must be explicit; missing/nonnumeric/negative raw amounts are not accepted as a valid threshold. The difference is Not comparable unless both thresholds are numeric. Positive contribution with all committed costs explicitly zero correctly returns a numeric zero threshold. Contribution percentages can remain zero or negative to explain the cost economics, while the threshold is blocked. No division by a rounded percentage.

Only B20/C20, B21/C21 and D21 calculation formulas changed; input amounts and all other calculations are preserved. Add a short explanation at A28 and wrap the existing SBA source in A26 instead of overflowing into the adjacent cell. Guard messages fit the existing result columns. Spreadsheet authoring and previews used the artifact tool; native LibreOffice recalculation independently checked exported XLSX files.

## Verification

Native LibreOffice cases: original budget threshold 43142.8571428571; original actual threshold 46284.5953002611; zero contribution and negative contribution report No positive contribution; zero sales reports No sales; missing COGS reports Complete inputs; changed food sales to50000 recalculates the threshold to41765.9574468085; zero committed costs retains a valid numeric zero. Invalid threshold comparisons report Not comparable. Changes to Actual remain independent of Budget. Test scenarios are temporary and not published. The exported workbook retains original inputs and results.

The existing article explains all states and the valid-zero distinction; its substantive modified date is October17, the actual implementation date. Workbook example still reconciles 60000−18000−30200=11800 and57000−18700−31100=7200. Separate calculator handoff was checked with price25, materials6, other2, fee4%, acquisition0, variable labor0, overhead23000, owner pay4000, extra profit0: contribution16 and1688 whole orders. Operational fields require actual records; defaults are not proof of capacity or demand. Opening the calculator does not transfer the article example.

620 automated tests, production build,194-route/189-sitemap audit and fixed18-article path audit pass. CI/deployment and live workbook download checks are recorded in the PR. Existing header/footer, account limits, payment destinations and core calculator formulas unchanged. [skip social]
