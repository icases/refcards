"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { shuffle } from "../../utils/gameUtils";
import { fetchAllGestures, fetchLeaderboard, savePlayerScore, checkIsHighScore } from "../../utils/dbQueries";
import GameStats from "../../components/GameStats";
import QuestionCard from "../../components/QuestionCard";
import ResultModal from "../../components/ResultModal";
import ArcadeLeaderboard from "../../components/ArcadeLeaderboard";
import GameOverScreen from "../../components/GameOverScreen";

export default function GamePage() {
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
      alert("Por favor ingresa tu nombre");
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
      <div className="min-h-screen hockey-bg flex items-center justify-center">
        <div className="text-neon text-2xl font-mono animate-pulse">
          🏒 LOADING GAME... 🏒
        </div>
      </div>
    );
  }
  
  if (gameOver) {
    const isHighScore = checkIsHighScore(score, leaderboard);
    
    return (
      <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4">
        {/* Arcade Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 text-neon-pink font-mono animate-pulse">
            🏒 GAME OVER 🏒
          </h1>
          <div className="text-2xl mb-4 text-neon-yellow font-mono">
            FINAL SCORE: {score.toLocaleString()}
          </div>
          {isHighScore && (
            <div className="text-3xl text-neon animate-pulse font-bold">
              🏆 NEW HIGH SCORE! 🏆
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
              <div className="text-neon-yellow text-xl mb-2 font-bold animate-pulse">
                🎯 ENTER YOUR NAME! 🎯
              </div>
              <div className="text-sm mb-4 text-gray-400">UP TO 10 CHARACTERS</div>
              <button
                className="btn-arcade py-3 px-8 text-lg font-bold"
                onClick={saveScore}
                disabled={playerName.length < 1}
              >
                SAVE SCORE
              </button>
            </>
          )}
          
          {scoreSaved && (
            <div className="text-neon text-xl mb-4 font-bold animate-pulse">
              ✅ SCORE SAVED! ✅
            </div>
          )}
          
          <div className="space-y-3">
            <button
              className="block btn-sport py-3 px-8 text-lg mx-auto"
              onClick={resetGame}
            >
              🏒 PLAY AGAIN 🏒
            </button>
            <button
              className="block btn-arcade py-2 px-6 text-sm mx-auto"
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
      <div className="min-h-screen hockey-bg flex flex-col items-center justify-center text-center p-6">
        <div className="card-arcade p-8 rounded-xl">
          <div className="text-neon-pink text-2xl mb-4 font-mono font-bold">
            ❌ QUESTION LOAD ERROR ❌
          </div>
          <div className="text-gray-300 mb-4 font-sans">This could be due to:</div>
          <ul className="text-gray-400 text-left mb-6 space-y-1">
            <li>• Empty gestures database</li>
            <li>• Supabase connection error</li>
            <li>• Environment variables issue</li>
          </ul>
          <button 
            className="btn-arcade py-3 px-6"
            onClick={fetchQuestion}
          >
            🔄 TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <GameStats hearts={hearts} score={score} streak={streak} />
      
      <h1 className="text-3xl font-bold text-blue-800 mb-6">¿Qué gesto es este?</h1>
      
      <QuestionCard 
        question={question}
        options={options}
        selected={selected}
        onSelect={handleSelect}
      />
      
      {result && (
        <div className={`mt-6 text-xl font-bold text-center ${
          result.includes("Correcto") ? "text-green-600" : "text-red-600"
        }`}>
          {result}
          {result.includes("Correcto") && streak > 0 && streak % 5 === 0 && hearts < 3 && (
            <div className="text-sm text-green-500 mt-1">¡Corazón restaurado!</div>
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
