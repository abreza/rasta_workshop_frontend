import {
  Grid,
  makeStyles,
  Container,
  Paper,
  Button,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  useLocation,
} from "react-router-dom";

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: ({ marginTop }) => ({
    marginTop: marginTop,
    height: `calc(100vh - ${marginTop}px)`,
  }),
  logo: {
    height: 100,
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  }
}));

function Dashboard({
  getUserInfo,
  getCityDetails,
  checkPaymentStatus,
  payments,
  info,
}) {
  const [tab, setTab] = useState(0);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isRegistrationCompleted, setRegistrationStatus] = useState(false);
  const [didPaymentFail, setPaymentFailure] = useState(false);
  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, [])

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' style={{ height: '100%' }} >
          <Grid container item direction='column' sm={5}>
            <Paper className={classes.paper}>

              <Grid item>
                salam
              </Grid>
              <Grid item>
                salam
</Grid>
              <Grid item>
                salam
</Grid>
              <Grid item>
                salam
</Grid>
              <Grid item>
                <Button variant='contained' color='primary' fullWidth>
                  پرداخت
                </Button>
              </Grid>
            </Paper>

          </Grid>

          <Grid container item sm={5} justify='center' alignItems='center'>
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  info: state.account.info,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
})

export default connect(
  mapStateToProps,
  {
  }
)(Dashboard);
