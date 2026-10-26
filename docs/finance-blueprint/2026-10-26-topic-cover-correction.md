# Topic-specific finance cover correction

Scope: all20 finance blueprint pages—seven calculators, H01 and all12 supporting guides. G01–G04 are included explicitly, so none retain the earlier plain placeholder covers.

Each image now uses an immediately relevant accounting, retirement-planning, mortgage-document or ratio-learning scene with a readable exact topic title. Covers are editorial illustrations, not actual customer cases or numeric source material. All20 titles and images were visually reviewed. The former symbolic covers remain as rollback assets but are no longer selected.

Final asset paths and alt text are in `src/financeFeatureAssets.js`. Each selected image has1200×675,800×450 and400×225 WebP variants. Calculator/hub files live in `public/images/finance-topics/`; supporting guides use `public/images/blog/finance-topic-*-topic-20261026.webp`. Source generation used one built-in image-generation call per cover; no CLI/API fallback. The exact prompt set is recorded in `2026-10-26-topic-cover-prompts.json`.

The page figure, blog listing, calculator directory and social/schema previews share the selected asset. Calculator engines, URLs, existing statement calculations and article publication dates are untouched. All161 article records compare identically when excluding image, alt and image-caption fields.

Local validation:1001 tests across104 files; production build;238 routes/233 sitemap entries; no route/link issues; no image or delivery-budget failures; fixed18-priority-page audit passes. Production acceptance requires all20 page references and all60 image variants, plus checking the actual blog cards for the four previously missed guides. Retain rollback source `3b87711d014e85f8529e878e7a7c6c60eb6bfed3`. Deploy with `[skip social]` and verify live before claiming publication.
