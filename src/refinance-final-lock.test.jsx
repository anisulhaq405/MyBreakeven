import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import RefinanceCalculator from './RefinanceCalculator.jsx';
import {freeTools} from './freeTools.js';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
describe('Refinance lock regression',()=>{
 it('retains existing verified mortgage calculations and all five choices',()=>{
  const r=calculateRefinance(refinanceDefaults());
  expect(r.valid).toBe(true);expect(r.firstEconomicMonth).toBe(29);
  expect(r.saving).toBeCloseTo(6394.53,1);
  const html=renderToStaticMarkup(<RefinanceCalculator tool={freeTools['refinance-calculator']} slug="refinance-calculator"/>);
  for(const choice of ['Mortgage / home loan','Auto loan','Personal loan','Student loan','Business loan'])expect(html).toContain(choice);
  expect(html).toContain('Loan to refinance');
  expect(html).toContain('Live refinancing analysis');
  expect(html).toContain('Monthly payment comparison');
  expect(html).toContain('Where your money goes at the exit date');
 });
 it('handles different fixed-rate installment examples and rejects invalid loan terms',()=>{
  const demos=[{balance:'24000',oldRate:'10',oldMonths:'48',newRate:'7.5',newMonths:'48',upfront:'350',hold:'24'},
  {balance:'12000',oldRate:'15',oldMonths:'36',newRate:'11',newMonths:'36',upfront:'250',hold:'24'},
  {balance:'35000',oldRate:'8',oldMonths:'120',newRate:'6.5',newMonths:'120',upfront:'0',hold:'60'},
  {balance:'100000',oldRate:'12',oldMonths:'60',newRate:'10',newMonths:'60',upfront:'1500',hold:'36'}];
  for(const x of demos){const r=calculateRefinance({...refinanceDefaults(),...x});expect(r.valid).toBe(true);expect(Number.isFinite(r.saving)).toBe(true);expect(r.comparison[r.hold].costSaving).toBeCloseTo(r.saving,6);}
  expect(calculateRefinance({...refinanceDefaults(),newMonths:'0'}).valid).toBe(false);
 });
});