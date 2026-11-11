import Decimal from 'decimal.js';

const D = Decimal.clone({precision: 40});
export const roasDefaults = {price:80,cost:44,fee:3,spend:1000,revenue:4000,margin:10,costMode:'total',product:32,fulfillment:6,shipping:4,flatFee:0.5,other:1.5,support:0,overhead:0};
const costKeys = ['product','fulfillment','shipping','flatFee','other'];
const names = {price:'Average order value',cost:'Direct cost per order',fee:'Percentage selling fee',spend:'Ad spend',revenue:'Attributed net revenue',margin:'Target remaining margin',product:'Product cost',fulfillment:'Fulfillment and packaging',shipping:'Net shipping cost',flatFee:'Flat transaction fee',other:'Other unrecovered order costs',support:'Campaign support cost',overhead:'Allocated fixed overhead'};

// One retained-net-revenue basis. Refunds are not deducted a second time here.
export function calculateRoas(input) {
  const itemized = input.costMode === 'itemized';
  if (input.costMode != null && !['total','itemized'].includes(input.costMode)) return {valid:false,message:'Choose total or itemized direct costs.'};
  const keys = ['price','fee','spend','revenue','margin','support','overhead',...(itemized ? costKeys : ['cost'])];
  const errors = {};
  for (const k of keys) {
    const v = input[k] ?? (['support','overhead'].includes(k) ? 0 : undefined);
    if (v == null || String(v).trim() === '' || !Number.isFinite(Number(v)) || Number(v)<0 || Number(v)>1e12) errors[k] = `${names[k]}: enter a number from 0 to 1 trillion.`;
  }
  if (!errors.price && Number(input.price)===0) errors.price = 'Average order value must be above zero.';
  for (const k of ['fee','margin']) if (!errors[k] && Number(input[k])>=100) errors[k] = `${names[k]} must be below 100%.`;
  if (Object.keys(errors).length) return {valid:false,errors,message:Object.values(errors)[0]};
  const v=Object.fromEntries(keys.map(k=>[k,new D(input[k] ?? 0)]));
  const cost=itemized ? costKeys.reduce((sum,k)=>sum.plus(v[k]),new D(0)) : v.cost;
  const feeAmount=v.price.times(v.fee.div(100));
  const contribution=v.price.minus(cost).minus(feeAmount), rate=contribution.div(v.price);
  const goal=v.margin.div(100), availableRate=rate.minus(goal);
  const positive=rate.gt(0), attainable=availableRate.gt(0), hasSpend=v.spend.gt(0), hasRevenue=v.revenue.gt(0);
  const periodCosts=v.support.plus(v.overhead), totalSpend=v.spend.plus(periodCosts);
  const preAdContribution=v.revenue.times(rate), profit=preAdContribution.minus(v.spend), surplus=profit.minus(periodCosts);
  const targetCPA=attainable ? v.price.times(availableRate) : null;
  const campaignBreakEven=hasSpend && positive ? totalSpend.div(v.spend.times(rate)) : null;
  const campaignTarget=hasSpend && attainable ? totalSpend.div(v.spend.times(availableRate)) : null;
  const result={valid:true,cost,feeAmount,contribution,rate:rate.times(100),breakEven:positive?new D(1).div(rate):null,target:attainable?new D(1).div(availableRate):null,maxCPA:positive?contribution:new D(0),targetCPA,actual:hasSpend?v.revenue.div(v.spend):null,acos:hasRevenue?v.spend.div(v.revenue).times(100):null,targetAcos:attainable?availableRate.times(100):null,actualCPA:hasRevenue?v.spend.times(v.price).div(v.revenue):null,estimatedOrders:v.revenue.div(v.price),preAdContribution,profit,surplus,periodCosts,requiredRevenue:positive?v.spend.div(rate):null,campaignRequiredRevenue:positive?totalSpend.div(rate):null,campaignTargetRevenue:attainable?totalSpend.div(availableRate):null,campaignBreakEven,campaignTarget,remainingMargin:hasRevenue?surplus.div(v.revenue).times(100):null,targetGap:surplus.minus(v.revenue.times(goal)),status:surplus.isZero()?'break-even':surplus.gt(0)?'surplus':'shortfall'};
  for (const [k,n] of Object.entries(result)) if (n instanceof D) result[k]=n.toNumber();
  // Display minimum revenue upward and ad-cost ceilings downward to cents.
  result.maxCPACents=D.max(0,contribution).times(100).floor().div(100).toNumber();
  result.targetCPACents=targetCPA===null?null:targetCPA.times(100).floor().div(100).toNumber();
  result.requiredRevenueCents=positive?v.spend.div(rate).times(100).ceil().div(100).toNumber():null;
  result.campaignRequiredRevenueCents=positive?totalSpend.div(rate).times(100).ceil().div(100).toNumber():null;
  result.campaignTargetRevenueCents=attainable?totalSpend.div(availableRate).times(100).ceil().div(100).toNumber():null;
  // Scenario ROAS is net attributed revenue / the unchanged media budget.
  result.scenarios=hasSpend ? [1,2,2.5,3,4,5,6].map(roas=>{
    const revenue=v.spend.times(roas), surplus=revenue.times(rate).minus(totalSpend);
    return {roas,revenue:revenue.toNumber(),surplus:surplus.toNumber(),margin:surplus.div(revenue).times(100).toNumber(),status:surplus.isZero()?'Break-even':surplus.gt(0)?'Surplus':'Shortfall'};
  }) : [];
  const finite=value=>Array.isArray(value)?value.every(finite):value&&typeof value==='object'?Object.values(value).every(finite):typeof value!=='number'||Number.isFinite(value);
  if(!finite(result)) return {valid:false,message:'These proportions are too extreme to display reliably. Use larger order values or less extreme ratios.'};
  return result;
}

export function roasCsv(input,currency,result) {
  if (!result.valid) return null;
  const rows=[['Break-Even ROAS Calculator','MyBreakeven'],['Currency label (no conversion)',currency],['Cost entry mode',input.costMode || 'total'],['Revenue basis','Net of discounts, refunds and tax collected for others'],['Scope','Same period, order mix and attribution window; planning estimate before tax and unentered commitments']];
  for (const k of ['price','fee',...(input.costMode==='itemized'?costKeys:['cost']),'spend','revenue','margin','support','overhead']) rows.push(['Input',names[k],input[k] ?? 0]);
  for (const [k,label] of Object.entries({cost:'Resolved direct cost per order',contribution:'Contribution per order before ads',rate:'Contribution margin percent',breakEven:'Order contribution break-even ROAS x',target:'Order target ROAS x',maxCPA:'Contribution-only CPA ceiling',targetCPA:'Target CPA before period costs',actual:'Actual net ROAS x',acos:'Actual ACoS percent',actualCPA:'Estimated media CPA',profit:'Contribution after ads',surplus:'Remaining after entered period costs',campaignBreakEven:'Period break-even ROAS x',campaignTarget:'Period target ROAS x',campaignRequiredRevenue:'Period break-even net revenue',campaignTargetRevenue:'Period target net revenue',targetGap:'Surplus less requested target amount'})) rows.push(['Result',label,result[k]===null?'Not defined / no finite threshold':result[k]]);
  rows.push([],['Scenario ROAS x','Net revenue','Remaining after period costs','Remaining margin percent']);
  for (const s of result.scenarios) rows.push([s.roas,s.revenue,s.surplus,s.margin]);
  const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
  return '\ufeff'+rows.map(row=>row.map(quote).join(',')).join('\r\n');
}
