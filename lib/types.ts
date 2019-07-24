/** @format */

// #region Import NPM
import { AppProps, AppContext } from 'next/app';
import { DocumentContext } from 'next/document';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
// #endregion

export interface MainAppProps extends AppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export interface MainDocumentProps extends DocumentContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  // login: UserLoginParams;
}
