import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UnitCard from '../components/UnitCard.js'

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


    //Checks to see if both have passed 
    //End game actually triggered by ROUND_OVER updating reactors 

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
        <div>
            <h1>User Score: {userScore}</h1>
            <h1>Enemy Score: {enemyScore}</h1>
            <br></br>
            <h1>User cards in hand: {hand.length}</h1>
            <h1>Enemy cards in hand: {enemyHand.length}</h1>
            <br></br>
            <h1>User Reactors Left: {userReactors}</h1>
            <h1>Enemy Reactors Left: {enemyReactors}</h1>
            <br></br>
            <Container>
                <Row>
                    <Col>
                        <Row className="card-tray">{env.map(card => <UnitCard card={card} key={card.id} />)} </Row>
                    </Col>
                </Row>
            </Container>
            <h1>Turn: {userTurn ? 'User' : 'Enemy'}</h1>
            <h1>User Passed: {userPass ? 'Yes' : 'No'}</h1>
            <h1>Enemy Passed: {enemyPass ? 'Yes' : 'No'}</h1>
            <button onClick={pass}>Pass</button>
            {/* <h1>Games Played: {games.length}</h1> */}
            <h1>GAME WINNER: {userVictory && userVictory !== null ? 'User' : 'Enemy'}</h1>
        </div>
    )
}

export default PlayerInfo;