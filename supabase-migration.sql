-- Run this in your Supabase SQL Editor

create table if not exists ai_program_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Parent / Guardian
  parent_full_name text not null,
  parent_email     text not null,
  parent_phone     text not null,
  area_of_residence text,

  -- Primary child
  child_full_name text not null,
  child_dob       date not null,
  child_grade     text,
  child_school    text,

  -- Seats per age group
  seats_6_9   int not null default 0 check (seats_6_9   >= 0),
  seats_10_12 int not null default 0 check (seats_10_12 >= 0),
  seats_12_14 int not null default 0 check (seats_12_14 >= 0),

  constraint at_least_one_seat check (seats_6_9 + seats_10_12 + seats_12_14 > 0)
);

alter table ai_program_registrations enable row level security;

create policy "Allow public registrations"
  on ai_program_registrations for insert to anon with check (true);

create policy "Allow authenticated read"
  on ai_program_registrations for select to authenticated using (true);
