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
                dogs: action.payload
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

        case 'ORDER_BY_BREED':
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