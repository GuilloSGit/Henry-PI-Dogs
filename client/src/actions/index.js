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

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({type: 'GET_TEMPERAMENTS', payload:json.data});
    }
}

export function postDog(payload){
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/dog', payload);
        return json;
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

export function getDogsByName(payload){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterDogsByTemperament(payload){
    return async function(dispatch){
        try {
            var json = await axios.post.get(`http://localhost:3001/temperament?temperament=${payload}`); 
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload:json.data
            })  
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_BREED',
        payload
    }
}