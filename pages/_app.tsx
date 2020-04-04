// tslint:disable:react-a11y-titles

import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { theme } from '../lib/theme';

require('typeface-roboto');

const FontFaceObserver = require('fontfaceobserver');
const initializeFonts = () => {
  const roboto = new FontFaceObserver('Roboto');
  roboto.load().then(() => {
    document.documentElement.classList.add('roboto');
  });
};

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }

    // non-blocking loading fonts
    initializeFonts();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>ARK</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default MyApp;
