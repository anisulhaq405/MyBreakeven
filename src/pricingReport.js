import { pricingSuggestions } from "./pricingSuggestions";
export function pricingReportRows(input, plannedUnits, currency) {
  const a = pricingSuggestions(input, plannedUnits);
  if (!a.valid) return [["Pricing plan", a.message]];
  const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  const rows = [["Expected monthly sales", a.plannedUnits], ["Whole monthly capacity", a.wholeCapacity], ["Pricing basis: monthly sales within capacity", a.feasibleUnits]];
  if (a.feasibleUnits === 0) rows.push(["Pricing plan", "No whole sales fit entered capacity. Review delivery inputs."]);
  else rows.push(["Minimum price: expenses and owner pay", money(a.feasibleRows[1].price)], ["Minimum price: including target profit", money(a.feasibleRows[2].price)], ["Monthly profit at current price and pricing basis", money(a.feasibleCurrentProfit)], ["Monthly profit at target price and pricing basis", money(a.feasibleRows[2].profit)]);
  rows.push(["Per-sale cost floor only", money(a.rows[0].price)], ["Pricing assumptions", "Cost-based minimums; customer demand must be confirmed. Cost floor excludes overhead, owner pay and target profit."]);
  return rows;
}
