import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function VictoryModal(props) {
    const dispatch = useDispatch();
    const userReactors = useSelector((state) => state.userReactors)
    const enemyReactors = useSelector((state) => state.enemyReactors)

    const createGame = () => {
        fetch('http://localhost:3000/games', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${window.localStorage.token}`
            },
            body: JSON.stringify({
                game_won: (userReactors > enemyReactors ? true : false)
            })
        })
            .then(res => res.json())
            .then((userInfo) => {
                dispatch({
                    type: 'GAME_OVER',
                    userVictory: userInfo.newGame.game_won,
                    games: userInfo.games
                })
            })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h2>Victory!</h2>
                <p>
                   You've defeated the AI and liberated this colony!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={createGame}>Return to Base</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VictoryModal