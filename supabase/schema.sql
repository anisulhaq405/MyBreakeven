-- MyBreakeven account foundation. Run in the Supabase SQL editor once.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  plan text not null default 'free' check (plan in ('free', 'pro')),
  subscription_status text not null default 'inactive' check (subscription_status in ('inactive','active','past_due','canceled')),
  current_period_end timestamptz,
  polar_customer_id text unique,
  polar_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own display name"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 80));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users for each row execute procedure public.handle_new_user();

revoke all on table public.profiles from anon;
revoke update on table public.profiles from authenticated;
grant select on table public.profiles to authenticated;
grant update (display_name, updated_at) on table public.profiles to authenticated;

create table if not exists public.saved_scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  industry_key text not null check (industry_key in ('cleaning','landscaping','photography','agency','detailing','ecommerce','restaurant','salon')),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  inputs jsonb not null check (jsonb_typeof(inputs) = 'object'),
  engine_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists saved_scenarios_user_updated_idx
on public.saved_scenarios (user_id, updated_at desc);

alter table public.saved_scenarios enable row level security;

create policy "Users can read their own scenarios" on public.saved_scenarios
for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can create their own scenarios" on public.saved_scenarios
for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update their own scenarios" on public.saved_scenarios
for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete their own scenarios" on public.saved_scenarios
for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on table public.saved_scenarios from anon;
grant select, insert, update, delete on table public.saved_scenarios to authenticated;

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

create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = '' as $$
declare requesting_user uuid := auth.uid();
begin
  if requesting_user is null then raise exception 'AUTHENTICATION_REQUIRED' using errcode = 'P0001'; end if;
  delete from auth.users where id = requesting_user;
  if not found then raise exception 'ACCOUNT_NOT_FOUND' using errcode = 'P0001'; end if;
end;
$$;
revoke all on function public.delete_my_account() from public;
revoke all on function public.delete_my_account() from anon;
grant execute on function public.delete_my_account() to authenticated;
