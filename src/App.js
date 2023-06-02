import React, { useState, useEffect } from "react";
import Question from "./views/question";
import Graph from "./views/graph";
import Login from "./views/login";
import './styles.css'
import connectDB from "./controllers/connectDB";

function App() {
  const [supabase, setSupabase] = useState(null);
  const [username, setUsername] = useState("")
  const [answers, setAnswers] = useState([[false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false],
                                          [false, false, false, false, false]]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
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

  const handleNext = (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion - 1] = [...childAnswer];
    setAnswers(updatedAnswers);
    if (currentQuestion < 5) setCurrentQuestion(currentQuestion + 1);
    else setShowSummary(true);
  
  }

  const handleLogin = (username) => {
    setUsername(username);
    setCurrentQuestion(currentQuestion + 1);
    console.log(username, "From Home")
  }

  const handleFinish = async () => {
    const answerValues = answers.map((answer) => answer.map((value) => value));
    await supabase
    .from('User')
    .insert({ username:username, selected:answerValues})
    console.log("Data sent", { username:username, selected:answerValues})
  }

  return (
    <div>
      {/* {currentQuestion === 0 && <Login onLogin={handleLogin}/>} */}
      {!showSummary && <Question number={currentQuestion-1} onNext={handleNext}/>}
      {showSummary && <Graph answers={answers} handleFinish={handleFinish}/>}
    </div>
  );
}

export default App;