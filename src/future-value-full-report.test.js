import {describe,it,expect} from 'vitest';
import {fvDefaults,calculateFutureValue,calculateFutureValuePlan,compareFutureValuePlans,futureValueMilestones,calculateFutureValueCashFlows} from './financeDay1Engine.js';
import {simulateFutureValueRisk} from './futureValueRiskEngine.js';
import {futureValueFullReportCsv} from './futureValueFullReport.js';
describe('Future Value comprehensive planning report',()=>{
 it('exports every analysis with quoted CSV fields and complete schedule',()=>{
  const v=fvDefaults(),settings={fee:'0.5',step:'2',fixedFee:'0',delay:'0'},plan=calculateFutureValuePlan(v,settings);
  const report=futureValueFullReportCsv({inputs:v,settings,goal:'50000',currency:'USD',plan,baseline:calculateFutureValue(v),comparison:compareFutureValuePlans(v,[{label:'Alternative',overrides:{rate:'8'},plan:settings}]),milestones:futureValueMilestones(plan,'50000'),cashFlows:calculateFutureValueCashFlows(v,[{period:'12',amount:'1000'}]),risk:simulateFutureValueRisk(v,{paths:'100',target:'50000'}),riskSettings:{mean:'6',volatility:'15',paths:'100',seed:'2027'}});
  for(const phrase of ['Core assumptions','Advanced plan settings','Fee drag with lost compounding','Savings goal and milestones','Compared investment plans','Custom cash flows','Risk model settings','Simulation outcomes','Detailed advanced schedule','Period 12 custom flow'])expect(report).toContain(phrase);
  expect(report).toContain('\r\n');expect(report.charCodeAt(0)).toBe(65279);
  expect(report.split('\r\n').length).toBeGreaterThan(plan.periods);
 });
});