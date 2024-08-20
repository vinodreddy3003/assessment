
import React, { useState } from "react";
import { resultInitalState } from "../constants.json";
import quizData from "../constants.json";
import "./Assessment.css";
import Question from "./Question";
import AppTimer from "./AppTimer";
import MainResult from "./MainResult";

const Assessment = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerInd, setAnswerInd] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerInd(index);
    setAnswer(answer === correctAnswer);
  };

  const onClickNext = () => {
    setAnswerInd(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onQuestionNumberClick = (index) => {
    setCurrentQuestion(index);
    setAnswerInd(null);
  };

  const handleTimeUp = () => {
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="">
        <MainResult result={result} />
      </div>
    );
  }

  return (
    <div className="assessment-wrapper">
      <div className="header">
        <div className="header-left">
          <button className="back-button"><i class="bi bi-arrow-left-circle-fill"></i></button>
          <span className="exam-title">ASSESSMENT-1</span>
        </div>
        <div className="header-right">
          
          <div className="user-profile">
            <img
              src="../src/Components/mspic.jpg"
              alt="User Profile"
              className="profile-pic"
            />
          </div>
        </div>
      </div>


      <div className="quiz-container">
        <div>
          <Question
            questions={quizData.jsQuizz.questions}
            onQuestionNumberClick={onQuestionNumberClick}
          />
        </div>

        <div className="assessment-container">
        <AppTimer duration={300} onTimeUp={handleTimeUp} />
          <span className="active-question-no">Question {currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                key={answer}
                onClick={() => onAnswerClick(answer, index)}
                className={answerInd === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerInd === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;

