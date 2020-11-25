import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function DeckInfo() {

    let userDiscard = useSelector((state) => state.userDiscard)
    let enemyDiscard = useSelector((state) => state.enemyDiscard)

    return (
        <div>
            <h1>User Discard Pile: {userDiscard.length}</h1>
            <h1>Enemy Discard Pile: {enemyDiscard.length}</h1>
        </div>
    )
}

export default DeckInfo;