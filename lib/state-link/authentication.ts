/** @prettier */
// #region Imports NPM
import { InMemoryCache } from 'apollo-cache-inmemory';
// #endregion
// #region Imports Local
// import { UserLoginParams } from '@monorepo/types';
// import { FETCH_CURRENT_USER } from '@monorepo/shared';
// #endregion

// TODO: me docs
export const StateLinkAuthentication = {
  resolvers: {
    Query: {
      me: async (
        _: any,
        _args: any,
        { cache }: { cache: InMemoryCache },
        _info: any,
      ) => {
        // eslint-disable-next-line no-debugger
        debugger;

        try {
          // const login = (await cache.readQuery({ query: CURRENT_USER })) as UserLoginParams;
          return {
            // ...login,
            id: '0',
            __typename: 'me',
          };

          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return null;
        }
      },
    },
  },
};
