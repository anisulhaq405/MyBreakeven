import {describe,it,expect} from 'vitest';
import {fvDefaults} from './financeDay1Engine.js';
import {simulateFutureValueRisk} from './futureValueRiskEngine.js';
describe('Phase 3 investment risk simulation',()=>{
 it('is deterministic for the same seed and assumptions',()=>{const a=simulateFutureValueRisk(fvDefaults(),{paths:'100',seed:'123'}),b=simulateFutureValueRisk(fvDefaults(),{paths:'100',seed:'123'});expect(a.valid).toBe(true);expect(a.summary).toEqual(b.summary);});
 it('returns ordered percentiles and a bounded goal-hit fraction',()=>{const r=simulateFutureValueRisk(fvDefaults(),{paths:'500',target:'50000'});expect(r.valid).toBe(true);expect(r.summary.p10).toBeLessThanOrEqual(r.summary.p50);expect(r.summary.p50).toBeLessThanOrEqual(r.summary.p90);expect(r.probability).toBeGreaterThanOrEqual(0);expect(r.probability).toBeLessThanOrEqual(1);});
 it('zero volatility produces equal outcomes and exact zero-return accumulation',()=>{const v={...fvDefaults(),principal:'100',payment:'10',rate:'0',months:'12',inflation:'0'};const r=simulateFutureValueRisk(v,{mean:'0',volatility:'0',paths:'100',target:'220'});expect(r.valid).toBe(true);expect(r.summary.p10).toBeCloseTo(220,6);expect(r.summary.p90).toBeCloseTo(220,6);expect(r.probability).toBe(1);});
 it('rejects impossible volatility, seed and targets',()=>{expect(simulateFutureValueRisk(fvDefaults(),{volatility:'120'}).valid).toBe(false);expect(simulateFutureValueRisk(fvDefaults(),{seed:'1.2'}).valid).toBe(false);expect(simulateFutureValueRisk(fvDefaults(),{target:'-1'}).valid).toBe(false);});
});