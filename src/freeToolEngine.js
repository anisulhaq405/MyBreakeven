import Decimal from 'decimal.js';
const PricingDecimal = Decimal.clone({ precision: 40 });
const D = value => new PricingDecimal(value);
export function calculatePriceChange(input, mode = 'discount') {
  const required = ['price','cost','fee','volume','change','expected'];
  if (required.some(key => input[key] === '' || input[key] == null || !Number.isFinite(Number(input[key])) || Number(input[key]) < 0 || Number(input[key]) > 1e12)) return { valid:false, message:'Enter a non-negative number up to 1 trillion in every required field.' };
  if (Number(input.price) <= 0 || Number(input.volume) <= 0 || !Number.isInteger(Number(input.volume))) return { valid:false,message:'Price must be above zero; current monthly sales must be a positive whole number.' };
  if (Number(input.fee) >= 100 || (mode === 'discount' && Number(input.change) >= 100) || (mode === 'increase' && Number(input.expected) > 100)) return {valid:false,message:'Fees and discounts must be below 100%. Customer loss cannot exceed 100%.'};
  if (input.capacity !== '' && input.capacity != null && (!Number.isFinite(Number(input.capacity)) || Number(input.capacity)<0 || !Number.isInteger(Number(input.capacity)))) return {valid:false,message:'Available monthly capacity must be a non-negative whole number, or left blank.'};
  const price=D(input.price),cost=D(input.cost),keep=D(1).minus(D(input.fee).div(100)),volume=D(input.volume);
  const oldContribution=price.times(keep).minus(cost);
  if(oldContribution.lte(0)) return {valid:false,message:'The current sale leaves no positive contribution. Adjust price or costs before comparing this change.'};
  const newPrice=price.times(mode==='discount'?D(1).minus(D(input.change).div(100)):D(1).plus(D(input.change).div(100)));
  const contribution=newPrice.times(keep).minus(cost), baseline=oldContribution.times(volume);
  const expectedVolume=volume.times(mode==='discount'?D(1).plus(D(input.expected).div(100)):D(1).minus(D(input.expected).div(100))).floor();
  const projected=contribution.times(expectedVolume);
  const target=contribution.gt(0)?baseline.div(contribution).ceil():null;
  const maxChange=mode==='discount'?oldContribution.div(price.times(keep)).times(100):target?volume.minus(target).div(volume).times(100):null;
  const values={newPrice,oldContribution,contribution,baseline,projected,expectedVolume,target,maxChange,delta:projected.minus(baseline),oldRevenue:price.times(volume),newRevenue:newPrice.times(expectedVolume),extra:target?target.minus(volume):null,requiredChange:target?(mode==='discount'?target.minus(volume):volume.minus(target)).div(volume).times(100):null};
  const result={valid:true,positive:contribution.gt(0),capacity:input.capacity===''||input.capacity==null?null:Number(input.capacity)};
  for(const [key,value] of Object.entries(values)) result[key]=value===null?null:value.toNumber();
  if(Object.values(result).some(value=>typeof value==='number'&&!Number.isFinite(value))) return {valid:false,message:'These values are too large to calculate safely. Use smaller amounts.'};
  return result;
}
