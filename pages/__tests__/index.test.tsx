/** @format */

import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';

import App from '..';

describe('App', () => {
  let wrapperShallow: typeof shallow;
  // let render: any;

  beforeAll(() => {
    wrapperShallow = createShallow();
  });

  it('app: render correctly', () => {
    const app = wrapperShallow(<App />);
    expect(app).toMatchSnapshot();
  });

  it('app page: Logout button', () => {
    const app = wrapperShallow(<App />);
    expect(app.find(Button)).toBeDefined();
  });
});
