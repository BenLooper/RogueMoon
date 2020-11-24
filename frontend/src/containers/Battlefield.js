import { Container, Row, Col, CardGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UnitCard from '../components/UnitCard.js'

function Battlefield() {

    const dispatch = useDispatch()

    const gameOn = useSelector((state) => state.gameOn)
    const enemySpace = useSelector((state) => state.enemySpace)
    const enemyGround = useSelector((state) => state.enemyGround)
    const enemyFoot = useSelector((state) => state.enemyFoot)
    const userFoot = useSelector((state) => state.userFoot)
    const userGround = useSelector((state) => state.userGround)
    const userSpace = useSelector((state) => state.userSpace)
    const hand = useSelector((state) => state.hand)

    //Set the stage...SET_GAME_CARDS will eventually be called in pre-game component
    useEffect(() => {
        if (gameOn == false) {
            dispatch({ type: 'SET_GAME_CARDS' })
            dispatch({ type: 'SET_HAND' })
        }
    })

    return (
        //These rows populate with played cards
        //Furthest left is total strength, then active buff, then cards
        <Container >
            <Row>
                <Col style={{ border: 'solid' }}>

                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemySpace}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyGround}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyFoot}</Row>
                </Col>

            </Row>
            <br></br>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userFoot.map(card=><UnitCard card={card} key={card.id}/>)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userGround.map(card=><UnitCard card={card} key={card.id}/>)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>

                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userSpace.map(card=><UnitCard card={card} key={card.id}/>)}</Row>
                </Col>

            </Row>
            <br></br>
            {/* This row populates with cards drawn from a users deck.  */}
            <Row className="card-tray">
                {hand.map(card => <UnitCard card={card} hand={true} key={card.id}/>)}
            </Row>
        </Container>
    )
}

export default Battlefield;