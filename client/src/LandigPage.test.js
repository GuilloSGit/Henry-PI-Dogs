import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LandingPage from '../src/components/LandingPage/LandingPage'


configure({ adapter: new Adapter() });

describe('LandingPage', () => {
    let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it("Should render a <Link />", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
})
