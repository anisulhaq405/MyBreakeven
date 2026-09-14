import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./sentry.js", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");

describe("privacy-safe Sentry monitoring", () => {
  it("runs only in production with PII and optional telemetry disabled", () => {
    expect(source).toContain("import.meta.env.PROD");
    expect(source).toContain("sendDefaultPii: false");
    expect(source).toContain("enableLogs: false");
    expect(source).toContain("tracesSampleRate: 0");
  });

  it("removes sensitive request and user fields", () => {
    for (const field of ["event.user", "event.request.cookies", "event.request.headers", "event.request.data", "event.request.query_string"]) {
      expect(source).toContain(`delete ${field}`);
    }
  });

  it("documents operational error monitoring", () => {
    expect(pages).toContain("We use Sentry");
    expect(pages).toContain("session replay, logs and performance tracing are disabled");
  });
});
