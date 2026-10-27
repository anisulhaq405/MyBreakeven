import {describe,it,expect} from 'vitest';
import {calculateFinancialRatios,ratioDefaults,ratioFields} from './financialRatiosEngine.js';
describe('Expanded financial ratios: seven-group coverage',()=>{
 const r=calculateFinancialRatios(ratioDefaults());
 it('has 55 unique measures, with all seven categories',()=>{
  expect(r.rows).toHaveLength(55);
  expect(new Set(r.rows.map(x=>x.name)).size).toBe(55);
  expect(new Set(r.rows.map(x=>x.group))).toEqual(new Set(['Liquidity','Profitability','Leverage','Efficiency & returns','Cash flow','Coverage','Market value']));
 });
 it('does not treat missing new statement inputs as zero',()=>{
  expect(r.rows.find(x=>x.name==='Free cash flow').value).toBeNull();
  expect(r.rows.find(x=>x.name==='Price to earnings').status).toContain('required');
 });
 it('calculates cash flow, coverage and valuation when inputs exist',()=>{
  const d={...ratioDefaults(),operatingCash:'25000',capex:'5000',cashDebtService:'10000',sharePrice:'25',shares:'10000',preferredDividends:'0',bookEquityCommon:'80000',sharesOutstanding:'10000'};
  const rows=calculateFinancialRatios(d).rows;
  const value=name=>rows.find(x=>x.name===name).value;
  expect(value('Free cash flow')).toBe(20000);
  expect(value('Debt service coverage (cash-based)')).toBe(2.5);
  expect(value('Earnings per share')).toBe(2);
  expect(value('Price to earnings')).toBe(12.5);
  expect(value('Price to book')).toBe(3.125);
 });
 it('withholds undefined denominators instead of infinity',()=>{
  const d={...ratioDefaults(),operatingCash:'25000',cashDebtService:'0',sharePrice:'0',dividendPerShare:'1'};
  const rows=calculateFinancialRatios(d).rows;
  expect(rows.find(x=>x.name==='Debt service coverage (cash-based)').value).toBeNull();
  expect(rows.find(x=>x.name==='Dividend yield').value).toBeNull();
 });
 it('keeps every field key unique',()=>expect(new Set(ratioFields.map(x=>x[1])).size).toBe(ratioFields.length));
});