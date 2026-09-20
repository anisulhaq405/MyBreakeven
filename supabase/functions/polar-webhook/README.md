# Polar webhook deployment

The dashboard editor must contain the exact contents of `index.ts`. Before deploying it, run
`supabase/subscription-entitlements.sql` once in the Supabase SQL editor. Keep JWT verification
disabled for this function because Polar authenticates requests with its signed webhook headers.

Access rules:

- `subscription.canceled` keeps Pro access through the paid period.
- `subscription.revoked` removes Pro access.
- `subscription.paused` removes Pro access; `subscription.resumed` restores it.
- `subscription.past_due` keeps temporary access until Polar revokes the subscription.
- Duplicate and older deliveries cannot overwrite newer account state.
