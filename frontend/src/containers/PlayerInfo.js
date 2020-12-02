import { Container, Row, Col, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import UnitCard from '../components/UnitCard.js'
import light from '../resources/light.png'

function PlayerInfo() {

    const dispatch = useDispatch()

    const games = useSelector((state) => state.games)
    const gameOn = useSelector((state) => state.gameOn)
    const gameStart = useSelector((state) => state.gameStart)

    const userScore = useSelector((state) => state.userScore)
    const enemyScore = useSelector((state) => state.enemyScore)

    const userPass = useSelector((state) => state.userPass)
    const enemyPass = useSelector((state) => state.enemyPass)
    const userTurn = useSelector((state) => state.userTurn)

    const userReactors = useSelector((state) => state.userReactors)
    const enemyReactors = useSelector((state) => state.enemyReactors)
    const [reactors, setReactors] = useState([])

    const userVictory = useSelector((state) => state.userVictory)

    const hand = useSelector((state) => state.hand)
    const enemyHand = useSelector((state) => state.enemyHand)

    const userField = useSelector((state) => state.userField)
    const enemyField = useSelector((state) => state.enemyField)
    const env = useSelector((state) => state.env)

    const pass = () => {
        dispatch({ type: 'USER_PASS' })
        dispatch({ type: 'END_TURN' })
    }

    useEffect(() => {
        setReactors([<Image className="reactor-image" src={light} />, <Image className="reactor-image" src={light} />])
    }, [])

    //Runs enemy turn after user plays a card / passes 
    useEffect(() => {
        //this prevents him playing before hands are set
        if (gameStart && enemyHand.length === 0) {
            setTimeout(() => dispatch({ type: 'ENEMY_PASS' }), 2000)
        }
        //if it's his turn and he's passed, he ends his turn 
        else if (userTurn === false && enemyPass && !(userPass)) {
            dispatch({ type: 'END_TURN' })
        }
        //if I've passed and it's my turn, it goes back to him
        else if (userTurn === true && userPass === true && !(enemyPass) && !(userTurn)) {
            setTimeout(() => dispatch({ type: 'END_TURN' }), 2000)
        }
        else if (userPass && (userScore < enemyScore) && !(enemyPass)) {
            setTimeout(() => dispatch({ type: 'ENEMY_PASS' }), 2000)
        }
        else if ((hand.length > enemyHand.length) && (userScore > (enemyScore + 5) && !(enemyPass) && !(userTurn))) {
            setTimeout(() => dispatch({ type: 'ENEMY_PASS' }), 2000)
        }
        else if ((enemyScore + 10) < userScore && !(enemyPass)) {
            setTimeout(() => dispatch({ type: 'ENEMY_PASS' }), 2000)
        }
        //if I've passed or played and it's his turn (and he hasn't passed), he plays a card
        else if ((userTurn === false || userPass === true) && !(enemyPass) && gameOn) {
            setTimeout(() => dispatch({ type: 'ENEMY_PLAY' }), 1000)
            if (enemyHand.length >= 1) { setTimeout(() => dispatch({ type: 'END_TURN' }), 2000) }
        }
    }, [userTurn, enemyPass])

    return (
        <div class="score-panel">
            <Container className='score-tray'>
                <Row className='score-row'>
                    <Col>
                        <Row >
                            <Col xs={9}>
                                {enemyReactors === 2 ?
                                    reactors
                                    :
                                    <Image src={light} />
                                }
                            </Col>
                            <Col className="total-score-box">
                                <span class="total-score">{enemyScore}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="env-tray">
                <Row>
                    <Col>
                        <Row className="card-tray">{env.map(card => <UnitCard card={card} key={card.id} />)} </Row>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="score-tray" >
                <Row className='score-row'>
                    <Col>
                        <Row >
                            <Col xs={9}>
                                {userReactors === 2 ?
                                    reactors
                                    :
                                    <Image className="reactor-image" src={light} />
                                }
                            </Col>
                            <Col className="total-score-box">
                                <span class="total-score">{userScore}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PlayerInfo;