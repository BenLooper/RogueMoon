import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import history from '../history'

import Battlefield from './Battlefield'
import PlayerInfo from './PlayerInfo'
import DeckInfo from './DeckInfo'
import VictoryModal from '../components/VictoryModal'
import LossModal from '../components/LossModal'
import PassModal from '../components/PassModal'
import RoundModal from '../components/RoundModal'

function GameBoard() {
    const dispatch = useDispatch();

    const gameOn = useSelector((state) => state.gameOn)
    const gameStart = useSelector((state) => state.gameStart)
    const userScore = useSelector((state) => state.userScore)
    const enemyScore = useSelector((state) => state.enemyScore)
    const userReactors = useSelector((state) => state.userReactors)
    const enemyReactors = useSelector((state) => state.enemyReactors)
    const userPass = useSelector((state) => state.userPass)
    const enemyPass = useSelector((state) => state.enemyPass)
    const [victoryModalShow, setVictoryModalShow] = useState(false)
    const [lossModalShow, setLossModalShow] = useState(false)
    const [passModalShow, setPassModalShow] = useState(false)
    const [passingPlayer, setPassingPlayer] = useState('')
    const [roundModalShow, setRoundModalShow] = useState(false)
    const [result, setResult] = useState('')
    
    //if one side's reactors are down, end the game 
    useEffect(() => {
        if (enemyReactors === 0) {
            setVictoryModalShow(true)
        }
        else if (userReactors === 0) {
            setLossModalShow(true)
        }
    }, [userReactors, enemyReactors])

    useEffect(() => {
        if (userPass && !(userReactors === 0 || enemyReactors === 0)) {
            setPassingPlayer('Player')
            setPassModalShow(true)
            setTimeout(() => {
                setPassModalShow(false);
                if (userPass && enemyPass) {
                    setRoundModalShow(true)
                    setResult(userScore >= enemyScore ? 'won' : 'lost')
                    setTimeout(() => {
                        setRoundModalShow(false)
                        dispatch({ type: 'ROUND_OVER' })
                        dispatch({ type: 'RESET_BOARD' })
                    }, 1500)
                }
            }, 1000)
        }
    }, [userPass])

    useEffect(() => {
        if (enemyPass && !(userReactors === 0 || enemyReactors === 0) && gameOn && gameStart) {
            setPassingPlayer('Enemy')
            setPassModalShow(true)
            setTimeout(() => {
                setPassModalShow(false);
                if (userPass && enemyPass) {
                    setRoundModalShow(true)
                    setResult(userScore >= enemyScore ? 'won' : 'lost')
                    setTimeout(() => {
                        setRoundModalShow(false)
                        dispatch({ type: 'ROUND_OVER' })
                        dispatch({ type: 'RESET_BOARD' })
                    }, 1500)
                }
            }, 1000)
        }
    }, [enemyPass])

    return (
        <Container fluid className="gameboard">
            <VictoryModal
                show={victoryModalShow} />

            <LossModal
                show={lossModalShow} />

            <PassModal
                show={passModalShow}
                player={passingPlayer} />

            <RoundModal
                show={roundModalShow}
                result={result} />

            <Row>
                <Col xs={3} >
                    <PlayerInfo />
                </Col>
                <Col xs={7} className="battlefield">
                    <Battlefield />
                </Col>
                <Col xs={2}>
                    <DeckInfo />
                </Col>
            </Row>
        </Container>
    )
}

export default GameBoard;