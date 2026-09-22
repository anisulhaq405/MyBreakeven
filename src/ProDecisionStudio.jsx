import React, { useMemo, useState } from "react";
import { BadgeDollarSign, Layers3, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { analyzeOfferMix, analyzePriceGuard, buildBreakEvenLadder } from "./proDecisionEngine";

const numeric = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const format = (value, currency, digits = 0) => new Intl.NumberFormat("en-US", {
  style: "currency", currency, maximumFractionDigits: digits,
}).format(value || 0);

export default function ProDecisionStudio({ input, result, industry, currency }) {
  const baseVariable = input.materialCost + input.laborCost + input.otherVariableCost + input.acquisitionCost;
  const [active, setActive] = useState("mix");
  const [discount, setDiscount] = useState(10);
  const [buffer, setBuffer] = useState(10);
  const [offers, setOffers] = useState([
    { id: 1, name: `Core ${industry.singular}`, price: input.price, variableCost: baseVariable, mixPct: 70, hours: input.hoursPerJob },
    { id: 2, name: "Premium offer", price: Number((input.price * 1.35).toFixed(2)), variableCost: Number((baseVariable * 1.15).toFixed(2)), mixPct: 30, hours: Number((input.hoursPerJob * 1.25).toFixed(2)) },
  ]);
  const mix = useMemo(() => analyzeOfferMix(input, offers), [input, offers]);
  const price = useMemo(() => analyzePriceGuard(input, result, discount), [input, result, discount]);
  const ladder = useMemo(() => buildBreakEvenLadder(input, buffer), [input, buffer]);
  const updateOffer = (id, key, value) => setOffers((current) => current.map((offer) => offer.id === id ? { ...offer, [key]: key === "name" ? value : numeric(value) } : offer));
  const addOffer = () => setOffers((current) => current.length >= 6 ? current : [...current, {
    id: Math.max(0, ...current.map((offer) => offer.id)) + 1,
    name: `Offer ${current.length + 1}`, price: input.price, variableCost: baseVariable,
    mixPct: 10, hours: input.hoursPerJob,
  }]);
  return <section className="decision-studio">
    <header className="decision-head">
      <div><span>PRO DECISION STUDIO</span><h2>Move the decision. See the new break-even.</h2><p>Model your offer mix, protect pricing and understand each level the business must clear.</p></div>
      <ShieldCheck />
    </header>
    <nav className="decision-tabs" aria-label="Pro decision tools">
      <button className={active === "mix" ? "active" : ""} onClick={() => setActive("mix")}><Layers3 /> Offer Mix</button>
      <button className={active === "price" ? "active" : ""} onClick={() => setActive("price")}><BadgeDollarSign /> Price Guard</button>
      <button className={active === "ladder" ? "active" : ""} onClick={() => setActive("ladder")}><ShieldCheck /> Break-Even Ladder</button>
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
    <p className="decision-disclaimer">Decision Studio uses the assumptions above and deterministic formulas. It does not predict demand or guarantee a business outcome.</p>
  </section>;
}
