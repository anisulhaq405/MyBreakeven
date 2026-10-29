import {describe,it,expect} from 'vitest';
import {fvDefaults,calculateFutureValue,calculateFutureValueGoal} from './financeDay1Engine.js';
describe('Future value goal planner regression',()=>{
 it('finds a sufficient contribution with zero growth',()=>{const v={...fvDefaults(),principal:'0',payment:'0',months:'12',rate:'0',inflation:'0'};const r=calculateFutureValueGoal(v,'1200');expect(r.valid).toBe(true);expect(r.required).toBe(100);expect(r.projected).toBeCloseTo(1200,5);});
 it('checks cent rounding against the projection engine',()=>{const v={...fvDefaults(),principal:'10000',payment:'200',months:'120',rate:'6'};const r=calculateFutureValueGoal(v,'50000');expect(r.valid).toBe(true);expect(r.projected).toBeGreaterThanOrEqual(49999.999999);const verify=calculateFutureValue({...v,payment:r.required.toFixed(2)});expect(verify.balance).toBeCloseTo(r.projected,5);});
 it('returns zero deposit if principal meets goal',()=>{const r=calculateFutureValueGoal({...fvDefaults(),principal:'10000',months:'12',rate:'0'},'9000');expect(r.valid).toBe(true);expect(r.required).toBe(0);});
 it('rejects a zero period and invalid target',()=>{expect(calculateFutureValueGoal({...fvDefaults(),months:'0'},'5000').valid).toBe(false);expect(calculateFutureValueGoal(fvDefaults(),'abc').valid).toBe(false);});
});