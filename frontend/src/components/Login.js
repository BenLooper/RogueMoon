import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

const Login = () => {

    const [signUp, setSignUp] = useState(false);

    const dispatch = useDispatch()
    const usernameInput = useSelector((state) => state.usernameInput)
    const passwordInput = useSelector((state) => state.passwordInput)

    const handleUsernameChange = (e) => {
        dispatch({ type: 'CHANGE_USERNAME_INPUT', value: e.target.value })
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: 'CHANGE_PASSWORD_INPUT', value: e.target.value })
    }

    const handleLogin = () => {
        fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
            .then(res => res.json())
            .then(userInfo => {
                dispatch({ type: 'SET_USER', user: userInfo.user, ownedCards: userInfo.cards, games: userInfo.games })
                window.localStorage.token = userInfo.jwt
                history.push('/')
            })

    }

    const handleSignUp = () => {
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
        .then(res=>res.json())
        .then(message => message.success?handleLogin():console.log('error'))
    }

    return (
        <div>
            <input type='text' placeholder='username' onChange={(e) => handleUsernameChange(e)} />
            <br></br>
            <input type='text' placeholder='password' onChange={(e) => handlePasswordChange(e)} />
            <button onClick={signUp?handleSignUp:handleLogin}>Submit</button>
            <br></br>
            <button onClick={signUp ? () => setSignUp(false) : () => setSignUp(true)}>
                {signUp ? 'Existing User' : 'New User'}
            </button>
        </div>
    )
}

export default Login 