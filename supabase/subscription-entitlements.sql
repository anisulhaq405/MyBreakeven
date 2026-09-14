-- Run once to prepare Free/Pro entitlements. No payment integration is included.
alter table public.profiles add column if not exists subscription_status text not null default 'inactive';
alter table public.profiles add column if not exists current_period_end timestamptz;
alter table public.profiles add column if not exists polar_customer_id text unique;
alter table public.profiles add column if not exists polar_subscription_id text unique;
insert into public.profiles (id, display_name)
select id, left(coalesce(raw_user_meta_data ->> 'display_name', ''), 80)
from auth.users
on conflict (id) do nothing;
do $$ begin
  alter table public.profiles add constraint profiles_subscription_status_check check (subscription_status in ('inactive','active','past_due','canceled'));
exception when duplicate_object then null; end $$;

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
