import {describe,it,expect} from 'vitest';
import {calculateEquivalent,equivalentDefaults} from './equivalentRatioEngine.js';
describe('Equivalent ratio exhaustive integer scaling regression',()=>{
 it('accepts 936 valid two-term positive/negative/zero-numerator scalings',()=>{
  let checked=0;
  for(let a=-6;a<=6;a++)for(let b=-6;b<=6;b++){
   if(b===0)continue;
   for(const scale of [-4,-2,-1,1,2,4]){
    const r=calculateEquivalent({...equivalentDefaults(),a:[String(a),String(b)],b:[String(a*scale),String(b*scale)]});
    expect(r.valid,JSON.stringify({a,b,scale})).toBe(true);
    expect(r.equal,JSON.stringify({a,b,scale})).toBe(true);
    checked++;
   }
  }
  expect(checked).toBe(936);
 });
 it('does not confuse a single mismatched component with proportionality',()=>{
  for(const a of [1,2,3,4])for(const b of [1,2,3,4]){
   const r=calculateEquivalent({...equivalentDefaults(),a:[String(a),String(b)],b:[String(a*2),String(b*2+1)]});
   expect(r.valid).toBe(true);expect(r.equal).toBe(false);
  }
 });
});