import {describe,it,expect} from 'vitest';
import {calculateUnevenPayback as calc,unevenPaybackExample as sample,unevenPaybackCsv} from './unevenPayback.js';
describe('Uneven monthly cash recovery',()=>{
 it('includes later investments and discounts by the correct monthly exponent',()=>{let r=calc(sample);expect(r.simpleMonth).toBe(6);expect(r.discountedMonth).toBe(7);expect(r.rows[0].cumulative).toBe(-7000);expect(r.rows[11].present).toBeCloseTo(500/1.12,10);expect(r.effectiveMonthlyRate).toBeCloseTo(1.12**(1/12)-1,12);expect(r.finalCumulative).toBe(4000);});
 it('makes zero discount identical to the same simple schedule',()=>{let r=calc({...sample,annualRate:0});expect(r.simpleMonth).toBe(r.discountedMonth);for(const row of r.rows)expect(row.cumulative).toBe(row.discountedCumulative);});
 it('does not extrapolate beyond entered months',()=>{let r=calc({outlay:100,annualRate:10,flows:[20,20]});expect(r.simpleMonth).toBeNull();expect(r.discountedMonth).toBeNull();});
 it('flags a later deficit after an earlier crossing',()=>{let r=calc({outlay:100,annualRate:0,flows:[100,-50,10]});expect(r.simpleMonth).toBe(1);expect(r.simpleFallsBelow).toBe(true);expect(r.discountedFallsBelow).toBe(true);expect(r.finalCumulative).toBe(-40);});
 it('handles initial zero, exact recovery and valid zero cash',()=>{expect(calc({outlay:0,annualRate:0,flows:[0]}).simpleMonth).toBe(0);expect(calc({outlay:100,annualRate:0,flows:[0,100]}).simpleMonth).toBe(2);});
 it('rejects blanks, malformed values and unsafe horizons',()=>{for(const p of [{outlay:''},{annualRate:''},{outlay:-1},{annualRate:-1},{annualRate:1001},{flows:[]},{flows:[null]},{flows:[' ']},{flows:['0x10']},{flows:Array(61).fill(0)},{flows:[Infinity]}])expect(calc({...sample,...p}).valid).toBe(false);});
 it('exports the current net flows without calling a snapshot a workbook',()=>{let r=calc(sample),csv=unevenPaybackCsv(sample,r,'USD');expect(csv).toContain('Values snapshot; no formulas');expect(csv).toContain('"-1000"');expect(csv).toContain('Discounted first recovered month-end');});
});
