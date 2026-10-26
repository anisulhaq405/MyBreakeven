# Finance feature-image refresh — 26 October 2026

Scope: the nine just-published hub/guide pages and all seven live finance calculators (16 covers). Built-in image generation was used for each distinct asset. These are conceptual editorial covers, not mathematical diagrams. Existing HTML examples, tables, formulas, original publication dates and calculator engines are preserved.

Style: premium tactile 3D editorial illustration, wide16:9, ivory/lavender, navy/violet/teal accents, no embedded titles or numerical assertions. Source PNGs were generated separately; selected outputs were visually inspected and copied into the project as optimized1200×675,800×450 and400×225 WebP assets. Master covers are24–108KB each. The source PNGs are not dependencies of the production build.

Final paths and alt text: `src/financeFeatureAssets.js`. Calculator and hub assets: `public/images/finance-features/`. Guide assets: `public/images/blog/finance-feature-*-20261026.webp`. The existing originals are retained; new versioned filenames prevent stale-cache confusion. All three widths are committed. Page figures, directory/blog cards, Open Graph, Twitter and schema now resolve to the selected covers. H01 also receives its own social preview instead of the generic site image.

Validation:1001 tests/104 files pass. Build,238-route/233-sitemap audit, page-delivery/image budget checks and fixed18-priority-owner links pass. Image-only contract inspection confirms all16 generated pages use their new cover in HTML/metadata and include the800px source. All161 article bodies, dates and non-feature metadata compare unchanged. No engine changes. Actual mobile-device emulation is unavailable; responsive source candidates, dimensions and CSS sizing are independently checked.

Generation prompts: see `2026-10-26-feature-image-prompts.json`. Each row is one separate built-in generation. No CLI/API fallback was used. Do not re-run the legacy SVG generator to replace these selected images: the active cover registry deliberately overrides those earlier conceptual placeholders.

Deploy via the existing feature-branch/PR/CI/main workflow with `[skip social]`. Verify image HTTP200, source dimensions/MIME, selected image paths, descriptive alt, source-set widths and production rendering after deployment. Do not claim live based on merge alone.
