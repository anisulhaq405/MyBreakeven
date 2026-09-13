export const PLAN_LIMITS = Object.freeze({
  free: Object.freeze({ savedScenarios: 3, comparisons: 0, exports: false, costDrift: false }),
  pro: Object.freeze({ savedScenarios: 100, comparisons: 3, exports: true, costDrift: true }),
});

export const normalizePlan = (plan) => plan === "pro" ? "pro" : "free";
export const limitsFor = (plan) => PLAN_LIMITS[normalizePlan(plan)];

