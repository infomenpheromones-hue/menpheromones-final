-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)
-- after the project is created. See STRUCTURE.md for the full setup walkthrough.

-- ============ PRODUCTS ============
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  ingredients text[] default '{}',
  created_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Public can view products"
  on products for select
  using (true);

create policy "Authenticated users can manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============ ORDERS ============
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  items jsonb not null,
  total numeric(10, 2) not null,
  payment_method text not null check (payment_method in ('cod', 'razorpay')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid')),
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered')),
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Anyone can place an order"
  on orders for insert
  with check (true);

create policy "Authenticated users can view orders"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update orders"
  on orders for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============ SITE SETTINGS (contact email + Razorpay keys) ============
-- key/value store so the admin panel can configure these without a redeploy.
-- razorpay_key_id is intentionally public-readable (it's Razorpay's public/
-- publishable key, needed client-side to open the checkout widget).
-- razorpay_key_secret and contact_email are admin-only.
create table if not exists site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Public can view public settings"
  on site_settings for select
  using (key = 'razorpay_key_id');

create policy "Authenticated users can manage settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into site_settings (key, value) values
  ('contact_email', 'admin@menpheromones.com'),
  ('razorpay_key_id', ''),
  ('razorpay_key_secret', '')
on conflict (key) do nothing;

-- ============ STORAGE (product images) ============
-- After running this file, also create a bucket named "products" via
-- Storage -> New bucket -> name "products" -> Public bucket: ON.
-- Then run the two policies below (Storage -> products -> Policies) or via SQL:
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "Authenticated users can update product images"
  on storage.objects for update
  using (bucket_id = 'products' and auth.role() = 'authenticated');
