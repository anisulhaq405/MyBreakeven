# New guide and calculator optimization — 13 October 2026

## Pages

| Page | Changes |
| --- | --- |
| `/blogs/how-to-calculate-cost-of-goods-sold/` | Descriptive COGS title, six section shortcuts and responsive cover |
| `/blogs/how-to-calculate-working-capital/` | Formula/example search title, six section shortcuts and responsive cover |
| `/blogs/how-to-calculate-days-sales-outstanding/` | Clear DSO title and H1, six section shortcuts and responsive cover |
| `/calculators/recipe-cost-calculator/` | Inputs/results/formula navigation, accessible table region, responsive cover below results |
| `/calculators/food-cost-calculator/` | Actual/theoretical title, inputs/results navigation, related COGS guide, responsive cover below results |
| `/calculators/menu-pricing-calculator/` | Food-cost/contribution title, inputs/results navigation, accessible price table, working-capital link, responsive cover below results |

The three calculator covers load lazily below the calculator so users reach inputs first. The new guide covers retain high-priority loading. The calculator library cards also use the responsive variants. Each cover retains its 1200×675 fallback and gains an 800×450 WebP candidate selected by the browser using viewport and pixel density.

Contextual incoming links added from menu engineering, prime cost and delivery-app commission guides. Existing cluster-hub links remain available. Calculator workflow labels distinguish recipe, inventory and price decisions without suggesting inventory reconciliation is required before pricing.

## Validation

- 515 tests across 49 files passed, including recipe-to-menu hydration regression.
- Production build passed; 191 rendered routes and 186 sitemap URLs audited with zero issues.
- Six-page review: one H1, self canonical, indexable robots, valid section targets, responsive candidates present, visible FAQ sections and matching FAQ schema counts (8 per guide, 6 per calculator).
- Incoming pages: COGS 7, working capital 12, DSO 8, recipe calculator 8, food-cost calculator 7, menu pricing 8.
- 160 feature covers remain present and unique under normalized pixel hashing.
- Responsive candidates total 224,090 bytes versus 498,076 bytes for their full-size equivalents: 55% less. Actual selected image depends on viewport and pixel density.
- Rendered-site audit now checks responsive `srcset` and React image-preload candidates as well as fallback image URLs.

## Source guidance

- Descriptive titles: https://developers.google.com/search/docs/appearance/title-link
- Contextual internal links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Responsive image practice: https://developers.google.com/search/docs/appearance/google-images
