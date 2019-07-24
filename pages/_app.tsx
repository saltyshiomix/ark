/** @format */

// #region Imports NPM
import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto'; // this must be in _app, not _document
// #endregion
// #region Imports Local
import theme from '../lib/theme';
import { MainAppProps } from '../lib/types';
import { withApolloClient } from '../lib/with-apollo-client';
// #endregion

class MainApp extends App<MainAppProps> {
  componentDidMount(): void {
    // Remove the server-sie injectsed CSS
    const jssStyles = document.querySelector('#jss');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render(): React.ReactElement {
    const { Component, apolloClient, pageProps } = this.props;

    // eslint-disable-next-line no-debugger
    debugger;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <title>Portal</title>
          </Head>
          {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MainApp);
