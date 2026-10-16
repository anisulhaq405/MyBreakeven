// Explain existing engine results; do not invent a new price or forecast.
export function foodNextDecision(mode, result) {
 if (!result.valid) return null;
 if (mode === 'recipe') return result.contribution <= 0
  ? {title:'Review this price before scaling the batch',text:'The entered price leaves no positive contribution after the entered variable costs and fees. Review portions, usable yield and costs before testing another selling price.',href:'#pricing-calculator',label:'Review recipe costs and selling price'}
  : null;
 if (mode === 'period') return result.variance === null
  ? {title:'Build a comparable ingredient standard',text:'Actual usage alone cannot show a variance. Cost the recipes for the actual portions and menu mix sold in this same inventory period; do not use one recipe as the entire period standard.',href:'/calculators/recipe-cost-calculator/',label:'Build recipe ingredient costs'}
  : {title:result.variance>0?'Reconcile the usage above your standard':result.variance<0?'Reconcile the usage below your standard':'Keep checking the inventory basis',text:'Check inventory dates, counts, supplier credits and the actual sold mix before changing prices. This comparison does not identify the cause of a variance or include payroll.',href:'/blogs/restaurant-food-cost-percentage/',label:'Review the food-cost reconciliation guide'};
 if (result.contribution <= 0) return {title:'Restore positive contribution first',text:'Review the tested price, variable costs and channel fees. Selling more at a loss does not fund monthly commitments.',href:'#pricing-calculator',label:'Review price and per-order costs'};
 if (!result.plannedFits || !result.fits) return {title:'Review the capacity gap before increasing volume',text:'Compare required and expected whole units with deliverable capacity. Review worker-hours, the tested price or costs; if more capacity adds payroll or equipment, revise fixed commitments too.',href:'#pricing-calculator',label:'Review price, monthly scope and capacity'};
 if (result.monthlyResult < 0) return {title:'Review the monthly funding shortfall',text:'Capacity alone does not fund the plan. Expected sales at this contribution do not cover the stated monthly requirement. Test evidence-based volume, price or cost changes.',href:'/blogs/restaurant-budgeting/',label:'Compare the month with a restaurant budget'};
 return {title:'Validate this plan against actual orders',text:'The entered sales and capacity cover the stated requirement in this scenario. Compare actual paid orders, costs and available hours with your budget; this is not a sales forecast.',href:'/blogs/restaurant-budgeting/',label:'Track budget versus actual results'};
}
