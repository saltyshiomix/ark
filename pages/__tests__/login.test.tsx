/** @format */

import { createShallow } from '@material-ui/core/test-utils';
import { InputLabel, Button } from '@material-ui/core';
import React from 'react';

import Login from '../auth/login';

describe('Login', () => {
  let wrapperShallow: any;

  beforeAll(() => {
    wrapperShallow = createShallow();
  });

  it('render correctly', () => {
    const login = wrapperShallow(<Login />);
    expect(login).toMatchSnapshot();
  });

  it('to have 2 inputs', () => {
    const login = wrapperShallow(<Login />);
    expect(login.find(InputLabel)).toHaveLength(2);
  });

  it('to have login button', () => {
    const login = wrapperShallow(<Login />);
    expect(login.find(Button)).toBeDefined();
  });
});
