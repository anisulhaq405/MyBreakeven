# Detailed ecommerce model audit — November 12, 2026

Bounded mathematical/editorial review of a proposed isolated model. Existing `EcommercePlanning.jsx`, `ecommerceExamples.js` and `IndustryPage.jsx` were read. No shared engine, defaults, examples, UI or published page was changed. This is not independent professional accounting sign-off.

## Conclusion

The proposed equations reconcile on an **originally paid/placed order** basis, with full merchandise refunds on the specified share of orders. They are materially clearer than combining an unspecified returns allowance with already-netted revenue, provided the form states the basis and the assumptions below. Do not call the resulting order counts “retained orders”: their denominator includes later fully refunded orders.

Use decimal arithmetic through division and whole-order ceiling; round displayed currency only. The legacy default bridge yields contribution **25.248**, not 25.25 internally, which explains its correct whole funding target of587.

## Equations and explicit scope

Symbols r,q,k,a,c and f below are fractions, not percentage-point inputs. Convert 10% to0.10 exactly once.

- Revenue per originally paid order: `R = P × (1−r) + S × (1−r×q)`.
- Net inventory cost consumed/lost: `G = C × (1−r×k)`.
- Retained percentage and flat transaction fees: `J = f × (P+S) × (1−r×a) + b × (1−r×c)`.
- Other included cost: outbound shipping O + packaging K + fulfillment labor L + acquisition CPA + other X + `r × H` return handling.
- Contribution: `CM = R−G−J−O−K−L−CPA−X−rH`.
- Operating threshold: `F/CM`; practical order threshold `ceil(F/CM)` for CM>0.
- Owner-funded target: `(F+owner+target)/CM`; practical count is its ceiling. Owner pay is a management funding requirement, not a universal accounting expense classification.
- At planned originally paid count N: operating result `N×CM−F`; after-owner remainder `N×CM−F−owner`; difference against the complete target `N×CM−F−owner−target`.
- Exact operating margin of safety: `(N−F/CM)/N`, only for N>0 and CM>0. If choosing rounded whole-order safety instead, explicitly label that alternative; both must not silently share one name.
- Daily whole-order target: `ceil(wholeMonthlyTarget/days)`. This even daily target may exceed the minimum monthly total when multiplied by days; label it a planning pace, not a distinct algebraic monthly threshold.

## Scope risks and validation

1. **Refund basis:** P must be after discounts but before the modeled future merchandise refunds, excluding tax collected for others. Already-net revenue plus this r adjustment would double subtract refunds. The q field is the fraction of customer shipping refunded on returned orders, not the probability that an outbound parcel ships.
2. **Returned stock:** k is the recoverable fraction of original landed cost on a returned order. It creates recovered inventory value, not immediate bank cash. Subsequent resale has its own revenue and outbound costs; avoid counting its revenue in this initial cohort too. Restocking, inspection and return freight belong in H if incurred.
3. **No partial-item model:** Full merchandise refund is assumed on r orders. Partial refunds, returns of only one item from a mixed basket, COD failed deliveries, chargebacks and pre-dispatch cancellations need a separately reconciled cohort. Do not advertise this as a complete returns/RTO/accounting engine.
4. **Fee base:** f applies to original P+S. Real payment/marketplace fees can have different bases including taxes, different rates, caps or separate refund rules. The combined effective rate must be justified from records; unmodeled tax-base fees belong in a separate cost. Do not silently assume every platform refunds fees.
5. **Fee recoveries:** a and c independently control the refunded portions of percentage and fixed fees on returned orders. Defaulting both to0 is conservative for a simple processor case; describe them as editable assumptions. Stripe's current refund documentation says original processing fees are not returned, so a=c=1 must not be presented as a Stripe preset.
6. **Ad allocation:** CPA stays incurred on the original order cohort, including later returns. It is not deducted only from kept orders. If fixed overhead already includes the same acquisition spend, remove that duplicate. Repeat-customer and new-customer mixes need a supported blended allocation.
7. **Capacity:** fulfillment time is per original order, including relevant return handling time if not separately added. Inventory, supplier minimums, carrier cutoffs and actual demand remain separate constraints. Positive contribution is not proof of available working capital.
8. **Invalid/undefined:** reject blank, NaN, infinity, negative monetary inputs, rates outside0–100%, fractional planned order counts where labeled whole orders, and days≤0 or invalid. At planned N=0 show margin of safety as unavailable, not0%. At CM≤0 show no finite positive-contribution threshold; do not divide or emit Infinity/NaN. When CM=0 and F=0, explicitly report zero operating contribution with no positive margin rather than claiming every order loses money. A negative-CM, F=0 plan can break even only at zero sales; selling more cannot recover a positive requirement.
9. **No cash/ROAS conflation:** call net revenue and contribution correctly. Original charge minus refunds is not an accounting cash forecast. Link the existing ROAS tool rather than claiming overall store break-even is ad-only break-even.

## Independent fixtures

Recomputed with Python Decimal at35-digit precision, not by the repository's engine. Monetary inputs are fictional USD, not current prices, rates, observed customer results or recommended return rates. All displayed outputs below can be tested with decimal tolerances for nonterminating ratios; practical counts must match exactly.

### A. Legacy default parity

P86,S0,r0,q1,k1,C29,f0.032,b0,a0,c0,O9,K0,L7,CPA13,X0,H0,F7800,owner5000,target2000,N600,days30.

- R86; G29; J2.752; total variable60.752; **CM25.248**.
- Exact operating308.93536121673; **whole operating309**.
- Exact full target586.185044359949; **whole target587**, whole pace20/day.
- At N600: operating7348.80; after owner2348.80; against full target+348.80.
- Exact operating margin of safety48.510773130545%; rounded-unit alternative48.5%.

### B. Full merchandise/shipping refunds with recoverable stock

P100,S5,r0.10,q1,k1,C40,f0.03,b0.30,a0,c0,O8,K2,L3,CPA10,X1,H6,F3000,owner1000,target500,N150,days30.

- R94.50; G36; J3.45; expected handling0.60; total variable64.05; **CM30.45**.
- Exact operating98.522167487685; **whole operating99**.
- Exact full target147.783251231527; **whole target148**, whole pace5/day.
- At N150: operating1567.50; after owner567.50; target surplus67.50.
- Exact operating safety34.31855500821%; rounded-unit alternative34%.
- At100 initial paid orders: gross charges10500; merchandise refunds1000; shipping refunds50; revenue9450. **Inventory bridge is original COGS4000 less400 recoverable stock =3600**, not a cash receipt. Fees345; outbound800; packing200; fulfillment300; acquisition1000; other100; return handling60; total variable6405; contribution3045. This independently scales the per-order result.

### C. Same case, no recoverable returned inventory

Use B with k0. R94.50; G40; J3.45; variable68.05; **CM26.45**. Whole operating114; whole full target171; whole pace6/day. At150 orders operating967.50; after owner−32.50; against target−532.50. Recovering4 of inventory cost per initial order is the sole CM difference from B.

### D. Partial shipping refund and returned fee portions

Use B with q0.5,a1,c1 (illustrative contractual fee-refund assumption, not a Stripe preset). R94.75; G36; J3.105; variable63.705; **CM31.045**. Whole operating97; whole full target145; whole pace5/day. At150 orders operating1656.75; after owner656.75; target surplus156.75.

### E. All orders fully returned

Use B with r1 and q1,k1. R0; G0; J3.45; expected handling6; variable33.45; **CM−33.45**. No positive-contribution break-even threshold. At150 initial orders operating−8017.50; after owner−9017.50; target variance−9517.50. The fully recovered stock does not reimburse paid outbound/packing/labor/ads/fees.

### F. Zero contribution and no fixed requirement

P10,S0,r0,C10; all remaining variable costs and fees0; F0,owner0,target0,N0,days30. R10; variable10; **CM0**; operating result0. Division-based thresholds and safety percentage unavailable. Wording must not call this a negative-contribution loss on each order.

### G. Decimal ceiling boundary

P0.30,S0,r0,C0.20; other variables/fees0; F0.30,owner0,target0,N4,days3. **CM0.10; exact and whole operating3; full target3; daily target1; operating result0.10; safety25%.** Binary floating-point residuals must not produce4 required orders.

### H. Owner compensation counted once

P100,S0,r0,C25,O5,L10; other variables/fees0; F1200,owner600,target300,N40,days20. **CM60; operating threshold20; owner-funded threshold30; full target35; whole pace2/day**. At40 orders operating1200; after owner600; target surplus300. L is separately hired sale-dependent labor, not the same owner compensation. If an owner wage is already included in L or F, remove its duplicate from owner before use.

## Primary sources reviewed November12

- https://docs.stripe.com/refunds — directly retrieved. Supports separating refunds from the original fee and not universally assuming fee return. Narrow paraphrase above; no quoted fee pricing or universal marketplace policy.
- https://www.sba.gov/counseling/plan-your-business/ — directly retrieved current-hosted consolidated planning resource. Basic fixed-cost/contribution method and planning context; all extended refund/cohort equations and fixture numbers are independently constructed here.

Sources do not certify the model, validate a user's records or establish professional accounting/tax compliance. Existing shared-engine fixtures and original product examples should remain unchanged; the isolated engine must add its own tests against these independently computed cases.
