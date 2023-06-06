import React, { useState, useEffect, useRef } from "react";

import Question from "./views/question";
import Graph from "./views/graph";
// import Login from "./views/login";
// import Leaderboard from "./views/leaderboard";
import Intro from "./views/intro";

import connectDB from "./controllers/connectDB";
import './styles.css'

function App() {

  const maxArea = 59.44103

  // Hooks
  const ref = useRef(null)
  const [started, setStarted] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const [finished, setFinished] = useState(false);
  // const [username, setUsername] = useState("")
  const [answers, setAnswers] = useState(Array(5).fill(Array(5).fill(false))) // 5 questions having 5 options each
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [topUsers, setTopUsers] = useState(null);
  useEffect(() => {
    const initializeDB = async () => {
      try {
        const supabaseInstance = await connectDB();
        setSupabase(supabaseInstance);
      } catch (error) {
        console.error("Failed to connect to the database:", error);
      }
    };

    initializeDB();
  }, []);

  // Interactors
  // const getTopUsers = async () => {
  //   const { data } = await
  //     supabase.from('User').select([username, score])
  //   data.sort((a, b) => a.score - b.score)
  //   if (data.length > 5) setTopUsers(data.slide(0, 5))
  //   else setTopUsers(data)
  // }

  // Handlers

  const handleChange = (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = [...childAnswer];
    setAnswers(updatedAnswers);
  }

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  }

  const handleNext = () => {
    if (currentQuestion < 4) setCurrentQuestion(currentQuestion + 1);
  }

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  // const handleLogin = (username) => {
  //   let invalidUsername = /^\s*$/
  //   if (invalidUsername.test(username)) return false;
  //   setLogged(true);
  //   setUsername(username);
  //   return true;
  // }

  const handleFinish = async (childAnswer) => {
    setFinished(true)
    // if (!finished) {
    //   setFinished(true)
    //   setScore(answers.map(ele => ele.reduce((acc, cur) => acc + cur), 0).reduce((acc, cur) => acc + cur))
    //   // setTopUsers(getTopUsers());
    //   let answerValues = answers.map(answer => answer.map(value => value));
    //   await supabase
    //     .from('User')
    //     .insert({ username: username, selected: answerValues, score: score })
    // }
  }

  // Calculators
  const getArea = () => {
    const getAnswerNumbers = answers.map((answer) => answer.filter((option) => option === true).length)

    const percent = Math.floor(getAnswerNumbers
      .map((value, index) => [value, getAnswerNumbers[(index + 1) % getAnswerNumbers.length]])
      .map(pair => pair[0] * pair[1] / 2 * Math.sin(1.26))
      .reduce(function (a, b) { return a + b; }, 0) / maxArea * 100);
    return percent
  }

  return (
    <div>
      <Intro />
      <div className="button-container">
        {!started && <button className="btn" onClick={handleStart}>Start Test!</button>}
        {started && <button className="btn" onClick={handleFinish}> Finish </button>}
      </div>
      {started &&
        <div ref={ref} className="row">
          <div className="col-6">
            {!finished && <Question number={currentQuestion} selections={answers[currentQuestion]} onBack={handleBack} onNext={handleNext} onFinish={handleFinish} onChange={handleChange} />}
            {finished &&
              <div className="finish-container">
                <h1 className="intro-title"> Congratulation! </h1>
                <div>Your area covers {getArea()}% of a perfect possible member's. </div>
                {getArea() < 50 && <div> Try acquiring some more previous descriptions of Scrum values! </div>}
                {getArea() > 50 && <div> Keep going! </div>}
              </div>
            }
          </div>
          <div className="col-6">
            <Graph answers={answers} />
          </div>
        </div>}

      {/* {showSummary && <Leaderboard topUsers={topUsers}></Leaderboard>} */}
    </div>
  );
}

export default App;