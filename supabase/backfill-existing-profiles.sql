-- Run once if accounts existed before the profiles trigger was installed.
-- Safe to run more than once; existing profiles are not changed.
insert into public.profiles (id, display_name)
select id, left(coalesce(raw_user_meta_data ->> 'display_name', ''), 80)
from auth.users
on conflict (id) do nothing;
