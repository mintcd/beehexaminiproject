import React, { useState } from "react";
import questions from "../data/questions";

const Question = ({number, onNext, onBack, onFinish}) => {
  const question = questions[number];
  const [selected, setSelected] = useState([false, false, false, false, false]);

  const handleChange = (index) => {
    let updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    onNext(selected);
    setSelected([false, false, false, false, false]) 
  }

  const handleFinish = () => {
    onFinish()
  }
  console.log(number)

  return (
    <div>
      <h3> {question.value} </h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`option-${index}`}
              name={`question-${number}`}
              value={answer}
              checked={selected[index]}
              onChange={() => handleChange(index)}
            />
            <label htmlFor={`option-${index}`}>{answer}</label>
          </li>
        ))}
      </ul>
      {<button onClick={handleBack}>Previous</button>}
      {number < 4 && <button onClick={handleNext}>Next</button>}
      {number === 4 && <button onClick={handleFinish}>Finish</button>}
    </div>
  );
};

export default Question;