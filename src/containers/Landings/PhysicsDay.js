import '../../Theme/Styles/PhysicsDay.scss'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import ArticleCard2 from '../../components/Cards/ArticleCard2';
import AuthDialog from '../../components/Dialog/AuthDialog/AuthDialog';
import Footer from '../../components/Footer/Footer';
import ScrollTop from '../../components/ScrollToTop/ScrollToTop';
import { logout } from '../../redux/actions/account';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  landingBackground: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: `url(${process.env.PUBLIC_URL}/background.jpg) no-repeat 50% fixed`,
    filter: 'blur(4px)',
    webkitFilter: 'blur(4px)',
    opacity: 0.9,
    backgroundSize: 'cover',
    zIndex: -1,
  },

  title: {
    fontSize: 80,
    lineHeight: '80px',
    fontWeight: 900,
    color: '#eee',
    textShadow: '3px 3px #888',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
      lineHeight: '70px',
    },
  },

  subtitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 800,
    lineHeight: '30px',
    color: '#E20814',
    textShadow: '-1px 1px #aaa',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '20px',
    },
  },

  sectionTitle: {
    fontSize: 26,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },

  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    paddingLeft: '20px',
  },

  apple: {
    zIndex: '5',
    position: 'fixed',
    top: '15%',
    left: '50%',
    width: '60px',
    height: '70px',
    marginTop: '-35px',
    marginLeft: '-30px',
    filter: 'drop-shadow(5px 5px 5px #33333333)',
  },

  section1: {
    height: '100vh',
    color: 'black',
    padding: theme.spacing(4, 3, 4),
  },

  fullHeight: {
    height: '100%',
  },

  section2: {
    position: 'relative',
    zIndex: '100',
    opacity: '1',
    boxShadow: '1px 1px 10px black',
    color: '#f7f2f6',
    background: '#410066',
    padding: theme.spacing(4, 1),
  },

  section5: {
    position: 'relative',
    zIndex: '100',
    opacity: '1',
    background: '#F0DBED',
    paddingTop: '30px',
    paddingBottom: '50px',
  },

  articleCard: {
    overflow: 'hidden',
  },

  daneshmandanContainer: {
    margin: 'auto',
    display: 'table',
  },
}));

export const articleData = {
  12: {
    id: 12,
    img: process.env.PUBLIC_URL + '/mp.jpg',
    name: 'عدد پی با چند رقم اعشار',
    description:
      'یکی از اعداد عجیبی که همه‌مون توی مدرسه خیلی زود باهاش آشنا می‌شیم عدد «پی»ئه. به‌نظرت از چه روش‌هایی می‌تونیم مقدار عدد پی رو با تقریب نسبتاً خوبی محاسبه کنیم؟ در ادامۀ این نوشته قراره به دو روش که هر دوتا مبتنی بر احتمال هستن این کار رو انجام بدیم. پس بزن بریم!',
  },
  13: {
    id: 13,
    img: process.env.PUBLIC_URL + '/zharfa_rasta.png',
    name: 'دنیای کوچک ما',
    description:
      'چشماتو ببند، خودتو کنار سی‌وسه‌پل تصور کن، یا حتی دورتر وسط یکی از خیابون‌های پاریس، یا حتی وسط یه قبیله‌ توی اتیوپی، آدم‌های مختلفی توی هر کدوم از این جاها مشغول کاری هستن. به نظرت از همین جایی که نشستی با چند تا واسطه می‌تونی یه نامه رو به دست یکی‌شون برسونی؟ توی این نوشته قراره ‌ببینیم دنیا اینقدر‌ها هم جای بزرگی نیست!',
  },
};

function PhysicsDay() {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className={classes.landingBackground} />
        <img
          src={process.env.PUBLIC_URL + '/apple.png'}
          className={classes.apple}
          alt=""
        />
        <Grid
          container
          xs={12}
          justify="space-evenly"
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item></Grid>
          <Grid item>
            <Typography variant="h2" align="center" className={classes.title}>
              رویداد روز فیزیک
            </Typography>
            <br />
            <Typography
              component="h2"
              variant="h3"
              className={classes.subtitle}>
              آخرِ آخرین هفته‌ی آذر
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={process.env.PUBLIC_URL + 'scroll.gif'}
              alt="scroll"
              style={{ width: 20 }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.section2}>
        <Grid
          container
          direction="row"
          spacing={3}
          alignItems="center"
          justify="center">
          <Grid container item xs={12} sm={4} md={3} justify="center">
            <ArticleCard2 {...articleData[13]} />
          </Grid>
          <Grid item sm={3}>
            <div className={classes.daneshmandanContainer}>
              <img
                style={{ height: '80vh' }}
                src={process.env.PUBLIC_URL + '/daneshmandan.png'}
                alt="دانشمندان"
              />
            </div>
          </Grid>
          <Grid container item xs={12} sm={4} md={3} justify="center">
            <ArticleCard2 {...articleData[12]} />
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section5} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              برگزارکنندگان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { logout })(PhysicsDay);
