export const initialState = {
    //login
    usernameInput: '',
    passwordInput: '',
    user: {},
    ownedCards: [],
    token: '',

    //gameboard
    gameOn:false,
    gameCards: [],
    enemySpace: [],
    enemyGround: [],
    enemyFoot: [],
    userFoot: [],
    userGround: [],
    userSpace: [],
    hand: []
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
            return {...state,gameCards:state.ownedCards,gameOn:true}
            break;

        case 'SET_HAND':
            //TODO -> Hand is randomly drawn from gameCards
            let hand = state.gameCards.slice(5,10);
            return {...state, hand:hand}
            break;

        case 'PLAY_CARD':
            //Possible change --> send over something to indicate whether it's the enemy or user 
            let role = `user${action.role}`
            let updatedHand = state.hand.filter(card => card.id !== action.card.id)
            let updatedRow = [...state[role], action.card]
            return { ...state, [role]: updatedRow, hand: updatedHand }
            break;
        
        default:
            return state
    }
}