import {describe,it,expect} from 'vitest';
import {calculateDecisionTool as calc} from './decisionToolEngine';
import {decisionTools} from './decisionTools';
const defaults=mode=>({...Object.values(decisionTools).find(t=>t.mode===mode).defaults});
describe('salon rebooking: one incremental follow-up cohort',()=>{
 it('caps attendance at spare capacity and preserves exact contribution',()=>{const r=calc(defaults('rebooking'),'rebooking');expect(r.main).toBe(1315);expect(r.metrics[1][1]).toBe(32);expect(r.metrics[2][1]).toBe(25);});
 it('does not invent attendance, capacity, or growth',()=>{for(const changes of [{attendance:0},{capacity:0},{target:40}])expect(calc({...defaults('rebooking'),...changes},'rebooking').main).toBe(0);});
 it('keeps negative economics visible',()=>expect(calc({...defaults('rebooking'),cost:90},'rebooking').main).toBeLessThan(0));
 it('rejects incoherent or fractional counts',()=>{for(const changes of [{target:30},{appointments:0},{appointments:1.5},{capacity:2.5},{attendance:101}])expect(calc({...defaults('rebooking'),...changes},'rebooking').valid).toBe(false);});
});
describe('no-show counterfactual contribution',()=>{
 it('offsets equivalent refills and retained net fees',()=>{const r=calc(defaults('noShow'),'noShow');expect(r.main).toBe(645.75);expect(r.metrics[5][1]).toBe(258.3);expect(r.metrics[2][1]).toBe(1200);});
 it('reports zero when every slot is refilled',()=>expect(calc({...defaults('noShow'),refilled:20},'noShow').main).toBe(0));
 it('does not manufacture recovery',()=>expect(calc({...defaults('noShow'),reduction:0},'noShow').metrics[5][1]).toBe(0));
 it('allows honest negative gaps from retained fees',()=>expect(calc({...defaults('noShow'),retained:100},'noShow').main).toBeLessThan(0));
 it('rejects incompatible populations',()=>{for(const changes of [{bookings:0},{missed:201},{refilled:21},{missed:1.2},{reduction:101}])expect(calc({...defaults('noShow'),...changes},'noShow').valid).toBe(false);});
});
describe('two-job travel economics',()=>{
 it('compares full occupied time, fees and total mileage once',()=>{const r=calc(defaults('travelProfit'),'travelProfit');expect(r.metrics[0][1]).toBeCloseTo(159.4/3.25,10);expect(r.metrics[1][1]).toBeCloseTo(138.6/(155/60),10);expect(r.main).toBeCloseTo(-4.60545905707196,9);expect(r.metrics[6][1]).toBe(3.2);expect(r.metrics[7][1]).toBe(0);});
 it('surcharge reaches target after fee deduction and upward rounding',()=>{const input=defaults('travelProfit'),r=calc(input,'travelProfit');const extra=r.metrics[6][1];expect(((input.priceA+extra)*.97-54)/3.25).toBeGreaterThanOrEqual(50);expect(((input.priceA+extra-.01)*.97-54)/3.25).toBeLessThan(50);});
 it('matching jobs tie',()=>{let i=defaults('travelProfit');for(const k of Object.keys(i).filter(k=>k.endsWith('A')))i[k.slice(0,-1)+'B']=i[k];expect(calc(i,'travelProfit').main).toBe(0);});
 it('rejects zero time and fee singularity',()=>{expect(calc({...defaults('travelProfit'),serviceA:0,setupA:0,travelA:0},'travelProfit').valid).toBe(false);expect(calc({...defaults('travelProfit'),fee:100},'travelProfit').valid).toBe(false);});
});
for(const mode of ['rebooking','noShow','travelProfit'])describe(mode+' input integrity',()=>{
 for(const value of ['',null,-1,Infinity,NaN,1e10])it('rejects '+String(value),()=>{const i=defaults(mode);i[Object.keys(i)[0]]=value;expect(calc(i,mode).valid).toBe(false);});
 it('all displayed values finite for defaults',()=>{const r=calc(defaults(mode),mode);expect(r.valid).toBe(true);expect(r.metrics.every(m=>Number.isFinite(m[1]))).toBe(true);});
});
