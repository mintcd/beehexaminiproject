import React from 'react';
import questions from '../data/questions'

export default function Graph({answers}) {
    return (
      <div>
        <h2>Question Summary</h2>
        {questions.map((question, index) => (
          <p key={index}>
            Question {question.value}:{" "}
            {answers[index] !== undefined ? answers[index].length : 0} selected
          </p>
        ))}
      </div>
    );
  };