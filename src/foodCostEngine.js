import Decimal from 'decimal.js';
const D = Decimal.clone({precision:40});
export const FOOD_COST_ENGINE_VERSION = '1.0.0';
export const foodUnits = {
 g:{dimension:'mass',factor:'1',label:'g'},kg:{dimension:'mass',factor:'1000',label:'kg'},
 oz:{dimension:'mass',factor:'28.349523125',label:'oz (weight)'},lb:{dimension:'mass',factor:'453.59237',label:'lb'},
 mL:{dimension:'volume',factor:'1',label:'mL'},L:{dimension:'volume',factor:'1000',label:'L'},
 'US fl oz':{dimension:'volume',factor:'29.5735295625',label:'US fl oz (volume)'},
 each:{dimension:'count',factor:'1',label:'each'},
};
const value = raw => {if(raw===''||raw==null)return null;try{const n=new D(raw);return n.isFinite()&&n.gte(0)&&n.lte('1e12')?n:null;}catch{return null;}};
const invalid = message => ({valid:false,message,version:FOOD_COST_ENGINE_VERSION});
const numbers = obj => Object.fromEntries(Object.entries(obj).map(([k,v])=>[k,v instanceof D?v.toNumber():v]));
const centsUp = n => n.times(100).ceil().div(100);
export function calculateRecipe(input) {
 if(!Array.isArray(input.ingredients)||input.ingredients.length<1||input.ingredients.length>30)return invalid('Use between one and 30 ingredient rows.');
 const keys=['servings','labor','packaging','other','price','fee'];const v=Object.fromEntries(keys.map(k=>[k,value(input[k])]));
 if(keys.some(k=>v[k]===null)||v.servings.lte(0)||!v.servings.isInteger()||v.fee.gte(100))return invalid('Enter non-negative costs, a positive whole serving count and a fee below 100%.');
 let total=new D(0);const rows=[];
 for(const [i,row] of input.ingredients.entries()) {
  const cost=value(row.cost),pack=value(row.pack),used=value(row.used),yieldPct=value(row.yield);
  const a=foodUnits[row.packUnit],b=foodUnits[row.useUnit];
  if(!cost||!pack||!used||!yieldPct||pack.lte(0)||yieldPct.lte(0)||yieldPct.gt(100))return invalid(`Ingredient ${i+1}: pack quantity must be positive, yield above 0% up to 100%, and costs/usage non-negative.`);
  if(!a||!b||a.dimension!==b.dimension)return invalid(`Ingredient ${i+1}: purchase and recipe units must both be weight, volume or count. No density conversion is assumed.`);
  const usable=pack.times(a.factor).times(yieldPct.div(100));
  const ingredientCost=cost.times(used).times(b.factor).div(usable);total=total.plus(ingredientCost);
  rows.push({name:String(row.name||`Ingredient ${i+1}`),cost:ingredientCost.toNumber()});
 }
 const ingredient=total.div(v.servings),labor=v.labor.div(v.servings),other=v.other.div(v.servings),variable=ingredient.plus(labor).plus(other).plus(v.packaging),fees=v.price.times(v.fee.div(100)),contribution=v.price.minus(variable).minus(fees);
 const result={valid:true,version:FOOD_COST_ENGINE_VERSION,rows,...numbers({batchIngredients:total,ingredient,labor,other,packaging:v.packaging,variable,fees,contribution,foodPct:v.price.gt(0)?ingredient.div(v.price).times(100):null,contributionPct:v.price.gt(0)?contribution.div(v.price).times(100):null})};
 if(!Number.isFinite(result.variable)||rows.some(r=>!Number.isFinite(r.cost)))return invalid('These quantities produce an amount too large to report. Check the pack size and yield.');
 return result;
}
export function calculateFoodPeriod(input) {
 const keys=['opening','purchases','credits','closing','sales'];const v=Object.fromEntries(keys.map(k=>[k,value(input[k])]));
 const theoretical=input.theoretical===''?null:value(input.theoretical);
 if(keys.some(k=>v[k]===null)||v.sales.lte(0)||(input.theoretical!==''&&theoretical===null))return invalid('Enter non-negative inventory values and positive food sales. Leave theoretical usage blank if unknown.');
 const used=v.opening.plus(v.purchases).minus(v.credits).minus(v.closing);
 if(used.lt(0))return invalid('Inventory usage is negative. Reconcile counts, credits and the period before interpreting the percentage.');
 return {valid:true,version:FOOD_COST_ENGINE_VERSION,...numbers({used,foodPct:used.div(v.sales).times(100),salesLessFood:v.sales.minus(used),theoreticalPct:theoretical===null?null:theoretical.div(v.sales).times(100),variance:theoretical===null?null:used.minus(theoretical),variancePoints:theoretical===null?null:used.minus(theoretical).div(v.sales).times(100)})};
}
export function calculateMenuPrice(input) {
 const keys=['ingredient','labor','packaging','other','fee','foodTarget','marginTarget','price','fixed','ownerPay','profitTarget','volume','weeklyCapacity'];const v=Object.fromEntries(keys.map(k=>[k,value(input[k])]));
 if(keys.some(k=>v[k]===null)||v.foodTarget.lte(0)||v.foodTarget.gt(100)||v.fee.gte(100)||v.marginTarget.gte(100)||v.fee.plus(v.marginTarget).gte(100)||!v.volume.isInteger())return invalid('Use non-negative values, whole monthly sales, food target above 0% up to 100%, and fee plus contribution target below 100%.');
 const keep=new D(1).minus(v.fee.div(100)),variable=v.ingredient.plus(v.labor).plus(v.packaging).plus(v.other),need=v.fixed.plus(v.ownerPay).plus(v.profitTarget);
 const foodPrice=centsUp(v.ingredient.div(v.foodTarget.div(100))),marginPrice=centsUp(variable.div(keep.minus(v.marginTarget.div(100))));
 const contribution=v.price.times(keep).minus(variable),capacity=v.weeklyCapacity.times(52).div(12),wholeCapacity=capacity.floor();
 const required=contribution.gt(0)?need.div(contribution).ceil():need.eq(0)&&contribution.eq(0)?new D(0):null;
 const capacityPrice=wholeCapacity.gt(0)?centsUp(variable.plus(need.div(wholeCapacity)).div(keep)):null;
 const result = {valid:true,version:FOOD_COST_ENGINE_VERSION,...numbers({variable,need,foodPrice,marginPrice,contribution,foodPct:v.price.gt(0)?v.ingredient.div(v.price).times(100):null,contributionPct:v.price.gt(0)?contribution.div(v.price).times(100):null,foodPriceContribution:foodPrice.times(keep).minus(variable),marginPriceContribution:marginPrice.times(keep).minus(variable),capacity,wholeCapacity,required,capacityPrice,monthlyResult:contribution.times(v.volume).minus(need)}),fits:required!==null&&required.lte(wholeCapacity),plannedFits:v.volume.lte(wholeCapacity)};
 if(Object.values(result).some(n=>typeof n==='number'&&!Number.isFinite(n)))return invalid('These inputs produce a result too large to report. Check prices, contribution and target amounts.');
 return result;
}
