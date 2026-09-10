# Formula Lock - Engine 1.0.0

The deterministic calculation engine, industry input definitions, rounding rules, and golden tests are a protected product boundary.

- Do not change src/engine.js or financial fields in src/industries.js during design, SEO, blog, or content work.
- Any formula change requires a new engine version, updated golden fixtures, backward-compatibility review, and qualified accounting review before release.
- AI explanations may only summarize values returned by the engine. AI must never calculate or replace deterministic results.
- Capacity is a hard feasibility constraint. A positive contribution margin does not imply feasibility when capacity is below required volume.
- Defaults are examples, not benchmarks or promises. User-entered assumptions remain the source of each result.
