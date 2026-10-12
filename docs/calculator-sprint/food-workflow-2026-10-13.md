# Recipe, food-cost and menu-pricing workflow — 13 October 2026

Baseline: 1a71d80 (PR114). User authorized new calculator pages after existing content/calculator improvements and three detailed finance guides.

## Three new routes

| Page | Question and result |
|---|---|
| `/calculators/recipe-cost-calculator/` | Purchase packs, compatible units and usable yield → batch ingredients, per-selling-unit costs and contribution. Includes a whole-cake preset; no separate cake URL. |
| `/calculators/food-cost-calculator/` | Matched period inventory/purchases/credits and food sales → actual food ratio and optional theoretical variance. |
| `/calculators/menu-pricing-calculator/` | Ingredient-target vs contribution-target price → monthly funding requirement, expected contribution, whole sales/capacity and capacity funding price. |

The independent `foodCostEngine.js` version 1.0.0 shares definitions across these pages. Core industry and existing decision-tool engines, auth, billing and entitlements are unchanged. No duplicate ROAS page. Focused-tool inventory becomes 16; eight existing industry pages remain (24 dedicated calculator routes total).

## Calculation and interaction boundaries

- Weight, volume and count convert only within the same dimension. No cups, Imperial liquid ounces or density inference. The selected unit describes the entered quantity; dropdown changes do not rewrite the quantity.
- Usable yield is applied once. Variable batch labor/other costs allocate once; packaging is per selling unit. Period inventory consumption already includes losses reflected in stock.
- Percentage margin is a share of price, not markup. Fee plus target contribution percentage must be below 100%. Price floors ceil to cents; required units ceil and capacity floors after 52/12 conversion.
- Nonpositive contribution remains visible and has no positive recovery target. Zero price leaves recipe percentage results undefined. Missing theoretical usage differs from deliberate zero.
- Optional recipe-to-menu transfer uses a one-time session-storage cost summary and preserves the currency label. Ingredient names do not transfer. Malformed, unsupported or invalid data falls back to the example. Storage denial blocks navigation with a visible explanation; no account transmission.
- One-unit recipe transfer has a disclosed illustrative scope: $400 fixed costs, $1,800 additional profit, no repeated owner-pay allowance, 40 expected units and ten weekly units of capacity. All amounts and capacity must be reviewed; batch labor already funds the stated production work.
- Whole-cake example: $19.70 ingredients + $54 labor (three active hours at $18) + $4 packaging + $5 other = $82.70 variable cost. At $130 and 3% fee, contribution is $43.40. A $2,200 funding requirement needs 51 whole cakes; capacity is 43 whole monthly cakes. This demonstrates a capacity gap, not a recommended market quote.

## Guidance and discovery

Every page includes purpose, input steps, formulas, worked examples, limits, six FAQs and method references. Existing restaurant illustration reused with truthful caption. Free-tools hub adds a Food & recipes filter; restaurant hub and two existing food/menu guides link into the workflow. Only contextual links and truthful modification dates change on those guides.

## Free-source review

Public search found substantial existing recipe/menu/cake functionality. This release does not claim ingredients, labor, units or yield are absent from competitors. The explicit period-versus-recipe scope and monthly whole-capacity funding check connect the existing MyBreakeven workflow.

Original 12 October keyword snapshot: food cost passes a Ubersuggest SD24 check; recipe cost KE18; menu pricing KE35. Those are source-specific dated difficulty measurements, not interchangeable current Google scores or traffic guarantees. Cake is a preset, not a fourth keyword URL. No paid tool/trial used.

References: [RestoMetrics recipe tool](https://restaurantmetric.com/tools/recipe-cost-calculator), [BakeProfit cake tool](https://bakeprofit.com/tools/cake-pricing-calculator), [NIST unit conversion tables](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9), [SBA break-even method](https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point). Examples are independently constructed. This is not a claim of professional accounting certification or exhaustive competitor superiority.

## Checks

514 tests across 48 files passed, including 46 new engine/transfer cases. Production build passed. Static audit: 191 routes, 186 sitemap URLs, zero reported issues (existing conditional Pro fragments deferred). Three new pages have visible/schema FAQ parity, default results, complete input forms and stated engine version. Existing protected financial files checked unchanged. CI, deployment and live interaction checks are recorded after publication. Release/merge use [skip social].
