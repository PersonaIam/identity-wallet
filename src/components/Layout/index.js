/**
 * Created by vladtomsa on 26/09/2018
 */
import React, { Component, createRef } from 'react';
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

class Layout extends Component {
  constructor(props) {
    super(props);
    this.contentRef = createRef();
  }

  render() {
    const {
      children, classes, onLogout, t, userInfo, openSidenav, closeSidenav, sidenavOpened, reloadAccount, width
    } = this.props;

    const isSmallDevice = width === 'xs' || width === 'sm';

    const sidenav = (
      <Sidenav
        isOpen={sidenavOpened}
        onClose={closeSidenav}
        t={t}
      />
    );

    const distanceFromTop = 16;

    return (
      <StickyContainer>
        <Grid container justify="center">
          <Grid item xs={12} md={11} lg={10} xl={8}>
            <Sticky topOffset={isSmallDevice ? 0 : distanceFromTop}>
              {
                ({ style, isSticky }) => {
                  if (this.contentRef.current) {

                    if (isSticky) {
                      this.contentRef.current.style['margin-top'] = '16px';
                    }
                    else {
                      this.contentRef.current.style['margin-top'] = '0px';
                    }
                  }


                  return (
                    <div style={{ ...style, zIndex: 1000 }}>
                      <Header userInfo={userInfo} onLogout={onLogout} openSidenav={openSidenav} isFixed={isSticky} t={t}/>
                    </div>
                  )
                }
              }
            </Sticky>


            <div className={classes.root} ref={this.contentRef}>
              {
                !!userInfo
                  ? (
                    !isSmallDevice
                      ? (
                        <div style={{minWidth: logoWidth}}>
                          <Sticky topOffset={distanceFromTop}>
                            {
                              ({style}) => {
                                return (
                                  <div style={{...style, top: 80}}>
                                    {sidenav}
                                  </div>
                                )
                              }
                            }
                          </Sticky>
                        </div>
                      )
                      : (
                        <div>
                          {sidenav}
                        </div>
                      )
                  )
                  : null
              }

              <div className={classes.content}>
                {
                  userInfo && userInfo.userBlockchainAccount
                    ? (
                      <AccountDetails
                        userInfo={userInfo}
                        t={t}
                        reloadAccount={reloadAccount}
                      />
                    )
                    : null
                }

                {children}
              </div>
            </div>
          </Grid>
        </Grid>
      </StickyContainer>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
  sidenavOpened: PropTypes.bool,
  openSidenav: PropTypes.func.isRequired,
  closeSidenav: PropTypes.func.isRequired,
  reloadAccount: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const withStyle = withStyles(styles)(Layout);

const withTranslate = translate('common')(withStyle);

export default withWidth()(withTranslate);
