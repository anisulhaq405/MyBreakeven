import {describe,it,expect} from 'vitest';
import {calculateRefinance,refinanceDefaults,refinanceCsv} from './refinanceEngine.js';
const base=refinanceDefaults();
function run(overrides={}) {const r=calculateRefinance({...base,...overrides});expect(r.valid).toBe(true);return r;}
function independentlyCheck(r,month){
 const a=r.old.rows[month],b=r.next.rows[month];
 const expected=a.paid+a.balance-(r.upfront+b.paid+b.balance);
 expect(r.comparison[month].costSaving).toBeCloseTo(expected,7);
}
describe('Refinance day-one six decision scenarios',()=>{
 it('lower-rate comparison reconciles same-date debt and each displayed checkpoint',()=>{
  const r=run();expect(r.old.payment).toBeGreaterThan(r.next.payment);
  for(const m of [0,1,12,36,60,120,300]) independentlyCheck(r,m);
  expect(r.saving).toBeCloseTo(r.comparison[60].costSaving,7);
 });
 it('longer term can reduce payment while leaving more principal at exit',()=>{
  const r=run({newMonths:'360'});expect(r.next.payment).toBeLessThan(r.old.payment);
  expect(r.newH.balance).toBeGreaterThan(0);
  independentlyCheck(r,60);
 });
 it('shorter term can require higher payments but pay down more principal',()=>{
  const r=run({newMonths:'180'});expect(r.next.payment).toBeGreaterThan(r.old.payment);
  expect(r.newH.balance).toBeLessThan(r.oldH.balance);
  independentlyCheck(r,60);
 });
 it('financed fees enter principal once and invalidate simplistic fee ÷ saving threshold',()=>{
  const r=run({financed:'5000',upfront:'3000'});expect(r.newPrincipal).toBe(255000);
  expect(r.simple).toBeNull();independentlyCheck(r,60);
 });
 it('lender credits reduce only upfront fees, while escrow is liquidity not economic cost',()=>{
  const r=run({upfront:'6000',credits:'1500',escrow:'2500'});const withoutEscrow=run({upfront:'6000',credits:'1500',escrow:'0'});
  expect(r.upfront).toBe(4500);expect(r.cashToClose).toBe(7000);
  expect(r.saving).toBeCloseTo(withoutEscrow.saving,8);
  independentlyCheck(r,60);
 });
 it('early exit may occur before economic break-even; month zero includes closing costs',()=>{
  const r=run({hold:'1',upfront:'6000'});
  expect(r.comparison[0].costSaving).toBeCloseTo(-6000,8);
  expect(r.horizonEconomicMonth).toBeNull();independentlyCheck(r,1);
 });
 it('zero-rate mortgages calculate and export without divide-by-zero',()=>{
  const r=run({oldRate:'0',newRate:'0',newMonths:'300',upfront:'0'});
  expect(r.old.payment).toBeCloseTo(250000/300,1);
  expect(r.next.payment).toBeCloseTo(r.old.payment,8);
  expect(r.saving).toBeCloseTo(0,6);
  expect(refinanceCsv({...base,oldRate:'0',newRate:'0',upfront:'0'},r,'USD')).toContain('Cost saving incl balances');
 });
 it('rejects duplicated or impossible cost fields',()=>{
  expect(calculateRefinance({...base,credits:'7000'}).valid).toBe(false);
  expect(calculateRefinance({...base,oldMonths:'0'}).valid).toBe(false);
 });
});
