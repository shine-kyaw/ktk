-- ───────────────────────────────────────────────────────────────────────────
-- KTK CMS schema
--
-- Run this once in the Supabase SQL editor (Dashboard -> SQL -> New query).
-- It creates the content tables, a key/value table for singletons, a public
-- media storage bucket, and Row Level Security policies so the public site can
-- READ everything with the anon key while WRITES require the service-role key
-- (used only by the /admin backend).
-- Safe to re-run: everything uses "if not exists" / "on conflict do nothing".
-- ───────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ── Collections ──────────────────────────────────────────────────────────────

create table if not exists product_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  tagline     text,
  blurb       text,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  category      text not null,
  summary       text,
  specs         jsonb not null default '[]',          -- [{label, value}]
  applications  jsonb not null default '[]',          -- [text]
  image         text,
  featured      boolean not null default false,
  sort_order    int not null default 0,
  updated_at    timestamptz not null default now()
);

create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  summary     text,
  points      jsonb not null default '[]',            -- [text]
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists jobs (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  department       text,
  location         text,
  type             text,
  summary          text,
  responsibilities jsonb not null default '[]',       -- [text]
  requirements     jsonb not null default '[]',       -- [text]
  sort_order       int not null default 0,
  updated_at       timestamptz not null default now()
);

create table if not exists news (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  date        text,
  category    text,
  title       text not null,
  excerpt     text,
  body        jsonb not null default '[]',            -- [paragraph]
  image       text,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists activities (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  category    text,
  title       text not null,
  date        text,
  detail      text,
  image       text,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists bag_layers (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,                   -- the layer id
  name        text not null,
  tag         text,
  description text,
  note        text,
  variant     text not null,                          -- print|lamination|woven|stitching|valve
  image       text,
  callout     text,                                   -- left|right
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);

-- ── Singletons (company facts, stats, anatomy meta, etc.) ────────────────────
-- One row per logical block, payload stored as JSON so the admin can edit
-- structured lists (stats, milestones, partners ...) without schema churn.

create table if not exists singletons (
  key         text primary key,                       -- company|stats|proof|...
  data        jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

-- ── Row Level Security: public read, service-role write ──────────────────────

do $$
declare t text;
begin
  foreach t in array array[
    'product_categories','products','services','jobs',
    'news','activities','bag_layers','singletons'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format(
      'create policy "public read %1$s" on %1$I for select to anon, authenticated using (true);',
      t
    );
    -- No insert/update/delete policies: writes are done with the service-role
    -- key, which bypasses RLS. This keeps the public anon key read-only.
  end loop;
end $$;

-- ── Media storage bucket (public read) ───────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');
-- Uploads/deletes use the service-role key (bypasses RLS) from /admin.
