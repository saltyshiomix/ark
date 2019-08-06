/** @format */

// #region Imports NPM
import gql from 'graphql-tag';
// #endregion

export const CURRENT_USER = gql`
  {
    me {
      token
      id
      username
      firstName
      lastName
      middleName
      birthday
      gender
      addressPersonal
      thumbnailPhoto
      updatedAt
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
      username
      firstName
      lastName
      middleName
      birthday
      gender
      addressPersonal
      thumbnailPhoto
      updatedAt
      createdAt
    }
  }
`;
