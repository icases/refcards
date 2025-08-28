
-- Create gestures table for referee signals
create table if not exists gestures (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	description text not null,
	image_path text, -- path to image in Supabase Storage bucket
	created_at timestamp with time zone default timezone('utc'::text, now())
);
