# Existing-page completion — October 24, 2026

Scope: close existing-page partial work before the original plan's pending new owners. No new route in this release.

| Existing owner | Result |
|---|---|
| Freelance business-plan financials | Editable Word outline, full fictional narrative, financial example and actual preview; dedicated Excel worksheet reconciles owner income, assignment capacity, pricing and collections. |
| Restaurant business plan | Word outline/narrative/example/preview added; existing Excel retained with unavailable break-even results for incomplete inputs and nonpositive contribution. |
| Coffee-shop business plan | Word outline/narrative/example/preview added; same Excel guard correction. |
| Business ROI calculator | Independent uneven monthly net-cash schedule, effective annual discounting, first recovered month-end, later-deficit warning, current-values CSV and editable 12-month Excel example. Existing business/AI models retained. |
| Ecommerce startup cost | Launch evidence/cash checklist and working links to existing cash forecast, net cash flow and ecommerce plan. Incoming connection from the general Business Startup Cost Calculator remains a dependency of its pending Day 2 release. |

Original 21-new-owner ledger remains 9 live / 12 unbuilt. Four existing partial items close; ecommerce content closes but the planned future incoming link is not claimed complete. Conditional topics remain separate.

Validation: 797 tests passed across 95 files; production build passed. Artifact Tool recalculation and formula error scans for all four Excel downloads; behavioral checks for missing inputs, impossible contribution, zero trading days, zero discount and missing cash. Native LibreOffice recalculation independently reconciles default values. All nine final Word pages visually reviewed; all workbook sheets/ranges reviewed. Site audit: 212 built routes, 207 sitemap URLs, no link issues. Priority-intent and page-delivery audits passed. CI and live verification are required before reporting publication.

Reproduction: `scripts/build-existing-plan-documents.py` reads the shared narrative data. The workbook authoring script requires the Codex primary runtime's `@oai/artifact-tool`; run in a directory with that package resolvable. Render/inspection outputs are QA-only and must not be published with downloads.
