import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import questions from '../data/questions';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Graph({ answers, handleFinish }) {

  const getAnswerNumbers = answers.map((answer) =>
    answer.filter((option) => option === true).length)
  const data = {
    labels: questions.map((question) => question.value),
    datasets: [
      {
        label: "Point",
        scale: 1,
        data: getAnswerNumbers,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1, // Set the step size to 1 to display integer labels
      },
    },
  };

  return (
    <div class="graph-container">
      <h1 class="graph-title"> Congratulations! Here is your result. </h1>
      <Radar class='radarchart' data={data} options={options} />
    </div>
  );
};