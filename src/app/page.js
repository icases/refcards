
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../utils/dbQueries";

export default function Home() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLeaderboard() {
    try {
      const { data, error } = await fetchLeaderboard();
      
      if (error) {
        console.error("Error loading leaderboard:", error);
        return;
      }
      
      setLeaderboard(data);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <div className="min-h-screen hockey-bg flex flex-col items-center justify-center p-6 font-sans">
      {/* Banner */}
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-neon mb-4 font-mono tracking-wider">
          REFCARDS
        </h1>
        <h2 className="text-2xl text-neon-orange mb-2 font-bold">
          ROLLER HOCKEY REFEREE GESTURES
        </h2>
        <p className="text-lg text-gray-300 font-semibold">
          🏒 Master the Art of Officiating 🏒
        </p>
      </header>

      {/* Leaderboard */}
      <section className="card-arcade w-full max-w-md rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-neon-yellow mb-6 text-center font-mono scoreboard p-3 rounded">
          🏆 HALL OF FAME 🏆
        </h2>
        
        {loading ? (
          <div className="text-center text-neon-orange py-8 font-mono text-lg">
            LOADING SCORES...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <div className="mb-2 text-neon-pink font-bold">NO SCORES YET!</div>
            <div className="text-sm">🥅 BE THE FIRST TO PLAY! 🥅</div>
          </div>
        ) : (
          <div className="space-y-2 font-mono">
            {leaderboard.map((player, idx) => (
              <div key={`${player.player_name}-${idx}`} className="flex justify-between items-center px-3 py-2 bg-gray-900 rounded border border-gray-700 hover:border-orange-500 transition-colors">
                <span className="flex items-center">
                  <span className="text-neon-yellow font-bold mr-3">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`}
                  </span>
                  <span className="text-white font-semibold">{player.player_name}</span>
                </span>
                <span className="text-neon font-bold text-lg">{player.score.toLocaleString()}</span>
              </div>
            ))}
            {/* Fill empty slots if less than 10 entries */}
            {Array.from({ length: 10 - leaderboard.length }, (_, i) => (
              <div key={`empty-${i}`} className="flex justify-between items-center px-3 py-2 bg-gray-800 rounded border border-gray-600">
                <span className="flex items-center">
                  <span className="text-gray-500 mr-3">{leaderboard.length + i + 1}.</span>
                  <span className="text-gray-500">---</span>
                </span>
                <span className="text-gray-500 font-mono">000000</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* New Game Button */}
      <button
        className="btn-sport py-4 px-12 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-105"
        onClick={() => router.push("/game")}
      >
        🏒 START GAME 🏒
      </button>
      
      <div className="mt-6 text-center text-gray-400 text-sm">
        <p className="mb-1">Test your knowledge of roller hockey referee signals</p>
        <p className="text-neon-orange">Get ready to officiate like a pro! 🥅</p>
      </div>
    </div>
  );
}
