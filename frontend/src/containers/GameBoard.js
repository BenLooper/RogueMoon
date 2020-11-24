import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

import Battlefield from './Battlefield'
import PlayerInfo from './PlayerInfo'
import DeckInfo from './DeckInfo'

function GameBoard() {
    const token = useSelector((state) => state.token)

    if (token) {
        return (
            <Container fluid >
                <Row>
                    <Col xs={3}>
                        <PlayerInfo />
                    </Col>
                    <Col xs={7}>
                        <Battlefield />
                    </Col>
                    <Col xs={2}>
                        <DeckInfo />
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        {history.push('/login')}
        return null 
    }
}

export default GameBoard;