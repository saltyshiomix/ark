/** @format */

import { shallow } from 'enzyme';
import React from 'react';

import App from '..';

describe('App', () => {
  it('should render correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
