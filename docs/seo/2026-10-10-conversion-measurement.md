# Consent-based calculator funnel measurement — 10 October 2026

Added `calculator_use` on a visitor's first input edit or cost-builder application per mounted calculator, on the home and industry calculators. Initial examples, imported scenarios, blur normalization and reset buttons do not trigger it. When analytics consent is absent, a subsequent interaction can retry after consent. Repeated edits after an accepted event are deduplicated.

Added `signup_request_accepted` after the signup API returns without an error. This measures accepted requests, not verified accounts or unique new users; an existing-account response can also be accepted. Login and password-reset requests are excluded. No email, password, financial value, scenario identifier or form content is sent. Existing consent and event allowlist controls apply.

Validation: 466 tests across 45 files pass; production build succeeds. GA4 report visibility and delivery to Google's servers require authenticated GA4/Realtime verification. Consent refusals are deliberately excluded from measurement. No GA4 key-event configuration was changed.

PR99 deployment was successful and the live break-even example serves the revised heading and cleaning worksheet link. Social publishing remains subject to Make connection and publication-history reconciliation; uncertain attempts must never be automatically resent. Google Search Console login/inspection remains deferred after the prior gateway failure. Paid work remains paused.
