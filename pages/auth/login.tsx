/** @format */

// #region Imports NPM
import React, { useState, useRef, useEffect } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Mutation } from 'react-apollo';
// #endregion
// #region Imports Local
import { LOGIN } from '../../lib/queries';
import * as KngkInpzLogo from './kngk-inpz.svg';
// #endregion

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      'html': {
        height: '100%',
        width: '100%',
      },
      'body': {
        height: '100%',
        width: '100%',
      },
      'body > div': {
        height: '100%',
        width: '100%',
      },
    },
    'root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%',
      width: '100%',
    },
    'container': {
      width: 480,
      margin: `${theme.spacing(2)}px auto`,
    },
    'card': {
      padding: theme.spacing(4),
    },
    'typoAuthorization': {
      color: '#2c4373',
      textAlign: 'left',
    },
    'labelForFormControl': {
      // borderColor: 'rgba(44, 67, 115, 0.4)',
    },
    'errors': {
      color: 'red',
    },
    'progress': {
      margin: theme.spacing(2),
      color: 'red',
    },
    'formControl': {
      minWidth: 320,
      margin: `${theme.spacing(1)}px 0`,
    },
    'submitButton': {
      margin: `${theme.spacing(4)}px 0`,
    },
  }),
);

export default function Login(): React.ReactElement {
  // const client: HttpClient = new HttpClient();

  const classes = useStyles({});

  const [username, setUsername] = useState('');
  const [usernameLabelWidth, setUsernameLabelWidth] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordLabelWidth, setPasswordLabelWidth] = useState(0);
  const [saveChecked, setSave] = useState(false);

  const usernameLabelRef = useRef<HTMLLabelElement | any>({});
  const passwordLabelRef = useRef<HTMLLabelElement | any>({});
  useEffect(
    () => setUsernameLabelWidth(usernameLabelRef.current.offsetWidth),
    [],
  );
  useEffect(
    () => setPasswordLabelWidth(passwordLabelRef.current.offsetWidth),
    [],
  );

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);
  const handleSaveChecked = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSave(e.target.checked);

  return (
    <Mutation mutation={LOGIN}>
      {(login: Function, { loading, error, data }: any) => {
        if (data) {
          // window.location.href = '/';
          return <Typography>{JSON.stringify(data)}</Typography>;
        }

        return (
          <div className={classes.root}>
            <KngkInpzLogo />
            <form
              onSubmit={async (e: any): Promise<void> => {
                e.preventDefault();
                login({
                  variables: {
                    username: e.target.username.value,
                    password: e.target.password.value,
                  },
                });
              }}
              className={classes.container}
              autoComplete="off"
              noValidate
            >
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.typoAuthorization}
                    variant="h4"
                  >
                    Авторизация
                  </Typography>
                  <br />
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="username"
                      className={classes.labelForFormControl}
                      ref={usernameLabelRef}
                    >
                      Пользователь
                    </InputLabel>
                    <OutlinedInput
                      id="username"
                      name="username"
                      type="username"
                      value={username}
                      onChange={handleUsername}
                      labelWidth={usernameLabelWidth}
                    />
                  </FormControl>
                  <br />
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel
                      htmlFor="password"
                      className={classes.labelForFormControl}
                      ref={passwordLabelRef}
                    >
                      Пароль
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
                  <FormControlLabel
                    className={classes.labelForFormControl}
                    control={
                      <Checkbox
                        checked={saveChecked}
                        onChange={handleSaveChecked}
                        value="save"
                        color="primary"
                      />
                    }
                    label="Запомнить меня на этом компьютере"
                  />
                  {loading && <CircularProgress className={classes.progress} />}
                  {error && (
                    <div>
                      <br />
                      <Typography className={classes.errors} variant="h6">
                        Ошибка: {error}
                      </Typography>
                    </div>
                  )}
                  <br />
                  <Button
                    className={classes.submitButton}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Вход
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
}
