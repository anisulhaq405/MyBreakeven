import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const cashFields=['opening','opIn','opOut','investIn','investOut','financeIn','financeOut','fx'];
export const netCashDefaults={start:'2026-09-01',end:'2026-09-30',opening:5000,opIn:20000,opOut:18000,investIn:0,investOut:3000,financeIn:4000,financeOut:500,fx:0,observed:''};
const dateValid=s=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number(s.slice(0,4))>=1900&&Number(s.slice(0,4))<=9999&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export function calculateNetCash(v){
 if(!dateValid(v.start)||!dateValid(v.end)||v.end<v.start)return{valid:false,message:'Choose valid period dates, with the end on or after the start (1900–9999).'};
 const a={};
 for(const k of [...cashFields,...(v.observed===''||v.observed==null?[]:['observed'])]){
  const raw=v[k];
  if(raw===null||raw===undefined||String(raw).trim()===''||!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?$/i.test(String(raw).trim()))return{valid:false,message:'Enter every required amount. Use an explicit 0 when there was no cash movement.'};
  let n;try{n=new D(raw);}catch{return{valid:false,message:'Use valid numeric cash amounts.'};}
  if(!n.isFinite()||n.abs().gt(1e12)||(k!=='fx'&&n.lt(0)))return{valid:false,message:'Enter amounts from 0 to 1 trillion. Only the exchange-rate adjustment may be negative.'};
  if(!n.isZero()&&n.toNumber()===0)return{valid:false,message:'An amount is too small to represent. Use a normal currency amount.'};
  a[k]=n;
 }
 const operating=a.opIn.minus(a.opOut),investing=a.investIn.minus(a.investOut),financing=a.financeIn.minus(a.financeOut);
 const movement=operating.plus(investing).plus(financing),change=movement.plus(a.fx),closing=a.opening.plus(change);
 const difference=a.observed===undefined?null:a.observed.minus(closing);
 return{valid:true,operating:operating.toNumber(),investing:investing.toNumber(),financing:financing.toNumber(),movement:movement.toNumber(),change:change.toNumber(),closing:closing.toNumber(),difference:difference===null?null:difference.toNumber(),warnings:[...(operating.lt(0)?['Operating cash is negative. Review whether financing or asset sales are supporting the bank balance.']:[]),...(closing.lt(0)?['Calculated closing cash is negative. Check missing transactions and funding; this result does not establish an overdraft facility.']:[])]};
}
export function netCashCSV(v){
 const r=calculateNetCash(v);if(!r.valid)return null;
 const rows=[['MyBreakeven net cash flow — values-only snapshot'],['Currency','USD'],['Period start',v.start],['Period end',v.end],['Line','USD'],...cashFields.map(k=>[({opening:'Opening cash',opIn:'Operating receipts',opOut:'Operating payments',investIn:'Investing receipts',investOut:'Investing payments',financeIn:'Financing receipts',financeOut:'Financing payments',fx:'Exchange-rate adjustment'})[k],new D(v[k]).toFixed()]),...['operating','investing','financing','movement','change','closing'].map(k=>[k,r[k]]),['Observed closing',v.observed===''||v.observed==null?'Not entered':new D(v.observed).toFixed()],['Observed less calculated',r.difference??'Not checked'],['Scope','Simplified cash summary; no formulas or automatic transaction classification.']];
 return '\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
