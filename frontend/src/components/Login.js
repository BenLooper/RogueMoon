import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

const Login = () => {

    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState(false);
    const [exists, setExists] = useState(false);
    const dispatch = useDispatch()
    const usernameInput = useSelector((state) => state.usernameInput)
    const passwordInput = useSelector((state) => state.passwordInput)

    const handleUsernameChange = (e) => {
        dispatch({ type: 'CHANGE_USERNAME_INPUT', value: e.target.value })
    }

    const handlePasswordChange = (e) => {
        dispatch({ type: 'CHANGE_PASSWORD_INPUT', value: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault();
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
                if (userInfo.error) {
                    setError(true);
                    setTimeout( () => setError(false), 3000)
                }
                else {
                    dispatch({ type: 'SET_USER', user: userInfo.user, ownedCards: userInfo.cards, games: userInfo.games })
                    window.localStorage.token = userInfo.jwt
                    history.push('/')
                }
            })

    }

    const handleSignUp = (e) => {
        e.preventDefault();
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
            .then(res => res.json())
            .then(message => {
                message.success ? handleLogin(e) : setExists(true) 
                setTimeout( () => setExists(false), 3000)
            })
        
    }

    return (
        <Container className="login-page" fluid>
            <Row>
                <Col className="login-form">
                    <Form onSubmit={(e) => signUp ? handleSignUp(e) : handleLogin(e)}>
                        <Col style={{ paddingLeft: '30px' }}>
                            <h1 style={{ color: 'grey', fontFamily: 'impact' }}>ROGUE MOON</h1>
                        </Col>
                        <Col xs={3}>
                            <Form.Group controlId='userInput'>
                                <Form.Label style={{ color: 'white', fontFamily: 'impact' }}>Username</Form.Label>
                                <Form.Control style={{ color: 'black', fontFamily: 'impact' }} onChange={(e) => handleUsernameChange(e)} placeholder="Enter username" />
                            </Form.Group>
                        </Col>

                        <Col xs={3}>
                            <Form.Group controlId="passwordInput">
                                <Form.Label style={{ color: 'white', fontFamily: 'impact' }}>Password</Form.Label>
                                <Form.Control style={{ color: 'black', fontFamily: 'impact' }} onChange={(e) => handlePasswordChange(e)} type="password" placeholder="Password" />
                            </Form.Group>
                        </Col>
                        <Col style={{ color: 'red', fontFamily: 'impact' }}>
                            {error ? 
                                <p>Incorrect username or password</p>
                                : null
                            }
                            {exists ?
                                <p>Username has been taken</p>
                                : null
                            }
                        </Col>
                        <Col xs={3} style={{ paddingLeft: '90px', color: 'black', fontFamily: 'impact' }}>
                            <Button style={{ color: 'black' }} variant="success" type="submit" >
                                {signUp ? 'Sign up' : 'Login'}
                            </Button>
                        </Col>
                        <br></br>
                        <Col xs={3} style={{ paddingLeft: '55px', fontFamily: 'impact' }}>
                            <Button style={{ color: 'black' }} onClick={signUp ? () => setSignUp(false) : () => setSignUp(true)}>
                                {signUp ? 'Existing Users Click' : 'New Users Click'}
                            </Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login 