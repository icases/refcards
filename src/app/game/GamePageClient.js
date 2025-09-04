"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GameStats from '../../components/GameStats';
import QuestionCard from '../../components/QuestionCard';
import ResultModal from '../../components/ResultModal';
import ArcadeLeaderboard from '../../components/ArcadeLeaderboard';
import { fetchLeaderboard, savePlayerScore } from '../../utils/dbQueries';
import { checkIsHighScore } from '../../utils/scoreUtils';

export default function GamePageClient() {
  const [questionKey, setQuestionKey] = useState(1);
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [correctIdx, setCorrectIdx] = useState(null);
  const [gesture, setGesture] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // No need to fetch gestures manually, QuestionCard fetches from Edge Function

  async function loadLeaderboard() {
    setLoadingLeaderboard(true);
    try {
      const { data, error } = await fetchLeaderboard();
      
      if (!error && data) {
        setLeaderboard(data);
      }
    } catch (err) {
      console.error("Error loading leaderboard:", err);
    }
    setLoadingLeaderboard(false);
  }

  // Remove gesture fetching effect

  useEffect(() => {
    if (gameOver) {
      loadLeaderboard();
    }
  }, [gameOver]);

  function handleSelect(selectedIdx, correctIdxFromQuestion, gestureObj) {
    setSelected(selectedIdx);
    setCorrectIdx(correctIdxFromQuestion);
    setGesture(gestureObj);
    const isCorrect = selectedIdx === correctIdxFromQuestion;
    if (isCorrect) {
      setResult("¡Correcto!");
      setScore(score + 1);
      setStreak(streak + 1);
      if ((streak + 1) % 5 === 0 && hearts < 3) {
        setHearts(hearts + 1);
      }
    } else {
      setResult("Incorrecto");
      setStreak(0);
      setHearts(hearts - 1);
      if (hearts - 1 <= 0) {
        setGameOver(true);
        return;
      }
    }
    setShowModal(true);
  }

  function handleNextQuestion() {
    setShowModal(false);
    setSelected(null);
    setResult(null);
    setCorrectIdx(null);
    setGesture(null);
    setQuestionKey(prev => prev + 1); // Force QuestionCard to remount and fetch new question
  }

  function resetGame() {
    setHearts(3);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setSelected(null);
    setResult(null);
    setShowModal(false);
    setPlayerName("");
    setScoreSaved(false);
    fetchQuestion();
  }

  async function saveScore() {
    if (!playerName.trim()) {
      alert("Por favor introduce tu nombre");
      return;
    }

    try {
      const { error } = await savePlayerScore(playerName, score);

      if (error) {
        console.error("Error saving score:", error);
        alert("Error al guardar la puntuación");
        return;
      }

      setScoreSaved(true);
      // Reload leaderboard to show updated rankings
      await loadLeaderboard();
      
      // Redirect to landing page after a short delay to show the success message
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Error saving score:", err);
      alert("Error al guardar la puntuación");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-primary-blue text-2xl font-sporty animate-pulse">
          🏒 CARGANDO JUEGO... 🏒
        </div>
      </div>
    );
  }
  
  if (gameOver) {
    const isHighScore = checkIsHighScore(score, leaderboard);
    
    return (
    <div className="min-h-screen bg-bg-dark text-primary-blue font-sporty flex flex-col items-center justify-center p-4">
        {/* Arcade Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-accent-red font-sporty animate-pulse">
            🏒 FIN DEL JUEGO 🏒
          </h1>
          <div className="text-2xl mb-4 text-gold font-sporty">
            PUNTUACIÓN FINAL: {score.toLocaleString()}
          </div>
          {isHighScore && (
            <div className="text-3xl text-primary-blue animate-pulse font-bold font-sporty">
              🏆 ¡NUEVO RÉCORD! 🏆
            </div>
          )}
        </div>

        <ArcadeLeaderboard 
          leaderboard={leaderboard}
          loading={loadingLeaderboard}
          playerName={playerName}
          setPlayerName={setPlayerName}
          score={score}
          scoreSaved={scoreSaved}
          isHighScore={isHighScore}
          onSaveScore={saveScore}
        />

        {/* Controls */}
        <div className="text-center space-y-4">
          {isHighScore && !scoreSaved && (
            <>
              <div className="text-gold text-xl mb-2 font-bold font-sporty animate-pulse">
                🎯 ¡INTRODUCE TU NOMBRE! 🎯
              </div>
              <div className="text-sm mb-4 text-gray-500 font-sporty">HASTA 10 CARACTERES</div>
              <button
                className="btn-primary py-3 px-8 text-lg font-bold"
                onClick={saveScore}
                disabled={playerName.length < 1}
              >
                GUARDAR PUNTUACIÓN
              </button>
            </>
          )}
          
          {scoreSaved && (
            <div className="text-primary-blue text-xl mb-4 font-bold font-sporty animate-pulse">
              ✅ SCORE SAVED! ✅
            </div>
          )}
          
          <div className="space-y-3">
            <button
              className="block btn-sport py-3 px-8 text-lg mx-auto"
              onClick={resetGame}
            >
              🏒 JUGAR DE NUEVO 🏒
            </button>
            <button
              className="block btn-secondary py-2 px-6 text-sm mx-auto"
              onClick={() => router.push("/")}
            >
              🏠 HOME
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Remove unused question error fallback; QuestionCard handles its own loading and error states

  return (
  <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-start p-2 py-4 font-sporty">
      <GameStats hearts={hearts} score={score} streak={streak} />
      
      <QuestionCard 
        key={questionKey}
        questionKey={questionKey}
        selected={selected}
        onSelect={handleSelect}
      />
      <ResultModal 
        show={showModal}
        result={result}
        gesture={gesture}
        streak={streak}
        hearts={hearts}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
}
