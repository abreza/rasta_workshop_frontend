import React, { useState } from 'react';
import PropTypes from 'prop-types'
import {
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux'
import { Close as CloseIcon } from '@material-ui/icons';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { login } from '../../../redux/actions/account'

const useStyles = makeStyles((theme) => ({
  rightImage: {
    background: `url(${process.env.PUBLIC_URL + '/auth.png'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    height: 300,
    padding: theme.spacing(2),
  },
  leftGrid: {
    height: '100%',
  },
}));

function AuthDialog({ open, handleClose, login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <Grid container>
        <Grid item sm={7}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
          <Container className={classes.leftContainer}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="stretch"
              className={classes.leftGrid}>
              <Grid item>
                <Typography
                  component="h3"
                  variant="h2"
                  align="center">
                  ورود
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="آدرس ایمیل"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined" />
              </Grid>
              <Grid item>
                <TextField
                  label="رمز عبور"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined" />
              </Grid>
              <br />
              <br />
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => login(email, password)}
                  color="primary">
                  {t('login')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item sm={5} className={classes.rightImage}></Grid>
      </Grid>
    </Dialog>
  );
}

AuthDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  open: ownProps.open,
  handleClose: ownProps.handleClose,
})

export default connect(
  mapStateToProps
  ,
  {
    login,
  }
)(AuthDialog)