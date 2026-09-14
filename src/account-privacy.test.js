import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const ui = readFileSync(new URL("./AccountControls.jsx", import.meta.url), "utf8");
const sql = readFileSync(new URL("../supabase/account-privacy-controls.sql", import.meta.url), "utf8");

describe("account privacy controls", () => {
  it("supports profile, password and local data export", () => {
    expect(ui).toContain('from("profiles").update');
    expect(ui).toContain("signInWithPassword");
    expect(ui).toContain("mybreakeven-personal-data.json");
  });
  it("requires deliberate confirmation before permanent deletion", () => {
    expect(ui).toContain('deletePhrase !== "DELETE"');
    expect(ui).toContain('rpc("delete_my_account")');
  });
  it("limits account deletion to authenticated callers and their own identity", () => {
    expect(sql).toContain("requesting_user uuid := auth.uid()");
    expect(sql).toContain("where id = requesting_user");
    expect(sql).toContain("revoke all on function public.delete_my_account() from anon");
  });
});
