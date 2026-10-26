# Remaining calculator research and release contract

Reviewed 26 October 2026, Asia/Karachi. User priority: calculators first. This release adds exactly Financial Ratios, Equivalent Ratio and fixed-rate Mortgage Refinance; no supporting guide or standalone leverage URL. Four earlier calculators stay live. Seven calculator deliverables overall; the larger 20-page plan still has its hub and remaining guides pending.

## Private research boundary

The user supplied three 25 October US Desktop keyword overview PDFs. Their bytes were materialized outside the repository and parsed privately. No reports, keyword exports, GSC rows or user financial data are included here. Broad informational financial ratios intent remains distinct from the future editorial hub. Equivalent ratios needs general missing-value methods, examples involving 5:2 and 2:1, and tables; it must not become one copied homework answer. Mortgage refinance is the scoped owner; car and cash-out refinance need different engines and remain future extensions. No search-volume addition, traffic forecast or ranking guarantee.

## SERP and competitor review

This is the supplied report's ranking snapshot, not a claim of a universal current top five. Current public pages were reopened before release. Benchmarks informed task design; their text was not copied.

Financial Ratios supplied top five:
- Investopedia https://www.investopedia.com/terms/r/ratioanalysis.asp — category explanation, limitations, examples and editorial context. Keep broad hub intent distinct; make the calculator task immediate.
- BDC https://www.bdc.ca/en/articles-tools/money-finance/manage-finances/financial-ratios-4-ways-assess-business — business categories, formulas and operational interpretation. Retain grouped inputs and explain relevant numerator scope.
- Iowa State https://www.extension.iastate.edu/agdm/wholefarm/html/c5-97.html — trend and investigation context. No universal healthy-score result.
- Wikipedia https://en.wikipedia.org/wiki/Financial_ratio — benchmark navigation breadth only, not a calculation authority used by the engine.
- SoFi https://www.sofi.com/learn/content/financial-ratios-list/ — formula reference breadth. Provide a transparent local calculation and connected original dataset instead of duplicating a list article.

Additional calculator owners checked: BDC tools, Citizens, AccountingIQ, NeedMyTools and CitationEasy. Relevant design choices: missing inputs remain unknown, explicit opening balances for averages, no fallback to total sales for credit sales, separate operating profit and EBIT, no automatic annualization, independent period datasets, ratio CSV and integrated three-definition leverage mode.

Equivalent Ratios supplied top five:
- CK-12 lesson: https://flexbooks.ck12.org/cbook/ck-12-interactive-middle-school-math-6-for-ccss/section/1.8/related/lesson/ratios-and-equivalent-ratios-msm6/ — retrieval returned no readable body; no content claim inferred.
- Virtual Nerd https://virtualnerd.com/middle-math/ratios-proportions-percent/ratios-rates/equivalent-ratios-table-example — table teaching and worked progression.
- CalculatorSoup https://www.calculatorsoup.com/calculators/math/ratios.php — simplify, missing term, compare and scaling; two/three-term tasks.
- Khan Academy https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-ratios-prop-topic/cc-6th-equivalent-ratios/v/equivalent-ratios — no readable body returned; no video-content claim.
- YouTube https://www.youtube.com/watch?v=zC6KdmoTpIE — retrieval failed; no video-content claim.

Also checked Omni, Pearson, Alcula and calculations.tools. Our contract: exact reduced rational arithmetic, all pairwise constraints, one missing term, explicit nonunique/invalid states, normal/decimal/fraction examples and normalized bars only for nonnegative inputs. No claim of having watched unavailable videos or being universally better than competitors.

Refinance supplied top five:
- Calculator.net https://www.calculator.net/refinance-calculator.html — current/new loan comparison and cost explanations.
- Bankrate https://www.bankrate.com/mortgages/refinance-calculator/ — payments, closing charges and fee recovery. Our rates remain explicit assumptions, not live offers.
- Zillow https://www.zillow.com/mortgage-calculator/refinance-calculator/ — payment savings can change after the old payoff date; keep both schedules and explain reversal risk.
- Bank of America https://www.bankofamerica.com/mortgage/refinance-calculator/ — lender payment/rate context. No lender quote, borrower profile collection or eligibility promise in this implementation.
- Fannie Mae https://yourhome.fanniemae.com/calculators-tools/mortgage-refinance-calculator — mortgage refinance payment comparison.

Implementation differentiators are defined behavior, not a ranking promise: current unpaid balance + remaining term; upfront/financed/credit ledger; same holding date cash + principal; constant entered other housing costs; PMI stops at payoff only; complete matched schedules; zero-rate/final-payoff cases; note rate versus APR; escrow liquidity separated from irreversible fees.

## Primary calculation sources checked

- OpenStax liquidity: https://openstax.org/books/principles-finance-2e/pages/6-3-liquidity-ratios
- OpenStax average balances and statement analysis: https://openstax.org/books/principles-financial-accounting/pages/a-financial-statement-analysis
- OpenStax proportions: https://openstax.org/books/prealgebra-2e/pages/6-5-solve-proportions-and-their-applications
- OpenStax amortization: https://openstax.org/books/principles-finance/pages/8-3-loan-amortization
- CFPB Loan Estimate: https://www.consumerfinance.gov/owning-a-home/loan-estimate/
- CFPB points/credits: https://www.consumerfinance.gov/ask-cfpb/how-should-i-use-lender-credits-and-points-also-called-discount-points-en-136/

## Numerical contracts

Financial ratios: 36-digit Decimal arithmetic, plain decimal input, explicit blank unknown, average opening/closing balances. 19 measures; working capital is money. Denominators must be positive under disclosed economic convention. Zero or negative equity is non-comparable. Signed profits remain signed. Period comparison is raw same-unit change, with percent ratios shown in percentage points. Validate reconciliation and disjoint quick assets. ROE uses net income/average total equity; no hidden preferred-dividend adjustment.

Equivalent ratios: BigInt reduced fractions; max40 characters per input; no exponents/mixed numbers. Two-term ratio as fraction requires nonzero second term; three-term vectors require nonzero overall and one common nonzero scale. Solve one missing component using every pairwise linear constraint; revalidate original ratios. Zero-coefficient cases report no/infinitely-many solutions. Negative inputs are algebraic; bars are suppressed.

Refinance: 36-digit Decimal, monthly note rate/12, cents-rounded regular P&I, unrounded internal accrual, adjusted final payoff. Same initial principal; new principal adds financed fees once. Credits offset upfront fees only, bounded by that bucket. Cash + principal at identical month; undiscounted. Simple fee threshold only without financed fees and with positive ongoing initial saving; warn when threshold lies beyond either payoff. Schedules extend through longer term/holding horizon; principal payments stop at payoff. Other housing expenses continue, PMI ends only at payoff. Escrow/prepaids are closing liquidity only; no refund-timing model. No cash-out/ARM, tax, penalties or investment return assumptions.

## Acceptance

Normal/zero/missing/invalid/negative appropriate cases; independent amortization oracle, final payment and conservation; every missing ratio position, inconsistent third term, fractions, exact decimals; statement reconciliation, denominator and period cases; unique route/H1/IDs, visible FAQs, images, metadata, working links, keyboard/reset/downloads. Build site and delivery audits precede publication. Verify production HTTP/canonical/sitemap plus live changes/invalid/reset/CSV. Do not mark complete on merge alone. No social posts or outreach; all commit/PR text carries [skip social].
