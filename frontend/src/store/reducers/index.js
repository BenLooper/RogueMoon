export const initialState = {
    //login
    usernameInput: '',
    passwordInput: '',
    user: {},
    ownedCards: [],
    games: [],

    //gameboard
    gameOn: false,
    gameStart: false,
    drawHands: false,
    gameCards: [],
    enemyGameCards: [],
    hand: [],
    enemyHand: [],
    userDiscard: [],
    enemyDiscard: [],
    enemyField: {
        space: [],
        ground: [],
        foot: [],
        other: []
    },
    userField: {
        space: [],
        ground: [],
        foot: [],
        other: []
    },
    env: [],

    //scores 
    userScore: 0,
    enemyScore: 0,

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
            return { ...state, user: action.user, ownedCards: action.ownedCards, games: action.games}
            break;

        case 'START_GAME':
            return{...state, gameOn:true}
            break; 

        case 'SET_GAME_CARDS':
            return{...state, gameCards: action.gameCards}
            break;

        case 'SET_ENEMY_GAME_CARDS':
            return { ...state, enemyGameCards: action.enemyGameCards, drawHands: true }
            break;

        case 'SET_HANDS':
            //Separate from game cards because hand is drawn in the battlefield, not the selection screen

            let newHand = state.gameCards.slice(0, 10)
            let newEnemyHand = state.enemyGameCards.slice(0, 10)

            let newGameCards = state.gameCards.filter(card => !(newHand.includes(card)))
            let newEnemyGameCards = state.enemyGameCards.filter(card => !(newEnemyHand.includes(card)))
            return {
                ...state,
                gameStart:true,
                gameCards: newGameCards,
                enemyGameCards: newEnemyGameCards,
                hand: newHand,
                enemyHand: newEnemyHand,
                drawHands: false
            }
            break;

        case 'PLAY_CARD':
            let role = action.role

            //Remove the card from hand
            let updatedUserHand = state.hand.filter(card => card.id !== action.card.id)

            //Update the row, then update the field with that updated row 
            let updatedUserRow = [...state.userField[role], action.card]
            let updatedUserField = { ...state.userField, [role]: updatedUserRow }

            //Find the new total, including the added card
            let newUserTotal = newTotalScore(updatedUserField)
            return { ...state, userField: updatedUserField, hand: updatedUserHand, userScore: newUserTotal }
            break;

        case 'PLAY_ENV':
            //check to see if env already has that condition
            let conditions = state.env.map(card => card.ability)
            if (conditions.includes(action.card.ability)) {
                return {
                    ...state,
                    userDiscard: [...state.userDiscard, action.card],
                    hand: state.hand.filter(card => card.id !== action.card.id)
                }
            }
            else {
                return {
                    ...state,
                    env: [...state.env, action.card],
                    hand: state.hand.filter(card => card.id !== action.card.id)
                }
            }

        case 'ENEMY_PLAY':
            let randomCard
            let chosenCard
            if (state.enemyHand.length > 1) {
                randomCard = Math.floor(Math.random() * Math.floor(state.enemyHand.length))
                chosenCard = state.enemyHand[randomCard]
            }
            else {
                if (state.userScore >= state.enemyScore) {
                    chosenCard = state.enemyHand[0]
                }
                else {
                    return { ...state, enemyPass: true }
                }
            }

            if (chosenCard.role === 'env') {
                let conditions = state.env.map(card => card.ability)
                if (conditions.includes(chosenCard.ability)) {
                    return {
                        ...state,
                        enemyDiscard: [...state.enemyDiscard, chosenCard],
                        enemyHand: state.enemyHand.filter(card => card.id !== chosenCard.id)
                    }
                }
                else {
                    return {
                        ...state,
                        env: [...state.env, chosenCard],
                        enemyHand: state.enemyHand.filter(card => card.id !== chosenCard.id)
                    }
                }
            }
            else {
                let updatedEnemyHand = state.enemyHand.filter(card => card.id !== chosenCard.id)

                let updatedEnemyRow = [...state.enemyField[chosenCard.role], chosenCard]
                let updatedEnemyField = { ...state.enemyField, [chosenCard.role]: updatedEnemyRow }

                let newEnemyTotal = newTotalScore(updatedEnemyField)
                return { ...state, enemyField: updatedEnemyField, enemyHand: updatedEnemyHand, enemyScore: newEnemyTotal }
            }
            break;

        case 'ENEMY_PASS':
            return { ...state, enemyPass: true, userTurn: true }
            break;

        case 'USER_PASS':
            return { ...state, userPass: true }
            break;

        case 'END_TURN':
            return { ...state, userTurn: !(state.userTurn) }

        case 'ROUND_OVER':
            if (state.userScore >= state.enemyScore) {
                return { ...state, enemyReactors: (state.enemyReactors - 1)}
            }
            else if (state.userScore < state.enemyScore) {
                return { ...state, userReactors: (state.userReactors - 1)}
            }
            break;

        case 'RESET_BOARD':
            //This is super ugly but it works. We're setting the discard to everything in userField
            //And then we're hardcoding in new clean fields
            let newUserDiscard = Object.values(state.userField).splice(0).flat();
            let newEnemyDiscard = Object.values(state.enemyField).splice(0).flat();
            let cleanUserField = {
                userField: {
                    space: [],
                    ground: [],
                    foot: [],
                    other: []
                }
            }
            let cleanEnemyField = {
                enemyField: {
                    space: [],
                    ground: [],
                    foot: [],
                    other: []
                }
            }
            return {
                ...state,
                userField: cleanUserField.userField,
                enemyField: cleanEnemyField.enemyField,
                userPass: false,
                enemyPass: false,
                userTurn: (state.userScore >= state.enemyScore ? true : false),
                env: [],
                userDiscard: [...state.userDiscard, ...newUserDiscard],
                enemyDiscard: [...state.enemyDiscard, ...newEnemyDiscard],
                userScore: 0,
                enemyScore: 0
            }
            break;

        case 'GAME_OVER':
            return {
                ...state,
                userVictory: action.userVictory,
                games: action.games,
                userReactors: 2,
                enemyReactors: 2,
                env: [],
                gameOn: false,
                gameStart:false,
                userPass: false,
                enemyPass: false,
                userDiscard: [],
                enemyDiscard: []
            }
            break;


        // ABILITIES 

        case 'DEVELOP':
            console.log(action.userField)
            console.log(action.oldStrength)
            let developedUserFoot = state.userField.foot.map(card => {
                if (card.id === action.card.id) {
                    console.log(card.strength, action.oldStrength)
                    card.strength = action.oldStrength
                    console.log(card.strength, action.oldStrength)
                };
                return card
            })
            let developedUserGround = state.userField.ground.map(card => {
                if (card.id === action.card.id) {
                    card.strength = action.oldStrength
                };
                return card
            })
            let developedUserSpace = state.userField.space.map(card => {
                if (card.id === action.card.id) {
                    card.strength = action.oldStrength
                };
                return card
            })
            let developedEnemyFoot = state.enemyField.foot.map(card => {
                if (card.id === action.card.id) {
                    card.strength = action.oldStrength
                };
                return card
            })
            let developedEnemyGround = state.enemyField.ground.map(card => {
                if (card.id === action.card.id) {
                    card.strength = action.oldStrength
                };
                return card
            })
            let developedEnemySpace = state.enemyField.space.map(card => {
                if (card.id === action.card.id) {
                    card.strength = action.oldStrength
                };
                return card
            })

            let developedUserField = { ...state.userField, foot: developedUserFoot, ground: developedUserGround, space: developedUserSpace }
            let developedEnemyField = { ...state.enemyField, foot: developedEnemyFoot, ground: developedEnemyGround, space: developedEnemySpace }

            return { ...state, env: [], userField: developedUserField, enemyField: developedEnemyField }
            break;

        case 'COLD':
            //change a card's strength to 1 if it's in the field, in the foot row 
            let coldRow = state.userField.foot.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let coldEnemyRow = state.enemyField.foot.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let coldUserField = { ...state.userField, foot: coldRow }
            let coldEnemyField = { ...state.enemyField, foot: coldEnemyRow }

            return { ...state, userField: coldUserField, enemyField: coldEnemyField, userScore: newTotalScore(coldUserField), enemyScore: newTotalScore(coldEnemyField) }
            break;

        case 'ROCKY':
            let rockyRow = state.userField.ground.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let rockyEnemyRow = state.enemyField.ground.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let rockyUserField = { ...state.userField, ground: rockyRow }
            let rockyEnemyField = { ...state.enemyField, ground: rockyEnemyRow }

            return { ...state, userField: rockyUserField, enemyField: rockyEnemyField, userScore: newTotalScore(rockyUserField), enemyScore: newTotalScore(rockyEnemyField) }

        case 'FLARE':
            let flareRow = state.userField.space.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let flareEnemyRow = state.enemyField.space.map(card => {
                if (card.id === action.card.id) {
                    card.strength = 1
                };
                return card
            })
            let flareUserField = { ...state.userField, space: flareRow }
            let flareEnemyField = { ...state.enemyField, space: flareEnemyRow }

            return { ...state, userField: flareUserField, enemyField: flareEnemyField, userScore: newTotalScore(flareUserField), enemyScore: newTotalScore(flareEnemyField) }

        default:
            return state
    }
}