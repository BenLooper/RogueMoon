import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import history from '../history'


function Home() {
    let dispatch = useDispatch()
    let user = useSelector((state) => state.user)
    let games = useSelector((state) => state.games)
    const ownedCards = useSelector((state) => state.ownedCards)

    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    useEffect(() => {
        let enemyProgress = document.querySelectorAll(".progress-bar")[1]
        let userProgress = document.querySelectorAll(".progress-bar")[0]
        let gamesWon = games.filter(game => game.game_won).length
        let gamesLost = (games.length) - gamesWon

        enemyProgress.style.height = `${gamesLost * 10}%`
        userProgress.style.height = `${gamesWon * 10}%`
    })

    const handleClick = () => {
        let shuffledGameCards = shuffle(ownedCards)
        dispatch({type:"SET_GAME_CARDS", gameCards: shuffledGameCards})
        dispatch({type:"START_GAME"})
    }

    return (
        <Container className='home' fluid >
            <h1>Hello {user.username}</h1>
            <br></br>
            <Row>
                <Col>
                    <label>Victory</label>
                    <ProgressBar className="progress-bar-vertical" srOnly variant='success' />
                </Col>
                <Col>
                    <Button size='lg' variant='danger' onClick={handleClick}>Battle</Button>
                </Col>
                <Col>
                    <label>Defeat</label>
                    <ProgressBar className="progress-bar-vertical" srOnly variant='danger' />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;