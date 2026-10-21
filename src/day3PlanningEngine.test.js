import{describe,it,expect}from'vitest';
import{calculateBudgetBridge,calculateDriverAllocation,calculateJobCost,formatDriverRate,formatDay3Money}from'./day3PlanningEngine.js';
const budget={units:200,price:180,variable:80,fixed:14000,openingCash:5000,collectionPercent:80,oldReceipts:3000,otherPayments:1000,capital:2000,minimumCash:4000};
const driver={poolA:6000,totalA:200,jobA:20,poolB:3000,totalB:100,jobB:5};
const job={materials:1200,hours:30,laborRate:24,overhead:6000,totalBase:200,jobBase:30,quantity:10,revenue:3000};
describe('master budget operating-to-cash boundary',()=>{
 it('reconciles the independent service example',()=>{expect(calculateBudgetBridge(budget)).toMatchObject({valid:true,sales:36000,variableCost:16000,contribution:20000,profit:6000,currentReceipts:28800,receipts:31800,payments:33000,closing:3800,cashGap:200,uncollectedCurrentSales:7200});});
 it('isolates collections from earned operating income',()=>{const r=calculateBudgetBridge({...budget,collectionPercent:70});expect(r.profit).toBe(6000);expect(r.closing).toBe(200);expect(r.cashGap).toBe(3800);});
 it('keeps opening receivables and capital spending outside operating profit',()=>{const r=calculateBudgetBridge({...budget,oldReceipts:0,capital:0});expect(r.sales).toBe(36000);expect(r.profit).toBe(6000);expect(r.closing).toBe(2800);});
 it('reports a shortfall without fabricating financing',()=>{const r=calculateBudgetBridge({...budget,collectionPercent:0,oldReceipts:0});expect(r.closing).toBe(-28000);expect(r.cashGap).toBe(32000);expect(r.borrowing).toBeUndefined();});
 it('accepts explicit zeros but rejects invalid percentages or missing inputs',()=>{expect(calculateBudgetBridge({...budget,units:0,collectionPercent:0}).valid).toBe(true);for(const collectionPercent of [101,-1,'',Infinity,false])expect(calculateBudgetBridge({...budget,collectionPercent}).valid).toBe(false);expect(calculateBudgetBridge({...budget,price:0}).valid).toBe(false);});
});
describe('same-period cost driver allocations',()=>{
 it('reconciles two separately defined pools',()=>{expect(calculateDriverAllocation(driver)).toMatchObject({valid:true,rateA:30,rateB:30,allocatedA:600,allocatedB:150,total:750,remaining:8250});});
 it('fully reconciles every pool and retains zero job usage',()=>{expect(calculateDriverAllocation({...driver,jobA:200,jobB:100})).toMatchObject({total:9000,remaining:0});expect(calculateDriverAllocation({...driver,jobA:0,jobB:0}).total).toBe(0);});
 it('rejects inconsistent period totals and zero denominators',()=>{expect(calculateDriverAllocation({...driver,jobA:201}).valid).toBe(false);expect(calculateDriverAllocation({...driver,totalB:0}).valid).toBe(false);});
 it('does not round rates before assigning costs',()=>{const r=calculateDriverAllocation({poolA:100,totalA:3,jobA:3,poolB:0,totalB:1,jobB:0});expect(r.total).toBe(100);expect(r.remaining).toBe(0);expect(formatDriverRate(1e-10)).not.toBe('0');});
});
describe('assigned job cost boundaries',()=>{
 it('matches the independent ten-unit cost sheet',()=>{expect(calculateJobCost(job)).toMatchObject({valid:true,labor:720,overheadRate:30,applied:900,total:2820,unitCost:282,surplus:180,margin:6});});
 it('preserves the predetermined rate above planned base volume',()=>{expect(calculateJobCost({...job,jobBase:210})).toMatchObject({valid:true,overheadRate:30,applied:6300});});
 it('separates undefined zero-sales margin from a negative surplus',()=>{const r=calculateJobCost({...job,revenue:0});expect(r.valid).toBe(true);expect(r.margin).toBeNull();expect(r.surplus).toBe(-2820);});
 it('reconciles the independent five-extra-hour assigned-cost comparison',()=>{expect(calculateJobCost(job).total-calculateJobCost({...job,hours:25,jobBase:25}).total).toBe(270);});
 it('rejects missing units and zero rate denominators',()=>{for(const quantity of [0,-1,'',false])expect(calculateJobCost({...job,quantity}).valid).toBe(false);expect(calculateJobCost({...job,totalBase:0}).valid).toBe(false);});
});
it('refuses huge outputs, booleans and underflow instead of returning plausible numbers',()=>{expect(calculateBudgetBridge({...budget,units:1e12,price:1e12}).valid).toBe(false);expect(calculateDriverAllocation({...driver,poolA:false}).valid).toBe(false);expect(calculateDriverAllocation({...driver,poolA:1e-323,totalA:1e12,jobA:0}).valid).toBe(false);});

it('does not format a positive or negative fractional-cent amount as zero',()=>{
 expect(formatDay3Money(0,'USD')).toBe('USD\u00a00.00');expect(formatDay3Money(-0,'USD')).toBe('USD\u00a00.00');
 expect(formatDay3Money(0.0001,'USD')).toBe('USD 1.0000e-4');
 expect(formatDay3Money(-0.0001,'EUR')).toBe('EUR -1.0000e-4');
 expect(formatDay3Money(0.005,'USD')).toBe('USD\u00a00.01');
 const r=calculateDriverAllocation({...driver,poolA:0.001,poolB:0});
 expect(r.allocatedA).toBe(0.0001);expect(formatDay3Money(r.allocatedA,'USD')).not.toContain('0.00');
});
