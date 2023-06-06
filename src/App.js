import React, { useState, useEffect } from "react";

import Question from "./views/question";
import Graph from "./views/graph";
import Login from "./views/login";
// import Leaderboard from "./views/leaderboard";
import Intro from "./views/intro";

import connectDB from "./controllers/connectDB";
import './styles.css'

function App() {
  // Hooks
  const [logged, setLogged] = useState(false);
  const [supabase, setSupabase] = useState(null);
  const [username, setUsername] = useState("")
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

  const handleLogin = (username) => {
    let invalidUsername = /^\s*$/
    if (invalidUsername.test(username)) return false;
    setLogged(true);
    setUsername(username);
    return true;
  }

  const handleFinish = async (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion - 1] = [...childAnswer];
    setAnswers(updatedAnswers);
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

  return (
    <div>
      <Intro />
      {<Login onLogin={handleLogin} />}
      {logged && <Question number={currentQuestion} selections={answers[currentQuestion]} onBack={handleBack} onNext={handleNext} onFinish={handleFinish} onChange={handleChange} />}
      {logged && <Graph answers={answers} />}
      {/* {showSummary && <Leaderboard topUsers={topUsers}></Leaderboard>} */}
    </div>
  );
}

export default App;