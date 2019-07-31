/** @format */
// #region Imports NPM
import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
// #endregion
// #region Imports Local
import { NodeIdGetterObj } from './types';
import { apolloStateLink } from './state-link';
// #endregion

let apollo: ApolloClient<NormalizedCacheObject>;

export const apolloClient = (
  initialState = {},
  _linkOptions: HttpLink.Options = {},
): ApolloClient<NormalizedCacheObject> => {
  if (apollo) {
    return apollo;
  }

  const cache = new InMemoryCache({
    dataIdFromObject: (object: NodeIdGetterObj) => object.nodeId || null,
  }).restore(initialState);
  let link: ApolloLink;

  if (!__SERVER__) {
    // const subscriptionsUri = `${window.location.origin.replace(
    //   'http',
    //   'ws',
    // )}/graphql`; // __WEBSOCKET_URI__

    // Create a WebSocket link:
    // const wsLink = new WebSocketLink({
    //   uri: subscriptionsUri,
    //   options: {
    //     reconnect: true,

    //     // connectionParams: async () => {
    //     //   return { token: localStorage.getItem('token') };
    //     // },

    //     connectionCallback: (errors: Error[], _result: any): any => {
    //       if (errors) {
    //         console.error('[Error in webSocket]:', errors);
    //       }
    //     },
    //   },
    // });

    // Create an http link:
    const httpLink = new HttpLink({
      uri: `${window.location.origin}/graphql`,
      credentials: 'same-origin',
      fetch,
    });

    link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }): any => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }): any =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log('[Network error]:', networkError);
        }
      }),

      apolloStateLink(cache),

      // split(
      //   ({ query }) => {
      //     const definition = getMainDefinition(query);
      //     return (
      //       definition.kind === 'OperationDefinition' &&
      //       definition.operation === 'subscription'
      //     );
      //   },
      //   wsLink,
      httpLink,
      // ),
    ]);
  } else {
    global.fetch = fetch;

    link = ApolloLink.from([
      onError(({ graphQLErrors, networkError }): any => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }): any =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),

      apolloStateLink(cache),
    ]);
  }

  if (!apollo) {
    apollo = new ApolloClient({
      connectToDevTools: !__SERVER__,
      ssrMode: __SERVER__,
      link,
      cache,
    });
  }

  return apollo;
};
