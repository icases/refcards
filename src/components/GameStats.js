"use client";

export default function GameStats({ hearts, score, streak }) {
  return (
    <div className="scoreboard w-full max-w-md flex justify-between items-center mb-6 p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-neon-orange font-mono text-sm">LIVES</span>
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              className={`text-3xl transition-all duration-300 ${
                i < hearts 
                  ? "heart-hockey text-red-500 animate-pulse" 
                  : "heart-hockey lost text-gray-600"
              }`}
            >
              🏒
            </span>
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs text-neon-yellow font-mono">SCORE</div>
        <div className="text-xl font-bold text-neon font-mono">{score.toLocaleString()}</div>
      </div>
      <div className="text-center">
        <div className="text-xs text-neon-pink font-mono">STREAK</div>
        <div className="text-xl font-bold text-neon-orange font-mono">{streak}</div>
        {streak >= 5 && (
          <div className="text-xs text-yellow-400 animate-pulse">🔥 ON FIRE!</div>
        )}
      </div>
    </div>
  );
}
