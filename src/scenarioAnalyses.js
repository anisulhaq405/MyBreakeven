import { calculate, FORMULA_ENGINE_VERSION } from './engine.js';

// Controlled fictional inputs, not market data. Every output comes from the unchanged product engine.
const shared = {materialCost:0,laborCost:0,otherVariableCost:0,acquisitionCost:0,fixedCosts:0,ownerPay:0,targetProfit:0,paymentFeePct:0,workers:1,hoursPerWorker:40,hoursPerJob:1,utilizationPct:75,conversionPct:25};
const restaurantRows = [20,25,30,35].flatMap(price => [4,6,8,10,12].map(materialCost => {
  const input = {...shared,price,materialCost,otherVariableCost:2,paymentFeePct:4,fixedCosts:23000,ownerPay:4000,workers:6,hoursPerJob:0.15};
  const result = calculate(input);
  return {id:`R${price}-${materialCost}`,input,result,openDays:26,dailyOrders:Math.ceil(result.wholeJobs/26)};
}));
const landscapeRows = [80,100,110.72,120].flatMap(contribution => [8000,9800,11300,12200,14000].map(funding => {
  // Price320 − materials62 − labor96 − acquisition18 − fee9.28 − other = contribution.
  // Explicit cents prevent floating-point residue in the engine's input boundary.
  const otherVariableCost = Number((134.72-contribution).toFixed(2));
  const input = {...shared,price:320,materialCost:62,laborCost:96,otherVariableCost,acquisitionCost:18,paymentFeePct:2.9,fixedCosts:funding-6500,ownerPay:5000,targetProfit:1500,workers:4,hoursPerWorker:38,hoursPerJob:5,utilizationPct:72,conversionPct:28};
  const result=calculate(input);
  return {id:`L${contribution}-${funding}`,input,result,wholeJobGap:result.wholeCapacity-result.wholeJobs};
}));
export const scenarioAnalyses = {
  'restaurant-budgeting': {kind:'restaurant',id:'restaurant-20-scenarios',title:'20 restaurant budget scenarios: average ticket and food cost',download:'/downloads/restaurant-20-scenarios-v1.csv',tool:'/calculators/restaurant-break-even-calculator/',rows:restaurantRows},
  'landscaping-break-even': {kind:'landscaping',id:'landscaping-20-scenarios',title:'20 landscaping scenarios: contribution, monthly funding and crew capacity',download:'/downloads/landscaping-20-scenarios-v1.csv',tool:'/calculators/landscaping-break-even-calculator/',rows:landscapeRows},
};
export const SCENARIO_METHOD_VERSION='1.0';
export const SCENARIO_ENGINE_VERSION=FORMULA_ENGINE_VERSION;
export function scenarioCSV(analysis){
  const keys=['scenario_id','method_version','engine_version','currency','period',...Object.keys(shared),'price','open_days','contribution','monthly_funding','exact_units','whole_units','exact_revenue','whole_unit_revenue','exact_capacity','whole_capacity','whole_job_gap','daily_orders'];
  const unique=[...new Set(keys)];
  const rows=analysis.rows.map(r=>({scenario_id:r.id,currency:'USD',period:'monthly',method_version:SCENARIO_METHOD_VERSION,engine_version:FORMULA_ENGINE_VERSION,...r.input,open_days:r.openDays??'',contribution:r.result.contribution,monthly_funding:r.result.fixedNeed,exact_units:r.result.jobs,whole_units:r.result.wholeJobs,exact_revenue:r.result.revenue,whole_unit_revenue:r.result.practicalRevenue,exact_capacity:r.result.capacity,whole_capacity:r.result.wholeCapacity,whole_job_gap:r.result.wholeCapacity-r.result.wholeJobs,daily_orders:r.dailyOrders??''}));
  return [unique,...rows.map(r=>unique.map(k=>r[k]))].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
}
