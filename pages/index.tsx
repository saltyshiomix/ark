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
import { Http } from '../lib/http';
import { Layout } from '../components/Layout';

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

const Index = ({ user }) => {
  const classes = useStyles({});

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    const isLoggedOut: boolean = await http.post('api/auth/logout');
    if (isLoggedOut) {
      location.href = '/auth/login';
    }
  };

  return (
    <Layout>
      <div className={classes.root}>
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
                onClick={onClick}
              >
                LOGOUT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async ({ req }) => {
  const { user } = req;
  return {
    user,
  };
};

export default Index;
