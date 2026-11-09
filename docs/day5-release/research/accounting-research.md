# Day 5 accounting proposals — November 9, 2026

Owner scope: N037 accrued-expenses; N038 retained-earnings; N039 other-comprehensive-income. Complete proposals are in `accounting-proposals.json`; no integration, asset or production files were changed. Each guide contains eight distinct sections, accessible scrollable tables, a completed manual worksheet case, six FAQs and contextual links. Approximate original section word counts: 982, 968, 980. SEO titles including ` | MyBreakeven` are 58/58/54 characters; descriptions are 159/153/157 characters.

The guides explicitly identify all business amounts as fictional teaching inputs. They are not authentic customer results, external market data, current payroll/tax rates or a professional accounting opinion. Verification consisted of primary-reference retrieval, scope checking and independent numerical/journal recomputation. No specialist credential or external sign-off is represented.

## Canonical ownership

- Accrued expenses owns the service cutoff, omitted unpaid-cost evidence, liability clearance and optional reversal. Accrual-accounting retains the broad revenue/expense/cash overview; accounts-payable-process owns approval and disbursement; accounting-cycle retains the full close.
- Retained earnings owns corporate opening-to-closing earned-equity movement, declaration-versus-payment and reconciliation to cash and other equity components. Sole proprietor drawings, dividend legality and complete error-correction rules are excluded.
- OCI owns a deliberately limited US GAAP presentation/reconciliation example with qualifying AFS debt noncredit gain classification assumed. It does not classify instruments or calculate credit losses, hedge qualification, foreign exchange, pension obligations, current/deferred tax or IFRS treatment. RE and AOCI are kept separate.

## Primary research read November 9

1. OpenStax, adjustment process: https://openstax.org/books/principles-financial-accounting/pages/4-2-discuss-the-adjustment-process-and-illustrate-common-types-of-adjusting-entries — directly opened. Supports an incurred expense paired with its unpaid liability when absent from records. Only the mechanism is paraphrased; all numerical cases are original.
2. OpenStax, reversing-entry appendix: https://openstax.org/books/principles-financial-accounting/pages/5-4-appendix-complete-a-comprehensive-accounting-cycle-for-a-business — directly opened and searched. Optional reversals are limited to specified accruals; they do not replace the settlement trail.
3. OpenStax, owners’ equity versus retained earnings: https://openstax.org/books/principles-financial-accounting/pages/14-4-compare-and-contrast-owners-equity-versus-retained-earnings — directly opened. Supports distinct contributed/earned equity and opening-to-closing retained-earnings movement. Its illustrated prior-period correction arithmetic was not copied; our independent original correction reconciles.
4. OpenStax, dividend accounting: https://openstax.org/books/principles-financial-accounting/pages/14-3-record-transactions-and-the-effects-on-financial-statements-for-cash-dividends-property-dividends-stock-dividends-and-stock-splits — directly opened. Supports declaration/liability versus later payment. Article deliberately does not adopt its simplified legal-distribution statements as universal law.
5. SEC Staff Accounting Bulletin 108: https://www.sec.gov/rules-regulations/staff-guidance/staff-accounting-bulletins/staff-accounting-bulletin-no-108 — directly opened. It addresses prior-year misstatements for SEC registrants; it is staff guidance, not a Commission rule or a blanket instruction to post differences to retained earnings. No historical transition relief is presented as available now.
6. FASB OCI Taxonomy Implementation Guide, version 6.0, April 2025: https://xbrl.fasb.org/impdocs/OCI_TIG/othercompincome.htm — directly opened, including overview and current component/reclassification tables. It explicitly is nonauthoritative modeling guidance; illustrations assume recognition criteria already met and are incomplete disclosures. Supports the structure of the limited teaching reconciliation, not a conclusion that a real entity qualifies.
7. FASB 2013-02 announcement: https://fasb.org/page/getarticle?uid=fasb_NewsRelease02-05-13Body_0228221200 — official search retrieval exposed full relevant announcement; direct page now renders only an iframe. Supports transparency of AOCI reclassifications and related earnings lines, not current recognition eligibility. Content is attributed to that historical announcement without pretending it is current complete ASC text.
8. Current issuer primary filing: https://www.sec.gov/Archives/edgar/data/1018979/000119312526314074/R16.htm — directly opened. June 30, 2026 note with beginning AOCI, OCI before reclassification, amounts reclassified and closing AOCI for AFS debt securities. Used only as evidence of an actual issuer’s disclosure structure; no numbers or issuer policy are borrowed into our invented case and SEC hosting is not endorsement.

Paraphrases are brief and limited; no source page contributes 200 words across these three proposals. Most article content is original numerical application, evidence workflow and clearly stated boundaries.

## OCI specialist/framework gate — unresolved, do not claim cleared

The authoritative plan’s specialist-accounting gate requires an honest disposition. This research does **not** provide a qualified independent accounting review or establish a complete current ASC recognition/disclosure assessment. The official FASB taxonomy says it is not authoritative and assumes the recognition criteria are met.

An official ASC URL (https://asc.fasb.org/1943274/2147482790/220-10-45-10A) returned no readable text. The official PDF retrieved at https://asc.fasb.org/layoutComponents/getPdf?fileName=GUID-1DF30804-9F15-40BE-89CB-7CE432C3A1FC.pdf&isSitesBucket=false is ASU 2020-10, not a current full ASC snapshot. It explicitly distinguishes ASUs from authoritative Codification. The historical FAS130 PDF contains superseded equity-securities categories; it must not be used for a current generic “all unrealized investments go to OCI” statement. Search retrieved secondary ASC readers but they were not substituted for authoritative verification.

Therefore N039 is a **complete bounded educational proposal with a remaining publication-gate decision**, not an externally signed-off reporting guide. If the plan literally requires specialist clearance, retain it as a draft until that gate is satisfied; do not mark it cleared solely because arithmetic passes. The proposed text limits its claim to presentation arithmetic after qualifying AFS-debt noncredit classification and tax effects have already been supplied. Source/current framework verification and professional qualification are different checks.

N038 intentionally does not link to the unpublished OCI proposal, so withholding N039 does not break its contextual links. N039 links to N038, which must exist before publication. N037/N038 peer links likewise require release integration together.

## Independent numerical fixtures

All monetary arithmetic uses integer USD values; no current tax rate or market rate is assumed. Each posted journal was independently checked for equal debits and credits after every event.

### N037 accrued expenses

Base assumptions: no opening case accruals; November wages 6 days × $200 = $1,200; consumed utilities $450; accepted consulting $900. All operating expenses and liabilities; payroll taxes/withholding and other effects excluded.

- November expense/liability: `1200 + 450 + 900 = 2550`; accrual cash movement `0`.
- December wage payment `2000 = 1200 November payable + 800 December expense`.
- Direct path: Dr wages payable 1200; Dr December wage expense 800; Cr cash 2000.
- Reversing path: Dr wages payable 1200 / Cr December wage expense 1200; payroll Dr December wage expense 2000 / Cr cash 2000. Net December expense `2000 − 1200 = 800`; wage payable `0`.
- Base utility and consultant actual invoices exactly match accruals. Reclassification to AP debits accrual and credits AP; payment debits AP/credits cash. Do not post the direct-clearance alternative additionally.
- All November liability settlements `1200 + 450 + 900 = 2550`; all base cash payments `2000 + 450 + 900 = 3350`; combined recognized expenses `2550 + 800 = 3350`; remaining modeled case liabilities `0`.
- Independent pre-finalization utility variation: `480 − 450 = 30` additional November expense/payable, total `2580`. Do not combine variation with the base actuals or prescribe the treatment of every later invoice difference.
- Existing AP bill 700 is outside the new accrual total because already recorded. It is not a fourth new expense.

### N038 retained earnings

- Opening RE `32000`; NI `12000`; declared cash dividends `5000`; closing RE `39000`.
- Pay 3000 of declared dividends; payable `5000 − 3000 = 2000`. Payment does not reduce RE again; erroneous double subtraction would give `36000`.
- Cash sequence: `15000 → 24000 → 16000 → 26000 → 23000` from +9000 operating cash, −8000 equipment, +10000 share capital, −3000 dividends paid.
- Opening equity `70000 paid-in + 32000 RE + 1200 AOCI = 103200`.
- Closing equity `80000 paid-in + 39000 RE + 800 AOCI = 119800`.
- Independent equity bridge `103200 + 12000 NI − 400 OCI + 10000 contribution − 5000 declaration = 119800`.
- Separate supported-opening-correction alternative: `32000 − 3000 = 29000`; `29000 + 12000 − 5000 = 36000`. This is not the base 39000 schedule.
- Separate deficit illustration: `4000 − 9000 = −5000`, no distributions.

### N039 OCI/AOCI

All inputs supplied after separately determined tax effects; no tax-rate computation:

```json
{
  "openingAOCI": 3000,
  "netIncomeBeforeReclassification": 9000,
  "newOCIEligibleGain": 1600,
  "gainReclassifiedIntoNetIncome": 800,
  "netIncomeAfterReclassification": 9800,
  "ociReclassificationAdjustment": -800,
  "netCurrentOCI": 800,
  "comprehensiveIncome": 10600,
  "closingAOCI": 3800,
  "openingRetainedEarnings": 40000,
  "declaredDividends": 2000,
  "closingRetainedEarnings": 47800,
  "paidInCapital": 50000,
  "openingEquity": 93000,
  "closingEquity": 101600
}
```

Checks: `9000 + 800 = 9800`; `1600 − 800 = 800`; `9800 + 800 = 10600`; `3000 + 800 = 3800`; `40000 + 9800 − 2000 = 47800`; `50000 + 47800 + 3800 = 101600`; independent `93000 + 10600 − 2000 = 101600`.

Before the transfer the same total comprehensive income is `9000 + 1600 = 10600`. After transfer `9800 + 800 = 10600`; reclassification itself creates no extra total-equity gain or cash receipt. Do not add NI separately again after adding comprehensive income.
