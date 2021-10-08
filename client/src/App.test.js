import React from 'react';
import { configure, mount, shallow } from 'enzyme'; //shallow
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Home from './containers/Home.jsx';
import Detail from './containers/Detail.jsx';
import Landing from './containers/Landing';
import Hero from './components/hero/Hero';
import Favourites from './containers/Favourites'


configure({ adapter: new Adapter() });

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('Landing', () => {
    it('Renders Landing component without crashing.', () => {
      shallow(<Landing />)
    });
  });

  describe('Main', () => {
    it('Renders Home component without crashing.', () => {
      shallow(<Home />)
    });

    it('Renders Hero component without crashing', () => {
      shallow(<Hero/>)
    });
  });

  describe('Detail', () => {
    it('Renders Detail component without crashing.', () => {
      shallow(<Detail />)
    });
  });

  describe('Favourites', () => {
    it('Renders Favourites component without crashing.', () => {
      shallow(
      <Provider store={store}>
        <Favourites />
      </Provider>)
    });
  });

});