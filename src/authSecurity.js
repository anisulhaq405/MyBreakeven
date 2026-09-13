const NETWORK_MESSAGE = "We could not reach the secure account service. Check your connection and try again.";

export function friendlyAuthError(error, fallback = "Something went wrong. Please try again.") {
  const message = String(error?.message || error || "").toLowerCase();
  if (!message) return fallback;
  if (message.includes("failed to fetch") || message.includes("network") || message.includes("load failed")) return NETWORK_MESSAGE;
  if (message.includes("invalid login credentials")) return "The email or password is incorrect.";
  if (message.includes("email not confirmed")) return "Please verify your email before logging in.";
  if (message.includes("rate limit") || message.includes("too many requests")) return "Too many attempts. Please wait a few minutes and try again.";
  if (message.includes("expired") || (message.includes("invalid") && message.includes("token"))) return "This secure link has expired or is invalid. Request a new password-reset link.";
  return fallback;
}

export async function withTimeout(promise, milliseconds = 12000) {
  let timer;
  try {
    return await Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("network timeout")), milliseconds); })]);
  } finally {
    clearTimeout(timer);
  }
}
