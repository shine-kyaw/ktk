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

-- ── Publishing and complete product fields ─────────────────────────────────
-- Existing projects can run these safely: every column uses IF NOT EXISTS.

alter table product_categories add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table products add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table services add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table jobs add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table news add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table activities add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table bag_layers add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));
alter table singletons add column if not exists status text not null default 'draft' check (status in ('draft','published','archived'));

alter table products add column if not exists eyebrow text;
alter table products add column if not exists long_description text;
alter table products add column if not exists best_for text;
alter table products add column if not exists unique_value text;
alter table products add column if not exists printing text;
alter table products add column if not exists benefits jsonb not null default '[]';
alter table products add column if not exists gallery jsonb not null default '[]';
alter table products add column if not exists model text;
alter table products add column if not exists brand text;
alter table products add column if not exists quality_attributes jsonb not null default '[]';
alter table products add column if not exists variants jsonb not null default '[]';
alter table products add column if not exists color_options jsonb not null default '[]';
alter table products add column if not exists material_layers jsonb not null default '[]';
alter table products add column if not exists brochure_url text;

do $$
declare t text;
begin
  foreach t in array array['product_categories','products','services','jobs','news','activities','bag_layers','singletons']
  loop
    execute format('alter table %I add column if not exists created_at timestamptz not null default now();', t);
    execute format('alter table %I add column if not exists published_at timestamptz;', t);
    execute format('alter table %I add column if not exists updated_by text;', t);
  end loop;
end $$;

create table if not exists management (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  bio text,
  image text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  updated_by text
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  reference_number text,
  scope text,
  issued_on date,
  expires_on date,
  image text,
  document_url text,
  permission_confirmed boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  updated_by text
);

create table if not exists media_library (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  public_url text not null,
  storage_path text unique,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  alt_text text,
  caption text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text
);

create table if not exists audit_events (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  section text not null,
  record_id text,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

-- ── Row Level Security: public read, service-role write ──────────────────────

do $$
declare t text;
begin
  foreach t in array array[
    'product_categories','products','services','jobs',
    'news','activities','bag_layers','singletons','management','certificates'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "public read %1$s" on %1$I;', t);
    execute format(
      'create policy "public read %1$s" on %1$I for select to anon, authenticated using (status = ''published'');',
      t
    );
    -- No insert/update/delete policies: writes are done with the service-role
    -- key, which bypasses RLS. This keeps the public anon key read-only.
  end loop;
end $$;

alter table media_library enable row level security;
alter table audit_events enable row level security;

-- ── Media storage bucket (public read) ───────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('media', 'media', false)
on conflict (id) do nothing;

update storage.buckets set public = false where id = 'media';

drop policy if exists "public read media" on storage.objects;
-- Reads and writes use server-side routes after checking publication status.
