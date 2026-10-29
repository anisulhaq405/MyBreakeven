import React from 'react';
const fmt=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0,notation:'compact'}).format(n);
export default function FutureValueAnalysisCharts({plan,risk,goal}){
 if(!plan?.valid)return null;
 const rows=plan.rows.filter((row,i)=>i===0||i===plan.rows.length-1||row.months%12===0);
 const max=Math.max(1,...rows.flatMap(x=>[x.balance,Math.max(0,x.opening+x.deposit)]),Number(goal)||0);
 const px=i=>52+(rows.length===1?0:i/(rows.length-1))*606;
 const py=y=>204-Math.max(0,y)/max*165;
 const line=key=>rows.map((x,i)=>px(i)+','+py(x[key])).join(' ');
 const noFee=plan.noFeeBalance;
 const compareMax=Math.max(1,noFee,plan.balance);
 return <section className="fd-panel" id="fv-visual-analysis" aria-labelledby="fv-visual-title"><h2 id="fv-visual-title">Investment growth and cost analysis</h2><p>Annual checkpoints use your advanced-plan schedule. Chart lines are visual summaries; numerical values and downloaded schedule retain the calculation precision.</p>
 <figure className="fd-chart"><svg viewBox="0 0 710 245" role="img" aria-label="Advanced investment balance across the investment horizon"><path d="M52 39 V204 H660" stroke="#a3b2c1" fill="none"/><line x1="52" x2="660" y1={py(Number(goal)||0)} y2={py(Number(goal)||0)} stroke="#b8783c" strokeDasharray="5 5"/><polyline points={line('balance')} fill="none" stroke="#16665f" strokeWidth="3"/><text x="54" y="23" fontSize="12">{fmt(max)}</text><text x="54" y="226" fontSize="12">Start</text><text x="557" y="226" fontSize="12">{plan.years} years</text></svg><figcaption>Green: projected after-fee balance. Dashed amber: selected nominal savings target. Annual intervals may conceal between-year variation.</figcaption></figure>
 <h3>How fees affect the final value</h3><div role="img" aria-label={'Before fees '+fmt(noFee)+', after fees '+fmt(plan.balance)} className="fv-comparison-bars"><div><span>No-fee scenario</span><div style={{background:'#e5ebee',borderRadius:6}}><div style={{width:(noFee/compareMax*100)+'%',background:'#16665f',height:20,borderRadius:6}}/></div><strong>{fmt(noFee)}</strong></div><div><span>With fees</span><div style={{background:'#e5ebee',borderRadius:6}}><div style={{width:(plan.balance/compareMax*100)+'%',background:'#8d659f',height:20,borderRadius:6}}/></div><strong>{fmt(plan.balance)}</strong></div></div><p>Direct fees paid and lost future growth are both included in fee drag. Comparing otherwise identical deposits avoids attributing contribution differences to fees.</p>
 {risk?.valid&&<><h3>Simulated ending-value spread</h3><dl className="fd-cards"><div><dt>Lower simulated percentile (P10)</dt><dd>{fmt(risk.summary.p10)}</dd></div><div><dt>Median simulated ending value</dt><dd>{fmt(risk.summary.p50)}</dd></div><div><dt>Upper simulated percentile (P90)</dt><dd>{fmt(risk.summary.p90)}</dd></div></dl><p className="fd-note">These are modeled percentiles under the chosen annual return distribution, not guaranteed or statistically calibrated confidence limits.</p></>}
 </section>;
}
