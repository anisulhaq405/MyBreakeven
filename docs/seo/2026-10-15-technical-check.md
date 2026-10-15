# Technical check — 15 October 2026

Base: e8a05d6e15418aa980da8ffb8f41f655f94343df. Scope: confirmed technical defects; shared site header/footer, payment integration and financial engine unchanged.

## Findings and fixes

1. Explicit `/index.html` served HTTP 200 instead of redirecting to `/`; nested explicit index files could likewise bypass the clean route selected by the browser app. Add a 301 redirect to the HTTPS apex directory, guarded by THE_REQUEST so Apache's internal DirectoryIndex resolution does not loop. Query strings remain intact. Recheck root, nested, www, and query-bearing aliases after publication.
2. Eight guide clusters had different meta descriptions in the generated HTML and the browser's SecondaryPage registry, including outdated guide counts. Move static route metadata into `src/staticPageMeta.js`; both the generator and browser consume the same records. Preserve private route noindex and keep blog/free-tool metadata ownership unchanged.

## Checks completed before publication

- Full live crawl: 193 generated routes returned HTTP 200, matched their canonical URL and had no unexpected index/noindex signals. The 188 sitemap URLs are internally linked. Local audit found no missing linked assets, broken internal routes/fragments, duplicate titles/descriptions, missing H1, image dimensions/alt attributes or invalid JSON-LD. Three conditional Pro anchors remain explicitly deferred to interactive rendering.
- robots.txt and sitemap.xml returned HTTP 200 with expected content types. HTTP and www reached the HTTPS apex; the pricing route without a trailing slash reached its canonical slash version. Two nonexistent paths returned a genuine HTTP 404. Account callback behavior uses the homepage/recovery routes, not an invented `/auth/callback/` path.
- Installed production dependency audit: zero reported vulnerabilities (not a penetration test).
- 577 tests passed; production build and 193-route static audit passed after the fixes.
- All 30 shared static route title/description records match generated HTML. Private route files retain noindex. Additional temporary happy-dom check mounted each of the eight cluster routes and confirmed title, description and canonical remain unchanged when browser effects run. This is DOM verification, not screenshot QA.

Live asset checks, final CI/deployment and post-release redirect verification are recorded in the release response. No authenticated purchase, Search Console index coverage, field Core Web Vitals or external uptime history was verified in this check. Rollback: revert this release and republish through the standard production workflow.
