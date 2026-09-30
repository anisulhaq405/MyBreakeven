export function capacityDecision(result) {
  const required = result.wholeJobs;
  const available = result.wholeCapacity;
  const fits = required <= available;
  const utilization = result.capacity > 0
    ? (result.jobs / result.capacity) * 100
    : result.jobs > 0 ? null : 0;
  const summary = !fits
    ? "The target exceeds delivery capacity. Change price, costs, capacity or the profit goal."
    : required === 0
      ? "No sales are required to cover the monthly costs and goals entered."
      : required === available
        ? "The target fits delivery capacity with no whole-unit cushion. Check demand and allow for disruption."
        : "The target fits delivery capacity under these assumptions. Check whether customer demand supports it.";
  return { fits, utilization, summary, wholeGap: available - required };
}
