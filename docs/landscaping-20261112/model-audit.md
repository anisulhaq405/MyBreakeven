# Landscaping model audit — 12 November 2026

Bounded independent arithmetic and scope review for an isolated landscaping wrapper around the unchanged `calculateCleaningDetailed` unit engine. No shared calculator source was edited. Figures below were recomputed using Python Decimal at 45-digit precision, rather than the repository engine. All monetary inputs are fictional USD planning assumptions, not wage, price, productivity or industry benchmarks.

## Unit economics and mapping

Use one consistently scoped completed landscaping job or maintenance visit. Do not mix an entire monthly maintenance contract with per-visit costs, or mowing and installations without a representative unit/mix.

- `supplies` maps to materials consumed per completed job.
- `vehicle` maps to attributable route-vehicle / disposal cost. Do not also put the same amount in equipment rate or Other.
- `other` maps to `equipmentHours × equipmentRate + otherDirect`.
- Employee worker-hours = employee count × (on-site elapsed hours + employee travel/setup elapsed hours).
- Employee variable labor = employee worker-hours × wage × (1 + entered employer-burden fraction).
- Owner time is separate from employee time; owner compensation is funded once through monthly owner allocation. Do not add that same wage to variable labor.
- Non-percentage base cost B = labor + materials + route/disposal + equipment allocation + acquisition + otherDirect + flat-fee allocation.
- Contribution CM = job price × (1 − percentage-fee fraction) − B.
- Calendar-month operating, owner-covered and full targets are ceilings of F/CM, (F+O)/CM and (F+O+G)/CM.
- Available staff and owner hours are per active service month. Capacity is the smaller applicable role floor; unused roles are nonbinding. Crew hours are worker-hours, not whole-crew elapsed hours.

Equipment hours are aggregate machine-hours across the equipment modeled, **not automatically employee count × on-site hours**. Two employees operating one mower for two hours do not imply four mower-hours. An entered hourly usage allowance must exclude the same expense already in materials, vehicle or fixed costs. Equipment acquisition and financing cash timing need a separate schedule; the tool must not claim that a usage allowance is a bank cash flow or a universal accounting expense treatment.

## Seasonal companion — keep it separate from calendar break-even

Let m be whole active service months, 1 through 12. Assume the same job economics and completed monthly volume N in those months, no off-season contribution, and all entered monthly fixed costs, owner allocation and extra target funded for all twelve calendar months.

- Annual operating requirement = 12F.
- Annual owner-covered requirement = 12(F+O).
- Annual full requirement = 12(F+O+G).
- Seasonal constant monthly operating pace = ceil[12F / (m × CM)]. Owner/full paces use their corresponding annual requirements.
- Minimum whole annual jobs = ceil[12(F+O+G) / CM]. This is different from `rounded seasonal monthly pace × m`, which can intentionally exceed the minimum annual total.
- Annual operating remainder = N × m × CM − 12F.
- Annual after-owner remainder = N × m × CM − 12(F+O).
- Annual amount above/below extra target = N × m × CM − 12(F+O+G).
- Seasonal full price at positive planned N = [B + 12(F+O+G)/(mN)] / (1−fee fraction), rounded upward to a cent only for display.

For reuse, pass scaled F/O/G into the underlying engine as **Decimal strings** (`D(raw).mul(12).div(m).toString()`), not JavaScript Number values. Retain raw input arithmetic for annual results. Never divide a rounded displayed contribution or threshold. At m=12 the calendar and seasonal monthly thresholds and price solver must match exactly.

The annual goal assumption is material: extra target G is annualized to 12G, not mG. Say so explicitly. A shorter season raises the contribution recovery requirement even if the active calendar-month plan looks profitable. Month count is an assumption, not weather or climate forecasting.

## Independent fixtures

Unless stated, Other is zero. Rate values are inputs, not prescribed rates. Whole targets round upward; capacities round downward.

### A — legacy contribution bridge, eight active months

P320; materials62; employees2; on-site1.75h plus travel0.25h per employee; wage20; burden20%; owner onsite0.75h plus travel0.25h; vehicle/disposal10; equipment2 machine-hours ×7; acquisition18; percentage fee2.9%; flat0; F4800; O5000; G1500; staff480 worker-hours; owner100 hours; m8. For the planned-result fixture use N110.

- Employee time4h; owner time1h; loaded wage24; labor96; equipment14.
- B200; percentage fee9.28; total variable209.28; **CM110.72**.
- Calendar whole targets: **44 / 89 / 103**. Calendar full revenue at103 jobs32960.
- Staff capacity120; owner100 → **capacity100**. Calendar full103 fails; planned110 fails.
- Calendar N110: operating7379.20; after owner2379.20; operating safety60.58854440357%.
- Annual requirements:57600 operating;117600 owner-covered;135600 full.
- Eight-month constant whole paces: **66 / 133 / 154** jobs per active month. Seasonal154 fails capacity100.
- Minimum annual full jobs1225; constant154 ×8=1232 is a conservative monthly pace, not the exact annual minimum.
- N110 ×8 annual results: operating39833.60; after owner−20166.40; below extra annual goal−38166.40.
- Seasonal full target price at N110: **364.67**, upward-cent display.

### B — two-employee example, eight active months

P300; materials35; employees2; onsite1.5h plus travel0.5h per employee; wage20; burden20%; owner total1h; vehicle/disposal12; equipment2 machine-hours ×8; acquisition8; percentage fee3%; flat0.50; F4000; O3000; G1000; N90; staff360 worker-hours; owner80h; m8.

- Employee time4h; loaded wage24; labor96; equipment16.
- B167.50; percentage fee9; total variable176.50; **CM123.50**.
- Calendar whole targets **33 / 57 / 65**. Calendar target revenue19500.
- Staff90; owner80 → **capacity80**. Calendar target65 fits, but planned90 fails.
- Calendar N90: operating7115; after owner4115; operating safety64.01259559154%.
- Eight-month constant whole paces **49 / 86 / 98**. Seasonal98 fails capacity80.
- Annual full requirement96000; minimum annual jobs778; constant98 ×8=784.
- Annual N90 ×8: operating40920; after owner4920; below extra annual goal−7080.
- Seasonal full price at N90: **310.14**, upward-cent display.
- At actual capacity N80, seasonal full price would be **327.32**; annual after-owner remainder−4960 and annual target gap−16960. This is a useful capacity-limited countercheck.

### C — twelve-month parity

Use B with m12. Seasonal monthly targets must equal calendar targets **33 / 57 / 65**; full price at N90 is **264.32** upward-cent. Annual N90 ×12: operating85380; after owner49380; extra-target surplus37380. Minimum annual full jobs remains778; constant65 ×12=780 is a rounded monthly pace, not a contradiction.

### D — decimal ceiling boundary

P0.30; materials0.20; zero employees and variable labor; owner1h/job; other costs/fees zero; F0.30; O/G0; N4; owner capacity10h; m8.

CM0.10 exactly. Calendar operating/full target **3**, not4. Seasonal operating/full monthly pace **5** because 12×0.30/8/0.10=4.5. Annual minimum36; constant5×8=40. Annual operating at4 jobs/month in8 months is **−0.40**. Seasonal full price at N4 is0.3125, displayed upward as **0.32**. Calendar price0.275 displays0.28. This checks that seasonal scaling and per-visit rounding remain distinct.

### E — nonpositive contribution and invalid seasons

Use A with percentage fee100%. Contribution becomes **−200**, not a finite break-even target. All positive-contribution volume thresholds are unavailable; seasonal price solver is unavailable because its fee denominator is zero. Capacity is still100 but must not be sold as a cure for negative unit economics. Reject blank/nonfinite/negative equipment hours or rates, invalid activeMonths0/13/fractions, and derived overflow before passing mapped inputs into the base engine.

## UI acceptance priorities

1. Show calendar and seasonal scopes with explicit labels, not one renamed break-even figure.
2. Warn separately for **planned volume above capacity**, calendar target above capacity, and seasonal target above capacity. Example B is the important case:65 fits,98 does not, and planned90 does not.
3. Keep monthly versus annual currency and active-month versus calendar-month units explicit. Do not label annual after-owner remainder as tax-adjusted net profit or cash.
4. Apply recurring-client frequency only to comparable maintenance visits; installation customers are not automatically recurring clients.
5. Weather loss and unavailable hours must be counted once. Capacity remains an aggregate hours screen, not dispatch routing, machine bottleneck validation or proof of demand.
