import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
describe('Day 2 refinance content numerical and intent integrity',()=>{
 it('publishes a single focused decision section to each existing guide',()=>{
  for(const [slug,id] of [['mortgage-refinance-break-even','refinance-checkpoints-example'],['refinance-closing-costs-financed-fees','refinance-three-ledgers'],['refinance-shorter-vs-longer-term','refinance-term-tradeoff-example']]){
   const post=blogPostMap[slug];expect(post).toBeDefined();
   expect(post.html.match(new RegExp('id="'+id+'"','g'))).toHaveLength(1);
   expect(post.sectionLinks[0][0]).toBe(id);
   expect(post.html).toContain('/calculators/refinance-calculator/');
   expect(post.modified).toBe('2026-10-28');
  }
 });
 it('matches economic checkpoint figures and break-even month within published precision',()=>{
  const r=calculateRefinance(refinanceDefaults());expect(r.valid).toBe(true);
  for(const [m,n] of [[12,-3501.93],[36,1472.58],[60,6394.53]]){
   expect(r.comparison[m].costSaving).toBeCloseTo(n,1);
  }
  expect(r.firstEconomicMonth).toBe(29);
 });
 it('reconciles quoted costs without charging a credit twice',()=>{
  const a=calculateRefinance({...refinanceDefaults(),upfront:'3000',financed:'2000',credits:'0',escrow:'2500'});
  const b=calculateRefinance({...refinanceDefaults(),upfront:'4000',financed:'2000',credits:'1000',escrow:'2500'});
  expect(a.valid).toBe(true);expect(b.valid).toBe(true);
  expect(a.newPrincipal).toBe(252000);expect(a.cashToClose).toBe(5500);
  expect(a.saving).toBeCloseTo(b.saving,8);
 });
 it('retains the term and balance fixtures for all three options',()=>{
  for(const [months,payment,balance,save] of [['180',2042.71,188222.40,10901.46],['300',1535.22,223178.73,6394.53],['360',1419.47,231151.68,5366.58]]){
   const r=calculateRefinance({...refinanceDefaults(),newMonths:months});
   expect(r.next.payment).toBeCloseTo(payment,2);
   expect(r.newH.balance).toBeCloseTo(balance,2);
   expect(r.saving).toBeCloseTo(save,2);
  }
 });
});
