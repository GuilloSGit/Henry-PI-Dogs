const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    const apiInfo = await apiURL.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            // height: e.height.metric,
            // weight: e.weight.metric,
            // life_span: e.life_span,
        };
    });
    return apiInfo;
};

const getDBInfoDog = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfoDog();
    const DBInfo = await getDBInfoDog();
    const infoTotal = apiInfo.concat(DBInfo);
    return infoTotal;
};

module.exports = {
    getAllDogs, getApiInfoDog, getDBInfoDog
};