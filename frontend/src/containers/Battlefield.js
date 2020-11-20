import { Container, Row, Col } from 'react-bootstrap'

function Battlefield() {
    return (
        //These rows populate with played cards
        //Furthest left is total strength, then active buff
        <Container>
            <Row>
                <Col>Space</Col>
            </Row>
            <Row>
                <Col>Ground</Col>
            </Row>
            <Row>
                <Col>Foot</Col>
            </Row>
            <br></br>
            <Row>
                <Col>Foot</Col>
            </Row>
            <Row>
                <Col>Ground</Col>
            </Row>
            <Row>
                <Col>Space</Col>
            </Row>
            <br></br>
            {/* This row populates with cards drawn from a users deck.  */}
            <Row>
                <Col>Hand</Col>
            </Row>
        </Container>
    )
}

export default Battlefield;