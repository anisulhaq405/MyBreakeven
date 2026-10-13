import {describe,it,expect} from 'vitest';
import {calculateMarginMarkup as calc} from './marginMarkupEngine.js';
const base={cost:70,price:100,discount:0,targetType:'margin',target:30};
describe('margin versus markup pricing',()=>{
 it('uses distinct cost and sales denominators',()=>{const r=calc(base);expect(r.margin).toBe(30);expect(r.markup).toBeCloseTo(42.857142857);expect(r.difference).toBe(30);expect(r.targetPrice).toBe(100)});
 it('preserves a target after discount using a separate list-price floor',()=>{const r=calc({...base,discount:20});expect(r.sale).toBe(80);expect(r.margin).toBe(12.5);expect(r.difference).toBe(10);expect(r.requiredList).toBe(125);expect(r.listMargin).toBe(30)});
 it('does not treat a 30% markup as a 30% margin',()=>{const r=calc({...base,targetType:'markup'});expect(r.targetPrice).toBe(91);expect(r.achievedTarget).toBe(30);expect(calc({...base,price:91}).margin).toBeCloseTo(23.076923)});
 it('rounds both price floors up so the target survives cents and discounting',()=>{const r=calc({...base,cost:50,target:45,discount:17});expect(r.targetPrice).toBe(90.91);expect(r.requiredList).toBe(109.54);const actual=calc({...base,cost:50,target:45,price:r.requiredList,discount:17});expect(actual.margin).toBeGreaterThanOrEqual(45)});
 it('reports zero-denominator percentages as undefined',()=>{const free=calc({...base,cost:0});expect(free.markup).toBeNull();expect(free.margin).toBe(100);expect(free.achievedTarget).toBeNull();const zero=calc({...base,price:0});expect(zero.margin).toBeNull();expect(zero.markup).toBe(-100)});
 it('shows losses rather than clamping negative margin or markup',()=>{const r=calc({...base,price:50});expect(r.margin).toBe(-40);expect(r.markup).toBeCloseTo(-28.57142857);expect(r.difference).toBe(-20)});
 it('keeps a full discount valid but offers no finite recovery list price',()=>{const r=calc({...base,discount:100});expect(r.valid).toBe(true);expect(r.sale).toBe(0);expect(r.margin).toBeNull();expect(r.requiredList).toBeNull();expect(r.difference).toBe(-70)});
 it('rejects invalid percentages and unknown target methods',()=>{expect(calc({...base,target:100}).valid).toBe(false);expect(calc({...base,discount:101}).valid).toBe(false);expect(calc({...base,targetType:'other'}).valid).toBe(false);expect(calc({...base,targetType:'markup',target:150}).targetPrice).toBe(175)});
 it('rejects blank, non-finite, negative, over-limit and underflowing input',()=>{for(const value of ['',null,NaN,Infinity,-1,'bad','1e50','1e-400',true])expect(calc({...base,cost:value}).valid).toBe(false)});
 it('retains decimal precision for fractional costs and near-100% margins',()=>{const r=calc({...base,cost:'0.1',price:'0.3',target:99.999});expect(r.difference).toBe(.2);expect(r.targetPrice).toBe(10000);expect(r.margin).toBeCloseTo(66.666666667)});
 it('rejects output scales beyond supported money precision instead of presenting misleading cents',()=>{expect(calc({...base,cost:1e12,target:99.999}).valid).toBe(false);expect(calc({...base,cost:'0.000000000001',price:1e12}).valid).toBe(false)});
});
