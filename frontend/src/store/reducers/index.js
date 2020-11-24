export const initialState = {
    //login
    usernameInput: '',
    passwordInput: '',
    user: {},
    ownedCards: [],
    token: '',

    //gameboard
    gameOn: false,
    gameCards: [],
    hand: [],
    enemyField: {
        space: [],
        ground: [],
        foot: []
    },
    userField: {
        space: [],
        ground: [],
        foot: []
    },
    
    //scores 
    userScore:0,
    enemyScore:0
}

const rowScore = (array) => {
    let score = 0
    for (let i = 0; i < array.length; i++) {
        score += array[i].strength
    }
    return score
}

const newTotalScore = (field) => {
    //we iterate through the field values (rows), and get the total of each rowScore
    let total = Object.values(field).reduce((total, row) => total + (rowScore(row)), 0)
    return total
}

export const reducer = (state, action) => {
    switch (action.type) {

        case 'CHANGE_USERNAME_INPUT':
            return { ...state, usernameInput: action.value }
            break;

        case 'CHANGE_PASSWORD_INPUT':
            return { ...state, passwordInput: action.value }
            break;

        case 'SET_USER':
            return { ...state, user: action.user, token: action.token, ownedCards: action.ownedCards }
            break;

        case 'SET_GAME_CARDS':
            //TODO -> Gets sent a list of chosen cards to set as gameCards
            return { ...state, gameCards: state.ownedCards, gameOn: true }
            break;

        case 'SET_HAND':
            //TODO -> Hand is randomly drawn from gameCards
            let hand = state.gameCards.slice(5, 10);
            return { ...state, hand: hand }
            break;

        case 'PLAY_CARD':
            //Possible change --> send over something to indicate whether it's the enemy or user 
            let role = action.role
            let updatedHand = state.hand.filter(card => card.id !== action.card.id)
            let updatedRow = [...state.userField[role], action.card]
            let updatedField = { ...state.userField, [role]: updatedRow }
            let newTotal = newTotalScore(updatedField)
            return { ...state, userField: updatedField, hand: updatedHand, userScore: newTotal }
            break;

        default:
            return state
    }
}