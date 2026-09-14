-- MyBreakeven self-service account deletion. Run once in Supabase SQL Editor.
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
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
