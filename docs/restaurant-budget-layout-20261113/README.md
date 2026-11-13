# Restaurant budget presentation fix

Scope: the three user-supplied screenshots on /blogs/restaurant-budgeting/.

The shared table rule `td:last-child {white-space:nowrap}` made narrative descriptions force wide tables. A restaurant-only article class now scopes presentation overrides to the resource picker and record-based calculations. Their text wraps into cards, with source/check labels retained. The 20 scenarios use four ticket groups and 20 semantic cards; every case retains ticket, food cost, contribution, exact orders, whole orders, daily orders and whole-order sales. No horizontal scrolling or hidden columns is required for these three sections.

No financial engine, article registry record, formula, scenario data, download, URL or SEO metadata changes. Other articles and landscaping scenario markup retain their existing presentation. Release checks retain all 20 scenario IDs and assert four ticket groups and 20 cards. Validate desktop and mobile content widths in the browser, plus the existing regression and production release checks.

Verified: production build and 1,250 tests pass; all three target regions have scrollWidth equal to clientWidth at 320px and 390px iframe widths, plus desktop. All 20 scenario cards and every source-record value remain present. Ecommerce, cleaning, landscaping and restaurant release checks pass.
