# Price increase calculator review — 15 November 2026

Scope: /calculators/price-increase-calculator/ only. Preserve all article content, existing artwork and discount model economics.

Reviewed relevant organic search results (ranking varies by location and time):
- ReportPilot: https://www.reportpilot.tax/tools/price-increase-calculator — margin-based price/discount volume comparison; unchanged unit-cost assumptions.
- WZRD: https://wzrd.to/tools/price-increase-calculator — revenue retention threshold; does not model contribution costs in the inspected tool.
- FreeToolCabin: https://freetoolcabin.com/price-increase-calculator/ — percent/direct-price entry and contribution-preserving sales volume.

Implemented direct-price entry, separate revenue/profit thresholds, additional overhead, decimal whole-sale boundaries, scenario cards, CSV export, responsive example cards, matched visible FAQs and method sources. Existing percentage fees and revised variable costs remain supported. No assertion of permanent top-three rankings.

Method: C0=P0(1-f)-V0; C1=P1(1-f)-V1. Profit change=Q1*C1-Q0*C0-H under unchanged original fixed costs. Required whole sales=ceil((Q0*C0+H)/C1) when C1>0. Revenue target=ceil(P0*Q0/P1). Expected sales=floor(Q0*(1-loss)). All amounts are illustrative inputs; this tool does not predict demand or absolute net profit.

Hand checks:
- Default P0=100, V0=60, fee=3%, Q0=100, price +10%, expected sales loss=10%: C0=37, C1=46.70, Q1=90, contribution change=503; revenue target=91; contribution target=80.
- Add H=600: same-profit target=93, expected profit change=-97; 92 sales are below target and 93 are above it.
- P0=80, P1=100 implies +25%; reverse percentage uses the original price.
- Revised V1=80 requires 139 sales even without additional overhead.

Verification is in src/price-increase-review.test.jsx. Existing preservation guards exclude only this newly authorized target while retaining all other calculator and article checks. Production verification must include both entry modes, preset buttons after direct entry, overhead, invalid input and CSV download.
