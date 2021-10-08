const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs:action.payload
            }

        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                allDogs: action.payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
            [...state.dogs].sort(function(a,b) {
                if(a.name > b.name) { return 1 }
                if(b.name > a.name) { return -1 }
                return 0;
            }) :
            [...state.dogs].sort(function(a,b) {
                if(a.name > b.name) { return -1; }
                if(b.name > a.name) { return 1; }
                return 0;
            })
            return {
                ...state,
                allDogs: sortedArr
            }
        
        case 'FILTER_CREATED':
            const allDogs = state.dogs
            const createdFilter = action.payload === 'created' ?
            allDogs.filter(el => el.createdInDB) :
            allDogs.filter(el => !el.createdInDB);
            return{
                ...state,
                allDogs:action.payload === 'all' ?
                state.allDogs :
                createdFilter
            }

        default:
            return state
    }
}

export default rootReducer;