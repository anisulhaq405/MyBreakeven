import React, { useEffect, useMemo, useState } from "react";
import { calculate, FORMULA_ENGINE_VERSION } from "./engine";
import { Download, FileText, Save, TrendingUp } from "lucide-react";
import { limitsFor, normalizePlan } from "./entitlements";
import { buildProReport } from "./reportBuilder";
import ProIntelligence from "./ProIntelligence";
import { advancedAnalysis } from "./advancedAnalysis";
const formatMoney = (n, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);
const safe = (s) => String(s).replaceAll('"', '""');
export default function ScenarioTools({ input, result, industry, industryKey, currency }) {
  const money = (n) => formatMoney(n, currency);
  const [drift, setDrift] = useState(10);
  const [saveState, setSaveState] = useState({ loading: false, message: "", error: "" });
  const [plan, setPlan] = useState("free");
  const limits = limitsFor(plan);
  const isPro = plan === "pro";
  useEffect(() => {
    import("./authClient").then(async ({ supabase }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
      setPlan(normalizePlan(data?.plan));
    });
  }, []);
  const scenarios = useMemo(
    () =>
      [
        {
          name: "Conservative",
          data: {
            ...input,
            price: input.price * 0.95,
            materialCost: input.materialCost * 1.1,
            laborCost: input.laborCost * 1.1,
            otherVariableCost: input.otherVariableCost * 1.1,
            acquisitionCost: input.acquisitionCost * 1.1,
            conversionPct: input.conversionPct * 0.85,
          },
        },
        { name: "Current plan", data: input },
        {
          name: "Optimized",
          data: {
            ...input,
            price: input.price * 1.05,
            materialCost: input.materialCost * 0.95,
            laborCost: input.laborCost * 0.95,
            otherVariableCost: input.otherVariableCost * 0.95,
            acquisitionCost: input.acquisitionCost * 0.95,
            conversionPct: Math.min(100, input.conversionPct * 1.1),
          },
        },
      ].map((s) => ({ ...s, result: calculate(s.data) })),
    [input],
  );
  const driftResult = useMemo(
    () =>
      calculate({
        ...input,
        materialCost: input.materialCost * (1 + drift / 100),
        laborCost: input.laborCost * (1 + drift / 100),
        otherVariableCost: input.otherVariableCost * (1 + drift / 100),
        acquisitionCost: input.acquisitionCost * (1 + drift / 100),
      }),
    [input, drift],
  );
  const reportAnalysis = useMemo(() => advancedAnalysis(input, result), [input, result]);
  const csv = () => {
    const rows = [
      ["MyBreakeven Feasibility Report"],
      ["Business", industry.name],
      ["Currency", currency],
      ["Engine", FORMULA_ENGINE_VERSION],
      ["Scenario", "Revenue", industry.unit, "Capacity", "Inquiries", "Score"],
      ...scenarios.map((s) => [
        s.name,
        s.result.revenue,
        s.result.jobs,
        s.result.capacity,
        s.result.leads,
        s.result.score,
      ]),
      [],
      ["Advanced Pro metrics"],
      ["Accounting break-even", reportAnalysis.accountingRevenue],
      ["Target-profit revenue", reportAnalysis.targetRevenue],
      ["Planned monthly revenue", reportAnalysis.plannedRevenue],
      ["Planned monthly profit", reportAnalysis.plannedProfit],
      ["Margin of safety %", reportAnalysis.marginSafetyPct],
      ["Capacity-safe minimum price", reportAnalysis.capacityPrice],
      ["Additional team members", reportAnalysis.additionalWorkers],
      [],
      ["Sensitivity driver", "Break-even impact %", "Viable"],
      ...reportAnalysis.drivers.map((driver) => [driver.name, driver.impact, driver.viable ? "Yes" : "No"]),
      [],
      ["12-month forecast"],
      ["Month", industry.unit, "Revenue", "Profit"],
      ...reportAnalysis.forecast.map((month) => [month.month, month.units, month.revenue, month.profit]),
    ];
    const blob = new Blob(
      [
        rows
          .map((r) => r.map((v) => `"${safe(v ?? "")}"`).join(","))
          .join("\n"),
      ],
      { type: "text/csv" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `mybreakeven-${industry.short.toLowerCase().replaceAll(" ", "-")}-report.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const print = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildProReport({ input, result, scenarios, analysis: reportAnalysis, industry, currency, engineVersion: FORMULA_ENGINE_VERSION }));
    w.document.close();
    w.focus();
    w.print();
  };
  const saveScenario = async () => {
    const name = window.prompt("Name this scenario", `${industry.short} plan – ${new Date().toLocaleDateString("en-US")}`)?.trim();
    if (!name) return;
    if (name.length > 80) return setSaveState({ loading: false, message: "", error: "Use a name with 80 characters or fewer." });
    setSaveState({ loading: true, message: "", error: "" });
    const { supabase } = await import("./authClient");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaveState({ loading: false, message: "", error: "Log in to save this scenario privately." });
      return;
    }
    const [{ data: profile }, { count }] = await Promise.all([
      supabase.from("profiles").select("plan").eq("id", user.id).single(),
      supabase.from("saved_scenarios").select("id", { count: "exact", head: true }),
    ]);
    const currentPlan = normalizePlan(profile?.plan);
    const currentLimits = limitsFor(currentPlan);
    setPlan(currentPlan);
    if ((count || 0) >= currentLimits.savedScenarios) {
      setSaveState({ loading: false, message: "", error: `${currentPlan === "pro" ? "Pro" : "Free"} plan limit reached (${currentLimits.savedScenarios} saved scenarios).` });
      return;
    }
    const { error } = await supabase.from("saved_scenarios").insert({ name, industry_key: industryKey, currency, inputs: input, engine_version: FORMULA_ENGINE_VERSION });
    const friendlyError = error?.message?.includes("PLAN_LIMIT_REACHED") ? `Plan limit reached (${currentLimits.savedScenarios} saved scenarios).` : error?.message;
    setSaveState(error ? { loading: false, message: "", error: friendlyError } : { loading: false, message: "Scenario saved. Open it from your dashboard.", error: "" });
  };
  if (!result.valid) return null;
  return (
    <section className="scenario-tools">
      <div className="tools-heading">
        <div>
          <span>PLANNING TOOLS</span>
          <h2>Compare scenarios and stress-test rising costs</h2>
        </div>
        <div className="export-actions">
          <button onClick={saveScenario} disabled={saveState.loading}>
            <Save /> {saveState.loading ? "Saving…" : "Save scenario"}
          </button>
          {limits.exports ? <><button onClick={csv}><Download /> Download CSV</button><button className="primary" onClick={print}><FileText /> Print / Save PDF</button></> : <a className="tool-upgrade" href="/pricing/">Unlock CSV &amp; PDF with Pro</a>}
        </div>
      </div>
      {saveState.error && <p className="tool-message error" role="alert">{saveState.error} {saveState.error.startsWith("Log in") && <a href="/login/">Log in</a>}</p>}
      {saveState.message && <p className="tool-message success" role="status">{saveState.message} <a href="/dashboard/">View dashboard</a></p>}
      <div className="scenario-table">
        <div className="scenario-row heading">
          <span>Scenario</span>
          <span>Revenue</span>
          <span>{industry.unit}</span>
          <span>Inquiries</span>
          <span>Score</span>
        </div>
        {scenarios.map((s) => (
          <div
            className={`scenario-row ${s.name === "Current plan" ? "current" : ""}`}
            key={s.name}
          >
            <strong>{s.name}</strong>
            <span>
              {s.result.valid ? money(s.result.revenue) : "Not viable"}
            </span>
            <span>{s.result.valid ? s.result.jobs.toFixed(2) : "—"}</span>
            <span>{s.result.valid ? s.result.leads.toFixed(2) : "—"}</span>
            <span>{s.result.score ?? "—"}/100</span>
          </div>
        ))}
      </div>
      {isPro ? <div className="drift-card">
        <TrendingUp />
        <div>
          <label htmlFor="drift">
            Variable-cost increase: <strong>{drift}%</strong>
          </label>
          <input
            id="drift"
            type="range"
            min="0"
            max="25"
            value={drift}
            onChange={(e) => setDrift(Number(e.target.value))}
          />
          <p>
            Break-even moves from <b>{money(result.revenue)}</b> to{" "}
            <b>
              {driftResult.valid ? money(driftResult.revenue) : "not viable"}
            </b>
            {driftResult.valid
              ? `, requiring ${(driftResult.jobs - result.jobs).toFixed(2)} additional ${industry.unit}.`
              : " because contribution becomes non-positive."}
          </p>
        </div>
      </div> : <div className="drift-card locked-tool"><TrendingUp /><div><strong>Cost-drift stress testing is a Pro feature</strong><p>Free accounts can save up to 3 scenarios. Pro unlocks cost-drift analysis, 3-way comparison and downloadable reports.</p><a href="/pricing/">View Pro features</a></div></div>}
      <ProIntelligence input={input} result={result} industry={industry} currency={currency} isPro={isPro} />
    </section>
  );
}
