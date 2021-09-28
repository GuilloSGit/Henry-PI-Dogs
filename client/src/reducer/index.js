const initialState = {
    dogs : []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload
            }    
        default:
            return;
    }
}




export default rootReducer;