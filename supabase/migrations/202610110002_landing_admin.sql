-- Apply after 202610110001_landing_content.sql.
-- Only explicitly allowlisted Supabase Auth users can edit marketing content.
create schema if not exists landing_private;
revoke all on schema landing_private from public, anon, authenticated;

create table if not exists landing_private.editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table landing_private.editors enable row level security;
revoke all on landing_private.editors from public, anon, authenticated;

create or replace function public.is_landing_editor()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from landing_private.editors where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_landing_editor() from public, anon;
grant execute on function public.is_landing_editor() to authenticated;

revoke update, delete on public.landing_modules, public.landing_pages from authenticated;
grant insert on public.landing_modules, public.landing_pages to authenticated;
grant update (content, is_published, sort_order) on public.landing_modules, public.landing_pages to authenticated;

drop policy if exists "Editors read all modules" on public.landing_modules;
create policy "Editors read all modules" on public.landing_modules for select to authenticated
  using ((select public.is_landing_editor()));
drop policy if exists "Editors create modules" on public.landing_modules;
create policy "Editors create modules" on public.landing_modules for insert to authenticated
  with check ((select public.is_landing_editor()));
drop policy if exists "Editors update modules" on public.landing_modules;
create policy "Editors update modules" on public.landing_modules for update to authenticated
  using ((select public.is_landing_editor())) with check ((select public.is_landing_editor()));

drop policy if exists "Editors read all pages" on public.landing_pages;
create policy "Editors read all pages" on public.landing_pages for select to authenticated
  using ((select public.is_landing_editor()));
drop policy if exists "Editors create About" on public.landing_pages;
create policy "Editors create About" on public.landing_pages for insert to authenticated
  with check (slug = 'about' and is_published and (select public.is_landing_editor()));
drop policy if exists "Editors update About" on public.landing_pages;
create policy "Editors update About" on public.landing_pages for update to authenticated
  using (slug = 'about' and (select public.is_landing_editor()))
  with check (slug = 'about' and is_published and (select public.is_landing_editor()));

drop policy if exists "Editors upload landing screenshots" on storage.objects;
create policy "Editors upload landing screenshots" on storage.objects for insert to authenticated
  with check (bucket_id = 'landing-media' and (storage.foldername(name))[1] = 'modules' and (select public.is_landing_editor()));

-- No editor DELETE grant, no access to edit the allowlist and no Storage overwrite policy.
