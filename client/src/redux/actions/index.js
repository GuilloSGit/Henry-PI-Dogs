import axios from 'axios';
import { GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, POST_DOG } from './types';

function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
}

function getDogById(id) {
    return {
        type: GET_DOG_BY_ID,
        payload: id
    };
};

function filterByTemperament(temperament) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament
    };
};

function filterDogsByMAXWeight(payload) {
    return {
        type: FILTER_BY_MAX_WEIGHT,
        payload
    }
}

function filterDogsByMINWeight(payload) {
    return {
        type: FILTER_BY_MIN_WEIGHT,
        payload
    }
}

function getDogsByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_DOGS_BY_NAME,
            payload: data
        });
    };
}

function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperament');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: GET_TEMPERAMENTS_LIST,
            payload: listOfTemperaments
        });
    }
}

function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/dogs', payload);
        return response;
    }
}

function getDogsByBreed(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
            return dispatch({
                type: GET_DOGS_BY_BREED,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/breedGroups');
        return dispatch({
            type: GET_BREEDS,
            payload: json.data
        });
    }
}

function filterDogsByTemperament(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`);
            return dispatch({
                type: GET_DOGS_BY_TEMP,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: DELETE_DETAILS
    })
}
}
export {
    getDogs,
    getDogById,
    getDogsByName,
    getDogsByBreed,
    getTemperamentsList,
    filterByTemperament,
    getBreeds,
    deleteDetails,
    filterDogsByMAXWeight,
    filterDogsByMINWeight,
    orderByWeight,
    orderByName,
    postDog,
    filterCreated,
    getDetails
};