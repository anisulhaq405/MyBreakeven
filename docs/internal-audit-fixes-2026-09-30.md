# Internal audit fixes — 30 September 2026

Authorized by the site owner: fix internal issues and deploy; mobile and Search Console checks deferred.

Baseline: main `07040b133c88600e7839ce29c09d6495b3608134`.

## Changes

- Capacity decision now checks rounded-up required units against rounded-down delivery capacity. The default cleaning case warns about the shortfall rather than calling it feasible. The display exposes the actual 116.22% capacity requirement, including a 17-job whole-unit shortfall. The visual gauge remains bounded.
- Zero capacity, zero monthly need, exact-capacity and fractional whole-unit boundary cases are handled explicitly. Core arithmetic and engine version remain unchanged.
- Remove editorial metadata tails from the two affected guides. Retain original publication dates and mark the cleanup date as 30 September.
- Align live-calculator, optional account scenario saving, local monitor storage and subscription-provider descriptions with the corresponding implementation. Existing refund terms remain unchanged.
- Add organization publishing responsibility and a correction contact without invented credentials or reviewer claims.
- Pre-render supporting pages, industry pages and homepage explanatory content from the same React components used in the browser. Private account pages remain excluded and noindex.
- Generate the production sitemap from public routes and the article registry. It now includes the café article and Pro user guide: 97 public URLs, 79 articles.
- Correct a React SVG title warning in the existing forecast chart.

## Validation before deployment

- 31 test files, 241 tests passed, including four capacity decision regression tests.
- Production build passed.
- All 97 generated public HTML pages have one H1, matching canonical and no reader-facing primary-keyword label.
- The eight industry calculator destinations remain correctly mapped.
- Private routes remain outside the sitemap and retain noindex directives.
- Privacy/payment wording checked against scenario-save and account-control source.

## Rollback and follow-up

The source is isolated on `fix/internal-audit-2026-09-30`; deployment uses a normal non-force push to main and the existing Hostinger production workflow. To roll back, revert this fix commit on current main and push the revert through the same deployment workflow. Preserve any subsequent content changes.

After deployment, verify homepage decision text, both article endings, privacy wording, the industry page content and the live sitemap. Mobile presentation/performance and Search Console indexing/manual-action checks are deferred at the owner's request. No indexing, ranking or off-page improvement is claimed from this deployment.
