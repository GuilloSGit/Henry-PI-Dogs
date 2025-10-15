import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../index';
import {
  GET_DOGS,
  GET_DOG_BY_ID,
  GET_DOG_BY_NAME,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  POST_DOG,
  GET_BREEDS,
  GET_DOGS_BY_BREED,
  GET_DOGS_BY_TEMP,
  GET_TEMPERAMENTS_LIST,
} from '../types';

// Configuración del mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Actions', () => {
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
  it('should create an action to get all dogs', async () => {
    const store = mockStore({});
    const expectedActions = [
      { type: GET_DOGS, payload: expect.any(Array) }
    ];

    await store.dispatch(actions.getDogs());
    expect(store.getActions()[0].type).toEqual(GET_DOGS);
    expect(Array.isArray(store.getActions()[0].payload)).toBe(true);
  });

  it('should create an action to get dog by name', () => {
    const name = 'Bulldog';
    const expectedAction = {
      type: GET_DOG_BY_NAME,
      payload: name
    };
    expect(actions.getDogsByName(name)).toEqual(expectedAction);
  });

  it('should create an action to get dog by id', () => {
    const id = 1;
    const expectedAction = {
      type: GET_DOG_BY_ID,
      payload: id
    };
    expect(actions.getDogById(id)).toEqual(expectedAction);
  });

  it('should create an action to get dog by temperament', () => {
    const temperament = 'Friendly';
    const expectedAction = {
      type: GET_DOGS_BY_TEMP,
      payload: temperament
    };
    expect(actions.getDogsByTemp(temperament)).toEqual(expectedAction);
  });

  it('should get a dog by temperament', () => {
    const temperament = 'Friendly';
    const expectedAction = {
      type: GET_DOGS_BY_TEMP,
      payload: temperament
    };
    expect(actions.getDogByTemp(temperament)).toEqual(expectedAction);
  });

  it('should return a function that dispatches GET_TEMPERAMENTS_LIST', () => {
    const action = actions.getTemperamentsList();
    expect(typeof action).toBe('function');

    const dispatch = jest.fn();
    action(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_TEMPERAMENTS_LIST,
      payload: expect.any(Array)
    });
  });

  it('should create an action to filter by temperament', () => {
    const temperament = 'Friendly';
    const expectedAction = {
      type: FILTER_BY_TEMPERAMENT,
      payload: temperament
    };
    expect(actions.filterByTemperament(temperament)).toEqual(expectedAction);
  });

  it('should create an action to filter by origin', () => {
    const origin = 'all';
    const expectedAction = {
      type: FILTER_BY_ORIGIN,
      payload: origin
    };
    expect(actions.filterByOrigin(origin)).toEqual(expectedAction);
  });

  it('should create an action to order by name', () => {
    const order = 'asc';
    const expectedAction = {
      type: ORDER_BY_NAME,
      payload: order
    };
    expect(actions.orderByName(order)).toEqual(expectedAction);
  });

  it('should create an action to order by weight', () => {
    const order = 'asc';
    const expectedAction = {
      type: ORDER_BY_WEIGHT,
      payload: order
    };
    expect(actions.orderByWeight(order)).toEqual(expectedAction);
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

    const dispatch = jest.fn();
    action(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: POST_DOG,
      payload: dog
    });
  });


  it('should create an action to get breeds', () => {
    const breeds = ['Breed 1', 'Breed 2'];
    const expectedAction = {
      type: GET_BREEDS,
      payload: breeds
    };
    const action = actions.getBreeds();
    expect(typeof action).toBe('function');
  });

  it('should create an action to get dogs by breed', () => {
    const breed = 'Breed 1';
    const expectedAction = {
      type: GET_DOGS_BY_BREED,
      payload: breed
    };
    const action = actions.getDogsByBreed(breed);
    expect(typeof action).toBe('function');
  });

  it('should create an action to get dogs by temperament', () => {
    const temperament = 'Friendly';
    const action = actions.getDogsByTemp(temperament);
    expect(typeof action).toBe('function');
  });

  it('should create an action to get temperaments list', () => {
    const action = actions.getTemperamentsList();
    expect(typeof action).toBe('function');

    const dispatch = jest.fn();
    action(dispatch);

    // Since it's an async action, we expect it to dispatch a function (thunk)
    // The actual API call would be tested in an integration test
    expect(dispatch).toHaveBeenCalled();
  });
});