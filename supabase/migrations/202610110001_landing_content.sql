-- Run in your project's Supabase SQL Editor or through Supabase migrations.
-- Contains public marketing copy only; do not store student or payment records.
create table if not exists public.landing_modules (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 80),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  is_published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.landing_pages (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 80),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  is_published boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.landing_modules enable row level security;
alter table public.landing_pages enable row level security;

revoke all on public.landing_modules, public.landing_pages from public, anon, authenticated;
grant select on public.landing_modules, public.landing_pages to anon, authenticated;
grant select, insert, update, delete on public.landing_modules, public.landing_pages to service_role;

drop policy if exists "Published modules are readable" on public.landing_modules;
create policy "Published modules are readable"
  on public.landing_modules for select to anon, authenticated
  using (is_published = true);

drop policy if exists "Published pages are readable" on public.landing_pages;
create policy "Published pages are readable"
  on public.landing_pages for select to anon, authenticated
  using (is_published = true);

-- No public write policy: editors use the project's trusted Dashboard.
create or replace function public.set_landing_content_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists landing_modules_updated_at on public.landing_modules;
create trigger landing_modules_updated_at before update on public.landing_modules
  for each row execute function public.set_landing_content_updated_at();

drop trigger if exists landing_pages_updated_at on public.landing_pages;
create trigger landing_pages_updated_at before update on public.landing_pages
  for each row execute function public.set_landing_content_updated_at();

-- Approved marketing screenshots only. No public write policy is created.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('landing-media', 'landing-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
