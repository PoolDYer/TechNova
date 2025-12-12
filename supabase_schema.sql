
-- Create products table
create table products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  description text not null,
  specs text not null,
  image text not null
);

-- Enable Row Level Security (RLS)
alter table products enable row level security;

-- Create a policy to allow read access for everyone
create policy "Public products are viewable by everyone" on products
  for select using (true);
