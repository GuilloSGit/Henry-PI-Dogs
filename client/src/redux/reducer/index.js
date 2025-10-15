import { FILTER_BY_TEMPERAMENT } from "../actions/types";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
    details: [],
    filteredDogs: [],
    dogDetail: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                filteredDogs: action.payload
            };
        
        case 'GET_DOG_BY_ID':
            return {
                ...state,
                dogDetail: action.payload
            };
            
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };
            
        case 'FILTER_BY_TEMPERAMENT':
            if (action.payload === 'all') {
                return {
                    ...state,
                    allDogs: state.dogs
                };
            }
            const filteredByTemperament = state.dogs.filter(dog => 
                dog.temperament && 
                dog.temperament.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                allDogs: filteredByTemperament
            };
            
        case 'ORDER_BY_NAME':
            const sortedDogs = [...state.allDogs].sort((a, b) => {
                if (action.payload === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            return {
                ...state,
                allDogs: sortedDogs
            };
            
        case 'FILTER_BY_ORIGIN':
            if (action.payload === 'all') {
                return {
                    ...state,
                    allDogs: state.dogs
                };
            }
            const filteredByOrigin = state.dogs.filter(dog => 
                dog.origin && 
                dog.origin.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                allDogs: filteredByOrigin
            };
        
        case 'ORDER_BY_WEIGHT':
            const sortedByWeight = [...state.allDogs].sort((a, b) => {
                if (action.payload === 'asc') {
                    return a.weight.localeCompare(b.weight);
                } else {
                    return b.weight.localeCompare(a.weight);
                }
            });
            return {
                ...state,
                allDogs: sortedByWeight
            };

        case 'FILTER_CREATED':
            if (action.payload === 'all') {
                return {
                    ...state,
                    allDogs: state.dogs
                };
            }
            const filteredByCreated = state.dogs.filter(dog => 
                dog.createdInDb && 
                dog.createdInDb.toLowerCase().includes(action.payload.toLowerCase())
            );
            return {
                ...state,
                allDogs: filteredByCreated
            };

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };
            
        case 'DELETE_DETAILS':
            return {
                ...state,
                details: []
            };

        case 'POST_DOG':
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            };

        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            };
            
        case 'GET_DOGS_BY_BREED':
            return {
                ...state,
                allDogs: action.payload
            };
            
        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                allDogs: action.payload
            };

        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload
            };
            
        default:
            return state;
    }
}

export default rootReducer;