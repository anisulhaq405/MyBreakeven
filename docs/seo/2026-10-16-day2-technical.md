# Day 2 technical task: scheduled October 17, performed October 16

The owner requested execution one day ahead of the fixed monthly plan. Scope: crawl/indexability, canonical and parameter handling, crawler access, representative performance checks, and downloads. No new category or public page is added.

## Confirmed issues and implementation

- Eight industry feature images had only 1200x675 delivery. Add eight 800x450 WebP candidates, register responsive sizes/srcsets in the directory and industry pages, and use the same helper in the four shared cluster heroes consuming these assets. The smaller files total 417,784 bytes versus 882,556 bytes for the eight original candidates (52.7% lower for the selected 800px candidates, not a claimed whole-page improvement). Originals remain the fallback and social image.
- The feature-image audit still constructed old industry filenames/slugs. It now reads actual industry entries from the directory registry so it audits deployed covers, not retired assets.
- The representative restaurant budget article had no smaller feature candidate. Add an 800x450 version (54,428 bytes versus 100,572 bytes) through the existing responsive feature helper. Text, layout and publication dates remain unchanged.
- PageSpeed identified skipped heading levels on pricing: the H1 was followed by H3 plan names. Make Free/Pro H2 and preserve their existing visual typography with scoped CSS.
- All six live XLSX files were served as text/plain despite byte-identical, valid workbooks. Add the correct spreadsheet MIME mapping and attachment disposition in .htaccess. Workbook contents remain unchanged. Live header verification is required after deployment.

## Checks completed before release

- Full live crawl: 193 routes, 188 sitemap entries, no reported route/canonical/indexability/link issue. The three existing conditional Pro-analysis fragment checks remain deferred as before.
- Unknown test URL returns a real HTTP 404. Explicit index.html, apex/www and HTTP destinations preserve paths/queries. Slashless directory resolves to its existing slash URL. Query states keep clean page canonicals.
- Tested Googlebot, OAI-SearchBot, Bingbot and PerplexityBot user-agent requests received 200 for the representative calculator. This is not verification of a real crawler's source IP or unrestricted access from every network.
- Connected sitemap status reports no errors/warnings and last download October 14. Submission/processing is not proof that every page is indexed; no URL Inspection data is available through the connected report used here.
- All six workbook downloads match source bytes and have valid ZIP/XML structure; imported/recalculated through Artifact Tool with no formula-error matches. Cleaning monthly-budget example independently reconciles profit 2308/459.2, required jobs 69/73 and a zero-visit profit of -10240. Cash-forecast sample reconciles 15000 closing cash and zero reserve shortfall. No native Excel application certification is claimed.
- Ordinary API-based PageSpeed requests returned quota 429. The official PageSpeed web interface successfully ran the five requested representative mobile reports instead.

## Official mobile Lighthouse observations before this release

All five used the reported emulated Moto G Power / Slow 4G setup on October 16. These are individual lab observations. The reports show No Data for real-user field experience, so field Core Web Vitals/INP are not certified.

| Page | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 95 | 100 | 100 | 100 | 2.2s | 0ms | 0 |
| Directory | 90 | 100 | 100 | 100 | 2.7s | 0ms | 0 |
| Pricing | 89 | 98 | 100 | 100 | 2.9s | 0ms | 0 |
| Restaurant budget guide | 85 | 100 | 100 | 100 | 3.4s | 0ms | 0 |
| Cleaning industry calculator | 92 | 100 | 100 | 100 | 2.8s | 0ms | 0.016 |

Reports observed:
- https://pagespeed.web.dev/analysis/https-mybreakeven-com/0kpeshpjvq?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-tools/zihn6m194e?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-pricing/8duvb4ua1f?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-blogs-restaurant-budgeting/do4de22fh7?form_factor=mobile
- https://pagespeed.web.dev/analysis/https-mybreakeven-com-calculators-cleaning-business-break-even-calculator/amp9w88wun?form_factor=mobile

Bounded remaining diagnostics include shared render-blocking CSS and unused route JavaScript/CSS. These are lab opportunities, not a failed field-vitals assessment. Do not perform an unrelated route/SSR architecture rewrite solely for a perfect score. Rendering, crawlable content, formulas, account limits, checkout and shared navigation are preserved.

## Release acceptance

Five new regression checks cover responsive asset dimensions/size/existence, actual directory/industry SSR markup, unknown-image fallback, the restaurant guide candidate and pricing heading order. Require full tests, production build, rendered-route audit, the 162-cover image audit, CI, deployment and scoped live verification before marking this task live.
