create extension if not exists pgcrypto;

create table if not exists public.funnel_clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  business_name text not null,
  notification_email text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.funnel_inquiries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.funnel_clients(id) on delete cascade,
  funnel_type text not null default 'general',
  full_name text not null,
  email text,
  phone text not null,
  service text,
  message text,
  status text default 'new',
  details jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.funnel_clients enable row level security;
alter table public.funnel_inquiries enable row level security;

insert into public.funnel_clients (
  slug,
  business_name,
  notification_email,
  is_active
)
values (
  'car-rental-demo',
  'Hoppins Car Rental',
  'replace-with-owner-email',
  true
)
on conflict (slug) do update
set
  business_name = excluded.business_name,
  notification_email = public.funnel_clients.notification_email,
  is_active = excluded.is_active;
