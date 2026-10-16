import Decimal from 'decimal.js';
import {unitContributionAmounts} from './unitContribution.js';
import {recalledOrder} from './founderCaseStudyData.js';
export {founderCasePath,founderCaseRoute,founderCaseMeta,founderCaseDate,recalledOrder} from './founderCaseStudyData.js';
const D=Decimal.clone({precision:40});
export function reconstructFounderOrder(raw){
 const v={};
 for(const key of Object.keys(recalledOrder)){
  if(raw?.[key]===''||raw?.[key]==null||typeof raw[key]==='boolean')return {valid:false,message:'Complete every field. Use zero only when a cost is absent or explicitly assumed to be zero.'};
  try{v[key]=new D(raw[key]);}catch{return {valid:false,message:'Use valid non-negative numbers.'};}
  if(!v[key].isFinite()||v[key].lt(0)||v[key].gt('1e12'))return {valid:false,message:'Use finite non-negative amounts up to 1 trillion.'};
 }
 if(v.price.lte(0)||v.fee.gt(100))return {valid:false,message:'Price must be positive and the percentage fee must be between 0 and 100.'};
 const variable=v.material.plus(v.labor).plus(v.courier).plus(v.acquisition).plus(v.other);
 const {contribution,fees}=unitContributionAmounts(v.price,variable,v.fee);
 const need=v.overhead.plus(v.owner).plus(v.profit),ownerNeed=v.overhead.plus(v.owner);
 const required=contribution.gt(0)?new D(need).div(contribution.toString()).ceil().toNumber():null;
 const ownerRequired=contribution.gt(0)?new D(ownerNeed).div(contribution.toString()).ceil().toNumber():null;
 if((required!==null&&!Number.isFinite(required))||(ownerRequired!==null&&!Number.isFinite(ownerRequired)))return {valid:false,message:'These inputs produce a target too large to report. Review the contribution and monthly amounts.'};
 return {valid:true,variable:variable.toNumber(),fees:fees.toNumber(),contribution:contribution.toNumber(),need:need.toNumber(),ownerNeed:ownerNeed.toNumber(),required,ownerRequired};
}
