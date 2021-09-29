import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs",{});
        
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function filterDogsByMAXWeight(payload){
    return {
        type: 'FILTER_BY_MAX_WEIGHT',
        payload
    }
}

export function filterDogsByMINWeight(payload){
    return {
        type: 'FILTER_BY_MIN_WEIGHT',
        payload
    }
}
