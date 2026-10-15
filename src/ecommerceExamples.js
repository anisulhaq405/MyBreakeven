// Illustrative USD inputs only, not benchmarks. Keep the locked engine and industry defaults unchanged.
// Owner compensation is monthly in these examples; direct labor is other sale-dependent pay.
export const ecommerceExamples = [
  {
    id: 'jewellery', title: 'Handmade jewellery', unit: 'One finished piece sold as one order',
    note: 'Include components, bench time and protective packing. Owner making time counts towards capacity; owner compensation is entered once in monthly owner pay.',
    values: { price: 68, materialCost: 18, laborCost: 0, otherVariableCost: 7, acquisitionCost: 0, fixedCosts: 450, ownerPay: 2200, targetProfit: 300, paymentFeePct: 3, workers: 1, hoursPerWorker: 35, hoursPerJob: 1.25, utilizationPct: 70, conversionPct: 2 },
  },
  {
    id: 'ceramics', title: 'Small-batch ceramics', unit: 'One ceramic piece sold as one order',
    note: 'The product cost includes a firing allocation; other variable cost covers packing and shipping support. Count forming, decoration and packing time. This example deliberately exposes a productive-hours shortfall.',
    values: { price: 42, materialCost: 8, laborCost: 0, otherVariableCost: 7, acquisitionCost: 0, fixedCosts: 750, ownerPay: 2000, targetProfit: 250, paymentFeePct: 3, workers: 1, hoursPerWorker: 35, hoursPerJob: 1.5, utilizationPct: 70, conversionPct: 2 },
  },
  {
    id: 'clothing', title: 'Clothing & accessories', unit: 'One garment sold as one order',
    note: 'Allow for fabric, sale-dependent helper pay, packing/shipping support and allocated acquisition. Owner compensation remains in monthly owner pay. Compare a promotion before changing your selling price.',
    values: { price: 95, materialCost: 28, laborCost: 6, otherVariableCost: 8, acquisitionCost: 8, fixedCosts: 950, ownerPay: 2400, targetProfit: 400, paymentFeePct: 3, workers: 2, hoursPerWorker: 30, hoursPerJob: 0.75, utilizationPct: 70, conversionPct: 2 },
  },
  {
    id: 'art-prints', title: 'Art prints & paper goods', unit: 'One unframed print sold as one order',
    note: 'Product cost includes print production; other variable cost covers packing and shipping support. Repeat fulfilment time is per order; artwork development time must also be budgeted in your available hours and monthly commitments.',
    values: { price: 32, materialCost: 7, laborCost: 0, otherVariableCost: 4, acquisitionCost: 0, fixedCosts: 350, ownerPay: 1800, targetProfit: 250, paymentFeePct: 3, workers: 1, hoursPerWorker: 30, hoursPerJob: 0.25, utilizationPct: 65, conversionPct: 2 },
  },
];

export const ecommerceFieldHelp = {
  materialCost: 'Landed product cost or materials consumed per order. Include an appropriate batch or firing allocation once; do not enter the whole stock purchase against every order.',
  laborCost: 'Sale-dependent helper or production pay per order. If your own compensation is in monthly owner pay, do not charge it again here; still include your working time in delivery hours.',
  otherVariableCost: 'Packing, seller-funded shipping, flat transaction fees and unrecovered return costs averaged per order. Do not subtract the same refund or fee twice.',
  acquisitionCost: 'Acquisition spend allocated to the order mix you are modelling. Enter 0 for a no-paid-acquisition scenario; a first-customer CAC is not automatically a cost on every repeat order.',
  hoursPerJob: 'Total worker-hours for making, preparing and packing one order, including owner time. Allocate batch time consistently. Stock limits and kiln/carrier schedules need a separate check.',
  conversionPct: 'Use a consistent denominator: for example, comparable qualified visits that become orders. The visit requirement is an assumption-based target, not a traffic forecast.',
};
