import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import history from '../history'

function MoonWonModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h2>MOON LIBERATED!</h2>
                <p>
                   The Rogue AI has been routed and humanity has retaken control of the moon.
                </p>
                <p>Thanks for playing!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>props.setShow(false)}>Keep Playing!</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MoonWonModal