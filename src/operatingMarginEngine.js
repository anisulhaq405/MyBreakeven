import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const operatingMarginDefaults={revenue:50000,cogs:20000,opex:18000,income:12000};
function read(v,signed=false){if(v==null||typeof v==='boolean'||String(v).trim()==='')return null;try{const n=new D(v);return n.isFinite()&&n.abs().lte(1e12)&&(signed||n.gte(0))&&(n.isZero()||n.toNumber()!==0)?n:null;}catch{return null;}}
export function calculateOperatingMargin(input,mode='build'){
 if(!['build','direct'].includes(mode))return {valid:false,message:'Choose the income-statement or direct operating-income mode.'};
 const revenue=read(input.revenue),income=mode==='direct'?read(input.income,true):null,cogs=mode==='build'?read(input.cogs):null,opex=mode==='build'?read(input.opex):null;
 if(revenue===null||(mode==='direct'?income===null:cogs===null||opex===null))return {valid:false,message:'Complete the visible inputs with finite amounts up to 1 trillion. Revenue and costs must be nonnegative; direct operating income can be negative. Blank is not zero.'};
 const gross=mode==='build'?revenue.minus(cogs):null,operating=mode==='build'?gross.minus(opex):income;
 const out={income:operating,gross,margin:revenue.gt(0)?operating.div(revenue).times(100):null,opexRatio:mode==='build'&&revenue.gt(0)?opex.div(revenue).times(100):null};
 if(Object.values(out).some(n=>n!==null&&(!n.isFinite()||n.abs().gt(1e15)||!n.isZero()&&n.toNumber()===0)))return {valid:false,message:'Result is outside the supported range. Check units and inputs.'};
 return {valid:true,mode,revenue:revenue.toNumber(),...Object.fromEntries(Object.entries(out).map(([k,n])=>[k,n===null?null:n.toNumber()])),warning:revenue.isZero()?'Operating margin is unavailable at zero revenue. The operating income amount is still shown.':mode==='direct'&&operating.gt(revenue)?'Operating income exceeds revenue. Check the reporting boundary and non-operating items.':null};
}
export function formatMargin(n){return n===null?'Unavailable':n!==0&&Math.abs(n)<.005?n.toExponential(4)+'%':new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(n)+'%';}
