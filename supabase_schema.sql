-- Create the products table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  image text not null,
  category text not null,
  description text,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime for the products table
alter publication supabase_realtime add table products;

-- Create notifications table (for the Admin Dashboard)
create table notifications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  message text not null,
  type text check (type in ('info', 'success', 'warning', 'error')) default 'info',
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime for notifications
alter publication supabase_realtime add table notifications;

-- (Optional) Row Level Security (RLS)
-- For now, we'll allow all operations, but in production you should restrict this
alter table products enable row level security;
create policy "Allow public read access" on products for select using (true);
create policy "Allow admin full access" on products for all using (true);

alter table notifications enable row level security;
create policy "Allow public access" on notifications for all using (true);

-- Create orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_email text not null,
  total_amount numeric not null,
  status text check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) default 'pending',
  items jsonb not null, -- Store list of products
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime for orders
alter publication supabase_realtime add table orders;

-- Enable RLS for orders
alter table orders enable row level security;
create policy "Allow public access" on orders for all using (true);
