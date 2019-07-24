/** @format */
// #region Imports NPM
import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink /* , split */ } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
// #endregion
// #region Imports Local
// import { apolloStateLink } from './state-link';
// #endregion

let apollo: ApolloClient<NormalizedCacheObject>;

export const apolloClient = (
  initialState = {},
  _linkOptions: HttpLink.Options = {},
): ApolloClient<NormalizedCacheObject> => {
  if (apollo) {
    return apollo;
  }

  const cache = new InMemoryCache().restore(initialState);
  let link: ApolloLink;

  if (!__SERVER__) {
    // TODO: сделать чтобы __WEBSOCKET_URI__ брал из файла .env
    const subscriptionsUri = `${window.location.origin.replace(
      'http',
      'ws',
    )}/graphql`; // __WEBSOCKET_URI__

    const wsLink = new WebSocketLink({
      uri: subscriptionsUri,
      options: {
        reconnect: true,

        // connectionParams: async () => {
        //   return { token: localStorage.getItem('token') };
        // },

        connectionCallback: (errors: Error[], _result: any): any => {
          if (errors) {
            console.error('[Error in webSocket]:', errors);
          }
        },
      },
    });

    // const httpLink = new HttpLink({
    //   uri: `${window.location.origin}/graphql`,
    //   credentials: 'same-origin',
    //   fetch,
    // });

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

      // apolloStateLink(cache),

      wsLink,

      // DEBUG: придумать чтобы старые браузеры (<2014 года, IE9, Chrome 7, Firefox 11, iOS Safari 6, Android 4.4) использовали httpLink
      // split((/* _operation */) => (WebSocket as any) in window, wsLink, httpLink),
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

      // apolloStateLink(cache),
    ]);
  }

  // eslint-disable-next-line no-debugger
  debugger;

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
