"use client";

export default function ArcadeLeaderboard({ 
  leaderboard, 
  loading, 
  playerName, 
  setPlayerName, 
  score, 
  scoreSaved, 
  isHighScore, 
  onSaveScore 
}) {
  return (
    <div className="scoreboard w-full max-w-xs mb-4 p-4 rounded-lg">
  <h2 className="text-lg text-center text-gold mb-3 font-sporty">
        🏆 MEJORES PUNTUACIONES 🏆
      </h2>
      
      {loading ? (
  <div className="text-center text-accent-orange font-sporty text-sm">CARGANDO...</div>
      ) : (
  <div className="space-y-1 font-sporty text-sm">
          {Array.from({ length: 10 }, (_, i) => {
            // Create a combined list with current player's score inserted at correct position
            const allScores = [...leaderboard];
            if (!scoreSaved && isHighScore) {
              allScores.push({ player_name: playerName || "NEW_PLAYER", score: score, isNewPlayer: true });
              allScores.sort((a, b) => b.score - a.score);
            }
            
            const entry = allScores[i];
            const isCurrentScore = entry?.isNewPlayer && !scoreSaved;
            
            return (
              <div key={i} className={`flex justify-between text-sm font-sporty ${
                isCurrentScore 
                  ? 'text-black bg-gold px-2 animate-pulse font-bold' 
                  : 'text-primary-blue'
              }`}>
                <span className="text-gold font-sporty">
                  {(i + 1).toString().padStart(2, '0')}.
                </span>
                {isCurrentScore && !scoreSaved ? (
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase().slice(0, 10))}
                    placeholder="__________"
                    className="bg-white border-2 border-black text-black text-center font-bold w-20 focus:outline-none rounded text-xs"
                    maxLength={10}
                    autoFocus
                  />
                ) : (
                  <span className="text-primary-blue text-xs font-sporty">
                    {entry ? entry.player_name.slice(0, 8).toUpperCase().padEnd(8, '.') : '........'}
                  </span>
                )}
                <span className="text-accent-orange text-xs font-sporty">
                  {entry ? entry.score.toString().padStart(5, '0') : '00000'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
