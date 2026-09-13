import { describe, expect, it } from "vitest";
import { friendlyAuthError } from "./authSecurity";

describe("account security messaging", () => {
  it("does not expose raw network errors", () => expect(friendlyAuthError(new TypeError("Failed to fetch"))).toContain("secure account service"));
  it("makes common authentication failures actionable", () => {
    expect(friendlyAuthError({ message: "Invalid login credentials" })).toBe("The email or password is incorrect.");
    expect(friendlyAuthError({ message: "Email not confirmed" })).toContain("verify your email");
    expect(friendlyAuthError({ message: "Token has expired" })).toContain("expired");
  });
  it("does not echo unknown backend messages", () => expect(friendlyAuthError({ message: "internal database detail" })).toBe("Something went wrong. Please try again."));
});
