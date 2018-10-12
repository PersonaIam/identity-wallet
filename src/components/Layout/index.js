/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Header from './Header';
// import Sidenav from './Sidenav';

const toolbarHeightXS = 56;
const toolbarHeight = 64;

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 3,
      minHeight: `calc(100vh - ${toolbarHeightXS}px)`,
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100vh - ${toolbarHeight}px)`,
      },
    },
  };
};

const Layout = ({ children, classes, onLogout, userInfo }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <Header userInfo={userInfo} onLogout={onLogout}/>

        <div className={classes.root}>
          {/*{*/}
            {/*!!userInfo*/}
              {/*? <div><Sidenav /></div>*/}
              {/*: null*/}
          {/*}*/}

          <div className={classes.content}>
            {  children }
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
};

const withStyle = withStyles(styles)(Layout);

export default withStyle;
