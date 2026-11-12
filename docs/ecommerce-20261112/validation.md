# Release validation — ecommerce calculator, 12 November 2026

- Entire existing test suite plus new economics cases: 160 files, 1,231 assertions passed locally. Subsequent target-only tests cover the final explanatory copy changes; the same complete suite is required again by PR and deployment workflows.
- Protected-scope test hashes every current blog object, all seven other industry calculator SSR renderings, and the shared engine, industry defaults, ecommerce examples and quick-to-full transfer source against main `48dc7b4`.
- Independent original-order cohort reconciliation, decimal order-ceiling boundary, no recoverable stock, refunded fees, 100% refunds, zero contribution, zero planned orders, invalid/overflow inputs, capacity, upward-cent required price, and public competitor examples tested.
- Production build passed; calculator acceptance checks canonical, no noindex, 15 schema/visible FAQ questions, one H1, unique IDs, internal links and November 12 review date / sitemap lastmod.
- Built-site inventory: 292 routes, 287 sitemap URLs, no route/link issues. Existing deferred interactive Pro anchors are recorded separately.
- Real Chromium UI checked at 390px and 1280px embedded viewports. Mobile body 375px and scroll width 375px after correcting an unintended global header-style collision. Scenario tables scroll internally.
- UI: worked example contribution 30.45, operating 99, owner coverage 132, full target 148; no product recovery changes contribution to 26.45 and target to 171. 100% refunds gives no viable target. Blank price gives validation instead of NaN. Reset works. Quick handmade jewellery example retains contribution 40.96, target 73 and revenue 4964.
- Top-level browser CSV downloaded and parsed: 63 lines, contribution 30.45, targetOrders 148, returnRate 10. Currency changed to PKR while preserving contribution 30.45, confirming label-only behavior.
- A browser automation attempt inside the mobile iframe timed out on currency selection / quick continuation; top-level currency and CSV work. Shared transfer source is unchanged and existing transfer regression tests pass. No claim of a successful new iframe-transfer test.
- Google exact top-three order remains unverified because the browser received a human-verification page. Competitor selection and evidence limits are in `competitor-review.md`.
