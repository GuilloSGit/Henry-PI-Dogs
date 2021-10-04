const express = require('express');
const temperaments = express.Router();
const { Temperament/* , Dog */ } = require('../db');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getAllDogs /* , getApiInfoDog, getDBInfoDog */ } = require('../controllers/dogControllers');

temperaments.use(express.json());

temperaments.get('/temperament', async (req, res) => {
    const allData = await axios.get(URL);
    try {
        const everyTemperament = allData.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        /* Set para hacer UNIQUE :: Stackoverflow */
        const eachTemperament = [...new Set(everyTemperament.flat())];
        eachTemperament.forEach(el => {
            if (el) { // temperament : ,
                Temperament.findOrCreate({
                    where: { name: el }
                })
            }
        });
        eachTemperament.sort()
        res.status(200).json(eachTemperament);
    } catch (error) {
        res.status(404).send(error)
    }
});

temperaments.get('/dog/', async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (dog.temperament) {
            return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase())
        }
    });
    res.status(200).json(dogSearchResult)
});

module.exports = temperaments;