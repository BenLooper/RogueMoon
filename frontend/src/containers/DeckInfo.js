import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import passFlag from '../resources/passFlag.png'

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
        <div class="pass-panel">
            <Container className='flag-tray'>
                <Row >
                    <Col>
                        {enemyPass ? <Image src={passFlag} /> : null}
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="pass-button-tray">
                <Row>
                    <Col>
                        <Button
                            style={{fontFamily:'impact', color:'black'}}
                            variant='danger'
                            className="pass-button"
                            disabled={userTurn && !(userPass) ? false : true}
                            onClick={() => pass()}
                            size='lg'>
                            PASS
                        </Button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Container className="flag-tray" >
                <Row>
                    <Col>
                        {userPass ? <Image src={passFlag} /> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DeckInfo;