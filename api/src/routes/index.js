const { Router } = require('express');

const axios = require('axios')
const router = Router();
require('dotenv').config();
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const { Temperament, Dog } = require('../db');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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

router.post('/dog', async (req, res) => {
    const { name,
        height,
        weight,
        image,
        life_span,
        temperament,
        createdInDB
    } = req.body

    const createDog = await Dog.create({
        id: uuidv4(),
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

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
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
});



router.get('/temperaments', async (req, res) => {
    const allData = await axios.get(URL);
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
})

router.get('/max-weights', async (req, res) => {
    const allDogs = await getAllDogs();
    const dogsWeights = allDogs.map((dog) => {
        var weights = []
        if (dog.weight) {
            weights.push((dog.weight.slice(dog.weight.length - 2, dog.weight.length)).trim())
        }
        weightsNums = parseInt(weights)
        return weightsNums
    });
    var everyDogWeight = dogsWeights.sort(function(a, b){return a-b}).reduce((unique, item) =>{
        return unique.includes(item) ? unique : [...unique, item]
    },[])
    res.status(200).json(everyDogWeight)
});

router.get('/breedGroups', async (req, res) => {
    const everyDog = await getAllDogs();
    const everyBreedGroup = everyDog.map((dog) => {
        if (dog.breed_group !== undefined) {
            return dog.breed_group
        }
    });
    const eachBreedGroup = [...new Set(everyBreedGroup.flat())]
    res.status(200).json(eachBreedGroup)
});

router.get('/breedGroup', async (req, res) => {
    const breedGroup = req.query.breedGroup;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
        if (dog.breed_group !== undefined) { return (dog.breed_group.toLowerCase()).includes(breedGroup.toLowerCase()) }
    });
    res.status(200).json(dogSearchResult)
});
router.get('/temperament', async (req, res) => {
    const temperament = req.query.temperament;
    const everyDog = await getAllDogs();
    const dogSearchResult = everyDog.filter((dog) => {
       if (dog.temperament !== undefined) { return (dog.temperament.toLowerCase()).includes(temperament.toLowerCase()) }
    });
    res.status(200).json(dogSearchResult)
});


router.get('/min-heights', async (req, res) => {
    const allDogs = await getAllDogs();
    const dogsHeights = allDogs.map((dog) => {
        var heights = []
        if (dog.height) {
            heights = dog.height.slice(0,2)
            console.log(heights)
        }
        heightsNums = parseInt(heights)
        return heightsNums
    });
    var everyDogHeight = dogsHeights.sort(function(a, b){return a-b}).reduce((unique, item) =>{
        return unique.includes(item) ? unique : [...unique, item]
    },[])
    res.status(200).json(everyDogHeight)
});

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    if (!idRaza) {
        res.status(404).json("Couldn't find the name on DBase")
    } else {
        const dog = allDogs.filter(dogui => dogui.id.toString() === idRaza);
        res.status(200).json(dog)
    }
})

module.exports = router;
