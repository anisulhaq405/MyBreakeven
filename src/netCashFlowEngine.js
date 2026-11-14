import Decimal from 'decimal.js';
const D=Decimal.clone({precision:40});
export const cashFields=['opening','opIn','opOut','investIn','investOut','financeIn','financeOut','fx'];
export const netCashDefaults={start:'2026-09-01',end:'2026-09-30',opening:5000,opIn:20000,opOut:18000,investIn:0,investOut:3000,financeIn:4000,financeOut:500,fx:0,observed:'',reserve:''};
const dateValid=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number(s.slice(0,4))>=1900&&Number(s.slice(0,4))<=9999&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export function calculateNetCash(v){
 if(!v||typeof v!=='object')return{valid:false,message:'Enter a completed-period cash summary.'};
 if(!dateValid(v.start)||!dateValid(v.end)||v.end<v.start)return{valid:false,message:'Choose valid period dates, with the end on or after the start (1900–9999).'};
 const a={};
 for(const k of [...cashFields,...(v.observed===''||v.observed==null?[]:['observed']),...(v.reserve===''||v.reserve==null?[]:['reserve'])]){
  const raw=v[k];
  if(!['number','string'].includes(typeof raw)||String(raw).trim()===''||!/^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?$/i.test(String(raw).trim()))return{valid:false,message:'Enter every required amount. Use an explicit 0 when there was no cash movement.'};
  let n;try{n=new D(raw);}catch{return{valid:false,message:'Use valid numeric cash amounts.'};}
  if(!n.isFinite()||n.abs().gt(1e12)||(k!=='fx'&&n.lt(0)))return{valid:false,message:'Enter amounts from 0 to 1 trillion. Only the exchange-rate adjustment may be negative.'};
  if(!n.isZero()&&n.toNumber()===0)return{valid:false,message:'An amount is too small to represent. Use a normal currency amount.'};
  a[k]=n;
 }
 const operating=a.opIn.minus(a.opOut),investing=a.investIn.minus(a.investOut),financing=a.financeIn.minus(a.financeOut);
 const movement=operating.plus(investing).plus(financing),change=movement.plus(a.fx),closing=a.opening.plus(change);
 const difference=a.observed===undefined?null:a.observed.minus(closing);
 const totalReceipts=a.opIn.plus(a.investIn).plus(a.financeIn),totalPayments=a.opOut.plus(a.investOut).plus(a.financeOut),beforeFinancing=operating.plus(investing),closingWithoutFinancing=a.opening.plus(beforeFinancing).plus(a.fx),headroom=a.reserve===undefined?null:closing.minus(a.reserve);
 const values={operating,investing,financing,movement,change,closing,difference,totalReceipts,totalPayments,beforeFinancing,closingWithoutFinancing,headroom};
 const days=(Date.parse(v.end)-Date.parse(v.start))/86400000+1;
 return{valid:true,...Object.fromEntries(Object.entries(values).map(([k,n])=>[k,n===null?null:n.toNumber()])),raw:Object.fromEntries(Object.entries(values).map(([k,n])=>[k,n===null?null:n.toString()])),days,reconciled:difference===null?null:difference.eq(0),warnings:[...(operating.lt(0)?['Operating cash is negative. Review whether financing or asset sales are supporting the bank balance.']:[]),...(closing.lt(0)?['Calculated closing cash is negative. Check missing transactions and funding; this result does not establish an overdraft facility.']:[]),...(headroom?.lt(0)?['Calculated closing cash is below your chosen reserve. A period-end result cannot identify an earlier cash shortfall.']:[])]};
}
export function netCashCSV(v,currency='USD'){
 const r=calculateNetCash(v);if(!r.valid||typeof currency!=='string'||!/^[A-Z]{3}$/.test(currency))return null;
 const rows=[['MyBreakeven net cash flow — values-only snapshot'],['Currency label; no exchange conversion',currency],['Period start',v.start],['Period end',v.end],['Line',currency],...cashFields.map(k=>[({opening:'Opening cash',opIn:'Operating receipts',opOut:'Operating payments',investIn:'Investing receipts',investOut:'Investing payments',financeIn:'Financing receipts',financeOut:'Financing payments',fx:'Exchange-rate adjustment'})[k],new D(v[k]).toFixed()]),...Object.entries(r.raw).filter(([k])=>k!=='difference').map(([k,n])=>[k,n??'Not supplied']),['Observed closing',v.observed===''||v.observed==null?'Not entered':new D(v.observed).toFixed()],['Observed less calculated',r.raw.difference??'Not checked'],['Reserve chosen',v.reserve===''||v.reserve==null?'Not supplied':new D(v.reserve).toFixed()],['Period days (inclusive)',r.days],['Assumption','Financing-excluded closing holds operating, investing and FX unchanged; not a forecast. Reserve is a chosen threshold, not a payment or restricted-cash adjustment.'],['Scope','Simplified cash summary; no formulas or automatic transaction classification.']];
 return '\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
