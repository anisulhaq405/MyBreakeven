# Mobile delivery follow-up — October 16, 2026

The owner approved remeasurement of the calculator directory, restaurant budget guide and cleaning calculator after the earlier image/content releases, with targeted fixes for confirmed opportunities.

## Official PageSpeed mobile observations before this follow-up

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /tools/ | 89 | 100 | 100 | 100 | 2.9s | 0ms | 0 |
| /blogs/restaurant-budgeting/ | 100 | 100 | 100 | 100 | 1.2s | 0ms | 0.003 |
| /calculators/cleaning-business-break-even-calculator/ | 90 | 100 | 100 | 100 | 2.8s | 0ms | 0 |

Reports ran at approximately 12:09 PM Pakistan time, using emulated Moto G Power, Lighthouse 13.5.0 and Slow 4G. All three show No Data for field experience. These are individual, variable lab measurements; they do not establish field Core Web Vitals or isolate the effect of earlier changes.

- https://pagespeed.web.dev/analysis/https-mybreakeven-com-tools/gklnmzq1yi?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-blogs-restaurant-budgeting/kcxvqvy64c?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-calculators-cleaning-business-break-even-calculator/d54kkqt4fo?form_factor=mobile

## Confirmed opportunities and bounded fixes

The directory image audit estimates 219 KiB savings. Its 374x210 card images selected 800x450 files because that was the smallest candidate. Add eight 400x225 WebP candidates only to registered industry card srcsets. Keep 800/1200 candidates for density and width selection, and leave page-feature srcsets unchanged. The eight 400px files total 141,588 bytes versus 417,784 for the 800px files: 66.1% smaller candidate bytes, not a whole-page speed guarantee. Inspect the landscaping card visually after encoding.

Three homepage-only stylesheets were imported both by the universal startup entry and by the existing home route. Remove the startup imports; keep the existing imports in main.jsx. The production manifest and built HTML retain the home CSS on the home route and exclude that route-specific CSS from secondary pages. Shared styles, fonts, header/footer and route stylesheet discovery remain intact. Do not defer all CSS or introduce a content flash to chase a score.

Remaining shared route CSS/JavaScript opportunities are recorded but do not justify a broad component/route rewrite in this follow-up. The budget page already reports 100 in this lab run. No formula, default, account flow, checkout or canonical change is part of this release.

## Validation

595 automated tests; production build; 193-route/188-sitemap audit with no issues; 162-cover audit with no missing/duplicate covers. Extended existing responsive-image regression checks verify every 400px file's dimensions, smaller size and actual card markup while preserving the larger page-feature candidates. Require CI, deployment, live candidate/CSS checks and affected directory/cleaning remeasurement before reporting the follow-up complete.
