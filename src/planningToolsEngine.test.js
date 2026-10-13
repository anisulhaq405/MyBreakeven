import {describe,it,expect} from 'vitest';
import {calculateEmployeeCost as employee,calculateCashForecast as cash,dateNumber} from './planningToolsEngine';
import {employeeExample as e,cashExample as c} from './planningToolsDefaults';
describe('employee cost boundaries',()=>{
 it('separates recurring and first-year costs and checks annual recovery',()=>{const r=employee(e);expect(r.recurring).toBe(82500);expect(r.firstYear).toBe(87500);expect(r.available).toBe(1840);expect(r.productive).toBe(1380);expect(r.productiveRate).toBeCloseTo(59.7826087);expect(r.requiredHours).toBe(1093.75);expect(r.fundingGap).toBe(22900);});
 it('does not add leave pay twice',()=>{expect(employee({...e,leaveHours:0}).recurring).toBe(employee(e).recurring);});
 it('zero productive hours and non-positive recovery contribution stay undefined',()=>{const r=employee({...e,leaveHours:2080,billRate:10});expect(r.valid).toBe(true);expect(r.productiveRate).toBeNull();expect(r.requiredHours).toBeNull();expect(r.fundingGap).toBe(-87500);});
 it('supports zero salary without a multiplier',()=>expect(employee({...e,salary:0}).burden).toBeNull());
 it('rejects invalid schedules and missing costs',()=>{for(const change of [{paidHours:0},{leaveHours:2081},{utilization:101},{salary:''},{salary:-1},{salary:true},{salary:Infinity}])expect(employee({...e,...change}).valid).toBe(false);});
});
describe('dated 13-week forecast',()=>{
 it('carries balances and separates financing',()=>{const r=cash(c);expect(r.rows).toHaveLength(13);expect(r.rows[0].closing).toBe(13000);expect(r.rows[1].closing).toBe(6000);expect(r.rows[2].financeOut).toBe(2000);expect(r.closing).toBe(15000);expect(r.totalIn).toBe(20000);expect(r.totalOut).toBe(17000);});
 it('reveals a shortfall when collections arrive late',()=>{const r=cash({...c,delay:14});expect(r.rows[0].closing).toBe(4000);expect(r.rows[1].closing).toBe(-3000);expect(r.shortfall).toBe(8000);expect(r.firstBelow).toBe('2026-10-19');});
 it('assigns day6 to week1, day7 to week2 and day90 to week13',()=>{const r=cash({...c,events:['2026-10-25','2026-10-26','2027-01-17','2027-01-18'].map(date=>({date,type:'receipt',category:'operating',amount:1}))});expect(r.rows[0].receipts).toBe(1);expect(r.rows[1].receipts).toBe(1);expect(r.rows[12].receipts).toBe(1);expect(r.excluded).toBe(1);expect(r.excludedAmount).toBe(1);});
 it('haircuts operating receipts only, not financing',()=>{const r=cash({...c,realization:50,events:[{date:c.start,type:'receipt',category:'financing',amount:100},{date:c.start,type:'receipt',category:'operating',amount:100}]});expect(r.rows[0].financeIn).toBe(100);expect(r.rows[0].receipts).toBe(50);});
 it('reports cash before start and delayed cash outside horizon',()=>{const r=cash({...c,delay:14,events:[{date:'2026-10-18',type:'payment',category:'operating',amount:10},{date:'2027-01-10',type:'receipt',category:'operating',amount:20}]});expect(r.excluded).toBe(2);expect(r.excludedAmount).toBe(30);});
 it('rejects invalid calendar dates, fractions and incomplete rows',()=>{expect(dateNumber('2026-02-30')).toBeNull();expect(dateNumber('2028-02-29')).not.toBeNull();for(const change of [{start:'bad'},{delay:.5},{delay:91},{realization:101},{opening:''},{events:[{date:c.start,type:'receipt',category:'operating',amount:''}]}])expect(cash({...c,...change}).valid).toBe(false);});
 it('keeps an empty schedule valid but exposes opening reserve gap',()=>{const r=cash({...c,opening:0,events:[]});expect(r.closing).toBe(0);expect(r.shortfall).toBe(5000);expect(r.firstBelow).toBe('Opening balance');});
});
