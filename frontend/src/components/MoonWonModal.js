import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

function MoonWonModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="game-over-modal"
        >
            <Container className='game-won-modal'>
                <Row>
                    <Col><h1 style={{ fontFamily:'impact', color: 'green', textAlign: 'center' }}>MOON LIBERATED!</h1></Col>
                </Row>
                <Row>
                    <Col style={{ fontFamily:'impact', fontSize: '35px', textAlign: 'center' }}>The Rogue AI has been routed and humanity has retaken control of the moon.</Col>
                </Row>
                <Row>
                    <Col><h1 style={{ fontFamily:'impact', color: 'green', textAlign: 'center' }}>Thanks for playing!</h1></Col>
                </Row>
                <Modal.Footer >
                    <Button style={{fontFamily:'impact', color:'black'}} variant='success' onClick={() => props.setShow(false)} className='game-over-button'>Keep Playing!</Button>
                </Modal.Footer>
            </Container>
        </Modal>
    );
}

export default MoonWonModal