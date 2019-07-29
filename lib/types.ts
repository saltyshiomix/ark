/** @format */

// #region Import NPM
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { DocumentContext } from 'next/document';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject, IdGetterObj } from 'apollo-cache-inmemory';
// #endregion

export interface NodeIdGetterObj extends IdGetterObj {
  nodeId?: string;
}

export interface WithApolloState<TCache = NormalizedCacheObject> {
  data?: TCache;
}

export interface ApolloInitialProps<TCache = NormalizedCacheObject>
  extends AppInitialProps {
  apolloState: WithApolloState<TCache>;
}

export interface ApolloAppProps<TCache = NormalizedCacheObject>
  extends AppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: WithApolloState<TCache>;
}

export interface ApolloDocumentProps extends DocumentContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export interface UserLoginParams {
  token?: string;
  user?: any; // User;
  email?: any; // UserEmail[];
}

/**
 * Yes the user object is stored in Apollo state but we don't want to have to
 * use <Query query={FETCH_CURRENT_USER}></Query> plus render props for
 * EVERY component that needs access to it. So we only do that once here, near
 * the top, then put the user object in React Context for ease of access.
 */
export const UserContext = React.createContext<UserLoginParams | undefined>(
  undefined,
);
