import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import HttpClient from '../../lib/http-client';

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: spacing.unit * 8
  },
  container: {
    width: 480,
    margin: `${spacing.unit * 2}px auto`
  },
  card: {
    padding: spacing.unit * 4
  },
  formControl: {
    minWidth: 320,
    margin: `${spacing.unit}px 0`
  },
  submitButton: {
    margin: `${spacing.unit * 4}px 0`
  }
});

interface Props extends WithStyles<typeof styles> {};

const Register = withStyles(styles)(
  class extends React.Component<Props> {
    private client: HttpClient;
    private nameLabelRef;
    private emailLabelRef;
    private passwordLabelRef;

    state = {
      name: '',
      nameLabelWidth: 0,
      email: '',
      emailLabelWidth: 0,
      password: '',
      passwordLabelWidth: 0
    };

    componentDidMount() {
      this.client = new HttpClient;

      this.setState({
        nameLabelWidth: (ReactDOM.findDOMNode(this.nameLabelRef) as HTMLElement).offsetWidth,
        emailLabelWidth: (ReactDOM.findDOMNode(this.emailLabelRef) as HTMLElement).offsetWidth,
        passwordLabelWidth: (ReactDOM.findDOMNode(this.passwordLabelRef) as HTMLElement).offsetWidth,
      });
    }

    handleChange =  e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    handleClick = (e) => {
      e.preventDefault();
      window.location.href = '/auth/login';
    };

    handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      }

      const { data: user } = await this.client.post('auth/register', data);
      if (user) {
        window.location.href = '/';
      } else {
        alert('Failed to register!');
      }
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <Typography variant="h2">ARK</Typography>
          <form
            onSubmit={this.handleSubmit}
            className={classes.container}
            autoComplete="off"
            noValidate
          >
            <Card className={classes.card}>
              <CardContent>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="name" ref={ref => this.nameLabelRef = ref}>NAME</InputLabel>
                  <OutlinedInput
                    id="name"
                    name="name"
                    type="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    labelWidth={this.state.nameLabelWidth}
                  />
                </FormControl>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="email" ref={ref => this.emailLabelRef = ref}>EMAIL</InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    labelWidth={this.state.emailLabelWidth}
                  />
                </FormControl>
                <br />
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="password" ref={ref => this.passwordLabelRef = ref}>PASSWORD</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    labelWidth={this.state.passwordLabelWidth}
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
                <Button
                  size="small"
                  onClick={this.handleClick}
                >
                  Have an account? Please login.
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      );
    }
  }
)

export default Register;
