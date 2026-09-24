import React, { useMemo, useState } from "react";
import { BadgeDollarSign, CalendarRange, Layers3, Megaphone, Plus, ShieldCheck, Trash2, UserPlus, ChartNoAxesCombined } from "lucide-react";
import { analyzeAcquisitionBreakEven, analyzeHireBreakEven, analyzeOfferMix, analyzePriceGuard, buildBreakEvenLadder, buildBreakEvenTimeline } from "./proDecisionEngine";
import MonthlyMonitor from "./MonthlyMonitor";

const numeric = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const format = (value, currency, digits = 0) => new Intl.NumberFormat("en-US", {
  style: "currency", currency, maximumFractionDigits: digits,
}).format(value || 0);

export default function ProDecisionStudio({ input, result, industry, industryKey, currency, userId }) {
  const baseVariable = input.materialCost + input.laborCost + input.otherVariableCost + input.acquisitionCost;
  const [active, setActive] = useState("mix");
  const [discount, setDiscount] = useState(10);
  const [buffer, setBuffer] = useState(10);
  const [acquisition, setAcquisition] = useState({ monthlySpend: Math.max(500, input.acquisitionCost * Math.ceil(result.jobs)), leads: Math.max(100, Math.ceil(result.leads)), conversionPct: input.conversionPct, repeatPurchases: 2 });
  const [hire, setHire] = useState({ monthlyPay: Math.max(2500, input.ownerPay * .6), payrollBurdenPct: 12, otherMonthlyCost: 250, oneTimeCost: 1000, productiveHoursPerMonth: Math.max(120, input.hoursPerWorker * 52 / 12 * input.utilizationPct / 100), expectedExtraUnits: Math.max(10, Math.ceil(result.jobs * .25)) });
  const [timeline, setTimeline] = useState({ startupInvestment: Math.max(1000, input.fixedCosts * 3), startingMonthlyUnits: Math.max(1, Math.ceil(result.jobs * .75)), growthPct: 3, maxMonths: 36 });
  const [offers, setOffers] = useState([
    { id: 1, name: `Core ${industry.singular}`, price: input.price, variableCost: baseVariable, mixPct: 70, hours: input.hoursPerJob },
    { id: 2, name: "Premium offer", price: Number((input.price * 1.35).toFixed(2)), variableCost: Number((baseVariable * 1.15).toFixed(2)), mixPct: 30, hours: Number((input.hoursPerJob * 1.25).toFixed(2)) },
  ]);
  const mix = useMemo(() => analyzeOfferMix(input, offers), [input, offers]);
  const price = useMemo(() => analyzePriceGuard(input, result, discount), [input, result, discount]);
  const ladder = useMemo(() => buildBreakEvenLadder(input, buffer), [input, buffer]);
  const acquisitionAnalysis = useMemo(() => analyzeAcquisitionBreakEven(input, result, acquisition), [input, result, acquisition]);
  const hireAnalysis = useMemo(() => analyzeHireBreakEven(input, result, hire), [input, result, hire]);
  const timelineAnalysis = useMemo(() => buildBreakEvenTimeline(input, result, timeline), [input, result, timeline]);
  const updateModel = (setter, key, value) => setter((current) => ({ ...current, [key]: numeric(value) }));
  const updateOffer = (id, key, value) => setOffers((current) => current.map((offer) => offer.id === id ? { ...offer, [key]: key === "name" ? value : numeric(value) } : offer));
  const addOffer = () => setOffers((current) => current.length >= 6 ? current : [...current, {
    id: Math.max(0, ...current.map((offer) => offer.id)) + 1,
    name: `Offer ${current.length + 1}`, price: input.price, variableCost: baseVariable,
    mixPct: 10, hours: input.hoursPerJob,
  }]);
  return <section className="decision-studio">
    <header className="decision-head">
      <div><span>PRO DECISION STUDIO</span><h2>Move the decision. See the new break-even.</h2><p>Model pricing, acquisition, hiring and the path from investment to sustainable profit.</p></div>
      <ShieldCheck />
    </header>
    <nav className="decision-tabs" aria-label="Pro decision tools">
      <button className={active === "mix" ? "active" : ""} onClick={() => setActive("mix")}><Layers3 /> Offer Mix</button>
      <button className={active === "price" ? "active" : ""} onClick={() => setActive("price")}><BadgeDollarSign /> Price Guard</button>
      <button className={active === "ladder" ? "active" : ""} onClick={() => setActive("ladder")}><ShieldCheck /> Break-Even Ladder</button>
      <button className={active === "acquisition" ? "active" : ""} onClick={() => setActive("acquisition")}><Megaphone /> Acquisition</button>
      <button className={active === "hire" ? "active" : ""} onClick={() => setActive("hire")}><UserPlus /> Hire Break-Even</button>
      <button className={active === "timeline" ? "active" : ""} onClick={() => setActive("timeline")}><CalendarRange /> Timeline</button>
      <button className={active === "monitor" ? "active" : ""} onClick={() => setActive("monitor")}><ChartNoAxesCombined /> Monthly Monitor</button>
    </nav>

    {active === "mix" && <div className="decision-panel">
      <div className="panel-intro"><div><small>OFFER MIX STUDIO</small><h3>Build the business from the offers customers actually buy.</h3></div><button className="add-offer" onClick={addOffer} disabled={offers.length >= 6}><Plus /> Add offer</button></div>
      <div className="offer-editor">
        <div className="offer-editor-head"><span>Offer</span><span>Price</span><span>Variable cost</span><span>Sales mix</span><span>Delivery time</span><i /></div>
        {offers.map((offer) => <div className="offer-editor-row" key={offer.id}>
          <input aria-label="Offer name" value={offer.name} onChange={(event) => updateOffer(offer.id, "name", event.target.value)} />
          <label><small>{currency}</small><input aria-label={`${offer.name} price`} type="number" min="0" step="0.01" value={offer.price} onChange={(event) => updateOffer(offer.id, "price", event.target.value)} /></label>
          <label><small>{currency}</small><input aria-label={`${offer.name} variable cost`} type="number" min="0" step="0.01" value={offer.variableCost} onChange={(event) => updateOffer(offer.id, "variableCost", event.target.value)} /></label>
          <label><input aria-label={`${offer.name} sales mix`} type="number" min="0" step="1" value={offer.mixPct} onChange={(event) => updateOffer(offer.id, "mixPct", event.target.value)} /><small>%</small></label>
          <label><input aria-label={`${offer.name} delivery hours`} type="number" min="0.01" step="0.1" value={offer.hours} onChange={(event) => updateOffer(offer.id, "hours", event.target.value)} /><small>hrs</small></label>
          <button aria-label={`Remove ${offer.name}`} disabled={offers.length === 1} onClick={() => setOffers((current) => current.filter((item) => item.id !== offer.id))}><Trash2 /></button>
        </div>)}
      </div>
      {!mix.valid ? <p className="decision-warning" role="alert">{mix.message}</p> : <>
        <div className="decision-summary four">
          <article><small>Weighted contribution</small><strong>{format(mix.weightedContribution, currency, 2)}</strong><span>per mixed sale</span></article>
          <article><small>Target break-even</small><strong>{mix.wholeUnits}</strong><span>total {industry.unit}</span></article>
          <article><small>Required revenue</small><strong>{format(mix.revenue, currency)}</strong><span>at this mix</span></article>
          <article className={mix.capacityGapHours >= 0 ? "safe" : "risk"}><small>Capacity position</small><strong>{Math.abs(mix.capacityGapHours).toFixed(1)} hrs</strong><span>{mix.capacityGapHours >= 0 ? "available after target" : "short of target"}</span></article>
        </div>
        <div className="mix-results">
          <div><span>Offer</span><span>Normalized mix</span><span>Contribution</span><span>Contribution / hour</span><span>Break-even units</span></div>
          {mix.rows.map((offer) => <div key={offer.id}><strong>{offer.name}</strong><span>{offer.mixPct.toFixed(1)}%</span><span>{format(offer.contribution, currency, 2)}</span><span>{format(offer.contributionPerHour, currency, 2)}</span><span>{Math.ceil(offer.breakEvenUnits)}</span></div>)}
        </div>
      </>}
    </div>}

    {active === "price" && <div className="decision-panel price-guard">
      <div className="panel-intro"><div><small>PRICE GUARD</small><h3>Know exactly what a discount has to earn back.</h3><p>Payment fees and all per-sale costs remain included.</p></div></div>
      <label className="decision-slider"><span>Test discount <strong>{discount}%</strong></span><input type="range" min="0" max="60" step="1" value={discount} onChange={(event) => setDiscount(Number(event.target.value))} /></label>
      <div className="decision-summary four">
        <article><small>Current price</small><strong>{format(input.price, currency, 2)}</strong><span>{format(result.contribution, currency, 2)} contribution</span></article>
        <article><small>Discounted price</small><strong>{format(price.newPrice, currency, 2)}</strong><span>{price.valid ? `${format(price.newContribution, currency, 2)} contribution` : "Contribution removed"}</span></article>
        <article><small>Additional sales</small><strong>{price.valid ? Math.ceil(price.additionalUnits) : "—"}</strong><span>{price.valid ? `${Math.max(0, price.volumeLiftPct).toFixed(1)}% volume lift` : "Discount is not viable"}</span></article>
        <article className={price.valid ? "safe" : "risk"}><small>Maximum mathematical discount</small><strong>{price.maxDiscountPct.toFixed(1)}%</strong><span>before contribution reaches zero</span></article>
      </div>
      <div className={`price-verdict ${price.valid ? "safe" : "risk"}`}><ShieldCheck /><div><strong>{price.valid ? `This discount needs ${price.wholeRequiredUnits} total ${industry.unit}.` : price.message}</strong><p>{price.valid ? `You need ${Math.ceil(price.additionalUnits)} more ${industry.unit} than the current target to preserve owner pay and target profit.` : `The contribution floor price is ${format(price.floorPrice, currency, 2)} before fixed costs.`}</p></div></div>
    </div>}

    {active === "ladder" && ladder.valid && <div className="decision-panel ladder-panel">
      <div className="panel-intro"><div><small>BREAK-EVEN LADDER</small><h3>See what the business covers at every level.</h3><p>No opaque score—each step shows the contribution requirement, whole sales target and revenue.</p></div></div>
      <label className="decision-slider"><span>Safety volume buffer <strong>{buffer}%</strong></span><input type="range" min="0" max="30" step="1" value={buffer} onChange={(event) => setBuffer(Number(event.target.value))} /></label>
      <div className="break-even-ladder">
        {ladder.levels.map((level, index) => <article key={level.name}><b>{String(index + 1).padStart(2, "0")}</b><div><small>{level.name}</small><strong>{level.wholeUnits} {industry.unit}</strong><p>{level.description}</p></div><span>{format(level.revenue, currency)}</span></article>)}
      </div>
    </div>}

    {active === "acquisition" && <div className="decision-panel">
      <div className="panel-intro"><div><small>ACQUISITION BREAK-EVEN</small><h3>Know the CAC your unit economics can safely carry.</h3><p>Connect spend, leads, conversion and repeat purchases before scaling a channel.</p></div></div>
      <div className="decision-input-grid four">
        <label><span>Monthly spend</span><div><small>{currency}</small><input type="number" min="0" value={acquisition.monthlySpend} onChange={(event) => updateModel(setAcquisition, "monthlySpend", event.target.value)} /></div></label>
        <label><span>Monthly leads</span><div><input type="number" min="1" value={acquisition.leads} onChange={(event) => updateModel(setAcquisition, "leads", event.target.value)} /></div></label>
        <label><span>Lead conversion</span><div><input type="number" min="0.1" max="100" step="0.1" value={acquisition.conversionPct} onChange={(event) => updateModel(setAcquisition, "conversionPct", event.target.value)} /><small>%</small></div></label>
        <label><span>Purchases / customer</span><div><input type="number" min="0.1" step="0.1" value={acquisition.repeatPurchases} onChange={(event) => updateModel(setAcquisition, "repeatPurchases", event.target.value)} /></div></label>
      </div>
      {!acquisitionAnalysis.valid ? <p className="decision-warning">{acquisitionAnalysis.message}</p> : <>
        <div className="decision-summary four">
          <article><small>Customers acquired</small><strong>{acquisitionAnalysis.customers.toFixed(1)}</strong><span>from entered leads</span></article>
          <article><small>Customer acquisition cost</small><strong>{format(acquisitionAnalysis.cac, currency, 2)}</strong><span>per new customer</span></article>
          <article><small>Contribution / customer</small><strong>{format(acquisitionAnalysis.customerContribution, currency, 2)}</strong><span>across repeat purchases</span></article>
          <article className={acquisitionAnalysis.lifetimeProfitAfterCac >= 0 ? "safe" : "risk"}><small>Profit after CAC</small><strong>{format(acquisitionAnalysis.lifetimeProfitAfterCac, currency, 2)}</strong><span>before fixed overhead</span></article>
        </div>
        <div className={`price-verdict ${acquisitionAnalysis.lifetimeProfitAfterCac >= 0 ? "safe" : "risk"}`}><Megaphone /><div><strong>{acquisitionAnalysis.lifetimeProfitAfterCac >= 0 ? `This channel recovers spend within ${acquisitionAnalysis.breakEvenPurchases.toFixed(1)} purchase(s).` : "This channel destroys contribution at the current assumptions."}</strong><p>Maximum modelled CAC is {format(acquisitionAnalysis.maxAffordableCac, currency, 2)}. You need about {Math.ceil(acquisitionAnalysis.leadsNeededToRecoverSpend)} leads to recover this spend across the selected purchase horizon.</p></div></div>
      </>}
    </div>}

    {active === "hire" && <div className="decision-panel">
      <div className="panel-intro"><div><small>HIRE BREAK-EVEN</small><h3>Turn a staffing decision into a measurable sales target.</h3><p>Include payroll burden, recurring overhead and onboarding investment.</p></div></div>
      <div className="decision-input-grid three">
        <label><span>Monthly pay</span><div><small>{currency}</small><input type="number" min="0" value={hire.monthlyPay} onChange={(event) => updateModel(setHire, "monthlyPay", event.target.value)} /></div></label>
        <label><span>Payroll burden</span><div><input type="number" min="0" value={hire.payrollBurdenPct} onChange={(event) => updateModel(setHire, "payrollBurdenPct", event.target.value)} /><small>%</small></div></label>
        <label><span>Other monthly cost</span><div><small>{currency}</small><input type="number" min="0" value={hire.otherMonthlyCost} onChange={(event) => updateModel(setHire, "otherMonthlyCost", event.target.value)} /></div></label>
        <label><span>One-time onboarding</span><div><small>{currency}</small><input type="number" min="0" value={hire.oneTimeCost} onChange={(event) => updateModel(setHire, "oneTimeCost", event.target.value)} /></div></label>
        <label><span>Productive hours / month</span><div><input type="number" min="1" value={Number(hire.productiveHoursPerMonth.toFixed?.(1) ?? hire.productiveHoursPerMonth)} onChange={(event) => updateModel(setHire, "productiveHoursPerMonth", event.target.value)} /></div></label>
        <label><span>Expected extra {industry.unit}</span><div><input type="number" min="0" value={hire.expectedExtraUnits} onChange={(event) => updateModel(setHire, "expectedExtraUnits", event.target.value)} /></div></label>
      </div>
      {!hireAnalysis.valid ? <p className="decision-warning">{hireAnalysis.message}</p> : <>
        <div className="decision-summary four">
          <article><small>Fully loaded cost</small><strong>{format(hireAnalysis.monthlyHireCost, currency)}</strong><span>each month</span></article>
          <article><small>Break-even volume</small><strong>{hireAnalysis.wholeBreakEvenUnits}</strong><span>extra {industry.unit}</span></article>
          <article><small>Required revenue</small><strong>{format(hireAnalysis.revenueRequired, currency)}</strong><span>from added capacity</span></article>
          <article className={hireAnalysis.monthlyNetBenefit > 0 ? "safe" : "risk"}><small>Expected monthly impact</small><strong>{format(hireAnalysis.monthlyNetBenefit, currency)}</strong><span>after hire cost</span></article>
        </div>
        <div className={`price-verdict ${hireAnalysis.monthlyNetBenefit > 0 ? "safe" : "risk"}`}><UserPlus /><div><strong>{hireAnalysis.monthlyNetBenefit > 0 ? `The onboarding investment pays back in ${hireAnalysis.paybackMonths.toFixed(1)} months.` : "The expected volume does not yet fund this hire."}</strong><p>The role needs {Math.ceil(hireAnalysis.requiredLeads)} extra leads and {hireAnalysis.utilizationNeededPct.toFixed(1)}% of entered productive capacity to cover its monthly cost.</p></div></div>
      </>}
    </div>}

    {active === "timeline" && <div className="decision-panel">
      <div className="panel-intro"><div><small>BREAK-EVEN TIMELINE</small><h3>Map the month your operating model and startup investment recover.</h3><p>Project up to 60 months using a transparent, compounding volume assumption.</p></div></div>
      <div className="decision-input-grid three">
        <label><span>Startup investment</span><div><small>{currency}</small><input type="number" min="0" value={timeline.startupInvestment} onChange={(event) => updateModel(setTimeline, "startupInvestment", event.target.value)} /></div></label>
        <label><span>Starting monthly {industry.unit}</span><div><input type="number" min="0" value={timeline.startingMonthlyUnits} onChange={(event) => updateModel(setTimeline, "startingMonthlyUnits", event.target.value)} /></div></label>
        <label><span>Monthly volume growth</span><div><input type="number" min="-99" step="0.1" value={timeline.growthPct} onChange={(event) => updateModel(setTimeline, "growthPct", event.target.value)} /><small>%</small></div></label>
      </div>
      {timelineAnalysis.valid && <>
        <div className="decision-summary four">
          <article><small>Operating break-even</small><strong>{timelineAnalysis.wholeOperatingBreakEvenUnits}</strong><span>{industry.unit} each month</span></article>
          <article><small>Break-even revenue</small><strong>{format(timelineAnalysis.operatingBreakEvenRevenue, currency)}</strong><span>monthly operating floor</span></article>
          <article className={timelineAnalysis.paybackMonth ? "safe" : "risk"}><small>Investment recovered</small><strong>{timelineAnalysis.paybackMonth ? `Month ${timelineAnalysis.paybackMonth}` : "Beyond horizon"}</strong><span>cumulative payback</span></article>
          <article><small>Target profit reached</small><strong>{timelineAnalysis.targetProfitMonth ? `Month ${timelineAnalysis.targetProfitMonth}` : "Beyond horizon"}</strong><span>monthly target</span></article>
        </div>
        <div className="timeline-table"><div><span>Month</span><span>Volume</span><span>Revenue</span><span>Operating profit</span><span>Cumulative recovery</span></div>{timelineAnalysis.forecast.slice(0, 12).map((row) => <div key={row.month}><strong>{row.month}</strong><span>{row.units.toFixed(1)}</span><span>{format(row.revenue, currency)}</span><span className={row.operatingProfit >= 0 ? "positive" : "negative"}>{format(row.operatingProfit, currency)}</span><span className={row.cumulativeRecovery >= 0 ? "positive" : "negative"}>{format(row.cumulativeRecovery, currency)}</span></div>)}</div>
      </>}
    </div>}
    {active === "monitor" && <MonthlyMonitor input={input} result={result} industry={industry} industryKey={industryKey} currency={currency} userId={userId} />}
    <p className="decision-disclaimer">Decision Studio uses the assumptions above and deterministic formulas. It does not predict demand or guarantee a business outcome.</p>
  </section>;
}
