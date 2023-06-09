import React, { useState, useEffect } from "react";
import questions from "../data/questions";

const Question = ({ number, selections, onNext, onBack, onFinish, onChange }) => {
  const question = questions[number]
  const [selected, setSelected] = useState(selections)
  useEffect(() => {
    setSelected(selections);
  }, [selections]);


  const handleChange = (index) => {
    let updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    onChange(updatedSelected)
    setSelected(updatedSelected);
  };

  const handleBack = () => {
    onBack();
    setSelected([false, false, false, false, false])
  };

  const handleNext = () => {
    onNext();
    setSelected([false, false, false, false, false])
  }

  const handleFinish = () => {
    onFinish(selected)
  }

  return (
    <div className="container question-container">
      {console.log(number, selections)}
      <h1 className="intro-title"> {question.value} </h1>
      {question.answers.map((answer, index) => (
        <div key={index} className="answer-container">
          <input
            className="select"
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
      {number > 0 && <button className="btn" onClick={handleBack}>Back</button>}
      {number < 4 && <button className="btn" onClick={handleNext}>Next</button>}
      {number === 4 && <button className="btn" onClick={handleFinish}>Finish</button>}
    </div>
  );
};

export default Question;