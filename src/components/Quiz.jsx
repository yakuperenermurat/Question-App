// Quiz bileşeni - Kullanıcının testi çözmesi için ana quiz bileşeni
import React, { useState, useEffect } from 'react';
import questions from '../questions';

const Quiz = ({ setShowResult, setUserAnswers, setScore, userAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Güncel sorunun indexi
  const [selectedOption, setSelectedOption] = useState(null); // Seçilen seçenek
  const [showOptions, setShowOptions] = useState(false); // Seçeneklerin gösterilme durumu
  const [timeLeft, setTimeLeft] = useState(30); // Her soruya verilen süre (saniye)

  // Zamanlayıcılar
  useEffect(() => {
    // Seçeneklerin gecikmeli gösterimi için zamanlayıcı
    const optionTimer = setTimeout(() => {
      setShowOptions(true);
    }, 4000); // 4 saniye sonra seçenekler gösterilecek

    // Geri sayım süresi (30 saniye)
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000); // Her saniye süre azalıyor

    // 30 saniye sonunda yeni soruya geçme zamanlayıcısı
    const nextQuestionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 30000);

    // Temizlik işlemleri (zamanlayıcıları temizleme)
    return () => {
      clearTimeout(optionTimer);
      clearTimeout(nextQuestionTimer);
      clearInterval(timer);
    };
  }, [currentQuestion]);

  // Seçeneğe tıklanıldığında yapılan işlem
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    let newScore = 0;
    if (option === questions[currentQuestion].answer) {
      newScore = 1;
      setScore((prev) => prev + 1); // Doğruysa puanı artır
    }

    setUserAnswers((prev) => [...prev, option]); // Cevabı kaydet
    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // 1 saniye sonra yeni soruya geç
  };

  // Sonraki soruya geçiş
  const handleNextQuestion = () => {
    setShowOptions(false); // Seçenekleri kapat
    setSelectedOption(null); // Seçili seçeneği temizle
    setTimeLeft(30); // Süreyi sıfırla

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Bir sonraki soruya geç
    } else {
      setShowResult(true); // Tüm sorular bittiğinde sonucu göster
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
