# Contribution guide calculator — release draft

Prepared 13 October 2026 for the intended 14 October morning release (Asia/Karachi).

Status: draft branch / draft pull request only. Do not merge or deploy on 13 October. Production deployment triggers on pushes to main, so storing this branch does not publish it.

## Scope

Improve the existing `/blogs/calculate-contribution-margin/` URL with an embedded per-unit calculator, fee breakdown, zero/loss explanations, worked example, cost boundaries, planner links and matching title/description. Preserve original publication date and detailed mixed-product/bundle examples. No new route, calculator listing or unrelated guide rewrite.

Widget inputs: price, other variable costs, percentage fee, fixed transaction fee per unit. No provider fee assumptions. Currency selector changes labels only. Use a consistent product/order/job unit and enter each cost once. Fixed overhead is excluded from per-unit contribution. The widget and core planner share contribution arithmetic without intermediate rounding.

Checked example: price 50, other costs 25, fee 3%, transaction fee 0.30 → 26.80 total variable costs, 23.20 contribution, 46.4%. Zero/negative contribution stays visible; invalid amounts, missing fields, non-positive price and out-of-range fees show a message.

## Verification completed

- 555 tests across 53 files passed, including independent example arithmetic, decimal precision, invalid inputs, zero/loss output and agreement with the full planner.
- Production build passed. The calculator and its initial results are present in prerendered HTML.
- Static audit: 193 routes, 188 sitemap entries, zero issues. Existing unrelated deferred interactive anchors remain unchanged.
- Targeted output check: one H1, unique IDs, correct title/self-canonical, one sitemap entry and the expected example results.
- Responsive widget CSS uses two columns on desktop and one column below 700px, accessible labels/help text, visible keyboard focus and a polite result region. The featured image follows the widget and loads lazily.
- `git diff --check` passed.

Browser could not connect to the local preview (`ERR_CONNECTION_REFUSED`), so visual mobile/desktop and interactive keyboard behaviour have not been browser-certified. Formula, SSR and responsive source checks passed. Perform the live visual/interaction check after tomorrow's publication; fix any issue before treating the release as fully verified.

## Morning release procedure

1. Recheck main for intervening changes; reconcile the draft if required and run the affected checks.
2. Confirm actual publication date; change the guide's intended modified date `2026-10-14` if release occurs on a different date. Keep original published date `2026-09-23`.
3. Mark the draft PR ready and merge only during the authorized morning release session. Include `[skip social]` in the merge title/message.
4. Confirm verification and Hostinger deployment success.
5. Open the live URL on desktop/mobile; check example, edits, zero/loss, invalid input, currency labels, keyboard focus and result links. Verify title, canonical, sitemap and hydration.

No automated merge or deployment has been scheduled.
