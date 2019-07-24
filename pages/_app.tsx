/** @format */

// #region Imports NPM
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto'; // this must be in _app, not _document
// #endregion
// #region Imports Local
import theme from '../lib/theme';
// #endregion

class MyApp extends App {
  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Portal</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
