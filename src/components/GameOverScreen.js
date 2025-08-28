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
    <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-6xl text-red-500 mb-4 font-bold">GAME OVER</h1>
        
        <div className="text-2xl text-yellow-400 mb-6">
          <div className="mb-2">SCORE: {score.toLocaleString()}</div>
          <div className="mb-2">BEST STREAK: {streak}</div>
          {timeBonus > 0 && <div className="mb-2">TIME BONUS: +{timeBonus.toLocaleString()}</div>}
        </div>
        
        {isHighScore && (
          <div className="text-3xl text-green-400 mb-4 animate-pulse">
            HIGH SCORE!
          </div>
        )}
      </div>

      {/* Arcade Leaderboard Component would go here */}
      
      <div className="flex space-x-4">
        {isHighScore && !scoreSaved && (
          <button
            onClick={onSaveScore}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 text-xl font-bold"
          >
            SAVE SCORE
          </button>
        )}
        
        {(!isHighScore || scoreSaved) && (
          <>
            <button
              onClick={onPlayAgain}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xl font-bold"
            >
              PLAY AGAIN
            </button>
            
            <button
              onClick={onGoHome}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 text-xl font-bold"
            >
              HOME
            </button>
          </>
        )}
      </div>
    </div>
  );
}
