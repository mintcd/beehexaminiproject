import React, { useState } from "react";
import questions from "../data/questions";

const Question = ({ questionNumber, handleAnswerChange }) => {
  const question = questions[questionNumber];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (option) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((o) => o !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    handleAnswerChange(questionNumber, updatedOptions);
  };

  return (
    <div>
      <h3> {question.value} </h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`option-${index}`}
              name={`question-${questionNumber}`}
              value={answer}
              checked={selectedOptions.includes(answer)}
              onChange={() => handleOptionSelect(answer)}
            />
            <label htmlFor={`option-${index}`}>{answer}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;