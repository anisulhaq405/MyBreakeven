import React, { useEffect, useState } from "react";
import { builtFields, calculateBuiltCosts, costProfiles, otherLabels, seedCostDraft } from "./costBuilder";
import "./cost-builder.css";

export default function CostBuilder({ industryKey, input, currency = "USD", onApply }) {
  const profile = costProfiles[industryKey];
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => seedCostDraft(industryKey, input));
  const [message, setMessage] = useState("");
  useEffect(() => {
    const saved = input.costBuilder;
    const savedResult = saved?.industryKey === industryKey && calculateBuiltCosts(industryKey, saved.draft);
    setDraft(savedResult?.valid && builtFields.every(key => Number(input[key]) === savedResult.patch[key]) ? saved.draft : seedCostDraft(industryKey, input));
    setMessage("");
  }, [industryKey, input.costBuilder, ...builtFields.map(key => input[key])]);
  const result = calculateBuiltCosts(industryKey, draft);
  const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  const update = (key, value) => { setDraft(current => ({ ...current, [key]: value })); setMessage(""); };
  const amountField = (label, value, onChange, suffix = currency) => <label><span>{label}</span><div className="cost-builder-control"><input aria-label={label} type="number" inputMode="decimal" min="0" step="any" value={value} onChange={event => { onChange(event.target.value); setMessage(""); }} aria-invalid={value === "" || Number(value) < 0} /><small>{suffix}</small></div></label>;
  const listFields = (labels, key) => labels.map((label, index) => <React.Fragment key={label}>{amountField(label, draft[key][index], value => setDraft(current => ({ ...current, [key]: current[key].map((amount, i) => i === index ? value : amount) })))}</React.Fragment>);
  const sameAsApplied = input.costBuilder?.industryKey === industryKey && JSON.stringify(input.costBuilder.draft) === JSON.stringify(draft) && result.valid && builtFields.every(key => Number(input[key]) === result.patch[key]);
  return <section className="cost-builder" aria-label={`${profile.unit} cost builder`}>
    <button type="button" className="cost-builder-toggle" aria-expanded={open} onClick={() => setOpen(current => !current)}><span><strong>Build my costs</strong><small>Optional · add up the expenses for one {profile.unit}</small></span><b aria-hidden="true">{open ? "−" : "+"}</b></button>
    {open && <div className="cost-builder-body">
      <p>Enter costs for one {profile.unit}. Preview them here, then choose <strong>Use these costs</strong> to update the calculator.</p>
      <label className="cost-builder-service"><span>Service / product type</span><select value={draft.service} onChange={event => { setDraft(seedCostDraft(industryKey, input, Number(event.target.value))); setMessage(""); }}>{profile.services.map((service, index) => <option value={index} key={service}>{service}</option>)}</select></label>
      <p className="cost-builder-hint">{profile.context}</p>
      <p className="cost-builder-hint">When starting from current totals, each total goes in the first row of its group. Split it across the rows; do not add it again.</p>
      <details open><summary>1. Materials / products</summary><div className="cost-builder-fields">{listFields(profile.materials, "materials")}</div></details>
      <details><summary>2. Labor and delivery time</summary><div className="cost-builder-fields">
        <label><span>How do you enter direct pay?</span><select value={draft.laborMode} onChange={event => update("laborMode", event.target.value)}><option value="total">I know the total</option><option value="hourly">Hours × hourly pay</option></select></label>
        {draft.laborMode === "total" ? <>{amountField(`Direct pay per ${profile.unit}`, draft.laborTotal, value => update("laborTotal", value))}{amountField(`Total team-hours per ${profile.unit}`, draft.deliveryHours, value => update("deliveryHours", value), "hours")}</> : profile.roles.map((role, index) => <fieldset key={role}><legend>{role}</legend>{amountField(`${role}: total team-hours`, draft.roles[index].hours, value => setDraft(current => ({ ...current, roles: current.roles.map((r, i) => i === index ? { ...r, hours: value } : r) })), "hours")}{amountField(`${role}: hourly pay`, draft.roles[index].rate, value => setDraft(current => ({ ...current, roles: current.roles.map((r, i) => i === index ? { ...r, rate: value } : r) })), `${currency}/hour`)}</fieldset>)}
      </div><p className="cost-builder-hint">Hourly mode replaces the direct-pay total with hours × pay; it does not add to it. Count every person's hours, including your own. For owner time paid through monthly owner pay, use 0 hourly pay here. Keep fixed payroll in overhead if already included there.</p></details>
      <details><summary>3. Other expenses</summary><div className="cost-builder-fields">{listFields(otherLabels(profile, draft.service), "other")}</div></details>
      <div className="cost-builder-preview" aria-live="polite">{result.valid ? <><strong>Cost subtotal: {money(result.total)} per {profile.unit}</strong><span>Materials {money(result.patch.materialCost)} + direct pay {money(result.patch.laborCost)} + other expenses {money(result.patch.otherVariableCost)}</span><span>Delivery time: {Number(result.patch.hoursPerJob.toFixed(4))} total team-hours</span><small>Acquisition cost and percentage fees are added separately by the calculator. Monthly overhead, owner pay and target profit stay as entered.</small></> : <p role="alert">{result.message}</p>}</div>
      <div className="cost-builder-actions"><button type="button" disabled={!result.valid || sameAsApplied} onClick={() => { onApply({ ...result.patch, costBuilder: { industryKey, draft } }); setMessage("Costs applied. Results now use this breakdown."); }}>{sameAsApplied ? "Costs applied" : "Use these costs"}</button><button type="button" onClick={() => { setDraft(seedCostDraft(industryKey, input, draft.service)); setMessage("Draft rebuilt from the current calculator totals. Results have not changed."); }}>Start from current totals</button></div>
      <p className="cost-builder-status" role="status">{message || (sameAsApplied ? "Costs applied. Results use this breakdown." : "Preview only. Your calculator results have not changed.")}</p>
    </div>}
  </section>;
}
