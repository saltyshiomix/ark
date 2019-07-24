/** @format */

// #region Imports NPM
import React, { useState, useRef, useEffect } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// #endregion
// #region Imports Local
// import HttpClient from '../../lib/http-client';
// #endregion

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

export default function Login(): React.ReactElement {
  // const client: HttpClient = new HttpClient();

  const classes = useStyles({});

  const [email, setEmail] = useState('');
  const [emailLabelWidth, setEmailLabelWidth] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordLabelWidth, setPasswordLabelWidth] = useState(0);

  const emailLabelRef = useRef<HTMLLabelElement | any>({});
  const passwordLabelRef = useRef<HTMLLabelElement | any>({});
  useEffect(() => setEmailLabelWidth(emailLabelRef.current.offsetWidth), []);
  useEffect(
    () => setPasswordLabelWidth(passwordLabelRef.current.offsetWidth),
    [],
  );

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    window.location.href = '/auth/register';
  };

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    // const data = {
    //   email: e.target.email.value,
    //   password: e.target.password.value,
    // };

    // const { data: user } = await client.post('auth/login', data);
    // if (user) {
    //   window.location.href = '/';
    // } else {
    // eslint-disable-next-line no-alert, no-undef
    // alert('Failed to login!');
    // }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2">Portal</Typography>
      <form
        onSubmit={handleSubmit}
        className={classes.container}
        autoComplete="off"
        noValidate
      >
        <Card className={classes.card}>
          <CardContent>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="email" ref={emailLabelRef}>
                EMAIL
              </InputLabel>
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
              <InputLabel htmlFor="password" ref={passwordLabelRef}>
                PASSWORD
              </InputLabel>
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
            <Button size="small" onClick={handleClick}>
              Or create an account
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
