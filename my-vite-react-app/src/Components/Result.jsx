// Result.js
import React from 'react';
import './Result.css';

const Result = ({ total, correct, wrong }) => {
  return (
    <div className="result-container">
      <div className="result-item">
        <h3>Total Questions</h3>
        <p>{total}</p>
      </div>
      <div className="result-item">
        <h3>Correct Answers</h3>
        <p>{correct}</p>
      </div>
      <div className="result-item">
        <h3>Wrong Answers</h3>
        <p>{wrong}</p>
      </div>
    </div>
  );
};

export default Result;


