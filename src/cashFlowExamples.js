// Original fictional USD teaching case. No client or market data.
export const cashFlowCase = Object.freeze({
 period:'March 2026', name:'Cedar Supply', revenue:100000,cogs:55000,payroll:20000,otherExpense:10000,depreciation:3000,interest:1000,tax:2000,
 opening:{cash:10000,receivables:20000,inventory:15000,prepaid:2000,ppe:30000,payables:12000,accruals:3000,taxPayable:1000,debt:20000,equity:41000},
 closing:{cash:10000,receivables:32000,inventory:20000,prepaid:3000,ppe:39000,payables:19000,accruals:4000,taxPayable:1000,debt:32000,equity:48000},
 equipment:12000,borrowing:15000,principal:3000,distribution:2000,
});
export function reconcileCashCase(c=cashFlowCase){
 const o=c.opening,e=c.closing;
 const income=c.revenue-c.cogs-c.payroll-c.otherExpense-c.depreciation-c.interest-c.tax;
 const receipts=c.revenue+o.receivables-e.receivables;
 const suppliers=c.cogs+e.inventory-o.inventory-(e.payables-o.payables);
 const staff=c.payroll-(e.accruals-o.accruals);
 const other=c.otherExpense+(e.prepaid-o.prepaid);
 const taxPaid=c.tax-(e.taxPayable-o.taxPayable);
 const direct=receipts-suppliers-staff-other-c.interest-taxPaid;
 const indirect=income+c.depreciation-(e.receivables-o.receivables)-(e.inventory-o.inventory)-(e.prepaid-o.prepaid)+(e.payables-o.payables)+(e.accruals-o.accruals)+(e.taxPayable-o.taxPayable);
 const investing=-c.equipment,financing=c.borrowing-c.principal-c.distribution;
 return{income,receipts,suppliers,staff,other,taxPaid,direct,indirect,investing,financing,net:direct+investing+financing,closing:o.cash+direct+investing+financing};
}
export const cashRecoveryCase=Object.freeze({opening:8000,floor:3000,base:[{label:'Week 1',receipts:4000,payments:9000},{label:'Week 2',receipts:6000,payments:11000},{label:'Week 3',receipts:14000,payments:6000},{label:'Week 4',receipts:8000,payments:7000}],revised:[{label:'Week 1',receipts:4000,payments:9000},{label:'Week 2',receipts:10000,payments:7000},{label:'Week 3',receipts:10000,payments:10000},{label:'Week 4',receipts:8000,payments:7000}]});
export function cashSchedule(events,opening=8000,floor=3000){let cash=opening,lowest=opening;const rows=events.map(x=>{const start=cash;cash+=x.receipts-x.payments;lowest=Math.min(lowest,cash);return{...x,opening:start,closing:cash,headroom:cash-floor};});return{rows,lowest,gap:Math.max(0,floor-lowest),closing:cash};}
