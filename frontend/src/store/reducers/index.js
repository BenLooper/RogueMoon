export const initialState = {
    //login
    usernameInput: '',
    passwordInput: '',
    user: {},
    ownedCards: [],
    games: [],

    //gameboard
    gameOn: false,
    gameCards: [],
    hand: [],
    userDiscard: [],
    enemyDiscard: [],
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
    enemyScore:10,

    //passing
    userPass: false,
    enemyPass: true,

    //reactors 
    userReactors: 2,
    enemyReactors: 2,

    userVictory: null 
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
            return { ...state, user: action.user, ownedCards: action.ownedCards, games: action.games }
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

            //Remove the card from hand
            let updatedHand = state.hand.filter(card => card.id !== action.card.id)

            //Update the row, then update the field with that row 
            let updatedRow = [...state.userField[role], action.card]
            let updatedField = { ...state.userField, [role]: updatedRow }

            //Find the new total, including the added card
            let newTotal = newTotalScore(updatedField)
            return { ...state, userField: updatedField, hand: updatedHand, userScore: newTotal }
            break;

        case 'USER_PASS':
            return {...state, userPass:true}
            break;
        
        case 'ROUND_OVER':
            if (state.userScore >= state.enemyScore){
                return {...state, enemyReactors: (state.enemyReactors - 1)}
            }
            else if (state.userScore < state.enemyScore){
                return {...state, userReactors: (state.userReactors - 1)}
            }
            break;
        
        case 'RESET_BOARD':
            //This is super ugly but it works. We're setting the discard to everything in userField
            //And then we're hardcoding in a clean new userField
            let newDiscard = Object.values(state.userField).splice(0).flat();
            let cleanUserField = {userField: {
                space: [],
                ground: [],
                foot: []
            }}
            return {...state, 
                userField:cleanUserField.userField, 
                //This will need to set enemyPass to false as well (once and enemy can play)
                userPass:false, 
                userDiscard:newDiscard,
                //reset scores, set to 10 to simulate game
                userScore:0,
                enemyScore:10}
            break;

        case 'GAME_OVER':
            return {...state, 
                userVictory:action.userVictory, 
                games: action.games, 
                userReactors: 2,
                enemyReactors: 2,
                gameOn:false,
                userDiscard:[]}
            break;

        default:
            return state
    }
}