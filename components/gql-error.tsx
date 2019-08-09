/** @format */

// #region Imports NPM
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { GraphQLError } from 'graphql';
import { ApolloError } from 'apollo-client';
// #endregion
// #region Imports Local
// #endregion

const useStyles = makeStyles(() =>
  createStyles({
    errors: {
      color: 'red',
    },
  }),
);

interface ErrorProps {
  error: ApolloError;
}

export const GQLError = (props: ErrorProps): React.ReactElement => {
  const classes = useStyles({});

  return (
    <Typography className={classes.errors} variant="h6">
      {props.error.graphQLErrors.map((value: GraphQLError) => `Ошибка: ${value.message}`)}
    </Typography>
  );
};
