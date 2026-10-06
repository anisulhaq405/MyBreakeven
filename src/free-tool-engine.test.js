import { describe,it,expect } from 'vitest';
import { calculatePriceChange } from './freeToolEngine';
const base={price:100,cost:60,fee:3,volume:100,change:10,expected:20,capacity:150};
describe('focused pricing tools',()=>{
 it('recovers contribution rather than revenue after a discount',()=>{const r=calculatePriceChange(base);expect(r.contribution).toBe(27.3);expect(r.target).toBe(136);expect(r.delta).toBe(-424);expect(r.requiredChange).toBe(36);});
 it('never rounds a whole-sale recovery target down',()=>{const r=calculatePriceChange({...base,change:5});expect(r.target*r.contribution).toBeGreaterThanOrEqual(r.baseline);expect((r.target-1)*r.contribution).toBeLessThan(r.baseline);});
 it('reports a nonrecoverable discount without Infinity',()=>{const r=calculatePriceChange({...base,change:50});expect(r.positive).toBe(false);expect(r.target).toBeNull();expect(r.delta).toBe(-5080);});
 it('handles exact decimal equality without adding a phantom sale',()=>{const r=calculatePriceChange({...base,price:0.3,cost:0.1,fee:0,volume:3,change:0});expect(r.target).toBe(3);});
 it('distinguishes increased-price contribution from customer revenue loss',()=>{const r=calculatePriceChange({...base,expected:10},'increase');expect(r.target).toBe(80);expect(r.expectedVolume).toBe(90);expect(r.delta).toBe(503);expect(r.requiredChange).toBe(20);});
 it('keeps zero-capacity distinct from unknown capacity',()=>{expect(calculatePriceChange({...base,capacity:0}).capacity).toBe(0);expect(calculatePriceChange({...base,capacity:''}).capacity).toBeNull();});
 it('rounds expected sales down and permits complete sales loss',()=>{expect(calculatePriceChange({...base,volume:3,expected:10},'increase').expectedVolume).toBe(2);expect(calculatePriceChange({...base,expected:100},'increase').projected).toBe(0);});
 for(const change of [{price:''},{volume:0},{cost:-1},{fee:100},{change:100},{capacity:1.5},{price:'1e999'},{expected:''}])it(`rejects invalid input ${JSON.stringify(change)}`,()=>expect(calculatePriceChange({...base,...change}).valid).toBe(false));
 it('includes increased delivery cost before allowing customer loss',()=>{const r=calculatePriceChange({...base,newCost:80,expected:0},'increase');expect(r.contribution).toBe(26.7);expect(r.target).toBe(139);expect(r.extra).toBe(39);expect(r.delta).toBe(-1030);});
 it('treats revised zero cost as entered rather than missing',()=>expect(calculatePriceChange({...base,newCost:0},'increase').revisedCost).toBe(0));
 it('rejects invalid revised cost',()=>expect(calculatePriceChange({...base,newCost:-1},'increase').valid).toBe(false));
 it('requires a positive current contribution',()=>expect(calculatePriceChange({...base,cost:98}).valid).toBe(false));
 it('rejects loss above 100%',()=>expect(calculatePriceChange({...base,expected:101},'increase').valid).toBe(false));
});
