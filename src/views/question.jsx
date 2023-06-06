import React, { useState } from "react";
import questions from "../data/questions";

const Question = ({ number, onNext, onBack, onFinish }) => {
  const question = questions[number];
  const [selected, setSelected] = useState([false, false, false, false, false]);

  const handleChange = (index) => {
    let updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };

  const handleBack = () => {
    onBack(selected);
    setSelected([false, false, false, false, false]);
  };

  const handleNext = () => {
    onNext(selected);
    setSelected([false, false, false, false, false]);
  }

  const handleFinish = () => {
    onFinish(selected)
    setSelected([false, false, false, false, false]);
  }

  return (
    <div class="container question-container">
      <h3> {question.value} </h3>
      {question.answers.map((answer, index) => (
        <div class="answer-container">
          <input
            class="select"
            type="checkbox"
            id={`${question.value}-${index}`}
            name={`question-${number}`}
            value={answer}
            checked={selected[index]}
            onChange={() => handleChange(index)}
          />
          <label> {answer} </label>
        </div>

      ))}
      {number > 0 && <button class="btn" onClick={handleBack}>Back</button>}
      {number < 4 && <button class="btn" onClick={handleNext}>Next</button>}
      {number === 4 && <button class="btn" onClick={handleFinish}>Finish</button>}
    </div>
  );
};

export default Question;