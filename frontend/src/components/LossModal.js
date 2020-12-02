import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function LossModal(props) {
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
            className="game-over-modal"
        >
            <Container className="game-over-container">
                <Row>
                    <Col className="game-over-title"><h1>Defeat!</h1></Col>
                </Row>
                <Row>
                    <Col>The AI has crushed your forces, this colony is lost.</Col>
                </Row>
            </Container>
            <Modal.Footer>
                <Button variant='danger' onClick={createGame}>Return to Base</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LossModal