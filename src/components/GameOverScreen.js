"use client";

export default function GameOverScreen({
  score,
  streak,
  timeBonus,
  showGameOver,
  leaderboard,
  loading,
  playerName,
  setPlayerName,
  scoreSaved,
  isHighScore,
  onSaveScore,
  onPlayAgain,
  onGoHome
}) {
  if (!showGameOver) return null;

  return (
  <div className="fixed inset-0 bg-ice-blue bg-opacity-90 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
  <h1 className="text-6xl text-accent-red mb-4 font-bold font-sporty">FIN DEL JUEGO</h1>
        
        <div className="text-2xl text-gold mb-6 font-sporty">
          <div className="mb-2">PUNTUACIÓN: {score.toLocaleString()}</div>
          <div className="mb-2">MEJOR RACHA: {streak}</div>
          {timeBonus > 0 && <div className="mb-2">BONUS DE TIEMPO: +{timeBonus.toLocaleString()}</div>}
        </div>
        
        {isHighScore && (
          <div className="text-3xl text-primary-blue mb-4 animate-pulse font-sporty">
            ¡NUEVO RÉCORD!
          </div>
        )}
      </div>

      {/* Arcade Leaderboard Component would go here */}
      
      <div className="flex space-x-4">
        {isHighScore && !scoreSaved && (
          <button
            onClick={onSaveScore}
            className="btn-primary px-6 py-3 text-xl font-bold font-sporty"
          >
            GUARDAR PUNTUACIÓN
          </button>
        )}
        
        {(!isHighScore || scoreSaved) && (
          <>
            <button
              onClick={onPlayAgain}
              className="btn-primary px-6 py-3 text-xl font-bold font-sporty"
            >
              JUGAR DE NUEVO
            </button>
            
            <button
              onClick={onGoHome}
              className="btn-secondary px-6 py-3 text-xl font-bold font-sporty"
            >
              INICIO
            </button>
          </>
        )}
      </div>
    </div>
  );
}
