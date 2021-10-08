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

        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            }

        case 'FILTER_DOGS_BY_BREED':
            return {
                ...state,
                allDogs: action.payload
            }

        case 'GET_FILTER_CREATED':
            const create = state.allDogs;
            const filterCreate = action.payload === 'created' ? create.filter(d => d.createdInDB) : create.filter(d => !d.createdInDB);
            return{
                ...state,
                dogs:filterCreate
            }

        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortedArr
            }

        default:
            return state
    }
}

export default rootReducer;