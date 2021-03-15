import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router-dom';

import { login } from '../../../redux/actions/account';

const useStyles = makeStyles((theme) => ({
  rightImage: {
    background: `url(${process.env.PUBLIC_URL + '/Auth.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    boxShadow: '3px 3px 3px 3px black',
  },

  leftContainer: {
    height: 300,
    padding: theme.spacing(2),
  },

  leftGrid: {
    height: '100%',
  },

  buttonProgress: {
    color: green[500],
  },
  notStarted: {
    margin: theme.spacing(3),
  },
}));

function AuthDialog({
  open,
  handleClose,
  login,
  isFetching,
  isLoggedIn,
  user,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const t = useTranslate();
  const history = useHistory();

  useEffect(() => {
    if (open && isLoggedIn) {
      if (user.is_mentor) {
        history.push('/mentor');
      } else {
        history.push('/workshops');
      }
    }
  }, [isLoggedIn, user, open, history]);

  const submit = (e) => {
    login({ username, password });
    e.preventDefault();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <form>
        <Grid container direction="row" justify="center">
          <Grid
            item
            xs={12}
            sm={7}
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            className={classes.leftContainer}>
            <Grid container item direction="row">
              <Grid item xs={3}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  className={classes.closeIcon}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item container xs={6} justify='center' alignItems='center'>
                <Typography component="h3" variant="h2" align="center">
                  {t('login')}
                </Typography>
              </Grid>
              <Grid item xs={3} />
            </Grid>
            <Grid item>
              <TextField
                label={t('username')}
                type="username"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                inputProps={{ className: 'ltr-input' }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                label={t('password')}
                fullWidth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ className: 'ltr-input' }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography align='center'>
                {'اگر رمزتون رو فراموش کردین، به '}
                <a href='/recover-password'>
                  {'این‌جا'}
                </a>
                {' مراجعه کنید.'}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={submit}
                disabled={isFetching}
                color="primary">
                {isFetching ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                    t('login')
                  )}
              </Button>
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={5} className={classes.rightImage}></Grid>
          </Hidden>
        </Grid>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
  isLoggedIn: !!state.account.token,
  user: state.account.user,
});

export default connect(mapStateToProps, { login })(AuthDialog);
