# Professional founder profile redesign

User request: the first revision remained insufficiently detailed and professional. Preserve Business Planning + Business Development as the focus and use confirmed biography facts.

The founder page now uses a dedicated `FounderProfile` component with fully scoped styles rather than the generic resources-page header and stacked mini-sections. Content includes a concise hero, facts strip, in-page navigation, connected biography and origin story, expanded current-business role, compact earlier career rows, a four-part planning approach, selected work, education, publishing responsibility and contact.

Confirmed facts remain unchanged: Anis Ul Haq; Daily Outfitter owner, started November 2025; planning/development; Accounts Manager in the UAE; Store Incharge in Malaysia; Master's in Business Economics at University of the Punjab, Lahore, 2006–2008; own-business costing, sales and uncertainty motivated MyBreakeven; supplied LinkedIn URL. No employers, employment dates, job duties for the previous roles, success metrics, awards or professional credentials were invented. Existing first-hand case-study evidence limits and portrait disclosure remain.

Design: navy/violet palette, editorial typography, portrait panel, consistent section hierarchy, wide reading column, compact career history, selected-work cards and dedicated contact panel. Tablet and mobile rules stack content, reduce portrait size and preserve usable link wrapping. Styles apply only to the founder component; other authority pages retain their existing renderer. Profile route, H1 identity, original publication date, current modification date and Person/ProfilePage schema remain intact.

Validation: production build and publication checks passed. Static audit: 239 routes / 234 sitemap URLs, zero issues, with existing interactive fragment exceptions unchanged. Dedicated built-HTML checks verified corrected facts, one H1, unique IDs, working local anchors and LinkedIn schema identity.

Full regression passed: 145 test files / 1,125 tests.
