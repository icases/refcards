
-- Create leaderboard table for tracking player scores
create table if not exists leaderboard (
	id uuid primary key default gen_random_uuid(),
	player_name text not null,
	score integer not null,
	created_at timestamp with time zone default timezone('utc'::text, now())
);
