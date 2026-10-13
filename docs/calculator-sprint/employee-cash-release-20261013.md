# Employee cost and 13-week cash forecast release

Two pages ship together: `/calculators/employee-cost-calculator/` and `/calculators/cash-flow-forecast-template/`.

Employee includes annual recurring/first-year separation, paid/productive hour costs, employer-entered contribution amounts and capacity recovery. Cash includes dated events, thirteen weekly balances, financing separation, collection delay/realization controls, excluded-event warnings, CSV snapshot and a separate editable XLSX base template.

Each page contains original worked examples, formulas, input instructions, boundaries, decision checklist, six/seven FAQs and primary method references. Source metadata, WebApplication/FAQ/Breadcrumb schema, self-canonical, sitemap discovery and responsive generated WebP cover variants follow the existing registry.

Primary references checked: SBA https://www.sba.gov/blog/2019/2019-08/how-much-does-employee-cost-you/ (components only; its 2019 rates were not adopted); business.gov.au https://business.gov.au/finance/cash-flow/set-up-a-cash-flow-statement (opening/receipts/payments/closing method).

Competitors inspected: CapsuleM8 employee/contractor tool already explains productive hours, leave double counting, multiplier and comparison; Float 13-week template already explains dated collections and weekly balances. These are established answers, not claimed absent from Google. Our contribution integrates recurring/first-year hiring recovery with existing agency/break-even guides and cash timing, and provides a free browser cash scenario alongside a formula-driven base template. No superiority, ranking guarantee or rising-trend claim.

Research metrics remain in `docs/seo/2026-10-13-free-keyword-validation.md`: USA employee volume 880 / KE DA-based difficulty 6 (4/9 coverage); USA cash template 720 / 40 (7/7). These are not Ahrefs/Semrush KD. UK cash score 50 fails the strict <50 condition. No new free-tool quota bypass or paid tool used.

Four guides receive scoped reciprocal links: employee-vs-freelancer, billable utilization, forecast-vs-break-even, cleaning payroll cash gap. Original URLs/publication dates preserved; review date is updated.

Image prompts: agency owner reviewing payroll/staff schedule with colleague in background; overhead cash planning desk with weekly calendar, bills and invoice folder. Built-in image generation produced distinct relevant scenes. Assets at `public/images/tools/{employee-cost-calculator,cash-flow-forecast-template}-feature-20261013.webp`, 1200×675 and 800×450, lazy-loaded below results. Generated fictional scenes are captioned. No generated data chart is used.

Validation: 540 tests passed including financial boundary and SSR/CSV checks; production build and static audit recorded in release verification. XLSX authored with Artifact Tool, both sheets visually inspected, base balance 15,000 and reserve gap zero reproduced; late receipt gap 8,000, day90/day91 cutoff and missing amount validation passed. Native Excel and Google Sheets behavior not certified. Browser cannot connect to local development host; deployed UI verification follows release.
