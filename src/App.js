import React, { useState } from "react";
import questions from "./data/questions";
import Question from "./components/question";
import Graph from "./components/graph";
import './styles.css'

function App() {
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswerChange = (questionNumber, answerValue) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionNumber]: answerValue,
    }));
  };

  const handleFinishClick = () => {
    setShowSummary(true);
  };


  return (
    <div>
      {!showSummary &&
        questions.map((question, index) => (
          <div key={index}>
            <Question
              questionNumber={index}
              handleAnswerChange={handleAnswerChange}
              options={question.answers}
            />
          </div>
        ))}
      {!showSummary && (
        <button onClick={handleFinishClick}>Finish</button>
      )}
      {showSummary && <Graph answers={answers}/>}
    </div>
  );
}

export default App;