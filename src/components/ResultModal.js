"use client";

export default function ResultModal({ 
  show, 
  result, 
  gesture, 
  streak, 
  hearts, 
  onNextQuestion 
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-ice-blue bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="card-modern max-w-sm w-full p-4 rounded-xl shadow-lg">
        <div className={`text-2xl font-bold text-center mb-3 font-sporty ${
          result.includes("Correcto") ? "text-primary-blue" : "text-accent-red"
        }`}>
          {result.includes("Correcto") ? "🎯 ¡CORRECTO!" : "❌ ¡INCORRECTO!"}
        </div>
        
        <div className="text-lg font-bold text-gold mb-2 text-center font-sporty">
          {gesture?.name}
        </div>
        
        <div className="text-gray-600 mb-4 text-center leading-relaxed font-sporty text-sm">
          {gesture?.description}
        </div>

        <div className="mb-4 text-center text-xs text-gray-500 font-sporty">
          <div><span className="font-bold text-gold">Tipo de sanción:</span> {gesture?.minor_major === 'minor' ? 'Menor' : gesture?.minor_major === 'major' ? 'Mayor' : 'Ninguna'}</div>
          <div><span className="font-bold text-gold">Tiempo de penalización:</span> {gesture?.penaltytime ? `${gesture.penaltytime} min` : 'N/A'}</div>
          <div><span className="font-bold text-gold">¿Puede convertirse en mayor?:</span> {gesture?.canupgradetomajor ? 'Sí' : 'No'}</div>
          <div><span className="font-bold text-gold">¿Penalización con stick?:</span> {gesture?.isstickpenalty ? 'Sí' : 'No'}</div>
        </div>
        
        {result.includes("Correcto") && streak > 0 && streak % 5 === 0 && hearts < 3 && (
          <div className="text-center text-accent-orange font-bold mb-3 font-sporty animate-pulse text-sm">
            🏒 ¡VIDA RESTAURADA! 🏒
          </div>
        )}
        
        <button
          className="w-full btn-sport py-3 px-4 rounded-full text-base font-bold font-sporty transition-all transform hover:scale-105"
          onClick={onNextQuestion}
        >
          SIGUIENTE JUGADA ➤
        </button>
      </div>
    </div>
  );
}
