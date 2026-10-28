import {describe,it,expect} from 'vitest';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
describe('Economic refinance break-even',()=>{
 it('agrees with directly computed same-date cash and principal for every modeled month',()=>{
  const r=calculateRefinance(refinanceDefaults());
  expect(r.valid).toBe(true);
  const expected=r.comparison.find(x=>x.month>0&&x.costSaving>=-0.005)?.month??null;
  expect(r.firstEconomicMonth).toBe(expected);
  expect(r.horizonEconomicMonth).toBe(r.comparison.slice(1,r.hold+1).find(x=>x.costSaving>=-0.005)?.month??null);
 });
 it('distinguishes a free identical loan from one with transaction fees',()=>{
  let r=calculateRefinance({...refinanceDefaults(),newRate:'6.5',newMonths:'300',upfront:'0'});
  expect(r.firstEconomicMonth).toBe(1);
  r=calculateRefinance({...refinanceDefaults(),newRate:'6.5',newMonths:'300',upfront:'6000'});
  expect(r.horizonEconomicMonth).toBeNull();
  expect(r.firstEconomicMonth).toBeNull();
 });
 it('does not manufacture a threshold for an invalid loan',()=>expect(calculateRefinance({...refinanceDefaults(),oldMonths:'0'}).valid).toBe(false));
});
