# Future Value Calculator — Phase 1 release checkpoint

Date: 2026-10-29
Route: /calculators/future-value-calculator/

## Implemented in main
- Fixed principal, deposits and effective/nominal rate engine retained
- Monthly / quarterly / yearly contributions, beginning/end timing
- User-defined savings goal with required deposit and apply action
- Optional annual deposit escalation and contribution delay
- Periodic asset-based and fixed fee deductions, total fees and fee drag
- Inflation-adjusted output and annual checkpoints
- Advanced scenario CSV export
- Regression tests for engine parity, fees, goal, delay, inflation and row accounting

## Evidence verified
- GitHub default-branch source contains Phase 1 implementation and regression test files
- hostinger-deploy HTML includes savings goal, advanced growth plan, fee drag, and advanced CSV

## Release blocker (do not mark as production passed)
- hostinger-deploy HTML does not yet include 'Delay contribution payments'
- Latest GitHub Actions success for the final commit not independently verified
- Live interactive browser/mobile and downloaded CSV behavior not independently verified

## Scope control
Phase 1 feature development is provisionally frozen. Release sign-off remains pending published-build sync and runtime QA. Phase 2 code must not overwrite Phase 1 functions or interpret pending gates as passed.
