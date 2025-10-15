/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Dog, Temperament, conn } = require("../../src/db");

const agent = session(app);

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DB", err);
    })
  );

  // Datos de prueba
  const testDog = {
    name: 'Test Dog',
    height_min: 30,
    height_max: 40,
    weight_min: 10,
    weight_max: 20,
    life_span: '10-12 years',
    temperament: 'Friendly,Active',
    reference_image_id: 'test123'
  };

  // Limpiar la base de datos antes de las pruebas
  before(async () => {
    try {
      await Dog.destroy({ where: {} });
      await Temperament.destroy({ where: {} });
      
      // Crear un perro de prueba
      const dog = await Dog.create(testDog);
      
      // Crear temperamentos de prueba
      const temperaments = await Promise.all(
        testDog.temperament.split(',').map(name => 
          Temperament.create({ name: name.trim() })
        )
      );
      
      // Asociar temperamentos al perro
      await dog.setTemperaments(temperaments);
    } catch (error) {
      console.error('Error setting up test data:', error);
    }
  });

  describe('/dogs', function() {
    it('GET /dogs returns status 200 and valid data structure', function() {
      return agent
        .get('/dogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const { body } = res;
          expect(body).to.be.an('array');
          expect(body.length).to.be.greaterThan(0);
          
          // Verificar estructura básica de los primeros 3 elementos
          const sampleDogs = body.slice(0, 3);
          const expectedKeys = [
            'id', 'name', 'image', 'breed_group', 
            'temperament', 'life_span', 'weight_min', 
            'weight_max', 'height_min', 'height_max', 
            'reference_image_id'
          ];
          
          sampleDogs.forEach(dog => {
            expect(dog).to.include.all.keys(expectedKeys);
            // Verificar tipos de datos básicos
            expect(dog.id).to.be.a('number');
            expect(dog.name).to.be.a('string').that.is.not.empty;
            expect(dog.image).to.be.a('string');
            expect(dog.weight_min).to.be.a('number');
            expect(dog.weight_max).to.be.a('number');
          });
        });
    }).timeout(10000);
  });

  describe('/dogs?name=', function() {
    it('should return dogs matching the name (case insensitive)', function() {
      return agent
        .get('/dogs?name=terrier')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          res.body.forEach(dog => {
            expect(dog.name.toLowerCase()).to.include('terrier');
          });
        });
    }).timeout(10000);

    it('should return 404 for non-existent dog name', function() {
      return agent
        .get('/dogs?name=nonexistentbreed123')
        .expect(404)
        .then(res => {
          expect(res.text).to.include("Cann't find the dog with the name you are looking for");
        });
    }).timeout(10000);
  });

  describe('/dogs/:id', function() {
    it('should return dog data for valid ID', function() {
      // Primero obtenemos un ID válido de la API
      return agent
        .get('/dogs')
        .then(res => {
          const validId = res.body[0].id;
          return agent
            .get(`/dogs/${validId}`)
            .expect(200)
            .then(dogRes => {
              const dog = dogRes.body;
              expect(dog).to.be.an('object');
              expect(dog).to.have.property('name');
              expect(dog).to.have.property('temperament');
            });
        });
    }).timeout(10000);

    it('should handle non-existent dog ID', function() {
      return agent
        .get('/dogs/999999999') // Un ID que seguramente no existe
        .expect(200)
        .then(res => {
          // La API actual devuelve una cadena vacía para IDs no encontrados
          expect(res.text).to.equal('');
        });
    }).timeout(10000);
  });

  describe('/temperament', function() {
    it('should return status 200 and an array of temperaments', function() {
      return agent
        .get('/temperament')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property('id');
            expect(res.body[0]).to.have.property('name');
          }
        });
    }).timeout(10000);
  });
});