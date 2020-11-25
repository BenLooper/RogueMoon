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
    enemyGameCards: [],
    hand: [],
    enemyHand: [],
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
    enemyScore:0,

    //passing
    userTurn: true,
    userPass: false,
    enemyPass: false,

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
            return { ...state, user: action.user, ownedCards: action.ownedCards, games: action.games, gameOn:false }
            break;

        case 'SET_GAME_CARDS':
            //TODO -> Gets sent a list of chosen cards to set as gameCards from the selection screen
            return { ...state, gameCards: state.ownedCards, enemyGameCards: state.ownedCards, gameOn: true }
            break;

        case 'SET_HAND':
            //Separate from game cards because hand is drawn in the battlefield, not the selection screen
            //TODO -> Hand is randomly drawn from gameCards
            let hand = state.gameCards.slice(5, 10);
            return { ...state, hand: hand , enemyHand: hand}
            break;

        case 'PLAY_CARD':
            //Possible change --> send over something to indicate whether it's the enemy or user 
            let role = action.role

            //Remove the card from hand
            let updatedUserHand = state.hand.filter(card => card.id !== action.card.id)

            //Update the row, then update the field with that row 
            let updatedUserRow = [...state.userField[role], action.card]
            let updatedUserField = { ...state.userField, [role]: updatedUserRow }

            //Find the new total, including the added card
            let newUserTotal = newTotalScore(updatedUserField)
            return { ...state, userField: updatedUserField, hand: updatedUserHand, userScore: newUserTotal }
            break;
        
        case 'ENEMY_PLAY':
            //grab card and remove it from hand
            let chosenCard = state.enemyHand.slice(0,1)[0]

            let updatedEnemyHand = state.enemyHand.filter(card => card.id !== chosenCard.id)

            let updatedEnemyRow = [...state.enemyField[chosenCard.role], chosenCard]
            let updatedEnemyField = { ...state.enemyField, [chosenCard.role]: updatedEnemyRow }

            let newEnemyTotal = newTotalScore(updatedEnemyField)
            return { ...state, enemyField: updatedEnemyField, enemyHand: updatedEnemyHand, enemyScore: newEnemyTotal }
            break;

        case 'ENEMY_PASS':
            return {...state, enemyPass:true, userTurn: true}
            break;

        case 'USER_PASS':
            return {...state, userPass:true, userTurn:false}
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
            let newUserDiscard = Object.values(state.userField).splice(0).flat();
            let newEnemyDiscard = Object.values(state.enemyField).splice(0).flat();
            let cleanUserField = {userField: {
                space: [],
                ground: [],
                foot: []
            }}
            let cleanEnemyField = {enemyField: {
                space: [],
                ground: [],
                foot: []
            }}
            return {...state, 
                userField:cleanUserField.userField, 
                enemyField:cleanEnemyField.enemyField,
                userPass:false, 
                enemyPass:false,
                userDiscard:[...state.userDiscard,...newUserDiscard],
                enemyDiscard:[...state.enemyDiscard,...newEnemyDiscard],
                userScore:0,
                enemyScore:0}
            break;
        
        case 'GAME_OVER':
            return {...state, 
                userVictory:action.userVictory, 
                games: action.games, 
                userReactors: 2,
                enemyReactors: 2,
                gameOn:false,
                userDiscard:[],
                enemyDiscard:[]}
            break;

        default:
            return state
    }
}