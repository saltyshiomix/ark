/** @format */

// #region Imports NPM
import gql from 'graphql-tag';
// #endregion

export const CURRENT_USER = gql`
  query {
    CurrentUser {
      nodeId
      id
      username
      name
    }
  }
`;
