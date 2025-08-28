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
      <div className="card-modern max-w-sm w-full p-4 rounded-xl">
        <div className={`text-2xl font-bold text-center mb-3 font-mono ${
          result.includes("Correcto") ? "text-primary-blue" : "text-accent-red"
        }`}>
          {result.includes("Correcto") ? "🎯 ¡CORRECTO!" : "❌ ¡INCORRECTO!"}
        </div>
        
        <div className="text-lg font-bold text-gold mb-2 text-center font-mono">
          {question.name}
        </div>
        
        <div className="text-gray-300 mb-4 text-center leading-relaxed font-sans text-sm">
          {question.description}
        </div>
        
        {result.includes("Correcto") && streak > 0 && streak % 5 === 0 && hearts < 3 && (
          <div className="text-center text-accent-orange font-bold mb-3 font-mono animate-pulse text-sm">
            🏒 ¡VIDA RESTAURADA! 🏒
          </div>
        )}
        
        <button
          className="w-full btn-sport py-3 px-4 rounded-full text-base font-bold transition-all transform hover:scale-105"
          onClick={onNextQuestion}
        >
          SIGUIENTE JUGADA ➤
        </button>
      </div>
    </div>
  );
}
