/** @format */
/* eslint @typescript-eslint/indent:0 */

// #region Imports NPM
// import * as http from 'http';
import React from 'react';
import { getDataFromTree } from 'react-apollo';

import Head from 'next/head';
// eslint-disable-next-line import/no-named-default
import { AppContext, default as NextApp } from 'next/app';

import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
// #endregion
// #region Imports Local
// import { FETCH_CURRENT_USER } from '@monorepo/shared';
import { apolloClient } from './apollo-client';
import { ApolloAppProps, WithApolloState, ApolloInitialProps } from './types';
// #endregion

export const withApolloClient = (
  MainApp: any /* typeof NextApp */,
): Function => {
  return class ApolloClass extends React.Component<ApolloAppProps> {
    public static displayName = 'withApolloClient(MainApp)';

    private apolloClient: ApolloClient<NormalizedCacheObject>;

    public static async getInitialProps(
      appCtx: AppContext,
    ): Promise<ApolloInitialProps> {
      // const { Component, router, ctx } = appCtx;
      const apolloState: WithApolloState = {};

      const appProps = MainApp.getInitialProps
        ? await MainApp.getInitialProps(appCtx)
        : { pageProps: {} };

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = apolloClient();

      if (__SERVER__) {
        try {
          await getDataFromTree(
            <MainApp {...appProps} {...appCtx} apolloClient={apollo} />,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      apolloState.data = apollo.cache.extract();

      // Extract query data from the Apollo store
      // On the client side, initApollo() below will return the SAME Apollo
      // Client object over repeated calls, to preserve state.
      return {
        ...appProps,
        apolloState,
      };
    }

    public constructor(props: any) {
      super(props);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = this.apolloClient || apolloClient(props.apolloState);
    }

    public render(): React.ReactElement {
      return <MainApp {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
