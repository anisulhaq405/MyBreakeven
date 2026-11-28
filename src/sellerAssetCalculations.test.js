import {describe, expect, it} from 'vitest';
import {depreciationSchedule, paypalEstimate, paypalRates} from './sellerAssetCalculations.js';

describe('PayPal merchant fee estimates', () => {
  it('calculates custom fees, zero fees and published presets', () => {
    expect(paypalEstimate({amount:'100',rate:'3',fixed:'0.30'})).toMatchObject({fee:3.3,net:96.7});
    expect(paypalEstimate({amount:'100',rate:'0',fixed:'0'})).toMatchObject({fee:0,net:100});
    expect(paypalEstimate({amount:'100',...paypalRates.checkout})).toMatchObject({fee:3.98,net:96.02});
    expect(paypalEstimate({amount:'100',...paypalRates.goods})).toMatchObject({fee:2.99,net:97.01});
    expect(paypalEstimate({amount:'100',...paypalRates.qr})).toMatchObject({fee:2.38,net:97.62});
  });
  it('finds the first cent reaching the target under rounded fees', () => {
    const fees={rate:'3',fixed:'0.30'};
    expect(paypalEstimate({amount:'100',...fees,reverse:true})).toMatchObject({gross:103.4,net:100});
    expect(paypalEstimate({amount:'103.39',...fees}).net).toBe(99.99);
    expect(paypalEstimate({amount:'0.005',...fees}).error).toBeTruthy();
    expect(paypalEstimate({amount:'10',rate:'100',fixed:'0'}).error).toBeTruthy();
  });
});

describe('business book depreciation', () => {
  const inputs={cost:'12000',residual:'2000',life:'5'};
  it.each([['straight-line',2000],['double-declining',4800]])('reconciles %s to the residual floor', (method, first) => {
    const result=depreciationSchedule({...inputs,method});
    expect(result.rows).toHaveLength(5);
    expect(result.rows[0].expense).toBe(first);
    expect(result.rows[4]).toMatchObject({accumulated:10000,closing:2000});
    expect(result.rows.slice(1).map(row=>row.opening)).toEqual(result.rows.slice(0,-1).map(row=>row.closing));
  });
  it('handles cents true-up, full residual and invalid inputs', () => {
    expect(depreciationSchedule({cost:'1',residual:'0',life:'3',method:'straight-line'}).rows.map(row=>row.expense)).toEqual([0.33,0.33,0.34]);
    expect(depreciationSchedule({...inputs,residual:'12000',method:'double-declining'}).total).toBe(0);
    expect(depreciationSchedule({...inputs,residual:'12001',method:'double-declining'}).error).toBeTruthy();
    expect(depreciationSchedule({...inputs,life:'0',method:'straight-line'}).error).toBeTruthy();
  });
});
