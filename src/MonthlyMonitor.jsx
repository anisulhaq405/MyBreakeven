import React, { useEffect, useMemo, useState } from "react";
import { analyzeMonth, snapshotPlan } from "./monthlyMonitor";
import { deleteMonthlyRecord, monthlyMonitorKey, readMonthlyRecords, upsertMonthlyRecord } from "./monthlyMonitorStorage";
import "./monthly-monitor.css";

const currentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};
const emptyActual = month => ({ month, units: "", revenue: "", variableCosts: "", fixedCosts: "", ownerPay: "", inquiries: "" });
const money = (value, currency) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
const count = value => new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);

export default function MonthlyMonitor({ input, result, industry, industryKey, currency, userId }) {
  const [actual, setActual] = useState(() => emptyActual(currentMonth()));
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const key = userId ? monthlyMonitorKey(userId, industryKey, currency) : null;
  const plan = useMemo(() => snapshotPlan(input, result), [input, result]);
  const review = useMemo(() => analyzeMonth(actual, plan), [actual, plan]);

  useEffect(() => {
    setActual(emptyActual(currentMonth()));
    setMessage("");
    setError("");
    if (!key) { setRecords([]); return; }
    try {
      setRecords(readMonthlyRecords(localStorage, key));
    } catch {
      setRecords([]);
      setError("Saved months could not be read in this browser. No data was changed.");
    }
  }, [key]);

  const selectMonth = month => {
    const saved = records.find(record => record.actual.month === month);
    setActual(saved ? { ...saved.actual } : emptyActual(month));
    setMessage("");
    setError("");
  };
  const persist = operation => {
    try {
      const next = operation();
      setRecords(next);
      return true;
    } catch {
      setError("This browser could not save the month. Check available browser storage.");
      return false;
    }
  };
  const save = () => {
    setMessage("");
    if (!key) return setError("Your account is still loading. Try again in a moment.");
    if (!review.valid) return setError(review.message);
    if (!records.some(row => row.actual.month === actual.month) && records.length >= 24) return setError("The 24-month browser limit is reached. Remove an older month to add another.");
    if (persist(() => upsertMonthlyRecord(localStorage, key, records, { actual: { ...actual }, plan: { ...plan } }))) { setError(""); setMessage(`${actual.month} saved in this browser with today's plan snapshot.`); }
  };
  const remove = () => {
    if (!key || !records.some(row => row.actual.month === actual.month)) return;
    if (persist(() => deleteMonthlyRecord(localStorage, key, records, actual.month))) {
      setActual(emptyActual(actual.month));
      setError("");
      setMessage(`${actual.month} removed from this browser.`);
    }
  };
  const chart = records.slice().sort((a, b) => a.actual.month.localeCompare(b.actual.month)).map(record => ({
    month: record.actual.month,
    ...analyzeMonth(record.actual, record.plan),
  })).filter(row => row.valid);
  const max = Math.max(1, ...chart.map(row => Math.abs(row.profit)));
  const fields = [
    ["units", `Completed ${industry.unit}`, "1"],
    ["revenue", `Revenue (${currency})`, "0.01"],
    ["variableCosts", `Variable costs including fees (${currency})`, "0.01"],
    ["fixedCosts", `Fixed overhead (${currency})`, "0.01"],
    ["ownerPay", `Owner pay (${currency})`, "0.01"],
    ["inquiries", "Customer inquiries", "1"],
  ];
  return <div className="decision-panel monthly-monitor">
    <div className="panel-intro"><div><small>MONTHLY BREAK-EVEN MONITOR</small><h3>Compare the plan with what really happened.</h3><p>Record your month-end totals. Profit here is revenue minus variable costs, fixed overhead and owner pay.</p></div></div>
    <p className="monitor-privacy">Months are saved only in this browser, separately for this account, business model and currency. They will not sync to another device.</p>
    <div className="monitor-month"><label htmlFor="monitor-month">Month</label><input id="monitor-month" type="month" value={actual.month} onChange={event => selectMonth(event.target.value)} /><span>{records.length}/24 months saved</span></div>
    <div className="decision-input-grid three monitor-fields">{fields.map(([field, label, step]) => <label key={field}><span>{label}</span><div><input type="number" min="0" step={step} inputMode="decimal" value={actual[field]} onChange={event => setActual(current => ({ ...current, [field]: event.target.value }))} /></div></label>)}</div>
    <div className="monitor-actions"><button type="button" onClick={save} disabled={!userId}>Save / update month</button>{records.some(row => row.actual.month === actual.month) && <button type="button" className="monitor-remove" onClick={remove}>Remove this month</button>}</div>
    {error && <p className="decision-warning" role="alert">{error}</p>}{message && <p className="monitor-message" role="status">{message}</p>}
    {review.valid && <><div className="decision-summary four">
      <article className={review.profit >= 0 ? "safe" : "risk"}><small>Actual profit after owner pay</small><strong>{money(review.profit, currency)}</strong><span>{money(review.profitGap, currency)} vs current plan target</span></article>
      <article className={review.revenueGap >= 0 ? "safe" : "risk"}><small>Revenue vs plan</small><strong>{money(actual.revenue, currency)}</strong><span>{money(review.revenueGap, currency)} from {money(plan.targetRevenue, currency)}</span></article>
      <article className={review.unitGap >= 0 ? "safe" : "risk"}><small>Completed volume</small><strong>{actual.units}</strong><span>{count(review.unitGap)} vs {count(plan.targetUnits)} target</span></article>
      <article><small>Actual break-even volume</small><strong>{review.breakEvenUnits === null ? "Unavailable" : count(review.breakEvenUnits)}</strong><span>{review.breakEvenUnits === null ? "Positive contribution per sale required" : `${industry.unit} at actual unit economics`}</span></article>
    </div><p className="monitor-context">Preview compares with the current calculator plan. Saving the month keeps a snapshot of that plan. {review.conversionPct === null ? "Enter inquiries to see actual conversion." : `Actual inquiry conversion: ${count(review.conversionPct)}%.`}</p></>}
    {chart.length > 0 && <div className="monitor-history"><h4>Saved monthly results</h4><p>Each month is compared with the plan snapshot saved alongside it.</p><div className="monitor-bars" role="list">{chart.map(row => <div className="monitor-row" role="listitem" key={row.month}><span>{row.month}</span><div className="monitor-track"><i className={row.profit >= 0 ? "positive" : "negative"} style={{ width: `${Math.max(2, Math.abs(row.profit) / max * 100)}%` }} /></div><strong>{money(row.profit, currency)}</strong><small>{row.profitGap >= 0 ? "+" : ""}{money(row.profitGap, currency)} vs goal</small></div>)}</div></div>}
  </div>;
}
