import React, { useState } from "react";

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("")
    const [started, setStarted] = useState(false)

    const handleStart = () => {
        onLogin(username)
        setStarted(true)
    }

    const handleRename = () => {
        onLogin(username)
    }

    return (<div>
        <h1> Welcome Testing for your attained Scrum Values </h1>
            <input type="text" name="fname" value={username} onChange={(e) => setUsername(e.target.value)}/>
            {!started && <input type="submit" value="Start" onClick={handleStart}/>}
            {started && <input type="submit" value="Rename" onClick={handleRename}/>}
    </div>)
    
    
}

export default Login