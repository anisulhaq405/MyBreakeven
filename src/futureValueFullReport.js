const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const format=n=>Number.isFinite(n)?n.toFixed(2):'Unavailable';
export function futureValueFullReportCsv({inputs,settings,goal,currency,plan,baseline,comparison,milestones,cashFlows,risk,riskSettings,taxReserve,planningLens,growthBreakdown,assetResult,assetSettings}){
 const section=(label,rows)=>[[label],...rows,[]];
 const items=[['MyBreakEven Future Value — comprehensive planning report'],['Currency',currency,'Currency label only; no foreign exchange conversion'],['Report scope','Illustrative scenarios; not a forecast, guarantee, or personalized investment advice'],[],
 ...section('Core assumptions',Object.entries(inputs).map(([key,value])=>[key,value])),
 ...section('Advanced plan settings',Object.entries(settings).map(([key,value])=>[key,value])),
 ...section('Deterministic projection',baseline?.valid?[['Baseline ending balance',format(baseline.balance)],['Baseline contributions',format(baseline.contributed)],['Baseline inflation-adjusted balance',format(baseline.real)]]:[['Status','Unavailable']]),
 ...section('Advanced fee and step-up results',plan?.valid?[['After-fee future balance',format(plan.balance)],['No-fee balance on identical contributions',format(plan.noFeeBalance)],['Direct fees paid',format(plan.fees)],['Fee drag with lost compounding',format(plan.feeDrag)],['Total invested capital',format(plan.contributed)],['Inflation-adjusted balance',format(plan.real)]]:[['Status','Unavailable']]),
 ...section('Savings goal and milestones',[['Nominal savings goal',goal],...(milestones?.valid?milestones.marks.map(m=>[Math.round(m.fraction*100)+'% milestone',m.months===null?'Not reached':m.months+' months']):[['Status','Unavailable']])]),
 ...section('Compared investment plans',comparison?.results?.map(x=>[x.label,x.input.rate+'%',x.result.valid?format(x.result.balance):'Invalid',x.result.valid?format(x.result.fees):'Unavailable'])||[]),
 ...section('Custom cash flows',cashFlows?.valid?[['Ending balance',format(cashFlows.balance)],['Net invested cash',format(cashFlows.netCash)],...cashFlows.rows.filter(x=>x.custom!==0).map(x=>['Period '+x.period+' custom flow',format(x.custom)])]:[['Status','Unavailable']]),
 ...section('Tax and business reserve assumptions',Object.entries(planningLens||{}).map(([key,value])=>[key,value])),
 ...section('Tax and reserve planning results',taxReserve?.valid?[['Illustrative gains tax',format(taxReserve.estimatedTax)],['Illustrative after-tax value',format(taxReserve.afterTax)],['Business reserve target',format(taxReserve.requiredReserve)],['Surplus after reserve',format(taxReserve.surplusAfterReserve)],['Model limitations',taxReserve.model]]:[['Status','Unavailable']]),
 ...section('Growth and contribution reconciliation',growthBreakdown?.valid?[['Total contributions',format(growthBreakdown.contributions)],['Gross investment growth',format(growthBreakdown.grossGrowth)],['Fees paid',format(growthBreakdown.fees)],['Net investment growth',format(growthBreakdown.netGrowth)],['Closing balance',format(growthBreakdown.finalBalance)],...growthBreakdown.checkpoints.map(x=>['Month '+x.months,format(x.contributions),format(x.balance),format(x.growth)])]:[['Status','Unavailable']]),
 ...section('Asset planning inputs',Object.entries(assetSettings||{}).map(([k,v])=>[k,v])),
 ...section('Asset planning results',assetResult?.valid?[['Projected asset value',format(assetResult.projected)],['Cumulative holding costs',format(assetResult.cumulativeCosts)],['Net sale proceeds',format(assetResult.netProceeds)],['Asset net gain',format(assetResult.netGain)],['Inflation-adjusted sale proceeds',format(assetResult.realProceeds)],['Model limitations',assetResult.model]]:[['Status','Unavailable']]),
 ...section('Risk model settings',Object.entries(riskSettings).map(([key,value])=>[key,value])),
 ...section('Simulation outcomes',risk?.valid?[['P10',format(risk.summary.p10)],['Median',format(risk.summary.p50)],['P90',format(risk.summary.p90)],['Median real value',format(risk.realMedian)],['Share of modeled paths meeting target',risk.probability===null?'Unavailable':(100*risk.probability).toFixed(2)+'%'],['Simulation model',risk.model]]:[['Status','Unavailable']]),
 ...section('Detailed advanced schedule',plan?.valid?[['Period','Months','Opening balance','Regular deposit','Growth','Fees','Closing balance'],...plan.rows.map(x=>[x.period,x.months,format(x.opening),format(x.deposit),format(x.growth),format(x.fee),format(x.balance)])]:[['Status','Unavailable']]),
 ];
 return '\uFEFF'+items.map(row=>row.map(cell).join(',')).join('\r\n');
}
