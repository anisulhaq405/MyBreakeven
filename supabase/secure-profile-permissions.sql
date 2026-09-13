-- Run once if the initial account schema was installed before this hardening update.
-- Users may edit their display name, but can never grant themselves a paid plan.
revoke update on table public.profiles from authenticated;
grant update (display_name, updated_at) on table public.profiles to authenticated;
