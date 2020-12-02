import { Card } from 'react-bootstrap'
import chip from '../resources/chip.png'
const EnemyCard = () => {
    return (
        <Card
        className='card-unit'
        border='secondary'
        bg={'dark'}>
            <div className='card-content'>
                <Card.Img src={chip} />
            </div>
        </Card>
    )
}

export default EnemyCard