import { describe, expect, it } from "vitest";
import { limitsFor, normalizePlan, PLAN_LIMITS } from "./entitlements";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../supabase/subscription-entitlements.sql", import.meta.url), "utf8");

describe("subscription entitlements", () => {
  it("defines the approved Free limits", () => expect(PLAN_LIMITS.free).toEqual({ savedScenarios: 3, comparisons: 0, exports: false, costDrift: false, advancedAnalysis: false, forecasts: false }));
  it("defines the approved Pro limits", () => expect(PLAN_LIMITS.pro).toEqual({ savedScenarios: 100, comparisons: 3, exports: true, costDrift: true, advancedAnalysis: true, forecasts: true }));
  it("fails unknown or missing plans closed to Free", () => {
    expect(normalizePlan()).toBe("free");
    expect(normalizePlan("enterprise")).toBe("free");
    expect(limitsFor("invalid")).toBe(PLAN_LIMITS.free);
  });
  it("enforces scenario limits in the database, not only the UI", () => {
    expect(migration).toContain("enforce_saved_scenario_limit");
    expect(migration).toContain("pg_advisory_xact_lock");
    expect(migration).toContain("then 100 else 3");
    expect(migration).toContain("PLAN_LIMIT_REACHED");
  });
  it("reserves billing identity fields for trusted backend updates", () => {
    expect(migration).toContain("polar_customer_id");
    expect(migration).toContain("polar_subscription_id");
    expect(migration).toContain("revoke update on table public.profiles from authenticated");
  });
});
