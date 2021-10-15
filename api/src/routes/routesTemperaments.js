const express = require('express');
const temperaments = express.Router();
const { Temperament/* , Dog */ } = require('../db');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getAllDogs /* , getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');

temperaments.use(express.json());

temperaments.get('/temperament',/* http://localhost:3001/temperament */ async (req, res) => {
    const allData = await axios.get(URL);
    try {
        let everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        /* Set para hacer UNIQUE :: Stackoverflow */
        let eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(el => {
            if (el) { // temperament : ,
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        eachTemperament = await Temperament.findAll();
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(404).send(error)
    }
});

temperaments.get('/dog/',/* http://localhost:3001/dog/?temperament=active */ async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (temperament === 'all') return everyDog
        else if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
});

temperaments.post('/temperament/:temperament', async (req, res) => {
    try{
    const newTemperament = req.params.temperament;
    const postedTemp = await Temperament.create({
       name: newTemperament,
    });
    return res.status(200).json(postedTemp)
    } catch (error) {
        res.status(404).send(error)
    }
});

module.exports = temperaments;