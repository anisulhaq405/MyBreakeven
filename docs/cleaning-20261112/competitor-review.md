# Cleaning calculator review — 12 November 2026

Only `/calculators/cleaning-business-break-even-calculator/` is being upgraded, on main `2b9c6129`. The earlier ecommerce upgrade, 215 blogs and seven other industry pages are protected by snapshots. Shared engine, industry defaults and transfer logic stay unchanged.

## Search and competitor boundary
English search query: `cleaning business break even calculator`; verified with a second search engine and direct primary pages. Google had already presented this browser with unusual-traffic human verification earlier in this session. No retry or CAPTCHA bypass was attempted. The following are three relevant search competitors, **not verified Google positions 1–3**.

| Comparator | Observed useful coverage | Resulting design choice |
| --- | --- | --- |
| https://cleaningestimatetools.com/calculators/cleaning-break-even-calculator/ | Loaded labor, per-visit contribution, monthly break-even, price solver, owner-income goals | Explicit loaded variable wages, exact and whole visit targets, fee-aware price solving; separate owner allocation |
| https://tidyly.au/resources/cleaning-business-break-even-calculator | Operating versus owner-funded break-even; representative calendar/mix | Three funding thresholds and explicit completed-visit unit; separate recurring-client frequency |
| https://www.gustry.com/cleaning/job-profitability-calculator | Owner and employee time, travel, allocated overhead, price/margin explanation | Separate employee/owner capacity; owner income counted once in monthly allocation, instead of mixing replacement wages with the same allocation |

No national wage, payroll-burden, fee, mileage, productivity or margin benchmark is inferred from a competitor. All defaults are clearly fictional, editable inputs. This is a monthly planning tool, not a ranking guarantee, payroll compliance tool, route optimizer or cash forecast.

## Primary support
- https://stripe.com/resources/more/how-to-calculate-the-break-even-point — fixed cost divided by unit contribution.
- https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked — official indexed source distinguishes workday travel between sites from ordinary commuting. The official direct fetch returned 403; indexed text was verified via authoritative-domain search. Keep the product statement general and do not infer an individual worker's legal entitlement.

## Calculation improvements
Separate visit-dependent wages from committed payroll. Compute employee count × (on-site + employee travel/setup elapsed hours) × effective loaded variable wage. Owner hours constrain capacity separately, while owner compensation is funded once through the owner allocation. Allocate flat invoice fees across visits only once. Retain separate vehicle cost and travel wages. Compute operating, owner-covered and full-profit goals, fee-aware operating/full price floors, exact operating safety, recurring-client equivalent, daily pace and all-new inquiry boundary. Compare **both** full target and planned visits against the smaller applicable role capacity.

Two-employee worked example: price250, labor108, supplies12, vehicle10, acquisition5, fees7.80 → contribution107.20. Fixed2500 gives24 visits; add owner3000 gives52; extra500 gives56. Employee capacity57 and owner capacity60; the56 target fits but planned60 does not. Conditional after-owner remainder at60 is932; full target price242.58. See model-audit.md for six independent Decimal fixtures.
