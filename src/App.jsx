// App bileşeni - Tüm uygulamanın ana bileşeni
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import StartScreen from './components/StartScreen';
import ResultScreen from './components/ResultScreen';
import questions from './questions';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false); // Quizin başlama durumu
  const [showResult, setShowResult] = useState(false); // Sonuç ekranı durumu
  const [userAnswers, setUserAnswers] = useState([]); // Kullanıcının cevapları
  const [score, setScore] = useState(0); // Kullanıcının puanı

  // Testi başlatma fonksiyonu
  const startQuiz = () => {
    setQuizStarted(true);
    setShowResult(false);
    setUserAnswers([]);
    setScore(0);
  };

  // Testi yeniden başlatma fonksiyonu
  const restartQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <div>
      {showResult ? (
        <ResultScreen
          score={score}
          questions={questions}
          userAnswers={userAnswers}
          restartQuiz={restartQuiz}
        />
      ) : quizStarted ? (
        <Quiz
          setShowResult={setShowResult}
          setUserAnswers={setUserAnswers}
          setScore={setScore}
          userAnswers={userAnswers}
        />
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </div>
  );
};

export default App;
