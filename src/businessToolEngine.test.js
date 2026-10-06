import {describe,it,expect} from 'vitest';import {calculateBusinessTool as calc} from './businessToolEngine';
const roas={price:80,cost:44,fee:3,spend:1000,revenue:4000,margin:10},hour={income:4000,overhead:600,profit:400,hours:35,weeks:46,billable:60,fee:3},cash={cash:30000,reserve:6000,incoming:7000,outgoing:10000,months:6};
describe('business decision tools',()=>{
 it('uses contribution after fees rather than gross revenue for ROAS',()=>{const r=calc(roas,'roas');expect(r.rate).toBe(42);expect(r.breakEven).toBeCloseTo(2.380952);expect(r.target).toBe(3.125);expect(r.profit).toBe(680);expect(r.maxCPA).toBe(33.6)});
 it('flags a campaign with higher delivery cost despite 4x return',()=>expect(calc({...roas,cost:60},'roas').profit).toBe(-120));
 it('does not invent a recovery threshold for zero or negative contribution',()=>{for(const cost of [77.6,90]){const r=calc({...roas,cost},'roas');expect(r.breakEven).toBeNull();expect(r.maxCPA).toBe(0)}});
 it('rejects an unattainable target separately from break-even',()=>{const r=calc({...roas,margin:42},'roas');expect(r.target).toBeNull();expect(r.breakEven).not.toBeNull()});
 it('rounds hourly rate upward to actually fund the annual plan',()=>{const r=calc(hour,'hourly');expect(r.annualHours).toBe(966);expect(r.rate).toBe(64.04);expect(r.monthlyNet).toBeGreaterThanOrEqual(4400);expect((r.rate-.01)*r.annualHours*.97).toBeLessThan(r.annualNeed)});
 it('reflects reduced billable utilization',()=>expect(calc({...hour,billable:40},'hourly').rate).toBe(96.05));
 it('handles a zero funding goal without nonfinite output',()=>expect(calc({...hour,income:0,overhead:0,profit:0},'hourly').rate).toBe(0));
 it('uses only cash above reserve and produces matching month balances',()=>{const r=calc(cash,'runway');expect(r.runway).toBe(8);expect(r.endingCash).toBe(12000);expect(r.balances.at(-1).cash).toBe(r.endingCash);expect(r.extraNeeded).toBe(0)});
 it('shows fractional runway, full months and reserve gap distinctly',()=>{const r=calc({...cash,incoming:5000},'runway');expect(r.runway).toBe(4.8);expect(r.fullMonths).toBe(4);expect(r.extraNeeded).toBe(6000)});
 it('reports zero room when cash already equals reserve',()=>expect(calc({...cash,cash:6000,incoming:12000},'runway').runway).toBe(0));
 it('does not display Infinity for a cash surplus or exact balance',()=>{for(const incoming of [10000,12000])expect(calc({...cash,incoming},'runway').runway).toBeNull()});
 for(const [mode,base,patch]of [['roas',roas,{spend:0}],['roas',roas,{fee:100}],['hourly',hour,{billable:0}],['hourly',hour,{weeks:53}],['hourly',hour,{hours:169}],['runway',cash,{reserve:31000}],['runway',cash,{months:1.5}],['runway',cash,{months:37}],['runway',cash,{cash:''}],['roas',roas,{cost:-1}],['hourly',hour,{income:Infinity}]])it(`rejects invalid ${mode} ${JSON.stringify(patch)}`,()=>expect(calc({...base,...patch},mode).valid).toBe(false));
});
