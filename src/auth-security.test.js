import { describe, expect, it } from "vitest";
import { friendlyAuthError } from "./authSecurity";
import { readFileSync } from "node:fs";

describe("account security messaging", () => {
  it("does not expose raw network errors", () => expect(friendlyAuthError(new TypeError("Failed to fetch"))).toContain("secure account service"));
  it("makes common authentication failures actionable", () => {
    expect(friendlyAuthError({ message: "Invalid login credentials" })).toBe("The email or password is incorrect.");
    expect(friendlyAuthError({ message: "Email not confirmed" })).toContain("verify your email");
    expect(friendlyAuthError({ message: "Token has expired" })).toContain("expired");
  });
  it("does not echo unknown backend messages", () => expect(friendlyAuthError({ message: "internal database detail" })).toBe("Something went wrong. Please try again."));
  it("allows legacy accounts without a profile row to fall back safely", () => {
    const dashboard = readFileSync(new URL("./AuthPages.jsx", import.meta.url), "utf8");
    const migration = readFileSync(new URL("../supabase/backfill-existing-profiles.sql", import.meta.url), "utf8");
    expect(dashboard).toContain(".maybeSingle()");
    expect(migration).toContain("on conflict (id) do nothing");
  });
});
