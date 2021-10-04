const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');

const { getAllDogs /*, getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');

dogs.use(express.json());

dogs.get('/dogs', async (req, res) => {
    const name = req.query.name;
    try {
        let dogsTotal = await getAllDogs();
        if (name) { /* Si entra un query */
            let dogName = await dogsTotal.filter(
                dog => dog.name.toLowerCase().includes(name.toLowerCase())
            );
            dogName.length ?
                res.status(200).send(dogName) :
                res.status(404).send("Cann't find the dog with the name you are looking for")
        } else { /* Si no hay query en la URL */
            res.status(200).json(dogsTotal)
        }
    } catch (error) {
        res.status(404).send(error)
    }

});

dogs.post('/dog', async (req, res) => {
    const {
        name,
        height,
        weight,
        image,
        life_span,
        temperament,
        createdInDB
    } = req.body
    const createDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        image: image,
        life_span: life_span,
        createdInDB: createdInDB
    })
    const temperamentDB = await Temperament.findAll({
        where: { name: temperament },
        attributes: ['id']
    });
    createDog.addTemperament(temperamentDB)
    res.status(202).send('Dog was properly created')
});

dogs.get('/dogs/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        const allDogs = await getAllDogs();
        if (!idRaza) {
            res.status(404).json("Couldn't find the name on DBase")
        } else {
            const dog = allDogs.filter(dogui => dogui.id.toString() === idRaza);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = dogs;