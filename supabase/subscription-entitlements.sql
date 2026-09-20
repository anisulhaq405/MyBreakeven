-- Run once to prepare Free/Pro entitlements managed by the trusted Polar webhook.
alter table public.profiles add column if not exists subscription_status text not null default 'inactive';
alter table public.profiles add column if not exists current_period_end timestamptz;
alter table public.profiles add column if not exists polar_customer_id text unique;
alter table public.profiles add column if not exists polar_subscription_id text unique;
alter table public.profiles add column if not exists polar_event_created_at timestamptz;
insert into public.profiles (id, display_name)
select id, left(coalesce(raw_user_meta_data ->> 'display_name', ''), 80)
from auth.users
on conflict (id) do nothing;
alter table public.profiles drop constraint if exists profiles_subscription_status_check;
alter table public.profiles add constraint profiles_subscription_status_check
check (subscription_status in ('inactive','active','trialing','past_due','canceled','paused','revoked','unpaid'));

create table if not exists public.polar_webhook_receipts (
  webhook_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now()
);
alter table public.polar_webhook_receipts enable row level security;
revoke all on table public.polar_webhook_receipts from anon, authenticated;

-- Applies each signed Polar event once and ignores older deliveries that arrive late.
create or replace function public.apply_polar_subscription_event(
  p_webhook_id text,
  p_event_type text,
  p_event_created_at timestamptz,
  p_user_id uuid,
  p_plan text,
  p_subscription_status text,
  p_current_period_end timestamptz,
  p_polar_customer_id text,
  p_polar_subscription_id text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  existing_event_at timestamptz;
begin
  if p_webhook_id is null or p_webhook_id = '' or p_user_id is null then
    raise exception 'INVALID_POLAR_EVENT' using errcode = 'P0001';
  end if;

  insert into public.polar_webhook_receipts (webhook_id, event_type)
  values (p_webhook_id, p_event_type)
  on conflict (webhook_id) do nothing;
  if not found then return 'duplicate'; end if;

  select polar_event_created_at into existing_event_at
  from public.profiles where id = p_user_id for update;

  if existing_event_at is not null and p_event_created_at < existing_event_at then
    return 'stale';
  end if;

  update public.profiles set
    plan = p_plan,
    subscription_status = p_subscription_status,
    current_period_end = p_current_period_end,
    polar_customer_id = coalesce(p_polar_customer_id, polar_customer_id),
    polar_subscription_id = coalesce(p_polar_subscription_id, polar_subscription_id),
    polar_event_created_at = p_event_created_at,
    updated_at = now()
  where id = p_user_id;

  if not found then raise exception 'PROFILE_NOT_FOUND' using errcode = 'P0001'; end if;
  return 'applied';
end;
$$;
revoke all on function public.apply_polar_subscription_event(text,text,timestamptz,uuid,text,text,timestamptz,text,text) from public, anon, authenticated;
grant execute on function public.apply_polar_subscription_event(text,text,timestamptz,uuid,text,text,timestamptz,text,text) to service_role;

create or replace function public.enforce_saved_scenario_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
declare account_plan text; scenario_count integer; plan_limit integer;
begin
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text, 0));
  select plan into account_plan from public.profiles where id = new.user_id;
  plan_limit := case when account_plan = 'pro' then 100 else 3 end;
  select count(*) into scenario_count from public.saved_scenarios where user_id = new.user_id;
  if scenario_count >= plan_limit then raise exception 'PLAN_LIMIT_REACHED' using errcode = 'P0001'; end if;
  return new;
end;
$$;
drop trigger if exists enforce_saved_scenario_limit on public.saved_scenarios;
create trigger enforce_saved_scenario_limit before insert on public.saved_scenarios
for each row execute procedure public.enforce_saved_scenario_limit();

revoke update on table public.profiles from authenticated;
grant update (display_name, updated_at) on table public.profiles to authenticated;
