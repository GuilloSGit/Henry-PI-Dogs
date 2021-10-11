import React from "react";
import { configure, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LandingPage from '../src/components/LandingPage/LandingPage'
import App from "../src/App";
import Home from "../src/components/Home/Home";



configure({ adapter: new Adapter() });


describe('App', () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('The LandingPage component should only render in "/"', () => {
    it('Should only render in "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(1);
    });

    it('Should not render in other than "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/otraRuta"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(1);
    });

    it('Should not render Home in "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
    });

  })
});

