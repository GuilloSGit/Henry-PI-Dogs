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
            const sortedDogs = [...state.filteredDogs].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                const result = action.payload === 'asc'
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
                return result;
            });
            return {
                ...state,
                filteredDogs: sortedDogs
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
            const dogDetail = state.allDogs.find(dog => dog.id === action.payload);
            return {
                ...state,
                details: dogDetail ? [dogDetail] : []
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
                filteredDogs: state.allDogs.filter(dog => dog.breedGroup && dog.breedGroup.toLowerCase().includes(action.payload.toLowerCase()))
            };


        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                filteredDogs: state.allDogs.filter(dog => dog.temperament && dog.temperament.toLowerCase().includes(action.payload.toLowerCase()))
            };


        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload
            };


        case 'FILTER_BY_MAX_WEIGHT':
            return {
                ...state,
                filteredDogs: state.allDogs.filter(dog => {
                    if (!dog.weight) return false;
                    const [min, max] = dog.weight.split('-').map(Number);
                    return max <= action.payload;
                })
            };


        case 'FILTER_BY_MIN_WEIGHT':
            return {
                ...state,
                filteredDogs: state.allDogs.filter(dog => {
                    if (!dog.weight) return false;
                    const [min] = dog.weight.split('-').map(Number);
                    return min >= action.payload;
                })
            };


        default:
            return state;
    }
}


export default rootReducer;

