# Homepage calculator hero design — draft

Owner asked to modernize the attached homepage calculator hero while preserving all core values. CSS-only refresh: navy/mint summary card, clearer primary monthly target, two supporting metrics, white input workspace, accessible focus states, responsive single-column layout and desktop sticky summary. Removes obsolete hero-specific rules from shared styles.css; essential current rules live in home-presentation.css. Shared header/footer rules and all JSX/copy/engine/defaults/account/billing remain unchanged.

661 existing tests pass. Production build passes; 196-route/191-sitemap audit has zero issues. Every delivery budget passes; home declared CSS is 20,594 gzip bytes versus frozen baseline 20,286 (within 3% budget). No new external assets, animation or libraries. Browser visual/interaction QA remains unverified because a local browser is unavailable.

A self-contained working HTML preview was prepared from the same existing hero JSX, calculation engine and styles, with isolated default state and no account/checkout configuration. It is not a replacement production build. Desktop/tablet/mobile frame controls allow owner review.

Not deployed. Keep as a draft PR until owner requests release.
