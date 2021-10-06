const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs:action.payload
            }
        default:
            return state
    }
}

export default rootReducer;