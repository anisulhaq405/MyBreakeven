import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
import {applyDay3RefinanceContent} from './content/blogs/day3RefinanceContent.js';
describe('Day 3 C08 G10-G12 content and refinance decision matrix',()=>{
 it('adds one source-preserving, linked, unique content module to each owner',()=>{
 const owners=[
 ['mortgage-refinance-break-even','refinance-two-method-decision'],
 ['refinance-closing-costs-financed-fees','loan-estimate-field-map'],
 ['refinance-shorter-vs-longer-term','term-decision-shortlist']
 ];
 for(const [slug,id] of owners){
 const p=blogPostMap[slug];
 expect(p.html).toContain('id="'+id+'"');
 expect(p.html).toContain('/calculators/refinance-calculator/');
 expect(p.html).toContain('https://www.consumerfinance.gov/');
 expect(p.sectionLinks[0][0]).toBe(id);
 expect(p.faq.length).toBeGreaterThanOrEqual(3);
 expect(p.modified).toBe('2026-10-26');
 expect(p.image).toMatch(/^\/images\//);
 const ids=[...p.html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 expect(ids.length).toBe(new Set(ids).size);
 expect(()=>applyDay3RefinanceContent(p)).toThrow();
 }
 });
 it('matches the quote ledger and 60-month term comparison against engine',()=>{
 let r=calculateRefinance({...refinanceDefaults(),upfront:'4000',financed:'2000',credits:'1000',escrow:'2500'});
 expect(r).toMatchObject({valid:true,newPrincipal:252000,upfront:3000,cashToClose:5500});
 for(const [months,payment,balance,advantage] of [['180',2042.71,188222.40,10901.46],['300',1535.22,223178.73,6394.53],['360',1419.47,231151.68,5366.58]]){
  r=calculateRefinance({...refinanceDefaults(),newMonths:months});
  expect(r.valid).toBe(true);
  expect(r.next.payment).toBeCloseTo(payment,2);
  expect(r.newH.balance).toBeCloseTo(balance,2);
  expect(r.saving).toBeCloseTo(advantage,2);
 }
 });
 it('does not edit unrelated guide posts',()=>{
 const p={slug:'fire-vs-coast-fire-vs-barista-fire',html:'<p>original</p>'};
 expect(applyDay3RefinanceContent(p)).toBe(p);
 });
});
