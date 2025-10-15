import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../index';
import {
  GET_DOGS, GET_DOG_BY_ID,
  FILTER_BY_TEMPERAMENT, ORDER_BY_NAME,
  ORDER_BY_WEIGHT, GET_TEMPERAMENTS_LIST,
  GET_DOGS_BY_NAME, GET_DOGS_BY_BREED,
  GET_DOGS_BY_TEMP, GET_BREEDS,
  FILTER_CREATED, GET_DETAILS,
  DELETE_DETAILS, FILTER_BY_MAX_WEIGHT,
  FILTER_BY_MIN_WEIGHT, FILTER_BY_ORIGIN
} from '../types';

// Configuración del mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('should start async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates GET_DOGS when fetching dogs has been done', () => {
    const mockDogs = [{ id: 1, name: 'Bulldog' }];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockDogs
      });
    });

    const expectedActions = [
      { type: GET_DOGS, payload: mockDogs }
    ];

    const store = mockStore({ dogs: [] });

    return store.dispatch(actions.getDogs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Dog Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    jest.clearAllMocks();
  });

  it('should create an action to get all dogs', async () => {
    const action = actions.getDogs();
    expect(typeof action).toBe('function');
  });

  it('should create an action to get dog by name', () => {
    const name = 'Bulldog';
    const action = actions.getDogsByName(name);

    // Check that it returns a function (thunk)
    expect(typeof action).toBe('function');

    // Test the async action
    const dispatch = jest.fn();
    action(dispatch).then(() => {
      // Check that dispatch was called with the correct action
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_DOGS_BY_NAME,
        payload: expect.any(Array) // or whatever the expected payload is
      });
    });
  });

  it('should create an action to get dog by id', () => {
    const id = 1;
    const action = actions.getDogById(id);
    expect(action).toEqual({
      type: GET_DOG_BY_ID,
      payload: id
    });
  });

  it('should return a function that dispatches GET_TEMPERAMENTS_LIST', async () => {
    const mockTemperaments = [{ name: 'Friendly' }, { name: 'Energetic' }];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockTemperaments
      });
    });

    const action = actions.getTemperamentsList();
    expect(typeof action).toBe('function');

    const dispatch = jest.fn();
    await action(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: GET_TEMPERAMENTS_LIST,
      payload: mockTemperaments
    });
  });

  it('should create an action to filter by temperament', () => {
    const temperament = 'Friendly';
    const action = actions.filterByTemperament(temperament);
    expect(action).toEqual({
      type: FILTER_BY_TEMPERAMENT,
      payload: temperament
    });
  });

  it('should create an action to filter by origin', () => {
    const origin = 'all';
    const action = actions.filterByOrigin(origin);
    expect(action).toEqual({
      type: FILTER_BY_ORIGIN,
      payload: origin
    });
  });

  it('should create an action to order by name', () => {
    const order = 'asc';
    const action = actions.orderByName(order);
    expect(action).toEqual({
      type: ORDER_BY_NAME,
      payload: order
    });
  });

  it('should create an action to order by weight', () => {
    const order = 'asc';
    const action = actions.orderByWeight(order);
    expect(action).toEqual({
      type: ORDER_BY_WEIGHT,
      payload: order
    });
  });

  it('should return a function that dispatches POST_DOG', () => {
    const dog = {
      name: 'Bulldog',
      temperament: 'Friendly',
      height: '20-30',
      weight: '20-30',
      life_span: '10-15',
      image: 'https://example.com/image.jpg'
    };

    const action = actions.postDog(dog);
    expect(typeof action).toBe('function');
  });


  it('should create an action to get breeds', () => {
    const breeds = ['Breed 1', 'Breed 2'];
    const action = actions.getBreeds();
    expect(typeof action).toBe('function');
  });

  it('should create an action to get dogs by breed', () => {
    const breed = 'Breed 1';
    const action = actions.getDogsByBreed(breed);
    expect(typeof action).toBe('function');
  });

  it('should create an action to get dog by temperament', () => {
    const temperament = 'Friendly';
    const action = actions.filterByTemperament(temperament);
    expect(action).toEqual({
      type: FILTER_BY_TEMPERAMENT,
      payload: temperament
    });
  });

  it('should create an action to delete details', () => {
    const action = actions.deleteDetails();
    expect(typeof action).toBe('function');

    const dispatch = jest.fn();
    action(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: DELETE_DETAILS
    });
  });

  it('should create an action to get dogs by breed', async () => {
    const breed = 'Breed 1';
    const mockDogs = [{ id: 1, name: 'Dog 1', breedGroup: breed }];

    // Configurar moxios para interceptar la llamada a la API
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockDogs
      });
    });

    const action = actions.getDogsByBreed(breed);
    expect(typeof action).toBe('function');

    const dispatch = jest.fn();
    await action(dispatch);

    // Verificar que se hizo la llamada a la API correcta
    expect(moxios.requests.mostRecent().url).toBe(`http://localhost:3001/breedGroup?breedGroup=${breed}`);

    // Verificar que se despachó la acción correcta
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_DOGS_BY_BREED,
      payload: mockDogs
    });
  });
});