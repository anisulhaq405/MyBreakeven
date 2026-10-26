# Day 1 finance release research and ownership

Research completed before implementation on October 25, 2026. Scope C01 C02 G01 G02 G03 G04 from the approved three-day blueprint. This file contains editorial decisions, not private keyword exports.

## Competitor findings

Wall Street Prep https://www.wallstreetprep.com/knowledge/ebitda/ provides detailed EBITDA definitions, comparisons, reconciliation and Excel examples. AG Capital CFO https://agcapitalcfo.com/about/financial-calculators/ebitda-calculator/ provides a direct five-input calculator. Our task is a direct usable engine plus a reproducible statement bridge, separately labelled signed adjustments and cash-flow boundaries. Do not adopt competitor wording that equates EBITDA with operating cash flow or calls every adjustment standard EBITDA.

Calculator.net https://www.calculator.net/future-value-calculator.html supplies contributions, beginning/end timing and schedule. CalculatorSoup https://www.calculatorsoup.com/calculators/financial/future-value-calculator.php supplies detailed rate/payment conventions. Financial Mentor https://www.financialmentor.com/calculator/future-value-calculator already supplies inflation/tax views. Inflation alone is not a unique differentiator. Our scope is explicit nominal/effective rates, independent compounding and contribution periods, reproducible schedules, three user-assumption rates and local CSV. No tax-account or guaranteed-return claims.

## Primary method references checked

SEC Non-GAAP Financial Measures, questions 103.01 and 103.02: https://www.sec.gov/rules-regulations/staff-guidance/corporation-finance-interpretations/non-gaap-financial-measures . Standard EBITDA starts from net income; different adjustments retain distinct naming. Include signed tax benefits and only already-included add-backs.

OpenStax Time Value of Money: https://openstax.org/books/principles-finance/pages/7-2-time-value-of-money-tvm-basics . OpenStax Annuities: https://openstax.org/books/principles-finance/pages/8-2-annuities . Match payment period and effective rate; ordinary/end vs due/beginning. Inflation deflates ending nominal balance without pretending all contributions were made at time zero.

OpenStax indirect cash-flow method: https://openstax.org/books/principles-financial-accounting/pages/16-3-prepare-the-statement-of-cash-flows-using-the-indirect-method . Original example uses simplified US-style operating interest/tax classification and no omitted noncash/foreign-exchange items; not an IFRS filing template.

## Ownership and existing-site connections

C01 /calculators/ebitda-calculator/ owns core EBITDA calculation synonyms. G01 /blogs/ebitda-vs-net-income-vs-cash-flow/ owns profit/cash comparison. G02 /blogs/adjusted-ebitda-add-backs/ owns adjustment policy and evidence.

C02 /calculators/future-value-calculator/ owns future balance with contributions. G03 /blogs/present-value-vs-future-value/ owns date comparison and discounting. G04 /blogs/ordinary-annuity-vs-annuity-due/ owns payment-timing explanation. No separate thin synonym calculator pages.

Existing operating cash flow, statement, working capital, agency/restaurant margin and operating-margin calculator receive relevant handoffs. Existing ROI is project cash payback, not future-value accumulation. Preserve original content and publication dates. Do not link to unbuilt Day 2 calculators.

## Original verification cases

EBITDA: 80000+10000+20000+15000+5000=130000, 13% on 1000000 revenue. Income statement revenue1000000-COGS600000-operatingcost290000=EBIT110000; interest10000 and tax20000 produce NI80000. OCF=80000+20000-25000-10000+5000=70000. G02 is a separately specified adjustment scenario, not an unexplained change to this ledger.

FV: 10000 at5% effective2years=11025; zero-rate1000+100monthly12months=2200; 1000 annual contribution at5%2years gives2050end and2152.5beginning. Test independent schedules, zero time, negative valid rates, absent inputs and bounded overflow.

## Release gate

Six complete public owners, four original topic-specific guide visuals, two responsive calculator covers, correct metadata/schema/anchors, directory/blog discovery, contextual incoming links, formula/UI tests, build/link/asset/delivery audits, deployment and live interactive acceptance. Do not count indexing or ranking as guaranteed. Private source exports remain outside public source.
