import React from 'react';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
  }
});

interface Props extends WithStyles<typeof styles> {};

const Home = withStyles(styles)(
  class extends React.Component<Props> {
    handleClick = (e) => {
      e.preventDefault();
      window.location.href = '/auth/logout';
    };

    render() {
      const { classes } = this.props;

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
                  onClick={this.handleClick}
                >
                  LOGOUT
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }
)

export default Home;
