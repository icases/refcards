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
    <div className="scoreboard w-full max-w-md mb-6 p-6 rounded-lg">
      <h2 className="text-2xl text-center text-neon-yellow mb-4 font-mono">
        🏆 HIGH SCORES 🏆
      </h2>
      
      {loading ? (
        <div className="text-center text-neon-orange font-mono">LOADING...</div>
      ) : (
        <div className="space-y-1 font-mono">
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
              <div key={i} className={`flex justify-between text-lg ${
                isCurrentScore 
                  ? 'text-black bg-neon px-2 animate-pulse font-bold' 
                  : 'text-white'
              }`}>
                <span className="text-neon-yellow">
                  {(i + 1).toString().padStart(2, '0')}.
                </span>
                {isCurrentScore && !scoreSaved ? (
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase().slice(0, 10))}
                    placeholder="__________"
                    className="bg-transparent border-none text-center font-bold w-24 focus:outline-none"
                    maxLength={10}
                    autoFocus
                  />
                ) : (
                  <span className="text-neon">
                    {entry ? entry.player_name.slice(0, 10).toUpperCase().padEnd(10, '.') : '..........'}
                  </span>
                )}
                <span className="text-neon-orange">
                  {entry ? entry.score.toString().padStart(6, '0') : '000000'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
