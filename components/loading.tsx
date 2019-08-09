/** @format */

// #region Imports NPM
import React from 'react';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// #endregion
// #region Imports Local
// #endregion

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      margin: theme.spacing(2),
      color: 'red',
    },
  }),
);

export const Loading: React.FC<{}> = () => {
  const classes = useStyles({});

  return <CircularProgress className={classes.loading} />;
};
