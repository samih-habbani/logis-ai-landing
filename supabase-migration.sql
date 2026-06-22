-- Run this in your Supabase SQL Editor

create table if not exists ai_program_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Parent / Guardian
  parent_full_name text not null,
  parent_email     text not null,
  parent_phone     text not null,
  area_of_residence text,

  -- Children details as JSON array
  -- Each item: { ageKey, full_name, dob, grade, school }
  children jsonb not null default '[]',

  -- Seats per age group (max 7 each)
  seats_6_9   int not null default 0 check (seats_6_9   between 0 and 7),
  seats_10_12 int not null default 0 check (seats_10_12 between 0 and 7),
  seats_12_14 int not null default 0 check (seats_12_14 between 0 and 7),

  constraint at_least_one_seat check (seats_6_9 + seats_10_12 + seats_12_14 > 0)
);

alter table ai_program_registrations enable row level security;

create policy "Allow public registrations"
  on ai_program_registrations for insert to anon with check (true);

create policy "Allow authenticated read"
  on ai_program_registrations for select to authenticated using (true);
