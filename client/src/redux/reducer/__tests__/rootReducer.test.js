import rootReducer from '..';
import { GET_DOGS, GET_DOG_BY_ID, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME } from '../../actions/types';

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
      ]
    };

    // Orden ascendente
    const actionAsc = {
      type: ORDER_BY_NAME,
      payload: 'asc'
    };

    const newStateAsc = rootReducer(stateWithDogs, actionAsc);
    expect(newStateAsc.allDogs[0].name).toBe('Beagle');
    expect(newStateAsc.allDogs[1].name).toBe('Bulldog');
    expect(newStateAsc.allDogs[2].name).toBe('Poodle');

    // Orden descendente
    const actionDesc = {
      type: ORDER_BY_NAME,
      payload: 'desc'
    };

    const newStateDesc = rootReducer(stateWithDogs, actionDesc);
    expect(newStateDesc.allDogs[0].name).toBe('Poodle');
    expect(newStateDesc.allDogs[1].name).toBe('Bulldog');
    expect(newStateDesc.allDogs[2].name).toBe('Beagle');
  });
});
