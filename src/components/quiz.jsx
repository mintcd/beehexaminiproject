import React, { useState } from 'react';
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
import Question from './question';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);



export default function Quiz() {

    const [question, setQuestion] = useState(1)
    const [showChart, setShowChart] = useState(false)
    const [answers, setAnswers] = useState([0, 0, 0, 0, 0])

    const handleAnswer = (questionNumber, selectedOption) => {
        // Update the answers state based on the selected answer
        const updatedAnswers = [...answers];
        updatedAnswers[questionNumber - 1] = selectedOption;
        setAnswers(updatedAnswers);

        // Move to the next question or show the chart when all questions are answered
        if (questionNumber === 5) {
            setShowChart(true);
        } else {
            setQuestion(questionNumber + 1);
        }
    };

    const data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
            {
                label: '# of Votes',
                data: [2, 9, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };



    return (
        <div>
            <h1>Quiz</h1>
            {showChart ?
                (
                    // If @showChart is true render chart
                    <div>
                        <h2>Results</h2>
                        <Radar data={data} />
                    </div>
                )
                :
                (
                    /* Render question according to @question */
                    <div>{question === 1 && (<Question number={1} />)}</div>
                )
            }
        </div>)
}