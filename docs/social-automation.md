# MyBreakeven social automation

Status: website source prepared; social account authorization and Make scenario activation are still required. No social posts are sent by this code.

Destinations: Facebook Page `mybreakevenapp`, Instagram `mybreakevenapp`, Pinterest `MyBreakEven1` (choose a destination board during connection).

Every production build creates `/social-feed.json` and `/social-feed.xml`. JSON includes every article and public page, including calculators. Private account pages are excluded. A content revision changes when article content or its image changes, even when an editor forgets to change the modified date. Ordinary rebuilding does not generate a new revision. The feed is a current-state snapshot, not an historical event log; several edits between checks produce one latest-version announcement. CSS, private data and site infrastructure changes are not promotional content. Calculator code changes without visible page changes require an authored announcement.

## Free Make setup

1. Connect Facebook Pages, Instagram for Business, and Pinterest using OAuth in Make. Verify the exact handles above. For the Facebook-login Instagram integration, use an eligible Instagram Business account linked to the Facebook Page. Confirm public images work for Instagram and Pinterest; image conversion/resizing may be needed for their requirements.
2. Create one scheduled scenario. HTTP GET `https://mybreakeven.com/social-feed.json`, then iterate `items`. Use a data store keyed by canonical URL and destination. On first activation, seed existing revisions without posting the entire archive.
3. Compare each destination's saved revision with the current item revision. If different, generate a new-content or updated-content announcement. Facebook uses title, description, canonical link and optional image; Instagram uses a supported image and caption (caption links are not clickable); Pinterest uses image, title, description, canonical destination URL, and selected board. Missing or invalid images leave Instagram/Pinterest pending rather than silently succeeding.
4. Store the successful post ID and revision per destination only after that destination succeeds. Retry failures with backoff. An ambiguous publish timeout must be reconciled against the platform before retrying to avoid duplicates. One destination failing must not resend successful destinations.
5. Test one real article on all three accounts, check the published URLs, then activate the schedule. Make's free plan currently has 1,000 credits/month and a 15-minute minimum interval; an hourly HTTP-only poll already costs about 720 credits/month, before iteration, data-store checks, and publishing. Do not promise this full-catalog polling scenario fits free credits. Prefer a deployment webhook sending only changed items if the posting volume is substantial; that requires a separately configured deployment integration and persistent baseline. Free quotas are not unlimited.

## Activation requirements

- Make account and social OAuth authorizations.
- Pinterest destination board.
- Approved initial baseline (future publications and updates, no archive flood).
- Scenario credit estimate at the actual daily volume; select webhook delivery or self-hosting if the free quota is insufficient.

Never put social access tokens in public source, browser code, or this feed. A feed or RSS reader alone does not enable automatic social publishing.
