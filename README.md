# Lawrence Portfolio

## Run locally

```bash
npm install
npm run dev
```

## Realtime cross-device admin sync (Supabase)

Without Supabase config, admin saves are stored in `localStorage` (device-only).
With Supabase config, saves sync across devices in realtime.

### 1) Add environment variables

Create `.env` in project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PORTFOLIO_TABLE=portfolio_content
VITE_SUPABASE_PORTFOLIO_ROW_ID=main
```

`VITE_SUPABASE_PORTFOLIO_TABLE` and `VITE_SUPABASE_PORTFOLIO_ROW_ID` are optional.

### 2) Run this SQL in Supabase

```sql
create table if not exists public.portfolio_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Public read portfolio content" on public.portfolio_content;
create policy "Public read portfolio content"
on public.portfolio_content
for select
to anon
using (id = 'main');

drop policy if exists "Public write portfolio content" on public.portfolio_content;
create policy "Public write portfolio content"
on public.portfolio_content
for all
to anon
using (id = 'main')
with check (id = 'main');

insert into public.portfolio_content (id, content)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

alter publication supabase_realtime add table public.portfolio_content;
```

### 3) Restart app

After adding env vars, restart `npm run dev`.

Admin save now:
- writes to Supabase
- notifies other open devices/tabs in realtime
- keeps a local cache fallback

## Notes

- Current admin password is hardcoded in client code. For production security, move auth and writes to a protected backend or Supabase Auth + strict RLS.
