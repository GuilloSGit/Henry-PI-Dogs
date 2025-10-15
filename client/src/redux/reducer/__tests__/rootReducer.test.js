import rootReducer from '..';
import {
  GET_DOGS, GET_DOG_BY_ID, GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENT, ORDER_BY_NAME,
  GET_DOGS_BY_BREED, GET_DOGS_BY_NAME,
  GET_DOGS_BY_TEMP, GET_BREEDS,
  FILTER_CREATED, GET_DETAILS,
  DELETE_DETAILS, FILTER_BY_MAX_WEIGHT,
  FILTER_BY_MIN_WEIGHT, FILTER_BY_ORIGIN
} from '../../actions/types';


describe('Root Reducer', () => {
  const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
    details: [],
    filteredDogs: [],
    dogDetail: {}
  };


  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });


  it('should handle GET_DOGS', () => {
    const testDogs = [
      { id: 1, name: 'Bulldog' },
      { id: 2, name: 'Poodle' }
    ];


    const action = {
      type: GET_DOGS,
      payload: testDogs
    };


    const expectedState = {
      ...initialState,
      dogs: testDogs,
      allDogs: testDogs,
      filteredDogs: testDogs
    };


    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle GET_DOG_BY_ID', () => {
    const testDog = { id: 1, name: 'Bulldog' };


    const action = {
      type: GET_DOG_BY_ID,
      payload: testDog
    };


    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      dogDetail: testDog
    });
  });


  it('should handle GET_TEMPERAMENTS', () => {
    const testTemperaments = ['Friendly', 'Energetic', 'Calm'];


    const action = {
      type: GET_TEMPERAMENTS,
      payload: testTemperaments
    };


    expect(rootReducer(initialState, action)).toEqual({
      ...initialState,
      temperaments: testTemperaments
    });
  });


  it('should handle FILTER_BY_TEMPERAMENT', () => {
    const stateWithDogs = {
      ...initialState,
      dogs: [
        { id: 1, name: 'Bulldog', temperament: 'Friendly, Brave' },
        { id: 2, name: 'Poodle', temperament: 'Intelligent, Active' },
        { id: 3, name: 'Beagle', temperament: 'Friendly, Curious' }
      ],
      allDogs: [
        { id: 1, name: 'Bulldog', temperament: 'Friendly, Brave' },
        { id: 2, name: 'Poodle', temperament: 'Intelligent, Active' },
        { id: 3, name: 'Beagle', temperament: 'Friendly, Curious' }
      ]
    };


    const action = {
      type: FILTER_BY_TEMPERAMENT,
      payload: 'Friendly'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.allDogs.length).toBe(2);
    expect(newState.allDogs.some(dog => dog.name === 'Bulldog')).toBe(true);
    expect(newState.allDogs.some(dog => dog.name === 'Beagle')).toBe(true);
  });


  it('should handle ORDER_BY_NAME', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ],
      filteredDogs: [  // Asegúrate de que filteredDogs tenga los mismos datos
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ]
    };


    const action = {
      type: 'ORDER_BY_NAME',
      payload: 'asc'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs[0].name).toBe('Beagle');
    expect(newState.filteredDogs[1].name).toBe('Bulldog');
    expect(newState.filteredDogs[2].name).toBe('Poodle');
  });


  it('should handle GET_DOGS_BY_BREED', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', breedGroup: 'Working' },
        { id: 2, name: 'Poodle', breedGroup: 'Non Sporting' },
        { id: 3, name: 'Beagle', breedGroup: 'Hound' }
      ],
      filteredDogs: [
        { id: 1, name: 'Bulldog', breedGroup: 'Working' },  // Añade breedGroup aquí
        { id: 2, name: 'Poodle', breedGroup: 'Non Sporting' },
        { id: 3, name: 'Beagle', breedGroup: 'Hound' }
      ]
    };


    const action = {
      type: GET_DOGS_BY_BREED,
      payload: 'Working'  // Filtra por 'Working'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(1);
    expect(newState.filteredDogs[0].name).toBe('Bulldog');
  });


  it('should handle GET_DOGS_BY_NAME', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ],
      filteredDogs: [
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ]
    };


    const action = {
      type: GET_DOGS_BY_NAME,
      payload: 'Bulldog'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.allDogs.length).toBe(3);  // Verifica filteredDogs, no allDogs
    expect(newState.filteredDogs[0].name).toBe('Bulldog');
  });


  it('should handle GET_DOGS_BY_TEMP', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', temperament: 'Friendly, Brave' },
        { id: 2, name: 'Poodle', temperament: 'Intelligent, Active' },
        { id: 3, name: 'Beagle', temperament: 'Friendly, Curious' }
      ],
      filteredDogs: [
        { id: 1, name: 'Bulldog', temperament: 'Friendly, Brave' },
        { id: 2, name: 'Poodle', temperament: 'Intelligent, Active' },
        { id: 3, name: 'Beagle', temperament: 'Friendly, Curious' }
      ]
    };


    const action = {
      type: GET_DOGS_BY_TEMP,
      payload: 'Friendly'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(2);
    expect(newState.filteredDogs.some(dog => dog.name === 'Bulldog')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Beagle')).toBe(true);
  });


  it('should handle GET_DOGS_BY_BREED', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', breedGroup: 'Working' },
        { id: 2, name: 'Poodle', breedGroup: 'Non Sporting' },
        { id: 3, name: 'Beagle', breedGroup: 'Hound' }
      ],
      filteredDogs: [
        { id: 1, name: 'Bulldog', breedGroup: 'Working' },
        { id: 2, name: 'Poodle', breedGroup: 'Non Sporting' },
        { id: 3, name: 'Beagle', breedGroup: 'Hound' }
      ]
    };


    const action = {
      type: GET_DOGS_BY_BREED,
      payload: 'Working'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(1);
    expect(newState.filteredDogs[0].name).toBe('Bulldog');
  });


  it('should handle GET_BREEDS', () => {
    const initialState = {
      breeds: []
    };


    const action = {
      type: 'GET_BREEDS',
      payload: ['Working', 'Non Sporting', 'Hound']  // Envía los breeds en el payload
    };


    const newState = rootReducer(initialState, action);
    expect(newState.breeds.length).toBe(3);
    expect(newState.breeds).toEqual(['Working', 'Non Sporting', 'Hound']);
  });


  it('should handle FILTER_CREATED', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', created: true },
        { id: 2, name: 'Poodle', created: false },
        { id: 3, name: 'Beagle', created: true }
      ],
      filteredDogs: [
        { id: 1, name: 'Bulldog', created: true },
        { id: 3, name: 'Beagle', created: true },
      ]
    };


    const action = {
      type: FILTER_CREATED,
      payload: 'created'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(2);
    expect(newState.filteredDogs.some(dog => dog.name === 'Bulldog')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Beagle')).toBe(true);
  });


  it('should handle GET_DETAILS', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [  // Asegúrate de que allDogs tenga los datos
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ],
      details: []  // Inicializa details como array vacío
    };


    const action = {
      type: 'GET_DETAILS',
      payload: 1  // ID del Bulldog
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.details.length).toBe(1);
    expect(newState.details[0].name).toBe('Bulldog');
  });


  it('should handle DELETE_DETAILS', () => {
    const stateWithDetails = {
      ...initialState,
      details: [
        { id: 1, name: 'Bulldog' },
        { id: 2, name: 'Poodle' },
        { id: 3, name: 'Beagle' }
      ]
    };


    const action = {
      type: DELETE_DETAILS
    };


    const newState = rootReducer(stateWithDetails, action);
    expect(newState.details.length).toBe(0);
  });


  it('should handle FILTER_BY_MAX_WEIGHT', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', weight: '20-30' },
        { id: 2, name: 'Poodle', weight: '10-20' },
        { id: 3, name: 'Beagle', weight: '20-30' }
      ],
      filteredDogs: [  // Inicialmente igual a allDogs
        { id: 1, name: 'Bulldog', weight: '20-30' },
        { id: 2, name: 'Poodle', weight: '10-20' },
        { id: 3, name: 'Beagle', weight: '20-30' }
      ]
    };


    const action = {
      type: FILTER_BY_MAX_WEIGHT,
      payload: 25  // Filtra pesos máximos de 25
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(1);  // Solo el Poodle (10-20) debería pasar
    expect(newState.filteredDogs[0].name).toBe('Poodle');
  });


  it('should handle FILTER_BY_MIN_WEIGHT', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', weight: '20-30' },
        { id: 2, name: 'Poodle', weight: '10-20' },
        { id: 3, name: 'Beagle', weight: '20-30' }
      ],
      filteredDogs: [  // Inicialmente igual a allDogs
        { id: 1, name: 'Bulldog', weight: '20-30' },
        { id: 2, name: 'Poodle', weight: '10-20' },
        { id: 3, name: 'Beagle', weight: '20-30' }
      ]
    };


    const action = {
      type: FILTER_BY_MIN_WEIGHT,
      payload: 15  // Filtra pesos mínimos de 15
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(2);  // Bulldog y Beagle (20-30) deberían pasar
    expect(newState.filteredDogs.some(dog => dog.name === 'Bulldog')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Beagle')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Poodle')).toBe(false);
  });


  it('should handle FILTER_BY_ORIGIN', () => {
    const stateWithDogs = {
      ...initialState,
      allDogs: [
        { id: 1, name: 'Bulldog', origin: 'England' },
        { id: 2, name: 'Poodle', origin: 'Germany' },
        { id: 3, name: 'Beagle', origin: 'England' }
      ],
      filteredDogs: [  // Inicialmente igual a allDogs
        { id: 1, name: 'Bulldog', origin: 'England' },
        { id: 2, name: 'Poodle', origin: 'Germany' },
        { id: 3, name: 'Beagle', origin: 'England' }
      ]
    };


    const action = {
      type: FILTER_BY_ORIGIN,
      payload: 'all'
    };


    const newState = rootReducer(stateWithDogs, action);
    expect(newState.filteredDogs.length).toBe(3);
    expect(newState.filteredDogs.some(dog => dog.name === 'Bulldog')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Poodle')).toBe(true);
    expect(newState.filteredDogs.some(dog => dog.name === 'Beagle')).toBe(true);
  });
});