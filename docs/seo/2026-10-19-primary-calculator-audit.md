# Primary calculator audit — 19 October 2026

## Owner screenshot reproduced

Ecommerce, PKR. Inputs: price 2,420; product 1,300; direct labor 125; shipping/returns allowance 200; acquisition 400; fees 4%; overhead 15,000; owner pay 25,000; additional profit goal 150,000; one worker; 54 hours/week; 0.15 worker-hours/order; utilization 78%; inquiry conversion 3%.

| Step | Result |
|---|---:|
| Percentage fees/order | 96.80 |
| Total variable costs/order | 2,121.80 |
| Contribution/order | 298.20 |
| Contribution margin | 12.3223% |
| Monthly contribution required | 190,000 |
| Exact financial volume | 637.1563 orders |
| Required whole orders | 638 |
| Whole-order revenue | 1,543,960 |
| Modeled profit after overhead and owner pay at 638 orders | 150,251.60 |
| Overhead-only target | 51 orders |
| Overhead + owner-pay target | 135 orders |
| Productive hours/month | 182.52 |
| Exact / whole capacity | 1,216.8 / 1,216 orders |
| Inquiries for 638 orders at 3% | 21,267 |

The screenshot's 638 / 1,216 / 21,267 values are mathematically correct. A 0.15-hour delivery assumption means nine total worker-minutes per order, not 15 minutes. At 3%, roughly 33.33 inquiries are assumed for each sale. The inputs do not prove 21,267 inquiries or 638 delivered orders are attainable. Do not deduct the same ad spend both per order and again in fixed overhead. The shipping/returns amount must represent unrecovered cost per completed-order unit consistently. Taxes, financing, inventory purchase timing and owner drawings require separate treatment.

## Confirmed defects and fixes

1. Pro margin of safety was clamped to zero whenever the sales plan fell below costs plus owner pay. It now preserves signed shortfall. Regression: 2,000 planned revenue versus 3,000 threshold is −1,000 and −50%, rather than zero. At zero planned sales the percentage is undefined and now displays N/A; signed revenue shortfall remains visible. UI, decision brief and report formatting handle this case.
2. The primary hero displayed a 78/100 heuristic beside FEASIBLE. That is not a validated success probability or demand assessment. The hero now displays actual percentage of modeled capacity required and labels the positive state CAPACITY FITS. Persisted score fields remain compatible; report labels explicitly identify the retained heuristic.
3. The free results lacked the overhead-only versus owner-pay versus extra-profit target reconciliation. All eight profiles now show these separate whole-unit targets, monthly components, target revenue and modeled profit after owner pay. Contribution remains distinct from profit.
4. Zero contribution incorrectly used the same loses-money message as negative contribution. The zero case now explicitly says no contribution remains for monthly costs/goals.
5. Extremely small nonzero inputs could underflow to zero when Decimal outputs crossed into JavaScript numbers. Unrepresentable input/output values now produce validation instead of a misleading valid zero.

## Independent audit method

799 deterministic cases across all eight industries, 7,990 numeric comparisons. The oracle uses Python Fraction exact rational arithmetic, independently of the Decimal-based product engine. Checks cover fees, contribution, monthly funding, fractional/whole sales, exact/whole revenue, fractional/whole capacity, practical inquiries and profit after owner pay. All pass. Reproduce with `python3 scripts/audit-primary-calculator.py` from the repository root. Industry defaults plus varied prices, costs, fees, team sizes, hours, utilization and conversion were included. New regression tests retain the owner screenshot, negative/zero sales margin of safety, zero contribution and underflow cases.

## Default-profile results

These are fictional default assumptions, not industry benchmarks. Whole targets include entered overhead, owner pay and extra profit.

| Industry | Contribution/unit | Monthly funding | Whole target | Whole capacity | Inquiries |
|---|---:|---:|---:|---:|---:|
| Cleaning | 76.78 | 8,700 | 114 | 97 | 380 |
| Landscaping | 110.72 | 11,300 | 103 | 94 | 368 |
| Photography | 376.15 | 9,100 | 25 | 23 | 114 |
| Agency | 916.20 | 15,200 | 17 | 17 | 85 |
| Detailing | 101.04 | 8,500 | 85 | 85 | 266 |
| Ecommerce | 25.248 | 14,800 | 587 | 1,267 | 20,965 |
| Restaurant | 10.41 | 33,500 | 3,219 | 2,852 | 7,154 |
| Salon | 37.24 | 15,800 | 425 | 399 | 1,119 |

## Validation and limits

674 automated tests across 74 files pass. Production build, 196-route / 191-sitemap rendered audit and all delivery/image budgets pass. No industry defaults, financial goals, checkout/account limits, source currencies or workbook assets changed. Valid ordinary-input primary formulas remain unchanged; engine v1.3.1 is retained. Pro margin-of-safety correction affects derived analysis, and primary validation/presentation now expose the boundaries above. This verifies calculations within the stated model, not every business cost, real demand, taxes or every device/account scenario. Live verification is recorded separately after deployment. Automated comparisons are broad finite coverage, not a proof for every possible input.
