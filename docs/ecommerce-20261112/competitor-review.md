# Ecommerce calculator review — 12 November 2026

Scope: update only `/calculators/ecommerce-break-even-calculator/`, based on main `48dc7b4`. The owner's earlier recovery project is cancelled. Preserve all blog records, seven other industry calculator renderings, the shared engine, industry defaults, product examples and quick-to-full transfer.

## Search evidence and limitation
Query attempted in Google: `ecommerce break even calculator`, English / US parameters. Google returned its unusual-traffic / human-verification page. No CAPTCHA was attempted. The exact Google top-three ranking order could not be verified. Public web search and direct primary-page review identified these three relevant comparators; they must not be described as verified Google positions 1–3.

| Primary page | Useful features observed | Improvement implemented here |
| --- | --- | --- |
| [EcomGauge](https://ecomgauge.com/ecommerce-break-even-calculator/) | Customer shipping income, flat and percentage fees, CPA, separate operating/profit target, daily average | Preserve those explicit cost distinctions; add cohort refunds, inventory recovery and individually entered fee reversals |
| [Calcrux](https://calcrux.com/tools/ecommerce/break-even-point-calculator) | Marketplace fees, planned units, margin of safety, target profit and chart | Use exact unrounded operating threshold for safety; separate owner allocation; independently reconcile returns and productive-hour capacity |
| [Pulp Digital](https://www.pulpdigital.com.au/calculators/break-even-calculator/) | Current volume, current profit, safety, target profit and chart | Show original charged sales separately from expected net revenue, transparent per-order ledger, isolated scenarios and free local CSV |

Avoid unverifiable platform fee assumptions, generic ideal-volume benchmarks and promises of rankings or impressions. These are user-entered planning assumptions, not industry averages.

## Model boundary
One original paid and fulfilled order, including orders later fully refunded. Full merchandise refunds only; partial refunds, exchanges and COD failures require separate cohort models. Shipping refund, stock recovery, percentage fee reversal and flat-fee reversal have separate inputs. Inventory recovered is usable-stock value, not cash. The fee base is merchandise plus customer shipping, excluding sales tax; extra fee on tax belongs in Other. Owner allocation is a separate funding goal. This is not tax-adjusted accounting profit or a cash forecast.

Formula documentation is published on the page. Decimal arithmetic precedes whole-order ceilings. Required price is rounded upward to a cent, retaining its unrounded CSV value.

## Primary methodology sources
- https://stripe.com/resources/more/how-to-calculate-the-break-even-point — fixed-cost/contribution framework.
- https://docs.stripe.com/refunds — fee treatment depends on provider and terms; no automatic fee recovery.
- https://www.sba.gov/counseling/plan-your-business/ — business planning context.

## Reconciliations
Original quick example remains CM 25.248 and combined goal 587 orders; detailed defaults preserve those economics while showing operating 309 and owner coverage 507 separately.

Fictional worked cohort: item 100, customer shipping 5, product 40, outbound 8, pack 2, labor 3, other 1, acquisition 10, fee 3% + 0.30, full-refund rate 10%, shipping refunded 100%, returned product recovered 100%, extra handling 6 per return, no fee recovery. Per original order: net revenue 94.50, net product consumption 36, retained fees 3.45, handling 0.60, total variable costs 64.05, contribution 30.45. Monthly fixed 3000 gives 99 original orders; owner allocation 1000 plus extra target 500 gives 148. At 150 orders: operating remainder 1567.50, remainder after owner 567.50. See `model-audit.md` and executable tests for independent variants and decimal boundaries.
