import Decimal from 'decimal.js';
export function calculateHighLow(input) {
  const keys = ['lowActivity','lowCost','highActivity','highCost','target'];
  if (keys.some(key => input[key] === undefined || input[key] === null || String(input[key]).trim() === '')) return {valid:false,message:'Complete every activity and cost input. Enter 0 explicitly where appropriate.'};
  if (keys.some(key => !Number.isFinite(Number(input[key])) || Number(input[key]) < 0 || Number(input[key]) > 1e12)) return {valid:false,message:'Use finite, nonnegative numbers no greater than 1 trillion.'};
  const n = Object.fromEntries(keys.map(key => [key,new Decimal(input[key])]));
  if (n.highActivity.lte(n.lowActivity)) return {valid:false,message:'Highest activity must be greater than lowest activity. Select observations by activity, not total cost.'};
  const rate=n.highCost.minus(n.lowCost).div(n.highActivity.minus(n.lowActivity));
  const fixed=n.lowCost.minus(rate.times(n.lowActivity));
  const total=fixed.plus(rate.times(n.target));
  const warnings=[];
  if(rate.lt(0))warnings.push('The fitted variable rate is negative. Investigate the observations and cost driver before using this estimate.');
  if(fixed.lt(0))warnings.push('The fitted fixed component is negative. This is not evidence of negative fixed bills; review the model.');
  if(n.target.lt(n.lowActivity)||n.target.gt(n.highActivity))warnings.push('Target activity is outside the observed range. This is extrapolation; verify capacity, cost steps and the driver before relying on it.');
  if(rate.isZero())warnings.push('The two costs are equal: this fit estimates no variable component. Check whether the observations are representative.');
  return {valid:true,rate:rate.toNumber(),fixed:fixed.toNumber(),total:total.toNumber(),warnings};
}
