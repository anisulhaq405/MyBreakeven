# Free priority-keyword validation — 13 October 2026

Source: signed-out Keywords Everywhere free tools. Organic scores below are provider-specific DA-based difficulty, not Ahrefs KD, Semrush KD or Google ranking signals. Volume was independently cross-checked with Search Volume Checker, explicit country, and `Google Keyword Planner only`. Currency for CPC: USD. No paid units or trial purchase were used.

| Exact query | Country | Monthly volume | KE organic difficulty | DA coverage | Gate: volume >=500 and score <50 |
| --- | --- | ---: | ---: | --- | --- |
| markup vs margin calculator | USA | 590 | 9 desktop | 6/9 results | Pass; implement existing-guide widget |
| employee cost calculator | USA | 880 | 6 desktop | 4/9 results | Pass; next calculator priority |
| cash flow forecast template | USA | 720 | 40 desktop | 7/7 results | Pass; later template candidate |
| employee cost calculator | UK | 720 | 38 desktop | 9/9 results | Pass; additional Tier-1 market |
| cash flow forecast template | UK | 1,000 | 50 desktop | 8/8 results | Fail strict less-than-50 gate |
| markup vs margin calculator | UK | 70 | Not checked | — | Fail volume gate |
| markup vs margin calculator | India | 10 | Not checked | — | Fail volume gate |
| employee cost calculator | India | 90 | Not checked | — | Fail volume gate |
| cash flow forecast template | India | 90 | Not checked | — | Fail volume gate |

KE 12-month trend indicators for the three USA rows were respectively -4%, -29% and -15%. The UK volume batch reported -3%, -13% and -53%. These are demand/difficulty candidates, not verified upward-trending keywords. India's markup and cash-flow queries showed +57% and +11%, but both remain below the 500-volume threshold. Do not extrapolate these findings to unmeasured countries or device types.

The UK inline metrics beside the difficulty check differed from the explicit-country volume batch. The table uses the independently selected UK Keyword Planner-only batch (720 and 1,000); it does not merge the two readings. Partial DA coverage on the USA markup/employee checks is recorded rather than treated as a complete authority audit.

## Reproducible sources

- USA markup KD9: https://keywordseverywhere.com/tools/keyword-difficulty-checker/?job=a7e1805c-06cc-4e1f-a75d-a944566f46c3
- USA employee KD6: https://keywordseverywhere.com/tools/keyword-difficulty-checker/?job=5741acef-7f33-4282-a4e7-e424dca3f650
- USA cash-flow KD40: https://keywordseverywhere.com/tools/keyword-difficulty-checker/?job=55b4f675-ef90-4f34-b140-87ba38fe9301
- UK employee KD38: https://keywordseverywhere.com/tools/keyword-difficulty-checker/?job=67eab800-2620-4e7c-93a7-c14b7d6d50a2
- UK cash-flow KD50: https://keywordseverywhere.com/tools/keyword-difficulty-checker/?job=ad7a5a51-ed94-4ee9-8ae2-a5579114d0ac
- USA volumes/trends: https://keywordseverywhere.com/tools/search-volume-checker/?job=8f6efa5a-bc47-42d0-85a5-86f95bf6b8bf
- UK volumes/trends: https://keywordseverywhere.com/tools/search-volume-checker/?job=25ec16b0-1b47-47b9-b0f1-62e1e7716b4a
- India volume screen: https://keywordseverywhere.com/tools/search-volume-checker/?job=2c6559ba-7ed1-4b37-8f5c-7554067fab06

Five free SERP checks used within the displayed five-check daily allowance. Volume batches stayed within the separate 250-keyword allowance. Semrush returned `no_api_units`; no Semrush metrics are claimed. Ahrefs and Ubersuggest supplied no additional metric in this run.

## Build decision

Implement one embedded widget on `/blogs/margin-vs-markup/#margin-calculator`; retain the existing URL. Competitors already answer the basic denominator and discount questions. The additional user task is preserving a rounded target selling-price floor after a planned discount, alongside cost boundaries, worksheet formulas and relevant break-even tools.

Prioritize Employee Cost per Productive Hour for the next authorized batch: salary plus user-entered employer costs/benefits, productive hours and hiring contribution recovery. USA and UK passed this free gate, but the next build still needs source-backed cost boundaries and a deeper exact-intent competitor review. Do not copy statutory tax rates into a generic international tool without country/date scope.
