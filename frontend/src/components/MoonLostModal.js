import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

function MoonLostModal(props) {

    let user = useSelector((state) => state.user)


    const deleteAccount = () =>{
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${window.localStorage.token}`
            }
        })
        .then(window.localStorage.token = '')
        .then(history.push('/login'))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='game-over-modal'
        >
            <Container className='game-loss-modal'>
                <Row>
                    <Col><h1 style={{ fontFamily:'impact', color: 'red', textAlign: 'center' }}>DEFEAT</h1></Col>
                </Row>
                <Row>
                    <Col style={{ fontFamily:'impact', fontSize: '35px', textAlign: 'center' }}>Luna is lost, retreat is the only option.</Col>
                </Row>
                <Row>
                    <Col><h2 style={{ fontFamily:'impact', color: 'red', textAlign: 'center' }}>THE EARTH IS NEXT.</h2></Col>
                </Row>
                <Modal.Footer >
                    <Button style={{fontFamily:'impact', color:'black'}} variant='danger' onClick={()=>deleteAccount()} className='game-over-button'>FLEE THE MOON (destroys account)</Button>
                </Modal.Footer>
            </Container>
        </Modal>
    );
}

export default MoonLostModal