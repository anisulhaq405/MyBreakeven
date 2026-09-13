-- Run once after the account foundation to enable private saved scenarios.
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
create index if not exists saved_scenarios_user_updated_idx on public.saved_scenarios (user_id, updated_at desc);
alter table public.saved_scenarios enable row level security;
create policy "Users can read their own scenarios" on public.saved_scenarios for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can create their own scenarios" on public.saved_scenarios for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update their own scenarios" on public.saved_scenarios for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users can delete their own scenarios" on public.saved_scenarios for delete to authenticated using ((select auth.uid()) = user_id);
revoke all on table public.saved_scenarios from anon;
grant select, insert, update, delete on table public.saved_scenarios to authenticated;
