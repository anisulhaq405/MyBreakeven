# Check 5 technical SEO, indexing and internal links — 2026-10-30

**Gate:** Check 4 findings approved; outstanding Check 4 production QA remains unresolved. No Check 6 work authorized.

## Verified against hostinger-deploy branch
- Production sitemap.xml lists 233 URLs (distinct from static source public/sitemap.xml which lists fewer; evaluate the generated production artifact for public coverage).
- Six targeted pages are all listed in generated sitemap.
- All six generated HTML pages have own absolute self-canonical and meta robots index,follow.
- All six link internally to existing guide/calculator URLs in production sitemap. Unique relevant in-content guide/calculator link counts: Target Profit 5; Contribution Margin vs Profit Margin 4; Margin of Safety 7; Operating Leverage 4; Restaurant Budgeting 7; Restaurant Food Cost Percentage 8. None of those links point to routes missing in the generated sitemap.
- robots.txt declares Allow / for general crawlers and sitemap https://mybreakeven.com/sitemap.xml.
- Restaurant Budgeting published page still has contradictory text 'not a separate editable 12-month file', despite Check 4 corrected main-branch source. That issue is a *pending Check 4 deployment*, not a new Check 5 correction. Do not mark it published.

## Indexing limits
- Prior owner-supplied GSC export showed 45 Discovered — currently not indexed. That is not proof of a crawl block.
- This session has no authenticated URL Inspection verdict or verified Googlebot origin/CDN access log, so no last crawl, Google-selected canonical, 403/429/5xx diagnosis or submitted indexing requests can be claimed.
- Public HTTP fetch of robots/sitemap/site was unavailable in this session; GitHub generated artifacts do not prove Hostinger live response headers or redirect chains.
- Separate 'restaurant-prime-cost' non-trailing-slash redirect issue requires real HTTP chain before a redirect rule change.

## Action
No proven sitemap/canonical/internal-link defect on six pages. Avoid unnecessary mass linking or duplicate anchors. No source changes to indexing, robots, canonical, redirects or site architecture.
Outstanding next evidence: native GSC URL Inspection on selected discovered URLs; request logs with verified Googlebot identity from Hostinger/CDN; live response-header and redirect-chain checks; confirm Check 4 release separately.
Owner approval required before Check 6.
