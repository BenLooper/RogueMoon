import { Card } from 'react-bootstrap'

const UnitCard = ({ card }) => {
    return (
        <Card className="unit-card">
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