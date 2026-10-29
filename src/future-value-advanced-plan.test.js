import {describe,it,expect} from 'vitest';
import {fvDefaults,calculateFutureValue,calculateFutureValuePlan,futureValuePlanCsv} from './financeDay1Engine.js';
describe('Future Value advanced plan',()=>{
 const v=fvDefaults();
 it('matches the original engine exactly when charges and step-up are zero',()=>{const a=calculateFutureValue(v),b=calculateFutureValuePlan(v,{fee:'0',step:'0',fixedFee:'0'});expect(b.valid).toBe(true);expect(b.balance).toBeCloseTo(a.balance,6);expect(b.contributed).toBeCloseTo(a.contributed,6);expect(b.fees).toBe(0);expect(b.feeDrag).toBeCloseTo(0,6);});
 it('tracks fees as balance drag against the identical no-fee stepped plan',()=>{const a=calculateFutureValuePlan(v,{fee:'0',step:'3',fixedFee:'0'}),b=calculateFutureValuePlan(v,{fee:'1',step:'3',fixedFee:'1'});expect(b.valid).toBe(true);expect(b.balance).toBeLessThan(a.balance);expect(b.fees).toBeGreaterThan(0);expect(b.feeDrag).toBeCloseTo(a.balance-b.balance,6);});
 it('increases cumulative deposits with positive annual step-up',()=>{const a=calculateFutureValuePlan(v,{fee:'0',step:'0'}),b=calculateFutureValuePlan(v,{fee:'0',step:'5'});expect(b.contributed).toBeGreaterThan(a.contributed);});
 it('rejects out-of-range fee and step values',()=>{expect(calculateFutureValuePlan(v,{fee:'50'}).valid).toBe(false);expect(calculateFutureValuePlan(v,{step:'101'}).valid).toBe(false);});
 it('separates fee drag and supports auditable CSV',()=>{const r=calculateFutureValuePlan(v,{fee:'1',step:'2',fixedFee:'1'});expect(r.valid).toBe(true);expect(r.noFeeBalance-r.balance).toBeCloseTo(r.feeDrag,6);expect(r.feeDrag).toBeGreaterThanOrEqual(r.fees);const csv=futureValuePlanCsv(v,{fee:'1',step:'2',fixedFee:'1'},r,'USD');expect(csv).toContain('Fee drag including lost compounding');expect(csv).toContain('Fees paid');expect(csv).toContain('USD');});
 it('delays deposits without delaying principal growth',()=>{const base=calculateFutureValuePlan({...v,months:'12',rate:'0',principal:'100',payment:'10'},{fee:'0',step:'0',delay:'0'});const delayed=calculateFutureValuePlan({...v,months:'12',rate:'0',principal:'100',payment:'10'},{fee:'0',step:'0',delay:'3'});expect(base.balance).toBe(220);expect(delayed.balance).toBe(190);expect(delayed.rows.slice(1,4).every(x=>x.deposit===0)).toBe(true);});
 it('rejects invalid delayed periods and protects real-value overflow',()=>{expect(calculateFutureValuePlan(v,{delay:'-1'}).valid).toBe(false);expect(calculateFutureValuePlan({...v,months:'1200',inflation:'-99',rate:'0',principal:'1000000',payment:'0'},{fee:'0'}).valid).toBe(false);});
 it('reconciles every row, fee totals and ending balance',()=>{
  const r=calculateFutureValuePlan({...v,months:'24'},{fee:'0.75',fixedFee:'1',step:'3',delay:'2'});
  expect(r.valid).toBe(true);
  expect(r.rows).toHaveLength(25);
  for(const row of r.rows.slice(1)){
   expect(row.opening+row.deposit+row.growth-row.fee).toBeCloseTo(row.balance,6);
   expect(row.fee).toBeGreaterThanOrEqual(0);
  }
  expect(r.rows.slice(1).reduce((sum,row)=>sum+row.deposit,Number(v.principal))).toBeCloseTo(r.contributed,6);
  expect(r.rows.slice(1).reduce((sum,row)=>sum+row.fee,0)).toBeCloseTo(r.fees,6);
  expect(r.rows.at(-1).balance).toBeCloseTo(r.balance,6);
 });
 it('accepts whole-number delay and rejects fractional delay safely',()=>{const ok=calculateFutureValuePlan(v,{delay:'3'});expect(ok.valid).toBe(true);const bad=calculateFutureValuePlan(v,{delay:'3.5'});expect(bad.valid).toBe(false);expect(bad.errors.delay).toBeDefined();});
});