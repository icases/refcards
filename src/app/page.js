
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
    <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-3 font-sporty">
      {/* Banner */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary-blue mb-3 font-sporty tracking-wider">
          REFCARDS
        </h1>
        <h2 className="text-lg text-accent-orange mb-2 font-bold px-2 font-sporty">
          SEÑALES DE ÁRBITRO DE HOCKEY SOBRE PATINES
        </h2>
        <p className="text-base text-gray-600 font-semibold font-sporty">
          🏒 Domina el Arte de Arbitrar 🏒
        </p>
      </header>

      {/* Leaderboard */}
      <section className="card-modern w-full max-w-sm rounded-xl p-4 mb-6">
        <h2 className="text-lg font-bold text-gold mb-4 text-center font-sporty scoreboard p-2 rounded">
          🏆 SALÓN DE LA FAMA 🏆
        </h2>
        {loading ? (
          <div className="text-center text-accent-orange py-6 font-sporty text-base">
            CARGANDO PUNTUACIONES...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-6 font-sporty">
            <div className="mb-2 text-accent-red font-bold text-sm">¡AÚN NO HAY PUNTUACIONES!</div>
            <div className="text-xs">🥅 ¡SÉ EL PRIMERO EN JUGAR! 🥅</div>
          </div>
        ) : (
          <div className="space-y-1 font-sporty text-sm">
            {leaderboard.map((player, idx) => (
              <div key={`${player.player_name}-${idx}`} className="flex justify-between items-center px-2 py-2 bg-bg-surface rounded border border-primary-blue hover:border-blue-500 transition-colors font-sporty">
                <span className="flex items-center">
                  <span className="text-gold font-bold mr-2 text-xs font-sporty">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`}
                  </span>
                  <span className="text-primary-blue font-semibold text-xs font-sporty">{player.player_name}</span>
                </span>
                <span className="text-accent-orange font-bold text-sm font-sporty">{player.score.toLocaleString()}</span>
              </div>
            ))}
            {/* Fill empty slots if less than 10 entries */}
            {Array.from({ length: 10 - leaderboard.length }, (_, i) => (
              <div key={`empty-${i}`} className="flex justify-between items-center px-2 py-2 bg-bg-card rounded border border-steel-gray font-sporty">
                <span className="flex items-center">
                  <span className="text-gray-400 mr-2 text-xs font-sporty">{leaderboard.length + i + 1}.</span>
                  <span className="text-gray-400 text-xs font-sporty">---</span>
                </span>
                <span className="text-gray-400 font-sporty text-xs">00000</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* New Game Button */}
      <button
        className="btn-sport py-3 px-8 rounded-full text-lg font-bold font-sporty shadow-lg transition-all transform hover:scale-105"
        onClick={() => router.push("/game")}
      >
        🏒 EMPEZAR JUEGO 🏒
      </button>
      
      <div className="mt-4 text-center text-gray-500 text-xs px-4 font-sporty">
        <p className="mb-1">Pon a prueba tu conocimiento de las señales del árbitro de hockey sobre patines</p>
        <p className="text-accent-orange">¡Prepárate para arbitrar como un profesional! 🥅</p>
      </div>
    </div>
  );
}
