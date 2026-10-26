# Finance blueprint completion release

Client date: 26 October 2026, Asia/Karachi. Production rollback source: `f638685ddd2cf186c2b5e59f44a1007fa97ed043`.

The uploaded blueprint is v1.0 dated 25 October and lists 21 public pages. The user's current instruction and 26 October handover supersede its separate C06 route: leverage stays integrated in C05. Final scope is seven calculators, one hub and twelve guides: 20 canonical public pages. No new separate financial-leverage calculator is created.

## Scope register and ownership

| ID | Canonical route | Owner intent | Implementation |
|---|---|---|---|
| C01 | /calculators/ebitda-calculator/ | Earnings bridge | Existing, preserved |
| C02 | /calculators/future-value-calculator/ | Growth with deposits | Existing, preserved |
| C03 | /calculators/fire-calculator/ | Continued-saving FIRE target | Existing; contextual guide links added |
| C04 | /calculators/coast-fire-calculator/ | Zero-further-contribution milestone | Existing; contextual guide links added |
| C05 | /calculators/financial-ratios-calculator/ | 19 statement measures, integrated leverage | Existing; contextual hub/guide links added |
| C07 | /calculators/equivalent-ratio-calculator/ | Exact ratio solver | Existing; contextual guide links added |
| C08 | /calculators/refinance-calculator/ | Fixed-rate mortgage comparison | Existing; contextual guide links added |
| G01 | /blogs/ebitda-vs-net-income-vs-cash-flow/ | Different profit/cash measures | Existing, preserved |
| G02 | /blogs/adjusted-ebitda-add-backs/ | Adjustment evidence | Existing, preserved |
| G03 | /blogs/present-value-vs-future-value/ | Matched-date money | Existing, preserved |
| G04 | /blogs/ordinary-annuity-vs-annuity-due/ | Contribution timing | Existing, preserved |
| H01 | /guides/financial-ratios/ | Types, definitions, printable reference | New |
| G05 | /blogs/fire-vs-coast-fire-vs-barista-fire/ | Three different funding tasks | New |
| G06 | /blogs/fire-withdrawal-rate-retirement-risks/ | Withdrawal policy and risk | New |
| G07 | /blogs/how-to-analyze-financial-statements/ | Reconciled statements walkthrough | New |
| G08 | /blogs/find-missing-value-equivalent-ratios/ | Missing-position teaching | New |
| G09 | /blogs/equivalent-ratio-tables-word-problems/ | Scaling applications | New |
| G10 | /blogs/mortgage-refinance-break-even/ | Cash recovery vs matched-date cost | New |
| G11 | /blogs/refinance-closing-costs-financed-fees/ | Quote classification | New |
| G12 | /blogs/refinance-shorter-vs-longer-term/ | Affordability and term trade-off | New |

New routes follow the exact PDF guide register. Existing articles and tool engines are preserved. All 153 prior normalized article objects compare identically before/after, including content and historical dates. Eight guides are added. The nine-page release does not modify the legacy six-owner backlog.

## Reconciliations and QA

Cedar Supply extends the existing C05 defaults into a complete original statement. Both balance sheets reconcile. Net income20,000 + D&A10,000 − AR increase5,000 + inventory decrease4,000 − prepayments2,000 = OCF27,000. PPE125,000 + capex25,000 − depreciation10,000 =140,000. Net shareholder financing10,000 less dividends10,000 offsets; cash8,000 +27,000 −25,000 =10,000. Equity70,000 +20,000 −10,000 =80,000. The interest-bearing debt definition excludes the separately labelled non-interest-bearing shareholder loans.

FIRE and Coast examples use consistent real purchasing power. The sequence example isolates return order with equal beginning-year withdrawals; no recommended safe rate, return forecast or success probability is claimed. The Barista example explicitly needs a dated earned-income replacement plan.

Refinance fixtures were computed independently with Python Decimal precision42: note rate/12; regular payments rounded half-up to cents; internal interest unrounded; final payoff adjusted. New180/300/360-month terms reconcile to payments2,042.71/1,535.22/1,419.47 and month60 cost advantages10,901.46/6,394.53/5,366.58 after6,000 upfront fees. The existing engine reproduces the fixtures to half-cent display tolerance. Financed quote ledger produces252,000 new principal and5,500 cash to close, with no double counting.

All existing tests plus20 new tests pass:1001 tests across104 files. Production build and route audit pass:238 routes,233 sitemap entries,zero route/link issues (three pre-existing deferred interactive homepage fragments remain separately listed). Delivery/image audit and the fixed18-priority-page intent audit pass. Nine deterministic SVG covers have width/height/viewBox, meaningful alt text and no bitmap scaling limit. Exact numeric visuals remain accessible HTML tables/quantity bars.

## Discovery, sources and limitations

Each guide has a reciprocal incoming tool link and blog listing; sibling guides add context links. H01 receives links from /tools/, /blogs/ finance navigation, C05 and G07. Visible FAQ answers match structured data; hub has Article, WebPage, BreadcrumbList and FAQPage with truthful26October dates. The hub has no duplicate calculator form. Titles/descriptions and original source URLs are checked; all nine URLs enter the sitemap through the existing build.

Production is not established by this source note. Record actual deployment SHA, HTTP/canonical/sitemap/image/source/content evidence and browser observations after publishing. Browser viewport resizing is not exposed in this environment: do not claim device-emulation/mobile-browser validation. CSS overflow containment and native responsive SVG inspection are separate evidence. Google indexing and ranking are unknown, and no indexing request or GSC submission is claimed.

Research references checked26October: SEC Beginners' Guide to Financial Statements; Investor.gov compound-interest calculator and fund-fee bulletin; CFPB Loan Estimate explainer and points/credits; OpenStax Prealgebra2e6.5 (proportions) and Principles of Finance8.3 (amortization); BDC financial tools. Morningstar's withdrawal-strategy page was discoverable but returned403 to full retrieval; no current rate recommendation or research success figure from it is asserted. Competitor scope was checked against WalletBurst Coast FIRE, Calculator.net refinance and CalculatorSoup ratios: editorial choices focus on distinct tasks, explicit cash/debt timing and mathematical zero cases. No comparative superiority or fresh search-volume claims are published.

Deployment uses a feature branch and PR with CI, then the existing main→hostinger-deploy workflow. Include `[skip social]` in commit/PR/merge titles. No social posts, outreach, financial input analytics or private exports are part of the release. Roll back through a normal revert preserving subsequent work, never a forced reset of production history.
