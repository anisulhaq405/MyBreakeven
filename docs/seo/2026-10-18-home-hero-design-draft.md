# Homepage calculator hero — second design draft

The owner rejected the first navy/mint card design. This version changes the layout as well as the palette: warm ivory canvas, charcoal typography and burnt-orange accents; full-width input workspace with a four-column desktop field grid; horizontal results strip below the inputs; two-column tablet fields and single-column mobile fields. Original hero JSX, copy, labels, fields, eight models, defaults, formulas, currency behavior and CTA remain unchanged. Only scoped hero presentation changes; shared header/footer rules are preserved.

The obsolete shared hero CSS remains consolidated into home-presentation.css. Production build, rendered-route and delivery checks run on this version. The existing 661-test suite passed during the first CSS-only draft; no calculation or component code has changed since. Browser visual/interaction QA remains unverified. A new isolated working HTML preview is delivered for owner review; no account saving, checkout or analytics connection is configured in that preview.

Keep PR158 as draft. Do not deploy before the owner approves this new design.
