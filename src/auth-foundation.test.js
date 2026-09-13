import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const authSource = readFileSync(new URL("./AuthPages.jsx", import.meta.url), "utf8");
const clientSource = readFileSync(new URL("./authClient.js", import.meta.url), "utf8");
const schema = readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");
const generator = readFileSync(new URL("../scripts/create-pages.mjs", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");

describe("secure account foundation", () => {
  it("keeps secrets out of the browser configuration contract", () => {
    expect(clientSource).toContain("VITE_SUPABASE_PUBLISHABLE_KEY");
    expect(clientSource).not.toMatch(/SERVICE_ROLE|service_role/);
  });

  it("enables persistent refreshed sessions and callback detection", () => {
    expect(clientSource).toContain("persistSession: true");
    expect(clientSource).toContain("autoRefreshToken: true");
    expect(clientSource).toContain("detectSessionInUrl: true");
  });

  it("implements signup, login, verification redirect, reset and logout", () => {
    for (const behavior of ["signUp", "signInWithPassword", "resetPasswordForEmail", "updateUser", "signOut", "emailRedirectTo"]) {
      expect(authSource).toContain(behavior);
    }
  });

  it("does not pretend accounts work before backend configuration", () => {
    expect(authSource).toContain("authConfigured");
    expect(authSource).toContain("Secure accounts are being connected");
  });

  it("lazy-loads account code away from public SEO pages", () => {
    expect(pages).toContain('lazy(() => import("./AuthPages")');
  });

  it("marks account and dashboard routes noindex", () => {
    expect(authSource).toContain('"noindex,nofollow"');
    for (const route of ["login", "signup", "forgot-password", "reset-password", "dashboard"]) {
      expect(generator).toMatch(new RegExp(`${route.replace("-", "\\-")}.*true`));
    }
  });

  it("enforces database row-level security", () => {
    expect(schema).toContain("enable row level security");
    expect(schema).toContain("auth.uid()");
    expect(schema).toContain("revoke all on table public.profiles from anon");
    expect(schema).toContain("revoke update on table public.profiles from authenticated");
    expect(schema).toContain("grant update (display_name, updated_at)");
    expect(schema).not.toContain("grant select, update on table public.profiles");
  });

  it("creates one profile owned by each verified auth identity", () => {
    expect(schema).toContain("references auth.users(id) on delete cascade");
    expect(schema).toContain("on_auth_user_created");
  });
});
