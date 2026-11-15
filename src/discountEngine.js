import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
const numeric=v=>(typeof v==='number'||typeof v==='string')&&String(v).trim()!==''&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=1e12;
export function calculateDiscount(input){
 if(!input||typeof input!=='object')return {valid:false,message:'Enter your pricing inputs.'};
 for(const k of ['price','cost','fee','volume','expected'])if(!numeric(input[k]))return {valid:false,message:'Enter a non-negative number up to 1 trillion in each required field.'};
 if(Number(input.price)<=0||Number(input.volume)<=0||!Number.isInteger(Number(input.volume)))return {valid:false,message:'Current price must be above zero and current monthly sales must be a positive whole number.'};
 if(Number(input.fee)>=100)return {valid:false,message:'The percentage selling fee must be below 100%.'};
 for(const k of ['newCost','campaignCost','capacity'])if(input[k]!==''&&input[k]!=null&&!numeric(input[k]))return {valid:false,message:'Revised cost, campaign cost and capacity must be non-negative numbers up to 1 trillion, or left blank.'};
 if(input.capacity!==''&&input.capacity!=null&&!Number.isInteger(Number(input.capacity)))return {valid:false,message:'Monthly capacity must be a whole number, or left blank.'};
 const mode=input.discountMode||'percent';
 if(!['percent','amount','price'].includes(mode))return {valid:false,message:'Choose a supported discount entry mode.'};
 const key=mode==='percent'?'change':mode==='amount'?'discountAmount':'salePrice';
 if(!numeric(input[key])||(mode==='percent'?Number(input[key])>100:Number(input[key])>Number(input.price)))return {valid:false,message:mode==='percent'?'Enter a discount from 0% to 100%.':'Enter an amount between zero and the current selling price.'};
 const price=new D(input.price),cost=new D(input.cost),keep=new D(1).minus(new D(input.fee).div(100)),volume=new D(input.volume),fee=new D(input.fee);
 const oldContribution=price.times(keep).minus(cost);
 if(oldContribution.lte(0))return {valid:false,message:'Your current sale must leave positive contribution before comparing a promotion. Review price, cost and fees.'};
 const salePrice=mode==='percent'?price.times(new D(1).minus(new D(input.change).div(100))):mode==='amount'?price.minus(input.discountAmount):new D(input.salePrice);
 const revisedCost=input.newCost===''||input.newCost==null?cost:new D(input.newCost),campaignCost=new D(input.campaignCost===''||input.campaignCost==null?0:input.campaignCost),capacity=input.capacity===''||input.capacity==null?null:new D(input.capacity);
 const contribution=salePrice.times(keep).minus(revisedCost),baseline=oldContribution.times(volume),requiredContribution=baseline.plus(campaignCost),expectedVolume=volume.times(new D(1).plus(new D(input.expected).div(100))).floor();
 const target=contribution.gt(0)?requiredContribution.div(contribution).ceil():null;
 const revenueTarget=salePrice.gt(0)?price.times(volume).div(salePrice).ceil():null;
 if(expectedVolume.gt(Number.MAX_SAFE_INTEGER)||(target&&target.gt(Number.MAX_SAFE_INTEGER))||(revenueTarget&&revenueTarget.gt(Number.MAX_SAFE_INTEGER)))return {valid:false,message:'The required or expected sales count is too large to report safely. Review these assumptions.'};
 const priceFloor=q=>requiredContribution.div(q).plus(revisedCost).div(keep);
 const expectedFloor=priceFloor(expectedVolume),capacityFloor=capacity&&capacity.gt(0)?priceFloor(capacity):null;
 const values={price,cost,fee,volume,revisedCost,campaignCost,capacity,salePrice,discountAmount:price.minus(salePrice),discountPercent:new D(1).minus(salePrice.div(price)).times(100),oldContribution,contribution,baseline,requiredContribution,expectedVolume,target,revenueTarget,extra:target?target.minus(volume):null,requiredLift:target?target.div(volume).minus(1).times(100):null,exactLift:contribution.gt(0)?requiredContribution.div(contribution.times(volume)).minus(1).times(100):null,oldRevenue:price.times(volume),newRevenue:salePrice.times(expectedVolume),projected:contribution.times(expectedVolume),contributionChange:contribution.times(expectedVolume).minus(baseline),profitChange:contribution.times(expectedVolume).minus(requiredContribution),oldMargin:oldContribution.div(price).times(100),newMargin:salePrice.gt(0)?contribution.div(salePrice).times(100):null,zeroContributionDiscount:new D(1).minus(revisedCost.div(price.times(keep))).times(100),expectedFloor,expectedFloorQuote:expectedFloor.times(100).ceil().div(100),maxDiscountAtExpected:new D(1).minus(expectedFloor.div(price)).times(100),capacityFloor,capacityFloorQuote:capacityFloor?capacityFloor.times(100).ceil().div(100):null,maxDiscountAtCapacity:capacityFloor?new D(1).minus(capacityFloor.div(price)).times(100):null,capacityProfitChange:capacity?contribution.times(capacity).minus(requiredContribution):null};
 const result={valid:true,expectedLift:Number(input.expected)};
 for(const[k,v]of Object.entries(values))result[k]=v===null?null:v.toNumber();
 result.scenarios=[...new Set([0,5,10,15,20,25])].sort((a,b)=>a-b).map(discount=>{const p=price.times(new D(1).minus(new D(discount).div(100))),c=p.times(keep).minus(revisedCost),q=c.gt(0)?requiredContribution.div(c).ceil():null;return {discount,price:p.toNumber(),contribution:c.toNumber(),target:q&&q.lte(Number.MAX_SAFE_INTEGER)?q.toNumber():null,tooLarge:!!q&&q.gt(Number.MAX_SAFE_INTEGER),profitChange:c.times(expectedVolume).minus(requiredContribution).toNumber(),fitsCapacity:capacity&&q?q.lte(capacity):null};});
 if(Object.values(result).some(x=>typeof x==='number'&&!Number.isFinite(x)))return {valid:false,message:'These values are too large to calculate safely. Use smaller amounts.'};
 return result;
}
export function discountCSV(r,currency){
 if(!r.valid)return '';
 const rows=[['Discount break-even scenario',currency],...Object.entries({currentPrice:r.price,currentCost:r.cost,revisedCost:r.revisedCost,percentageFee:r.fee,currentSales:r.volume,discountPercent:r.discountPercent,salePrice:r.salePrice,expectedSalesLiftPercent:r.expectedLift,expectedWholeSales:r.expectedVolume,campaignCost:r.campaignCost,monthlyCapacity:r.capacity??'Unknown',requiredWholeSales:r.target??'Not recoverable',revenueTarget:r.revenueTarget??'Not recoverable',baselineContribution:r.baseline,expectedContribution:r.projected,expectedProfitChange:r.profitChange,maxDiscountAtExpectedSales:r.maxDiscountAtExpected}),[],['Discount percent','Sale price','Contribution per sale','Required whole sales','Profit change at expected sales','Fits capacity'],...r.scenarios.map(s=>[s.discount,s.price,s.contribution,s.tooLarge?'Too large':s.target??'Not recoverable',s.profitChange,s.fitsCapacity===null?'Unknown':s.fitsCapacity?'Yes':'No']),[],['Assumptions','All modeled sales receive the offer; same sales mix and fee; existing overhead unchanged; campaign cost deducted once; whole expected sales rounded down and targets up; no demand prediction; currency labels only']];
 return rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
