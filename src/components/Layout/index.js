/**
 * Created by vladtomsa on 26/09/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid'
import AccountDetails from './AccountDetails';
import Header from './Header';
import Sidenav from './Sidenav';
import { logoWidth } from './Header/styles';
import { StickyContainer, Sticky } from 'react-sticky';

const toolbarHeightXS = 56;
const toolbarHeight = 64;

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
      minHeight: `calc(100vh - ${toolbarHeightXS}px)`,
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100vh - ${toolbarHeight}px)`,
      },
      [theme.breakpoints.up('md')]: {
        paddingRight: 0,
      },
    },
  };
};

const Layout = ({ children, classes, onLogout, t, userInfo, openSidenav, closeSidenav, sidenavOpened, width }) => {
  const isSmallDevice = width === 'xs' || width === 'sm';

  const toolbarStickyStyles = {
    zIndex: 1000,
    top: isSmallDevice ? 0 : -16,
  };

  const sidenav = (
    <Sidenav
      isOpen={sidenavOpened}
      onClose={closeSidenav}
    />
  );

  const distanceFromTop = 16;

  return (
    <StickyContainer>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={9} xl={8}>
          <Sticky topOffset={isSmallDevice ? 0 : distanceFromTop}>
            {
              ({ style }) => {
                return (
                  <div style={{ ...style, ...toolbarStickyStyles }}>
                    <Header userInfo={userInfo} onLogout={onLogout} openSidenav={openSidenav}/>
                  </div>
                )
              }
            }
          </Sticky>


          <div className={classes.root}>
            {
              !!userInfo
                ? (
                  !isSmallDevice
                    ? (
                      <div style={{ minWidth: logoWidth }}>
                        <Sticky topOffset={distanceFromTop}>
                          {
                            ({ style }) => {
                              return (
                                <div style={{ ...style, top: 80 }}>
                                  { sidenav }
                                </div>
                              )
                            }
                          }
                        </Sticky>
                      </div>
                    )
                    : (
                      <div>
                        { sidenav }
                      </div>
                    )
                )
                : null
            }

            <div className={classes.content}>
              {
                userInfo && userInfo.userBlockchainAccount
                  ? (
                    <AccountDetails accountInfo={userInfo.userBlockchainAccount } t={t}/>
                  )
                  : null
              }

              {  children }
            </div>
          </div>
        </Grid>
      </Grid>
    </StickyContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
  sidenavOpened: PropTypes.bool,
  openSidenav: PropTypes.func.isRequired,
  closeSidenav: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const withStyle = withStyles(styles)(Layout);

const withTranslate = translate('common')(withStyle);

export default withWidth()(withTranslate);
