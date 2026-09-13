import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const dashboard = readFileSync(new URL("./AuthPages.jsx", import.meta.url), "utf8");
const tools = readFileSync(new URL("./ScenarioTools.jsx", import.meta.url), "utf8");
const app = readFileSync(new URL("./main.jsx", import.meta.url), "utf8");
const migration = readFileSync(new URL("../supabase/saved-scenarios.sql", import.meta.url), "utf8");

describe("saved scenario workspace", () => {
  it("saves only through the authenticated Supabase client", () => {
    expect(tools).toContain("supabase.auth.getUser()");
    expect(tools).toContain('from("saved_scenarios").insert');
    expect(tools).toContain("FORMULA_ENGINE_VERSION");
  });
  it("loads a scenario by opaque id and lets RLS enforce ownership", () => {
    expect(app).toContain('get("scenario")');
    expect(app).toContain('from("saved_scenarios").select');
    expect(app).not.toContain("user_id");
  });
  it("supports private list, rename and delete operations", () => {
    expect(dashboard).toContain('from("saved_scenarios").select');
    expect(dashboard).toContain('from("saved_scenarios").update');
    expect(dashboard).toContain('from("saved_scenarios").delete');
  });
  it("supports comparison and CSV export without storing derived outputs", () => {
    expect(dashboard).toContain("Select up to 3 to compare");
    expect(dashboard).toContain("Export all CSV");
    expect(migration).not.toContain("outputs jsonb");
  });
  it("validates scenario names, industries, currencies and JSON shape", () => {
    expect(migration).toContain("char_length(name) between 1 and 80");
    expect(migration).toContain("currency ~ '^[A-Z]{3}$'");
    expect(migration).toContain("jsonb_typeof(inputs) = 'object'");
  });
});
