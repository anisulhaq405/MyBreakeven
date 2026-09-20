import { withSupabase } from "jsr:@supabase/server@1";
import { webhooks } from "npm:@polar-sh/sdk@1.0.0-alpha.22/2026-10";

const supportedEvents = new Set([
  "subscription.created",
  "subscription.active",
  "subscription.updated",
  "subscription.uncanceled",
  "subscription.cycled",
  "subscription.canceled",
  "subscription.past_due",
  "subscription.revoked",
  "subscription.paused",
  "subscription.resumed",
]);

const proStatuses = new Set(["active", "trialing", "past_due", "canceled"]);
const freeStatuses = new Set(["inactive", "paused", "revoked", "unpaid", "incomplete_expired"]);

function firstString(...values: unknown[]) {
  return values.find((value) => typeof value === "string" && value.length > 0) as string | undefined;
}

function normalizedStatus(eventType: string, value: unknown) {
  const supplied = typeof value === "string" ? value.toLowerCase() : "";
  if (eventType === "subscription.revoked") return "revoked";
  if (eventType === "subscription.paused") return "paused";
  if (eventType === "subscription.past_due") return "past_due";
  if (eventType === "subscription.canceled") return "canceled";
  if (["subscription.created", "subscription.active", "subscription.uncanceled", "subscription.cycled", "subscription.resumed"].includes(eventType)) return supplied || "active";
  return supplied || "inactive";
}

function grantsPro(eventType: string, status: string) {
  if (eventType === "subscription.revoked" || eventType === "subscription.paused") return false;
  if (freeStatuses.has(status)) return false;
  return proStatuses.has(status) || eventType === "subscription.created" || eventType === "subscription.cycled" || eventType === "subscription.uncanceled" || eventType === "subscription.resumed";
}

function signedEventTime(header: string | null) {
  if (!header) return new Date().toISOString();
  const numeric = Number(header);
  const parsed = Number.isFinite(numeric) ? new Date(numeric * 1000) : new Date(header);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    if (req.method !== "POST") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    const secret = Deno.env.get("POLAR_WEBHOOK_SECRET");
    if (!secret) {
      console.error("POLAR_WEBHOOK_SECRET is missing");
      return Response.json({ message: "Webhook is not configured" }, { status: 500 });
    }

    const rawBody = await req.text();
    const webhookHeaders = {
      "webhook-id": req.headers.get("webhook-id") ?? "",
      "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
      "webhook-signature": req.headers.get("webhook-signature") ?? "",
    };

    let event: any;
    try {
      event = await webhooks.validateEvent(rawBody, webhookHeaders, secret);
    } catch (error) {
      if (error instanceof webhooks.PolarWebhookVerificationError) {
        console.error("Polar signature verification failed");
        return Response.json({ message: "Invalid signature" }, { status: 403 });
      }
      console.error("Polar webhook validation failed", error);
      return Response.json({ message: "Webhook validation failed" }, { status: 400 });
    }

    if (!supportedEvents.has(event.type)) {
      return Response.json({ received: true, ignored: true });
    }

    const subscription = event.data ?? {};
    const customer = subscription.customer ?? {};
    const email = firstString(customer.email, subscription.customer_email, subscription.customerEmail)?.toLowerCase();
    const externalUserId = firstString(customer.external_id, customer.externalId, subscription.external_customer_id, subscription.externalCustomerId);

    let userId = externalUserId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(externalUserId)
      ? externalUserId
      : undefined;
    if (!userId && email) {
      const { data, error } = await ctx.supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (error) {
        console.error("Could not resolve Polar customer", error);
        return Response.json({ message: "Customer lookup failed" }, { status: 500 });
      }
      userId = data.users.find((user: any) => user.email?.toLowerCase() === email)?.id;
    }

    if (!userId) {
      console.error("No MyBreakeven user matches the Polar customer");
      return Response.json({ message: "Customer not found" }, { status: 404 });
    }

    const status = normalizedStatus(event.type, subscription.status);
    const currentPeriodEnd = firstString(
      subscription.current_period_end,
      subscription.currentPeriodEnd,
      subscription.ends_at,
      subscription.endsAt,
    ) ?? null;

    const { data: outcome, error: updateError } = await ctx.supabaseAdmin.rpc("apply_polar_subscription_event", {
      p_webhook_id: webhookHeaders["webhook-id"],
      p_event_type: event.type,
      p_event_created_at: signedEventTime(webhookHeaders["webhook-timestamp"]),
      p_user_id: userId,
      p_plan: grantsPro(event.type, status) ? "pro" : "free",
      p_subscription_status: status === "incomplete_expired" ? "inactive" : status,
      p_current_period_end: currentPeriodEnd,
      p_polar_customer_id: firstString(customer.id, subscription.customer_id, subscription.customerId) ?? null,
      p_polar_subscription_id: firstString(subscription.id) ?? null,
    });

    if (updateError) {
      console.error("Profile entitlement update failed", updateError);
      return Response.json({ message: "Profile update failed" }, { status: 500 });
    }

    return Response.json({ received: true, outcome });
  }),
};
