# Cleaning completed-visit model audit — 12 November 2026

Bounded mathematical review of the owner's selected isolated model. Existing shared `engine.js` and cleaning defaults in `industries.js` were read; no shared source was edited. Fixtures below were recomputed independently with Python Decimal at 40-digit precision, not with the implementation under test. Figures are fictional assumptions, not market rates or professional accounting sign-off.

## Selected equations and basis

One unit is one **completed, billable visit**, with price after discounts and before pass-through sales tax. Keep the same service mix, period and scope for all inputs.

- Employee worker-hours per visit `E = employeeCrew × (onsite elapsed hours + employee travel elapsed hours)`.
- Loaded variable employee rate `W = base wage × (1 + burden percentage / 100)`.
- Variable employee labor per visit `L = E × W`.
- Owner time per visit `O = owner onsite hours + owner travel hours`. Owner time affects capacity; monetary owner compensation is the separate monthly owner allocation. No variable owner wage is added in this version.
- Percentage/flat fee `J = price × fee percentage / 100 + flat fee per visit`.
- Variable cost `V = L + supplies + vehicle/travel expense + acquisition allocation + other variable cost + J` (omit Other if no such field).
- Contribution `CM = price − V`.
- For positive CM, exact operating threshold `fixed / CM`; owner threshold `(fixed + owner allocation) / CM`; full target `(fixed + owner allocation + extra target) / CM`. Whole visits round upward after exact decimal division.
- At planned visits N: included operating remainder `N×CM−fixed`; after-owner remainder subtracts owner allocation; full-target surplus subtracts the extra target once.
- Employee capacity `floor(available employee worker-hours / E)` when E>0. Owner capacity `floor(available owner hours / O)` when O>0. The combined capacity is the minimum of the used roles' capacities. An unused role is nonbinding; do not divide by zero or make its zero available hours constrain another role. Reject a model with no per-visit time in either role if capacity is required.
- Full-target recurring-client equivalent `ceil(whole target visits / visits per client per month)`. This is an equivalent account count under an entered repeat frequency, not proof those clients exist. Fractional monthly frequency, e.g. 4.333 weekly-average visits, is a planning average; calendars and contract commitments still require checking.
- Operating safety `(planned visits − exact operating threshold) / planned visits`; unavailable at N=0 or nonpositive CM.
- Daily average `whole full target / selling days`; a constant daily ceiling rounds up again and can exceed the minimum total when multiplied by selling days.
- Price needed at planned N, when N>0 and fee rate f<1: `[(fixed+owner+extra)/N + non-percentage variable cost] / (1−f)`. Non-percentage cost includes flat fees, never the current percentage fee. Round the displayed required price **upward** to a cent; preserve the unrounded result in CSV.

## Important cost and capacity boundaries

1. Employee labor here is **variable** with the next visit. Guaranteed payroll belongs in monthly fixed commitments for that operating range. Moving all payroll from variable to fixed changes the economics away from the selected baseline volume; do not claim the approaches give the same threshold.
2. Owner allocation and an already included variable owner wage would double count compensation. The selected separate owner-time schedule avoids that. If the owner does cleaning, retain owner time for capacity even when there is no employee crew. The result is funding after the entered owner allocation, not automatically accounting or tax-adjusted net profit.
3. Two employees on site for two elapsed hours use four worker-hours. Two employees each traveling 0.25 elapsed hours use another 0.5 worker-hours. Available staff hours are the combined total across relevant employees; do not enter crew clock-hours there.
4. Travel labor time and vehicle expense are different costs. Enter job-attributable fuel/mileage/parking once using an internally consistent vehicle policy; do not apply an unverified reimbursement rate. Travel fields assume the same average travel elapsed time for all members of the employee crew. If only some workers travel, use their actual total worker-hours divided by crew count as a weighted average, or choose a more detailed schedule.
5. Available hours should already exclude management/admin leave and downtime, while still covering the onsite and travel work counted per visit. Do not subtract travel twice. Separate staff and owner constraints are aggregate screens, not dispatch routing, appointment-slot feasibility or staffing guarantees.
6. **Check both required target and entered planned volume against capacity.** Default A below has 120 planned visits but capacity 90; B has a target of 56 that fits 57, yet its entered 60 visits exceed capacity. Their planned financial results remain conditional arithmetic, not deliverable projections.
7. No universal cancellation, unpaid re-clean, bad debt or overtime adjustment is inferred. These require additional expected costs/volume and time assumptions; recalculate wage and capacity for overtime or a changed crew model. No current wage, employer-tax percentage or commercial-cleaning productivity benchmark is hardcoded as authoritative.
8. A positive contribution does not establish demand. Negative or zero contribution cannot recover a positive monthly requirement through more identical visits; no NaN, Infinity or fabricated finite target should be shown. At CM=0 and fixed=0, entered operating remainder is zero at any volume, rather than a claim that each visit loses money.

## Primary source for the travel-time distinction

US Department of Labor, **Fact Sheet #22: Hours Worked Under the Fair Labor Standards Act**:
https://www.dol.gov/agencies/whd/fact-sheets/22-flsa-hours-worked

Verified through two search engines on 12 November 2026. Direct page retrieval returned 403 in the research tool. The official indexed text distinguishes ordinary home/work commuting from between-job travel during a workday, which counts as work time. Keep the product copy general and direct users to their applicable employment rules; this calculator does not decide compensability or calculate legally required wages. Parent should open/search this source itself before citing it in its final answer. Search references: `turn473546449search0`, `turn758387007search0`.

## Independent fixtures

All costs below are fictional USD. Monetary results are exact to shown terminating decimals. Ratios are rounded here only for readability; thresholds must match the exact whole integer. Zero flat fee and zero Other apply unless specified.

### A. Selected default / legacy contribution parity

Price180; supplies18; employee crew1; onsite2h; employee travel0.5h; wage20; burden16%; owner onsite0.75h plus travel0.25h; vehicle12; acquisition10; fee2.9%; fixed3200; owner allocation4500; extra target1000; planned120; available staff260 worker-hours; available owner90h; visits/client4; selling days22.

- Employee time2.5, owner time1; loaded rate23.20; employee labor58; fees5.22; variable103.22; **contribution76.78**.
- Exact operating41.67752018755 → **42**; owner coverage **101**; exact full113.31075800990 → **114** visits; target sales20520.
- At120: operating6013.60; after owner1513.60; extra-target surplus513.60. **Planned120 and target114 both exceed capacity90** (staff floor104; owner90).
- Recurring-client equivalent29 at4 visits/client; daily average5.181818..., constant whole ceiling6.
- Exact safety65.26873317704%. Required price175.59217301750... → **175.60** upward cent.

### B. Two-employee paid travel and owner capacity

Price250; supplies12; employee crew2; onsite2h; employee travel0.25h; wage20; burden20%; owner onsite0.5h plus travel0.25h; vehicle10; acquisition5; fee3% plus0.30; fixed2500; owner3000; extra500; planned60; staff260; owner45h; visits/client4.333; days22.

- Employee time4.5; owner time0.75; loaded rate24; labor108; fees7.80; variable142.80; **CM107.20**.
- Exact operating23.32089552239 → **24**; owner **52**; exact full55.97014925373 → **56**; sales14000.
- Operating3932; after owner932; surplus432. Employee floor57, owner60 → **capacity57**. Target56 fits; planned60 does not.
- Client equivalent13; daily average2.545454..., ceiling3; safety61.13184079602%.
- Required price242.57731958762... → **242.58**.

### C. Owner-only service; zero employee hours are nonbinding

Price120; supplies10; employee crew0, employee onsite/travel/wage/burden0; owner onsite2h plus travel0.5h; vehicle8; acquisition5; fee3% plus0.30; fixed600; owner2500; extra500; planned40; available employee0h; owner100h; visits/client4; days20.

- Employee labor0; owner time2.5; fees3.90; variable26.90; **CM93.10**.
- Operating threshold **7**; owner **34**; full **39**; sales4680.
- At40: operating3124; after owner624; surplus124. **Capacity40**, not0; target fits.
- Client equivalent10; daily average1.95, ceiling2; safety83.88829215897%.
- Required price116.80412371134... → **116.81**.

### D. Employee-only service; unused owner time is nonbinding

Use B, but owner onsite0, owner travel0, available owner0h. Retain monthly owner allocation3000 as a separate business funding goal. Every monetary result and threshold remains B's result; owner time0 is ignored and employee **capacity57** remains binding. Do not return capacity0 or divide by zero.

### E. Decimal whole-visit boundary

Price0.30; supplies0.20; employee crew/hours/wage/burden0; owner onsite1h, travel0; other variable costs and fees0; fixed0.30; owner/extra0; planned4; available owner10h; visits/client1; days3.

**CM0.10; exact/whole operating and full target3, not4**. Capacity10; target sales0.90; planned operating0.10; safety25%; average/whole daily1. Required price0.275 → upward-cent **0.28**.

### F. No positive contribution

Use A with fee100%. Fees180; variable278; **CM−98**. At120: operating−14960; after owner−19460; surplus−20460. No finite positive-volume goal; price solver unavailable because its percentage-fee denominator is zero. Role capacity remains90 but must not be interpreted as a viable volume cure.
