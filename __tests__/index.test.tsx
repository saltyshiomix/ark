import { shallow } from 'enzyme';
import React from 'react';

import App from '../pages';

describe('App', () => {
  it('should render correctly', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
