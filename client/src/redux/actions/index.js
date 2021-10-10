import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getDogsByName(name) {
    return async function (dispatch) {
      const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      dispatch({ type: "GET_DOGS_BY_NAME", payload: data });
    };
  }

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperament');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        });
    }
}

export function getDogsByBreed(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_BREED',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

export function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/breedGroups');
        return dispatch({
            type: 'GET_BREEDS',
            payload: json.data
        });
    }
}

export function filterDogsByTemperament(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}
