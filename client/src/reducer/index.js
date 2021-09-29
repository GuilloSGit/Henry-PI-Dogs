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
        case 'FILTER_CREATED':
            const allDogss = state.allDogs
            const createdFilter = action.payload === 'created' ?
                allDogss.filter(el => el.createdInDB) :
                allDogss.filter(el => !el.createdInDB)
            return{
                ...state,
                dogs: action.payload === 'all' ?
                    allDogss :
                    createdFilter
            }
        case 'ORDER_BY_BREED':
            const sortedArr = action.payload === 'asc' ?
                state.dogs.sort(function (a,b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function(a,b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            return{
                ...state,
                dogs: sortedArr
            }
        default:
            return state;
    }
}




export default rootReducer;