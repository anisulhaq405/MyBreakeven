# October 27 — Googlebot crawl diagnosis + Restaurant Budgeting search-intent competitor review

## Priority / guardrails
Preserve 15-day no-new-public-URL freeze (Oct 26–Nov 9). Site: `https://mybreakeven.com/`. No new blogs, calculators, pages, page consolidation or noindex experiments.

## Crawl-log investigation (what was actually verified)
- Production is built by `.github/workflows/deploy-hostinger.yml`: `npm run build`, route audits, publishing `dist` to `hostinger-deploy` branch. This workflow **does not contain** server access logs / Googlebot request telemetry.
- Public `robots.txt` in source allows generic crawlers as well as OAI-SearchBot / GPTBot, and identifies `https://mybreakeven.com/sitemap.xml`. This alone does not verify that any bot requested a URL.
- Owner-supplied Oct 26 GSC Coverage export: 45 `Discovered – currently not indexed` URLs; these are not the same as `Crawled – currently not indexed`. October 26 live recovery pass checked 45/45 sitemap, HTML, canonical and robots, without establishing HTTP response-header / origin logs.
- HTTP request logs cannot be retrieved from current connected GitHub/Windsor.ai endpoints. **No evidence** yet of Googlebot requests, crawl rate, 403/429/5xx errors, or Googlebot IP verification. Do not claim bot crawl errors exist or do not exist.
- Next actual evidence needed: from the origin/Hostinger or fronting CDN, HTTP access logs for Oct 1–27 with timestamp (UTC), request path and method, status, duration, User-Agent, IP, edge/origin indicator. Validate Googlebot IP via Google-documented forward+reverse DNS or published ranges; user-agent alone can be spoofed. Do not commit IP-level raw logs to a public repository.
- Analyze hits to exact 45 GSC paths + sitemap + robots: first/last request, per-path requests, HTTP response codes, 304/redirect chains, 4xx/5xx, and lag to indexing. Determine where a CDN could serve a response without reaching origin logs.
- `restaurant-prime-cost` non-trailing-slash had GSC redirect error: verify actual HTTP redirect chain in a server/network-capable environment before touching rules.

## Restaurant Budgeting — quantitative evidence (GSC Sep 27–Oct 26)
Page: `/blogs/restaurant-budgeting/`. Query/URL-specific:
- `restaurant budget template`: 47 impressions, avg pos 22.47.
- `restaurant budgeting`: 36 impressions, avg pos 36.14.
- `restaurant budget example`: 26 impressions, pos 25.81, 1 click.
- `restaurant monthly expenses`: 26 impressions, pos 20.46.
- `how to create a restaurant budget`: 24 impressions, pos 44.33.
- Daily page trend 1 Oct pos 9.86 on just 7 impressions; 24 Oct pos 40.38 on 16 impressions. Different query mix limits causal interpretation.

## SERP comparison (verified Oct 27)
- Toast `https://pos.toasttab.com/resources/restaurant-budget-template` offers budget vs actual and category spend, but requires lead form. Vendor authority and commercial distribution matter; these aren't replicable by word count.
- Smartsheet `https://www.smartsheet.com/content/restaurant-budget-templates` offers monthly and annual restaurant budgets across Excel, PDF, Word/Google Sheets and previews.
- Tableview `https://www.tableview.com/blog/restaurant-budget-template/` offers a 12-month workbook and PDF with assumptions + monthly/annual budget + comparison, with illustrated 70-seat example.
- MyBreakeven already provides prominent *free one-month Excel*, independently checked $60k example with budget vs actual, month-end variance, illustrative annual calculation, original 20-scenario downloadable model and restaurant calculator. No factual basis to claim missing formula/explanation or no downloadable workbook.
- Gap: competitor templates sometimes have 12-month editable tabs / multi-format downloads, which our current one-month template does not. **Do not misrepresent our existing workbook as 12-month**; user chose no new pages, but changes to existing downloads could be considered later after separate QA.
- Today's scoped content change adds a small resource-picker table next to the existing download section, distinguishing (1) Excel monthly workbook, (2) inline 12-month example and (3) different 13-week cash-flow calculator. It preserves original article/math/URL.

## Acceptance
Run full GitHub tests, production build, route/image audits and live HTML verification. Keep 233 sitemap URLs and 161 editorial blog slugs unchanged. Do not claim index/ranking improvement before independent GSC observations on comparable dates.
