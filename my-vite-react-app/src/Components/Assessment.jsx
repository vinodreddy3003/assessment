import React, { useState } from "react";
import quizData from "../constants.json";
import "./Assessment.css";
import Question from "./Question";
import AppTimer from "./AppTimer";
import MainResult from "./MainResult";

const Assessment = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerInd, setAnswerInd] = useState(Array(questions.length).fill(null)); // Store selected answers for all questions
  const [results, setResults] = useState(questions.map(() => null));
  const [showResult, setShowResult] = useState(false);
  const [reviewedQuestions, setReviewedQuestions] = useState(
    questions.map(() => false)
  );

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerInd((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestion] = index;
      return updatedAnswers;
    });

    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[currentQuestion] = answer === correctAnswer;
      return updatedResults;
    });
  };

  const onClickPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const onClickNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onQuestionNumberClick = (index) => {
    setCurrentQuestion(index);
  };

  const toggleReviewQuestion = () => {
    setReviewedQuestions((prev) => {
      const updatedReviews = [...prev];
      updatedReviews[currentQuestion] = !updatedReviews[currentQuestion];
      return updatedReviews;
    });
  };

  const totalScore = results.filter(Boolean).length;
  const correctAnswers = results.filter((result) => result === true).length;
  const wrongAnswers = results.filter((result) => result === false).length;

  if (showResult) {
    return (
      <div className="">
        <MainResult
          score={totalScore}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
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
          <AppTimer duration={300} onTimeUp={() => setShowResult(true)} />
          <span className="active-question-no">Question {currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                key={answer}
                onClick={() => onAnswerClick(answer, index)}
                className={answerInd[currentQuestion] === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={toggleReviewQuestion} className="star-button">
              {reviewedQuestions[currentQuestion] ? "⭐" : "☆"} Review
            </button>
            <button onClick={onClickPrevious} disabled={currentQuestion === 0}>
              Previous
            </button>
            <button onClick={onClickNext} disabled={answerInd[currentQuestion] === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
