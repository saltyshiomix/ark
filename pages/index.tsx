import { MouseEvent } from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  CardContent,
} from '@material-ui/core';
import { Http } from '../lib';

const http = new Http();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(8),
    },
    container: {
      width: 480,
      margin: `${theme.spacing(2)}px auto`,
    },
    card: {
      padding: theme.spacing(4),
    },
  }),
);

const IndexPage = ({ user }) => {
  const classes = useStyles({});

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    const isLoggedOut: boolean = await http.post('api/auth/logout');
    if (isLoggedOut) {
      location.href = '/auth/login';
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2">ARK</Typography>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body1">
              You are now logged in as {user.name} :)
            </Typography>
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

IndexPage.getInitialProps = async ({ req }) => {
  const { user } = req;
  return {
    user,
  };
};

export default IndexPage;
