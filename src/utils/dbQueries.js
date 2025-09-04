import { supabase } from "../supabaseClient";

/**
 * Fetch all gestures from the database
 */
export async function fetchAllGestures() {
  try {
    console.log("Attempting to connect to Supabase...");
    console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT SET");
    
    const { data, error } = await supabase
      .from("gestures")
      .select("id, name, description, image_path, minor_major, canupgradetomajor, penaltytime, isstickpenalty");
    
    console.log("Supabase query result:", { data, error });
    
    if (error) {
      console.error("Supabase error:", error);
      return { data: null, error };
    }
    
    if (!data || data.length === 0) {
      console.error("No gestures found in database");
      return { data: null, error: { message: "No gestures found" } };
    }
    
    console.log(`Successfully fetched ${data.length} gestures`);
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error fetching gestures:", err);
    return { data: null, error: err };
  }
}

/**
 * Fetch leaderboard scores from the database
 */
export async function fetchLeaderboard() {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("id, player_name, score, created_at")
      .order("score", { ascending: false })
      .limit(10);
    
    if (error) {
      console.error("Error fetching leaderboard:", error);
      return { data: [], error };
    }
    
    return { data: data || [], error: null };
  } catch (err) {
    console.error("Unexpected error fetching leaderboard:", err);
    return { data: [], error: err };
  }
}

/**
 * Save a player's score to the leaderboard
 */
export async function savePlayerScore(playerName, score) {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .insert([
        {
          player_name: playerName.trim(),
          score: score
        }
      ])
      .select();
    
    if (error) {
      console.error("Error saving score:", error);
      return { data: null, error };
    }
    
    console.log("Score saved successfully:", data);
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error saving score:", err);
    return { data: null, error: err };
  }
}

/**
 * Check if a score qualifies as a high score
 */
export function checkIsHighScore(score, leaderboard) {
  return leaderboard.length < 10 || score > (leaderboard[leaderboard.length - 1]?.score || 0);
}
