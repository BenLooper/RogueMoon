import { Container, Row, Col, CardGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UnitCard from '../components/UnitCard.js'

function Battlefield() {

    //Eventually, these "playCards" will be chosen in a pre-battle selection screen 
    //That will be a container, outside of gameboard that sets state
    //For now, I'll just render the cards here. In the future, they'll be rendered there

    const ownedCards = useSelector((state) => state.ownedCards)
    const playCards = ownedCards.map(card => <UnitCard card={card} />)
    return (
        //These rows populate with played cards
        //Furthest left is total strength, then active buff, then cards
        <Container >
            <Row>
                <Col className="card-tray">Space</Col>
            </Row>
            <Row>
                <Col className="card-tray">Ground</Col>
            </Row>
            <Row>
                <Col className="card-tray">Foot</Col>
            </Row>
            <br></br>
            <Row>
                <Col className="card-tray">Foot</Col>
            </Row>
            <Row>
                <Col className="card-tray">Ground</Col>
            </Row>
            <Row>
                <Col className="card-tray">Space</Col>
            </Row>
            <br></br>
            {/* This row populates with cards drawn from a users deck.  */}
            <Row className="hand-tray">
                {/* <Col className="hand" > */}
                    {playCards.slice(0,7)}
                {/* </Col> */}
            </Row>
        </Container>
    )
}

export default Battlefield;