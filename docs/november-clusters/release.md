# November topic clusters and crawlable reading paths

Owner scope: organize all November-published blogs, review internal linking and improve crawler discovery. Inventory on 11 November 2026: 53 newly published November guides and 71 older guides updated in November. All 124 receive topic-return and contextual next-reading navigation. The taxonomy assigns all 215 published guides to one primary owner: 13 general business/finance subjects and eight existing industry hubs.

The business subject hubs are sections of the existing `/blogs/` page, with stable `#topic-…` anchors and ordinary HTML links to their members. No new thin hub URLs, query-index pages, redirects or duplicate article URLs are introduced. A topic selector filters the visual directory; the full unfiltered subject links are present in generated production HTML independently of that selector. Existing eight industry hub routes are reused. Landscaping working capital and the restaurant calculator walkthrough are added to their relevant existing hub groups.

All article objects remain unchanged, verified against the 215-record SHA-256 baseline. Publication dates, substantive modification dates, body content, metadata, images, FAQ data and canonical ownership are preserved. New navigation is rendered by the shared article templates. Non-November articles retain their prior related-reading behavior. Existing finance-topic exports and their established tests remain available.

Contextual reading paths choose nearby methods within the assigned topic or industry subgroup, then appropriate cross-topic bridges. Each link carries the destination title and a short description of its purpose. The selector excludes self links, repeats, already-linked HTML destinations and structured section links. Topic return links appear near article tags; connected methods appear after the article body. The previous two-card related box is suppressed only on these 124 articles to avoid a second competing navigation block.

## Validation

- 1,222 tests in 159 files pass, including strict preservation of every prior article record, complete ownership, November coverage and link deduplication.
- Production graph compared with the prior deployed build: 1,354 unique directed article-to-article edges, including 332 newly added edges. Replacing the old related box removes 29 former edges, for a net increase of 303. Every one of the 53 new November guides has at least three incoming links from other articles. Counts exclude repeated anchors from the same source and exclude hub-only links.
- 292 generated routes and 287 sitemap URLs retain their inventory; route/fragment, canonical, image and payload checks pass.
- Browser checks cover topic jumps, filtering eight investment guides, opening WACC, returning to its subject section and narrow layouts. A filter intrinsic-width overflow found at 337 CSS pixels was fixed; both hub and article document widths match the 337-pixel viewport. Browser zoom was restored. This is a narrow-layout check, not device emulation or a Lighthouse claim.
- `qa-november-clusters.mjs` validates all 124 built articles, their hub returns, matched hub membership, static contextual links and the minimum two incoming-article paths for each new November guide. It runs in PR and production workflows.

Google Search Central's crawlable-links guidance was consulted: https://developers.google.com/search/docs/crawling-indexing/links-crawlable . The release uses descriptive standard anchor links. These are measured structural improvements; no indexing, traffic or ranking gain is asserted by release verification alone.

Deployment and live acceptance follow the normal GitHub-to-Hostinger workflow after green checks.
