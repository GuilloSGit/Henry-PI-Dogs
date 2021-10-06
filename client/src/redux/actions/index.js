import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload:json.data
        });
    }
}

export function filterDogsByTemperament(payload){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/dog/?temperament=${payload}`); 
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload:json.data
            })  
        } catch (error) {
            console.log(error)
        }
    }
}