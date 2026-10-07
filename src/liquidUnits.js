import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const US_FL_OZ_ML='29.5735295625';
export function switchLiquidUnit(input,keys,next){
 const previous=input.liquidUnit||'mL';
 if(!['mL','US fl oz'].includes(next))throw new Error('Unsupported liquid unit');
 if(previous===next)return input;
 const output={...input,liquidUnit:next};
 for(const key of keys){
  if(input[key]===''||input[key]==null||!Number.isFinite(Number(input[key])))continue;
  const value=new D(input[key]);
  output[key]=(next==='mL'?value.times(US_FL_OZ_ML):value.div(US_FL_OZ_ML)).toSignificantDigits(15).toString();
 }
 return output;
}
