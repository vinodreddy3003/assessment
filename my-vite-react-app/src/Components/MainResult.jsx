// MainResult.js
import React from 'react';
import PieQ from './PieQ';
import Result from './Result';
import './MainResult.css';

const MainResult = ({ correctAnswers, wrongAnswers }) => {
  const total = correctAnswers + wrongAnswers;

  return (
    <div>
      <h1 className='main-result'>Quiz Results</h1>
      <Result
        total={total}
        correct={correctAnswers}
        wrong={wrongAnswers}
      />
      <PieQ correct={correctAnswers} wrong={wrongAnswers} />
    </div>
  );
};

export default MainResult;
