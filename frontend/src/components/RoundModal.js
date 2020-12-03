import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function RoundModal(props) {
   
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='game-modal'>
                <h2 style={{fontFamily:'impact', color:props.result=='won'?'green':'red', textAlign:'center'}}>Round {props.result}!</h2>
            </Modal.Body>
        </Modal>
    );
}

export default RoundModal