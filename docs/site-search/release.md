# Site-wide search — November 17, 2026

## Visitor behavior

The shared header has an accessible Search link on desktop and mobile. `/search/` searches guides, calculators, topic collections and public supporting pages. It displays a content-type label, title, matched excerpt and destination. Type filters show counts; results are ranked, with title matches ahead of body-only matches. There are bounded batches with a Show more control, suggested topics, empty/error states, retry and a no-JavaScript browse alternative. Blog and calculator search boxes now submit to the same whole-site search; their category/topic filters remain local and explicitly described.

Native GET forms support Enter, back navigation and shareable `/search/?q=...` URLs. Queries render as React text, never HTML. Search runs locally against a static public index loaded only when a nonempty search is made, with no added external search service, storage or query analytics. The query can appear in normal browser history and hosting access logs because it is in the URL; no claim of confidential search is made.

## Index and SEO

The build generates `dist/site-search-index.json` from the finished public sitemap and each published page's main content, headings and metadata, plus 15 topic anchors. Every deployment rebuilds it automatically. Menus, scripts and footer boilerplate are stripped. Private account routes, drafts, held OCI and search itself are excluded. Every public sitemap page must appear exactly once; topic links must have real HTML anchors. The payload is fetched on the search route only and is not bundled into every page.

The search page is rendered on the server with its form, links and no-JavaScript alternative. It uses `noindex,follow` and is excluded from the XML sitemap. This setting applies only to `/search/`; existing content's robots rules and canonical URLs are unchanged. Google documents `noindex` at https://developers.google.com/search/docs/crawling-indexing/block-indexing.

The normalizer handles punctuation, case, diacritics, simple plurals and common break-even, cashflow and ecommerce spelling forms. Matching uses word boundaries and all meaningful query terms. It is a deterministic content search, not semantic AI or an automatic spelling-correction engine. New public pages enter the index at the next normal build without a separate manual list.

## Acceptance

Pending final build, whole-suite regression, public-route/link and delivery audits, desktop/narrow-layout interactions and normal PR/deployment acceptance. No existing article content, publication dates, images or calculator engines are edited by this feature.

### Local acceptance completed

- 1,410 tests / 173 files passed, including new ranking, content-only match, word-boundary, query handling and shared-entry tests.
- Production build and search audit passed: 311 public documents; all 296 sitemap pages plus 15 topic anchors. 302 built routes have no broken internal links. No image or delivery-budget failures; homepage declared CSS is 20,873 gzip bytes against the existing cap.
- Obsolete, unreferenced legacy footer-class styles were removed to keep the new shared-header affordance inside the unchanged delivery budget. Search form/results styles remain route-specific.
- Browser: desktop title-ranked payroll results, content type filtering, no-match state, header access, native blog and calculator forms (including Enter), query URLs and 337 CSS-pixel layout checked. No document horizontal overflow at either width. Narrow review used browser zoom, not physical-device emulation.
- Normal PR checks, production deployment and live URL acceptance remain pending.
