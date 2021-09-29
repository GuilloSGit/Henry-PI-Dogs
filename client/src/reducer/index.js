const initialState = {
    dogs : [],
    allDogs : [],
    temperaments: []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'FILTER_BY_MAX_WEIGHT':
            const allDogs = state.allDogs
            const weightMAXFiltered = action.payload === 'all' ?
                allDogs:
                allDogs.filter(el=>el.max_weight === action.payload)
            return{
                ...state,
                dogs:weightMAXFiltered
            }
        case 'FILTER_BY_MIN_WEIGHT':
            const allDoguis = state.allDogs
            const weightMINFiltered = action.payload === 'all' ?
                allDoguis:
                allDoguis.filter(el=>el.min_weight === action.payload)
            return{
                ...state,
                dogs:weightMINFiltered
            }

        default:
            return state;
    }
}




export default rootReducer;