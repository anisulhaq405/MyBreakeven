# Formula Lock - Engine 1.2.0

The deterministic calculation engine, industry input definitions, rounding rules, and golden tests are a protected product boundary.

- Do not change src/engine.js or financial fields in src/industries.js during design, SEO, blog, or content work.
- Any formula change requires a new engine version, updated golden fixtures, backward-compatibility review, and qualified accounting review before release.
- AI explanations may only summarize values returned by the engine. AI must never calculate or replace deterministic results.
- Capacity is a hard feasibility constraint. A positive contribution margin does not imply feasibility when capacity is below required volume.
- Exact break-even units, revenue, leads and capacity retain fractional precision. Whole-unit ceilings/floors are returned separately for operational planning and never replace the exact financial result.
- Monthly capacity uses 52 / 12 weeks rather than the rounded 4.33 approximation.
- Engine 1.2.0 performs intermediate arithmetic with decimal.js at 40-digit precision and converts values to JavaScript numbers only at the UI output boundary.
- Defaults are examples, not benchmarks or promises. User-entered assumptions remain the source of each result.
