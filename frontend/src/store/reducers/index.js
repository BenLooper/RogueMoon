export const initialState = {
    //anytime I need new state, must add it here
    //use very specific names
    //update with case in reducer 
    usernameInput:'',
    passwordInput:'',
    //this will be user object we get back from login
    user:{},
    ownedCards:[],
    token:''
}

export const reducer = (state,action) => {
    switch (action.type){

        case 'CHANGE_USERNAME_INPUT':
            return {...state,usernameInput:action.value}
            break;
        
        case 'CHANGE_PASSWORD_INPUT':
            return {...state,passwordInput:action.value}
            break;

        case 'SET_USER':
            return {...state,user:action.user,token:action.token,ownedCards:action.ownedCards}
            break;
        
        default: 
            return state
    }
}