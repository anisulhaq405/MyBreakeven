# Business Equivalent Ratio Calculator — release scope lock

Date: 2026-10-29
Page: /calculators/equivalent-ratio-calculator/

## Locked functional scope
- Cost-to-revenue (percentage; period comparison and user-set target)
- Debt-to-equity (times; period comparison and user-set target)
- Labor hours per unit (hours/unit; period comparison and user-set target)
- Three-product revenue mix (percentage share and percentage-point shifts)
- Business-focused educational sections, examples and FAQ
- Exact ratio mathematics retained in the advanced view
- Copy, CSV, print/PDF actions retained
- Business reset restores matching default scenario

## Verified by source inspection and targeted calculation execution
- Cost 30/100 vs 45/150 = 30% vs 30%
- Debt 40/60 vs 60/90 = 2/3 vs 2/3
- Labor 20/100 vs 30/100 = .20 vs .30 hour/unit
- Mix 20:30:50 vs 40:60:100 = 20/30/50% both periods
- Corresponding target thresholds evaluate accurately
- Published HTML includes business article and updated title

## Release gate not independently verified
- Latest GitHub Actions job success for the final source commit
- Hostinger's browser-rendered calculator interactions and caching
- Full mobile viewport, copy, CSV and print/PDF browser QA

Scope is frozen. Change only for confirmed bugs, accessibility, security or calculation accuracy; do not mark production QA passed without evidence.
