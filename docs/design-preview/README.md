# Blog library redesign — review draft, not published

Requested by the owner after review of the November cluster directory screenshot. The owner explicitly requires the exact redesigned page before anything is published. Do not merge this branch or deploy it without their approval.

This draft replaces the dispersed multi-card link wall with a constrained library workspace: grouped topic sidebar, one active collection, featured starting guide and numbered related reading. An alternate business view provides eight compact industry cards with distinct icons and purpose-specific descriptions. Mobile uses a compact collection selector. Existing title-cover images, article data, URLs, primary topic ownership and reading connections are reused. All subject links remain in the generated HTML, and the all-guides listing remains available below the workspace.

The review harness in this directory loads the actual React blog page into desktop/mobile-width frames. It is development-only and is not copied to production build output. Start the managed preview on this checkout, then open `/docs/design-preview/index.html`. Use Desktop/Mobile and By topic/By business to review. The direct page remains `/blogs/`.

Validation: 1,222 existing tests in 159 files pass; the five November coverage/preservation tests pass again after the final navigation refinement. Production build and the all-124-page topic-connection audit pass. Browser review confirms collection switching, business cards, matching deep links and mobile selection. Measured iframe content widths are 1,223 desktop and 363 mobile CSS pixels, with matching document scroll widths. These are actual iframe layouts, not device emulation. No production deployment was requested or performed.

Draft source is saved on `design/blog-cluster-library-preview-20261111`. The live main branch remains the already approved November clustering release.
