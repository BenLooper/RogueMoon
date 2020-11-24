import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function PlayerInfo() {

    let userScore = useSelector((state) => state.userScore)
    let enemyScore = useSelector((state) => state.enemyScore)


    return (
        <div>
            <h1>User Score: {userScore}</h1>
            <h1>Enemy Score: {enemyScore}</h1>
        </div>
    )
}

export default PlayerInfo;