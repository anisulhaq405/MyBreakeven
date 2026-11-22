# Existing-page improvement batch 1 — 23 November 2026

Scope: four existing guides; no new URL, blog post, calculator or feature image. Existing cluster owners and industry subgroups remain appropriate. Changes are applied after the November 21 release, with historical contract views retained and separate current-release checks.

| Existing owner | Improvements |
| --- | --- |
| restaurant-covers-per-night-break-even | Search title explicitly includes break-even; early answer distinguishes covers from table bills, operating costs from a separate owner-income target, and monthly minimum from uniform nightly rounding. Added a goal-comparison table and relevant restaurant budget/food-cost/hub links. |
| photography-business-profit-margin | Formula/example title and early monthly answer; contribution, post-overhead remainder and owner-income-adjusted margin reconciled in an accessible table. Preserved existing scenarios, owner-compensation boundary and editing-capacity calculation; added relevant existing destinations. |
| cleaning-business-monthly-expenses | Preserved existing metadata and Excel download. Added an early answer and visual 40-visit reconciliation with explicit separation from the workbook's committed-payroll method. |
| high-low-method | Preserved title, early answer and calculator engine. Added full six-observation residual check and links to cost drivers, flexible budgeting and contribution margin. |

Numerical checks: restaurant contribution $22.80/guest, monthly operating minimum 1,053 covers, owner-income minimum 1,316 covers; uniform 26-night targets 41 and 51 respectively. Photography $5,000 sales minus $1,650 job costs/fees gives 67% contribution; after $700 overhead, 53%; after $1,800 owner target, $850 or 17%, before taxes and stated exclusions. Cleaning 40 × ($180 − $72) − $1,320 = $3,000 for a separate owner goal. High-low residuals [0,0,20,0,720,0] match the unchanged calculator engine.

Validation: 1,497 automated tests passed; production build and cluster coverage passed (242 guides, 23 primary topics, 8 industry hubs, 41 calculators). Full static audit: 326 routes, 320 sitemap URLs, zero issues; three pre-existing interactive Pro anchors deferred. Targeted QA checked 98 local destinations plus canonical, one H1, unique section anchors, cover assets, schema modification date, sitemap and search membership. All other 238 article records unchanged. Calculator engines, publication dates, feature images and FAQ records preserved.

Latest available performance baseline remains the export dated November 20, through November 18; it cannot demonstrate results from this release. Compare page-filtered query/country/device cohorts in equal 14-/28-day periods after recrawl. No ranking or click increase is claimed at publication.

Reproduce targeted static acceptance after building: `node scripts/qa-existing-batch1-nov23.mjs`.
