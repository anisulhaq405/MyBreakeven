# Discount calculator review — 15 November 2026

Scope: only /calculators/discount-break-even-calculator/. Original artwork, all articles and every other calculator's content/economics are preserved. The price-increase page is explicitly covered by metadata, engine and render guards.

Relevant organic search competitors inspected (positions vary by location/time):
- Replo: https://www.replo.app/tools/discount-break-even-calculator — margin, discount, expected lift and a separate catalog workflow.
- SideGig Math: https://sidegigmath.com/discount-impact-calculator/ — simple price/cost/discount volume multiplier.
- Chameron Digital: https://chamerondigital.com/tools/discount-calculator/ — sale price and extra sales; inspected method excludes payment charges and offer expenses.

This release adds three equivalent entry modes, revised promotion costs, fixed campaign expense, separate revenue/profit targets, expected-volume and capacity price floors, conservative displayed discount limits, six comparison cards, CSV and print support. It does not add catalog uploads or predict redemption/demand. OpenStax contribution-margin/CVP methodology is linked on the page.

Equations: C0=P0(1-f)-V0; C1=P1(1-f)-V1; required whole sales=ceil((Q0*C0+K)/C1), for C1>0. Expected sales=floor(Q0*(1+lift)). Profit change=Q1*C1-Q0*C0-K, assuming original fixed overhead is unchanged. Revenue-only sales=ceil(P0*Q0/P1). Price floor at Q sales=((Q0*C0+K)/Q+V1)/(1-f). Monetary input limits are 1 trillion and sales counts must remain safe integers. High-precision Decimal arithmetic is used before returning display numbers. Zero and negative new contribution produce no recoverable target; zero sale price has no revenue target.

Hand checks:
- $100 current price, $60 variable cost, 3% fee, 100 sales, 10% discount: C0=$37, C1=$27.30. Revenue target=112; profit target=136; at 120 sales profit change=-$424.
- Add $300 campaign expense: target=147; at 120 sales profit change=-$724. At 146 sales shortfall=$14.20; 147 sales exceed the baseline by $13.10.
- At 120 expected sales without campaign expense, price floor=$93.64261168…; quote floor rounds up to $93.65; discount limit rounds down to 6.35%.
- Capacity 150 supports a continuous discount of 12.71477663…%; displayed conservative limit=12.71%.
- Retail $50, $25 cost, 3% fee, 15% off: contribution=$16.225, 290 sales required from 200 baseline; do not round contribution before division.

Validation: focused boundary/equivalence/property tests; protected baseline for every other tool and all articles; full regression suite; production build; matched FAQ schema, canonical, sources, anchors and links; 292-route audit. Both PR and production workflows run the discount-specific release gate. Final live checks cover all entry modes, campaign expense, presets, invalid input, reset and CSV download.
