# Combined Day 2 editorial handoff — November 18, 2026

Seven new article assets are complete in `batch2-editorial.js`, exporting `combinedDay2Posts`. No repository files were edited and no publication was performed by this bounded editorial task.

| ID | Owner | Distinct question |
|---|---|---|
| N066 | limited-liability-company | General US legal entity, ownership, federal-classification distinction and entity records |
| N067 | startup-costs-accounting | Recognition/classification of launch transactions; book versus US tax boundary |
| N068 | cloud-accounting | Workflow selection, access, reconciliation, migration and exit controls |
| N076 | capital-expenditure | CAPEX versus OPEX, asset cost, depreciation and cash bridge |
| N079 | net-income | Business gross-to-net profit; distinct from net revenue and payroll take-home pay |
| N080 | financial-reporting | Prepare, reconcile, review and version a reporting package |
| N081 | cash-flow-analysis | Interpret historical cash generation, investment funding and timing risks |

Income Statement Template remains the separate resource preparation owner at `/resources/income-statement-template/`. Existing statement analysis, cash-flow statement, forecast, startup-funding calculator, EBITDA and ratios retain their own intents. No duplicate standalone gross-margin, CAPEX-vs-OPEX or cash-flow calculator URLs are proposed here.

## Research and scope controls

Primary pages were retrieved through web search on November18,2026. Their concepts support brief definitions and boundaries; all narrative applications, case numbers, reconciliations, review workflows and questions were authored independently. No source passage or source example was copied.

- IRS LLC classification: https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc — state-law entity is separate from federal tax classification. The guide does not submit or recommend an election, quote fees/deadlines or offer state formation instructions. No BOI assertion.
- SBA launch/structure: https://www.sba.gov/counseling/launch-your-business/ — structure considerations and jurisdiction-dependent requirements. Liability is not described as an absolute guarantee.
- IRS Publication583: https://www.irs.gov/publications/p583 — recordkeeping and separate US tax-recovery context. No user-specific deduction calculation, tax election or statutory rate is provided.
- IFRS IAS38: https://www.ifrs.org/issued-standards/list-of-standards/ias-38-intangible-assets/ — explicitly labeled IFRS asset/expense context, with separate startup/training boundaries. The example is not represented as universal USGAAP or tax treatment.
- IFRS IAS16: https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/ — qualifying tangible-asset cost and depreciation context. No universal capitalization threshold or tax-depreciation election.
- NIST cybersecurity basics: https://www.nist.gov/itl/smallbusinesscyber/cybersecurity-basics — MFA, appropriate access and tested backup concepts. No software product rankings, current prices or security guarantees.
- SEC financial statements: https://www.sec.gov/about/reports-publications/beginners-guide-financial-statements — broad profit/cash/report interrelationships; not a compliance checklist.
- OpenStax income statements: https://openstax.org/books/principles-financial-accounting/pages/6-6-describe-and-prepare-multi-step-and-simple-income-statements-for-merchandising-companies — educational subtotal structure.
- OpenStax preparation: https://openstax.org/books/principles-financial-accounting/pages/4-5-prepare-financial-statements-using-the-adjusted-trial-balance — preparation sequence context.
- OpenStax cash purpose: https://openstax.org/books/principles-financial-accounting/pages/16-1-explain-the-purpose-of-the-statement-of-cash-flows — historical cash and earnings-quality context.
- OpenStax indirect reconciliation: https://openstax.org/books/principles-financial-accounting/pages/16-3-prepare-the-statement-of-cash-flows-using-the-indirect-method — noncash/working-capital adjustments.
- IFRS IAS7: https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/ — cash-flow classification and noncash boundary; no assertion of one universal interest/dividend presentation.
- IFRS18: https://www.ifrs.org/issued-standards/list-of-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/ — effective annual periods beginning January1,2027; early adoption permitted. Not described as automatically mandatory in2026.

## Original arithmetic acceptance

All case calculations are independently recorded in `batch2-arithmetic.json` with Python assertions on key balance/equity relationships. Cases are standalone; do not combine amounts across guides as though they describe one entity.

- LLC:26,000 opening funding;12,500 cash after payments;23,000 assets=6,000 liabilities+17,000 equity.
- Startup:18,000 cash paid;4,800 expenses;25,200 assets=25,200 equity;100month depreciation+100insurance allocation.
- Cloud:60,000 migration assets=29,500liabilities+30,500equity;duplicate1,200 AR can remain trial-balance balanced;340current monthly vs275proposed;65modeled difference;780oneoff/65=12months;4,080each first year.
- CAPEX:25,000 recognized asset cost+1,000current expenses=26,000paid;4,000annual depreciation;21,000closing carrying amount;5,000first-year related expenses. Closing cash9,000before15,000loan,24,000after.
- Net income:80,000net revenue;44,000gross profit;20,000operating;19,500pretax;15,600net;19.5%net margin;13,600operating cash;42,600closing retained earnings.
- Reporting:42,000opening assets=21,000liabilities+21,000equity;10,000operating−14,000investing+8,000financing=4,000cash change;16,000closing cash;60,000closing assets=30,000liabilities+30,000equity.
- Cash analysis:12,000operating−22,000investing+8,000financing=−2,000cash change;14,000closing;−10,000limited cash-after-equipment;−1,000counterfactual without new loan;9,000separate delayed-collection scenario.

## Integration assets and validation

`batch2-editorial-audit.json`:1133–1198body words/article, six FAQ objects each, unique section IDs, no unresolved `/blogs/` destinations and5–6incoming contextual links per new article from the other six new articles. SEO titles48–61characters; descriptions remain specific to each intent. Publication/modification datesNovember18,2026. Image paths exactly `/images/title-covers/combined-day2-{slug}-20261118.webp`, captions identify AI-created illustrations. Worksheets exactly `/downloads/{slug}-worksheet.html` with explicit manual/noncalculating/nonsaving language.

`batch2-worksheet-schemas.json`: seven five-column printable review-record schemas. Root owns implementation and deployment; records should contain editable labeled fields, print/save and reset, without pretending to calculate or retain entries.
