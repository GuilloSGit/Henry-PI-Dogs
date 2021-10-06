const express = require('express');
const breeds = express.Router();
const {Temperament, Dog} = require('../db');
const { getAllDogs } = require('../controllers/dogControllers')

breeds.use(express.json());

breeds.get('/breedGroups', async (req, res) => {
    try {
        const everyDog = await getAllDogs();
    const everyBreedGroup = everyDog?.map((dog) => {
        if (!dog.breed_group) {
            "No info"
        }else { return dog.breed_group }
    });
    const eachBreedGroup = [...new Set(everyBreedGroup.flat())]
    res.status(200).json(eachBreedGroup)
    } catch (error) {
        console.log(error, "Error on breeds route")
    }
    
});

breeds.get('/breedGroup', async (req, res) => {
    const breedGroup = req.query.breedGroup;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (dog.breed_group !== undefined) { return (dog.breed_group.toLowerCase()).includes(breedGroup.toLowerCase()) }
    });
    res.status(200).json(dogSearchResult)
});

module.exports = breeds;