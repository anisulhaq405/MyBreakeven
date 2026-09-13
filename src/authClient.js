import { createClient } from "@supabase/supabase-js";

const url = (import.meta.env.VITE_SUPABASE_URL || "https://wffkdujezksnzttxxqfs.supabase.co").trim();
const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Ot0yFXvL1EgrMo_tc12jcg_NZQVx_Eg").trim();

export const authConfigured = Boolean(
  url?.startsWith("https://") && publishableKey && publishableKey.length > 20,
);

export const supabase = authConfigured
  ? createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
