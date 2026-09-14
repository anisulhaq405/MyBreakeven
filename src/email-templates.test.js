import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = name => readFileSync(new URL(`../supabase/email-templates/${name}`, import.meta.url), "utf8");

describe("transactional email templates", () => {
  it("provides branded confirmation, recovery and security templates", () => {
    for (const file of ["confirmation.html", "recovery.html", "email-change.html", "password-changed.html"]) {
      const html = read(file);
      expect(html).toContain("MyBreakeven");
      expect(html).toContain('role="presentation"');
      expect(html).toContain("max-width:600px");
    }
  });
  it("uses Supabase confirmation links only where an action link is required", () => {
    for (const file of ["confirmation.html", "recovery.html", "email-change.html"]) expect(read(file)).toContain("{{ .ConfirmationURL }}");
    expect(read("password-changed.html")).not.toContain("{{ .ConfirmationURL }}");
  });
  it("keeps secrets out of repository configuration", () => {
    const guide = read("README.md");
    expect(guide).toContain("never commit it to GitHub");
    expect(guide).toContain("SMTP password: enter only in Supabase");
    expect(guide).not.toContain("sb_secret_");
  });
});
