import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function PassModal(props) {
    const dispatch = useDispatch();
   
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='game-modal'>
                <h2 style={{fontFamily:'impact', color:'white', textAlign:'center'}}>{props.player} Pass</h2>
            </Modal.Body>
        </Modal>
    );
}

export default PassModal