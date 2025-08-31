-- Enable Row Level Security on all tables
ALTER TABLE gestures ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous read access" ON gestures;
DROP POLICY IF EXISTS "Allow anonymous read access" ON leaderboard;
DROP POLICY IF EXISTS "Allow anonymous insert access" ON leaderboard;
DROP POLICY IF EXISTS "Deny anonymous write access" ON gestures;

-- Create read-only policy for gestures table (anonymous users can read)
CREATE POLICY "Allow anonymous read access" ON gestures
    FOR SELECT USING (true);

-- Create read-only policy for leaderboard table (anonymous users can read)
CREATE POLICY "Allow anonymous read access" ON leaderboard
    FOR SELECT USING (true);

-- Allow anonymous users to insert scores into leaderboard (for game functionality)
-- This is necessary for the game to save scores
CREATE POLICY "Allow anonymous insert scores" ON leaderboard
    FOR INSERT WITH CHECK (true);

-- Deny all other operations (UPDATE, DELETE) for anonymous users on both tables
-- Only authenticated users can modify data
CREATE POLICY "Deny anonymous write access" ON gestures
    FOR ALL USING (auth.role() != 'anon');

CREATE POLICY "Deny anonymous update/delete access" ON leaderboard
    FOR UPDATE USING (auth.role() != 'anon');

CREATE POLICY "Deny anonymous delete access" ON leaderboard
    FOR DELETE USING (auth.role() != 'anon');

-- Grant necessary permissions to anonymous role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON gestures TO anon;
GRANT SELECT ON leaderboard TO anon;
GRANT INSERT ON leaderboard TO anon;