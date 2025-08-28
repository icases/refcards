"use client";

export default function ResultModal({ 
  show, 
  result, 
  question, 
  streak, 
  hearts, 
  onNextQuestion 
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="card-arcade max-w-md w-full p-6 rounded-xl">
        <div className={`text-3xl font-bold text-center mb-4 font-mono ${
          result.includes("Correcto") ? "text-neon animate-pulse" : "text-red-500"
        }`}>
          {result.includes("Correcto") ? "🎯 CORRECT!" : "❌ INCORRECT!"}
        </div>
        
        <div className="text-xl font-bold text-neon-yellow mb-3 text-center font-mono">
          {question.name}
        </div>
        
        <div className="text-gray-300 mb-6 text-center leading-relaxed font-sans">
          {question.description}
        </div>
        
        {result.includes("Correcto") && streak > 0 && streak % 5 === 0 && hearts < 3 && (
          <div className="text-center text-neon-orange font-bold mb-4 font-mono animate-pulse">
            🏒 LIFE RESTORED! 🏒
          </div>
        )}
        
        <button
          className="w-full btn-sport py-4 px-6 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          onClick={onNextQuestion}
        >
          NEXT PLAY ➤
        </button>
      </div>
    </div>
  );
}
