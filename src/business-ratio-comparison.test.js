import {describe,it,expect} from 'vitest';
import {evaluateBusinessRatio} from './businessRatioComparison.js';
const v=(a,b)=>({a:a.map(String),b:b.map(String)});
describe('Business ratio KPI comparisons',()=>{
 it('reports cost/revenue percentage-point change',()=>{const r=evaluateBusinessRatio('cost',v([30,100],[45,150]));expect(r.valid).toBe(true);expect(r.values).toEqual([30,30]);expect(r.delta).toBe(0);});
 it('compares debt-to-equity and labor output with correct units',()=>{expect(evaluateBusinessRatio('debt',v([40,60],[60,90])).delta).toBeCloseTo(0);expect(evaluateBusinessRatio('labor',v([20,100],[30,100])).delta).toBeCloseTo(.1);});
 it('shows each three-product share and percentage-point movement',()=>{const r=evaluateBusinessRatio('mix',v([20,30,50],[40,60,100]));expect(r.valid).toBe(true);expect(r.values[0]).toEqual([20,30,50]);expect(r.delta).toEqual([0,0,0]);});
 it('rejects missing or zero denominators',()=>{expect(evaluateBusinessRatio('cost',v([30,0],[10,100])).valid).toBe(false);expect(evaluateBusinessRatio('debt',v([30,0],[10,100])).valid).toBe(false);expect(evaluateBusinessRatio('mix',v([0,0,0],[10,20,30])).valid).toBe(false);expect(evaluateBusinessRatio('labor',{a:['x','2'],b:['3','4']}).valid).toBe(false);});
});