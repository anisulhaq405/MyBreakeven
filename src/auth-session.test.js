import { describe, expect, it } from "vitest";
import { authStorageKey, needsAccountClient } from "./authSession";

const location = (path = "/", search = "", hash = "") => ({ pathname: path, search, hash });
const emptyStorage = { getItem: () => null };

describe("account loading on public pages", () => {
  it("does not load the SDK for visitors without a saved session", () => {
    for (const path of ["/", "/blogs/", "/pricing/", "/blogs/ecommerce-startup-cost/"]) {
      expect(needsAccountClient(location(path), emptyStorage)).toBe(false);
    }
  });
  it("loads the SDK to validate and refresh an existing session", () => {
    expect(needsAccountClient(location(), { getItem: key => key === authStorageKey ? "saved session" : null })).toBe(true);
  });
  it("initializes login, recovery, dashboard and callback flows", () => {
    for (const path of ["/login/", "/signup/", "/forgot-password/", "/reset-password/", "/dashboard/"]) {
      expect(needsAccountClient(location(path), emptyStorage)).toBe(true);
    }
    expect(needsAccountClient(location("/", "?code=verification-code"), emptyStorage)).toBe(true);
    expect(needsAccountClient(location("/", "", "#access_token=callback-token"), emptyStorage)).toBe(true);
  });
  it("falls back to the SDK when the browser denies storage access", () => {
    expect(needsAccountClient(location(), { getItem: () => { throw new Error("SecurityError"); } })).toBe(true);
  });
});
