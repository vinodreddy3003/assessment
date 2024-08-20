// MainResult.js
import React from 'react';
import PieQ from './PieQ';
import Result from './Result';
import './MainResult.css';

const MainResult = ({ result }) => {
  return (
    <div>
      <h1 className='main-result'>Quiz Results</h1>
      <Result
        total={ result.correctAnswers+result.wrongAnswers}
        correct={result.correctAnswers}
        wrong={result.wrongAnswers}
      />
      <PieQ correct={result.correctAnswers} wrong={result.wrongAnswers} />
    </div>
  );
};

export default MainResult;
