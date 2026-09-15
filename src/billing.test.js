import { describe, expect, it } from "vitest";
import { POLAR_CHECKOUT_URL } from "./billing";

describe("Polar billing", () => {
  it("uses the approved MyBreakeven checkout", () => {
    expect(POLAR_CHECKOUT_URL).toMatch(/^https:\\/\\/buy\\.polar\\.sh\\/polar_cl_/);
  });
});
