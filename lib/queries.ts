/** @format */

// #region Imports NPM
import gql from 'graphql-tag';
// #endregion

export const CURRENT_USER = gql`
  query {
    currentUser {
      nodeId
      id
      username
      name
    }
  }
`;
