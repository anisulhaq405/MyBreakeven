import React, { useMemo, useState } from "react";
import { calculate, FORMULA_ENGINE_VERSION } from "./engine";
import { Download, FileText, TrendingUp } from "lucide-react";
const formatMoney = (n, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);
const safe = (s) => String(s).replaceAll('"', '""');
export default function ScenarioTools({ input, result, industry, currency }) {
  const money = (n) => formatMoney(n, currency);
  const [drift, setDrift] = useState(10);
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
    w.document.write(
      `<!doctype html><title>MyBreakeven Feasibility Report</title><style>body{font:16px Arial;color:#11182c;max-width:850px;margin:45px auto;padding:20px}h1{color:#5545e8}table{width:100%;border-collapse:collapse;margin:25px 0}th,td{padding:12px;border:1px solid #dce1f2;text-align:left}.note{color:#657087;font-size:13px}</style><h1>MyBreakeven Feasibility Report</h1><h2>${industry.name}</h2><p>Generated ${new Date().toLocaleDateString("en-US")}</p><h3>Current result</h3><table><tr><th>Exact break-even revenue</th><td>${money(result.revenue)}</td></tr><tr><th>Exact ${industry.unit} needed</th><td>${result.jobs.toFixed(2)}</td></tr><tr><th>Minimum whole ${industry.unit}</th><td>${result.wholeJobs}</td></tr><tr><th>Exact capacity</th><td>${result.capacity.toFixed(2)}</td></tr><tr><th>Exact inquiries</th><td>${result.leads.toFixed(2)}</td></tr><tr><th>Feasibility score</th><td>${result.score}/100</td></tr></table><h3>Scenario comparison</h3><table><tr><th>Scenario</th><th>Revenue</th><th>${industry.unit}</th><th>Score</th></tr>${scenarios.map((s) => `<tr><td>${s.name}</td><td>${s.result.valid ? money(s.result.revenue) : "Not viable"}</td><td>${s.result.valid ? s.result.jobs.toFixed(2) : "—"}</td><td>${s.result.score ?? "—"}</td></tr>`).join("")}</table><p class="note">Formula engine ${FORMULA_ENGINE_VERSION}. Assumption-based planning estimate—not tax, legal, accounting or lending advice.</p>`,
    );
    w.document.close();
    w.focus();
    w.print();
  };
  if (!result.valid) return null;
  return (
    <section className="scenario-tools">
      <div className="tools-heading">
        <div>
          <span>FREE PLANNING TOOLS</span>
          <h2>Compare scenarios and stress-test rising costs</h2>
        </div>
        <div className="export-actions">
          <button onClick={csv}>
            <Download /> Download CSV
          </button>
          <button className="primary" onClick={print}>
            <FileText /> Print / Save PDF
          </button>
        </div>
      </div>
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
      <div className="drift-card">
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
      </div>
    </section>
  );
}
