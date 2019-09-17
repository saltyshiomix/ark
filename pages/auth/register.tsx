import React, { useState, useRef, useEffect } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Link from '../../components/Link';
import HttpClient from '../../lib/http-client';
import { User } from '../../interfaces';

const http = new HttpClient;

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

export default function Register() {
  const classes = useStyles({});

  const [name, setName] = useState('');
  const [nameLabelWidth, setNameLabelWidth] = useState(0);
  const [email, setEmail] = useState('');
  const [emailLabelWidth, setEmailLabelWidth] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordLabelWidth, setPasswordLabelWidth] = useState(0);

  const nameLabelRef = useRef({} as HTMLLabelElement);
  const emailLabelRef = useRef({} as HTMLLabelElement);
  const passwordLabelRef = useRef({} as HTMLLabelElement);
  useEffect(() => setNameLabelWidth(nameLabelRef.current.offsetWidth));
  useEffect(() => setEmailLabelWidth(emailLabelRef.current.offsetWidth));
  useEffect(() => setPasswordLabelWidth(passwordLabelRef.current.offsetWidth));

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const user: User = await http.post('auth/register', data);
      if (!user) {
        alert('Failed to register!');
      }
      location.href = '/';
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
              <InputLabel htmlFor="name" ref={nameLabelRef}>NAME</InputLabel>
              <OutlinedInput
                id="name"
                name="name"
                type="name"
                value={name}
                onChange={handleName}
                labelWidth={nameLabelWidth}
              />
            </FormControl>
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
