/** @format */
// #region Imports NPM
import merge from 'lodash/merge';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
// #endregion
// #region Imports Local
import { StateLinkAuthentication } from './authentication';
// import { StateLinkNetworkStatus } from './network-status';
// #endregion

export const stateLinkResolvers = {
  ...merge(StateLinkAuthentication /* , StateLinkNetworkStatus */),
};

export const apolloStateLink = (cache: InMemoryCache): ApolloLink =>
  withClientState({ cache, ...stateLinkResolvers });
