import { describe, expect, it } from "vitest";
import { POLAR_CHECKOUT_URL, POLAR_CUSTOMER_PORTAL_URL } from "./billing";

describe("Polar billing", () => {
  it("uses the approved MyBreakeven checkout", () => {
    expect(POLAR_CHECKOUT_URL).toMatch(/^https:\/\/buy\.polar\.sh\/polar_cl_/);
  });

  it("uses the hosted MyBreakeven customer portal", () => {
    expect(POLAR_CUSTOMER_PORTAL_URL).toBe("https://polar.sh/mybreakeven/portal");
  });
});
