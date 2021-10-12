const express = require('express');
const dogs = express.Router();
const { Temperament, Dog } = require('../db');

const { getAllDogs /*, getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');

dogs.use(express.json());

dogs.get('/dogs', async (req, res) => {
    /* http://localhost:3001/dogs && http://localhost:3001/dogs/?name=Affenpinscher */
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
            res.status(404).json("There is no dog's with this name")
        }

    });

dogs.post('/dogs', async (req, res) => {
    const { // takes these properties to build the new dog
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        temperament,
    } = req.body;

    if (name && height_min && height_max && weight_min && weight_max && temperament) { // takes that data for the new dog  
        const createDog = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: `https://wallpaperaccess.com/full/390975.jpg`
        });
        temperament.map(async el => {
            const findTemp = await Temperament.findAll({
                where: { name: el }
            });
            createDog.addTemperament(findTemp);
            console.log(findTemp, createDog)
        })
        res.status(200).send(createDog);
    } else {
        res.status(404).send('Data needed to proceed is missing');
    }
})

dogs.get('/dogs/:idRaza', async (req, res) => {
     /* http://localhost:3001/dogs/7 */
    try {
        const { idRaza } = req.params;
        const allDogs = await getAllDogs();
        if (!idRaza) {
            res.status(404).json("Couldn't find the name on DBase")
        } else {
            const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
            res.status(200).json(dog)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = dogs;