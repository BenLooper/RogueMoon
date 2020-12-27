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
        dispatch({ type: '@@INIT' })
        history.push('/login')
    }

    useEffect(() => {
        let enemyProgress = document.querySelectorAll(".progress-bar")[1]
        let userProgress = document.querySelectorAll(".progress-bar")[0]
        let gamesWon = games.filter(game => game.game_won).length
        let gamesLost = (games.length) - gamesWon

        enemyProgress.style.height = `${gamesLost * 10}%`
        userProgress.style.height = `${gamesWon * 10}%`

        if (gamesWon === 10) {
            setWonModalShow(true)
        }
        else if (gamesLost === 10 && gamesWon < 10) {
            setLostModalShow(true)
        }
    },[games])

    const handleClick = () => {
        let shuffledGameCards = shuffle(ownedCards)
        dispatch({ type: "SET_GAME_CARDS", gameCards: shuffledGameCards })
        dispatch({ type: "START_GAME" })
    }
 
    return (
        <div className='backdrop'>
            <Container className='home' fluid >

                <MoonWonModal
                    show={wonModalShow}
                    setShow={setWonModalShow} />

                <MoonLostModal
                    show={lostModalShow} />

                <h1>{user.username}</h1>
                <br></br>
                <Button style={{fontFamily:'impact', color:'black'}} variant='danger' onClick={() => logout()}>Logout</Button>
                <Row>
                    <Col style={{ fontFamily: 'impact', textAlign: 'center', paddingLeft: '120px' }}>
                        <h1 style={{ fontWeight: 'bold', color: 'green' }}>Victory</h1>
                    </Col>
                    <Col style={{ fontFamily: 'impact', textAlign: 'center', paddingRight: '120px' }}>
                        <h1 style={{ fontWeight: 'bold', color: 'red' }}>Defeat</h1>
                    </Col>
                </Row>
                <br></br>
                <Row className='home-row'>
                    <ProgressBar style={{ marginLeft: '500px' }} className="progress-bar-vertical" animated srOnly variant='success' />
                    <Col style={{ textAlign: 'center', paddingTop: '400px', width: '30px' }}>
                        <Button style={{fontFamily:'impact', color:'black'}}size='lg' variant='danger' onClick={handleClick}>Liberate A Colony</Button>
                    </Col>
                    <ProgressBar style={{ marginRight: '500px' }} className="progress-bar-vertical" animated srOnly variant='danger' />
                </Row>
            </Container>
        </div>
    )
}

export default Home;