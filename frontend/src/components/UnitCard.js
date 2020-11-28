import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const UnitCard = ({ card, hand }) => {

    const dispatch = useDispatch()
    const env = useSelector((state) => state.env)
    let oldStrength = card.strength

    const playCard = () => {
        let role = card.role
        if (role == 'env') {
            //if it's an env card, put it in the shared env row
            dispatch({ type: "PLAY_ENV", card: card })
        }
        else {
            //puts the card in the correct array inside field 
            dispatch({ type: "PLAY_CARD", role: role, card: card })
        }
        //if a card has an ability, dispatch that ability 
        // if (card.ability) {
        //     dispatch({ type: card.ability.toUpperCase() })
        // }
    }

    useEffect(() => {
        //Cards look at env. When it changes, they run the corresponding action 
        //if they're in the field, their strength is reduced accordingly
        //if there isn't anything 
        let conditions = env.map(card => card.ability)
        if ((card.role === 'foot') && (conditions.includes('cold'))) {
            dispatch({type:"COLD", card:card})
        }
        else if ((card.role === 'ground') && (conditions.includes('rocky'))) {
            dispatch({type:'ROCKY', card:card})
        }
        else if ((card.role === 'space') && (conditions.includes('flare'))) {
            dispatch({type:'FLARE', card:card})
        }
        else if (conditions.includes('develop')){
            dispatch({type:'DEVELOP'})
        }
        else {
            card.strength = oldStrength
        }
    },[env])

    return (
        <Card className="unit-card" onClick={hand ? () => playCard() : null}>
            <Card.Img variant='top' src={card.image} />
            <Card.ImgOverlay>
                <Card.Text className="strength">{card.strength}</Card.Text>
                <Card.Text className="role">{card.role}</Card.Text>
                <Card.Text className="ability">{card.ability}</Card.Text>
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