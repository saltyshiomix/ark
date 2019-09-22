import {
  ChangeEvent,
  useState,
} from 'react';
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
  FormControl,
  TextField,
} from '@material-ui/core';
import { Http } from '../../lib';
import { Link } from '../../components';
import { User } from '../../interfaces';

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
    formControl: {
      minWidth: 320,
      margin: `${theme.spacing(1)}px 0`,
    },
    submitButton: {
      margin: `${theme.spacing(4)}px 0`,
    },
  }),
);

const RegisterPage = () => {
  const classes = useStyles({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const user: User = await http.post('api/auth/register', data);
      if (user) {
        location.href = '/';
      } else {
        alert('Failed to register!');
      }
    } catch (err) {
      alert(`Failed to register! ${err}`);
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">ARK</Typography>
      <form
        onSubmit={handleSubmit}
        className={classes.container}
        autoComplete="off"
        noValidate
      >
        <Card className={classes.card}>
          <CardContent>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="name"
                name="name"
                type="text"
                label="NAME"
                value={name}
                onChange={handleName}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="email"
                name="email"
                type="text"
                label="EMAIL"
                value={email}
                onChange={handleEmail}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <br />
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="password"
                name="password"
                type="password"
                label="PASSWORD"
                value={password}
                onChange={handlePassword}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
            >
              REGISTER
            </Button>
            <br />
            <Link
              href="/auth/login"
              color="secondary"
            >
              Have an Account? Please Login!
            </Link>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default RegisterPage;
