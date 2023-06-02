import React, { useState } from "react";

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("")

    let handleSubmit = () => {
        onLogin(username)
    }

    return (<div>
        <h1> Login </h1>
            <input type="text" name="fname" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="submit" value="Submit" onClick={handleSubmit}/>
    </div>)
    
    
}

export default Login