"use client";

export default function QuestionCard({ question, options, selected, onSelect }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-neon mb-6 text-center font-mono">
        🥅 WHAT GESTURE IS THIS? 🥅
      </h1>
      
      <div className="card-arcade p-6 rounded-xl mb-8">
        {question.image_path ? (
          <img
            src={
              question.image_path.startsWith("http")
                ? question.image_path
                : `/gestures/${question.image_path}`
            }
            alt={question.name}
            className="w-64 h-64 object-contain mx-auto border-2 border-orange-500 rounded-lg bg-gray-900 shadow-lg"
          />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center bg-gray-800 mx-auto rounded-lg border-2 border-gray-600">
            <span className="text-gray-400 font-mono">NO IMAGE</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-md">
        {options.map((option, index) => (
          <button
            key={option.id}
            className={`py-4 px-6 rounded-lg border-2 text-lg font-bold transition-all transform hover:scale-105 font-sans
              ${selected
                ? option.id === question.id
                  ? "bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/50 animate-pulse"
                  : option.id === selected.id
                  ? "bg-red-600 border-red-400 text-white shadow-lg shadow-red-500/50"
                  : "bg-gray-700 border-gray-500 text-gray-400"
                : "btn-arcade hover:scale-105"}
            `}
            onClick={() => !selected && onSelect(option)}
            disabled={!!selected}
          >
            <span className="text-neon-yellow font-mono mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option.name}
          </button>
        ))}
      </div>
    </>
  );
}
