"use client";

export default function GameStats({ hearts, score, streak }) {
  return (
    <div className="scoreboard w-full max-w-sm flex justify-between items-center mb-4 p-3 rounded-lg">
      <div className="flex items-center gap-1">
    <span className="text-accent-orange font-sporty text-xs">VIDAS</span>
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <span 
              key={i} 
              className={`text-2xl transition-all duration-300 ${
                i < hearts 
                  ? "heart-hockey text-red-500" 
                  : "heart-hockey lost text-gray-600"
              }`}
            >
              🏒
            </span>
          ))}
        </div>
      </div>
      <div className="text-center">
          <div className="text-xs text-gold font-sporty">PUNTOS</div>
          <div className="text-lg font-bold text-primary-blue font-sporty">{score.toLocaleString()}</div>
      </div>
      <div className="text-center">
          <div className="text-xs text-accent-red font-sporty">RACHA</div>
          <div className="text-lg font-bold text-accent-orange font-sporty">{streak}</div>
        {streak >= 5 && (
            <div className="text-xs text-gold animate-pulse font-sporty">🔥 ¡EN LLAMAS!</div>
        )}
      </div>
    </div>
  );
}
