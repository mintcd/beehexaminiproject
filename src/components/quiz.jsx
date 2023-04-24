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
import questions from '../data/questions';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);



export default function Quiz() {

    const [questionNumber, setQuestionumber] = useState(0)
    const [showChart, setShowChart] = useState(false)
    const [answers, setAnswers] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null
    })

    const handleOptionChange = (e) => {
        const value = Number(e.target.value); // convert value to number
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionNumber]: value
          }));
    }

    const handleBack = (e) => {
        setQuestionumber(questionNumber - 1)
    }

    const handleNext = (e) => {
        setQuestionumber(questionNumber + 1)
    }

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
                (questionNumber === 0 && (
                    <div>
                        <h2>What do you think about your {questions[questionNumber].value}?</h2>
                        <form>
                            {questions[questionNumber].answers.map((x, index) => (
                                <div key={questionNumber}>
                                    <label>
                                        <input
                                            type="radio"
                                            value={index}
                                            checked={answers[index] === questionNumber}
                                            onChange={handleOptionChange}
                                        />
                                        {x}
                                    </label>
                                </div>
                            ))}
                            {questionNumber > 0 && <button type="button" onClick={handleBack}>Back</button>}
                            {questionNumber < 5 && <button type="button" onClick={handleNext}>Next</button>}
                        </form>
                    </div>
                )
                )}
        </div>
    )
}




