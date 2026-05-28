create extension if not exists pgcrypto;

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  type text not null,
  transmission text not null,
  fuel_type text,
  seats int,
  doors int,
  price_per_day numeric not null,
  image_url text,
  gallery text[],
  overview text,
  features text[],
  requirements text[],
  is_available boolean default true,
  created_at timestamp default now()
);

create table if not exists public.booking_inquiries (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references public.cars(id),
  full_name text not null,
  email text not null,
  phone text not null,
  pickup_date date not null,
  return_date date not null,
  pickup_location text not null,
  rental_option text not null,
  message text,
  status text default 'new',
  created_at timestamp default now()
);

alter table public.cars enable row level security;
alter table public.booking_inquiries enable row level security;

drop policy if exists "Public read available cars" on public.cars;
create policy "Public read available cars" on public.cars for select using (is_available = true);

drop policy if exists "Public insert booking inquiries" on public.booking_inquiries;
create policy "Public insert booking inquiries" on public.booking_inquiries for insert with check (true);

insert into public.cars
(name, slug, type, transmission, fuel_type, seats, doors, price_per_day, image_url, gallery, overview, features, requirements, is_available)
values
('Toyota Vios', 'toyota-vios', 'Sedan', 'Automatic', 'Gasoline', 5, 4, 1500, 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80'], 'Fuel-efficient city sedan perfect for daily trips.', array['Bluetooth Audio','Airbags','Rear Camera'], array['Valid ID','Driver License','Security Deposit'], true),
('Honda City', 'honda-city', 'Sedan', 'Automatic', 'Gasoline', 5, 4, 1700, 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80'], 'Comfortable and stylish compact sedan for business or leisure.', array['Apple CarPlay','USB Charging','ABS'], array['Valid ID','Driver License','Security Deposit'], true),
('Toyota Rush', 'toyota-rush', 'SUV', 'Automatic', 'Gasoline', 7, 5, 2200, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'], 'Spacious crossover great for family trips.', array['7 Seats','Rear Aircon','High Ground Clearance'], array['Valid ID','Driver License','Security Deposit'], true),
('Mitsubishi Xpander', 'mitsubishi-xpander', 'Van', 'Automatic', 'Gasoline', 7, 5, 2400, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80'], 'Versatile MPV with room for passengers and luggage.', array['Foldable Seats','Backup Sensors','Touchscreen'], array['Valid ID','Driver License','Security Deposit'], true),
('Toyota Hiace', 'toyota-hiace', 'Van', 'Manual', 'Diesel', 12, 4, 2800, 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1200&q=80'], 'Reliable transport van ideal for group travel.', array['Large Cabin','Cold AC','Extra Luggage Space'], array['Valid ID','Driver License','Security Deposit'], true),
('Toyota Fortuner', 'toyota-fortuner', 'SUV', 'Automatic', 'Diesel', 7, 5, 3500, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'], 'Premium SUV for road trips and executive rides.', array['Leather Seats','Cruise Control','Advanced Safety'], array['Valid ID','Driver License','Security Deposit'], true)
on conflict (slug) do nothing;

