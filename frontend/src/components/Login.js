import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

const Login = () => {
    const dispatch = useDispatch()
    const usernameInput = useSelector((state) => state.usernameInput)
    const passwordInput = useSelector((state) => state.passwordInput)

    const handleUsernameChange = (e) => {
        dispatch({type:'CHANGE_USERNAME_INPUT', value:e.target.value})
    }

    const handlePasswordChange = (e) => {
        dispatch({type:'CHANGE_PASSWORD_INPUT', value:e.target.value})
    }

    const handleSubmit = () => {
        //this is where I'll fetch
        //after JWT, I'll store JWT instead of password
        dispatch({type:'SET_USER',user:{username:usernameInput,password:passwordInput}})
        history.push('/game')
    }

    return (
        <div>
            <input type='text' placeholder='username' onChange={(e)=>handleUsernameChange(e)}/>
            <br></br>
            <input type='text' placeholder='password' onChange={(e)=>handlePasswordChange(e)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login 