const { Router } = require('express');
require('dotenv').config();

// Importar todos los routers;
const dogs = require('./routesDog');
const temperaments = require('./routesTemperaments');
const breeds = require('./routesBreeds');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogs);
router.use('/', temperaments);
router.use('/', breeds);

module.exports = router;
