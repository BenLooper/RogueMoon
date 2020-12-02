import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

function DeckInfo() {
    const dispatch = useDispatch()
    let userDiscard = useSelector((state) => state.userDiscard)
    let enemyDiscard = useSelector((state) => state.enemyDiscard)
    const userPass = useSelector((state) => state.userPass)
    const enemyPass = useSelector((state) => state.enemyPass)
    const userTurn = useSelector((state) => state.userTurn)

    const pass = () => {
        dispatch({ type: 'USER_PASS' })
        dispatch({ type: 'END_TURN' })
    }

    return (
        <div>
            <h1>Turn: {userTurn ? 'User' : 'Enemy'}</h1>
            <h1>User Passed: {userPass ? 'Yes' : 'No'}</h1>
            <h1>Enemy Passed: {enemyPass ? 'Yes' : 'No'}</h1>
            <button onClick={pass}>Pass</button>
        </div>
    )
}

export default DeckInfo;