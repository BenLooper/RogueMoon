import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UnitCard from '../components/UnitCard.js'

function PlayerInfo() {

    const dispatch = useDispatch()

    const games = useSelector((state) => state.games)
    const gameOn = useSelector((state) => state.gameOn)

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

    const createGame = () => {
        fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${window.localStorage.token}`
            },
            body: JSON.stringify({
                game_won: (userReactors > enemyReactors ? true : false)
            })
        })
            .then(res => res.json())
            .then((userInfo) => {
                dispatch({
                    type: 'GAME_OVER',
                    userVictory: userInfo.newGame.game_won,
                    games: userInfo.games
                })
            })
    }

    //if one side's reactors are down, end the game 
    useEffect(() => {
        if (userReactors === 0 || enemyReactors === 0) {
            createGame()
        }
    }, [userReactors, enemyReactors])

    //Checks to see if both have passed 
    //End game actually triggered by ROUND_OVER updating reactors 
    useEffect(() => {
        if (userPass && enemyPass) {
            dispatch({ type: 'ROUND_OVER' })
            dispatch({ type: 'RESET_BOARD' })
        }
    }, [userPass, enemyPass])

    //Runs enemy turn after user plays a card / passes 
    useEffect(() => {
        //this prevents him playing before hands are set
        if (gameOn && enemyHand.length === 0) {
            dispatch({ type: 'ENEMY_PASS' })
        }
        //if it's his turn and he's passed, he ends his turn 
        else if (userTurn === false && enemyPass) {
            dispatch({ type: 'END_TURN' })
        }
        //if I've passed and it's my turn, it goes back to him
        else if (userTurn === true && userPass === true) {
            dispatch({ type: 'END_TURN' })
        }
        //if I've passed or played and it's his turn (and he hasn't passed), he plays a card
        else if ((userTurn === false || userPass === true) && !(enemyPass)) {
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