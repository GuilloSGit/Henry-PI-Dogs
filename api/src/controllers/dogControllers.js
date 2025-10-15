const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const dogs = require('../routes/routesDog');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    console.log('Primer elemento de la API:', JSON.stringify(apiURL.data[0], null, 2));
    console.log('Tiene propiedad image?', 'image' in apiURL.data[0]);
    console.log('Tiene referencia de imagen?', 'reference_image_id' in apiURL.data[0]);
    
    const apiInfo = await apiURL.data.map(e => {        
        // Asegurarse de que weight y height existan antes de intentar acceder a .metric
        const weight = e.weight?.metric || '0 - 0';
        const height = e.height?.metric || '0 - 0';
        
        return {
            id: e.id,
            name: e.name,
            image: e.reference_image_id 
                ? `https://cdn2.thedogapi.com/images/${e.reference_image_id}.jpg` 
                : 'https://cdn2.thedogapi.com/images/Hyq1ge9VQ.jpg',
            breed_group: e.breed_group || 'Not specified',
            temperament: e.temperament || 'No temperament information',
            life_span: e.life_span || 'Unknown',
            weight_min: parseInt(weight.split('-')[0].trim()) || 0,
            weight_max: parseInt(weight.split('-')[1]?.trim()) || 0,
            height_min: parseInt(height.split('-')[0]?.trim()) || 0,
            height_max: parseInt(height.split('-')[1]?.trim()) || 0,
            reference_image_id: e.reference_image_id || null,
        };
    });
    return apiInfo;
};

const getDBInfoDog = async () => {
    var dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogsDB;
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo);
    console.log(infoTotal)
    return infoTotal;
};

module.exports = {
    getAllDogs, getApiInfoDog, getDBInfoDog
};