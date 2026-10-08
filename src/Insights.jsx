import React from "react";
import { capacityDecision } from "./capacityDecision";
const money = (n, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);
export default function Insights({ result, input, industry, currency }) {
  if (!result.valid) return (
    <section className="insights" aria-label="Calculator needs review">
      <div className="insights-title">
        <span>CHECK YOUR ASSUMPTIONS</span>
        <h2>Review your calculator inputs</h2>
        <p role="status">{result.message}</p>
        <p>Adjust the fields above to see your contribution, sales target and capacity results.</p>
      </div>
      <a className="planning-next-step" href="#pro-analysis">Save your plan or explore Pro analysis →</a>
    </section>
  );
  const decision = capacityDecision(result);
  const total = input.price || 1,
    segments = [
      ["Materials", result.costs.materials, "#f59e0b"],
      ["Labor", result.costs.labor, "#55b8ad"],
      ["Other variable", result.costs.other, "#7b8fa2"],
      ["Acquisition", result.costs.acquisition, "#c87b4d"],
      ["Fees", result.costs.fees, "#a78bfa"],
      ["Contribution", result.contribution, "#0f9f91"],
    ],
    used = Math.min(100, decision.utilization ?? 100),
    max = Math.max(
      ...result.scenarios.filter((x) => x.jobs).map((x) => x.jobs),
    );
  return (
    <section className="insights">
      <div className="insights-title">
        <span>VISUAL FEASIBILITY REPORT</span>
        <h2>
          What the numbers mean for your {industry.short.toLowerCase()} business
        </h2>
        <p>
          Unit economics, operating capacity and price resilience are tested
          together.
        </p>
      </div>
      <div className="insight-grid">
        <article>
          <header>
            <span>Unit economics</span>
            <strong>{money(result.contribution, currency)} contribution</strong>
          </header>
          <div className="stacked">
            {segments.map(([n, v, c]) => (
              <i
                key={n}
                title={`${n}: ${money(v, currency)}`}
                style={{
                  width: `${Math.max(0, (v / total) * 100)}%`,
                  background: c,
                }}
              />
            ))}
          </div>
          <ul>
            {segments.map(([n, v, c]) => (
              <li key={n}>
                <b style={{ background: c }} />
                {n}
                <strong>{money(v, currency)}</strong>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <header>
            <span>Capacity feasibility</span>
            <strong>{decision.utilization === null ? "No delivery capacity" : `${decision.utilization.toFixed(2)}% of capacity required`}</strong>
          </header>
          <div className="gauge" style={{ "--used": `${used * 3.6}deg` }}>
            <div>
              <strong>{result.jobs.toFixed(2)}</strong>
              <small>
                of {result.capacity.toFixed(2)} {industry.unit}
              </small>
            </div>
          </div>
          <p className={result.gap >= 0 ? "positive" : "negative"}>
            {result.gap >= 0
              ? `Room for ${result.gap.toFixed(2)} more ${industry.unit}.`
              : `Short by ${Math.abs(result.gap).toFixed(2)} ${industry.unit}.`}
          </p>
          <p>{result.wholeJobs} whole {industry.unit} required; capacity for {result.wholeCapacity}. {decision.fits ? `Whole-unit cushion: ${decision.wholeGap}.` : `Whole-unit shortfall: ${Math.abs(decision.wholeGap)}.`}</p>
        </article>
        <article>
          <header>
            <span>Price sensitivity</span>
            <strong>Required {industry.unit}</strong>
          </header>
          <div className="scenario-chart">
            {result.scenarios.map((s) => (
              <div key={s.change}>
                <span>
                  {s.change > 0 ? "+" : ""}
                  {s.change}%
                </span>
                <i>
                  <b
                    style={{
                      height: `${s.jobs === null ? 100 : max > 0 ? Math.min(100, (s.jobs / max) * 100) : 0}%`,
                    }}
                  />
                </i>
                <strong>{s.jobs === null ? "N/A" : s.jobs.toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <p>
            Higher contribution reduces the volume needed to reach the same
            goal.
          </p>
        </article>
      </div>
      <p className="practical-demand">Plan for <strong>{result.wholeJobs.toLocaleString("en-US")} whole {industry.unit}</strong> and approximately <strong>{result.practicalLeads.toLocaleString("en-US")} inquiries</strong> at your entered conversion rate. Required inquiries for the exact fractional financial target are {result.leads.toFixed(2)}. Demand is an assumption, not a forecast.</p>
      <div className="decision">
        <strong>
          {decision.summary}
        </strong>
        <span>
          Assumption-based planning result—not a guarantee or professional
          advice.
        </span>
      </div>
      <a className="planning-next-step" href="#pro-analysis">Save your plan or explore Pro analysis →</a>
    </section>
  );
}
