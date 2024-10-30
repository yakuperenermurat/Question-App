// StartScreen bileşeni - Kullanıcının testi başlatmasını sağlayan başlangıç bileşeni
import React from 'react';

const StartScreen = ({ startQuiz }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Quiz Uygulamasına Hoş Geldiniz</h1>
      <p>Teste başlamak için aşağıdaki butona tıklayın.</p>
      <button id="start" onClick={startQuiz} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Teste Başla
      </button>
    </div>
  );
};

export default StartScreen;
