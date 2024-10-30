import React from 'react';

const ResultScreen = ({ score, questions, userAnswers, restartQuiz }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Test Sonuçları</h2>
      <p>Doğru cevap sayısı: {score} / {questions.length}</p>
      <div style={{ marginTop: '20px' }}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px', textAlign: 'left' }}>
            <p><strong>Soru {index + 1}: </strong>{question.question}</p>
            <p>
              Verilen cevap: {userAnswers[index] !== null && userAnswers[index] !== undefined ? userAnswers[index] : "-"}
            </p>
            <p>
              {userAnswers[index] === question.answer ? (
                <span style={{ color: 'green' }}>Doğru</span>
              ) : (
                <span style={{ color: 'red' }}>Yanlış, doğru cevap: {question.answer}</span>
              )}
            </p>
          </div>
        ))}
      </div>
      <button 
        onClick={restartQuiz} 
        style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Testi Tekrar Başlat
      </button>
    </div>
  );
};

export default ResultScreen;
