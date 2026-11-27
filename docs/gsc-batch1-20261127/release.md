# Crawl discovery and download indexing — Batch 1, 27 November 2026

The owner authorized Batch 1 from the fresh GSC analysis: download policy, the priority ten business owners, contextual discovery paths and verification of the previously reported prime-cost redirect. This release creates no public URL and makes no title, meta description, formula, default, cover or article-date change.

## Implemented scope

- Add `public/downloads/.htaccess`: `X-Robots-Tag: noindex` for downloadable XLSX, DOCX and CSV files only. The policy is confined to the downloads directory, including query-string variants of a matching filename. Existing MIME types, attachments, file bytes and public download links remain intact. HTML worksheets keep their own meta rules; PDFs, images and media are not covered. Robots.txt stays crawlable so Google can read the header.
- Add six concise existing-guide next steps, rendered directly in server HTML: fixed/variable → activity-based costing; COGS → current assets; operating expenses → accrued expenses; target-profit → pricing strategies; ecommerce pricing → cost-plus pricing; margin/markup → penetration pricing. Each explains the next distinct reader decision rather than inserting a keyword-only link list.
- Retain the seventh proposed path: financial-statement analysis already links to retained earnings in the complete live renderer. No duplicate addition.
- Recheck the ten canonical business owners in `inspection-queue.json`. All pass normal public 200, self-canonical, indexability and sitemap checks before release. Existing primary topics and industry groups are retained. Public response tests are not relabeled as Google inspection.
- Recheck the no-slash prime-cost URL. It already returns one 301 to the slash URL, then 200/self-canonical. No redundant redirect configuration is introduced.
- Preserve the eight intentional noindex utility/worksheet paths and eleven homepage/blog parameter canonical variants. These are not targets for forced indexing.

The complete normalized 243-article and 34-tool baselines are preserved. The six additions are scoped renderer components, so original teaching examples, metadata, modification dates and existing calculator definitions remain unchanged. The helper suppresses an addition if its destination is already in the article body or selected topic connections.

## Validation and release gates

Require the full regression suite, production build, built route/link audit, cluster and search audits, delivery budgets, and `qa-gsc-discovery-batch1.mjs`. The latter runs in both PR and production verification and checks the copied directory header file, six rendered paths, retained seventh path, ten canonical owners and protected utility pages. Local serving cannot prove Apache/LiteSpeed response headers; live checks after production deployment must verify those separately on all twelve reported file variants and on unaffected HTML/PDF controls.

Before-release public evidence is in `public-before.json`; it contains no private query metrics or raw GSC exports. All intended paths return 200 after redirects. An initially mistyped PDF test path was replaced with the actual linked one-page-template PDF; it was not a reported site defect.

## Account-side work and honest completion boundary

The user connected OpenSEO during this task. Connection state is confirmed; do not describe it as uninstalled. At this checkpoint no callable OpenSEO/GSC URL Inspection or request-indexing operation was exposed in the available tool registry. Account-side work will be attempted through an available supported route after the onsite release; no request or Google-selected canonical has yet been claimed.

The inspection queue preserves those fields as not inspected/not submitted. Google validation and indexing can only be marked complete from actual account results. Repeated requests do not accelerate crawling. Download noindex may move files between exclusion categories without reducing total excluded URLs; zero exclusions is not the goal. No traffic, ranking or indexing improvement follows automatically from this deployment.

## Primary implementation references

- Google robots meta and X-Robots-Tag: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- Google recrawl requests and quotas: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

The release PR records CI, deployment and post-release HTTP acceptance. Use [skip social] for commit, PR and squash titles; no social publishing or outreach.

## Local acceptance

- 1,535 tests passed across 189 files, including full preservation of all 243 article and 34 standalone-tool records.
- Production build: 328 routes / 322 sitemap URLs. All-route and fragment audit found no issues; three existing conditional Pro anchors remain separately deferred.
- Cluster audit: 81 November new owners, 15 general topics plus 8 industry hubs, and 1,704 unique article edges (six more than the before-release 1,698). The minimum incoming-path requirement remains satisfied.
- Search: 337 public documents; all sitemap owners covered. Image and delivery budgets: zero failures.
- The new built-release gate passed for all six paths, the retained seventh path, all ten canonical owners and the copied download-directory header configuration. Live server-header acceptance remains a deployment step, not an inference from the local static server.
