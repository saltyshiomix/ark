/** @format */

import { createShallow } from '@material-ui/core/test-utils';
import { InputLabel, Button } from '@material-ui/core';
import React from 'react';

import Register from '../auth/register';

describe('Register', () => {
  let wrapperShallow: any;

  beforeAll(() => {
    wrapperShallow = createShallow();
  });

  it('render correctly', () => {
    const register = wrapperShallow(<Register />);
    expect(register).toMatchSnapshot();
  });

  it('to have 3 inputs', () => {
    const register = wrapperShallow(<Register />);
    expect(register.find(InputLabel)).toHaveLength(3);
  });

  it('to have register button', () => {
    const register = wrapperShallow(<Register />);
    expect(register.find(Button)).toBeDefined();
  });
});
