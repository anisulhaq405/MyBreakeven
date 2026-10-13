# Margin versus markup widget — 13 October 2026

Owner: `/blogs/margin-vs-markup/#margin-calculator`.

A validated USA calculator query is implemented inside the existing guide, retaining its URL and original publication date. The component compares cost-based markup with price-based margin, tests the collected price after discount and solves either target percentage. It rounds the selling-price floor upward to cents, then rounds the list-price floor needed to preserve that price after the entered discount. Losses remain visible; zero denominator percentages remain undefined. The cost basis is explicit, and percentage selling fees and monthly overhead are handled by linked tools rather than silently included.

The guide has calculator/formula/example/worksheet/FAQ shortcuts, revised descriptive title and summary, a discount-adjusted target-price example, and a WebApplication node alongside its existing article and seven FAQ entries. Discount break-even and price-increase tools provide contextual incoming links. No new URL, currency variant, image reuse or locked-engine change is introduced.

## Examples and validation

- Cost 70, price 100: 30% margin and 42.8571…% markup.
- The same sale at 20% off: collected price 80, difference 10, margin 12.5%. A list price of 125 collects 100 and preserves a 30% target margin.
- A 30% markup on cost 70 creates a 91 price and about 23.08% margin; it does not create a 30% margin.
- Cost 50, margin 45%: price floor 90.91. At 17% off, the list-price floor preserving that rounded selling-price floor is 109.54.
- 526 tests across 50 files passed, including 11 pricing boundary/rounding tests. Production build and 191-route audit passed.
- Widget markup is prerendered; one H1, unique IDs, working fragment targets, seven FAQ entries and the embedded WebApplication ownership were verified.

Formula reference: https://www.accountingcoach.com/blog/gross-margin-markup

Competitor inspection: QuoteGenio provides base margin/markup and target-margin pricing; Moda already offers several reverse modes, discount effects and zero-cost boundaries. Those basic features are not claimed as unanswered market gaps. This release adds a discount-adjusted rounded list-price floor to the existing MyBreakeven guide and its cost-definition, spreadsheet and break-even context.

- https://quotegenio.com/markup-vs-margin-calculator
- https://moda.app/tools/margin-markup-calculator
