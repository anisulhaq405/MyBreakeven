import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import RefinanceCalculator from './RefinanceCalculator.jsx';
import {freeTools} from './freeTools.js';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
describe('Multi-loan refinancing mode',()=>{
 it('shows five explicit loan modes and defaults to safe mortgage controls',()=>{
  const html=renderToStaticMarkup(<RefinanceCalculator tool={freeTools['refinance-calculator']} slug="refinance-calculator"/>);
  for(const s of ['Mortgage / home loan','Auto loan','Personal loan','Student loan','Business loan','refi-loan-type','Step 1'])expect(html).toContain(s);
  expect(html).toContain('Housing costs, mortgage insurance and cash needed');
 });
 it('preserves the tested base mortgage amortization and economic break-even',()=>{
  const r=calculateRefinance(refinanceDefaults());
  expect(r.valid).toBe(true);expect(r.firstEconomicMonth).toBe(29);expect(r.saving).toBeCloseTo(6394.53,1);
 });
 it('supports standard fixed-rate installment terms, not specialized contracts',()=>{
  const r=calculateRefinance({...refinanceDefaults(),balance:'20000',oldRate:'10',oldMonths:'48',newRate:'7',newMonths:'48',upfront:'300',hold:'24'});
  expect(r.valid).toBe(true);expect(r.old.payment).toBeGreaterThan(r.next.payment);
 });
});
