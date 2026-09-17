# Discover Nashik — MVP Scaffold

This is a working MVP scaffold for **Discover Nashik — Digital Companion
for Every Pilgrim** (Kumbh Mela 2027), covering the architecture in the
project plan: public pilgrim features (no login), a Business
application/approval flow, and an Admin portal, split into a Next.js
frontend and an Express backend.

## Structure

```
discover-nashik/
├── frontend/   Next.js 14 (App Router) + TypeScript + Tailwind
└── backend/    Node.js + Express, PostgreSQL (Supabase) + MongoDB
```

## Why two databases

- **PostgreSQL (Supabase)** — structured, relationship-heavy data:
  places, categories, businesses, business applications, admins,
  events, reviews. Supabase Row Level Security enforces public-read /
  admin-write rules (see `backend/models/postgres/schema.sql`).
- **MongoDB** — high-write, loosely structured data: Lost & Found
  reports, groups, group members, group messages, live location
  pings. No RLS or relational joins needed here; write throughput and
  flexible fields (e.g. optional photos) matter more.

## Multilingual system (English / Hindi / Marathi)

`frontend/lib/i18n/i18n.tsx` is the single i18n system for the app:

- `I18nProvider` is mounted **once**, in `app/layout.tsx`, above the
  router — so it never remounts on navigation.
- The selected language is stored in `sessionStorage` (per-tab,
  cleared when the browser/tab closes) — **not** `localStorage` — so
  a fresh app launch always starts in English, but the selection
  survives navigation within the same session.
- `useTranslation()` / `t("namespace.key")` is used throughout; every
  key has English, Hindi, and Marathi values in
  `frontend/lib/i18n/locales/{en,hi,mr}.json`.

## Getting started

**Frontend**
```
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

**Backend**
```
cd backend
npm install
cp .env.example .env
# run backend/models/postgres/schema.sql against your Postgres/Supabase instance
npm run dev
```

## What's implemented vs. stubbed

Implemented: full page/route structure, working i18n system, REST API
routes/controllers for places, search, nearby, events, Lost & Found,
Group Tracker, Business application/approval, Admin auth + analytics,
and an AI chat endpoint.

Stubbed (marked with comments in the code, ready for you to fill in):
- Real Leaflet marker data (currently mock places)
- Group Tracker realtime layer (Socket.IO wiring — REST endpoints are real)
- AI service's actual model call (currently returns a placeholder reply)
- Supabase Auth wiring for Admin login (JWT-based auth.js is real, but
  password hashing/admin seeding needs to be set up)
- Image/photo upload handling

This is a foundation to build on, not a finished product — treat it as
the scaffold your team fills in phase by phase per the plan (Places →
Map → Lost & Found → Group Tracker → Business → Admin → AI → polish).
