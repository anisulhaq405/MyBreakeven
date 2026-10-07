import {describe,it,expect} from 'vitest';
import {switchLiquidUnit} from './liquidUnits';
import {calculateOperationalTool as calc} from './operationalToolEngine';
import {operationalTools} from './operationalTools';
describe('US liquid quantities without mass assumptions',()=>{
 it('converts a 32 US fl oz bottle to 946.352946 mL',()=>expect(Number(switchLiquidUnit({size:32,liquidUnit:'US fl oz'},['size'],'mL').size)).toBeCloseTo(946.352946,8));
 it('preserves dilution cost and bottle yield after conversion and round trip',()=>{const input=operationalTools['detailing-chemical-cost-calculator'].defaults;const converted=switchLiquidUnit(input,['size','use'],'US fl oz');const r=calc(converted,'chemical');expect(r.main).toBeCloseTo(calc(input,'chemical').main,12);expect(r.metrics[2][1]).toBeCloseTo(18,12);expect(r.metrics[0][0]).toContain('US fl oz');expect(Number(switchLiquidUnit(converted,['size','use'],'mL').size)).toBeCloseTo(input.size,10)});
 it('converts developer only and keeps weighed color and included waste cost',()=>{const input=operationalTools['hair-color-product-cost-calculator'].defaults;const converted=switchLiquidUnit(input,['developerSize','developerUse'],'US fl oz');expect(converted.colorSize).toBe(60);expect(converted.colorUse).toBe(30);expect(calc(converted,'hairColor').main).toBeCloseTo(7.08,12);expect(calc(converted,'hairColor').metrics[2][1]).toBeCloseTo(1.062,12)});
 it('preserves blank input for validation',()=>expect(switchLiquidUnit({size:''},['size'],'US fl oz').size).toBe(''));
});
