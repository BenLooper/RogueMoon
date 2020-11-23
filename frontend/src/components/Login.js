import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

const Login = () => {
    const dispatch = useDispatch()
    const usernameInput = useSelector((state) => state.usernameInput)
    const passwordInput = useSelector((state) => state.passwordInput)

    const handleUsernameChange = (e) => {
        dispatch({ type: 'CHANGE_USERNAME_INPUT', value: e.target.value })
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: 'CHANGE_PASSWORD_INPUT', value: e.target.value })
    }

    const handleSubmit = () => {
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
                dispatch({ type: 'SET_USER', user: userInfo.user, token:userInfo.jwt })
                history.push('/')
            })

    }
    
    return (
        <div>
            <input type='text' placeholder='username' onChange={(e) => handleUsernameChange(e)} />
            <br></br>
            <input type='text' placeholder='password' onChange={(e) => handlePasswordChange(e)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login 