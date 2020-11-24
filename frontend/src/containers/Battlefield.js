import { Container, Row, Col, CardGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UnitCard from '../components/UnitCard.js'

function Battlefield() {

    const dispatch = useDispatch()

    const gameOn = useSelector((state) => state.gameOn)
    const enemyField = useSelector((state) => state.enemyField)
    const userField = useSelector((state) => state.userField)
    const hand = useSelector((state) => state.hand)

    //Set the stage...SET_GAME_CARDS will eventually be called in pre-game component
    useEffect(() => {
        if (gameOn == false) {
            dispatch({ type: 'SET_GAME_CARDS' })
            dispatch({ type: 'SET_HAND' })
        }
    })

    const rowScore = (array) => {
        let score = 0
        for (let i = 0; i < array.length; i++) {
            score += array[i].strength
        }
        return score
    }

    return (
        //These rows populate with played cards
        //Furthest left is total strength, then active buff, then cards
        <Container >
            <Row>
                <Col style={{ border: 'solid' }}>

                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.space}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.ground}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.foot}</Row>
                </Col>

            </Row>
            <br></br>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.foot)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.foot.map(card => <UnitCard card={card} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.ground)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.ground.map(card => <UnitCard card={card} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.space)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.space.map(card => <UnitCard card={card} key={card.id} />)}</Row>
                </Col>

            </Row>
            <br></br>
            {/* This row populates with cards drawn from a users deck.  */}
            <Row className="card-tray">
                {hand.map(card => <UnitCard card={card} hand={true} key={card.id} />)}
            </Row>
        </Container>
    )
}

export default Battlefield;