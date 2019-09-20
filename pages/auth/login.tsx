import {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
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
  InputLabel,
  OutlinedInput,
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

const LoginPage = () => {
  const classes = useStyles({});

  const [email, setEmail] = useState('');
  const [emailLabelWidth, setEmailLabelWidth] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordLabelWidth, setPasswordLabelWidth] = useState(0);

  const emailLabelRef = useRef({} as HTMLLabelElement);
  const passwordLabelRef = useRef({} as HTMLLabelElement);
  useEffect(() => setEmailLabelWidth(emailLabelRef.current.offsetWidth));
  useEffect(() => setPasswordLabelWidth(passwordLabelRef.current.offsetWidth));

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const user: User = await http.post('api/auth/login', data);
      if (user) {
        location.href = '/';
      } else {
        alert('Failed to login!');
      }
    } catch (err) {
      alert('Failed to login!');
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
              <InputLabel htmlFor="email" ref={emailLabelRef}>EMAIL</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmail}
                labelWidth={emailLabelWidth}
              />
            </FormControl>
            <br />
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="password" ref={passwordLabelRef}>PASSWORD</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePassword}
                labelWidth={passwordLabelWidth}
              />
            </FormControl>
            <br />
            <Button
              className={classes.submitButton}
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
            >
              LOGIN
            </Button>
            <br />
            <Link
              href="/auth/register"
              color="secondary"
            >
              Create an Account
            </Link>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default LoginPage;
