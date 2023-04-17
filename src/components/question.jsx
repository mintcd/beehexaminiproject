import React, { useState } from 'react';
import questions from '../data/questions'

const Question = ({ number, handleAnswer }) => {

    const question = questions[number]
    const [selectedOption, setSelectedOption] = useState(null);


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const handleSubmit = () => {
        // Process the selected option, e.g., update the answers state in the parent component
        handleAnswer(number, selectedOption);
    }

    return (
        <div>
            <h2>What to you think about your {question.value} ?</h2>
            <form>
                {/* Render options dynamically */}
                <label>
                    <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={handleOptionChange} />
                    Option 1
                </label>
                <label>
                    <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={handleOptionChange} />
                    Option 2
                </label>


                {number < 5 && <button type="button" onClick={handleSubmit}>Submit</button>}
            </form>
        </div>
    );
};

export default Question;