import {describe,it,expect} from 'vitest';
import {calculateOperationalTool as calc} from './operationalToolEngine';
import {operationalTools} from './operationalTools';
const d=mode=>Object.values(operationalTools).find(t=>t.mode===mode).defaults;
describe('focused operating cost decisions',()=>{
 it('rejects liquid ratios too large to display safely',()=>expect(calc({...d('chemical'),size:'1e-999'},'chemical').valid).toBe(false));
 it('rejects color stock ratios too large to display safely',()=>expect(calc({...d('hairColor'),colorSize:'1e-999'},'hairColor').valid).toBe(false));
 it('annualizes weekly cleaning visits and rounds the target quote upward',()=>{const r=calc(d('cleaningContract'),'cleaningContract');expect(r.main).toBe(692);expect(r.metrics[0][1]).toBe(13);expect(r.metrics[3][1]).toBe(2277.34);});
 it('charges crew person-hours but reports profit per elapsed route hour',()=>{const r=calc(d('lawnRoute'),'lawnRoute');expect(r.main).toBe(334);expect(r.metrics[1][1]).toBe(220);expect(r.metrics[2][1]).toBe(66.8);});
 it('uses water:concentrate ratio and reduces usable yield for waste',()=>{const r=calc(d('chemical'),'chemical');expect(r.main).toBeCloseTo(40/18);expect(r.metrics[2][1]).toBe(18);});
 it('supports neat chemicals and zero waste',()=>expect(calc({...d('chemical'),water:0,waste:0},'chemical').main).toBe(20));
 it('allocates hair color waste inside stock usage without double counting',()=>{const r=calc(d('hairColor'),'hairColor');expect(r.main).toBe(7.08);expect(r.metrics[2][1]).toBe(1.062);expect(r.metrics[3][1]).toBe(566.4);expect(calc({...d('hairColor'),waste:100},'hairColor').main).toBe(7.08);});
 it('uses product cost recovery and includes return allowance exactly once',()=>{const r=calc(d('returns'),'returns');expect(r.main).toBe(2.6);expect(r.metrics[2][1]).toBe(26);expect(r.metrics[3][1]).toBe(2600);});
 it('handles no returns and full inventory recovery',()=>{expect(calc({...d('returns'),rate:0},'returns').main).toBe(0);expect(calc({...d('returns'),recovery:100,rate:100},'returns').main).toBe(20);});
 it('permits zero monthly orders with a prospective per-order allowance',()=>expect(calc({...d('returns'),orders:0},'returns').metrics[3][1]).toBe(0));
 it('reports loss rather than hiding negative cleaning and route profit',()=>{expect(calc({...d('cleaningContract'),price:100},'cleaningContract').main).toBe(-1608);expect(calc({...d('lawnRoute'),price:0},'lawnRoute').main).toBe(-326);});
 for(const [mode,patch] of [['chemical',{waste:100}],['chemical',{size:0}],['hairColor',{developerSize:0}],['lawnRoute',{stops:1.5}],['lawnRoute',{service:0,drive:0}],['returns',{rate:101}],['returns',{recovery:101}],['cleaningContract',{target:100}]])it(`rejects invalid ${mode} ${JSON.stringify(patch)}`,()=>expect(calc({...d(mode),...patch},mode).valid).toBe(false));
 for(const mode of ['cleaningContract','lawnRoute','chemical','hairColor','returns'])it(`rejects blank or negative ${mode} values`,()=>{const key=Object.keys(d(mode))[0];expect(calc({...d(mode),[key]:''},mode).valid).toBe(false);expect(calc({...d(mode),[key]:-1},mode).valid).toBe(false);});
});
