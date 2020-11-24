import { Card } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'

const UnitCard = ({ card, hand }) => {
    
    const playCard = () => {
        let role = card.role
        dispatch({type:"PLAY_CARD", role:role, card:card})
    }
    
    const dispatch = useDispatch()

    return (
        <Card className="unit-card" onClick={hand?()=>playCard():null}>
            <Card.Img variant='top' src={card.image} />
            <Card.ImgOverlay>
                <Card.Text className="strength">{card.strength}</Card.Text>
                <Card.Text className="role">{card.role}</Card.Text>
            </Card.ImgOverlay>
            {/* <Card.Body className="text-center">
                <Card.Title>{card.name}</Card.Title>
                <Card.Subtitle>{card.ability}</Card.Subtitle>
                <Card.Text>{card.flavor_text}</Card.Text>
            </Card.Body> */}
        </Card>
    )
}

export default UnitCard;