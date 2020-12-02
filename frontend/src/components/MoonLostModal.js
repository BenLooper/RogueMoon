import { Modal, Button } from 'react-bootstrap'
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
        >
            <Modal.Body>
                <h2>DEFEAT</h2>
                <p>
                   Luna is lost, the only option left is retreat.
                </p>
                <p>
                   Maybe one day humanity will return to her....
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>deleteAccount()}>FLEE THE MOON (your account will be destroyed. Sorry!)</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MoonLostModal