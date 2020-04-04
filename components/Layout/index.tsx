import React from 'react';
import {
  CssBaseline,
  Toolbar,
  Container,
} from '@material-ui/core';
import { ElevateAppBar } from './ElevateAppBar';

interface LayoutProps {
  children?: React.ReactNode,
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevateAppBar />
      <Toolbar />
      <Container>
        {children}
      </Container>
    </React.Fragment>
  );
};
