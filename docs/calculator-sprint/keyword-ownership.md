# Calculator search ownership — 7 October 2026

Audience: USA first, then Tier 1/2 owner-operators. These are intent targets, not verified search volume, keyword difficulty or rankings. Parent industry pages retain broader monthly break-even intent. No new URLs or country/currency variants are proposed.

| Cluster | Existing slug | Owned intent |
|---|---|---|
| Pricing & profit | discount-break-even-calculator | Extra sales after discount; contribution margin after discount; discount break-even sales volume |
| Pricing & profit | price-increase-calculator | Customer loss after price rise; preserve contribution after raising prices |
| Pricing & profit | cleaning-contract-profit-calculator | Monthly contract margin after loaded labor and allocated overhead |
| Pricing & profit | lawn-route-profit-calculator | Route profit per elapsed hour; driving and crew costs |
| Service costs | detailing-chemical-cost-calculator | Dilution chemical cost per car; ready-to-use cost; bottle yield |
| Service costs | hair-color-product-cost-calculator | Color/developer stock cost per service; included mixed-product waste |
| Ads & ecommerce | break-even-roas-calculator | ROAS threshold after COGS/fees; target ROAS; pre-overhead CPA |
| Ads & ecommerce | ecommerce-return-cost-calculator | Operating return allowance per fulfilled order; recoverable acquisition cost; excludes total lost sales profit |
| Cash & income | hourly-rate-calculator | Minimum freelance billable rate with nonbillable time and fees, before personal income tax |
| Cash & income | cash-runway-calculator | Runway above reserve under constant monthly cash burn |

Industry parents: cleaning, landscaping, detailing, salon, ecommerce, agency and photography. Guides explain decisions; calculators own interactive calculation intent. Add contextual connections rather than duplicating these tools in new articles.

## Phase 1 audit

Current-main baseline: bb65a56. No prior sprint phase commit found. All three engines inspected; existing boundary tests cover nonpositive contribution, unattainable margins, 100% fee/discount boundaries, blank/negative input, whole operational units, zero burn, reserve equality, negative modeled profit and zero return cohorts. Four new checks validate liquid conversion and unchanged cost/yield.

Confirmed gap fixed: chemical volumes and liquid developer did not offer US fluid ounces. The paired quantities now convert when changing the selected unit, using 29.5735295625 mL per US customary fluid ounce. Dilution yield labels follow the selected unit. Weighed hair color is untouched; no density assumption or gram-to-mL conversion occurs. Reset returns to the original mL example. Numeric business inputs now request a decimal mobile keyboard.

Titles/H1s retain their distinct primary tool intent. Full HTML, self-canonicals, robots directives, sitemap entries and 1200×675 image assets are checked by the scoped release audit. Hero images retain explicit dimensions, async decoding and high fetch priority; existing mobile grids collapse at 800/420px. Browser verification is recorded separately; source inspection alone is not mobile-layout certification.

Liquid reference: https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9 (US customary volume differs from imperial fluid ounces and from mass ounces).

GSC connector unavailable in this run: no current indexing, impressions, clicks, CTR, position or search-demand baseline claimed. Later comparisons require exact page/query filters and equal periods, with 14/28-day checks measured from actual deployment. Phase 2 remains the calculator-guide and reciprocal-link audit; the separately authorized publication of saved blog drafts does not mark Phase 2 complete.
