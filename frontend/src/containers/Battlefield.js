import { Container, Row, Col, CardGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UnitCard from '../components/UnitCard.js'
import EnemyCard from '../components/EnemyCard.js'
function Battlefield() {

    const dispatch = useDispatch()

    const gameOn = useSelector((state) => state.gameOn)
    const drawHands = useSelector((state) => state.drawHands)

    const enemyField = useSelector((state) => state.enemyField)
    const userField = useSelector((state) => state.userField)
    const env = useSelector((state) => state.env)

    const ownedCards = useSelector((state) => state.ownedCards)


    const hand = useSelector((state) => state.hand)
    const enemyHand = useSelector((state) => state.enemyHand)

    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const rowScore = (array) => {
        let score = 0
        for (let i = 0; i < array.length; i++) {
            score += array[i].strength
        }
        return score
    }

    //On mount, set the game cards and setHands to true 
    useEffect(() => {
        let shuffledEnemyGameCards = shuffle(ownedCards)
        dispatch({ type: 'SET_ENEMY_GAME_CARDS', enemyGameCards: shuffledEnemyGameCards })
        dispatch({ type: 'RESET_BOARD' })
    }, [])

    useEffect(() => {
        if (gameOn === true && drawHands === true) {
            dispatch({ type: 'SET_HANDS' })
        }
    }, [drawHands])


    return (
        //These rows populate with played cards
        //Furthest left is total strength, then active buff, then cards
        <Container >
            <Row className="card-tray">
                {enemyHand.map(card => <EnemyCard />)}
            </Row>
            <br></br>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(enemyField.space)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.space.map(card => <UnitCard card={card} env={env} userField={false} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(enemyField.ground)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.ground.map(card => <UnitCard card={card} env={env} userField={false} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(enemyField.foot)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{enemyField.foot.map(card => <UnitCard card={card} env={env} userField={false} key={card.id} />)}</Row>
                </Col>

            </Row>
            <br></br>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.foot)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.foot.map(card => <UnitCard card={card} env={env} userField={true} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.ground)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.ground.map(card => <UnitCard card={card} env={env} userField={true} key={card.id} />)}</Row>
                </Col>

            </Row>
            <Row>
                <Col style={{ border: 'solid' }}>
                    {rowScore(userField.space)}
                </Col>
                <Col xs={10}>
                    <Row className="card-tray">{userField.space.map(card => <UnitCard card={card} env={env} userField={true} key={card.id} />)}</Row>
                </Col>

            </Row>
            <br></br>
            {/* This row populates with cards drawn from a users deck.  */}
            <Row className="card-tray">
                {hand.map(card => <UnitCard card={card} hand={true} key={card.id + 1} />)}
            </Row>
        </Container>
    )
}

export default Battlefield;