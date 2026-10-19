import {describe,it,expect}from 'vitest';
import {calculateHighLow}from './highLow.js';
const base={lowActivity:'80',lowCost:'1640',highActivity:'280',highCost:'2440',target:'220'};
describe('high-low cost estimate',()=>{
 it('reproduces the article and both selected endpoints',()=>{expect(calculateHighLow(base)).toMatchObject({valid:true,rate:4,fixed:1320,total:2200,warnings:[]});expect(calculateHighLow({...base,target:'80'}).total).toBe(1640);expect(calculateHighLow({...base,target:'280'}).total).toBe(2440)});
 it('distinguishes missing from explicit zero activity',()=>{expect(calculateHighLow({...base,lowActivity:''}).valid).toBe(false);expect(calculateHighLow({...base,lowActivity:'0',lowCost:'1320'}).fixed).toBe(1320)});
 it('rejects an undefined slope and invalid numbers',()=>{for(const v of ['80','60'])expect(calculateHighLow({...base,highActivity:v}).valid).toBe(false);for(const v of ['-1','Infinity','NaN','1000000000001'])expect(calculateHighLow({...base,lowCost:v}).valid).toBe(false)});
 it('exposes extrapolation and suspect intercepts instead of hiding them',()=>{expect(calculateHighLow({...base,target:'400'}).warnings.join(' ')).toContain('extrapolation');expect(calculateHighLow({...base,lowCost:'10',highCost:'2440'}).warnings.join(' ')).toContain('negative');expect(calculateHighLow({...base,highCost:'1000'}).warnings.join(' ')).toContain('negative');expect(calculateHighLow({...base,highCost:'1640'}).warnings.join(' ')).toContain('no variable')});
});
