import React, { useState, useEffect } from 'react';
import questions from '../questions';

const Quiz = ({ setShowResult, setUserAnswers, setScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Güncel sorunun indexi
  const [selectedOption, setSelectedOption] = useState(null); // Seçilen seçenek
  const [showOptions, setShowOptions] = useState(false); // Seçeneklerin gösterilme durumu
  const [timeLeft, setTimeLeft] = useState(30); // Her soruya verilen süre (saniye)

  useEffect(() => {
    const optionTimer = setTimeout(() => {
      setShowOptions(true);
    }, 4000);

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const nextQuestionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 30000);

    return () => {
      clearTimeout(optionTimer);
      clearTimeout(nextQuestionTimer);
      clearInterval(timer);
    };
  }, [currentQuestion]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Eğer seçenek doğruysa puanı artırma
    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    // Cevaplanan sorunun doğru indeksine `userAnswers` dizisine ekleme
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestion] = option; // Doğru indekse cevabı ekleme
      return updatedAnswers;
    });

    // 1 saniye sonra yeni soruya geçme
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    setShowOptions(false);
    setSelectedOption(null);
    setTimeLeft(30);

    // Eğer kullanıcı cevap vermeden geçtiyse null olarak ekleme
    setUserAnswers((prev) => {
      const updatedAnswers = [...prev];
      if (updatedAnswers[currentQuestion] === undefined) {
        updatedAnswers[currentQuestion] = null; // Boş bırakılan soru için null ekleme
      }
      return updatedAnswers;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{questions[currentQuestion].question}</h2>
      <img
        src={`/pictures/${questions[currentQuestion].media}`}
        alt="question media"
        style={{ width: '400px', height: '300px', marginBottom: '20px' }}
      />
      <p>Kalan süre: {timeLeft} saniye</p>
      {showOptions ? (
        <div>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedOption}
              style={{ padding: '10px 20px', margin: '10px', fontSize: '16px' }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p>4 saniye sonra seçenekler görünecek...</p>
      )}
    </div>
  );
};

export default Quiz;
