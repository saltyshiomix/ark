import React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HttpClient from '../lib/http-client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(8),
    },
    container: {
      width: 480,
      margin: `${theme.spacing(2)}px auto`
    },
    card: {
      padding: theme.spacing(4),
    },
  }),
);

export default function Index() {
  const client: HttpClient = new HttpClient;

  const classes = useStyles({});

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const { data: loggedOut } = await client.get('auth/logout');
    if (loggedOut) {
      window.location.href = '/auth/login';
    } else {
      alert('Failed to log out!');
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2">ARK</Typography>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body1">You are now logged in :)</Typography>
            <br />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleClick}
            >
              LOGOUT
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
