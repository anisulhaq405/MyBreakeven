# MyBreakEven website-to-social publishing

Make scenario: https://eu1.make.com/3058803/scenarios/7785813
Destinations verified: Facebook MyBreakeven, Instagram @mybreakevenapp, Pinterest MyBreakEven1; Pinterest board 1092263784567432487.

Every build produces revision-aware JSON/RSS feeds for articles, calculators and public pages. Local feature images become public 1200×630 JPEGs. Private account routes are excluded. Changes to authored content/images cause announcements; ordinary rebuilds do not. JavaScript-only calculator changes require an authored announcement. This is a snapshot, so intermediate edits between deployments collapse into the latest version.

The production workflow waits until Hostinger serves the exact feed revision, then invokes Make separately for each destination. Configure repository secret MAKE_SOCIAL_WEBHOOK_URL. The URL is a credential; never put it in source. Social OAuth credentials stay in Make. Webhook route selection uses the learned kind field (facebook/instagram/pinterest). The response contains the platform post ID and revision.

Durable per-URL/per-destination state is stored in the separate social-publish-state Git branch. First execution seeds a baseline without archive flooding; only the configured SOCIAL_FIRST_TEST_URL is posted as a launch test. Published revisions are skipped on subsequent deployments. An attempted publication is reserved in Git BEFORE the HTTP call. A failed/ambiguous request is marked needs_review and is never automatically resent, since it may already have published. Other destinations still proceed. Reconcile Make execution history and the platform before resetting a failed record or recording its successful ID. Unresolved records make the workflow fail visibly, even if the site itself deployed successfully. Do not delete or overwrite the state branch.

Production concurrency is serialized. Git push permission for the state branch is required. Live-site delay has a 30-minute limit; no posts are sent before the exact feed is live. Missing JPEGs remain pending. No automatic retries after an uncertain publish. This avoids duplicates but means failures require review. Build/website failure before publication does not announce unavailable content.

Make credits are consumed only for events, with a publishing action and webhook response per destination plus the trigger. Actual quota depends on volume; no unlimited-free guarantee. Instagram caption links are plain text. Keep Make scenario active and social OAuth current. Never rerun the one-time board creation scenario.
