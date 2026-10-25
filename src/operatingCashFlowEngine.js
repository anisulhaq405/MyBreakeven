import Decimal from 'decimal.js';
export const ocfFields=[['income','Net income (signed)',9000],['noncash','Net noncash adjustment (signed)',3000],['receivables','Change in operating receivables',12000],['inventory','Change in inventory',5000],['prepaid','Change in operating prepayments',1000],['payables','Change in operating supplier payables',7000],['accruals','Change in other operating liabilities',1000],['other','Other reconciliation adjustment (signed)',0],['receipts','Direct operating cash receipts',88000],['payments','Direct operating cash payments',86000]];
export const defaultOcfInputs=()=>Object.fromEntries(ocfFields.map(([k,,v])=>[k,String(v)]));
export function calculateOperatingCashFlow(input){
 const values={},errors={};
 for(const[k,label]of ocfFields){const raw=String(input[k]??'').trim();if(!/^-?(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(raw)){errors[k]=`Enter ${label.toLowerCase()} as a number with up to two decimals.`;continue;}const n=new Decimal(raw);if(!n.isFinite()||n.abs().gt('1000000000000')||(['receipts','payments'].includes(k)&&n.lt(0))){errors[k]=['receipts','payments'].includes(k)?'Enter a value from 0 to 1,000,000,000,000.':'Enter a signed value between −1,000,000,000,000 and 1,000,000,000,000.';continue;}values[k]=n;}
 if(Object.keys(errors).length)return{valid:false,errors};
 const v=values,indirect=v.income.plus(v.noncash).minus(v.receivables).minus(v.inventory).minus(v.prepaid).plus(v.payables).plus(v.accruals).plus(v.other),direct=v.receipts.minus(v.payments),difference=indirect.minus(direct);
 return{valid:true,errors:{},indirect:indirect.toNumber(),direct:direct.toNumber(),difference:difference.toNumber(),matched:difference.isZero()};
}
export function operatingCashFlowCsv(input,result=calculateOperatingCashFlow(input)){
 if(!result.valid)return null;
 const rows=[['MyBreakeven operating cash flow reconciliation','Current entered values; USD; not a complete cash flow statement'],['Input / result','Amount','Treatment'],...ocfFields.map(([k,label])=>[label,new Decimal(String(input[k]).trim()).toFixed(2),['receipts','payments'].includes(k)?'Direct cash total':k==='receivables'||k==='inventory'||k==='prepaid'?'Subtract signed change':'Add signed amount']),['Indirect OCF',result.indirect.toFixed(2),'Computed'],['Direct OCF',result.direct.toFixed(2),'Computed'],['Difference: indirect minus direct',result.difference.toFixed(2),result.matched?'Totals match; source completeness not verified':'Investigate difference'],['Scope','Period and reporting policy must match','Operating balances only; no automated classification']];
 return rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
}
