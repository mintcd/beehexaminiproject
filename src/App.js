import React, { useState, useEffect } from "react";

import Question from "./views/question";
import Graph from "./views/graph";
import Login from "./views/login";
import Leaderboard from "./views/leaderboard";
import Intro from "./views/intro";

import connectDB from "./controllers/connectDB";
import './styles.scss'

function App() {
  // Hooks
  const [logged, setLogged] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const [username, setUsername] = useState("")
  const [answers, setAnswers] = useState(Array.from({ length: 5 }, () => [false, false, false, false, false]));
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
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
  const getTopUsers = async () => {
    const { data } = await supabase.from('User').select('username', 'score');
    console.log(data)
    data.sort((a, b) => a.score - b.score)
    if (data.length > 5) return data.slide(0, 5)
    else return data
  }

  // Handlers

  const handleBack = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  }

  const handleNext = (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion - 1] = [...childAnswer];
    setAnswers(updatedAnswers);
    if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
    else setShowSummary(true);

  }

  const handleLogin = (username) => {
    let invalidUsername = /^\s*$/
    if (invalidUsername.test(username)) return false;
    setLogged(true);
    setUsername(username);
    setCurrentQuestion(currentQuestion + 1);
    return true;
  }

  const handleFinish = async () => {
    let answerValues = answers.map(answer => answer.map(value => value));
    setScore(answers.map(ele => ele.reduce((acc, cur) => acc + cur), 0).reduce((acc, cur) => acc + cur))
    // await supabase
    // .from('User')
    // .insert({ username:username, selected:answerValues, score:score })
    console.log({ username: username, selected: answerValues, score: score })
    setShowSummary(true)
  }

  return (
    <div>
      <h1> SCRUM Values Self-test </h1>
      {currentQuestion === 0 && <Intro />}
      {!showSummary && <Login onLogin={handleLogin} />}
      {logged && !showSummary && <Question number={currentQuestion - 1} onBack={handleBack} onNext={handleNext} onFinish={handleFinish} />}
      {showSummary && <Graph answers={answers} handleFinish={handleFinish} />}
      {showSummary && <Leaderboard topUers={getTopUsers()}></Leaderboard>}
    </div>
  );
}

export default App;