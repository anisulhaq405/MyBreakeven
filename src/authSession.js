// Reading the session hint must not download the account SDK for public visitors.
export const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "https://wffkdujezksnzttxxqfs.supabase.co").trim();
const projectRef = (() => {
  try { return new URL(supabaseUrl).hostname.split(".")[0]; }
  catch { return "unconfigured"; }
})();
export const authStorageKey = `sb-${projectRef}-auth-token`;

export function needsAccountClient(location, storage) {
  if (/^\/(login|signup|forgot-password|reset-password|dashboard)(\/|$)/.test(location.pathname)) return true;
  if (new URLSearchParams(location.search).has("code") || /(?:^#|&)access_token=/.test(location.hash)) return true;
  try {
    return Boolean((storage ?? window.localStorage).getItem(authStorageKey));
  } catch {
    // Let the SDK handle browsers where persistent storage is unavailable.
    return true;
  }
}
