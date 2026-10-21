# Day 1 pre-publication revision

Still unpublished. Keep `day1PlanningRelease.published` false until the user's publication instruction.

## Content

- Budget vs Actual now distinguishes the 30% operating-result decline from an 8.3 percentage-point margin decline (33.3% to25%). Reporting-control instructions explain valid calendar years/months and explicit zeros.
- Rolling Forecast now reconciles the $1200 reduction: $3000 original result minus $1200 volume effect plus $450 price effect minus $450 unit-cost effect equals $1800. The narrative labels this as a forecast-assumption bridge rather than realized efficiency or customer results.
- The forecast download is accessible directly from the quick answer. Section navigation now includes workbook instructions; the existing variance guide includes its static-report download section in navigation.
- Date alignment instructions explicitly require first-of-month spreadsheet dates in the input schedule, unique months and a valid last-closed cutoff. No spreadsheet-native compatibility certification is claimed.

## Workbook reliability and usability

- Invalid text/fraction/out-of-range reporting months and invalid calendar years leave BvA outputs unavailable rather than leaking spreadsheet date errors.
- Invalid or missing forecast cutoff dates leave the forward view incomplete.
- Recalculation checks cover duplicate months, genuine zero jobs retaining fixed expense losses, budgeted losses using an absolute-budget denominator, missing drivers, missing future periods and preserved actuals.
- Removed the 21 frozen BvA rows, which unnecessarily consumed the input viewport on smaller screens.
- Preserved worksheet names, input locations, valid-example values and download paths. Preview values remain unchanged.

## Publication guard

`npm run build` now runs `scripts/check-day1-build.mjs`. It checks both pages' draft banner, robots/googlebot state, sitemap inclusion, canonical, H1, release date and real workbook signatures against the central release status. A mismatch fails the build before deployment. This also makes future publication/restoration rehearsals verifiable rather than relying on the source toggle alone.

## Verification

739 tests passed across84 files. Both workbooks were authored/recalculated with Artifact Tool; independent assertions passed and the formula-error scan found no errors. Their changed output views were rendered and inspected. Native Excel/Sheets execution remains unverified.

The draft build and the publication-status rehearsal are checked separately. The final retained state is draft-only. Current GSC baseline remains unavailable; no ranking, clicks or traffic claims are made.
