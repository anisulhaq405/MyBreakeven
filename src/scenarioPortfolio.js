const finite = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const percentChange = (current, baseline) => baseline === 0 ? null : ((current - baseline) / Math.abs(baseline)) * 100;

export function summarizeScenarioPortfolio(items = []) {
  const viable = items.filter(item => item.result?.valid);
  if (!viable.length) return { count: items.length, viable: 0, averageRevenue: 0, averageScore: 0, bestScore: null, capacityRisks: 0 };
  return {
    count: items.length,
    viable: viable.length,
    averageRevenue: viable.reduce((sum, item) => sum + finite(item.result.revenue), 0) / viable.length,
    averageScore: viable.reduce((sum, item) => sum + finite(item.result.score), 0) / viable.length,
    bestScore: Math.max(...viable.map(item => finite(item.result.score))),
    capacityRisks: viable.filter(item => finite(item.result.jobs) > finite(item.result.capacity)).length,
  };
}

export function filterScenarioPortfolio(items = [], options = {}) {
  const query = String(options.query || "").trim().toLowerCase();
  const industry = options.industry || "all";
  const currency = options.currency || "all";
  const filtered = items.filter(item => {
    const matchesQuery = !query || String(item.name || "").toLowerCase().includes(query);
    return matchesQuery && (industry === "all" || item.industry_key === industry) && (currency === "all" || item.currency === currency);
  });
  const sort = options.sort || "updated";
  return [...filtered].sort((a, b) => {
    if (sort === "revenue-high") return finite(b.result?.revenue) - finite(a.result?.revenue);
    if (sort === "score-high") return finite(b.result?.score) - finite(a.result?.score);
    if (sort === "name") return String(a.name).localeCompare(String(b.name));
    return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
  });
}

export function compareScenarioCostDrift(items = []) {
  if (items.length < 2) return { valid: false, message: "Select at least two scenarios." };
  const baseline = items[0];
  const metrics = item => {
    const input = item.inputs || {};
    const paymentFee = finite(input.price) * finite(input.paymentFeePct) / 100;
    const variableCost = finite(input.materialCost) + finite(input.laborCost) + finite(input.otherVariableCost) + finite(input.acquisitionCost) + paymentFee;
    return {
      price: finite(input.price),
      variableCost,
      contribution: finite(item.result?.contribution),
      fixedNeed: finite(input.fixedCosts) + finite(input.ownerPay) + finite(input.targetProfit),
      revenue: finite(item.result?.revenue),
      units: finite(item.result?.jobs),
    };
  };
  const base = metrics(baseline);
  const rows = items.map(item => {
    const current = metrics(item);
    return {
      id: item.id,
      name: item.name,
      ...current,
      priceChangePct: percentChange(current.price, base.price),
      variableCostChangePct: percentChange(current.variableCost, base.variableCost),
      contributionChangePct: percentChange(current.contribution, base.contribution),
      fixedNeedChangePct: percentChange(current.fixedNeed, base.fixedNeed),
      revenueChangePct: percentChange(current.revenue, base.revenue),
      unitsChangePct: percentChange(current.units, base.units),
    };
  });
  return { valid: true, baselineId: baseline.id, baselineName: baseline.name, rows };
}
