const { Router } = require('express');
const { Op } = require ('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Temperament, Dog } = require('../db');
const router = Router();
const URL = `https://api.thedogapi.com/v1/breeds`;
require('dotenv').config();
const { API_KEY } = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/dogs', dogs)

const getApiInfoDog = async () => {
    const apiURL = await axios.get(URL);
    const apiInfo = await apiURL.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            min_height: (e.height.metric.slice(0, 2).trim()),
            max_height: (e.height.metric.slice(4, 7).trim()),
            min_weight: (e.weight.metric.slice(0, 2).trim()),
            max_weight: (e.weight.metric.slice(4, 7).trim()),
            min_life_span: (e.life_span.slice(0, 2).trim()),
            max_life_span: (e.life_span.slice(4, 7).trim()),
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

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name) { /* Si entra un query */
        let dogName = await dogsTotal.filter(
            elem => elem.name.toLowerCase().includes(name.toLowerCase())
        );
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send("Cann't find the breed you are looking for")
    } else { /* Si no hay query en la URL */
        res.status(200).json(dogsTotal)
    }
});


router.post('/dogs', async (req, res) => {
    const { name, min_height, max_height, min_weight, max_weight, image, min_life_span, max_life_span, temperament, createdInDB } = req.body
    
    const dogCreated = await Dog.create({
        name: name, min_height: min_height, max_height: max_height, min_weight: min_weight, max_weight: max_weight, image: image, min_life_span: min_life_span, max_life_span: max_life_span, createdInDB: createdInDB
    })

    const temperamentDB = await Temperament.findAll({
        where: { name: temperament }
    });
    dogCreated.addTemperament(temperamentDB)
    res.status(202).send('Dog was properly created')
});

router.get('/temperaments', async (req, res) => {
    const allData = await axios.get(URL);
    const everyTemperament = allData.data.map(el => el.temperament).map(el => el?.split(', '));
    /* Set para hacer UNIQUE :: Stackoverflow */
    const eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach(el => {
        if (el) {
            Temperament.findOrCreate({
                where: { name: el }
            })
        }
    });
    res.status(200).json(eachTemperament);
})

/* router.get('/temperament', async(req, res)=>{
    const temperament = req.query.temperament;
    let dogsTotal = await getAllDogs();
    const dogSearchResult = dogsTotal.map((e) => {
        if(e.temperament === temperament && e.temperament !== null ) return e
    })
    res.status(200).json(dogSearchResult)
}) */

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    if (!idRaza) {
        res.status(404).json("Couldn't find the breed group")
    } else {
        const dog = allDogs.filter(dogui => dogui.id.toString() === idRaza);
        res.status(200).json(dog)
    }
})

module.exports = router;
