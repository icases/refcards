"use client";
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { playSound } from '../utils/soundUtils';
import { getImageUrl } from '../utils/imageUtils';


export default function QuestionCard({ selected, onSelect, questionKey }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Always call hooks in the same order
  const gesturePath = questionData?.gesture?.image_path || null;
  const imageUrl = useMemo(() => getImageUrl(gesturePath), [gesturePath]);

  // Fetch question from Edge Function on mount
  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      try {
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/generateGestureQuestion`;
        const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const res = await fetch(FUNCTION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
        });
        const data = await res.json();
        setQuestionData(data);
      } catch (err) {
        setQuestionData({ error: err.message });
      }
      setLoading(false);
    }
    fetchQuestion();
  }, [questionKey]);

  // Handle answer selection
  function handleOptionSelect(optionIdx) {
    if (!questionData || !questionData.question) return;
    playSound('click');
    if (navigator.vibrate) navigator.vibrate(50);
    onSelect(optionIdx, questionData.question.correct, questionData.gesture);
  }

  if (loading) {
    return <div className="text-center py-8">Cargando pregunta...</div>;
  }
  if (!questionData || questionData.error || !questionData.question || !questionData.question.answers || !questionData.question.question) {
    return (
      <div className="text-center py-8 text-red-600">
        Error: {questionData?.error || questionData?.question?.error || 'No se pudo cargar la pregunta.'}<br />
        <div className="mt-2 text-xs text-gray-500">{questionData?.question?.raw ? `Respuesta LLM: ${questionData.question.raw}` : null}</div>
      </div>
    );
  }
  // Only destructure after loading and error checks
  const { gesture, question } = questionData;
  return (
    <>
     
      <div className="card-modern p-4 rounded-xl mb-4 mx-2 font-sporty">
        {gesture?.image_path ? (
          <div className="relative">
            {imageLoading && (
              <div className="w-48 h-48 flex items-center justify-center bg-gray-200 mx-auto rounded-lg border-2 border-primary-blue">
                <span className="text-gray-400 font-sporty text-sm animate-pulse">CARGANDO...</span>
              </div>
            )}
            <Image
              src={imageUrl}
              alt={gesture?.name || 'Gesture'}
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
              <div className="w-48 h-48 flex items-center justify-center bg-gray-200 mx-auto rounded-lg border-2 border-primary-blue">
                <span className="text-gray-400 font-sporty text-sm">ERROR DE IMAGEN</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-48 h-48 flex items-center justify-center bg-gray-200 mx-auto rounded-lg border-2 border-primary-blue">
            <span className="text-gray-400 font-sporty text-sm">SIN IMAGEN</span>
          </div>
        )}
      </div>
      <div className="mb-4 text-lg text-center font-sporty text-primary-blue">
        {question?.question}
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs px-2">
        {question?.answers?.map((answer, index) => (
          <button
            key={index}
            className={`py-3 px-4 rounded-lg border-2 text-base font-bold transition-all transform active:scale-95 font-sporty
              ${selected === index
                ? index === question.correct
                  ? "bg-green-600 border-green-400 text-white shadow-lg shadow-green-500/50 animate-pulse"
                  : "bg-red-600 border-red-400 text-white shadow-lg shadow-red-500/50"
                : "btn-secondary active:scale-95"}
            `}
            onClick={() => handleOptionSelect(index)}
            disabled={selected !== null}
          >
            <span className="text-gold font-sporty mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {answer}
          </button>
        ))}
      </div>
    </>
  );
}
