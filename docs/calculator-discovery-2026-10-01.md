# Calculator discovery and usability — 1 October 2026

Source baseline: c022b3636666fb594b63eab28c45a74b1566ff34.

## Confirmed findings
- Six industry destinations lacked editable same-page inputs; only restaurant and ecommerce had them. Live agency browser inspection confirmed zero number inputs, an index/follow directive and the correct self canonical.
- Source robots.txt permits Googlebot through the wildcard group and explicitly allows OAI-SearchBot. Production robots response was not verified; do not infer a crawler block from retrieval errors.
- Current restaurant retrieval exposes the complete explanation and calculator. The earlier abbreviated search extraction is not proof of a permanent rendering failure.
- Owner compensation and positive target profit were included in a hero labeled sample break-even revenue. Clarify it as a revenue target.
- FAQ inquiry output uses exact fractional volume; identify this explicitly rather than implying the rounded-up whole sales target.

## Changes
- All eight industry pages offer the existing editable calculator with reset, validation, capacity warning and full-analysis link.
- Explain formulas, owner-pay/profit scope, example assumptions, rounding, team labor hours, double counting and recurring acquisition limitations.
- Add verified industry-guide and methodology links.
- Keep engine, defaults, canonical routes, robots and private index policies unchanged.

## Verification
- 31 test files / 249 tests pass.
- Production build passes.
- Eight generated calculator pages each have 14 numeric inputs, one H1, matching canonical, indexability and a real related-guide destination.
- Production sitemap currently builds 102 public URLs. September coverage export is a historical 51-known-URL snapshot, not today's whole inventory.

## Remaining access-dependent checks
Current Google-selected canonical, index classification, last crawl and rendered inspection for the six flagged calculators require authenticated Search Console URL Inspection. No GSC connector or credentials were available. No current indexing or ranking improvement is claimed.

## Release and rollback
Changes isolated on fix/calculator-discovery-2026-10-01 for review. Revert this change through the existing build/deployment process if needed. No production deployment performed by this branch push.
