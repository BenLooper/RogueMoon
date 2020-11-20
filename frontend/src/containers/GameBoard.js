import { Container, Row, Col } from 'react-bootstrap'
import Battlefield from './Battlefield'
import PlayerInfo from './PlayerInfo'
import DeckInfo from './DeckInfo'

function GameBoard() {
    return (
        <Container fluid >
            <Row>
                <Col xs={4}>
                    <PlayerInfo />
                </Col>
                <Col xs={5}>
                    <Battlefield />
                </Col>
                <Col xs={3}>
                    <DeckInfo />
                </Col>
            </Row>
        </Container>
    )
}

export default GameBoard;