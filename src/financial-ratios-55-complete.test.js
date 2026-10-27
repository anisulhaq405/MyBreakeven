import {describe,it,expect} from 'vitest';
import {ratioDefaults,ratioFields,calculateFinancialRatios,financialRatiosCsv} from './financialRatiosEngine.js';

const allInputs={
 ...ratioDefaults(),
 dailyCashExpense:'500',pretax:'25000',taxRate:'25',preferredDividends:'1000',
 longDebt:'40000',leasePayments:'2000',
 payablesOpen:'12000',payablesClose:'16000',purchases:'90000',
 fixedAssetsOpen:'90000',fixedAssetsClose:'100000',
 workingCapitalOpen:'25000',investedOpen:'120000',investedClose:'130000',
 operatingCash:'25000',capex:'5000',cashDividends:'5000',cashDebtService:'10000',cashDebt:'60000',
 sharePrice:'25',shares:'10000',sharesOutstanding:'10000',dividendPerShare:'0.5',
 bookEquityCommon:'80000',marketCap:'250000',enterpriseValue:'300000',epsGrowth:'10'
};
const row=(result,name)=>result.rows.find(r=>r.name===name);
describe('Every financial measure is available with a complete internally consistent dataset',()=>{
 const output=calculateFinancialRatios(allInputs);
 it('calculates all 55 measures with unique names, seven categories, finite outputs',()=>{
  expect(output.valid).toBe(true);
  expect(output.rows).toHaveLength(55);
  expect(new Set(output.rows.map(r=>r.name)).size).toBe(55);
  expect(new Set(output.rows.map(r=>r.group)).size).toBe(7);
  for(const r of output.rows){
   expect(r.value,r.name+' '+r.status).not.toBeNull();
   expect(Number.isFinite(r.value),r.name).toBe(true);
   expect(r.formula.length,r.name).toBeGreaterThan(7);
   expect(r.inputs.length,r.name).toBeGreaterThan(10);
  }
 });
 it('checks representative calculations across every new category',()=>{
  expect(row(output,'Defensive interval (days)').value).toBe(80);
  expect(row(output,'Pretax margin').value).toBe(12.5);
  expect(row(output,'Return on invested capital (after tax)').value).toBe(18);
  expect(row(output,'Long-term debt to capitalization').value).toBeCloseTo(100/3,8);
  expect(row(output,'Days inventory outstanding').value).toBeCloseTo(20000/120000*365,8);
  expect(row(output,'Payables turnover').value).toBeCloseTo(90000/14000,8);
  expect(row(output,'Cash conversion cycle').value).toBeCloseTo(20000/120000*365+22500/180000*365-14000/90000*365,8);
  expect(row(output,'Free cash flow').value).toBe(20000);
  expect(row(output,'Debt service coverage (cash-based)').value).toBe(2.5);
  expect(row(output,'Fixed charge coverage').value).toBeCloseTo(32000/7000,8);
  expect(row(output,'Earnings per share').value).toBe(1.9);
  expect(row(output,'Price to earnings').value).toBeCloseTo(25/1.9,8);
  expect(row(output,'PEG ratio').value).toBeCloseTo(25/1.9/10,8);
  expect(row(output,'Free cash flow yield').value).toBe(8);
 });
 it('exports all fifty-five current results and all comparison results',()=>{
  const csv=financialRatiosCsv(allInputs,output,'USD',output);
  for(const r of output.rows)expect(csv).toContain('"'+r.name+'"');
  expect(csv).toContain('"Comparison result"');
  expect(csv).toContain('"USD"');
 });
 it('keeps blank unknown, invalid and zero denominator separate',()=>{
  const blank={...allInputs,sharePrice:'',cashDebtService:'0',investedOpen:'-10',investedClose:'-10'};
  const x=calculateFinancialRatios(blank);
  expect(row(x,'Dividend yield').value).toBeNull();
  expect(row(x,'Debt service coverage (cash-based)').value).toBeNull();
  expect(row(x,'Return on invested capital (after tax)').value).toBeNull();
  expect(row(x,'Free cash flow').value).toBe(20000);
  const bad=calculateFinancialRatios({...allInputs,taxRate:'101'});
  expect(bad.valid).toBe(false);
  expect(bad.errors.taxRate).toBeTruthy();
 });
 it('all input fields are unique and have accessible labels',()=>{
  expect(new Set(ratioFields.map(f=>f[1])).size).toBe(ratioFields.length);
  for(const f of ratioFields)expect(f[2].length).toBeGreaterThan(3);
 });
});