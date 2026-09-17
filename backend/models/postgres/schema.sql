-- Discover Nashik — relational schema (Postgres / Supabase)
-- Structured, relationship-heavy data lives here. High-write, loosely
-- structured data (Lost & Found, Group Tracker) lives in MongoDB instead
-- (see backend/models/mongo/).

create extension if not exists "pgcrypto";

create table categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,      -- 'temples' | 'ghats' | 'food' | ...
  name          text not null
);

-- Table order matters here (Postgres resolves foreign keys at creation
-- time): admins and businesses are created before places, since places
-- references both.

create table admins (
  id             uuid primary key default gen_random_uuid(),
  email          text unique not null,
  password_hash  text not null,
  role           text not null default 'admin',
  created_at     timestamptz default now()
);

create table businesses (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  category_id    uuid references categories(id),
  description    text,
  contact_info   text not null,
  photos         text[],
  status         text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by_admin_id uuid references admins(id),
  created_at     timestamptz default now()
);

create table places (
  id             uuid primary key default gen_random_uuid(),
  category_id    uuid references categories(id),
  name           text not null,
  description    text,
  latitude       double precision not null,
  longitude      double precision not null,
  price_range    text,
  timings        text,
  facilities     text[],
  photos         text[],
  business_id    uuid references businesses(id),   -- null for admin-managed public places
  created_by_admin_id uuid references admins(id),
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- One application row per submission; a business can re-apply after rejection.
create table business_applications (
  id             uuid primary key default gen_random_uuid(),
  business_id    uuid references businesses(id) on delete cascade,
  submitted_data jsonb not null,
  status         text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by_admin_id uuid references admins(id),
  created_at     timestamptz default now(),
  reviewed_at    timestamptz
);

create table events (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  type           text not null,     -- 'bathing-date' | 'festival' | 'cultural' | 'info'
  description    text,
  starts_at      timestamptz not null,
  ends_at        timestamptz,
  location_place_id uuid references places(id),
  created_by_admin_id uuid references admins(id)
);

create table reviews (
  id             uuid primary key default gen_random_uuid(),
  place_id       uuid references places(id) on delete cascade,
  rating         int not null check (rating between 1 and 5),
  comment        text,
  author_display_name text,   -- pilgrims are anonymous; no account/user FK
  created_at     timestamptz default now()
);

-- Indexes for the two dominant query patterns: category browsing and
-- distance-sorted "near me" lookups.
create index idx_places_category on places(category_id);
create index idx_places_lat_lng on places(latitude, longitude);
create index idx_events_starts_at on events(starts_at);
create index idx_reviews_place on reviews(place_id);

-- Row Level Security (Supabase): public users get read-only access to
-- approved content; writes require the admin/business-owner role via
-- Supabase Auth JWT claims. Enable per-table, e.g.:
--
-- alter table places enable row level security;
-- create policy "public read" on places for select using (true);
-- create policy "admin write" on places for all using (auth.jwt() ->> 'role' = 'admin');
--
-- alter table businesses enable row level security;
-- create policy "public read approved" on businesses for select using (status = 'approved');
-- create policy "admin manage" on businesses for all using (auth.jwt() ->> 'role' = 'admin');
