import { Container, Row, Col, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import history from '../history'
import MoonWonModal from '../components/MoonWonModal'
import MoonLostModal from '../components/MoonLostModal'

function Home() {
    let dispatch = useDispatch()
    let user = useSelector((state) => state.user)
    let games = useSelector((state) => state.games)
    const ownedCards = useSelector((state) => state.ownedCards)
    const [wonModalShow, setWonModalShow] = useState(false)
    const [lostModalShow, setLostModalShow] = useState(false)

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

    const logout = () => {
        window.localStorage.token = ''
        dispatch({type:'@@INIT'})
        history.push('/login')
    }

    useEffect(() => {
        let enemyProgress = document.querySelectorAll(".progress-bar")[1]
        let userProgress = document.querySelectorAll(".progress-bar")[0]
        let gamesWon = games.filter(game => game.game_won).length
        let gamesLost = (games.length) - gamesWon

        enemyProgress.style.height = `${gamesLost * 10}%`
        userProgress.style.height = `${gamesWon * 10}%`

        if (gamesWon >= 10){
            setWonModalShow(true)
        }
        else if (gamesLost === 10 && gamesWon < 10){
            setLostModalShow(true)
        }
    })

    const handleClick = () => {
        let shuffledGameCards = shuffle(ownedCards)
        dispatch({type:"SET_GAME_CARDS", gameCards: shuffledGameCards})
        dispatch({type:"START_GAME"})
    }

    return (
        <Container className='home' fluid >

            <MoonWonModal
            show={wonModalShow}
            setShow={setWonModalShow}/>

            <MoonLostModal
            show={lostModalShow}/>

            <h1>Hello {user.username}</h1>
            <Button variant='danger' onClick={() => logout()}>Logout</Button>
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