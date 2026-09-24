import React, { useMemo, useState } from "react";
import { Activity, BarChart3, BrainCircuit, Gauge, LockKeyhole, Target } from "lucide-react";
import { advancedAnalysis } from "./advancedAnalysis";
import ProDecisionStudio from "./ProDecisionStudio";

const money=(n,c)=>new Intl.NumberFormat("en-US",{style:"currency",currency:c,maximumFractionDigits:0}).format(n||0);
const points=(values,w=640,h=190)=>{const min=Math.min(0,...values),max=Math.max(1,...values),span=max-min;return values.map((v,i)=>`${(i/(values.length-1))*w},${h-((v-min)/span)*h}`).join(" ")};

export default function ProIntelligence({input,result,industry,industryKey,currency,isPro,userId}){
  const [plannedUnits,setPlannedUnits]=useState(Math.ceil(result.jobs*1.15));
  const [growth,setGrowth]=useState(2);
  const analysis=useMemo(()=>advancedAnalysis(input,result,{plannedUnits,growthPct:growth}),[input,result,plannedUnits,growth]);
  if(!isPro) return <section id="pro-analysis" className="pro-intel locked-intel"><LockKeyhole/><div><span>PRO INTELLIGENCE</span><h2>See the decision behind the break-even number</h2><p>Unlock Offer Mix, Price Guard, Acquisition, Hire, Timeline and Monthly Monitor tools—plus forecasting, risk sensitivity and advanced charts.</p><a href="/pricing/">Explore Pro — $9.99/month</a></div></section>;
  const maxImpact=Math.max(1,...analysis.drivers.map(x=>Math.abs(x.impact ?? 0)));
  const profits=analysis.forecast.map(x=>x.profit);
  return <section id="pro-analysis" className="pro-intel">
    <header><div><span>PRO INTELLIGENCE</span><h2>Advanced break-even decision dashboard</h2><p>Move from one target to a tested operating plan. <a href="/pro-user-guide/" className="pro-intel-guide-link">Visual step-by-step guide</a></p></div><BrainCircuit/></header>
    <div className="intel-kpis">
      <article><Target/><small>Accounting break-even</small><strong>{money(analysis.accountingRevenue,currency)}</strong></article>
      <article><Activity/><small>Target-profit revenue</small><strong>{money(analysis.targetRevenue,currency)}</strong></article>
      <article><Gauge/><small>Margin of safety</small><strong>{analysis.marginSafetyPct.toFixed(1)}%</strong></article>
      <article><BarChart3/><small>Planned monthly profit</small><strong>{money(analysis.plannedProfit,currency)}</strong></article>
    </div>
    <div className="intel-controls"><label>Expected monthly {industry.unit}<input type="number" min="0" step="1" value={plannedUnits} onChange={e=>setPlannedUnits(Math.max(0,Number(e.target.value)))} /></label><label>Monthly growth rate<input type="number" min="-25" max="50" step="0.5" value={growth} onChange={e=>setGrowth(Number(e.target.value))}/><b>%</b></label></div>
    <div className="intel-grid">
      <article className="wide"><header><div><span>12-month outlook</span><strong>Profit forecast</strong></div><small>{growth}% monthly growth</small></header><svg viewBox="0 0 640 220" role="img" aria-label="Twelve month profit forecast"><line x1="0" y1="190" x2="640" y2="190"/><polyline points={points(profits)} /><g>{profits.map((v,i)=><circle key={i} cx={(i/11)*640} cy={Number(points(profits).split(" ")[i].split(",")[1])} r="4"><title>Month {i+1}: {money(v,currency)}</title></circle>)}</g></svg><div className="chart-axis"><span>Month 1</span><span>Month 12 · {money(profits[11],currency)}</span></div></article>
      <article><header><div><span>Risk sensitivity</span><strong>Biggest break-even drivers</strong></div></header><div className="tornado">{analysis.drivers.slice(0,6).map(d=><div key={d.name}><label><span>{d.name}</span><b>{d.impact === null ? "Not viable" : `${d.impact >= 0 ? "+" : ""}${d.impact.toFixed(1)}%`}</b></label><i><b style={{width:`${Math.min(100,(d.impact === null ? maxImpact : Math.abs(d.impact))/maxImpact*100)}%`}}/></i></div>)}</div></article>
      <article><header><div><span>Capacity solver</span><strong>Can the team deliver?</strong></div></header><dl><div><dt>Capacity-safe minimum price</dt><dd>{analysis.capacityPrice?money(analysis.capacityPrice,currency):"Not available"}</dd></div><div><dt>Additional team members</dt><dd>{analysis.additionalWorkers ?? "Not available"}</dd></div><div><dt>Planned revenue</dt><dd>{money(analysis.plannedRevenue,currency)}</dd></div><div><dt>Safety cushion</dt><dd>{money(analysis.marginSafetyRevenue,currency)}</dd></div></dl></article>
      <article className="wide"><header><div><span>Price × volume</span><strong>Monthly profit heatmap</strong></div><small>Green profit · red loss</small></header><div className="heatmap"><div/><>{[-10,-5,0,5,10].map(x=><b key={x}>{x>0?"+":""}{x}% price</b>)}</>{analysis.heatmap.map(row=><React.Fragment key={row.volumeFactor}><b>{Math.round(row.volumeFactor*100)}% volume</b>{row.cells.map(cell=><span className={cell.profit>=0?"profit":"loss"} key={cell.priceChange}>{money(cell.profit,currency)}</span>)}</React.Fragment>)}</div></article>
    </div>
    <ProDecisionStudio input={input} result={result} industry={industry} industryKey={industryKey} currency={currency} userId={userId} />
    <p className="intel-note">Analysis is based on your assumptions and formula engine outputs; it is not accounting, tax, lending or investment advice.</p>
  </section>;
}
