import Decimal from 'decimal.js';
const Cash=Decimal.clone({precision:40});
export const unevenPaybackExample={outlay:6000,annualRate:12,flows:[-1000,0,1000,1500,2000,2500,1500,500,500,500,500,500]};
const numeric=v=>(typeof v==='number'||typeof v==='string'&&v.trim()!==''&&/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(v.trim()))&&Number.isFinite(Number(v));
export function calculateUnevenPayback({outlay,annualRate,flows}){
 if(!numeric(outlay)||Number(outlay)<0||Number(outlay)>1e9||!numeric(annualRate)||Number(annualRate)<0||Number(annualRate)>1000||!Array.isArray(flows)||flows.length<1||flows.length>60||flows.some(v=>!numeric(v)||Math.abs(Number(v))>1e9))return {valid:false,message:'Enter an initial outlay from 0 to 1 billion, an annual effective rate from 0% to 1,000%, and 1–60 complete monthly net cash amounts between −1 billion and 1 billion. Enter zero for a month with no cash.'};
 const initial=new Cash(outlay),rate=new Cash(annualRate).div(100),monthly=rate.plus(1).pow(new Cash(1).div(12)).minus(1);
 let cumulative=initial.negated(),discountedCumulative=cumulative,simple=initial.isZero()?0:null,discounted=simple;
 const rows=[];
 for(let n=0;n<flows.length;n++){
  const month=n+1,net=new Cash(flows[n]),factor=rate.plus(1).pow(new Cash(month).div(12)).pow(-1),present=net.times(factor);
  cumulative=cumulative.plus(net);discountedCumulative=discountedCumulative.plus(present);
  if(simple===null&&cumulative.gte(0))simple=month;
  if(discounted===null&&discountedCumulative.gte(0))discounted=month;
  rows.push({month,net:net.toNumber(),factor:factor.toNumber(),present:present.toNumber(),cumulative:cumulative.toNumber(),discountedCumulative:discountedCumulative.toNumber()});
 }
 return {valid:true,rows,simpleMonth:simple,discountedMonth:discounted,effectiveMonthlyRate:monthly.toNumber(),finalCumulative:cumulative.toNumber(),finalPresentBalance:discountedCumulative.toNumber(),simpleFallsBelow:simple!==null&&rows.some(r=>r.month>simple&&r.cumulative<0),discountedFallsBelow:discounted!==null&&rows.some(r=>r.month>discounted&&r.discountedCumulative<0)};
}
export function unevenPaybackCsv(input,result,currency){
 const rows=[['MyBreakeven uneven payback','Values snapshot; no formulas'],['Currency label',currency],['Initial outlay at month zero',Number(input.outlay)],['Annual effective discount rate percent',Number(input.annualRate)],['Timing','Monthly net cash occurs at month end; no interpolation'],['Simple first recovered month-end',result.simpleMonth??'Not recovered in entered months'],['Discounted first recovered month-end',result.discountedMonth??'Not recovered in entered months'],['Later negative simple balance',result.simpleFallsBelow?'Yes':'No'],['Later negative discounted balance',result.discountedFallsBelow?'Yes':'No'],['Month','Net cash','Discount factor','Present value','Cumulative cash','Cumulative present value'],...result.rows.map(r=>[r.month,r.net,r.factor,r.present,r.cumulative,r.discountedCumulative])];
 return '\ufeff'+rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
