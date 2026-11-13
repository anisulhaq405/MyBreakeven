# Food cost period calculator review — November 13, 2026

Target: https://mybreakeven.com/calculators/food-cost-calculator/

Preserves the established inventory-period intent, canonical URL, title, artwork and links to separate recipe and menu-pricing tools. The existing shared recipe/menu rendering and legacy engine remain unchanged. All 215 blog records and every other tool metadata record are frozen by SHA-256 baselines. Publication uses [skip social].

## Research

Three relevant search results examined (not a claim of fixed Google top-three positions):
- Restaurant365, https://www.restaurant365.com/blog/food-cost-equation-and-calculator/ — inventory equation, matched sales and actual versus theoretical interpretation.
- Kitchen on Hand, https://www.kitchenonhand.com/tools/food-cost-calculator — period inventory bridge and separate plate pricing; supports clear scope boundaries.
- Lightspeed, https://www.lightspeedhq.com/resources/retail/food-cost-calculator/ — per-dish ingredient and desired-margin focus. This page retains period reconciliation rather than duplicating our recipe tool.

Primary method sources checked:
- BCcampus, https://opentextbc.ca/basickitchenandfoodservicemanagement/chapter/monthly-food-costs/ — physical inventory, consistent cost valuation, transfers and meal expense reclassification.
- Penn State, https://psu.pb.unizin.org/hmd329/chapter/ch12/ — food consumed versus food sold, ingredient cost of meals rather than menu prices.
- Restaurant365 product documentation, https://docs.restaurant365.com/docs/theoretical-vs-actual-report — sold mix/POS history, transfers, price basis, actual/theoretical comparisons.

No industry averages, guaranteed savings or automatic integrations are claimed. The chosen 30% default target and every example amount are fictional. Reclassified costs remain other expenses, not eliminated costs. Discounts do not justify expense reclassification.

## Model

Net purchases = gross received purchases − credits. Available = opening + net purchases + transfers in − transfers out. Gross usage = available − closing. Adjusted usage = gross usage − documented staff meal reclassification − documented complimentary-food reclassification. Both gross and adjusted percentages use matching positive net food sales. Supplier returns must not be duplicated as transfers. Moves within the counted inventory scope are excluded.

Theoretical usage represents the actual paid mix on the same adjusted scope and valuation basis. Actual–theoretical gap is signed; percentage-point gap divides it by sales. Recorded waste is already in usage. It is explanatory only; gap minus waste is a signed remainder which can reflect offsetting differences, not a measured loss/theft claim. Waste cannot exceed adjusted usage. Negative net purchases are allowed with a warning when credits relate to opening stock; negative gross or adjusted usage is rejected.

Target allowance = sales × chosen rate; actual minus allowance is a signed comparison. Sales at unchanged total usage = adjusted usage ÷ rate, rounded upward to cents. It holds usage constant and is not a sales/demand/pricing forecast. Sensitivity independently tests 5% lower usage at fixed sales and 5% lower sales at fixed usage. No causal claim or cost-saving promise.

All 12 fields validate finite nonnegative decimals ≤1e12. Three optional fields accept explicit blank as unknown; zero theoretical and waste remain stated zeros. Target must be >0 and ≤100. Results above absolute 1e15 are rejected. Decimal precision40; displayed money cents and rates two decimals. No premature rounding; CSV preserves unrounded decimal values. Currency labels do not convert amounts. Inputs remain in React tab state; no account data persistence. CSV and print explicitly export the chosen scenario.

Default: usage20000, adjusted20000, food33.333…%, theoretical18200, gap1800/3pp, waste600, remainder1200. Target30% → allowance18000, target gap2000; unchanged-usage sales66666.67. Transfers500in/300out, staff400/comps200 → gross20200, adjusted19600, gross33.666…%, adjusted32.666…%, gap1400, remainder800. Waste never changes usage. Sales minus adjusted food is not contribution or net profit.

## Verification

Focused engine/component tests check examples, inventory adjustments, signed/unknown values, inconsistent inputs, extreme values, decimal precision, CSV scope, sensitivity and preservation. Release checker validates built canonical, 12 fields/FAQ schema, source date, links/fragments, examples and unique IDs. Existing CI runs this checker alongside all prior calculator/content guards and whole-site audits.
