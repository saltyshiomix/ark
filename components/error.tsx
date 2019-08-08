/** @format */

// #region Imports NPM
import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

export const Error = (props: any): React.ReactElement => {
  const classes = useStyles({});

  const { error } = props;

  return error.graphQLErrors ? (
    error.graphQLErrors.map(({ message }: { message: string }) => (
      <Typography className={classes.errors} variant="h6">
        Ошибка: {message}
      </Typography>
    ))
  ) : (
    <Typography className={classes.errors} variant="h6">
      Ошибка: {error.message}
    </Typography>
  );
};
