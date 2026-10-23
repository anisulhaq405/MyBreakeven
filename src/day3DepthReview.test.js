import {it,expect} from 'vitest';
import {calculateBudgetBridge,calculateDriverAllocation,calculateJobCost} from './day3PlanningEngine.js';
import {blogPostMap} from './content/blogs/index.js';
import {day3DepthSections} from './content/blogs/day3DepthReview.js';
it('reconciles the delayed-collection case and explicitly funded balance sheet',()=>{
 const r=calculateBudgetBridge({units:200,price:180,variable:80,fixed:14000,openingCash:5000,collectionPercent:60,oldReceipts:3000,otherPayments:1000,capital:2000,minimumCash:4000});
 expect(r).toMatchObject({profit:6000,receipts:24600,closing:-3400,cashGap:7400,uncollectedCurrentSales:14400});
 expect(r.closing+r.cashGap+14400+12000).toBe(12400+18000);
});
it('reconciles both jobs under separate activity pools and one hours rate',()=>{
 const common={poolA:6000,totalA:200,poolB:3000,totalB:100};
 const a=calculateDriverAllocation({...common,jobA:150,jobB:10});
 const b=calculateDriverAllocation({...common,jobA:50,jobB:90});
 expect(a.total).toBe(4800);expect(b.total).toBe(4200);expect(a.total+b.total).toBe(9000);
 expect(9000/200*150-a.total).toBe(1950);expect(9000/200*50-b.total).toBe(-1950);
 expect(10000-4000-a.total).toBe(1200);expect(10000-4000-b.total).toBe(1800);
});
it('reconciles estimate, actual and accepted-output denominator cases',()=>{
 const common={laborRate:24,overhead:6000,totalBase:200,quantity:10,revenue:3000};
 const est=calculateJobCost({...common,materials:1100,hours:25,jobBase:25});
 const act=calculateJobCost({...common,materials:1200,hours:30,jobBase:30});
 expect(est.total).toBe(2450);expect(act.total).toBe(2820);expect(act.total-est.total).toBe(370);
 expect(act.surplus).toBe(180);expect(2*(24+30)+3*(24+30)).toBe(270);
 expect(calculateJobCost({...common,materials:1200,hours:30,jobBase:30,quantity:9}).unitCost).toBeCloseTo(313.33333333);
});
it('retains exactly one copy of each new section and valid navigation targets',()=>{
 for(const [slug,extra]of Object.entries(day3DepthSections)){
  const p=blogPostMap[slug];expect(p.html.split(extra).length-1).toBe(1);
  const ids=[...p.html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(ids.length).toBe(new Set(ids).size);
  for(const [,id]of extra.matchAll(/<h2 id="([^"]+)"/g)){expect(p.sectionLinks.some(([target])=>target===id)).toBe(true);expect(p.html).toContain(`id="${id}"`);}
 }
});
