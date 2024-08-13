import { useState } from "react";
import { resultInitalState } from "./constants";
import AppTimer from "./AppTimer";

const Assessment = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerInd, setAnswerInd] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitalState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswerTimer,setShowAnswerTimer]=useState(true);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerInd(index);
        setAnswer(answer === correctAnswer);
    };

    const onClickNext = (finalAnswer) => {
        setAnswerInd(null);
        setShowAnswerTimer(false);
        setResult((prev) =>
            finalAnswer 
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
            setCurrentQuestion(0);
            setShowResult(true);
        }
        setTimeout(() =>{
           setShowAnswerTimer(true); 
        });
    };



    const handleTimeUp = () => {
        setAnswer(false);
        onClickNext(false);
      };

    return (
        <div className="assessment-container">
            {!showResult ? (
                <>
                {showAnswerTimer &&< AppTimer duration={15} onTimeUp={handleTimeUp}/>}
                    <span className="active-question-no">Q{currentQuestion + 1}</span>
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
                       
                        <button onClick={() => onClickNext(answer)} disabled={answerInd === null}>
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </button>
                    </div>
                </>
            ) : (
                <div className="result">
                    <h2>Result</h2>
                    <p>Score: {result.score}</p>
                    <p>Correct Answers: {result.correctAnswers}</p>
                    <p>Wrong Answers: {result.wrongAnswers}</p>
                </div>
            )}
        </div>
    );
};

export default Assessment;
