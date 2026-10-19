# Monthly plan — 20 and 21 October 2026

Executed early on 19 October at the owner's request. Day 05 is 20 October; Day 06 is 21 October. This is separate from the ROI QA and homepage redesign.

## Day 05: monthly cleaning and janitorial budget

Reviewed the existing monthly-expenses article, existing budget resource, existing Excel workbook and cleaning calculator. All five planned live HTML paths across both days and all three downloaded assets returned HTTP 200. No duplicate resource, worksheet or industry category was created.

The live 9,100-byte cleaning workbook matches the repository bytes exactly. Blank Budget/Actual inputs remain blank and calculated outputs say Enter all inputs. The Example tab stored results and independent arithmetic reconcile: budget revenue $14,400; monthly payroll $7,200; contribution/job before payroll $152.60; result after owner pay $2,308; target 69 jobs; capacity 80. Actual result $459.20; target 73; capacity 72. Actual minus budget result is −$1,848.80. All amounts are fictional USD inputs.

Cost boundary: count all paid hours, including paid idle/admin time, in monthly payroll once. Owner pay excludes owner delivery labor already in payroll. Supplies/travel/fees vary with jobs; committed monthly payroll remains a monthly commitment. The interactive break-even calculator instead uses labor per job. No automatic input transfer is claimed.

Confirmed gap and implementation: added a result-adjacent monthly budget link on the existing cleaning calculator, with the above payroll distinction and no-transfer explanation. The expense article already links to the budget resource; the resource already links back to the expense guide and calculator. The new link closes the calculator-to-workbook path. Calculation code and workbook bytes are unchanged.

## Day 06: landscaping guide, calculator and scenario specification

Live titles have distinct intent: guide “Landscaping Break-Even: Jobs and Capacity”; tool “Landscaping Break-Even Calculator”. Each has one H1. Reciprocal guide/tool links and the seasonal-guide path exist. The live XLSX and CSV match repository bytes. Parsing the live CSV reproduces all 20 scenario IDs, contributions, required whole jobs, whole capacities and gaps. A raw string comparison differs only in newline conventions; it is not a data defect.

The existing worked example uses $320 price, $62 materials, $96 direct labor, $24 other variable cost, $18 acquisition and 2.9% fee. Contribution is $110.72. Operating overhead $4,800 requires 44 whole jobs. Adding owner pay $5,000 requires 89. Adding $1,500 extra profit requires 103. Capacity is 4 workers × 38 hours/week × 52/12 × 72% ÷ 5 total worker-hours/job = 94.848, rounded down to 94 complete jobs. Owner field labor must not be added again as owner pay. Demand, weather and seasonal cash are separate checks.

### Reproducible 20-case specification

Method version 1.0; engine 1.3.1. USD/monthly. Cross four contribution values ($80, $100, $110.72, $120) with five funding needs ($8,000, $9,800, $11,300, $12,200, $14,000). All 20 unique cases already exist on the live guide; this records the planned specification without republishing duplicates.

Hold price 320, materials 62, labor 96, acquisition 18 and fee 2.9%. Set other variable cost = 134.72 minus desired contribution. Owner pay is 5,000 and extra target profit 1,500; fixed overhead = funding minus 6,500. Hold crew/time assumptions above and conversion at 28%. Required jobs = ceiling(funding/contribution); whole capacity = 94; gap = capacity minus required jobs. Negative gap is an unfilled capacity shortfall, not predicted demand.

| Scenario | Contribution | Monthly funding | Required jobs | Capacity | Capacity less target |
|---|---:|---:|---:|---:|---:|
| L80-8000 | 80.00 | 8,000 | 100 | 94 | -6 |
| L80-9800 | 80.00 | 9,800 | 123 | 94 | -29 |
| L80-11300 | 80.00 | 11,300 | 142 | 94 | -48 |
| L80-12200 | 80.00 | 12,200 | 153 | 94 | -59 |
| L80-14000 | 80.00 | 14,000 | 175 | 94 | -81 |
| L100-8000 | 100.00 | 8,000 | 80 | 94 | 14 |
| L100-9800 | 100.00 | 9,800 | 98 | 94 | -4 |
| L100-11300 | 100.00 | 11,300 | 113 | 94 | -19 |
| L100-12200 | 100.00 | 12,200 | 122 | 94 | -28 |
| L100-14000 | 100.00 | 14,000 | 140 | 94 | -46 |
| L110.72-8000 | 110.72 | 8,000 | 73 | 94 | 21 |
| L110.72-9800 | 110.72 | 9,800 | 89 | 94 | 5 |
| L110.72-11300 | 110.72 | 11,300 | 103 | 94 | -9 |
| L110.72-12200 | 110.72 | 12,200 | 111 | 94 | -17 |
| L110.72-14000 | 110.72 | 14,000 | 127 | 94 | -33 |
| L120-8000 | 120.00 | 8,000 | 67 | 94 | 27 |
| L120-9800 | 120.00 | 9,800 | 82 | 94 | 12 |
| L120-11300 | 120.00 | 11,300 | 95 | 94 | -1 |
| L120-12200 | 120.00 | 12,200 | 102 | 94 | -8 |
| L120-14000 | 120.00 | 14,000 | 117 | 94 | -23 |

## Release and scope

The new cleaning link is prepared for the plan's Week 1 release gate, 22 October. It is not a critical production defect and is not represented as already deployed. Existing cleaning/landscaping resources and scenario downloads are already live. No extra article, generated market statistic, testimonial, external message or social post was published. Native spreadsheet recalculation and mobile/touch checks were not rerun in this audit; workbook results were checked from formulas/stored values and independent arithmetic. No new indexing, traffic or authority gain is claimed.

## Existing public destinations

- https://mybreakeven.com/blogs/cleaning-business-monthly-expenses/
- https://mybreakeven.com/resources/cleaning-business-budget-template/
- https://mybreakeven.com/calculators/cleaning-business-break-even-calculator/
- https://mybreakeven.com/blogs/landscaping-break-even/
- https://mybreakeven.com/calculators/landscaping-break-even-calculator/

