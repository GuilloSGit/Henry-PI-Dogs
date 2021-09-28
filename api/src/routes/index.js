const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Temperament, Dog} = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/dogs', dogs)

const getApiInfo = async () => {
    const apiURL = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const apiInfo = await apiURL.data.map(e => {
        return {
            name: e.name,
            breed_group: e.breed_group,
            max_height: (e.height.metric.split(' - ')).pop(),
            max_weight: (e.weight.metric.split(' - ')).pop(),
            image: e.image.url,
            max_life_span: (e.life_span.split(' - ')).pop(),
            breed_group: e.breed_group,
            temperament: e.temperament,
        };
    });
    return apiInfo;
};

const getDBInfo = async () => {
    return await Dog.findAll ({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    });
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const DBInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(DBInfo);
    return infoTotal;
};

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if(name){ /* Si entra un query */
        let dogName = await dogsTotal.filter(
            elem => elem.name.toLowerCase().includes(name.toLowerCase())
        );
        dogName.length ? 
            res.status(200).send(dogName) :
            res.status(404).send("No encontramos la raza que está buscando")
    } else { /* Si no hay query en la URL */
        res.status(200).json(dogsTotal)
    }
});

router.get('/temperaments', async (req, res) => {
    
    res.status(200).json(eachTemperament);
});

/* 
    en esta ruta quiero componer cada temperamento en orden alfabético y meterlo en la db, pero no me da error ni me carga la tabla...
*/

module.exports = router;
