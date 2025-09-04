"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GameStats from '../../components/GameStats';
import QuestionCard from '../../components/QuestionCard';
import ResultModal from '../../components/ResultModal';
import ArcadeLeaderboard from '../../components/ArcadeLeaderboard';
import { fetchAllGestures, savePlayerScore, fetchLeaderboard } from '../../utils/dbQueries';
import { shuffle } from '../../utils/arrayUtils';
import { checkIsHighScore } from '../../utils/scoreUtils';

export default function GamePageClient() {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  async function fetchQuestion() {
    setLoading(true);
    setResult(null);
    setSelected(null);
    
    try {
      const { data, error } = await fetchAllGestures();
      
      if (error) {
        setLoading(false);
        setQuestion(null);
        return;
      }
      
      if (!data || data.length < 3) {
        console.log("Not enough data:", data);
        setLoading(false);
        setQuestion(null);
        return;
      }
      
      // Randomly pick 3 gestures
      const shuffledData = shuffle(data);
      const selectedGestures = shuffledData.slice(0, 3);
      
      // Pick one as the correct answer
      const correct = selectedGestures[0];
      setQuestion(correct);
      setOptions(shuffle(selectedGestures));
      setLoading(false);
    } catch (err) {
      console.error("Connection error:", err);
      setLoading(false);
      setQuestion(null);
    }
  }

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

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (gameOver) {
      loadLeaderboard();
    }
  }, [gameOver]);

  function handleSelect(option) {
    setSelected(option);
    const isCorrect = option.id === question.id;
    
    if (isCorrect) {
      setResult("¡Correcto!");
      setScore(score + 1);
      setStreak(streak + 1);
      
      // Restore heart every 5 correct answers in a row (max 3 hearts)
      if ((streak + 1) % 5 === 0 && hearts < 3) {
        setHearts(hearts + 1);
      }
    } else {
      setResult("Incorrecto");
      setStreak(0); // Reset streak
      setHearts(hearts - 1);
      
      // Check game over
      if (hearts - 1 <= 0) {
        setGameOver(true);
        return;
      }
    }
    
    // Show modal with description
    setShowModal(true);
  }

  function handleNextQuestion() {
    setShowModal(false);
    setSelected(null);
    setResult(null);
    fetchQuestion();
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
  
  if (!question) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center p-6">
        <div className="card-modern p-8 rounded-xl">
          <div className="text-accent-red text-2xl mb-4 font-sporty font-bold">
            ❌ ERROR AL CARGAR PREGUNTA ❌
          </div>
          <div className="text-gray-500 mb-4 font-sporty">Esto puede ser debido a:</div>
          <ul className="text-gray-400 text-left mb-6 space-y-1 font-sporty">
            <li>• Base de datos de gestos vacía</li>
            <li>• Error de conexión a Supabase</li>
            <li>• Problema con variables de entorno</li>
          </ul>
          <button 
            className="btn-primary py-3 px-6 font-sporty"
            onClick={fetchQuestion}
          >
            🔄 INTENTAR DE NUEVO
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-start p-2 py-4 font-sporty">
      <GameStats hearts={hearts} score={score} streak={streak} />
      
      <QuestionCard 
        question={question}
        options={options}
        selected={selected}
        onSelect={handleSelect}
      />
      
      {result && (
        <div className={`mt-3 text-xl font-bold text-center font-sporty ${
          result.includes("Correcto") ? "text-primary-blue animate-pulse" : "text-red-500"
        }`}>
          {result.includes("Correcto") ? "🎯 ¡CORRECTO!" : "❌ ¡INCORRECTO!"}
          {result.includes("Correcto") && streak > 0 && streak % 5 === 0 && hearts < 3 && (
            <div className="text-sm text-accent-orange mt-1 animate-pulse font-sporty">🏒 ¡VIDA RESTAURADA!</div>
          )}
        </div>
      )}
      
      <ResultModal 
        show={showModal}
        result={result}
        question={question}
        streak={streak}
        hearts={hearts}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
}
