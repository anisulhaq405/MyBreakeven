# Homepage performance, 5 October 2026

The supplied PageSpeed reports scored desktop 99 and mobile 86 (mobile FCP 2.9s, LCP 3.0s, Speed Index 4.7s, TBT 0ms).

## Changes

- Serve Inter and Sora WOFF2 subsets from Vite's hashed assets instead of Google's external CSS/font hosts. Preload the Latin Sora face used by the hero. Preserve international subsets, font-display swap and OFL license files.
- Include hashed WOFF2 assets in the existing one-year immutable cache policy.
- Load the account SDK from the shared header only for stored sessions, account routes and authentication callbacks. Listen for cross-tab session storage changes so public tabs still update after login. Storage hints only trigger SDK loading; the SDK still validates/refreshes sessions.
- Defer route-specific article, blog, industry and account styles to the Pages bundle. Preserve later shared presentation overrides in that bundle to retain the original cascade.
- Start optional monitoring after the window load event, then use the existing idle callback/timeout. Its privacy configuration remains in sentry.js.

## Validation

- npm test: 318 passing tests across 34 files.
- npm run build: production HTML and all routes generated successfully.
- Browser checks on seven routes at 390px and 1280px: no JavaScript exceptions or horizontal viewport overflow; all compared text/control geometry and styles match the baseline when using the same fonts.
- Guest homepage does not request the account SDK. A simulated persisted session storage event loads it and changes the account link to Dashboard. Mobile menu and cost builder open successfully.
- Controlled local mobile Lighthouse: FCP 2.42s -> 1.96s; LCP 2.72s -> 2.42s; initial transfer 257,073 -> 219,070 bytes. Final local scores: mobile 96, desktop 100. Baseline font delivery was mocked with the same local font files to isolate code/CSS changes. The baseline aggregate score is unavailable because its screenshot metric failed. These are local lab results, not new live PageSpeed Insights scores.

## Font provenance

Google Fonts CSS served Inter v20 and Sora v17 on 5 October 2026. The original OFL licenses are included in public/font-licenses. Sources:

- https://fonts.googleapis.com/css2?family=Inter:wght@400..800&family=Sora:wght@600..800&display=swap
- https://github.com/google/fonts/tree/main/ofl/inter
- https://github.com/google/fonts/tree/main/ofl/sora

## Follow-up

Re-run mobile and desktop PageSpeed Insights after Hostinger serves the new hashed assets. Check Cache-Control on a WOFF2 resource and preserve the font preloads when changing generated HTML. Avoid interpreting one lab run as real-user Core Web Vitals.
