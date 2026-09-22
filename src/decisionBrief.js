const number = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const round = value => Math.round(number(value) * 10) / 10;

export function buildDecisionBrief({ input, result, analysis, industry, currency = "USD" }) {
  if (!result?.valid || !analysis?.valid) return { valid: false, headline: "Review the calculator inputs before generating a decision brief.", actions: [], watchlist: [], text: "" };
  const unit = industry?.unit || "sales";
  const actions = [];
  if (result.gap < 0) actions.push({ severity: "critical", title: "Close the delivery-capacity gap", detail: `The target needs ${round(Math.abs(result.gap))} more ${unit} than current monthly capacity. Add capacity, reduce delivery time, raise contribution, or lower the target before committing to the plan.` });
  if (result.marginPct < 20) actions.push({ severity: "critical", title: "Protect contribution before scaling", detail: `Contribution margin is ${round(result.marginPct)}%. Small price or cost changes can move break-even sharply at this level.` });
  if (number(input.conversionPct) < 20) actions.push({ severity: "watch", title: "Validate the inquiry-to-sale assumption", detail: `At ${round(input.conversionPct)}% conversion, the plan needs about ${Math.ceil(result.leads)} inquiries for ${Math.ceil(result.jobs)} ${unit}. Track the real conversion rate before increasing spend.` });
  const driver = analysis.drivers?.[0];
  if (driver) actions.push({ severity: driver.viable ? "watch" : "critical", title: `Stress-test ${driver.name.toLowerCase()}`, detail: `The standard sensitivity test moves required break-even revenue by ${Math.abs(round(driver.impact))}%. This is the largest modelled risk driver.` });
  if (result.gap >= 0 && result.marginPct >= 20) actions.push({ severity: "positive", title: "Convert the target into a weekly operating plan", detail: `The model has capacity for the target. Plan roughly ${round(result.jobs / 4.33)} ${unit} and ${round(result.leads / 4.33)} inquiries per week.` });
  const priority = { critical: 0, watch: 1, positive: 2 };
  const ordered = [...actions].sort((a, b) => priority[a.severity] - priority[b.severity]).slice(0, 4);
  const watchlist = [
    { label: "Contribution margin", value: `${round(result.marginPct)}%` },
    { label: "Monthly target", value: `${round(result.jobs)} ${unit}` },
    { label: "Required inquiries", value: `${round(result.leads)}` },
    { label: "Capacity cushion", value: `${round(result.gap)} ${unit}` },
    { label: "Margin of safety", value: `${round(analysis.marginSafetyPct)}%` },
  ];
  const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value || 0);
  const headline = result.gap < 0
    ? "The sales target is mathematically viable but exceeds current delivery capacity."
    : result.marginPct < 20
      ? "The plan can reach break-even, but its contribution cushion is thin."
      : "The current assumptions support a capacity-feasible break-even plan.";
  const text = [
    `MYBREAKEVEN EXECUTIVE DECISION BRIEF`,
    `${industry?.name || "Business"} · ${currency}`,
    "",
    headline,
    `Target revenue: ${money(result.revenue)}`,
    `Target volume: ${round(result.jobs)} ${unit}`,
    `Required inquiries: ${round(result.leads)}`,
    `Contribution margin: ${round(result.marginPct)}%`,
    `Capacity cushion: ${round(result.gap)} ${unit}`,
    "",
    "PRIORITY ACTIONS",
    ...ordered.map((action, index) => `${index + 1}. ${action.title}: ${action.detail}`),
    "",
    "Assumption-based planning output. Not tax, legal, accounting, investment or lending advice.",
  ].join("\n");
  return { valid: true, headline, actions: ordered, watchlist, text };
}
