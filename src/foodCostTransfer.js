import {calculateRecipe,calculateMenuPrice} from './foodCostEngine.js';
import {menuExample} from './foodCalculatorDefaults.js';
export const FOOD_MENU_TRANSFER_KEY='mybreakeven-menu-cost-v1';
export function recipeMenuTransfer(input,currency,now=Date.now()){
 const cost=calculateRecipe(input);if(!cost.valid)return null;
 const patch={ingredient:cost.ingredient,labor:cost.labor,packaging:cost.packaging,other:cost.other,price:Number(input.price),fee:Number(input.fee)};
 if(Number(input.servings)===1)Object.assign(patch,{fixed:400,ownerPay:0,profitTarget:1800,weeklyCapacity:10,volume:40});
 if(!calculateMenuPrice({...menuExample,...patch}).valid)return null;
 return {version:1,input:patch,currency,createdAt:now};
}
export function readMenuTransfer(storage,now=Date.now()){
 try {
  const text=storage.getItem(FOOD_MENU_TRANSFER_KEY);if(!text)return null;
  storage.removeItem(FOOD_MENU_TRANSFER_KEY);const data=JSON.parse(text);
  if(!Number.isFinite(data.createdAt)||now<data.createdAt||now-data.createdAt>5*60*1000)return null;
  if(data.version!==1||!data.input||!['ingredient','labor','packaging','other','price','fee'].every(k=>typeof data.input[k]==='number'&&Number.isFinite(data.input[k])&&data.input[k]>=0))return null;
  const allowed=['ingredient','labor','packaging','other','price','fee','fixed','ownerPay','profitTarget','weeklyCapacity','volume'];
  if(Object.keys(data.input).some(k=>!allowed.includes(k))||typeof data.currency!=='string'||!/^[A-Z]{3}$/.test(data.currency))return null;
  new Intl.NumberFormat('en-US',{style:'currency',currency:data.currency});
  const input={...menuExample,...data.input};if(!calculateMenuPrice(input).valid)return null;
  return {input,currency:data.currency};
 } catch {return null;}
}
