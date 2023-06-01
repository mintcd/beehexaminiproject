import React, { useState } from "react";
import Question from "./components/question";
import Graph from "./components/graph";
import Login from "./components/login";
import './styles.css'

function App() {
  const [login, setLogin] = useState(true)
  const [answers, setAnswers] = useState([[false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false]]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showSummary, setShowSummary] = useState(false);

  const handleNext = (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion - 1] = [...childAnswer];
    setAnswers(updatedAnswers);
    if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
    else setShowSummary(true);
  
  }

  return (
    <div>
      {login && <Login/>}
      {!showSummary && <Question number={currentQuestion-1} onNext={handleNext}/>}
      {showSummary && <Graph answers={answers}/>}
    </div>
  );
}

export default App;