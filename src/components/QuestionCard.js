"use client";
import Image from 'next/image';
import { useState } from 'react';
import { playSound } from '../utils/soundUtils';
import { getImageUrl } from '../utils/imageUtils';

export default function QuestionCard({ question, options, selected, onSelect }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleOptionSelect = (option) => {
    if (!selected) {
      // Sound and haptic feedback
      playSound('click');
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      onSelect(option);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-primary-blue mb-4 text-center font-mono px-2">
        🥅 ¿QUÉ GESTO ES ESTE? 🥅
      </h1>
      
      <div className="card-modern p-4 rounded-xl mb-4 mx-2">
        {question?.image_path ? (
          <div className="relative">
            {imageLoading && (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-800 mx-auto rounded-lg border-2 border-gray-600">
                <span className="text-gray-400 font-mono text-sm animate-pulse">CARGANDO...</span>
              </div>
            )}
            <Image
              src={getImageUrl(question.image_path)}
              alt={question?.name || 'Gesture'}
              width={192}
              height={192}
              className={`w-48 h-48 object-contain mx-auto border-2 border-steel-gray rounded-lg bg-gray-900 shadow-lg ${imageLoading ? 'hidden' : ''}`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              priority
            />
            {imageError && (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-800 mx-auto rounded-lg border-2 border-gray-600">
                <span className="text-gray-400 font-mono text-sm">ERROR DE IMAGEN</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-800 mx-auto rounded-lg border-2 border-gray-600">
            <span className="text-gray-400 font-mono text-sm">SIN IMAGEN</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-3 w-full max-w-xs px-2">
        {options.map((option, index) => (
          <button
            key={option.id}
            className={`py-3 px-4 rounded-lg border-2 text-base font-bold transition-all transform active:scale-95 font-sans
              ${selected
                ? option.id === question.id
                  ? "bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/50 animate-pulse"
                  : option.id === selected.id
                  ? "bg-red-600 border-red-400 text-white shadow-lg shadow-red-500/50"
                  : "bg-gray-700 border-gray-500 text-gray-400"
                : "btn-secondary active:scale-95"}
            `}
            onClick={() => handleOptionSelect(option)}
            disabled={!!selected}
          >
            <span className="text-gold font-mono mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option.name}
          </button>
        ))}
      </div>
    </>
  );
}
